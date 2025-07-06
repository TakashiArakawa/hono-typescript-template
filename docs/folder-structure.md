# フォルダ構成

## 概要

Hono TypeScript Templateプロジェクトのフォルダ構成について説明します。このプロジェクトは、保守性と拡張性を重視した構造になっています。

## プロジェクトルート構成

```
hono_sample/
├── docs/                    # プロジェクトドキュメント
├── src/                     # ソースコード
├── tests/                   # テストファイル
├── node_modules/            # 依存パッケージ（自動生成）
├── CLAUDE.md                # Claude Code用設定ファイル
├── README.md                # プロジェクト説明書
├── package.json             # パッケージ設定
├── package-lock.json        # 依存関係ロック
├── tsconfig.json            # TypeScript設定
├── vitest.config.ts         # Vitestテスト設定
├── eslint.config.js         # ESLint設定
├── eslint.config.ts         # ESLint設定（TypeScript版）
└── vitest                   # Vitestバイナリ（自動生成）
```

## ディレクトリ詳細

### `/docs` - ドキュメントディレクトリ

プロジェクトの設計書や仕様書を格納します。

```
docs/
├── overview.md             # プロジェクト概要
├── requirements.md         # 要求定義書
├── data-model.md          # データモデル設計書
├── api-specification.md   # API仕様書
├── development.md         # 開発ガイド
└── folder-structure.md    # フォルダ構成（このファイル）
```

#### 各ファイルの役割

- **overview.md**: プロジェクトの詳細な概要と技術スタック
- **requirements.md**: 機能要件、非機能要件、制約事項
- **data-model.md**: データベース設計、エンティティ定義
- **api-specification.md**: エンドポイント仕様、リクエスト/レスポンス形式
- **development.md**: 開発者向けガイドとベストプラクティス
- **folder-structure.md**: プロジェクト構成の説明（このファイル）

### `/src` - ソースコードディレクトリ

アプリケーションのメインコードを格納します。

```
src/
├── app.ts                  # Honoアプリケーション（ルート定義）
├── index.ts                # サーバーエントリーポイント
├── schemas/                # Zodバリデーションスキーマ
│   └── user.ts             # ユーザーデータのスキーマ定義
└── types/                  # 型定義
    └── user.ts             # ユーザー関連の型定義
```

#### 各ファイルの役割

- **app.ts**: Honoアプリケーションの設定とルート定義
- **index.ts**: サーバーの起動エントリーポイント
- **schemas/user.ts**: Zodを使用したユーザーデータのバリデーションスキーマ
- **types/user.ts**: TypeScript型定義（Zodスキーマから自動生成）

### `/tests` - テストディレクトリ

Vitestを使用したテストファイルを格納します。

```
tests/
├── app.test.ts             # アプリケーション基本機能のテスト
├── index.test.ts           # サーバー起動に関するテスト
└── users.test.ts           # ユーザーAPI機能のテスト
```

#### テストファイルの役割

- **app.test.ts**: `/`, `/ping`エンドポイントのテスト
- **index.test.ts**: サーバー起動機能のテスト
- **users.test.ts**: ユーザーCRUD操作のテスト

### 設定ファイル

#### TypeScript設定

- **tsconfig.json**: TypeScriptコンパイラの設定
  - `strict: true`: 厳密な型チェック
  - `module: "node16"`: Node.js 16+ ESM対応
  - `target: "es2022"`: 最新のECMAScript機能使用

#### テスト設定

- **vitest.config.ts**: Vitestテストランナーの設定
  - カバレッジ設定（60%閾値）
  - テスト対象ファイルの指定

#### コード品質設定

- **eslint.config.js/ts**: ESLint静的解析設定
  - TypeScript対応
  - Prettier統合

#### パッケージ管理

- **package.json**: プロジェクトのメタデータと依存関係
  - `"type": "module"`: ESMモジュール使用
  - スクリプト定義（start, test, check等）

## 命名規則

### ファイル命名

- **TypeScriptファイル**: `.ts`拡張子
- **テストファイル**: `.test.ts`拡張子
- **設定ファイル**: `config.ts`形式

### ディレクトリ命名

