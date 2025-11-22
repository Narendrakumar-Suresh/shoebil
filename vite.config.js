import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";
import { fileURLToPath } from 'url'; // Necessary for Node path resolution in ES module environments

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// Helper to correctly resolve node_modules path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Resolve the path to the installed monaco-editor package
const monacoPath = path.resolve(__dirname, 'node_modules/monaco-editor');

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [tailwindcss(), sveltekit()],
  // Vite options tailored for Tauri development
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host ? { protocol: "ws", host, port: 1421 } : undefined,
    watch: {
      ignored: ["**/src-tauri/**"]
    }
  },
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
    },
  },
  
  // --- MONACO CONFIGURATION BLOCK START ---
  // Ensure Vite processes the monaco dependency for better dev performance
  optimizeDeps: {
    include: ['monaco-editor']
  },
  // Customize the build process (Rollup) to correctly bundle Monaco's workers
  build: {
    rollupOptions: {
      output: {
        // Group and externalize the worker files to ensure they are loaded locally and correctly
        manualChunks: {
          'monaco-editor-workers': [
            path.join(monacoPath, 'esm/vs/editor/editor.worker.js'),
            path.join(monacoPath, 'esm/vs/language/json/json.worker.js'),
            path.join(monacoPath, 'esm/vs/language/css/css.worker.js'),
            path.join(monacoPath, 'esm/vs/language/html/html.worker.js'),
            path.join(monacoPath, 'esm/vs/language/typescript/ts.worker.js'),
          ]
        },
      },
    },
  },
  // ----------------------------------------
}));