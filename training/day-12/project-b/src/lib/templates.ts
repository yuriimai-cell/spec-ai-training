import { PhaseDef } from './types';

export const PHASES: PhaseDef[] = [
  {
    id: 'first_visit',
    label: '初回訪問',
    description: '信頼構築と現状把握',
    icon: '🤝',
    sections: [
      {
        id: 'basicInfo',
        title: '基本情報',
        fields: [
          { key: 'date', label: '商談日時', type: 'date', required: true, placeholder: '' },
          { key: 'companyName', label: '顧客会社名', type: 'text', required: true, placeholder: '例：株式会社〇〇' },
          { key: 'clientAttendees', label: '先方参加者・役職', type: 'text', required: true, placeholder: '例：田中部長、鈴木課長' },
          { key: 'ourAttendees', label: '自社参加者', type: 'text', required: true, placeholder: '例：営業 山田、技術 佐藤' },
          { key: 'location', label: '商談場所', type: 'text', required: false, placeholder: '例：先方本社 会議室A / オンライン（Zoom）' },
        ],
      },
      {
        id: 'currentSituation',
        title: '顧客の現状把握',
        fields: [
          { key: 'businessOverview', label: '業種・事業内容', type: 'textarea', required: true, placeholder: '例：製造業。自動車部品の設計・製造を行う。従業員500名規模。' },
          { key: 'currentTools', label: '現在の業務フロー・使用ツール', type: 'textarea', required: true, placeholder: '例：受注管理はExcel、在庫管理は独自システム（10年以上前に導入）を使用。' },
          { key: 'orgStructure', label: '組織体制・意思決定プロセス', type: 'textarea', required: false, placeholder: '例：情報システム部が主管。50万円以上の投資は役員承認が必要。' },
        ],
      },
      {
        id: 'issueHearing',
        title: '課題ヒアリング',
        fields: [
          { key: 'explicitIssues', label: '顕在課題・顧客が明言した問題', type: 'textarea', required: true, placeholder: '例：「月次の集計作業に3日かかっており、営業が数字を把握できるのが月末になってしまう」' },
          { key: 'latentIssues', label: '潜在課題・ヒアリングで引き出した問題', type: 'textarea', required: false, placeholder: '例：担当者のスキル依存が高く、引き継ぎリスクがある可能性。' },
          { key: 'issuePriority', label: '課題の優先順位・緊急度', type: 'text', required: false, placeholder: '例：集計作業の効率化が最優先。来期予算化を検討中。' },
        ],
      },
      {
        id: 'ourIntroduction',
        title: '自社紹介・反応',
        fields: [
          { key: 'presentedContent', label: '紹介した内容・資料・デモ', type: 'textarea', required: false, placeholder: '例：会社概要、製品デモ（ダッシュボード機能中心）を実施。' },
          { key: 'clientReaction', label: '顧客の反応・関心ポイント', type: 'textarea', required: true, placeholder: '例：ダッシュボードのリアルタイム性に強い関心。「今の課題にマッチしている」との発言あり。' },
          { key: 'clientConcerns', label: '顧客の懸念・ネガティブ反応', type: 'textarea', required: false, placeholder: '例：「既存システムとの連携が不安」「導入コストが予算内に収まるか確認が必要」' },
        ],
      },
      {
        id: 'competitorInfo',
        title: '競合情報',
        fields: [
          { key: 'competitors', label: '比較検討中の競合製品・サービス', type: 'text', required: false, placeholder: '例：A社製品と比較中。B社にも声をかけているとのこと。' },
        ],
      },
      {
        id: 'actionItems',
        title: 'アクションアイテム',
        isActionItems: true,
        fields: [],
      },
      {
        id: 'nextAppointment',
        title: '次回アポイント',
        fields: [
          { key: 'nextDate', label: '次回日時', type: 'date', required: true, placeholder: '' },
          { key: 'nextAgenda', label: '次回の議題・目的', type: 'text', required: true, placeholder: '例：課題の深掘りヒアリングと概算見積もり提示' },
          { key: 'materialsToPrepare', label: '送付予定の資料・情報', type: 'text', required: false, placeholder: '例：導入事例資料、ROI試算シート' },
        ],
      },
    ],
  },
  {
    id: 'proposal',
    label: '提案',
    description: '解決策の提示と合意',
    icon: '📋',
    sections: [
      {
        id: 'basicInfo',
        title: '基本情報',
        fields: [
          { key: 'date', label: '商談日時', type: 'date', required: true, placeholder: '' },
          { key: 'companyName', label: '顧客会社名', type: 'text', required: true, placeholder: '例：株式会社〇〇' },
          { key: 'clientAttendees', label: '先方参加者・役職', type: 'text', required: true, placeholder: '例：田中部長、鈴木課長' },
          { key: 'ourAttendees', label: '自社参加者', type: 'text', required: true, placeholder: '例：営業 山田、技術 佐藤' },
          { key: 'proposalVersion', label: '提案書バージョン', type: 'text', required: false, placeholder: '例：v1.2' },
        ],
      },
      {
        id: 'proposalContent',
        title: '提案内容',
        fields: [
          { key: 'solutionOverview', label: '提案したソリューションの概要', type: 'textarea', required: true, placeholder: '例：基幹システム連携型のリアルタイムダッシュボード（Aプラン）を提案。月次集計の自動化と可視化が主な価値提供。' },
          { key: 'pricing', label: '提示金額・費用構成', type: 'text', required: true, placeholder: '例：初期費用300万円、月額利用料15万円（年間180万円）' },
          { key: 'implementationSchedule', label: '導入スケジュール・フェーズ構成', type: 'textarea', required: false, placeholder: '例：Phase1（環境構築・2ヶ月）→Phase2（データ連携・1ヶ月）→Phase3（運用開始）' },
          { key: 'differentiationPoints', label: '提案の差別化ポイント', type: 'text', required: false, placeholder: '例：既存ERPとのAPI連携実績が豊富。専任CSによる導入後サポートが強み。' },
        ],
      },
      {
        id: 'clientReaction',
        title: '顧客の反応',
        fields: [
          { key: 'questionsAndAnswers', label: '顧客からの質問・Q&A形式', type: 'textarea', required: true, placeholder: 'Q：既存の〇〇システムとの連携は可能か？\nA：標準APIで対応可能。詳細は技術確認の上、次回回答予定。' },
          { key: 'concerns', label: '顧客の懸念・反論', type: 'textarea', required: true, placeholder: '例：「金額が想定より高い」「導入期間が長い」「社内の反対意見がある」' },
          { key: 'ourResponses', label: '自社の対応・回答', type: 'textarea', required: true, placeholder: '例：費用面は分割払い・段階導入での対応を提案。導入期間は最短2ヶ月への短縮可能性を確認中。' },
          { key: 'overallSentiment', label: '全体的な反応・温度感', type: 'text', required: false, placeholder: '例：概ね前向き。予算承認が最大のハードル。' },
        ],
      },
      {
        id: 'competitorSituation',
        title: '競合状況',
        fields: [
          { key: 'competitorComparison', label: '比較検討中の競合・選定基準', type: 'textarea', required: false, placeholder: '例：A社と最終比較中。選定基準は「既存システム連携の容易さ」「サポート体制」「コスト」の3点。' },
          { key: 'ourAdvantage', label: '当社の優位性として伝えた点', type: 'text', required: false, placeholder: '例：連携実績の豊富さと、専任CSによる手厚いサポートを強調。' },
        ],
      },
      {
        id: 'actionItems',
        title: 'アクションアイテム',
        isActionItems: true,
        fields: [],
      },
      {
        id: 'nextSteps',
        title: '次ステップ',
        fields: [
          { key: 'nextDate', label: '次回日時', type: 'date', required: true, placeholder: '' },
          { key: 'decisionSchedule', label: '先方の意思決定スケジュール', type: 'text', required: true, placeholder: '例：来月末までに稟議を通す予定。役員承認は翌月初旬。' },
          { key: 'nextAction', label: '次のアクション・修正提案や上長同行等', type: 'text', required: true, placeholder: '例：費用の再見積もり提示、上長同行での役員プレゼン実施' },
        ],
      },
    ],
  },
  {
    id: 'negotiation',
    label: '商談交渉',
    description: '条件のすり合わせ',
    icon: '⚖️',
    sections: [
      {
        id: 'basicInfo',
        title: '基本情報',
        fields: [
          { key: 'date', label: '商談日時', type: 'date', required: true, placeholder: '' },
          { key: 'companyName', label: '顧客会社名', type: 'text', required: true, placeholder: '例：株式会社〇〇' },
          { key: 'clientAttendees', label: '先方参加者・役職', type: 'text', required: true, placeholder: '例：田中部長、鈴木課長' },
          { key: 'ourAttendees', label: '自社参加者', type: 'text', required: true, placeholder: '例：営業 山田、技術 佐藤' },
        ],
      },
      {
        id: 'negotiationContent',
        title: '交渉内容',
        fields: [
          { key: 'agenda', label: '今回の議題・交渉事項', type: 'textarea', required: true, placeholder: '例：価格の最終調整、契約条件（支払い方法・保証内容）のすり合わせ' },
          { key: 'clientRequests', label: '先方の要求・要望', type: 'textarea', required: true, placeholder: '例：「初期費用を50万円削減してほしい」「サポート期間を2年に延長してほしい」' },
          { key: 'ourPosition', label: '当社のポジション・回答', type: 'textarea', required: true, placeholder: '例：初期費用の削減は困難。月額料金を3ヶ月無料にする代替案を提示。' },
          { key: 'counterProposals', label: '提示した代替案・妥協点', type: 'textarea', required: false, placeholder: '例：・月額3ヶ月無料（約45万円相当）\n・サポート期間を1.5年に延長\n・追加トレーニング2回無料' },
        ],
      },
      {
        id: 'agreements',
        title: '合意・決定事項',
        fields: [
          { key: 'agreedItems', label: '合意した内容・価格や条件等', type: 'textarea', required: true, placeholder: '例：・初期費用300万円（変更なし）\n・月額3ヶ月無料で合意\n・サポート期間1.5年で合意' },
          { key: 'pendingItems', label: '保留・未決定の事項', type: 'textarea', required: true, placeholder: '例：・支払い方法（一括 vs 分割）は財務部確認後に回答\n・カスタマイズ範囲は技術確認が必要' },
          { key: 'specialConditions', label: '前提条件・特記事項', type: 'textarea', required: false, placeholder: '例：2025年4月末までの契約締結が条件。以降は価格改定の可能性あり。' },
        ],
      },
      {
        id: 'riskManagement',
        title: 'リスク管理',
        fields: [
          { key: 'risks', label: '交渉上のリスク・懸念', type: 'textarea', required: false, placeholder: '例：競合B社が更に値下げを提示してくる可能性。財務部の稟議が通らないリスク。' },
          { key: 'escalationNeeded', label: '社内エスカレーションが必要な事項', type: 'text', required: false, placeholder: '例：値引き幅の上限確認（上長承認必要）' },
        ],
      },
      {
        id: 'actionItems',
        title: 'アクションアイテム',
        isActionItems: true,
        fields: [],
      },
      {
        id: 'nextSteps',
        title: '次ステップ',
        fields: [
          { key: 'nextDate', label: '次回日時', type: 'date', required: true, placeholder: '' },
          { key: 'finalDecisionDeadline', label: '最終決定期限', type: 'date', required: true, placeholder: '' },
          { key: 'remainingIssues', label: '次回までに解決すべき残課題', type: 'textarea', required: true, placeholder: '例：・支払い方法の確認（先方財務部より連絡待ち）\n・カスタマイズ範囲の技術調査（当社エンジニアが実施）' },
        ],
      },
    ],
  },
  {
    id: 'closing',
    label: 'クロージング',
    description: '最終合意と契約締結',
    icon: '✍️',
    sections: [
      {
        id: 'basicInfo',
        title: '基本情報',
        fields: [
          { key: 'date', label: '商談日時', type: 'date', required: true, placeholder: '' },
          { key: 'companyName', label: '顧客会社名', type: 'text', required: true, placeholder: '例：株式会社〇〇' },
          { key: 'clientAttendees', label: '先方参加者・役職', type: 'text', required: true, placeholder: '例：田中部長、鈴木課長' },
          { key: 'ourAttendees', label: '自社参加者', type: 'text', required: true, placeholder: '例：営業 山田、技術 佐藤' },
          { key: 'orderAmount', label: '受注金額・確定または見込', type: 'text', required: true, placeholder: '例：初期300万円＋月額15万円（年間総額480万円）' },
        ],
      },
      {
        id: 'finalConditions',
        title: '最終条件確認',
        fields: [
          { key: 'scope', label: '確定したスコープ・納品物', type: 'textarea', required: true, placeholder: '例：・ダッシュボードシステム本体\n・ERPとのAPI連携\n・ユーザーマニュアル\n・操作トレーニング3回' },
          { key: 'finalPrice', label: '最終価格・支払い条件', type: 'text', required: true, placeholder: '例：初期300万円（契約時50%・検収時50%）、月額15万円（月末締め翌月払い）' },
          { key: 'deliveryDate', label: '納期・本番稼働日', type: 'date', required: true, placeholder: '' },
          { key: 'support', label: 'サポート・保証内容', type: 'text', required: false, placeholder: '例：稼働後1.5年間、平日9-18時対応、月1回定例ミーティング込み' },
          { key: 'specialConditions', label: '特記事項・例外条件', type: 'textarea', required: false, placeholder: '例：月額3ヶ月無料（4〜6月分）。7月より通常課金開始。' },
        ],
      },
      {
        id: 'decisionStatus',
        title: '意思決定状況',
        fields: [
          { key: 'decisionStatus', label: '意思決定の状況・受注確定や稟議中等', type: 'text', required: true, placeholder: '例：稟議書提出済み。来週の役員会で承認予定。' },
          { key: 'decisionMaker', label: '最終意思決定者・役職', type: 'text', required: true, placeholder: '例：取締役 情報システム担当 〇〇氏' },
          { key: 'approvalProcess', label: '社内稟議・承認プロセス', type: 'textarea', required: false, placeholder: '例：情報システム部長→CFO→取締役会の順で承認。承認後、正式発注書を発行。' },
          { key: 'remainingBarriers', label: '受注の障壁・残懸念', type: 'textarea', required: false, placeholder: '例：役員会での最終承認のみ。競合比較は終了済みで当社優位。' },
        ],
      },
      {
        id: 'contractProcedure',
        title: '契約手続き',
        fields: [
          { key: 'contractType', label: '契約形態', type: 'text', required: true, placeholder: '例：ソフトウェア利用契約＋保守サービス契約（2通）' },
          { key: 'contractDate', label: '契約締結予定日', type: 'date', required: true, placeholder: '' },
          { key: 'contractContact', label: '先方の契約担当窓口', type: 'text', required: true, placeholder: '例：情報システム部 鈴木課長（契約書の押印・送付担当）' },
        ],
      },
      {
        id: 'actionItems',
        title: 'アクションアイテム',
        isActionItems: true,
        fields: [],
      },
      {
        id: 'postOrderSteps',
        title: '受注後の次ステップ',
        fields: [
          { key: 'kickoffDate', label: 'キックオフ日程', type: 'date', required: false, placeholder: '' },
          { key: 'onboardingPlan', label: 'オンボーディング計画', type: 'textarea', required: true, placeholder: '例：・Week1：環境構築・設定\n・Week2-4：データ移行・テスト\n・Month2：ユーザートレーニング\n・Month3：本番稼働' },
          { key: 'successKpi', label: '成功基準・KPI', type: 'text', required: false, placeholder: '例：月次集計時間を現在の3日→1日以内に短縮。3ヶ月後に達成度確認。' },
        ],
      },
    ],
  },
  {
    id: 'followup',
    label: 'フォローアップ',
    description: '継続的な関係構築とアップセル',
    icon: '🔄',
    sections: [
      {
        id: 'basicInfo',
        title: '基本情報',
        fields: [
          { key: 'date', label: '商談日時', type: 'date', required: true, placeholder: '' },
          { key: 'companyName', label: '顧客会社名', type: 'text', required: true, placeholder: '例：株式会社〇〇' },
          { key: 'clientAttendees', label: '先方参加者・役職', type: 'text', required: true, placeholder: '例：田中部長、鈴木課長' },
          { key: 'ourAttendees', label: '自社参加者', type: 'text', required: true, placeholder: '例：営業 山田、CS 木村' },
          { key: 'meetingNumber', label: '第○回目・定例名', type: 'text', required: false, placeholder: '例：第3回月次定例ミーティング' },
        ],
      },
      {
        id: 'previousHomework',
        title: '前回宿題の確認',
        fields: [
          { key: 'previousActions', label: '前回アクションアイテムの進捗', type: 'textarea', required: true, placeholder: '例：\n✅ ユーザーマニュアルの更新版を送付済み\n✅ 追加ユーザーのアカウント発行完了\n⏳ CSV出力機能の追加対応（来週リリース予定）' },
          { key: 'incompleteReasons', label: '未完了アクションの理由・対処', type: 'textarea', required: false, placeholder: '例：CSV出力機能は技術的な仕様変更が必要となり、開発期間を1週間延長。来週木曜にリリース予定。' },
        ],
      },
      {
        id: 'currentProgress',
        title: '現状・進捗',
        fields: [
          { key: 'usageStatus', label: '利用状況・進捗報告', type: 'textarea', required: true, placeholder: '例：月次集計の作業時間が3日→1.5日に短縮。全15ユーザー中12名が定期的に利用中。' },
          { key: 'issues', label: '発生している課題・問題点', type: 'textarea', required: false, placeholder: '例：「特定の条件でグラフが正しく表示されない」と報告あり。調査中。' },
          { key: 'satisfaction', label: '顧客満足度・フィードバック', type: 'textarea', required: true, placeholder: '例：全体的に満足。特にリアルタイム更新の機能が好評。「もっと早く導入すればよかった」との声あり。' },
          { key: 'kpiStatus', label: 'KPI達成状況・導入目標に対する進捗', type: 'textarea', required: false, placeholder: '例：目標「集計時間1日以内」に対し、現状1.5日。あと1〜2ヶ月で達成見込み。' },
        ],
      },
      {
        id: 'additionalProposal',
        title: '追加提案・アップセル',
        fields: [
          { key: 'additionalNeeds', label: '顧客から出た追加ニーズ・要望', type: 'textarea', required: false, placeholder: '例：「営業チーム向けのモバイルアプリも欲しい」「他部署でも同様のシステムを検討したい」' },
          { key: 'additionalSolution', label: '提案した追加ソリューション・内容', type: 'textarea', required: false, placeholder: '例：モバイルアプリオプション（月額+5万円）を提案。概要資料を送付予定。' },
          { key: 'clientReaction', label: '顧客の反応・温度感', type: 'text', required: false, placeholder: '例：モバイルアプリについて部長が前向き。来月の予算確認後に判断とのこと。' },
          { key: 'expectedAmount', label: '見込み金額・時期', type: 'text', required: false, placeholder: '例：月額+5万円。来月中の意思決定見込み。' },
        ],
      },
      {
        id: 'riskManagement',
        title: 'リスク管理',
        fields: [
          { key: 'churnRisk', label: '解約・縮小リスクの有無・内容', type: 'textarea', required: false, placeholder: '例：今のところリスクなし。利用率も高く、満足度は良好。' },
          { key: 'escalationNeeded', label: 'エスカレーションが必要な事項', type: 'text', required: false, placeholder: '例：特になし' },
        ],
      },
      {
        id: 'actionItems',
        title: 'アクションアイテム',
        isActionItems: true,
        fields: [],
      },
      {
        id: 'nextMeeting',
        title: '次回予定',
        fields: [
          { key: 'nextDate', label: '次回日時', type: 'date', required: true, placeholder: '' },
          { key: 'nextAgenda', label: '次回の議題', type: 'text', required: true, placeholder: '例：CSV出力機能のリリース確認、モバイルアプリの詳細提案' },
        ],
      },
    ],
  },
];

export const PHASE_MAP: Record<string, PhaseDef> = Object.fromEntries(
  PHASES.map((p) => [p.id, p])
);
