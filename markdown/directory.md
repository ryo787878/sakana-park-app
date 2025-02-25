my-fishing-park/
├─ app/                      // Next.js App Router のルートディレクトリ
│  ├─ (auth)/               // 認証系のページをまとめるフォルダ例
│  │  ├─ login/
│  │  │  └─ page.tsx        // ログインページ
│  │  ├─ register/
│  │  │  └─ page.tsx        // 新規登録ページ
│  │  └─ layout.tsx         // (auth) 下のページ共通レイアウト
│  ├─ admin/                // 管理者専用ページ (お知らせ、釣果投稿など)
│  │  ├─ page.tsx           // 管理者トップ or ダッシュボード
│  │  └─ announcements/     // お知らせ管理ページなど
│  ├─ (public)/             // ユーザー向けページ
│  │  ├─ page.tsx           // トップページ
│  │  ├─ news/
│  │  │  └─ page.tsx        // 一般ユーザー向けお知らせ閲覧ページ
│  │  ├─ catches/
│  │  │  └─ page.tsx        // 釣果報告の一覧ページ
│  ├─ layout.tsx            // 全体のレイアウト (ヘッダー、フッターなど)
│  └─ page.tsx              // ルート ('/') のページ
├─ components/              // UIコンポーネント（shadcn/uiのラップなど）
│  ├─ ui/                   // shadcn/ui のコンポーネントや派生
│  │  └─ button.tsx
│  └─ header.tsx            // サイト共通ヘッダーなど
├─ lib/                     // ロジックやヘルパー関数などをまとめる
│  └─ firebase.ts           // Firebase の初期化やラッパ (Client側)
├─ utils/                   // ユーティリティファイル (例: 日付フォーマットなど)
├─ public/                  // 画像や静的ファイル
├─ styles/                  // グローバルCSS, Tailwindなどを使う場合のCSS
│  └─ globals.css
├─ .env                     // 環境変数 (Firebaseの認証キーなど) ※実際は .env.local 推奨
├─ .gitignore
├─ package.json
├─ tsconfig.json
├─ next.config.js
└─ README.md