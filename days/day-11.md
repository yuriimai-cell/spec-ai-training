# Day 11 — 4/17 (金): Project A 実装・デプロイ

## 今日のゴール

Cursor + AI でProject Aを実装し、Vercelにデプロイして公開URLで動作確認する。

> 4/15-16 は展示会で研修休みだったため、間が空いています。まず Day10 の要件定義書とモックアップを読み返してから着手してください。
>
> **前提**: Cursor と Vercel のセットアップが完了している必要があります。まだの場合は `account-setup.md` を参照してください。

---

## 必須課題

### 課題1: Cursor + AI コード生成で実装する

**Step 1: Cursor でプロジェクトを作成する**

1. Cursor を起動する
2. ターミナルを開く（Terminal → New Terminal、または Ctrl+`）
3. 以下のコマンドを実行してプロジェクトを作成する:

```bash
# ホームディレクトリに移動
cd ~

# Next.js プロジェクトを作成（対話形式で質問されたらすべて Enter でデフォルトを選択）
npx create-next-app@latest project-a
```

以下のような質問が表示される。推奨の回答:
```
Would you like to use TypeScript? → Yes
Would you like to use ESLint? → Yes
Would you like to use Tailwind CSS? → Yes
Would you like your code inside a `src/` directory? → Yes
Would you like to use App Router? → Yes
Would you like to use Turbopack for next dev? → Yes
Would you like to customize the import alias? → No
```

```bash
# プロジェクトフォルダに移動
cd project-a

# 開発サーバーを起動して動作確認
npm run dev
```

以下のような表示が出れば成功:
```
  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000
```

4. ブラウザで http://localhost:3000 を開く → Next.js のデフォルトページが表示されればOK

**Step 2: Cursor で使用する AI モデルを選ぶ**

Cursor には複数の AI モデルが搭載されている。実装を始める前に、どのモデルを使うか検討してみよう。

**まず AI に聞いてみる:**

Claude や ChatGPT に以下のように質問して、モデル選びの基礎知識を身につける:

```
Cursor（AIコードエディタ）で使えるAIモデルにはどんな種類がありますか？
モデルによって何が違うのか、Token消費量やサブスクの使用上限との関係も含めて教えてください。
初心者が開発に使うのにおすすめのモデルはどれですか？
```

**推奨設定:**

| 設定項目 | 推奨値 | 理由 |
|---------|--------|------|
| Agent | **Composer 2** | コード生成の精度が高い |
| モード | **Max** | より高品質な出力が得られる |

**モデルの選び方（いくつか試してみよう）:**

| モデル | 特徴 | 備考 |
|--------|------|------|
| **Codex 5.3** | コード生成に特化 | バランスが良い |
| **GPT 5.4** | 汎用的で高性能 | コード以外の相談もできる |
| **Claude Sonnet 4.6** | コーディング性能が高い | 精度と速度のバランスが良い |
| Claude Opus 4.6 | 最も賢く精度が高い | ⚠️ Token消費量が多く、サブスクの使用上限にすぐ達するため**今は非推奨** |

> **ポイント**: モデルによって得意・不得意がある。いくつか試して「自分に合うモデル」を見つけるのも学び。迷ったら Composer 2 + Max モードで始めればOK。

**モデルの切り替え方法:**
- Cursor の AI チャットパネル上部にあるモデル名をクリック
- ドロップダウンから別のモデルを選択する

**Step 3: Plan モードで計画を立ててから実装する（重要）**

AI に「いきなり全部作って」と指示するのではなく、**まず計画（Plan）を立てさせてからコードを書かせる**のが正しいやり方。

**Plan モードとは:**
- AI に「まず実装計画を立ててください。コードはまだ書かないで」と指示するワークフロー
- AI が「こういう構成で、こういう順番で作ります」と計画を提示する
- 計画を確認して、フィードバック（「ここはこう変えて」「この機能は不要」等）を行う
- 計画が固まってから「では実装してください」と指示する

**なぜ Plan モードが重要か:**
1. **精度が上がる**: 計画段階でフィードバックを行うことで、最終的なコードの品質が大幅に向上する
2. **Context（Token）の消費を抑えられる**: いきなりコードを書かせて→やり直し→また書き直し、を繰り返すと大量の Token を消費する。計画段階で方向性を固めれば、一発で良いコードが出やすい
3. **手戻りが減る**: 「作ったけど違った」を防げる

**Step 4: Cursor の AI にコードを書いてもらう**

1. Cursor で `src/app/page.tsx` を開く
2. AI チャットを開く: Ctrl+L（Mac: Cmd+L）
3. **まず Plan モードで計画を立てる:**

```
以下の要件に基づいて、Webアプリの実装計画を立ててください。
まだコードは書かないでください。どのファイルに何を書くか、構成と手順を示してください。

