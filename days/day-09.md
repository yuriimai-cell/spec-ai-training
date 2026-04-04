# Day 9 — 4/13 (月): データ分析 + LLM基礎挙動

## 今日のゴール

AIによるデータ分析を体験し、LLM（大規模言語モデル）の基本的な仕組みを理解する。次のPhase 3 に向けて Cursor をセットアップする。

---

## 必須課題

### 課題1: サンプルデータのAI分析レポート

**Step 1: サンプルデータを AI に生成させる**

Claude に以下のように依頼して、分析用のサンプルデータを作成する:

```
分析用のサンプルデータを作成してください。
テーマ: SaaS企業の月次KPIデータ
期間: 2024年1月〜2025年3月（15ヶ月分）
含めるカラム:
- 月
- MRR（月次経常収益）
- 新規顧客数
- 解約率
- NPS（顧客満足度）
- 営業担当者別の成約数（3名分）

CSV形式で出力してください。
```

**Step 2: AIにデータを分析させる**

**重要: 「分析して」とだけ投げるのはNG。何を知りたいかを明確にする。**

Claude にデータを貼り付けて、以下のように指示する:

```
以下のデータを分析してください。

[データを貼り付ける]

分析してほしい観点:
1. 全体のトレンド（上昇/下降/横ばい）
2. 月ごとの変動で目立つポイント
3. KPI間の相関関係（例: 新規顧客数と解約率の関係）
4. 営業担当者別のパフォーマンス比較
5. 改善が必要な指標とその根拠
6. 今後3ヶ月の予測

表やグラフの説明も含めてください。
```

**Step 3: 分析結果を自分の視点で補完する**

AI の分析結果に以下を追記する:
- AI の分析で「確かに」と思った点
- AI が見落としている可能性がある点
- 業務知識から追加できる解釈

成果物: `training/day-09/data-analysis-report.md`

---

### 課題2: LLM基本挙動ノート

LLM が「どう動いているか」の基本を理解する。**深い理論は不要。** 実務で役立つ理解レベルでまとめる。

**以下の3つのテーマについて、自分の言葉でまとめる:**

**テーマ1: Token予測（次のTokenを予測する仕組み）**

Claude に聞く:
```
LLMが「次のTokenを予測する」とはどういうことか、
プログラミングの知識がない人にもわかるように説明してください。
具体例を使って、100字程度で説明してください。
```

自分のノートに書くべきこと:
- Token とは何か（Day4 の用語ハンドブックを参照）
- 「りんごは赤い」の次に来る言葉をどう予測するか
- なぜ同じ質問で違う回答が出ることがあるのか

**テーマ2: コンテキストウィンドウ**

Claude に聞く:
```
コンテキストウィンドウとは何ですか？
「長い会話をすると精度が落ちる」のはなぜですか？
プログラミングの知識がない人にもわかるように説明してください。
```

自分のノートに書くべきこと:
- コンテキストウィンドウのサイズとは（文字数/Token数の限界）
- なぜ長い会話で精度が下がるのか
- 実務での対処法（新しいチャットを始める、要約して再投入する等）

**テーマ3: 温度パラメータ（Temperature）**

Claude に聞く:
```
LLMの「温度パラメータ」とは何ですか？
温度が高いとどうなり、低いとどうなりますか？
料理の味付けに例えて説明してください。
```

自分のノートに書くべきこと:
- 温度が低い = より確実で決まった回答（正確さ重視）
- 温度が高い = よりランダムで創造的な回答（多様性重視）
- 実務での使い分け（データ分析=低温度、アイデア出し=高温度）

成果物: `training/day-09/llm-behavior-note.md`

---

### 課題3: Cursor 初期セットアップ

`account-setup.md` の Phase 3 を参照して、Cursor をセットアップする。

**手順:**

