# Spec AI Training -- AI研修ブートキャンプ

---

## 1. このリポジトリについて

このリポジトリは、**AI研修ブートキャンプ**の教材・カリキュラム・提出ルールをすべてまとめた場所です。

「リポジトリ」とは、ファイルやフォルダをまとめて管理する場所のことです。GitHub（ギットハブ）というWebサービス上に公開されており、研修に必要なすべての情報がここに入っています。

### 対象者

- AIツールを業務で使いこなしたい方
- Git や GitHub を触ったことがない方
- プログラミング経験がゼロでも問題ありません

### 13日間で学ぶこと

| Phase | 期間 | 内容 |
|-------|------|------|
| **Phase 1** | Day1-Day3 (4/1-4/3) | AIツール基礎体験 -- Gemini、Claude、ChatGPTを実際に触り、AIで自己紹介スライドを作ったり、製品リサーチを行う |
| **Phase 2** | Day4-Day9 (4/6-4/13) | AI基礎 + 実務応用 -- AIの全体像を理解し、リサーチ・資料作成・データ分析などの実務タスクにAIを活用する |
| **Phase 3** | Day10-Day13 (4/14-4/21) | 開発体験 -- AIコードエディタ（Cursor）を使い、実際にWebアプリケーションを設計・実装・デプロイする |

> **注意**: 4/8 は展示会視察で半日稼働。4/15-16 は展示会出展のため研修休み。

---

## 2. 研修を始める前に必要なもの

以下の5つを事前に用意してください。

| 必要なもの | 補足 |
|-----------|------|
| **PC**（Mac または Windows） | タブレットやスマートフォンでは作業できません |
| **インターネット接続** | 安定したWi-Fiまたは有線LAN環境を推奨します |
| **Chrome ブラウザ**（推奨） | https://www.google.com/chrome/ からダウンロードできます。他のブラウザでも動作しますが、この研修ではChromeを前提に説明します |
| **ターミナルアプリ** | Ghostty（推奨）。Ghostty が使えない場合は Mac 標準のターミナル.app でもOK |
| **メールアドレス** | Gmail を推奨します。GitHubアカウント作成やAIツール登録に使います |

---

## ★ 事前準備チェックリスト

研修初日（Day1）までに以下を完了させてください。上から順に進めると、セクション3〜8の内容をカバーできます。

