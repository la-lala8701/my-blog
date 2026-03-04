## プロダクト概要
本プロダクトは、誰でも手軽に始められる、オープンなブログプラットフォームです。<br>
アカウントを作成することで、誰でもすぐに自分の好きなことや伝えたいことを投稿することができます。<br>
投稿された記事はログイン不要で誰でも自由に閲覧可能です。

## URL
https://my-blog-snowy-three-41.vercel.app/

## 機能一覧
- 記事のCRUD
  - Markdownでの記事作成機能
  - Preview機能
- 公開・非公開制御
- 認証機能
  - 新規登録
  - ログイン
  - ログアウト
- プロフィール編集
  - プロフィール画像投稿
  - 表示名編集
  - 自己紹介文編集
- パスワート変更
- 検索・絞り込み機能

## 使用技術
### フロントエンド
- React
- Next.js(App Router)
- TypeScript
- Tailwind CSS
### バックエンド / インフラ
- Supabase
  - PostgreSQL
  - Authentication
  - Row Level Security(RLS)
- Vercel
### 開発ツール
- ESLint
- Prettier

## インフラ構成図
``` mermaid
graph TD
    subgraph Client ["Browser / Client"]
        User["User Device"]
    end

    subgraph Vercel ["Vercel (Frontend)"]
        NextJS["Next.js App (App Router)"]
        ServerActions["Server Actions / API Routes"]
    end

    subgraph Supabase ["Supabase (Backend as a Service)"]
        Auth["Supabase Auth (Authentication)"]
        DB[(PostgreSQL Database)]
        Storage["Supabase Storage (Images)"]
        RLS["Row Level Security (Policy)"]
    end

    %% Interactions
    User <-->|HTTPS / UI| NextJS
    NextJS <-->|Data Fetching| ServerActions
    
    ServerActions <-->|Admin Access / Secret Key| DB
    User <-->|Client Side Access / Public Key| Auth
    User <-->|Direct Data Access| RLS
    RLS --- DB
    
    %% Optional Storage Interaction
    User -.->|Upload / View| Storage
```

## ER図
``` mermaid
erDiagram
    auth_users ||--|| profiles : "1:1 (id = id)"
    auth_users ||--o{ posts : "1:N (id = user_id)"

    auth_users {
        uuid id PK "Primary Key"
        string email
    }

    profiles {
        uuid id PK, FK "References auth.users.id"
        text display_name
        text description
        text avatar_url
    }

    posts {
        uuid id PK
        uuid user_id FK "References auth.users.id"
        text title
        text content
        boolean is_published
        timestamp created_at
        timestamp updated_at
    }
```

## 工夫した点 / 設計意図
- Supabase Authの認証情報をもとに、閲覧可能なページを制御しました
- SupabaseのRLSを利用し、DBレベルで権限を厳格に分けてセキュリティを担保しました
- Server / Client Component の責務分離を意識しました

## 苦労した点 / 学んだこと
### Server / Client Component の責務分離について
記事詳細ページの実装において、Server Component と Client Component の責務分離に苦労しました。<br>
当初はデータ取得とUI操作を同一コンポーネントで扱っていたため、`loading.tsx` が正しく発火せず、意図したローディング表示が行われない問題がありました。

そこで以下のように役割を分離し、Server Component の階層を適切に保つ構造へ再設計しました。
- データ表示部分を Server Component (PostContent)
- ユーザー操作部分を Client Component (PostActions)

その結果、データ取得中に `loading.tsx` が正しく表示されるようになり、ページ遷移時のローディング体験を改善できました。<br>
この経験から、App Router におけるコンポーネント設計の重要性を学びました。

## 今後の展望 / 改良予定
### データベース・リレーションの最適化
#### 現状の課題
現状、`posts` と `profiles` がそれぞれ独立してauth.usersを参照しているため、Next.jsから「投稿一覧と、それぞれの投稿者の名前」を1回のクエリで取得したい場合、記述が少し複雑になる。
#### 改善
今後、 `posts.user_id` の参照先を `auth.users.id` から `profiles.id` へ変更する
#### 期待される効果
データベース側（PostgreSQL）で結合処理を完結させ、単一クエリで階層化されたデータを効率的に取得できるようにする

