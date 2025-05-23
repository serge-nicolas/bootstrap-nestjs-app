import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {},
  // add the line below
  plugins: [swc.vite(), tsconfigPaths()],
});
