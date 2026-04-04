# Day 4 — 4/6 (月): AI全体像 + GitHub基礎

## 今日のゴール

AI業界の全体像を整理し、GitHubでのPR（Pull Request）ワークフローを習得する。今日から成果物は Git/GitHub で提出する。

---

## 必須課題

### 課題1: AI全体像マップを作成する

Day1-3 で触ったツールを起点に、AI業界の全体像を整理する。

**Step 1: AI に全体像の骨格を作ってもらう**

1. Claude または Gemini を開く
2. 以下のプロンプトを入力する:

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

**Step 2: 自分の体験を加えて完成させる**

AI の出力に以下を追記する:
- Day1-3 で実際に使った感想
- 「○○にはこのツールが向いている」という自分の判断
- まだ触っていないが気になるツール

成果物: `training/day-04/ai-foundation-map.md`

---

### 課題2: 最低限用語ハンドブックを作成する

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

### 課題3: GitHub基礎（branch → commit → push → PR → merge）

**これが今日の最重要課題。** ここで学ぶワークフローは Day5 以降毎日使う。

**前提確認:**

> **ターミナルとは？** コマンド（命令文）を入力してPCを操作するアプリです。Day4以降は毎日使います。
> まだインストールしていない方は、`README.md` のセクション「2. 研修を始める前に必要なもの」を参照してください。

Ghostty（またはターミナル.app / Git Bash）を開いて、以下を実行する。

```bash
# Git がインストールされているか確認
git --version
```

以下のような表示が出れば成功:
```
git version 2.39.5 (Apple Git-154)
```

表示されない場合: `account-setup.md` の Git 初期設定を先に完了する。

```bash
# 研修リポジトリに移動する（クローン先がデスクトップの場合）
cd ~/Desktop/spec-ai-training
```

表示がエラーになる場合: リポジトリの clone がまだ。`README.md` のセクション「5. このリポジトリをフォークする」→「6. フォークしたリポジトリをクローンする」を参照して fork と clone を実行する。

**Step 1: ブランチを作成する**

```bash
# 最新の main ブランチを取得
git pull origin main

# 新しいブランチを作成して切り替える
git checkout -b training/day-04-ai-foundation
```

以下のような表示が出れば成功:
```
Switched to a new branch 'training/day-04-ai-foundation'
```

> **ブランチとは?** 「本体（main）に影響を与えずに、自分の作業場所を作る」仕組み。自分のブランチで作業し、完成したら本体に合流（merge）する。

**Step 2: 成果物ファイルを作成する**

```bash
# フォルダを作成
mkdir -p training/day-04
```

以下のファイルを作成する:

- `training/day-04/ai-foundation-map.md` — 課題1の成果物
- `training/day-04/ai-glossary.md` — 課題2の成果物
- `training/day-04/daily-report.md` — 日報（テンプレート: `templates/daily-report-template.md`）

**ファイルの作り方:**
- 方法1: Finderで `training/day-04/` フォルダを開き、テキストエディタ（メモ帳等）で新しいファイルを作成して、ファイル名を `ai-foundation-map.md` にして保存
- 方法2: ターミナルで `touch training/day-04/ai-foundation-map.md` を実行してからエディタで開く

> `.md` はMarkdown（マークダウン）形式のファイルです。テキストファイルと同じように文字を書けます。特別なソフトは不要で、メモ帳やテキストエディットで作成・編集できます。

**Step 3: 変更をステージングする**

```bash
# 作成したファイルをステージング（コミット対象に追加）
git add training/day-04/
```

確認コマンド:
```bash
git status
```

以下のような表示が出れば成功:
```
On branch training/day-04-ai-foundation
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   training/day-04/ai-foundation-map.md
        new file:   training/day-04/ai-glossary.md
        new file:   training/day-04/daily-report.md
```

**Step 4: コミットする**

```bash
git commit -m "docs: add Day4 AI foundation map and glossary"
```

以下のような表示が出れば成功:
```
[training/day-04-ai-foundation abc1234] docs: add Day4 AI foundation map and glossary
 3 files changed, XX insertions(+)
 create mode 100644 training/day-04/ai-foundation-map.md
 create mode 100644 training/day-04/ai-glossary.md
 create mode 100644 training/day-04/daily-report.md
```

> **コミットとは?** 「この状態を保存する」操作。ゲームのセーブポイントのようなもの。

**Step 5: プッシュする**

```bash
git push origin training/day-04-ai-foundation
```

以下のような表示が出れば成功:
```
Enumerating objects: 6, done.
...
To github.com:あなたのユーザー名/spec-ai-training.git
 * [new branch]      training/day-04-ai-foundation -> training/day-04-ai-foundation
```

> **プッシュとは?** 自分のPCの変更をGitHub（クラウド）にアップロードすること。

**Step 6: GitHubでPRを作成する**

1. ブラウザで https://github.com/あなたのユーザー名/spec-ai-training を開く
2. ページ上部に黄色いバナーで「training/day-04-ai-foundation had recent pushes...」と表示される
3. 「Compare & pull request」ボタンをクリック
4. PR作成画面が開く:
   - **タイトル**: `Day4: AI全体像マップ + 用語ハンドブック`
   - **本文**: テンプレートに記入する（`templates/day-pr-body-template.md` を参照）
5. 「Create pull request」ボタンをクリック

**この画面が出たらスクリーンショットを撮ってください（PRが作成された状態の画面）。**

> **PRとは?** 「自分の変更を本体に合流させてほしい」というリクエスト。レビュー担当者がチェックしてからmerge（合流）する。

**エラーが出た場合の対処:**

| エラー | 対処 |
|--------|------|
| `Permission denied (publickey)` | SSH キーが GitHub に登録されていない → `account-setup.md` の SSH キー設定を再実行 |
| `fatal: not a git repository` | `spec-ai-training` フォルダの中にいない → `cd spec-ai-training` を実行 |
| `error: failed to push` | 同名ブランチが既にある → ブランチ名を変更（例: `training/day-04-ai-foundation-v2`） |

---

## ヒント

- AI全体像マップは完璧を目指さなくてOK。Day1-3 で触ったツールを中心に、知っている範囲でまとめる
- 用語ハンドブックは「自分の言葉で説明できるか」がチェック基準。AIの出力のコピペは不可
- Git操作は「覚える」より「やってみる」が最速。エラーが出ても壊れないので安心して実行すること
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

- [GitHub Docs: Pull Requests](https://docs.github.com/ja/pull-requests)
- [Git 入門（サル先生のGit入門）](https://backlog.com/ja/git-tutorial/)
- `account-setup.md` — Git 初期設定手順
- `CONTRIBUTING.md` — ブランチ名・コミットメッセージの規約
- `templates/day-pr-body-template.md` — PR テンプレート
