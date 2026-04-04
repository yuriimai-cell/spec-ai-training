# AI Boot Camp カリキュラム（Day1-Day13）

最終更新: 2026-04-04

> 各Dayの詳細な手順は `days/day-XX.md` を参照してください。
> このファイルはスケジュール概要と設計原則のみを記載しています。

## スケジュール一覧

| Day | 日付 | テーマ | 詳細 |
|-----|------|--------|------|
| Day1 | 4/1 (水) | AIで自己紹介スライド作成 | [day-01.md](days/day-01.md) |
| Day2 | 4/2 (木) | Claude製品リサーチ | [day-02.md](days/day-02.md) |
| Day3 | 4/3 (金) | ChatGPT Deep Research + ツール比較 | [day-03.md](days/day-03.md) |
| Day4 | 4/6 (月) | AI全体像 + GitHub基礎 | [day-04.md](days/day-04.md) |
| Day5 | 4/7 (火) | リサーチ実務 | [day-05.md](days/day-05.md) |
| Day6 | 4/8 (水) | 展示会視察 + 視察レポート作成【半日】 | [day-06.md](days/day-06.md) |
| Day7 | 4/9 (木) | 資料作成実務 + 人間/AI役割分担 | [day-07.md](days/day-07.md) |
| Day8 | 4/10 (金) | GTM実務 + 差別化整理 | [day-08.md](days/day-08.md) |
| Day9 | 4/13 (月) | データ分析 + LLM基礎挙動 | [day-09.md](days/day-09.md) |
| Day10 | 4/14 (火) | Project A 設計 | [day-10.md](days/day-10.md) |
| — | 4/15 (水) | — | **展示会出展（研修休み）** |
| — | 4/16 (木) | — | **展示会出展（研修休み）** |
| Day11 | 4/17 (金) | Project A 実装・デプロイ | [day-11.md](days/day-11.md) |
| Day12 | 4/20 (月) | Project B 設計・実装・デプロイ | [day-12.md](days/day-12.md) |
| Day13 | 4/21 (火) | 最終発表 + 実務移行計画 | [day-13.md](days/day-13.md) |

---

## Phase構成

| Phase | 期間 | テーマ | 提出方法 |
|-------|------|--------|---------|
| Phase 1 | Day1-Day3 (4/1-4/3) | AIツール基礎体験 | Google Docs/Slides → Google Drive → Slack にリンク報告 |
| Phase 2 | Day4-Day9 (4/6-4/13) | AI基礎 + 実務応用 | Git/PR（Day4でGit学習、Day5以降は毎日PR提出） |
| Phase 3 | Day10-Day13 (4/14-4/21) | 開発体験 | Git/PR |

---

## 設計原則

- **自走優先**: メンター承認待ちで進行を止めない。`days/` のガイドを読めば一人で進められる
- **日次で完結**: 必須課題、ヒント、提出方法、クイズ、追加課題を各Dayに明示
- **早期完了者向け**: 早く終わったメンバーは追加課題へ先行可能
- **低レイヤー理論は対象外**: Transformerの内部構造や数式は扱わない

## AI基礎の必修用語

研修中に以下の用語を自分の言葉で説明できるようになること:

- Token, Context, Prompt, LLM, LLM kinds
- AI Agent, Autonomous AI, RAG, OCR, Plan Mode
- Skills, AGENTS.md, CLAUDE.md

LLMの基本挙動:
- 次に来るTokenを予測する仕組み
- モデルごとに推論の強弱がある

---

## 日次完了ルール

### Phase 1（Day1-Day3）
- 成果物を Google Docs で作成し Google Drive に格納
- **ファイルの作成・アップロードは手動ではなく、AIやツールを使って行う**

### Phase 2-3（Day5-Day13）
毎日、以下の完了チェーンを適用する:

1. 当日成果物を `training/day-XX/` にPush
2. PR作成（クイズのスクリーンショットを添付）
3. Slack通知確認
4. レビューコメント反映
5. PR Merge

追加条件:
- 当日クイズは **100点必須**（`quizzes/index.html` で受験）
- 100点の画面をスクリーンショットしてPRに添付

レビュー遅延時の暫定運用:
- `PR作成済み + Slack通知確認 + クイズ100点` で一時完了可
- 最終完了はMerge後に確定

---

## クイズについて

- `quizzes/index.html` をブラウザで開いて受験する
- 名前を入力してからDayを選択（名前ごとに進捗が保存される）
- Day4〜Day12 にクイズがある（Day1-3とDay13にはクイズなし）
- **100点になるまで何度でも再受験可能**
- 100点の合格画面をスクリーンショットしてPRに添付する
