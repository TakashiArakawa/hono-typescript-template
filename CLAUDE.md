# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

このファイルは、このリポジトリでコードを操作する際にClaude Code (claude.ai/code)にガイダンスを提供します。

## コマンド

### 開発

- `npm start` - ポート3000でHonoサーバーを起動
- `npm test` - Vitestでテストを実行
- `npx vitest tests/app.test.ts` - 単一テストファイルを実行
- `npx vitest tests/users.test.ts` - ユーザーAPIテストを実行
- `npm run check:all` - 全てのチェックを実行（型、lint、フォーマット、テスト）

### コード品質

- `npm run check:types` - TypeScript型チェック
- `npm run check:lint` - ESLintコードリンティング
- `npm run check:format` - Prettierフォーマットチェック
- `npm run fix:format` - Prettierフォーマット修正

## アーキテクチャ

これは以下の構造を持つHonoベースのWebサーバーアプリケーションです：

- **src/app.ts** - ルート定義とZodバリデーションを含むメインのHonoアプリケーション
- **src/index.ts** - @hono/node-serverを使用するサーバーエントリーポイント
- **src/schemas/** - Zodバリデーションスキーマ定義
- **src/types/** - Zodスキーマから生成される型定義
- **tests/** - Honoのテストユーティリティを使用するVitestテストファイル

### 主要なアーキテクチャポイント

- ESMモジュールを使用（`"type": "module"`）
- `tsx`ランタイムで直接実行（ビルドステップ不要）
- Honoアプリは`app.ts`で定義され、サーバー起動のために`index.ts`でインポート
- Zodを使用した型安全なリクエストバリデーション（`@hono/zod-validator`）
- スキーマとバリデーションの分離（schemas/とtypes/ディレクトリ）
- TypeScriptはstrictモードとNode16モジュール解決で設定
- カバレッジ閾値は全てのメトリクスで60%に設定

### バリデーション

- **schemas/** - Zodスキーマ定義（userSchema, userCreateSchema, userUpdateSchema）
- **types/** - `z.infer<typeof schema>`を使用した型生成
- リクエストバリデーションは`zValidator`ミドルウェアで自動実行
- バリデーションエラーは自動的に400ステータスで返される

### テスト

テストはVitestで書かれ、Honoアプリの`app.request()`メソッドを直接使用してHTTPリクエストをテストします。テストでアプリモジュールをインポートする際は、ESM要件により`.js`拡張子を使用してください。
