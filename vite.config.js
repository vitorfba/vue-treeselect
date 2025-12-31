// vite.config.ts
import { defineConfig } from "vite";
import vueJsx from '@vitejs/plugin-vue-jsx';

import typescript from "@rollup/plugin-typescript";
import path from "path";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ command }) => {
  const isDev = command === 'serve';
  
  return {
    plugins: [
      vue(),
      vueJsx({
        // options are passed on to @vue/babel-plugin-jsx
      }),
    ],
    resolve: {
      alias: {
          "~": path.resolve(__dirname, "./src"),
          '@':  path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 3000,
    },
    build: {
      manifest: true,
      minify: true,
      reportCompressedSize: true,
      lib: {
        entry: path.resolve(__dirname, "src/index.js"),
        name:'vue3-treeselect',
        fileName: "vue3-treeselect",
        formats: ["es", "cjs"],
      },
      rollupOptions: {
        /*input: {
          main: path.resolve(__dirname, 'demo/index.html'),
          //nested: resolve(__dirname, 'nested/index.html'),
        },*/

        external: ['vue'],
        output: {
          assetFileNames: "vue3-treeselect.[ext]",
          exports: "named",
          globals: {
            vue: 'Vue',
          },
        },
        plugins: [
          typescriptPaths({
            preserveExtensions: true,
          }),
          typescript({
            sourceMap: false,
            declaration: true,
            outDir: "dist",
          }),
        ],
      },
    },
  };
});
