import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue(), vueDevTools()],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
        '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
        '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
        '@store': fileURLToPath(new URL('./src/stores', import.meta.url)),
        '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
        '@composables': fileURLToPath(new URL('./src/composables', import.meta.url)),
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/styles/helpers/variables.scss" as *;
            @use "@/assets/styles/helpers/mixins.scss" as *;
          `,
        },
      },
    },

    server: {
      port: 5173,
      open: true,
    },

    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },

    build: {
      outDir: 'dist',
      sourcemap: mode !== 'production',

      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'axios', 'pinia'],
          },
        },
      },
    },
  }
})
