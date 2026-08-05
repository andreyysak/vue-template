import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.js';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.js'],
      include: ['src/**/*.test.js'],
      restoreMocks: true,
      unstubEnvs: true,
      env: {
        VITE_APP_NAME: 'TEST',
        // jsdom за замовчуванням працює на http://localhost:3000 — той самий origin, без CORS-preflight
        VITE_APP_ROOT_API: 'http://localhost:3000/api'
      },
      coverage: {
        provider: 'v8',
        include: ['src/**/*.{js,vue}'],
        exclude: ['src/test/**', 'src/**/*.test.js', 'src/main.js'],
        reporter: ['text', 'html', 'lcov', 'cobertura']
      }
    }
  })
);
