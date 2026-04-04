# Day 12 — 4/20 (月): Project B 設計・実装・デプロイ

## 今日のゴール

Project A の経験を活かし、1日で設計→実装→公開を完結する。**今回は Cursor の AI ではなく Claude Code（デスクトップアプリ）を使って開発する。** Cursor での開発と Claude Code での開発の違いを体感する。

> **前提**: Vercel のセットアップが完了していること。Claude Code デスクトップアプリをインストール済みであること（https://claude.ai/download）。
>
> **ツールの使い分け**: コードの生成・修正は **Claude Code デスクトップアプリ** で行う。ファイルの中身を確認したり手動で編集したいときは **Cursor** を併用してOK。

---

## 必須課題

### 課題1: 要件定義書を作成する

**Project A とは異なるテーマを選ぶこと。**

**テーマの選び方のコツ:**
- Project A がデータ表示系なら → Project B はフォーム・入力系
- Project A が社内向けなら → Project B は顧客向け
- Project A がダッシュボードなら → Project B はランディングページ

**テーマ例:**
- 展示会来場者向けサービス紹介LP
- 営業提案カスタマイズツール（選択肢に応じてコンテンツが変わる）
- AIレディネス簡易診断ツール（質問に答えるとスコアが出る）
- チーム週報自動生成テンプレート
- 商談議事録テンプレートジェネレーター

**手順（Day10 より高速に進める）:**

1. Claude に以下を1回で投げる:

```
以下のWebアプリの要件定義書を作成してください。

テーマ: [選んだテーマ]
対象ユーザー: [誰が使うか]
目的: [何を実現するか]

以下の構成でまとめてください:
1. 背景
2. ゴール
3. スコープ（作るもの / 作らないもの）
4. ターゲットユーザー
5. 主要機能（3-5個）
6. 画面構成

制約: Next.js + Tailwind CSS、データベース不要、1日で実装可能な規模
```

2. 出力を確認し、必要に応じて修正する
3. Day10 では「構成→要点→詳細」と段階的に進めたが、今回はまとめて出して修正する方式を試す

成果物: `training/day-12/project-b-requirements.md`

---

### 課題2: モックアップ → 実装

**Day10-11 で学んだプロセスを高速に回す。**

**Step 1: V0 でモックアップ → コード生成**

1. https://v0.dev を開く
2. 要件定義書の内容を貼り付けて UI を生成する
3. V0 が生成したコードをコピーする（「Code」タブ）

**Step 2: Claude Code デスクトップアプリでプロジェクトを作成・実装する**

> **Plan モードを忘れずに**: Day11 で学んだとおり、いきなり「全部作って」ではなく、まず計画を立てさせてからフィードバック → 実装の順で進める。Claude Code でも同じ原則。

1. Claude Code デスクトップアプリを開く
2. 新しいチャットを開き、**まず計画を立てさせる:**

```
以下のWebアプリの実装計画を立ててください。まだコードは書かないでください。

[要件定義書の内容を貼り付ける]

技術的な制約:
- Next.js App Router + Tailwind CSS を使用
- データベースは使わない（ブラウザのlocalStorageまたは状態管理で完結）
- 日本語のUI
- プロジェクト名は project-b、作成場所は ~/project-b

V0で生成されたコードのスタイルを参考にしてください:
[V0のコードを貼り付ける（任意）]
```

3. 計画を確認し、フィードバックがあれば伝える
4. 計画がOKなら「この計画で実装してください」と指示する

3. Claude Code がファイルを作成・編集していく様子を確認する
4. 途中で確認したいファイルがあれば、Cursor で `~/project-b` フォルダを開いて中身を見てもOK

> **Day11 との違いに注目**: Cursor の AI は「このファイルを書き換えて」とファイル単位で指示した。Claude Code は「このアプリを作って」とプロジェクト全体を任せられる。この違いを意識しよう。

**Step 3: 動作確認とエラー修正**

1. Cursor のターミナルまたは Ghostty で開発サーバーを起動する:

```bash
cd ~/project-b
npm run dev
```

2. http://localhost:3000 でアプリを確認する
3. エラーや修正したい点があれば、Claude Code のチャットにそのまま伝える:

```
http://localhost:3000 で確認したところ、以下の問題があります:
- [問題の内容]
修正してください。
```

4. 追加機能も Claude Code に指示する。1つずつ依頼してもいいし、まとめて伝えてもいい

---

### 課題3: Vercel デプロイ + リリースノート

**Step 1: GitHub にプッシュ**

```bash
cd ~/project-b
git init
git add .
git commit -m "feat: initial Project B implementation"
```

GitHub で新しいリポジトリ `project-b` を作成（https://github.com/new）し、プッシュ:

```bash
git remote add origin git@github.com:[自分のGitHubユーザー名]/project-b.git
git branch -M main
git push -u origin main
```

**Step 2: Vercel にデプロイ**

1. https://vercel.com → 「Add New...」→「Project」
2. `project-b` リポジトリを Import
3. 「Deploy」をクリック
4. 公開URL を確認

**この画面が出たらスクリーンショットを撮ってください。**

**Step 3: リリースノートを作成**

Day11 と同じ形式で以下を作成する:

