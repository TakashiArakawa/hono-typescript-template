// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: 'coverage',
      include: ['src/**/*.ts'], // テスト対象のファイルを指定
      exclude: ['node_modules', 'tests/**', 'src/index.ts'], // テスト対象外のファイルを指定
      all: true, // 全てのファイルを対象にする
      thresholds: {
        statements: 60,
        branches: 60,
        functions: 60,
        lines: 60,
      },
    },
  },
});
