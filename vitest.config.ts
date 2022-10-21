/// <reference types="vitest" />

import { UserConfigExport, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const config: UserConfigExport = {
  plugins: [react()],
  test: {
    setupFiles: ['./vitest.setup.ts'],
    environment: 'jsdom',
    deps: {
      inline: ['vitest-canvas-mock'],
      fallbackCJS: true,
    },
    include: ['**/*.test.tsx'],
  },
};

export default defineConfig(config);
