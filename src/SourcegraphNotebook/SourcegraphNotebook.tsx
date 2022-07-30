import { useShadowRootElements } from '@backstage/plugin-techdocs-react';
import { useEffect } from 'react';

export type SourcegraphNotebookCallbackParameters = {
  container: HTMLDivElement,
  iframe: HTMLIFrameElement,
  id: string,
  url: string
};

export type SourcegraphNotebookProps = {
  domain: string;
  callback?: ({
    container,
    iframe,
    id,
    url
  }: SourcegraphNotebookCallbackParameters) => void;
};

export const SourcegraphNotebookAddon = (props: SourcegraphNotebookProps) => {
  const highlightTables = useShadowRootElements<HTMLDivElement>(['.highlighttable']);
  useEffect(() => {
    for (const highlightTable of highlightTables) {
      if (highlightTable.style.display === 'none') {
        continue;
      }
      if (!highlightTable.classList.contains('language-text')) {
        continue;
      }
      const code = highlightTable.querySelector('code');
      if (!code) {
        continue;
      }
      const text = code.textContent?.trim();
      if (!text) {
        continue;
      }
      const matches = text.match(new RegExp(`^https:\/\/${props.domain}\/notebooks\/(.+?)$`, 'i'));
      if (!matches) {
        continue;
      }
      highlightTable.style.display = 'none';
      const [_, id] = matches;      
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', `https://${props.domain}/embed/notebooks/${id}`);
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups');
      const container = document.createElement('div');
      container.dataset.notebookId = id;
      if (props.callback) {
        props.callback({ container, iframe, id, url: `https://${props.domain}/notebooks/${id}` });
      } else {
        container.append(iframe);
      }
      highlightTable.parentNode?.insertBefore(container, highlightTable.nextSibling);
    }
  }, [highlightTables, props]);
  return null;
};