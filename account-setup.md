# アカウントセットアップチェックリスト

最終更新: 2026-04-04

> Day1 終了時点で必須アカウントをすべて作成・動作確認すること。
> Day2 の朝にアカウントトラブルで時間を消費するのを防ぐ。

---

## 必須（Day2 開始前に完了）

| ツール | URL | アカウント種別 | 備考 |
|--------|-----|---------------|------|
| **Google Gemini** | gemini.google.com | チーム課金済み | Advanced プラン。Deep Research 使用可能。招待メールを確認してログイン |
| **Claude** | claude.ai | チーム課金済み | Pro プラン。Opus / Sonnet / Haiku 使い分け。招待メールを確認してログイン |
| **ChatGPT** | chatgpt.com | 個人アカウント（無料 or Plus） | 基本機能は無料で可。Deep Research は Plus 必要 |
| **GitHub** | github.com | 個人アカウント | 事前にアクセス権付与済み。招待メールを承認する |

## 推奨（Week 1 中に作成）

| ツール | URL | アカウント種別 | 備考 |
|--------|-----|---------------|------|
| **NotebookLM** | notebooklm.google.com | Google アカウント | Gemini と同じアカウントで可 |
| **Manus** | manus.im | 個人アカウント | 調査エージェント。無料枠あり |
| **Genspark** | genspark.ai | 個人アカウント | 調査エージェント。無料 |
| **Google Stitch** | stitch.google.com | Google アカウント | デザインモックアップ |
| **Canva** | canva.com | 個人アカウント | AI デザイン機能。無料枠あり |

## Phase 3 開始前に準備（Day8 まで）

| ツール | URL | アカウント種別 | 備考 |
|--------|-----|---------------|------|
| **Cursor** | cursor.com | 個人アカウント | AI コードエディタ。Pro 推奨だが無料枠で開始可 |
| **Vercel** | vercel.com | GitHub 連携 | デプロイ先。GitHub アカウントでサインアップ |
| **V0** | v0.dev | Vercel アカウント | AI デザイン → コード生成 |

---

## セットアップ手順

### 1. Git / GitHub / SSH / Fork / Clone

**`README.md` のセクション 3〜6 に詳細な手順があります。** そちらを参照してください。

概要:
1. ターミナルの準備（README セクション3）
2. Git のインストールと初期設定（README セクション4-1〜4-3）
3. SSH キーの生成と GitHub への登録（README セクション4-4）
4. リポジトリのフォーク（README セクション5）
5. フォークしたリポジトリのクローン（README セクション6）

### 2. Cursor 初期設定（Day8）

1. cursor.com からダウンロード・インストール
2. 起動後、GitHub アカウントでサインイン
3. Settings > Models でAIモデルが有効になっていることを確認
4. File > Open Folder で研修リポジトリのフォルダを開く
5. ターミナル（Ctrl+`）で `git status` が通ることを確認

### 3. Vercel 初期設定（Day9）

1. vercel.com で「Continue with GitHub」を選択しサインアップ
2. チーム招待メールが届いている場合は承認する
3. デプロイは Day10 で実施（Cursor からプロジェクトを Vercel に接続）

---

## トラブルシューティング

| 問題 | 対応 |
|------|------|
| Git push で Permission denied | SSH キーが GitHub に登録されていない → 上記「SSH キー生成」の手順を再実行。解決しない場合は Slack で報告 |
| Claude が使えない | 招待メールを検索（件名: "invitation"）→ 見つからない場合は Slack で報告 |
| Gemini Deep Research が使えない | gemini.google.com にログイン → Advanced プランが有効か確認 → 無効なら Slack で報告 |
| Cursor で AI が動かない | Settings > Models でモデルが有効か確認 → Sign Out → 再ログイン → 解決しない場合は Slack で報告 |
| `ssh -T git@github.com` で接続失敗 | `~/.ssh/id_ed25519.pub` が存在するか確認 → 存在しなければ鍵生成からやり直す |
