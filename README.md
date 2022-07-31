# Backstage TechDocs Addon for Sourcegraph

A module that extends Sourcegraph capabilities into Backstage TechDocs.

## Getting started

This module is a [Backstage TechDocs Addon](https://backstage.io/docs/features/techdocs/addons) plugin, which requires Backstage v1.2+.
The plugin provides a component for [embedding Sourcegraph Notebooks](https://docs.sourcegraph.com/notebooks/notebook-embedding). Follow [the official documentation for TechDocs Addons](https://backstage.io/docs/features/techdocs/addons#installing-and-using-addons) to use this addon.

```typescript jsx
import { SourcegraphNotebook } from 'backstage-plugin-techdocs-addon-sourcegraph';

// Sourcegraph instance domain (Required)
const domain = 'sourcegraph.example.com';

// pre-render callback (Optional)
const callback = ({

  // div wrapper for embedded Notebook
  container: HTMLDivElement,

  // embedded notebook iframe
  iframe: HTMLIFrameElement,

  // notebook id
  id: string,

  // non-embedded notebook url
  url: string
}) => {

  // ...some extra handling or DOM manipulation before attaching the
  // iframe to the container
  container.append(iframe);
});

<TechDocsAddons>
  <SourcegraphNotebook domain={domain} callback={callback} />
</TechDocsAddons>
```

## Further resources

- [About Sourcegraph](https://about.sourcegraph.com/)
- [Sourcegraph Notebooks](https://docs.sourcegraph.com/notebooks)