```markdown
# Project B リリースノート

## プロジェクト名
[ツール名]

## 公開URL
[Vercel の公開URL]

## 概要
[何ができるツールか]

## 主要機能
1. [機能1]
2. [機能2]
3. [機能3]

## Project A との比較
- 設計にかかった時間: A=○時間 vs B=○時間
- 実装にかかった時間: A=○時間 vs B=○時間
- AI への依頼回数: A=○回 vs B=○回
- 自分で修正した割合: A=○% vs B=○%

## Cursor AI vs Claude Code の違い
- Cursor AI での開発体験: [良かった点 / やりにくかった点]
- Claude Code での開発体験: [良かった点 / やりにくかった点]
- どちらが自分に合っていたか、その理由:

## 学び
- Project A から改善した点: [具体的に]
- まだ課題に感じる点: [具体的に]
- 非エンジニアがAIで開発することの可能性と限界: [率直な感想]
```

成果物:
- `training/day-12/project-b-requirements.md`
- `training/day-12/project-b-release-note.md`

---

## Git操作（研修リポジトリへの提出）

Ghostty または Cursor のターミナル（`` Ctrl + ` ``）を開いて、研修リポジトリに移動します。

```bash
# 研修リポジトリに移動（クローン先がデスクトップの場合）
cd ~/Desktop/spec-ai-training
git pull origin main
git checkout -b training/day-12-project-b

```

**ファイルの作り方（Cursor を使う）:**

Cursor のサイドバーで `training/day-12` フォルダを右クリック → 「New File」でファイルを作成する。フォルダが存在しない場合は `training` を右クリック → 「New Folder」→ `day-12` と入力。

```bash
# (ファイルを作成・編集した後)
git add training/day-12/
git status
```

以下のファイルが表示されればOK:
```
new file:   training/day-12/project-b-requirements.md
new file:   training/day-12/project-b-release-note.md
new file:   training/day-12/daily-report.md
```

```bash
git commit -m "docs: add Day12 Project B requirements and release note"
git push origin training/day-12-project-b
```

**GitHubでPRを作成:**
1. https://github.com/あなたのユーザー名/spec-ai-training を開く
2. 「Compare & pull request」をクリック
3. **base repository** が自分のリポジトリになっていることを確認（親リポジトリが選ばれていたら変更）
4. タイトル: `Day12: Project B 設計・実装・デプロイ完了`
5. テンプレートに記入（公開URLを必ず記載）→ 「Create pull request」

---

## ヒント

- Day10-11 の経験を活かす。「前回詰まったところ」を先に対処する
- スピード重視。完璧な完成度より「1日で設計→実装→公開」の一気通貫を体験する
- Project A と異なるタイプのツールにすると学びが広がる
- V0 で生成したコードをベースにすると、実装が早く進む
- デプロイでエラーが出たら、Day11 と同じ手順で対処する
- **Claude Code はプロジェクト全体を見渡して作業できる点が Cursor AI と異なる。** 指示の粒度を変えて試してみよう

## 提出方法

1. 以下のファイルを `training/day-12/` に配置:
   - `project-b-requirements.md` — 要件定義書
   - `project-b-release-note.md` — リリースノート（公開URL記載）
   - `daily-report.md` — 日報
2. `git add` → `git commit` → `git push`
3. GitHub で PR を作成
4. Slack で「Day12 PR作成しました: [PR の URL] / 公開URL: [Vercel URL]」と報告

## 理解度チェック（クイズ）

- `quizzes/index.html` をブラウザで開く（ファイルをダブルクリック、または Chrome にドラッグ&ドロップ）
- 自分の名前を入力する
- 「Day12」を選択してクイズを受ける
- 100点になるまで何度でも再受験可能
- 100点の画面をスクリーンショットして保存する（PR提出時に添付）

## 早期完了者向け追加課題

### 追加1: Cursor 拡張機能としての Claude Code を試す

Cursor には Claude Code を拡張機能として組み込むことができる。デスクトップアプリ版との違いを体験してみよう。

1. Cursor の拡張機能マーケットプレイスで「Claude Code」を検索してインストールする
2. Project B と同じような小さな修正タスクを、Cursor 拡張機能版の Claude Code で実行する
3. デスクトップアプリ版との操作感の違いをメモする

### 追加2: Claude Code CLI をターミナルにインストールして試す

Claude Code はターミナルから直接使える CLI 版もある。Cursor のターミナルまたは Ghostty にインストールして、コマンドラインから開発タスクを試してみよう。

1. Claude Code CLI のインストール方法を Claude に聞く
2. インストールして、ターミナルから Claude Code を起動する
3. Project B に対して簡単な修正（例: テキストの変更、スタイルの調整）を CLI から指示してみる
4. デスクトップアプリ版・Cursor 拡張版・CLI 版の3つの体験を比較する

成果物: `training/day-12/claude-code-comparison.md`（3つの開発方法の比較メモ）

## 参考リソース

- Day10 の要件定義プロセス（参照して高速化する）
- Day11 の実装・デプロイプロセス（同じ手順を繰り返す）
- [Claude Code ドキュメント](https://docs.anthropic.com/en/docs/claude-code)
- [V0 公式サイト](https://v0.dev)
- [Vercel デプロイガイド](https://vercel.com/docs/deployments/overview)