- [ ] Chrome ブラウザをインストールした
- [ ] ターミナルアプリを準備した（Ghostty 推奨、またはターミナル.app）→ [セクション3](#3-ターミナルterminalの準備)
- [ ] Git をインストールした（`git --version` でバージョンが表示される）→ [セクション4-1](#4-1-git-のインストール)
- [ ] GitHub アカウントを作成した → [セクション4-2](#4-2-github-アカウントの作成)
- [ ] Git の初期設定（名前・メールアドレス）を完了した → [セクション4-3](#4-3-git-の初期設定)
- [ ] SSH キーを生成して GitHub に登録した（`ssh -T git@github.com` で認証成功）→ [セクション4-4](#4-4-ssh-キーの設定github-との安全な通信)
- [ ] このリポジトリをフォークした → [セクション5](#5-このリポジトリをフォークする)
- [ ] フォークしたリポジトリをクローンした → [セクション6](#6-フォークしたリポジトリをクローンする)
- [ ] AI ツールのアカウントを準備した（`account-setup.md` 参照）→ [セクション8](#8-ai-ツールのアカウントセットアップ)

すべてにチェックがつけば、研修を始める準備は完了です。`curriculum.md` を開いて Day1 から進めてください。

> **ヒント**: 上のチェックリストの各項目は、この下のセクション3〜8で詳しく説明しています。詰まったら該当セクションを読んでください。

---

## 3. ターミナル（Terminal）の準備

### ターミナルとは？

ターミナルとは、**キーボードで文字を打ってコンピュータに命令を出すアプリ**です。普段はマウスでクリックしてファイルを開いたりフォルダを移動したりしていますが、ターミナルでは**テキストで指示を出して**同じことを行います。

「黒い画面」と呼ばれることもあります。見た目は地味ですが、プログラマーやエンジニアが日常的に使う基本ツールです。

この研修では、Git の操作やファイル管理にターミナルを使います。難しそうに見えますが、使うコマンドはごく少数なので安心してください。

---

### 推奨ターミナルアプリ: Ghostty

#### Mac の場合（Ghostty を推奨）

1. Chrome ブラウザで https://ghostty.org にアクセスします
2. **「Download」** をクリックします（Universal バイナリのため Apple Silicon / Intel どちらの Mac でも同じファイルでOK）
3. ダウンロードした `.dmg` ファイルをダブルクリックします
4. `Ghostty.app` を `Applications` フォルダにドラッグ&ドロップします
5. Launchpad または Spotlight（`Command` + `Space` → "Ghostty" と入力）で起動します
6. 初回起動時に「開発元を確認できません」と表示されたら → **システム設定** > **プライバシーとセキュリティ** > **「このまま開く」** をクリックしてください

> **補足**: Mac には「ターミナル.app」が最初から入っていますが、Ghostty の方が見やすく高速です。Ghostty が使えない場合は、ターミナル.app でもすべての操作が可能です。

<details>
<summary>Windows の場合（現在の研修対象外 — 参考情報）</summary>

- Ghostty は現在 macOS / Linux のみ対応です
- Windows では Git インストール時に一緒に入る **Git Bash** を使用します
- Windows ユーザーは、この研修での「ターミナル」は「Git Bash」のことだと読み替えてください

</details>

---

### 基本コマンド（最低限これだけ覚える）

この研修で使うコマンドは以下の6つだけです。最初は覚えなくてOK。使うたびにここに戻って確認してください。

| コマンド | 意味 | 使用例 | 実行結果の例 |
|---------|------|--------|------------|
| `pwd` | 今いる場所（フォルダ）を表示する | `pwd` | `/Users/taro/Desktop` |
| `ls` | 今いるフォルダの中身を一覧表示する | `ls` | `README.md  curriculum.md  days/` |
| `cd フォルダ名` | 指定したフォルダに移動する | `cd Desktop` | （表示なし = 成功） |
| `cd ..` | 1つ上のフォルダに戻る | `cd ..` | （表示なし = 成功） |
| `mkdir フォルダ名` | 新しいフォルダを作成する | `mkdir training` | （表示なし = 成功） |
| `clear` | 画面の表示をクリアする | `clear` | （画面がきれいになる） |

> **ヒント**: コマンドを打ち間違えたら `Ctrl` + `C` で中断できます。何も壊れないので安心して試してください。

> **ヒント**: 表示なし = エラーではありません。ターミナルは「成功した場合は何も表示しない」のが普通です。エラーの場合だけメッセージが表示されます。

---

### ターミナルの使い方の練習

以下を1行ずつ入力して `Enter` を押してみてください:

```bash
# 今いる場所を確認
pwd

# デスクトップに移動
cd ~/Desktop

# 今いる場所を確認（Desktop に移動したはず）
pwd

# デスクトップの中身を一覧表示
ls

# テスト用フォルダを作成
mkdir test-folder

# 中身を一覧表示（test-folder が増えている）
ls

# テスト用フォルダに移動
cd test-folder

# 今いる場所を確認
pwd

# 1つ上に戻る
cd ..

# 画面をクリア
clear
```

ここまで問題なくできれば、ターミナルの基本操作は完了です。次のセクション「[4. 事前準備: Git と GitHub のセットアップ](#4-事前準備-git-と-github-のセットアップ)」に進んでください。

---

## 4. 事前準備: Git と GitHub のセットアップ

### Git とは？

Git（ギット）は、ファイルの変更履歴を記録・管理するツールです。「いつ」「誰が」「何を変更したか」がすべて記録されるため、チームでの共同作業に最適です。

### GitHub とは？

GitHub（ギットハブ）は、Git で管理したファイルをインターネット上に保存・共有できるWebサービスです。このリポジトリもGitHub上に置かれています。

---

### 4-1. Git のインストール

#### Mac の場合

1. **Ghostty（またはターミナル.app）を開く**
   - セクション「3. ターミナル（Terminal）の準備」で Ghostty をインストール済みの場合は、Ghostty を起動してください
   - Ghostty をインストールしていない場合は、キーボードで `Command` + `Space` を押して「ターミナル」と入力し `Enter` を押します
   - 黒い（または白い）ウィンドウが開けば成功です

2. **Git がインストールされているか確認する**
   - ターミナルに以下を入力して `Enter` を押します:
     ```bash
     git --version
     ```

3. **結果を確認する**
   - `git version 2.xx.x` のようにバージョン番号が表示されれば、**すでにインストール済み**です。次の「[4-2. GitHub アカウントの作成](#4-2-github-アカウントの作成)」に進んでください
   - 「コマンドラインデベロッパーツールが必要です」というポップアップが表示された場合は、**「インストール」ボタンをクリック**してください。インストールには数分〜十数分かかります（Intel Mac の場合はやや時間がかかることがあります）
   - インストール完了後、もう一度 `git --version` を実行してバージョンが表示されればOKです

<details>
<summary>Windows の場合（現在の研修対象外 — 参考情報）</summary>

1. Chrome ブラウザで https://git-scm.com/download/win にアクセスします
2. ダウンロードしたファイルを実行し、すべてデフォルトのまま「Next」→「Install」→「Finish」
3. Windowsのスタートメニューから「Git Bash」を検索して開き、`git --version` で確認
4. Windows では Git Bash アプリでコマンド操作を行います

</details>

---

### 4-2. GitHub アカウントの作成

すでにGitHubアカウントを持っている方は「[4-3. Git の初期設定](#4-3-git-の初期設定)」に進んでください。

1. Chrome ブラウザで https://github.com にアクセスします
2. ページ右上の **「Sign up」** ボタンをクリックします
3. 以下の情報を入力します:
   - **Email address**: メールアドレスを入力
   - **Password**: パスワードを設定（15文字以上、または8文字以上で数字と小文字を含む）
   - **Username**: ユーザー名を決めます（半角英数字とハイフンのみ。後から変更もできます）
4. 「Create account」をクリックします
5. 入力したメールアドレスに確認コードが届くので、そのコードを入力します
6. 質問が表示された場合はスキップまたは適当に回答してOKです

**成功の確認**: https://github.com にアクセスしたとき、右上にあなたのアイコンが表示されていればアカウント作成完了です。

---

### 4-3. Git の初期設定

Git にあなたの名前とメールアドレスを登録します。これは、あなたが行った変更の記録に「誰が変更したか」を残すために必要です。

ターミナルを開き、以下の2つのコマンドを**1行ずつ**入力して `Enter` を押してください。

```bash
git config --global user.name "あなたの名前"
```

```bash
git config --global user.email "あなたのメールアドレス"
```

> **注意**: `"あなたの名前"` と `"あなたのメールアドレス"` の部分は、実際のあなたの名前とメールアドレスに置き換えてください。ダブルクォーテーション `"` は残してください。
>
> **例**:
> ```bash
> git config --global user.name "Taro Yamada"
> git config --global user.email "taro@example.com"
> ```

**成功の確認**: 以下のコマンドで設定内容を表示できます。

```bash
git config --global --list
```

`user.name=Taro Yamada` と `user.email=taro@example.com` のように表示されればOKです。

---

### 4-4. SSH キーの設定（GitHub との安全な通信）

SSH（エスエスエイチ）キーは、あなたのPCとGitHubの間で安全にデータをやり取りするための「電子鍵」です。この設定をしないと、後で `git push`（ファイルのアップロード）ができません。

#### SSH キーの生成

ターミナルで以下を実行してください:

```bash
ssh-keygen -t ed25519 -C "あなたのメールアドレス"
```

- `"あなたのメールアドレス"` はGitHubに登録したメールアドレスに置き換えてください
- 「Enter file in which to save the key」と聞かれたら、そのまま `Enter` を押します（デフォルトの保存場所でOK）
- 「Enter passphrase」と聞かれたら、そのまま `Enter` を押します（パスフレーズなしでOK）
- もう一度「Enter same passphrase again」と聞かれたら、再度 `Enter` を押します

以下のような表示が出れば成功です:

```
Your identification has been saved in /Users/あなた/.ssh/id_ed25519
Your public key has been saved in /Users/あなた/.ssh/id_ed25519.pub
The key fingerprint is:
SHA256:xxxxxxxxxxxxxxx your.email@example.com
```

#### SSH キーを GitHub に登録する

1. **公開鍵をコピーする**

   ターミナルで以下を実行してください:

   ```bash
   cat ~/.ssh/id_ed25519.pub | pbcopy
   ```
   これでクリップボードに鍵がコピーされます（画面には何も表示されませんが、コピーは完了しています）。

   > `pbcopy` がうまく動かない場合は、`cat ~/.ssh/id_ed25519.pub` を実行して表示された内容を手動でコピーしてください。

2. **GitHub に登録する**
   - Chrome で https://github.com/settings/keys にアクセスします
   - **「New SSH key」** ボタンをクリックします
   - **Title**: わかりやすい名前を入力（例: `My Laptop`）
   - **Key type**: `Authentication Key` のまま
   - **Key**: さきほどコピーした公開鍵を貼り付けます
   - **「Add SSH key」** をクリックします

3. **接続テスト**

   ターミナルで以下を実行します:
   ```bash
   ssh -T git@github.com
   ```

   初回は以下のような確認メッセージが表示されます:
   ```
   Are you sure you want to continue connecting (yes/no/[fingerprint])?
   ```
   `yes` と入力して `Enter` を押してください。

   以下のように表示されれば成功です:
   ```
   Hi あなたのユーザー名! You've successfully authenticated, but GitHub does not provide shell access.
   ```

---

## 5. このリポジトリをフォークする

「フォーク（Fork）」とは、他の人のリポジトリを**自分のGitHubアカウントにまるごとコピー**することです。コピーした自分のリポジトリに対して自由に変更を加えることができます。

1. Chrome ブラウザで https://github.com/SHU-T0/spec-ai-training にアクセスします
2. ページ右上の **「Fork」** ボタンをクリックします
3. 「Create a new fork」画面が表示されます
   - **Repository name**: `spec-ai-training` のまま変更不要
   - **Copy the `main` branch only**: チェックが入ったままでOK
4. **「Create fork」** をクリックします
5. 数秒待つと、自分のアカウントにリポジトリがコピーされます

**成功の確認**: ブラウザのURLが `https://github.com/あなたのユーザー名/spec-ai-training` になっていればOKです。ページ上部のリポジトリ名の下に「forked from SHU-T0/spec-ai-training」と表示されています。

---

## 6. フォークしたリポジトリをクローンする

「クローン（Clone）」とは、GitHub上のリポジトリを**自分のPCにダウンロード**することです。これにより、PC上でファイルを編集できるようになります。

### 手順

ターミナルを開いて、以下のコマンドを**1行ずつ**実行してください。

```bash
# 作業フォルダに移動する（例: デスクトップ）
cd ~/Desktop
```

```bash
# リポジトリをクローンする（「あなたのユーザー名」を自分のGitHubユーザー名に置き換える）
git clone git@github.com:あなたのユーザー名/spec-ai-training.git
```

```bash
# クローンしたフォルダに移動する
cd spec-ai-training
```

> **注意**: `あなたのユーザー名` の部分は、実際のGitHubユーザー名に置き換えてください。
>
> **例**: GitHubユーザー名が `taro-yamada` の場合:
> ```bash
> git clone git@github.com:taro-yamada/spec-ai-training.git
> ```

### 成功するとこのような表示が出ます

```
Cloning into 'spec-ai-training'...
remote: Enumerating objects: XX, done.
remote: Counting objects: 100% (XX/XX), done.
remote: Compressing objects: 100% (XX/XX), done.
Receiving objects: 100% (XX/XX), XX.XX KiB | XX.XX MiB/s, done.
Resolving deltas: 100% (XX/XX), done.
```

### 本体リポジトリとの同期設定（upstream）

フォークした自分のリポジトリは、本体（SHU-T0/spec-ai-training）の更新を自動では受け取りません。研修中にカリキュラムやクイズが更新されることがあるため、以下の設定を行ってください。

> クローン直後であればそのまま実行できます。ターミナルを閉じた後に実行する場合は、先に `cd ~/Desktop/spec-ai-training` でリポジトリに移動してください。

```bash
# 本体リポジトリを upstream として登録する（1回だけ実行すればOK）
git remote add upstream git@github.com:SHU-T0/spec-ai-training.git
```

**成功の確認**:
```bash
git remote -v
```

以下のように `origin`（自分のフォーク）と `upstream`（本体）の2つが表示されればOKです:
```
origin    git@github.com:あなたのユーザー名/spec-ai-training.git (fetch)
origin    git@github.com:あなたのユーザー名/spec-ai-training.git (push)
upstream  git@github.com:SHU-T0/spec-ai-training.git (fetch)
upstream  git@github.com:SHU-T0/spec-ai-training.git (push)
```

**本体の更新を取り込みたいとき:**
```bash
git checkout main
git pull upstream main
git push origin main
```

> この操作は毎日の作業開始前に実行することを推奨します。

### うまくいかない場合

- `Permission denied (publickey)` と表示される場合 → セクション「[4-4. SSHキーの設定](#4-4-ssh-キーの設定github-との安全な通信)」をやり直してください
- `Repository not found` と表示される場合 → ユーザー名が正しいか確認してください。また、セクション「[5. このリポジトリをフォークする](#5-このリポジトリをフォークする)」が完了しているか確認してください

---

## 7. リポジトリの公開設定

チームメンバーやレビュアーがあなたのリポジトリにアクセスできるように設定します。

### 方法A: リポジトリを Public（公開）にする -- 推奨

1. Chrome で自分のフォークしたリポジトリ（`https://github.com/あなたのユーザー名/spec-ai-training`）を開きます
2. ページ上部の **「Settings」** タブをクリックします
3. 左メニューの **「General」** が選択されていることを確認します
4. ページ最下部の **「Danger Zone」** セクションまでスクロールします
5. **「Change repository visibility」** の「Change visibility」ボタンをクリックします
6. **「Change to public」** を選択します
7. 確認のためリポジトリ名（`あなたのユーザー名/spec-ai-training`）を入力します
8. **「I understand, change repository visibility」** をクリックします

### 方法B: 特定のメンバーを招待する（Private のまま使いたい場合）

1. Settings → 左メニューの **「Collaborators」** をクリックします
2. **「Add people」** ボタンをクリックします
3. 招待したいメンバーのGitHubユーザー名またはメールアドレスを入力します
4. 表示された候補から選択し、**「Add collaborator」** をクリックします
5. 相手に招待メールが届くので、承認してもらってください

---

## 8. AI ツールのアカウントセットアップ

Day1 の開始前に、以下の必須ツールのアカウントを準備してください。

| ツール | URL | 備考 |
|--------|-----|------|
| **Google Gemini** | https://gemini.google.com | チーム課金済み。招待メールを確認してログイン |
| **Claude** | https://claude.ai | チーム課金済み。招待メールを確認してログイン |
| **ChatGPT** | https://chatgpt.com | 個人アカウント（無料でも可） |
| **GitHub** | https://github.com | [セクション4-2](#4-2-github-アカウントの作成)で作成済み |

詳細なセットアップ手順やトラブルシューティングは **`account-setup.md`** を参照してください。

---

## 9. 研修の進め方

### カリキュラム概要

| Phase | 期間 | 内容 |
|-------|------|------|
| Phase 1 | Day1-Day3 (4/1-4/3) | AIツール基礎体験 |
| Phase 2 | Day4-Day9 (4/6-4/13) | AI基礎 + 実務応用 |
| Phase 3 | Day10-Day13 (4/14-4/21) | 開発体験 |

各Dayの詳細なスケジュールとテーマは **`curriculum.md`** を参照してください。

### 各 Day の進め方

1. **当日の研修ガイドを開く**: `days/day-XX.md` を開きます（`XX` は当日の番号。例: Day4 なら `days/day-04.md`）
2. **「必須課題」を上から順に進める**: 各課題にはヒントが書かれているので、まずは自力で取り組んでください
3. **成果物を作成する**: 指示に従い、ファイルを作成します
4. **成果物を提出する**: Phase によって提出方法が異なります（次のセクション「[10. 提出方法](#10-提出方法)」を参照）
5. **クイズがある日は理解度チェックを受ける**: 100点が必須です（次のセクション「[11. クイズの受け方](#11-クイズの受け方)」を参照）
6. **全部終わったら「早期完了者向け追加課題」に取り組む**: 早く終わった場合は追加課題に進んでOKです

---

## 10. 提出方法

### Phase 1（Day1-Day3）: Google Drive 提出

Git/GitHub研修前のため、PR（プルリクエスト）提出は不要です。

- 成果物は **Google Docs / Google Slides** で作成します
- 作成したファイルを指定の **Google Drive フォルダ**に格納します（各DayのガイドにフォルダURLが記載されています）
- 格納後、**Slack の研修チャンネル**に共有リンクを投稿して完了報告します
- **手動アップロードNG**: ファイル作成や格納はAIツールを活用して行うこと

> Day4 の GitHub 基礎完了後に、Phase 1 の成果物もリポジトリに Push することを推奨します。

---

### Phase 2-3（Day4-Day13）: Git / PR 提出

Day4 以降は Git と GitHub を使って成果物を提出します。以下に毎日の作業手順を一連の流れで説明します。

#### ステップ 1: 最新の状態を取得する

ターミナルを開き、リポジトリのフォルダに移動してから以下を実行します。

```bash
# リポジトリのフォルダに移動（クローン先がデスクトップの場合）
cd ~/Desktop/spec-ai-training

# main ブランチに切り替える
git checkout main

# 最新の状態を取得する
git pull origin main
```

**成功の確認**: `Already up to date.` または `Updating ...` のようなメッセージが表示されればOKです。

#### ステップ 2: 新しいブランチを作成する

「ブランチ（Branch）」とは、メインの作業ラインとは別に枝分かれした作業場所のことです。各Dayの成果物は専用のブランチで作成します。

```bash
# 新しいブランチを作成して切り替える
# 「day-XX-テーマ名」を当日の番号とテーマに置き換える
git checkout -b training/day-XX-テーマ名
```

> **例**: Day5（リサーチ実務）の場合:
> ```bash
> git checkout -b training/day-05-research
> ```

**成功の確認**: `Switched to a new branch 'training/day-05-research'` のように表示されればOKです。

#### ステップ 3: 成果物フォルダとファイルを作成する

```bash
# 成果物フォルダが存在するか確認する（最初から用意されているはず）
ls training/day-XX
# もしフォルダがない場合は作成する: mkdir -p training/day-XX
```

> **例**: Day5 の場合: `ls training/day-05`

この `training/day-XX/` フォルダの中に成果物ファイルを作成してください。ファイルの作成はテキストエディタ（テキストエディット、VSCode、Cursor など）で行ってかまいません。

最低限推奨するファイル:
- `daily-report.md` -- 日報（テンプレート: `templates/daily-report-template.md`）
- 課題成果物1点以上（`*.md` またはプロジェクトファイル）

成果物のテンプレートは `templates/day-output-template.md` を参照してください。

#### ステップ 4: 変更をステージングする

「ステージング」とは、「次のコミットに含めるファイルを選ぶ」操作です。

```bash
# training/day-XX/ の中のすべてのファイルをステージングする
git add training/day-XX/
```

> **例**: `git add training/day-05/`

**成功の確認**: 以下のコマンドで状態を確認できます。

```bash
git status
```

緑色で `new file: training/day-XX/...` のように表示されていればステージング成功です。

#### ステップ 5: コミットする

「コミット（Commit）」とは、ステージングしたファイルの変更を**記録として保存**する操作です。

```bash
git commit -m "docs: add Day XX outputs"
```

> **例**: `git commit -m "docs: add Day 05 outputs"`

**成功の確認**: `1 file changed, XX insertions(+)` のような表示が出ればOKです。

#### ステップ 6: プッシュする

「プッシュ（Push）」とは、PCに保存したコミットを**GitHubにアップロード**する操作です。

```bash
git push origin training/day-XX-テーマ名
```

> **例**: `git push origin training/day-05-research`

**成功の確認**: `Branch 'training/day-05-research' set up to track remote branch ...` のような表示が出ればOKです。

#### ステップ 7: GitHub で PR（プルリクエスト）を作成する

「PR（Pull Request / プルリクエスト）」とは、「この変更を取り込んでほしい」というレビュー依頼のことです。

1. Chrome で自分のフォークしたリポジトリ（`https://github.com/あなたのユーザー名/spec-ai-training`）を開きます
2. ページ上部に黄色い **「Compare & pull request」** バナーが表示されるので、クリックします
   - バナーが表示されない場合は、「Pull requests」タブ → 「New pull request」をクリックしてください
3. PR作成画面が表示されます:
   - **base repository**: **自分のフォーク**（`あなたのユーザー名/spec-ai-training`）になっていることを確認してください。デフォルトで親リポジトリ（`SHU-T0/spec-ai-training`）が選択されている場合は、ドロップダウンをクリックして自分のリポジトリに変更してください
   - **base**: `main` になっていることを確認
   - **compare**: 今作成したブランチ（例: `training/day-05-research`）が選択されていることを確認
4. **タイトル**: `Day XX 成果物提出` のように入力します（例: `Day 05 成果物提出`）
5. **本文**: テンプレートが自動で入力されます。以下の項目を記入してください:
   - 当日の目的
   - 成果物パス
   - クイズ証跡（100点のスクリーンショット）
   - Slack通知リンク
   - レビューしてほしい観点
6. **「Create pull request」** をクリックします

**成功の確認**: PRのページが表示され、URLが `https://github.com/あなたのユーザー名/spec-ai-training/pull/番号` のようになっていればOKです。

#### ステップ 8: Slack 通知を確認する

PRを作成すると、研修用Slackチャンネルに通知が届きます。通知が届いていることを確認してください。

#### ステップ 9: レビュー対応と Merge

- レビュアーからコメントがついたら、修正を行い、再度 `git add` → `git commit` → `git push` してください
- レビューが承認されたら、PRページの **「Merge pull request」** をクリックします
- **Merge が完了すると、その Day は完了です**

> **レビューが遅れている場合**: PR作成済み + Slack通知確認 + クイズ100点で**暫定完了**とします。最終完了は Merge 後に確定します。

---

## 11. クイズの受け方

各Dayの理解度を確認するクイズが用意されています。**100点が合格基準**です。

1. `quizzes/index.html` をブラウザで開きます
   - ファイルをダブルクリックするか、ファイルを Chrome にドラッグ&ドロップしてください
2. 名前を入力します
3. 受けたい Day のボタンをクリックします
4. すべての問題に回答して **「採点する」** をクリックします
5. 100点になるまで何度でも再受験できます（当日内は無制限）
6. **100点になったら画面をスクリーンショットして保存します**
   - **Mac**: `Command` + `Shift` + `3`（画面全体）または `Command` + `Shift` + `4`（範囲選択）
   - **Windows**: `Windows` + `PrintScreen` または `Windows` + `Shift` + `S`
7. PR の本文にスクリーンショットを添付します
   - PR の編集画面で、スクリーンショット画像をドラッグ&ドロップすれば添付できます

---

## 12. リポジトリ構成

```
spec-ai-training/
├── README.md                      ← 今読んでいるファイル（使い方ガイド）
├── curriculum.md                  ← カリキュラム概要・日別スケジュール
├── account-setup.md               ← ツール・アカウントのセットアップ手順
├── resources.md                   ← 参考教材リンク集（動画・記事・公式ドキュメント）
├── learning-infrastructure.md     ← 運用ルール（提出・レビュー・クイズ・完了判定）
├── CONTRIBUTING.md                ← PRルール・コミットルール・ブランチ命名規則
├── days/                          ← 日別の詳細な研修ガイド
│   ├── day-01.md
│   ├── day-02.md
│   └── ... (day-13.md まで)
├── quizzes/                       ← 理解度チェッククイズ
│   └── index.html
├── templates/                     ← 成果物・日報・PRのテンプレート
│   ├── day-output-template.md     ← 成果物テンプレート
│   ├── daily-report-template.md   ← 日報テンプレート
│   └── day-pr-body-template.md    ← PR本文テンプレート
├── training/                      ← ★ ここに自分の成果物を作成する
│   ├── day-01/
│   ├── day-02/
│   └── ... (day-13/ まで作成済み)
├── references/                    ← 参考資料テンプレート
│   └── farleap-context.example.md
└── .github/                       ← GitHub設定（PR・Issueテンプレート）
    ├── PULL_REQUEST_TEMPLATE.md
    └── ISSUE_TEMPLATE/
```

> **`training/` フォルダについて**: `training/day-01/` 〜 `training/day-13/` は最初から用意されています。各Dayの成果物は対応するフォルダに直接作成してください。

---

## 13. 困ったときは

### Git でよくあるトラブルと解決方法

| 症状 | 原因 | 解決方法 |
|------|------|---------|
| `git push` で `Permission denied (publickey)` | SSH キーが設定されていない、または GitHub に登録されていない | セクション「[4-4. SSH キーの設定](#4-4-ssh-キーの設定github-との安全な通信)」を最初からやり直してください |
| `git push` で `rejected` | GitHub 上のリポジトリがローカルより先に進んでいる | `git pull origin main` を実行してから、もう一度 `git push` してください |
| `git push` で `fatal: The current branch ... has no upstream branch` | リモートブランチとの紐付けがない | `git push --set-upstream origin ブランチ名` を実行してください |
| 間違えて commit してしまった | -- | まずは `git log` で状況を確認し、Slack の研修チャンネルで相談してください |
| 今どのブランチにいるかわからない | -- | `git branch` を実行してください。`*` がついているのが現在のブランチです |
| ファイルの変更を元に戻したい | -- | `git checkout -- ファイル名` を実行すると、最後のコミット時点の状態に戻ります |
| `git status` で赤いファイル名が大量に表示される | ステージングしていない変更がある | `git add` でステージングするか、不要な変更は `git checkout -- ファイル名` で元に戻してください |
| `merge conflict`（マージコンフリクト）と表示された | 同じファイルが複数箇所で変更された | Slack の研修チャンネルで相談してください。最初のうちは一人で解決しなくて大丈夫です |

### Git コマンドのクイックリファレンス

| やりたいこと | コマンド |
|-------------|---------|
| 現在の状態を確認する | `git status` |
| 現在のブランチを確認する | `git branch` |
| main ブランチに戻る | `git checkout main` |
| 変更履歴を確認する | `git log --oneline` |
| 直前のコミット内容を確認する | `git show` |

### AI ツールのトラブル

- まず **`account-setup.md`** のトラブルシューティングセクションを確認してください
- 招待メールが見つからない場合は、メールの迷惑メールフォルダも確認してください
- 解決しない場合は Slack の研修チャンネルで質問してください

### 質問するときのフォーマット

問題を報告するときは、以下の3点を書いてください。これがあると回答者がすぐに状況を理解でき、解決が早くなります。

```
【やろうとしたこと】
例: Day5 の成果物を git push しようとした

【起きたこと（エラーメッセージがあればそのまま貼り付け）】
例: "Permission denied (publickey)" というエラーが出た

【試したこと】
例: git push origin training/day-05-research を3回実行したが同じエラー
```

> **チェックリストは本ページ上部の「[★ 事前準備チェックリスト](#-事前準備チェックリスト)」を参照してください。**