- **複数形**: `schemas`, `types`, `tests`
- **小文字**: すべて小文字のケバブケース
- **機能別**: 機能ごとにディレクトリを分割

### 変数・関数命名

- **camelCase**: 変数、関数名
- **PascalCase**: 型名、インターフェース名
- **UPPER_CASE**: 定数

## 拡張時の構成案

将来的な機能拡張を考慮した構成案です。

### 中規模プロジェクト構成

```
src/
├── app.ts
├── index.ts
├── controllers/            # コントローラー層
│   ├── userController.ts
│   └── authController.ts
├── services/              # ビジネスロジック層
│   ├── userService.ts
│   └── authService.ts
├── repositories/          # データアクセス層
│   ├── userRepository.ts
│   └── database.ts
├── middleware/            # カスタムミドルウェア
│   ├── auth.ts
│   └── logging.ts
├── schemas/
│   ├── user.ts
│   └── auth.ts
├── types/
│   ├── user.ts
│   └── auth.ts
└── utils/                 # ユーティリティ関数
    ├── validation.ts
    └── constants.ts
```

### 大規模プロジェクト構成

```
src/
├── app.ts
├── index.ts
├── modules/               # モジュール別構成
│   ├── users/
│   │   ├── controller.ts
│   │   ├── service.ts
│   │   ├── repository.ts
│   │   ├── schema.ts
│   │   └── types.ts
│   └── auth/
│       ├── controller.ts
│       ├── service.ts
│       ├── repository.ts
│       ├── schema.ts
│       └── types.ts
├── shared/                # 共通コンポーネント
│   ├── middleware/
│   ├── utils/
│   └── types/
└── config/                # 設定ファイル
    ├── database.ts
    └── server.ts
```

## 設計原則

### 1. 単一責任の原則

- 各ファイルは1つの責任を持つ
- ファイル名がその責任を表す

### 2. 関心の分離

- **schemas/**: バリデーションロジック
- **types/**: 型定義
- **tests/**: テストロジック

### 3. 依存関係の方向

- `app.ts` → `schemas/` → `types/`
- 循環依存を避ける

### 4. 拡張性

- 新機能追加時の影響を最小化
- モジュール間の疎結合

## 開発ワークフロー

### 新機能追加時の手順

1. **要求定義**: `docs/requirements.md`を更新
2. **データモデル**: `docs/data-model.md`を更新
3. **API仕様**: `docs/api-specification.md`を更新
4. **スキーマ作成**: `src/schemas/`にバリデーションスキーマを追加
5. **型定義**: `src/types/`に型定義を追加
6. **実装**: `src/app.ts`にルートを追加
7. **テスト**: `tests/`にテストケースを追加
8. **ドキュメント**: 必要に応じてドキュメントを更新

### コードレビュー時のチェックポイント

1. **ファイル配置**: 適切なディレクトリに配置されているか
2. **命名規則**: プロジェクトの命名規則に従っているか
3. **依存関係**: 適切な依存関係になっているか
4. **テスト**: 対応するテストが作成されているか
5. **ドキュメント**: 必要なドキュメントが更新されているか

## 自動生成ディレクトリ

以下のファイル・ディレクトリは自動生成されるため、`.gitignore`に追加されています。

- **node_modules/**: npm/yarnによる依存パッケージ
- **coverage/**: Vitestによるカバレッジレポート（テスト実行時に生成）
- **vitest**: Vitestバイナリファイル
- **dist/**: TypeScriptビルド出力（将来追加予定）

## 環境別設定

### 開発環境

- `tsx`による直接実行
- ホットリロード対応
- デバッグ情報出力

### 本番環境

- TypeScriptビルド済みJavaScript実行
- 最適化された設定
- ログレベル調整

## まとめ

このフォルダ構成は以下の特徴を持ちます：

1. **明確な責任分離**: 各ディレクトリが明確な役割を持つ
2. **拡張性**: 新機能追加が容易
3. **保守性**: コードの場所が予測しやすい
4. **テスト容易性**: テストとソースコードが分離されている
5. **ドキュメント重視**: 設計書と実装が連携している

プロジェクトの成長に合わせて、この構成を基に適切な拡張を行ってください。
