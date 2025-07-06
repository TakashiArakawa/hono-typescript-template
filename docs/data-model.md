# データモデル設計書

## 概要

本プロジェクトにおけるデータモデルの設計仕様書です。現在はメモリ内での一時的なデータ保存を行っていますが、将来的なデータベース接続を想定した設計となっています。

## エンティティ設計

### User エンティティ

#### 基本情報

- **エンティティ名**: User
- **説明**: システムユーザーの基本情報を管理
- **ファイル**: `src/schemas/user.ts`, `src/types/user.ts`

#### 属性定義

| 属性名 | 型     | 必須 | 制約               | 説明                 |
| ------ | ------ | ---- | ------------------ | -------------------- |
| id     | number | ○    | 正の整数、自動増分 | ユーザーの一意識別子 |
| name   | string | ○    | 1文字以上          | ユーザー名           |
| email  | string | ○    | メール形式         | メールアドレス       |
| age    | number | -    | 0以上の整数        | 年齢                 |

#### Zodスキーマ定義

```typescript
// 基本スキーマ
export const userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  age: z.number().int().min(0, 'Age must be a positive integer').optional(),
});

// 作成用スキーマ（IDを除外）
export const userCreateSchema = userSchema.omit({ id: true });

// 更新用スキーマ（部分更新対応）
export const userUpdateSchema = userCreateSchema.partial();
```

#### 型定義

```typescript
export type User = z.infer<typeof userSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
```

## データストレージ設計

### 現在の実装（メモリ内）

#### データ構造

```typescript
// メモリ内ストレージ
let users: User[] = [];
let nextId = 1;
```

#### 特徴

- **メリット**
  - 高速なアクセス
  - 設定不要
  - 開発・テスト環境での利用に適している

- **デメリット**
  - データの永続化なし
  - アプリケーション再起動時にデータ消失
  - メモリ使用量の増加

## 将来のデータベース設計

### テーブル設計

#### users テーブル

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    age INTEGER CHECK (age >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### インデックス設計

```sql
-- メール検索の高速化
CREATE INDEX idx_users_email ON users(email);

-- 年齢範囲検索の高速化
CREATE INDEX idx_users_age ON users(age);

-- 作成日時での並び替え
CREATE INDEX idx_users_created_at ON users(created_at);
```

## バリデーション設計

### 入力バリデーション

#### 作成時バリデーション

- **name**: 1文字以上の文字列
- **email**: 有効なメールアドレス形式
- **age**: 0以上の整数（任意）

#### 更新時バリデーション

- **name**: 1文字以上の文字列（任意）
- **email**: 有効なメールアドレス形式（任意）
- **age**: 0以上の整数（任意）

### ビジネスルール

#### 一意性制約

- **email**: 重複不可（将来のDB実装時）
- **id**: システム生成、重複不可

#### データ整合性

- **name**: 空文字、null不可
- **email**: 無効な形式は拒否
- **age**: 負の値は拒否

## エラーハンドリング設計

### バリデーションエラー

#### エラーレスポンス形式

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    },
    {
      "field": "age",
      "message": "Age must be a positive integer"
    }
  ]
}
```

#### HTTPステータスコード

- **400**: バリデーションエラー
- **404**: リソースが見つからない
- **409**: 重複エラー（将来のDB実装時）
- **500**: サーバー内部エラー

## パフォーマンス考慮事項

### 現在の実装

- **検索**: O(n) - 線形検索
- **追加**: O(1) - 配列末尾追加
- **削除**: O(n) - 要素検索＋削除

### 将来の最適化

- **インデックス**: 検索パフォーマンスの向上
- **キャッシュ**: 頻繁にアクセスされるデータのキャッシュ
- **ページネーション**: 大量データの効率的な取得

## 拡張性考慮事項

### 新しい属性の追加

- Zodスキーマの拡張
- 型定義の更新
- マイグレーションスクリプト（DB実装時）

### 関連エンティティの追加

- **Profile**: ユーザーの詳細プロフィール
- **Role**: ユーザーの権限管理
- **Session**: ユーザーセッション管理

### 設計パターン

- **Repository Pattern**: データアクセス層の抽象化
- **Factory Pattern**: エンティティの生成
- **Observer Pattern**: データ変更の通知

## セキュリティ考慮事項

### データ保護

- 機密情報の暗号化（将来実装）
- パスワードのハッシュ化（将来実装）
- 個人情報の適切な管理

### アクセス制御

- データアクセス権限の管理
- 認証・認可の実装
- 監査ログの記録

## 移行計画

### Phase 1: 現在の実装

- メモリ内ストレージ
- 基本的なCRUD操作

### Phase 2: データベース導入

- PostgreSQL/MySQL接続
- マイグレーションスクリプト
- 接続プールの実装

### Phase 3: 高度な機能

- 全文検索機能
- 分析用データウェアハウス
- リアルタイム同期
