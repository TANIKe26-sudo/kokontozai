# kokontozai


## ディレクトリ構成

```text
kokontozai/
├── frontend/   # React + Vite
├── backend/    # PHP API
└── README.md
```

画面で使う画像素材は `frontend/public/images/` に置きます。React からは `<img src="/images/photo.png" alt="説明" />` のように参照します。

## 開発に必要なもの

- Git
- [Node.js 22 LTS](https://nodejs.org/en/download/)（22.12 以上。npm も一緒にインストールされます）
- [PHP 8.4 以上](https://www.php.net/downloads.php)（CLI を使えること）

PHP はインストール後、`php` コマンドをターミナルから実行できるよう PATH を設定してください。

インストール確認:

```sh
git --version
node --version
npm --version
php --version
```

## 初回セットアップ

リポジトリを clone したあと、フロントエンドの依存パッケージをインストールします。

```sh
git clone https://github.com/TANIKe26-sudo/kokontozai.git
cd frontend
npm ci
```
(npm ciの代わりにnpm installでも多分可能)

## 開発サーバーの起動

ターミナルを2つ開き、フロントエンドとバックエンドをそれぞれ起動します。

ターミナル1（React）:

```sh
cd frontend
npm run dev
```

ターミナル2（PHP）:

```sh
cd backend
php -S 127.0.0.1:8000 -t public public/router.php
```

ブラウザで `http://localhost:5173` を開きます。

(PHP API は `http://127.0.0.1:8000/api/health` で確認でき、フロントエンドからは Vite の proxy を通して `http://localhost:5173/api/health` で呼び出せます。どちらも `{"status":"ok"}` が返れば起動できています。)


サーバーを止めるときは、それぞれのターミナルで `Ctrl+C` を押してください。
