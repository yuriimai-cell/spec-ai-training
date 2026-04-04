# Day 5 — 4/7 (火): リサーチ実務

## 今日のゴール

Deep Research を使って本格的な業界リサーチを実施し、ソース引用付きのリサーチレポートを作成する。

---

## 必須課題

### 課題1: Deep Research で業界リサーチを実施する

**Day3 とは異なるテーマを選ぶこと。**

**テーマ例（自由に選んでOK）:**
- 「2025年のSaaS業界トレンドと成長分野」
- 「AIを活用した営業プロセスの自動化事例」
- 「日本企業のDX推進における課題と成功パターン」
- 「リモートワーク時代のエンゲージメント施策」

**手順:**

1. https://chatgpt.com または https://gemini.google.com を開く
2. Deep Research モードを選択する
3. テーマに関するプロンプトを入力する:

```
[選んだテーマ] について、以下の観点で包括的にリサーチしてください:
1. 現状の概要
2. 主要なトレンドとデータ
3. 具体的な事例（企業名・数値を含む）
4. 課題と機会
5. 今後の予測

ソースURLも可能な限り含めてください。
```

4. 生成されたレポートを保存する

---

### 課題2: ソース引用付きリサーチレポートを作成する

Deep Research の出力をもとに、ソース引用を明記した信頼性の高いリサーチレポートを作成する。

**レポートの構成:**

```markdown
# [テーマ名] リサーチレポート

## 概要
[テーマの概要を3-5行で]

## 主要な知見

### 1. [知見のタイトル]
[内容]
> 出典: [URL]

### 2. [知見のタイトル]
[内容]
> 出典: [URL]

...

## ソース一覧
- [使用したソースURLのリスト]

## 結論・所感
[自分の分析と業務への示唆]
```

**レポート作成時の注意点:**
- AIが提示したURLは必ずクリックして、リンクが有効か確認すること
- 数値（市場規模、成長率、シェア等）はAIが捏造しやすいので、出典URLの内容と突き合わせること
- 固有名詞（企業名、人名、製品名）が実在するか確認すること
- 確認できなかった情報は「未確認」と明記してよい。無理に裏取りする必要はないが、鵜呑みにしないことが重要

---

## Git操作（Day4 の復習 + 実践）

Ghostty（またはターミナル.app）を開いて、リポジトリフォルダに移動します。

```bash
# 研修リポジトリに移動（クローン先がデスクトップの場合）
cd ~/Desktop/spec-ai-training

# 最新を取得
git pull origin main

# ブランチを作成
git checkout -b training/day-05-research
```

以下のような表示が出れば成功:
```
Switched to a new branch 'training/day-05-research'
```

```bash
# フォルダが存在するか確認する（最初から用意されているはず）
ls training/day-05
# もし「No such file or directory」と表示されたら: mkdir -p training/day-05
```

**ファイルの作り方:**
- ターミナルで `open training/day-05` を実行すると Finder でフォルダが開く
- 方法1: Finder 上でテキストエディット等を使いファイルを作成し、ファイル名を `research-report.md` にして保存
- 方法2: ターミナルで `touch training/day-05/research-report.md` を実行してからエディタで開く

```bash
# (ファイルを作成・編集した後)

# ステージング
git add training/day-05/

# 確認
git status
```

以下のファイルが表示されればOK:
```
new file:   training/day-05/research-report.md
new file:   training/day-05/daily-report.md
```

```bash
# コミット
git commit -m "docs: add Day5 research report"

# プッシュ
git push origin training/day-05-research
```

**GitHubでPRを作成する:**
1. https://github.com/あなたのユーザー名/spec-ai-training を開く
2. 黄色いバナーの「Compare & pull request」をクリック
3. **base repository** が自分のリポジトリになっていることを確認（親リポジトリ `SHU-T0/spec-ai-training` が選ばれていたら変更する）
4. タイトル: `Day5: リサーチレポート`
5. テンプレートに記入して「Create pull request」

---

## 注意点: ハルシネーション（AIのもっともらしい嘘）

AIは自信満々に嘘をつくことがあります。これを「ハルシネーション」と呼びます。リサーチでは特に以下に注意してください:

- **数値**: 市場規模、成長率、シェア（AIが捏造しやすい）
- **固有名詞**: 企業名、人名、製品名（実在しない企業を出すことがある）
- **日付**: 「2024年に発表された」等（年が間違っていることが多い）
- **URL**: AIが生成したURLは存在しないことがある（必ずクリックして確認）

**対策のポイント:**
- AI の出力を鵜呑みにしない。「これは正しいか？」と疑う習慣をつける
- 複数ツール（ChatGPT, Gemini, Claude）の出力を突き合わせるのも有効な検証手法（Day3 の比較体験が活きる）
- URLが切れていた場合はレポートに「リンク切れ」と記録する。それ自体がハルシネーションの証拠として有用

## ヒント

- Day3 では Deep Research を「体験」した。Day5 では「実務レベルのレポートにまとめる」ことに重点を置く
- レポートは AI の出力をそのまま貼るのではなく、自分の分析や業務への示唆を加えて仕上げること
- 出典URLを明記することで、読み手が情報の信頼性を判断できるようになる

## 提出方法

1. 以下のファイルを `training/day-05/` に配置:
   - `research-report.md` — ソース引用付きリサーチレポート
   - `daily-report.md` — 日報
2. `git add` → `git commit` → `git push`
3. GitHub で PR を作成
4. Slack で「Day5 PR作成しました: [PR の URL]」と報告

## 理解度チェック（クイズ）

- `quizzes/index.html` をブラウザで開く（ファイルをダブルクリック、または Chrome にドラッグ&ドロップ）
- 自分の名前を入力する
- 「Day5」を選択してクイズを受ける
- 100点になるまで何度でも再受験可能
- 100点の画面をスクリーンショットして保存する（PR提出時に添付）

## 早期完了者向け追加課題

- 同一テーマで Gemini Deep Research と ChatGPT Deep Research の出力を比較する
- 両方の出力に対して以下を分析:
  - どちらがソースURLを多く提示するか
  - どちらのURLが有効率が高いか（実際にクリックして確認）
  - 数値の正確性に差はあるか
  - レポートの読みやすさ・構成の違い
- 成果物: `training/day-05/deep-research-comparison.md`

## 参考リソース

- [AI ハルシネーションとは（Google Cloud）](https://cloud.google.com/discover/what-are-ai-hallucinations)
- Day3 の ChatGPT vs Claude 比較表（自分の成果物を参照）
- `CONTRIBUTING.md` — PR作成の規約
