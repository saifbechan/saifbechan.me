/// <reference types="vitest" />

import { UserConfigExport, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const config: UserConfigExport = {
  plugins: [react()],
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
