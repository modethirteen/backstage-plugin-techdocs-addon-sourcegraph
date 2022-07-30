import React from 'react';
import { TechDocsAddonTester } from '@backstage/plugin-techdocs-addons-test-utils';
import { SourcegraphNotebook } from '../plugin';
import { SourcegraphNotebookCallbackParameters } from './SourcegraphNotebook';

const dom = (
  <body>
    <table className='language-text highlighttable'>
      <tbody>
        <tr>
          <td className='code'>
            <div className='language-text highlight'>
              <pre>
                <code>https://example.com/notebooks/foo</code>
              </pre>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <p>plugh</p>
    <table className='language-text highlighttable'>
      <tbody>
        <tr>
          <td className='code'>
            <div className='language-text highlight'>
              <pre>
                <code>https://example.com/notebooks/bar</code>
              </pre>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <p>xyzzy</p>
    <table className='highlighttable'>
      <tbody>
        <tr>
          <td className='code'>
            <div className='highlight'>
              <pre>
                <code>https://example.com/notebooks/baz</code>
              </pre>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <p>fred</p>
    <table className='language-text highlighttable'>
      <tbody>
        <tr>
          <td className='code'>
            <div className='highlight'>
              <pre>
                <code>https://example.io/notebooks/gradle</code>
              </pre>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
);

describe('SourcegraphNotebook', () => {
  it('can render', async () => {
    const { shadowRoot } = await TechDocsAddonTester.buildAddonsInTechDocs([
      <SourcegraphNotebook domain='example.com' />
    ])
    .withDom(dom)
    .renderWithEffects();
    const foo = shadowRoot?.querySelector('[data-notebook-id="foo"]') as Element;
    expect(foo).not.toBeNull();
    expect(foo.querySelector('iframe')?.outerHTML)
      .toBe('<iframe src="https://example.com/embed/notebooks/foo" frameborder="0" sandbox="allow-scripts allow-same-origin allow-popups"></iframe>');
    const bar = shadowRoot?.querySelector('[data-notebook-id="bar"]') as Element;
    expect(bar).not.toBeNull();
    expect(bar.querySelector('iframe')?.outerHTML)
      .toBe('<iframe src="https://example.com/embed/notebooks/bar" frameborder="0" sandbox="allow-scripts allow-same-origin allow-popups"></iframe>');
    expect(shadowRoot?.querySelector('[data-notebook-id="baz"]')).toBeNull();
    expect(shadowRoot?.querySelector('[data-notebook-id="gradle"]')).toBeNull();
  });
  it('can render with callback', async () => {
    const args: Record<string, {
      container: HTMLDivElement,
      iframe: HTMLIFrameElement,
      id: string,
      url: string
    }> = {};
    const callback = ({ container, iframe, id, url }: SourcegraphNotebookCallbackParameters) => {
      args[id] = { container, iframe, id, url };
    };
    await TechDocsAddonTester.buildAddonsInTechDocs([
      <SourcegraphNotebook domain='example.com' callback={callback} />
    ])
    .withDom(dom)
    .renderWithEffects();
    expect(args.foo.container).not.toBeNull();
    expect(args.foo.iframe).not.toBeNull();
    expect(args.foo.id).toBe('foo');
    expect(args.foo.url).toBe('https://example.com/notebooks/foo');
    expect(args.bar.container).not.toBeNull();
    expect(args.bar.iframe).not.toBeNull();
    expect(args.bar.id).toBe('bar');
    expect(args.bar.url).toBe('https://example.com/notebooks/bar');
  });
  describe('callback', () => {
    it('does not auto-append iframe', async () => {
      const { shadowRoot } = await TechDocsAddonTester.buildAddonsInTechDocs([
        <SourcegraphNotebook domain='example.com' callback={() => {}} />
      ])
      .withDom(dom)
      .renderWithEffects();
      const iframes = (shadowRoot?.querySelectorAll('iframe') ?? []) as NodeListOf<HTMLIFrameElement>;
      expect(iframes.length).toBe(0);
    });
    it('can append iframe', async () => {
      const callback = ({ container, iframe }: SourcegraphNotebookCallbackParameters) => {
        container.append(iframe);
      };
      const { shadowRoot } = await TechDocsAddonTester.buildAddonsInTechDocs([
        <SourcegraphNotebook domain='example.com' callback={callback} />
      ])
      .withDom(dom)
      .renderWithEffects();
      const iframes = (shadowRoot?.querySelectorAll('iframe') ?? []) as NodeListOf<HTMLIFrameElement>;
      expect(iframes.length).toBe(2);
    });
  });
});