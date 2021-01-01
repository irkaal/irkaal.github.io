import { ScullyConfig } from '@scullyio/scully';
export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'irkaal',
  distFolder: './docs/dist',
  outDir: './docs',
  routes: {
    '/blog/:postId': {
      type: 'contentFolder',
      postId: {
        folder: './blog',
      },
    },
  },
};
