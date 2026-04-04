# Day 4 — 4/6 (月): 3ツール比較整理 + Markdown + Git

## 今日のゴール

Day1-3 で使った3ツールの使い分けを自分の言葉で整理する。Markdown で構造化ドキュメントを書けるようになる。Git/GitHub の基本操作（clone / add / commit / push / PR）を習得し、今日から成果物は Git で提出する。

---

## Morning Briefing — 30 min

- Markdown 記法の基本解説（15 min）
- Git の概念と基本操作の解説（15 min）

---

## 課題1: Markdown 基礎ハンズオン

Markdown（マークダウン）は、テキストに簡単な記号を加えるだけで見出し・箇条書き・表を表現できる記法。Day4 以降の成果物はすべて Markdown 形式で作成する。

**ハンズオン:**

1. [Markdown Tutorial](https://www.markdowntutorial.com/jp/) にアクセスする
2. チュートリアルを最後まで一通りやる（所要時間: 約30分）

**よく使う Markdown 記法（リファレンス）:**

| 記法 | 表示結果 | 用途 |
|------|---------|------|
| `# 見出し` | 大見出し | セクションタイトル |
| `## 小見出し` | 小見出し | サブセクション |
| `- 項目` | ・項目 | 箇条書き |
| `1. 項目` | 1. 項目 | 番号付きリスト |
| `**太字**` | **太字** | 強調 |
| `[テキスト](URL)` | リンク | 参照 |
| `> 引用` | 引用ブロック | 注意書き |
| `` `コード` `` | `コード` | コマンドや用語 |

> `.md` はMarkdown形式のファイルの拡張子。テキストファイルと同じように文字を書ける。

---

## 課題2: Cursor エディタのインストールと基本操作

これ以降、Markdown ファイルの作成・編集には **Cursor** エディタを使う。Cursor はコードエディタだが、Markdown の執筆やフォルダ・ファイル管理にも最適。

### Cursor をインストールする

1. https://www.cursor.com にアクセスする
2. 「Download」ボタンをクリックしてインストーラをダウンロード
3. ダウンロードした `.dmg` ファイルを開き、Cursor を `Applications` フォルダにドラッグ
4. アプリケーションフォルダから Cursor を起動する
5. 初回起動時のセットアップウィザードは、デフォルトのまま進めてOK

> **プランについて**: まずは無料プラン（Free）で使用する。AI 機能を本格的に使うタイミングで Shuto に連絡して課金プランに切り替える。

### フォルダを開く

1. Cursor を起動する
2. メニューの **「File」→「Open Folder...」** をクリック
3. 開きたいフォルダを選択する（例: `~/Desktop/spec-ai-training`）
4. 左側の **サイドバー** にフォルダ構成がツリー表示される

> Cursor でフォルダを開くと、そのフォルダ内のすべてのファイルをサイドバーから簡単に行き来できる。

### ファイルの作成と編集

**新しいファイルを作成する:**
1. サイドバーで作成したいフォルダを右クリック → **「New File」**
2. ファイル名を入力する（例: `tool-comparison-guide.md`）
3. エディタ領域が開くので、そのまま Markdown を書き始める

**既存のファイルを開く:**
- サイドバーでファイルをクリックするだけ

**Markdown のプレビュー:**
- ファイルを開いた状態で `Cmd + Shift + V` を押すとプレビューが表示される
- 書いた Markdown がどう見えるか確認できる

**保存:**
- `Cmd + S` で保存（こまめに保存する癖をつけること）

### ターミナルを開く

Cursor 内にターミナルが内蔵されている。Git 操作もここから実行できる。

- **`` Ctrl + ` ``**（Control + バッククォート）でターミナルパネルが開く
- またはメニューの **「Terminal」→「New Terminal」**
- このターミナルは、開いているフォルダがカレントディレクトリになっている

> Day4 以降の Git 操作は、Cursor 内のターミナルで実行するとフォルダ移動が不要で便利。

---

## 課題3: Git / GitHub セットアップ + 基礎操作

Git と GitHub を使うための初期設定を行い、実際に操作を体験する。**この設定は1回だけ実行すればOK。**

> 以下の各ステップは `README.md` のセクション3〜6に詳しい解説があります。詰まったら README を参照してください。

### ターミナルを開く

Ghostty（推奨）または Mac 標準のターミナル.app を起動する。
→ 詳細: README [セクション3: ターミナルの準備](../README.md#3-ターミナルterminalの準備)

### Git を確認する

```bash
git --version
```

バージョンが表示されればOK。「コマンドラインデベロッパーツールが必要」と出たら「インストール」をクリック。
→ 詳細: README [セクション4-1](../README.md#4-1-git-のインストール)

### GitHub アカウントを作成する

https://github.com でアカウントを作成する（既にある人はスキップ）。
→ 詳細: README [セクション4-2](../README.md#4-2-github-アカウントの作成)

### Git 初期設定

```bash
git config --global user.name "あなたの名前"
git config --global user.email "あなたのメールアドレス"
```

→ 詳細: README [セクション4-3](../README.md#4-3-git-の初期設定)

### SSH キーの設定

```bash
ssh-keygen -t ed25519 -C "あなたのメールアドレス"
```

パスフレーズの入力を求められたら、そのまま `Enter` を2回押す。

```bash
cat ~/.ssh/id_ed25519.pub | pbcopy
```

1. https://github.com/settings/keys を開く
2. 「New SSH key」→ Title に `My Laptop`、Key に貼り付け → 「Add SSH key」
3. 接続テスト:

```bash
ssh -T git@github.com
```

`Hi あなたのユーザー名!` と表示されれば成功。
→ 詳細: README [セクション4-4](../README.md#4-4-ssh-キーの設定github-との安全な通信)

### リポジトリをフォーク & クローン

1. https://github.com/SHU-T0/spec-ai-training を開いて右上の「Fork」→「Create fork」

2. ターミナルで:

```bash
cd ~/Desktop
git clone git@github.com:あなたのユーザー名/spec-ai-training.git
cd spec-ai-training
git remote add upstream git@github.com:SHU-T0/spec-ai-training.git
```

→ 詳細: README [セクション5](../README.md#5-このリポジトリをフォークする)、[セクション6](../README.md#6-フォークしたリポジトリをクローンする)

### Git 基礎練習

テスト用リポジトリを使って add / commit / push を体験する。

```bash
# 自分のテスト用リポジトリを GitHub で作成（Private でOK、リポジトリ名は自由）
# 作成後、ターミナルで:
cd ~/Desktop
git clone git@github.com:あなたのユーザー名/テストリポジトリ名.git
cd テストリポジトリ名
```

適当なファイル（例: 昨日の学びをまとめたメモ）を作成して:

```bash
git add .
git commit -m "docs: add learning notes"
git push origin main
```

**「自分の変更がリモートに反映された」体験ができればOK。** GitHub のリポジトリページをリロードしてファイルが表示されることを確認する。

---

## 課題4: 3ツール使い分けガイドを作成する

Day1-3 で触った Gemini / Claude / ChatGPT を総整理する。

**Step 1: AI に全体像の骨格を作ってもらう**

Claude または Gemini に以下のように聞く:

```
AI業界の全体像を整理したいです。以下の観点でマップを作ってください:
1. 主要プレイヤー（OpenAI, Anthropic, Google, Meta など）
2. ツール分類（チャット型AI, コード生成AI, 画像生成AI, 調査エージェントなど）
3. 利用シーン（リサーチ, 資料作成, データ分析, 開発 など）

私はこれまで以下のツールを使いました:
- Gemini（Google）: チャット、Deep Research
- Claude（Anthropic）: チャット、製品リサーチ
- ChatGPT（OpenAI）: チャット、Deep Research
- NotebookLM（Google）: ドキュメント分析

これらを含めて、Markdown形式で整理してください。
```

**Step 2: 「この業務にはこのツール」の対応表を作る**

Day1-3 の体験をもとに、以下の比較表を **自分の判断で** 作成する:

| 業務 | おすすめツール | 理由 |
|------|-------------|------|
| 市場調査 | | |
| 文章作成 | | |
| 資料構成 | | |
| データ分析 | | |
| ブレスト | | |
| コード生成 | | |

**Step 3: 自分の体験を加えて完成させる**

- Day1-3 で実際に使った感想
- 各ツールの得意・不得意の自分なりの評価
- まだ触っていないが気になるツール

成果物: `training/day-04/tool-comparison-guide.md`（Markdown 形式）

---

## 課題5: AI用語ハンドブックを作成する

以下の用語を **自分の言葉で** 解説する。AIの出力をそのまま貼るのはNG。

**必須用語リスト:**

| 用語 | 説明のポイント |
|------|--------------|
| Token | AIが文章を処理する最小単位。「りんご」が何トークンになるか等 |
| Context（コンテキストウィンドウ） | AIが一度に覚えていられる情報量 |
| Prompt | AIへの指示・質問のこと |
| LLM | 大規模言語モデル。ChatGPTやClaudeの中核技術 |
| LLM kinds | モデルの種類（GPT-4, Claude Opus, Gemini Pro など） |
| AI Agent | 自律的にタスクを実行するAI |
| Autonomous AI | 人間の介入なしに動くAI |
| RAG | 外部情報を参照して回答を生成する仕組み |
| OCR | 画像から文字を読み取る技術 |
| Plan Mode | AIが計画を立ててから実行するモード |
| Skills | AIに特定の能力を追加する仕組み |
| AGENTS.md | AIエージェントの設定ファイル |
| CLAUDE.md | Claude Code の設定ファイル |

**手順:**

1. まず自分で「この用語はこういう意味だと思う」を書く
2. わからない場合は Claude に聞く: 「○○とは何ですか？技術者ではない人にわかるように説明してください」
3. AI の回答を参考にしつつ、**自分の言葉で書き直す**

成果物: `training/day-04/ai-glossary.md`

---

## Git 操作: 成果物の提出（branch → commit → push → PR）

**ここで学ぶワークフローは Day5 以降毎日使う。**

Cursor のターミナル（`` Ctrl + ` ``）を使う。Cursor で `spec-ai-training` フォルダを開いていれば、ターミナルのカレントディレクトリは既にリポジトリ内になっている。

```bash
# 最新の main ブランチを取得
git pull origin main

# 新しいブランチを作成して切り替える
git checkout -b training/day-04-tool-comparison
```

以下のような表示が出れば成功:
```
Switched to a new branch 'training/day-04-tool-comparison'
```

> **ブランチとは?** 「本体（main）に影響を与えずに、自分の作業場所を作る」仕組み。

**ファイルの作り方（Cursor を使う）:**

1. Cursor で `spec-ai-training` フォルダを開いていなければ、「File」→「Open Folder...」で開く
2. サイドバーの `training/day-04` フォルダを右クリック → 「New File」
3. ファイル名を入力して作成する

> `training/day-04` フォルダが存在しない場合: サイドバーの `training` フォルダを右クリック → 「New Folder」→ `day-04` と入力

以下のファイルを作成する:
- `training/day-04/tool-comparison-guide.md` — 課題4の成果物
- `training/day-04/ai-glossary.md` — 課題5の成果物
- `training/day-04/daily-report.md` — 日報（テンプレート: `templates/daily-report-template.md`）

```bash
# ステージング（コミット対象に追加）
git add training/day-04/

# 確認
git status
```

緑色で `new file: training/day-04/...` と表示されればOK。

```bash
# コミット
git commit -m "docs: add Day4 tool comparison and glossary"

# プッシュ
git push origin training/day-04-tool-comparison
```

> **コミットとは?** 「この状態を保存する」操作。ゲームのセーブポイントのようなもの。
> **プッシュとは?** 自分のPCの変更をGitHub（クラウド）にアップロードすること。

**GitHub で PR を作成する:**

1. ブラウザで https://github.com/あなたのユーザー名/spec-ai-training を開く
2. ページ上部に黄色いバナーで「training/day-04-tool-comparison had recent pushes...」と表示される
3. 「Compare & pull request」ボタンをクリック
4. PR作成画面:
   - **base repository**: **自分のリポジトリ**（`あなたのユーザー名/spec-ai-training`）になっていることを確認。親リポジトリ（`SHU-T0/spec-ai-training`）が選ばれている場合は、ドロップダウンで自分のリポジトリに変更する
   - **base**: `main`
   - **タイトル**: `Day4: 3ツール比較 + 用語集 + プロンプト集`
   - **本文**: テンプレートに記入する（`templates/day-pr-body-template.md` を参照）
5. 「Create pull request」ボタンをクリック

> **PRとは?** 「自分の変更を本体に合流させてほしい」というリクエスト。レビュー担当者がチェックしてからmerge（合流）する。

**エラーが出た場合の対処:**

| エラー | 対処 |
|--------|------|
| `Permission denied (publickey)` | SSH キーが GitHub に登録されていない → 課題2のSSHキー設定を再実行 |
| `fatal: not a git repository` | `spec-ai-training` フォルダの中にいない → `cd ~/Desktop/spec-ai-training` |
| `error: failed to push` | 同名ブランチが既にある → ブランチ名を変更（例: `-v2` を末尾に追加） |

> **上記以外のエラーが出たら?** エラーメッセージをそのまま Claude や ChatGPT にコピペして聞くのが最速。Git は初めてだとつまずきやすいツールなので、一人で悩まず AI に頼ること。

---

## Weekend Mission

「AI に聞いてみたいこと10個リスト」を作って実際に聞く。Gemini / Claude / ChatGPT の3ツールで聞き比べる。

---

## ヒント

- Markdown チュートリアルは30分で終わる。最初にやってしまうと後の成果物作成がスムーズ
- 3ツール比較は完璧を目指さなくてOK。Day1-3 で触った範囲でまとめる
- 用語ハンドブックは「自分の言葉で説明できるか」がチェック基準。AIの出力のコピペは不可
- Git操作は「覚える」より「やってみる」が最速。エラーが出ても壊れないので安心して実行すること
- **Git でうまくいかないときは、迷わず AI に聞くこと。** エラーメッセージをそのままコピペして「このエラーの意味と対処法を教えて」と聞けば、大抵解決できる。Git は初学者がつまずきやすいツールなので、一人で悩まず AI を活用するのが正しいやり方
- PRテンプレートは `templates/day-pr-body-template.md` にある。コピーして使う

## 提出方法

1. `training/day-04/` に成果物を配置
2. `git add` → `git commit` → `git push`
3. GitHub で PR を作成
4. Slack で「Day4 PR作成しました: [PR の URL]」と報告

## 理解度チェック（クイズ）

- `quizzes/index.html` をブラウザで開く（ファイルをダブルクリック、または Chrome にドラッグ&ドロップ）
- 自分の名前を入力する
- 「Day4」を選択してクイズを受ける
- 100点になるまで何度でも再受験可能
- 100点の画面をスクリーンショットして保存する（PR提出時に添付）

## 早期完了者向け追加課題

- Day1-3 で使った4ツール（Gemini, Claude, ChatGPT, NotebookLM）に加えて、以下の調査エージェントを試す:
  - **Manus**: https://manus.im — 自律型調査エージェント
  - **Genspark**: https://genspark.ai — 検索特化エージェント
- 各ツールに同じ質問を投げて、回答の違いを比較ドキュメントにまとめる
- 成果物: `training/day-04/agent-comparison.md` として追加コミット

## 参考リソース

- [Markdown Tutorial（日本語）](https://www.markdowntutorial.com/jp/)
- [GitHub Docs: Pull Requests](https://docs.github.com/ja/pull-requests)
- [Git 入門（サル先生のGit入門）](https://backlog.com/ja/git-tutorial/)
- `CONTRIBUTING.md` — ブランチ名・コミットメッセージの規約
- `templates/day-pr-body-template.md` — PR テンプレート
