import { createDevApp } from '@backstage/dev-utils';
import { techdocsAddonSourcegraphPlugin } from '../src/plugin';

createDevApp()
  .registerPlugin(techdocsAddonSourcegraphPlugin)
  .render();