1. https://cursor.com にアクセス
2. 「Download」ボタンをクリックしてインストーラーをダウンロード
3. ダウンロードしたファイルを開いてインストール
4. Cursor を起動する
5. 「Continue with GitHub」をクリックして GitHub アカウントでサインイン
6. Settings（設定）を開く: メニューバー → Cursor → Settings → Cursor Settings
7. Models セクションで AI モデルが有効になっていることを確認
8. ターミナルを開く: メニューバー → Terminal → New Terminal（または Ctrl+`）
9. ターミナルで以下を実行して動作確認:

```bash
git status
```

「On branch main」のような表示が出れば成功。

**Cursor で研修リポジトリを開く:**

1. File → Open Folder をクリック
2. `spec-ai-training` フォルダを選択して開く
3. 左のファイルツリーに研修リポジトリのファイルが表示されれば成功

**動作確認:**
- ターミナルで `git status` が通ること
- AI チャット（Ctrl+L）が開くこと
- ファイルを開いて編集できること

成果物: セットアップ完了の確認（日報に記載）

---

## Git操作

Ghostty または Cursor のターミナル（`` Ctrl + ` ``）を開いて、リポジトリフォルダに移動します。

```bash
# 研修リポジトリに移動（クローン先がデスクトップの場合）
cd ~/Desktop/spec-ai-training
git pull origin main
git checkout -b training/day-09-data-llm

```

**ファイルの作り方（Cursor を使う）:**

Cursor のサイドバーで `training/day-09` フォルダを右クリック → 「New File」でファイルを作成する。フォルダが存在しない場合は `training` を右クリック → 「New Folder」→ `day-09` と入力。

```bash
# (ファイルを作成・編集した後)
git add training/day-09/
git status
```

以下のファイルが表示されればOK:
```
new file:   training/day-09/data-analysis-report.md
new file:   training/day-09/llm-behavior-note.md
new file:   training/day-09/daily-report.md
```

```bash
git commit -m "docs: add Day9 data analysis report and LLM behavior note"
git push origin training/day-09-data-llm
```

**GitHubでPRを作成:**
1. https://github.com/あなたのユーザー名/spec-ai-training を開く
2. 「Compare & pull request」をクリック
3. **base repository** が自分のリポジトリになっていることを確認（親リポジトリが選ばれていたら変更）
4. タイトル: `Day9: データ分析レポート + LLM基礎挙動ノート`
5. テンプレートに記入 → 「Create pull request」

---

## ヒント

- データ分析は「何を知りたいか」を先に決めてからAIに投げる。漠然と「分析して」は品質が低い
- LLM の挙動は深い理論不要。「なぜ同じ質問で違う回答が出るか」「なぜ長い会話で精度が落ちるか」が説明できればOK
- Day2 で Claude Chat/Cowork/Code の違いを調べた経験を活かし、LLMの挙動を実感と結びつけてまとめる
- Cursor は次の開発フェーズ（Day10-12）で使うので、この段階で確実にセットアップを完了させる

## 提出方法

1. 以下のファイルを `training/day-09/` に配置:
   - `data-analysis-report.md` — データ分析レポート
   - `llm-behavior-note.md` — LLM基本挙動ノート
   - `daily-report.md` — 日報（Cursor セットアップ完了の記載含む）
2. `git add` → `git commit` → `git push`
3. GitHub で PR を作成
4. Slack で「Day9 PR作成しました: [PR の URL]」と報告

## 理解度チェック（クイズ）

- `quizzes/index.html` をブラウザで開く（ファイルをダブルクリック、または Chrome にドラッグ&ドロップ）
- 自分の名前を入力する
- 「Day9」を選択してクイズを受ける
- 100点になるまで何度でも再受験可能
- 100点の画面をスクリーンショットして保存する（PR提出時に添付）

## 早期完了者向け追加課題

### 複数AIでの同一データ分析比較

1. 課題1で使ったデータを、ChatGPT と Gemini にも投げる
2. 3つのAI（Claude, ChatGPT, Gemini）の分析結果を比較する:
   - 分析の深さ
   - 指摘するポイントの違い
   - グラフ/表の提示方法
   - 実務で使えるインサイトの質
3. 「データ分析にはどのAIが最適か」の結論を書く

成果物: `training/day-09/multi-ai-analysis-comparison.md`

## 参考リソース

- [LLM の基本（Google Cloud）](https://cloud.google.com/ai/llms)
- [Cursor ドキュメント](https://docs.cursor.com)
- Day4 の AI用語ハンドブック（用語の復習として参照）
- `account-setup.md` — Cursor セットアップ手順
