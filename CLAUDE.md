# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

このファイルは、このリポジトリでコードを操作する際にClaude Code (claude.ai/code)にガイダンスを提供します。

## プロジェクト概要

このプロジェクトは、Hono、TypeScript、Zod、Vitestを使用したモダンなREST APIサーバーテンプレートです。

### 技術スタック

- **Hono 4.8+**: 高速Webフレームワーク
- **TypeScript 5.8+**: 型安全な開発言語
- **Zod 3.25+**: スキーマバリデーション
- **Vitest 3.2+**: テストフレームワーク
- **tsx 4.20+**: TypeScript実行環境

## 重要なコマンド

### 開発・テスト

```bash
npm start                    # 開発サーバー起動（ポート3000）
npm test                     # 全テスト実行
npm run check:all           # 全品質チェック（型・lint・フォーマット・テスト）
```

### 個別チェック

```bash
npm run check:types         # TypeScript型チェック
npm run check:lint          # ESLintチェック
npm run check:format        # Prettierフォーマットチェック
npm run fix:format          # Prettierフォーマット修正
```

### 個別テスト

```bash
npx vitest tests/app.test.ts      # 基本機能テスト
npx vitest tests/users.test.ts    # ユーザーAPIテスト
```

## アーキテクチャ

### ファイル構成

```
src/
├── app.ts                  # メインHonoアプリ（ルート定義）
├── index.ts               # サーバーエントリーポイント
├── schemas/               # Zodバリデーションスキーマ
│   └── user.ts
└── types/                 # TypeScript型定義
    └── user.ts

tests/                     # Vitestテストファイル
├── app.test.ts           # 基本機能テスト
├── index.test.ts         # サーバー起動テスト
└── users.test.ts         # ユーザーAPIテスト

docs/                     # プロジェクトドキュメント
├── overview.md           # 詳細概要
├── requirements.md       # 要求定義
├── api-specification.md  # API仕様
├── data-model.md        # データモデル設計
├── development.md       # 開発ガイド
└── folder-structure.md  # フォルダ構成
```

### 重要な設計ポイント

#### ESMモジュール設定

- `package.json`で`"type": "module"`を使用
- インポート時は`.js`拡張子を使用（ESM要件）

```typescript
// ✅ 正しい
import app from '../src/app.js';
// ❌ 間違い
import app from '../src/app.ts';
```

#### TypeScript設定

- strictモード有効
- Node16モジュール解決
- ビルドなしで`tsx`による直接実行

#### バリデーション

- **Zodスキーマ**: `src/schemas/user.ts`
- **型定義**: `src/types/user.ts`（Zodから自動推論）
- **ミドルウェア**: `@hono/zod-validator`によるリクエスト検証
- **エラー形式**: Zodエラーオブジェクトを直接返却

#### テスト戦略

- **統合テスト**: `app.request()`メソッドでHTTPリクエストをテスト
- **カバレッジ**: 60%以上（statements, branches, functions, lines）
- **実行**: Vitestによる高速テスト

## データストレージ

### 現在の実装

```typescript
// メモリ内ストレージ（開発・テスト用）
let users: User[] = [];
let nextId = 1;
```

### 将来計画

- Phase 1: PostgreSQL/MySQL接続
- Phase 2: JWT認証・認可
- Phase 3: GraphQL・WebSocket対応

## エラーハンドリング

### バリデーションエラー

Zodエラーは以下の形式で自動返却されます：

```json
{
  "error": {
    "issues": [
      {
        "code": "invalid_string",
        "message": "Invalid email",
        "path": ["email"]
      }
    ],
    "name": "ZodError"
  }
}
```

### 404エラー

```json
{
  "error": "User not found"
}
```

## 開発時の注意点

### コーディング規約

- **ファイル名**: camelCase、機能名を含む
- **変数・関数**: camelCase
- **型・インターフェース**: PascalCase
- **定数**: UPPER_CASE

### インポート順序

1. Node.js標準ライブラリ
2. 外部ライブラリ
3. 内部モジュール

### テスト作成

- 正常系・異常系の両方をカバー
- わかりやすいテスト名を使用
- AAA（Arrange-Act-Assert）パターンを推奨

## パフォーマンス目標

- レスポンス時間: 100ms以内
- 同時接続: 100接続
- メモリ使用量: 50MB以下

## ドキュメント参照

詳細な仕様については`docs/`ディレクトリ内の各ドキュメントを参照してください。
