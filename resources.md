# AI Boot Camp リソース集

最終更新: 2026-04-04

> 各Dayの課題に取り組む前に、該当する参考資料に目を通すこと。
> URLは変更される可能性がある。リンク切れを見つけたらPRで報告する。

---

## Phase 1: AIツール基礎体験（Day1-Day3）

### Day1 — 4/1: AIで自己紹介スライド作成

- Google Gemini: gemini.google.com
- NotebookLM: notebooklm.google.com（ドキュメントをソースとして読み込ませ、質問応答や要約を生成）
- Google Stitch: stitch.google.com（デザインモックアップ）
- `account-setup.md` — アカウントセットアップ手順

### Day2 — 4/2: Claude製品リサーチ

- Claude Web/Desktop: claude.ai
- Claude Cowork: Claude デスクトップアプリ内の機能（ファイルやプロジェクトに対してAIが協働）
- Claude Code: CLI ツール。ターミナルから Claude を使ってコーディング・ファイル操作を行う
- Anthropic 公式ドキュメント: docs.anthropic.com

### Day3 — 4/3: ChatGPT Deep Research + ツール比較

- ChatGPT: chatgpt.com（Deep Research は Plus プラン必要）
- Deep Research の使い方: ChatGPT 内で「Deep research」モードを選択して調査テーマを入力
- Claude との比較: 同じ質問を両ツールに投げて回答を比較する

---

## Phase 2: AI基礎 + 実務応用（Day4-Day9）

### Day4 — 4/6: AI全体像 + GitHub基礎

#### AI全体像 / ツール比較

- Day1-3で触ったツール（Gemini, Claude, ChatGPT, NotebookLM）を起点にマップを広げる
- AIに「2026年のAI市場マップを作って」と指示するのも有効

#### 最低限用語

以下の用語を自分の言葉で説明できるようにする:
- Token / Context / Prompt / LLM / LLM kinds
- Agent / Autonomous AI / RAG / OCR / Plan Mode
- Skills / AGENTS.md / CLAUDE.md

#### Git / GitHub

- GitHub Flow: GitHub Docs > "GitHub Flow" を検索
- Pull Request の使い方: GitHub Docs > "About pull requests" を検索
- GitHub for Slack 連携: GitHub Docs > "GitHub and Slack" を検索

### Day5 — 4/7: リサーチ実務 + ハルシネーション対策

- Gemini Deep Research: Gemini 内で "Deep Research" モードを選択して実行
- ChatGPT Deep Research: ChatGPT 内で "Deep research" を選択（Plus プラン必要）
- ファクトチェックの基本: 一次ソースへの遡り方、引用URLの検証方法
- AI出力の信頼性評価: 「数値」「固有名詞」「日付」は特にハルシネーションが起きやすい

### Day6 — 4/8: 展示会視察 + 視察レポート作成【半日】

- 展示会視察の観点: ブースの導線設計、デモの見せ方、配布物、来場者との会話のきっかけ作り
- レポート作成: 視察メモ・写真をAIに入力してレポート化

### Day7 — 4/9: 資料作成実務 + 人間/AI役割分担

- スライド作成のAI活用: Claude / ChatGPT にアウトライン生成を指示 → 人間が構成を調整
- NotebookLM 活用: 資料をアップロード → 想定質問の自動生成
- 役割分担フレームワーク: 「AI向きな作業」（定型・大量・下書き）vs「人間向きな作業」（判断・感情・創造）

### Day8 — 4/10: GTM実務 + 差別化整理

- コンテンツマーケティング基礎: ペルソナ設定 → コンテンツ設計 → 配信チャネル選定
- X（Twitter）投稿の書き方: 短文で価値を伝える技術。AIに複数案を出させて選ぶ
- 競合分析フレームワーク: 3C分析（顧客・競合・自社）をAIで効率化

### Day9 — 4/13: データ分析 + LLM基礎挙動

- AIによるデータ分析: CSV / スプレッドシートをAIに渡して分析させる手法
- LLM基礎挙動の理解:
  - Token予測: LLMは「次に来る最も確率の高いToken」を予測する
  - コンテキストウィンドウ: 一度に処理できるToken数の上限。超えると古い情報が失われる
  - 温度パラメータ: 低い=安定した出力、高い=創造的だが不安定な出力
- Cursor 公式ドキュメント: cursor.com > Docs を参照

---

## Phase 3: 開発体験（Day10-Day13）

### Day10 — 4/14: Project A 設計

- V0: v0.dev — テキストでUIを指示するとReactコードを生成
- Google Stitch: stitch.google.com — AIデザインモックアップ
- Vercel デプロイガイド: vercel.com > Docs > "Deployments" を検索
- 要件定義の書き方: 「背景→ゴール→スコープ→ターゲットユーザー→主要機能」の構成

### Day11 — 4/17: Project A 実装・デプロイ

- Cursor 公式ドキュメント: cursor.com > Docs
- Vercel デプロイ: `vercel` CLI または GitHub 連携で自動デプロイ
- ROI試算: 「このツールがなかった場合の工数 vs ある場合の工数」で比較

### Day12 — 4/20: Project B 設計・実装・デプロイ

- Project A の経験を活かし、設計→実装→デプロイを1日で一気通貫
- AIレディネス診断: 業務のAI化可否を判断するフレームワーク（早期完了者向け）

### Day13 — 4/21: 最終発表 + 実務移行計画

- プレゼン構成: 研修前の状態 → 研修で学んだこと → 成果物 → 実務への活かし方
- 実務移行計画: 具体的な「初月アクションプラン」を含めること

---

## 備考

- 低レイヤーの理論資料（例: Transformerの内部構造）は任意閲覧とする
- 研修で求めるのは実務での運用力と判断力であり、モデル理論の深掘りではない
- リソースは研修の進行に合わせて更新される。最新版は常にこのファイルを参照すること
