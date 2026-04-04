# Day 5 — 4/7 (火): リサーチ × AI + AIの限界を知る

## 今日のゴール

Deep Research を使って本格的な業界リサーチを実施し、ソース引用付きのリサーチレポートを作成する。AIの限界（ハルシネーション）を理解し、検証する習慣を身につける。

---

## Morning Briefing — 30 min

- Week 1 クイックレビュー（5 min）
- リサーチツール使い分け: Gemini Deep Research / GPT Deep Research / Claude / NotebookLM（10 min）
- **AI はなぜ「もっともらしい嘘」をつくのか** — 15 min
  - Day 2-3 で「AI の回答が間違っていた」経験があるはず → そこから導入
  - ハルシネーションの仕組み（確率的に次の単語を予測しているだけ）
  - 「AI の出力は必ず検証する」習慣の重要性
  - 参考: [ハルシネーションとは — notta](https://www.notta.ai/blog/hallucination)

---

## 必須課題

### 課題1: Deep Research で業界リサーチを実施する

**共通テーマ: HR Tech**

全員「HR Tech」をテーマにリサーチを実施する。同じテーマで取り組むことで、Evening Share での比較・議論がより深くなる。

> 切り口（例: 市場動向、導入事例、評価手法の変化など）は各自で自由に決めてよい。ただし Day3 とは異なる切り口にすること。

**共通ワークフロー:**

1. **Gemini Deep Research** で市場全体像を把握する
2. **GPT Deep Research** で特定テーマを深堀りする
3. **Claude** で情報を構造化し、レポート構成を整える
4. **AI の出力を必ずファクトチェック**（次のステップ）

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

### 課題2: Deep Research の出力を要約してリポジトリに保存する

課題1で得られた Deep Research のレポートを、チャットで要約させて Markdown ファイルとしてリポジトリに保存する。

**手順:**

1. 課題1の Deep Research 出力をコピーする
2. Claude または ChatGPT のチャットに貼り付け、以下のように要約を依頼する:

```
以下の Deep Research レポートを Markdown 形式で要約してください。
- 主要な知見を箇条書きで整理
- 重要な数値・事例は残す
- ソースURLがあればそのまま含める
- 最後に「結論」セクションをつける

[ここに Deep Research の出力を貼り付ける]
```

3. AI が出力した Markdown をそのまま `training/day-05/research-report.md` として保存する
4. 保存したファイルを読み直し、明らかな間違いや気になる点があれば一言コメントを末尾に追記する

---

## Knowledge: AI の限界とリスク

### ハルシネーション（AIのもっともらしい嘘）

AI は自信満々に嘘をつくことがあります。リサーチでは特に以下に注意:

| 注意する項目 | 例 |
|-------------|-----|
| **数値** | 市場規模、成長率、シェア（AIが捏造しやすい） |
| **固有名詞** | 企業名、人名、製品名（実在しない企業を出すことがある） |
| **日付** | 「2024年に発表された」等（年が間違っていることが多い） |
| **URL** | AIが生成したURLは存在しないことがある |

**対策:**
- AI の出力を鵜呑みにしない。「これは正しいか？」と疑う習慣をつける
- 複数ツール（ChatGPT, Gemini, Claude）の出力を突き合わせるのも有効
- URLが切れていた場合はレポートに「リンク切れ」と記録する

### AI セキュリティ基礎

リサーチで AI を使うとき、以下のルールを守ること:

- **社外秘データを AI に入力しない**: 顧客情報、契約内容、財務データ等
- **AI の出力に機密情報が含まれていないか確認する**: 意図せず学習データに含まれていた情報が出力される可能性
- 参考: [個人情報保護委員会の注意喚起](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/)

### AI ハイプ vs 現実

リサーチ結果に「AI で○○が可能に！」系の誇大記事が混ざることがある。以下を見分ける:
- 「実証済み」なのか「構想段階」なのかを区別する
- 具体的な数値や事例がある記事を優先する
- 複数のソースで裏取りする

---

## Git操作（Day4 の復習 + 実践）

Ghostty または Cursor のターミナル（`` Ctrl + ` ``）を開いて、リポジトリフォルダに移動する。

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

**ファイルの作り方（Cursor を使う）:**

Cursor のサイドバーで `training/day-05` フォルダを右クリック → 「New File」でファイルを作成する。フォルダが存在しない場合は `training` を右クリック → 「New Folder」→ `day-05` と入力。

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

## Evening Share — 30 min

- Teach-back: 互いのリサーチ結果を 5 分でプレゼン
- 「AI の出力で間違いを見つけた事例」を共有
- ツールキット更新（どのツールがリサーチに強かったか）

---

## ヒント

- Day3 では Deep Research を「体験」した。Day5 では「実務レベルのレポートにまとめる」ことに重点を置く
- レポートは AI の出力をそのまま貼るのではなく、自分の分析や業務への示唆を加えて仕上げること
- 出典URLを明記することで、読み手が情報の信頼性を判断できるようになる
- ファクトチェックで間違いを見つけること自体が学び。「AI を疑う力」を鍛える

## 提出方法

1. 以下のファイルを `training/day-05/` に配置:
   - `research-report.md` — Deep Research 出力の要約レポート
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
- [ハルシネーションとは — notta](https://www.notta.ai/blog/hallucination)
- [個人情報保護委員会の注意喚起](https://www.ppc.go.jp/news/careful_information/230602_AI_utilize_alert/)
- Day3 の ChatGPT vs Claude 比較表（自分の成果物を参照）
- `CONTRIBUTING.md` — PR作成の規約
