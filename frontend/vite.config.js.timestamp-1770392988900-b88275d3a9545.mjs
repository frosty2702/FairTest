// vite.config.js
import { defineConfig } from "file:///Users/vishalrajendran/Documents/GitHub/FairTest/node_modules/vite/dist/node/index.js";
import react from "file:///Users/vishalrajendran/Documents/GitHub/FairTest/node_modules/@vitejs/plugin-react/dist/index.js";
import path from "path";
var __vite_injected_original_dirname = "/Users/vishalrajendran/Documents/GitHub/FairTest/frontend";
var root = path.resolve(__vite_injected_original_dirname, "..");
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  resolve: {
    alias: {
      "identity": path.resolve(__vite_injected_original_dirname, "../packages/identity"),
      "ens-integration": path.resolve(__vite_injected_original_dirname, "../packages/ens-integration"),
      "yellow-integration": path.resolve(__vite_injected_original_dirname, "../packages/yellow-integration"),
      "core": path.resolve(__vite_injected_original_dirname, "../packages/core"),
      "crypto": "crypto-browserify",
      "stream": "stream-browserify",
      "buffer": "buffer",
      // Use root workspace @mysten/sui 1.2.0 (SuiClient, getFullnodeUrl); avoid sui-integration's nested 2.x
      "@mysten/sui": path.join(root, "node_modules/@mysten/sui"),
      // Polyfill node:crypto for browser (identity package)
      "node:crypto": "crypto-browserify"
    }
  },
  define: {
    "global": "globalThis",
    "process.env": {}
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdmlzaGFscmFqZW5kcmFuL0RvY3VtZW50cy9HaXRIdWIvRmFpclRlc3QvZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy92aXNoYWxyYWplbmRyYW4vRG9jdW1lbnRzL0dpdEh1Yi9GYWlyVGVzdC9mcm9udGVuZC92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdmlzaGFscmFqZW5kcmFuL0RvY3VtZW50cy9HaXRIdWIvRmFpclRlc3QvZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuY29uc3Qgcm9vdCA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLicpXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW3JlYWN0KCldLFxuICAgIHNlcnZlcjoge1xuICAgICAgICBwb3J0OiA1MTczXG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICAnaWRlbnRpdHknOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vcGFja2FnZXMvaWRlbnRpdHknKSxcbiAgICAgICAgICAgICdlbnMtaW50ZWdyYXRpb24nOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vcGFja2FnZXMvZW5zLWludGVncmF0aW9uJyksXG4gICAgICAgICAgICAneWVsbG93LWludGVncmF0aW9uJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL3BhY2thZ2VzL3llbGxvdy1pbnRlZ3JhdGlvbicpLFxuICAgICAgICAgICAgJ2NvcmUnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vcGFja2FnZXMvY29yZScpLFxuICAgICAgICAgICAgJ2NyeXB0byc6ICdjcnlwdG8tYnJvd3NlcmlmeScsXG4gICAgICAgICAgICAnc3RyZWFtJzogJ3N0cmVhbS1icm93c2VyaWZ5JyxcbiAgICAgICAgICAgICdidWZmZXInOiAnYnVmZmVyJyxcbiAgICAgICAgICAgIC8vIFVzZSByb290IHdvcmtzcGFjZSBAbXlzdGVuL3N1aSAxLjIuMCAoU3VpQ2xpZW50LCBnZXRGdWxsbm9kZVVybCk7IGF2b2lkIHN1aS1pbnRlZ3JhdGlvbidzIG5lc3RlZCAyLnhcbiAgICAgICAgICAgICdAbXlzdGVuL3N1aSc6IHBhdGguam9pbihyb290LCAnbm9kZV9tb2R1bGVzL0BteXN0ZW4vc3VpJyksXG4gICAgICAgICAgICAvLyBQb2x5ZmlsbCBub2RlOmNyeXB0byBmb3IgYnJvd3NlciAoaWRlbnRpdHkgcGFja2FnZSlcbiAgICAgICAgICAgICdub2RlOmNyeXB0byc6ICdjcnlwdG8tYnJvd3NlcmlmeSdcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZGVmaW5lOiB7XG4gICAgICAgICdnbG9iYWwnOiAnZ2xvYmFsVGhpcycsXG4gICAgICAgICdwcm9jZXNzLmVudic6IHt9XG4gICAgfSxcbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgICAgZXNidWlsZE9wdGlvbnM6IHtcbiAgICAgICAgICAgIGRlZmluZToge1xuICAgICAgICAgICAgICAgIGdsb2JhbDogJ2dsb2JhbFRoaXMnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2VixTQUFTLG9CQUFvQjtBQUMxWCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBRmpCLElBQU0sbUNBQW1DO0FBSXpDLElBQU0sT0FBTyxLQUFLLFFBQVEsa0NBQVcsSUFBSTtBQUV6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsUUFBUTtBQUFBLElBQ0osTUFBTTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNILFlBQVksS0FBSyxRQUFRLGtDQUFXLHNCQUFzQjtBQUFBLE1BQzFELG1CQUFtQixLQUFLLFFBQVEsa0NBQVcsNkJBQTZCO0FBQUEsTUFDeEUsc0JBQXNCLEtBQUssUUFBUSxrQ0FBVyxnQ0FBZ0M7QUFBQSxNQUM5RSxRQUFRLEtBQUssUUFBUSxrQ0FBVyxrQkFBa0I7QUFBQSxNQUNsRCxVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUE7QUFBQSxNQUVWLGVBQWUsS0FBSyxLQUFLLE1BQU0sMEJBQTBCO0FBQUE7QUFBQSxNQUV6RCxlQUFlO0FBQUEsSUFDbkI7QUFBQSxFQUNKO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDSixVQUFVO0FBQUEsSUFDVixlQUFlLENBQUM7QUFBQSxFQUNwQjtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1YsZ0JBQWdCO0FBQUEsTUFDWixRQUFRO0FBQUEsUUFDSixRQUFRO0FBQUEsTUFDWjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
