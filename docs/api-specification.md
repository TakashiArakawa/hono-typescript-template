# API仕様書

## 概要

Hono TypeScript Template User Management APIの詳細仕様書です。すべてのエンドポイント、リクエスト/レスポンス形式、エラーハンドリングについて記載しています。

## 基本情報

### ベースURL

- **開発環境**: `http://localhost:3000`
- **本番環境**: `https://your-domain.com`

### データ形式

- **リクエスト**: `application/json`
- **レスポンス**: `application/json`

### 文字エンコーディング

- **UTF-8**

## エンドポイント一覧

### 1. ヘルスチェック

#### GET /

アプリケーションの稼働状態を確認

**リクエスト**

```http
GET /
```

**レスポンス**

```http
HTTP/1.1 200 OK
Content-Type: text/plain

Hello from Hono!
```

#### GET /ping

接続テスト用エンドポイント

**リクエスト**

```http
GET /ping
```

**レスポンス**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "pong"
}
```

### 2. ユーザー管理

#### POST /users

新しいユーザーを作成

**リクエスト**

```http
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

**リクエストボディ**
| フィールド | 型 | 必須 | 説明 |
|------------|-----|------|------|
| name | string | ○ | ユーザー名（1文字以上） |
| email | string | ○ | メールアドレス（有効な形式） |
| age | number | - | 年齢（0以上の整数） |

**レスポンス（成功）**

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }
}
```

**レスポンス（バリデーションエラー）**

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": {
    "issues": [
      {
        "code": "invalid_string",
        "expected": "email",
        "message": "Invalid email",
        "path": ["email"]
      }
    ],
    "name": "ZodError"
  }
}
```

#### GET /users

すべてのユーザーを取得

**リクエスト**

```http
GET /users
```

**レスポンス**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "age": 30
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com"
    }
  ]
}
```

#### GET /users/:id

指定されたIDのユーザーを取得

**リクエスト**

```http
GET /users/1
```

**パスパラメータ**
| パラメータ | 型 | 説明 |
|------------|-----|------|
| id | number | ユーザーID |

**レスポンス（成功）**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }
}
```

**レスポンス（ユーザーが見つからない）**

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": "User not found"
}
```

#### PUT /users/:id

指定されたIDのユーザー情報を更新

**リクエスト**

```http
PUT /users/1
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "age": 31
}
```

**パスパラメータ**
| パラメータ | 型 | 説明 |
|------------|-----|------|
| id | number | ユーザーID |

**リクエストボディ**
| フィールド | 型 | 必須 | 説明 |
|------------|-----|------|------|
| name | string | - | ユーザー名（1文字以上） |
| email | string | - | メールアドレス（有効な形式） |
| age | number | - | 年齢（0以上の整数） |

**レスポンス（成功）**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "user": {
    "id": 1,
    "name": "John Updated",
    "email": "john.updated@example.com",
    "age": 31
  }
}
```

**レスポンス（ユーザーが見つからない）**

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": "User not found"
}
```

#### DELETE /users/:id

指定されたIDのユーザーを削除

**リクエスト**

```http
DELETE /users/1
```

**パスパラメータ**
| パラメータ | 型 | 説明 |
|------------|-----|------|
| id | number | ユーザーID |

**レスポンス（成功）**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "User deleted"
}
```

**レスポンス（ユーザーが見つからない）**

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": "User not found"
}
```

## HTTPステータスコード

### 成功レスポンス

| コード | 説明                       |
| ------ | -------------------------- |
| 200    | OK - リクエスト成功        |
| 201    | Created - リソース作成成功 |

### クライアントエラー

| コード | 説明                                        |
| ------ | ------------------------------------------- |
| 400    | Bad Request - リクエストが無効              |
| 404    | Not Found - リソースが見つからない          |
| 422    | Unprocessable Entity - バリデーションエラー |

### サーバーエラー

| コード | 説明                                       |
| ------ | ------------------------------------------ |
| 500    | Internal Server Error - サーバー内部エラー |

## バリデーション

### 入力バリデーション

#### name フィールド

- **型**: string
- **制約**: 1文字以上
- **エラーメッセージ**: "Name is required"

#### email フィールド

- **型**: string
- **制約**: 有効なメールアドレス形式
- **エラーメッセージ**: "Invalid email format"

#### age フィールド

- **型**: number
- **制約**: 0以上の整数
- **エラーメッセージ**: "Age must be a positive integer"

### バリデーションエラーレスポンス

Zodバリデーションエラーは以下の形式で返されます：

```json
{
  "error": {
    "issues": [
      {
        "code": "too_small",
        "minimum": 1,
        "type": "string",
        "inclusive": true,
        "exact": false,
        "message": "String must contain at least 1 character(s)",
        "path": ["name"]
      },
      {
        "validation": "email",
        "code": "invalid_string",
        "message": "Invalid email",
        "path": ["email"]
      },
      {
        "code": "too_small",
        "minimum": 0,
        "type": "number",
        "inclusive": true,
        "exact": false,
        "message": "Number must be greater than or equal to 0",
        "path": ["age"]
      }
    ],
    "name": "ZodError"
  }
}
```

## レート制限

現在のバージョンではレート制限は実装されていません。将来のバージョンで実装予定です。

### 将来の実装予定

- **制限**: 1分間に100リクエスト
- **ヘッダー**:
  - `X-RateLimit-Limit`: 制限値
  - `X-RateLimit-Remaining`: 残り回数
  - `X-RateLimit-Reset`: リセット時刻

## 認証・認可

現在のバージョンでは認証・認可機能は実装されていません。すべてのエンドポイントにパブリックアクセスが可能です。

### 将来の実装予定

- **認証方式**: JWT Bearer Token
- **ヘッダー**: `Authorization: Bearer <token>`
- **権限**: User, Admin

## CORS設定

現在のバージョンではCORS設定は実装されていません。必要に応じて設定を追加してください。

## リクエスト例

### cURLを使用した例

#### ユーザー作成

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }'
```

#### ユーザー一覧取得

```bash
curl http://localhost:3000/users
```

#### ユーザー詳細取得

```bash
curl http://localhost:3000/users/1
```

#### ユーザー更新

```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "email": "john.updated@example.com"
  }'
```

#### ユーザー削除

```bash
curl -X DELETE http://localhost:3000/users/1
```

## JavaScript/TypeScriptでの使用例

```typescript
// ユーザー作成
const createUser = async (userData: { name: string; email: string; age?: number }) => {
  const response = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Failed to create user');
  }

  return response.json();
};

// ユーザー一覧取得
const getUsers = async () => {
  const response = await fetch('http://localhost:3000/users');

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
};

// ユーザー詳細取得
const getUser = async (id: number) => {
  const response = await fetch(`http://localhost:3000/users/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  return response.json();
};
```

## 変更履歴

### v1.0.0 (2024-01-01)

- 初期リリース
- 基本的なCRUD操作
- Zodバリデーション
- Vitestテスト

### 今後の予定

- v1.1.0: データベース接続
- v1.2.0: 認証・認可機能
- v1.3.0: レート制限
- v2.0.0: GraphQL対応
