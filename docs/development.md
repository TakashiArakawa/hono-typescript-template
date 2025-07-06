# 開発ガイド

## 開発環境のセットアップ

### 前提条件

- **Node.js**: 18.0.0 以上
- **npm**: 8.0.0 以上
- **Git**: 2.30.0 以上

### 推奨開発環境

- **エディタ**: Visual Studio Code
- **OS**: macOS, Linux, Windows (WSL2推奨)
- **ターミナル**: Bash, Zsh, PowerShell

### 初期セットアップ

```bash
# 1. リポジトリをクローン
git clone https://github.com/TakashiArakawa/hono-typescript-template.git
cd hono-typescript-template

# 2. 依存関係をインストール
npm install

# 3. 開発サーバーを起動
npm start

# 4. 別ターミナルでテストを実行
npm test
```

## 開発コマンド

### 基本コマンド

```bash
# 開発サーバーを起動（ポート3000）
npm start

# テストを実行
npm test

# テストをウォッチモードで実行
npm run test -- --watch

# カバレッジ付きでテストを実行
npm run test -- --coverage
```

### コード品質チェック

```bash
# TypeScript型チェック
npm run check:types

# ESLintでコードをチェック
npm run check:lint

# Prettierでフォーマットをチェック
npm run check:format

# Prettierでフォーマットを自動修正
npm run fix:format

# 全てのチェックを実行
npm run check:all
```

### テストコマンド

```bash
# 全テストファイルを実行
npm test

# 特定のテストファイルを実行
npx vitest tests/users.test.ts

# アプリケーション基本機能のテスト
npx vitest tests/app.test.ts

# ユーザーAPI機能のテスト
npx vitest tests/users.test.ts
```

## 開発ワークフロー

### 1. 新機能開発の流れ

#### Step 1: 要求分析

1. **要求定義書の確認**: [requirements.md](requirements.md)
2. **既存機能の調査**: 類似機能の実装方法を確認
3. **影響範囲の特定**: 変更が必要なファイルを特定

#### Step 2: 設計

1. **API設計**: エンドポイント、リクエスト/レスポンス形式
2. **データモデル設計**: Zodスキーマの設計
3. **テスト設計**: テストケースの計画

#### Step 3: 実装

1. **スキーマ作成**: `src/schemas/` にバリデーションスキーマを追加
2. **型定義**: `src/types/` に型定義を追加
3. **ルート実装**: `src/app.ts` にエンドポイントを追加
4. **テスト作成**: `tests/` にテストケースを追加

#### Step 4: 検証

1. **テスト実行**: 新機能のテストケースを実行
2. **品質チェック**: lint、フォーマット、型チェック
3. **手動テスト**: curlコマンドやブラウザでの動作確認

#### Step 5: ドキュメント更新

1. **API仕様書**: エンドポイントの追加
2. **データモデル**: 新しいスキーマの説明
3. **README**: 必要に応じて使用例を追加

### 2. バグ修正の流れ

1. **再現手順の確認**: 問題の詳細な再現方法を確認
2. **原因調査**: コードレビューとデバッグ
3. **修正実装**: 最小限の変更で問題を解決
4. **テスト追加**: 同じ問題を防ぐテストケースを追加
5. **回帰テスト**: 既存機能への影響がないことを確認

## コーディング規約

### 1. ファイル命名規則

```bash
# TypeScriptファイル
src/user.ts          # 単数形、camelCase
src/userService.ts   # 機能名を含む

# テストファイル
tests/user.test.ts   # .test.ts拡張子

# 設定ファイル
vitest.config.ts     # .config.ts拡張子
```

### 2. 変数・関数命名

```typescript
// 変数・関数: camelCase
const userId = 1;
const getUserById = (id: number) => {
  /* ... */
};

// 型・インターフェース: PascalCase
type User = {
  id: number;
  name: string;
};

// 定数: UPPER_CASE
const MAX_USERS = 100;
const API_BASE_URL = 'http://localhost:3000';
```

### 3. インポート順序

```typescript
// 1. Node.js標準ライブラリ
import { readFile } from 'fs/promises';

// 2. 外部ライブラリ
import { Hono } from 'hono';
import { z } from 'zod';

// 3. 内部モジュール（絶対パス）
import { userSchema } from './schemas/user.js';
import type { User } from './types/user.js';
```

### 4. 関数の書き方

