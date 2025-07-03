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

## 📚 APIエンドポイント

### 基本ルート

- `GET /` - Helloメッセージ
- `GET /ping` - ヘルスチェック

### ユーザー管理

- `POST /users` - 新しいユーザーを作成
- `GET /users` - 全ユーザーを取得
- `GET /users/:id` - IDでユーザーを取得
- `PUT /users/:id` - ユーザーを更新
- `DELETE /users/:id` - ユーザーを削除

### 使用例

```bash
# ユーザーを作成
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "太郎", "email": "taro@example.com", "age": 25}'

# 全ユーザーを取得
curl http://localhost:3000/users

# 特定のユーザーを取得
curl http://localhost:3000/users/1

# ユーザーを更新
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "太郎2", "age": 26}'

# ユーザーを削除
curl -X DELETE http://localhost:3000/users/1
```

## 🗂️ プロジェクト構造

```
hono-typescript-template/
├── .gitignore              # Git除外設定
├── .prettierrc             # Prettierフォーマット設定
├── .prettierignore         # Prettierの除外設定
├── .vscode/                # VSCode設定
├── src/
│   ├── app.ts              # メインのHonoアプリケーション
│   ├── index.ts            # サーバーエントリーポイント
│   ├── schemas/            # Zodバリデーションスキーマ
│   │   └── user.ts
│   └── types/              # TypeScript型定義
│       └── user.ts
├── tests/                  # テストファイル
│   ├── app.test.ts
│   ├── index.test.ts
│   └── users.test.ts
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── eslint.config.js
└── CLAUDE.md              # AI アシスタントガイドライン
```

## 🛠️ 開発

### コマンド

```bash
# 開発サーバーを起動
npm start

# テストを実行
npm test

# 特定のテストファイルを実行
npx vitest tests/users.test.ts

# 型チェック
npm run check:types

# リンティング
npm run check:lint

# コードフォーマット
npm run fix:format

# 全てのチェックを実行
npm run check:all
```

### ユーザースキーマ

ユーザーは以下の構造を持ちます：

```typescript
type User = {
  id: number;
  name: string; // 必須
  email: string; // 必須、有効なメールアドレス
  age?: number; // 任意、正の整数
};
```

## 🧪 テスト

テストはVitestで書かれ、Honoの組み込みテストユーティリティを使用します：

```bash
# 全テストを実行
npm test

# カバレッジ付きでテストを実行
npm run test -- --coverage

# ウォッチモードでテストを実行
npm run test -- --watch
```

## 📜 ライセンス

MIT