[要件定義書の内容を貼り付ける]

技術的な制約:
- Next.js App Router + Tailwind CSS を使用
- データベースは使わない（ブラウザのlocalStorageまたは状態管理で完結）
- 日本語のUI
- スマホでも見やすいレスポンシブデザイン
```

4. AI の計画を読んで、気になる点があればフィードバックする（例: 「画面は1ページで十分」「この機能は不要」）
5. 計画がOKなら「この計画で実装してください」と指示する
6. AI が生成したコードを確認する（「Apply」ボタンで適用）
7. ブラウザで http://localhost:3000 を確認する

**Step 5: エラーが出たらAIに修正を依頼する**

エラーが出た場合（赤い文字やエラー画面）:

1. エラーメッセージをコピーする
2. Cursor の AI チャットに貼り付ける:

```
以下のエラーが出ました。修正してください。

[エラーメッセージを貼り付ける]
```

3. AI の修正を適用して再確認する
4. これを「エラーがなくなるまで」繰り返す

**Step 6: 機能を追加・調整する**

基本が動いたら、追加の指示を出す:

```
以下の修正をしてください:
1. [具体的な修正内容]
2. [追加したい機能]
3. [デザインの変更]
```

**コツ:**
- 一度に大量の修正を頼まない。1-3個ずつ指示を出す
- 「動くものを早く作る」が最優先。完璧なコードより動くプロトタイプ
- エラーが出ても焦らない。エラーメッセージをAIに貼るだけで大体解決する

---

### 課題2: Vercelにデプロイする

**Step 1: GitHub にプロジェクトをプッシュする**

```bash
# project-a フォルダにいることを確認
cd ~/project-a

# Git リポジトリを初期化
git init

# ファイルをステージング
git add .

# コミット
git commit -m "feat: initial Project A implementation"
```

**Step 2: GitHub にリポジトリを作成する**

1. https://github.com/new を開く
2. Repository name: `project-a`（または任意の名前）
3. 「Private」を選択（公開したい場合は「Public」）
4. 「Create repository」をクリック
5. 表示されるコマンドの「…or push an existing repository from the command line」を実行:

```bash
git remote add origin git@github.com:[自分のGitHubユーザー名]/project-a.git
git branch -M main
git push -u origin main
```

以下のような表示が出れば成功:
```
To github.com:[ユーザー名]/project-a.git
 * [new branch]      main -> main
```

**Step 3: Vercel にデプロイする**

1. https://vercel.com にログインする
2. 「Add New...」→「Project」をクリック
3. 「Import Git Repository」で、先ほどプッシュした `project-a` リポジトリを選択
4. 「Import」をクリック
5. 設定画面が表示される:
   - Framework Preset: 「Next.js」が自動選択されていればOK
   - Root Directory: 変更不要
   - 他の設定: デフォルトのまま
6. 「Deploy」ボタンをクリック
7. デプロイが始まる（1-3分程度）

以下の画面が出れば成功: 「Congratulations!」の画面と公開URL

**この画面が出たらスクリーンショットを撮ってください。**

8. 公開URLをクリックして、ブラウザでツールが動くことを確認する

**デプロイでエラーが出た場合:**

1. エラーログを確認する（Vercel の画面に表示される）
2. エラーメッセージをコピーして Cursor の AI に貼り付ける
3. 修正を適用 → コミット → プッシュ → Vercel が自動で再デプロイする

```bash
# 修正後のコミットとプッシュ
git add .
git commit -m "fix: resolve deployment error"
git push origin main
```

---

### 課題3: リリースノート + ROIメモを作成する

**リリースノート:**

```markdown
# Project A リリースノート

## プロジェクト名
[ツール名]

## 公開URL
[Vercel の公開URL]

## 概要
[何ができるツールか、1-2文で]

## 主要機能
1. [機能1]
2. [機能2]
3. [機能3]

## 使用技術
- Next.js
- Tailwind CSS
- Vercel（ホスティング）
- AI（Cursor + Claude/ChatGPT）

