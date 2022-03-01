import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      root: path.resolve(__dirname, "src/components/HelloWorld"),
      outputDir: "types",
      // staticImport: true,
      // insertTypesEntry: true,
      // logDiagnostics: true,
    }),
  ],
  build: {
    outDir: path.resolve(__dirname, "src/components/HelloWorld/dist"),
    lib: {
      entry: path.resolve(__dirname, "src/components/HelloWorld/src/index.vue"),
      name: "HelloWorld",
      fileName: (format) => `lib.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ["vue-demi"],
  },
});
