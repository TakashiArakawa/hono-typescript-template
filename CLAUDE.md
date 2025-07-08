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

## TDD（テスト駆動開発）

### TDDの原則とRed-Green-Refactorサイクル

テスト駆動開発（Test-Driven Development）は、以下の3つのステップを繰り返す開発手法です：

1. **Red**: 失敗するテストを書く
2. **Green**: テストが通る最小限の実装をする
3. **Refactor**: コードを改善し、重複を除去する

### TDD実施の基本手順

#### Step 1: 失敗するテストを書く（Red）

```bash
# 新しいテストファイルを作成
touch tests/new-feature.test.ts

# ウォッチモードでテストを開始
npx vitest tests/new-feature.test.ts --watch
```

テストファイルの例：
```typescript
import { describe, it, expect } from 'vitest';
import app from '../src/app.js';

describe('新機能のテスト', () => {
  it('期待する動作を記述', async () => {
    // まだ実装されていない機能のテスト
    const res = await app.request('/new-endpoint');
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ message: 'success' });
  });
});
```

#### Step 2: 最小限の実装（Green）

```typescript
// src/app.ts に最小限の実装を追加
app.get('/new-endpoint', (c) => {
  return c.json({ message: 'success' });
});
```

#### Step 3: リファクタリング（Refactor）

```bash
# 全品質チェックを実行
npm run check:all

# 型チェック
npm run check:types

# コードフォーマット
npm run fix:format
```

### TDD支援コマンド

#### 継続的テスト実行

```bash
# 特定のテストファイルをウォッチモード（推奨）
npx vitest tests/users.test.ts --watch

# 全テストをウォッチモード
npx vitest --watch

# カバレッジ付きでテスト実行
npx vitest --coverage
```

#### 品質チェック自動化

```bash
# TDD実行時の推奨コマンド
npm run check:all  # 型・lint・フォーマット・テスト全実行

# 個別チェック
npm run check:types    # TypeScript型チェック
npm run check:lint     # ESLintチェック
npm run check:format   # Prettierフォーマットチェック
```

### Claude Code特有の注意点

#### ESMモジュール設定

```typescript
// ✅ 正しいインポート（.js拡張子を使用）
import app from '../src/app.js';
import { userCreateSchema } from '../src/schemas/user.js';

// ❌ 間違い（.ts拡張子は使用しない）
import app from '../src/app.ts';
```

#### TDD実施時の推奨パターン

1. **テストファイル作成**: `tests/[feature].test.ts`
2. **ウォッチモード開始**: `npx vitest tests/[feature].test.ts --watch`
3. **失敗するテスト記述**: 期待する動作を記述
4. **最小限実装**: `src/`にコード追加
5. **リファクタリング**: `npm run check:all`で全チェック
6. **次のテストケース**: 1に戻る

#### テストカバレッジ監視

```bash
# カバレッジ閾値（60%）をチェック
npm run test -- --coverage

# カバレッジレポートの確認
open coverage/index.html
```

### TDD実践例

```typescript
// tests/calculator.test.ts
describe('Calculator', () => {
  it('should add two numbers', () => {
    // Red: 失敗するテスト
    expect(add(2, 3)).toBe(5);
  });
});

// src/calculator.ts
export const add = (a: number, b: number): number => {
  // Green: 最小限の実装
  return a + b;
};

// Refactor: 型安全性やエラーハンドリングを追加
export const add = (a: number, b: number): number => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  return a + b;
};
```

## ドキュメント参照

詳細な仕様については`docs/`ディレクトリ内の各ドキュメントを参照してください。