## 開発プロセスの振り返り
- かかった時間: 約○時間
- AIにどれくらい頼ったか: [具体的に]
- 自分で修正した箇所: [具体的に]
- 苦労した点: [具体的に]
```

**ROIメモ:**

```markdown
# ROIメモ

## このツールがなかった場合の業務工数
- [作業名]: 月○時間
- [作業名]: 月○時間
- 合計: 月○時間

## このツールがある場合の業務工数
- [作業名]: 月○時間（○時間削減）
- [作業名]: 月○時間（○時間削減）
- 合計: 月○時間

## 削減効果
- 月間○時間の削減
- 年間○時間の削減
- 金額換算: 約○万円/年（時給○円で計算）
```

成果物:
- `training/day-11/project-a-release-note.md`
- `training/day-11/roi-memo.md`

---

## Git操作（研修リポジトリへの提出）

Ghostty または Cursor のターミナル（`` Ctrl + ` ``）を開いて、研修リポジトリに移動します（project-a とは別のフォルダです）。

```bash
# 研修リポジトリに移動（クローン先がデスクトップの場合）
cd ~/Desktop/spec-ai-training
git pull origin main
git checkout -b training/day-11-project-a-deploy

```

**ファイルの作り方（Cursor を使う）:**

Cursor のサイドバーで `training/day-11` フォルダを右クリック → 「New File」でファイルを作成する。フォルダが存在しない場合は `training` を右クリック → 「New Folder」→ `day-11` と入力。

```bash
# (ファイルを作成・編集した後)
git add training/day-11/
git status
```

以下のファイルが表示されればOK:
```
new file:   training/day-11/project-a-release-note.md
new file:   training/day-11/roi-memo.md
new file:   training/day-11/daily-report.md
```

```bash
git commit -m "docs: add Day11 Project A release note and ROI memo"
git push origin training/day-11-project-a-deploy
```

**GitHubでPRを作成:**
1. https://github.com/あなたのユーザー名/spec-ai-training を開く
2. 「Compare & pull request」をクリック
3. **base repository** が自分のリポジトリになっていることを確認（親リポジトリが選ばれていたら変更）
4. タイトル: `Day11: Project A 実装・デプロイ完了`
5. テンプレートに記入（公開URLを必ず記載）→ 「Create pull request」

---

## ヒント

- 展示会明けで間が空いている。まず Day10 の設計ドキュメントを読み返してから着手する
- 「動くものを早く作る」が最優先。完璧なコードより動くプロトタイプ
- Cursor では自然言語で指示を出せる。エラーメッセージをそのまま AI に貼って修正を依頼する
- ROI メモは「このツールがなかった場合の工数 vs ある場合の工数」で試算すると説得力が出る
- Vercel にプッシュすれば自動でデプロイされる。手動のデプロイ操作は不要

## 提出方法

1. 以下のファイルを `training/day-11/` に配置:
   - `project-a-release-note.md` — リリースノート（公開URL記載）
   - `roi-memo.md` — ROIメモ
   - `daily-report.md` — 日報
2. `git add` → `git commit` → `git push`
3. GitHub で PR を作成
4. Slack で「Day11 PR作成しました: [PR の URL] / 公開URL: [Vercel URL]」と報告

## 理解度チェック（クイズ）

- `quizzes/index.html` をブラウザで開く（ファイルをダブルクリック、または Chrome にドラッグ&ドロップ）
- 自分の名前を入力する
- 「Day11」を選択してクイズを受ける
- 100点になるまで何度でも再受験可能
- 100点の画面をスクリーンショットして保存する（PR提出時に添付）

## 早期完了者向け追加課題

### アナリティクスまたはOGP設定を追加する

**パターンA: アナリティクス**

Cursor の AI に以下を指示:
```
このNext.jsアプリにGoogle Analyticsのトラッキングコードを追加してください。
測定IDは後で設定するのでプレースホルダにしてください。
```

**パターンB: OGP（ソーシャルシェア画像）**

Cursor の AI に以下を指示:
```
このNext.jsアプリにOGPメタタグを追加してください。
SNSでURLをシェアした時にタイトル、説明、サムネイル画像が表示されるようにしてください。
```

修正後はコミット → プッシュ → Vercel が自動で再デプロイする。

## 参考リソース

- [Next.js 公式ドキュメント](https://nextjs.org/docs)
- [Vercel デプロイガイド](https://vercel.com/docs/deployments/overview)
- [Cursor ドキュメント](https://docs.cursor.com)
- Day10 の要件定義書・モックアップ（自分の成果物を参照）
