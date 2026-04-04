# Day 12 — 4/20 (月): Project B 設計・実装・デプロイ

## 今日のゴール

Project A の経験を活かし、1日で設計→実装→公開を完結する。「AI を使えば非エンジニアでも1日でWebアプリを公開できる」を実証する。

> **前提**: Day10-11 と同様に Cursor + Vercel を使用します。セットアップは `account-setup.md` を参照。

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

**Step 2: Cursor で実装**

```bash
# 新しいプロジェクトを作成
cd ~
npx create-next-app@latest project-b
```

質問にはすべてデフォルト（Enter）で回答する。

```bash
cd project-b
npm run dev
```

http://localhost:3000 でデフォルトページが表示されることを確認。

**Step 3: AI にコードを書かせる**

Cursor で `src/app/page.tsx` を開き、AI チャット（Ctrl+L）で:

```
このpage.tsxを以下の要件で書き換えてください。

[要件定義書の内容]

V0で生成されたコードのスタイルを参考にしてください:
[V0のコードを貼り付ける（任意）]
```

**Step 4: エラー修正と機能追加**

Day11 と同じ方法:
1. エラーが出たらエラーメッセージを AI に貼る
2. 修正を適用
3. 追加機能は1つずつ指示する

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

### AIレディネス診断プレイブック作成

「ある業務がAIで効率化できるかどうか」を判断するフレームワークを作る。

Claude に以下のように指示する:

```
「業務のAI化可否を判断するフレームワーク」を作ってください。

以下の評価軸を含めてください:
1. 業務の定型性（高い/中/低い）
2. データの構造化度合い（構造化/半構造化/非構造化）
3. 判断の複雑さ（ルールベース/経験ベース/創造性要求）
4. エラー許容度（高い=多少のミスOK / 低い=ミス不可）
5. 現在の工数（大きい業務ほどROIが高い）

各評価軸にスコアをつけ、合計スコアで「AI化推奨 / 要検討 / 非推奨」を判定するマトリクスを作ってください。
```

成果物: `training/day-12/ai-readiness-playbook.md`

## 参考リソース

- Day10 の要件定義プロセス（参照して高速化する）
- Day11 の実装・デプロイプロセス（同じ手順を繰り返す）
- [V0 公式サイト](https://v0.dev)
- [Vercel デプロイガイド](https://vercel.com/docs/deployments/overview)
