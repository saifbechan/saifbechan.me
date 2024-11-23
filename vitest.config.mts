/// <reference types="vitest" />

import { UserConfigExport, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: UserConfigExport = {
  plugins: [tsconfigPaths(), react()],
  test: {
    setupFiles: ['./vitest.setup.ts'],
    environment: 'jsdom',
    deps: {
      optimizer: {
        web: {
          include: ['vitest-canvas-mock'],
        },
      },
    },
    include: ['**/*.test.tsx'],
  },
};

export default defineConfig(config);