```typescript
// 型注釈を明確に
const createUser = async (userData: UserCreate): Promise<User> => {
  // バリデーション
  const validData = userCreateSchema.parse(userData);

  // 処理
  const user: User = {
    id: nextId++,
    ...validData,
  };

  // 返却
  return user;
};
```

## テスト戦略

### 1. テストの分類

#### 単体テスト

- **対象**: 個別の関数、メソッド
- **ツール**: Vitest
- **場所**: `tests/` ディレクトリ

#### 統合テスト

- **対象**: API エンドポイント
- **ツール**: Hono のテストユーティリティ
- **方法**: `app.request()` メソッドを使用

### 2. テストケースの作成指針

```typescript
describe('ユーザーAPI', () => {
  describe('POST /users', () => {
    it('有効なデータでユーザーを作成できる', async () => {
      // Arrange: テストデータの準備
      const userData = {
        name: 'テストユーザー',
        email: 'test@example.com',
        age: 25,
      };

      // Act: 実際の処理
      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      // Assert: 結果の検証
      expect(res.status).toBe(201);
      const body = await res.json();
      expect(body.user).toMatchObject({
        id: expect.any(Number),
        ...userData,
      });
    });

    it('無効なメールアドレスでエラーになる', async () => {
      const userData = {
        name: 'テストユーザー',
        email: 'invalid-email',
      };

      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      expect(res.status).toBe(400);
    });
  });
});
```

### 3. カバレッジ目標

- **ステートメント**: 60%以上
- **ブランチ**: 60%以上
- **関数**: 60%以上
- **行**: 60%以上

## デバッグとトラブルシューティング

### 1. よくある問題と解決方法

#### TypeScriptエラー

```bash
# 型チェックエラーの確認
npm run check:types

# 型定義ファイルの確認
cat src/types/user.ts
```

#### インポートエラー

```typescript
// ❌ 間違い: .ts拡張子
import app from '../src/app.ts';

// ✅ 正しい: .js拡張子（ESMモード）
import app from '../src/app.js';
```

#### テストエラー

```bash
# 特定のテストを実行
npx vitest tests/users.test.ts

# デバッグ情報付きで実行
npx vitest tests/users.test.ts --reporter=verbose
```

### 2. ログとデバッグ

```typescript
// 開発環境でのログ出力
console.log('ユーザーデータ:', userData);

// エラーハンドリング
try {
  const result = await someOperation();
} catch (error) {
  console.error('エラーが発生しました:', error);
  throw error;
}
```

## パフォーマンス最適化

### 1. メモリ使用量の監視

```bash
# Node.jsプロセスのメモリ使用量確認
node --inspect src/index.ts

# プロファイリング
node --prof src/index.ts
```

### 2. レスポンス時間の測定

```bash
# curlでレスポンス時間を測定
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:3000/users

# abによる負荷テスト
ab -n 1000 -c 10 http://localhost:3000/ping
```

## デプロイメント

### 1. 本番環境への準備

```bash
# 全ての品質チェックを実行
npm run check:all

# 本番用の環境変数設定
export NODE_ENV=production
export PORT=3000
```

### 2. Docker化（将来予定）

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY src ./src
EXPOSE 3000
CMD ["npm", "start"]
```

## 継続的改善

### 1. コードレビューのポイント

- **機能性**: 要求仕様を満たしているか
- **可読性**: コードが理解しやすいか
- **保守性**: 将来の変更に対応しやすいか
- **パフォーマンス**: 性能面で問題がないか
- **セキュリティ**: セキュリティリスクがないか

### 2. 定期的なメンテナンス

```bash
# 依存関係の更新確認
npm outdated

# セキュリティ脆弱性の確認
npm audit

# 自動修正可能な問題を修正
npm audit fix
```

## 参考資料

### 開発ツール

- [Hono公式ドキュメント](https://hono.dev/)
- [TypeScript ハンドブック](https://www.typescriptlang.org/docs/)
- [Zod ドキュメント](https://zod.dev/)
- [Vitest ガイド](https://vitest.dev/guide/)

### ベストプラクティス

- [Node.js ベストプラクティス](https://github.com/goldbergyoni/nodebestpractices)
- [TypeScript ベストプラクティス](https://typescript-eslint.io/rules/)
- [REST API 設計ガイド](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design)

---

このガイドは継続的に更新されます。不明な点があれば、GitHubのIssuesで質問してください。
