# Hono TypeScript テンプレート

Hono、TypeScript、Zodバリデーション、Vitestテストを使用したモダンなREST APIサーバーテンプレート。

## ✨ 特徴

- **[Hono](https://hono.dev/)** - 超高速Webフレームワーク
- **TypeScript** - 型安全な開発
- **Zod** - スキーマバリデーションと型推論
- **Vitest** - 高速テストフレームワーク
- **ESM** - モダンなモジュールシステム
- **ビルド不要** - `tsx`による直接実行
- **コード品質** - ESLint、Prettier、TypeScriptチェック

## 🚀 クイックスタート

```bash
# リポジトリをクローン
git clone https://github.com/TakashiArakawa/hono-typescript-template.git
cd hono-typescript-template

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm start
```

サーバーは `http://localhost:3000` で起動します

## 📚 API概要

基本的なユーザー管理APIを提供します：

- ヘルスチェック（`/`, `/ping`）
- ユーザーCRUD操作（作成、取得、更新、削除）

詳細なAPI仕様については [API仕様書](docs/api-specification.md) をご確認ください。

## 🛠️ 開発コマンド

```bash
# 開発サーバーを起動
npm start

# テストを実行
npm test

# 全てのチェックを実行（型チェック、lint、フォーマット、テスト）
npm run check:all
```

その他のコマンドについては [開発ガイド](docs/development.md) をご確認ください。

## 📖 ドキュメント

- [プロジェクト概要](docs/overview.md) - プロジェクトの詳細な概要
- [要求定義書](docs/requirements.md) - 機能要件と非機能要件
- [API仕様書](docs/api-specification.md) - エンドポイントの詳細仕様
- [データモデル設計](docs/data-model.md) - データ構造とバリデーション
- [フォルダ構成](docs/folder-structure.md) - プロジェクト構造の説明
- [開発ガイド](docs/development.md) - 開発者向けガイド

## 📜 ライセンス

MIT
