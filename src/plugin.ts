import { createPlugin } from '@backstage/core-plugin-api';
import { createTechDocsAddonExtension, TechDocsAddonLocations } from '@backstage/plugin-techdocs-react';
import { SourcegraphNotebookAddon, SourcegraphNotebookProps } from './SourcegraphNotebook';

export const techdocsAddonSourcegraphPlugin = createPlugin({
  id: 'techdocs-addon-sourcegraph',
});

export const SourcegraphNotebook = techdocsAddonSourcegraphPlugin.provide(
  createTechDocsAddonExtension<SourcegraphNotebookProps>({
    name: 'SourcegraphNotebook',
    location: TechDocsAddonLocations.Content,
    component: SourcegraphNotebookAddon,
  }),
);
