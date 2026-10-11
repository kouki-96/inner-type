export type TraitType = 'leader' | 'analyst' | 'creator' | 'supporter' | 'realist' | 'idealist' | 'individual' | 'harmonizer';

export interface QuestionChoice {
  id: string;
  text: string;
  traits: Partial<Record<TraitType, number>>;
}

export interface Question {
  id: number;
  categoryLabel: string;
  question: string;
  choices: QuestionChoice[];
}

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  trait: TraitType;
}

export const COLOR_OPTIONS: ColorOption[] = [
  { id: 'red', name: '赤', hex: '#ef4444', trait: 'leader' },
  { id: 'blue', name: '青', hex: '#3b82f6', trait: 'analyst' },
  { id: 'green', name: '緑', hex: '#10b981', trait: 'harmonizer' },
  { id: 'orange', name: '橙', hex: '#f59e0b', trait: 'creator' },
  { id: 'yellow', name: '黄', hex: '#eab308', trait: 'idealist' },
  { id: 'purple', name: '紫', hex: '#8b5cf6', trait: 'individual' },
  { id: 'cyan', name: '水色', hex: '#06b6d4', trait: 'supporter' },
  { id: 'white', name: '白', hex: '#f8fafc', trait: 'realist' },
  { id: 'black', name: '黒', hex: '#1e293b', trait: 'individual' },
  { id: 'none', name: '無回答', hex: '#64748b', trait: 'realist' },
];

export const DOMINANT_HAND_OPTIONS = [
  { id: 'right', label: '右手', bonus: { analyst: 1, realist: 1 } },
  { id: 'left', label: '左手', bonus: { creator: 1, individual: 1 } },
  { id: 'both', label: '両利き', bonus: { harmonizer: 1, idealist: 1 } },
];

export const QUESTIONS: Question[] = [
  {
    id: 1,
    categoryLabel: '休日の過ごし方',
    question: '突然休みの予定が空いたとき、どう過ごすことが多い？',
    choices: [
      { id: 'a', text: '友達や知り合いを誘ってお出かけやイベントに行く', traits: { leader: 2, harmonizer: 1 } },
      { id: 'b', text: '一人でカフェや部屋でゆっくり動画を見たり読書する', traits: { analyst: 2, individual: 1 } },
      { id: 'c', text: '趣味や新作づくり、部屋の模様替えに没頭する', traits: { creator: 2, idealist: 1 } },
      { id: 'd', text: '溜まった家事を片付けたり買い出しをして整える', traits: { realist: 2, supporter: 1 } },
    ]
  },
  {
    id: 2,
    categoryLabel: 'グループでの役割',
    question: 'みんなで旅行やごはんに行くとき、自然とどんな役割になりがち？',
    choices: [
      { id: 'a', text: '「ここ行こう！」と行き先や予定を決めるリーダー役', traits: { leader: 2, idealist: 1 } },
      { id: 'b', text: '予約や予算の計算、移動ルートを調べるしっかり者', traits: { analyst: 2, realist: 1 } },
      { id: 'c', text: 'みんなの希望を聞いて調整するまとめ役', traits: { harmonizer: 2, supporter: 1 } },
      { id: 'd', text: 'その場のノリや雰囲気を盛り上げるムードメーカー', traits: { creator: 2, individual: 1 } },
    ]
  },
  {
    id: 3,
    categoryLabel: '悩みの相談',
    question: '仕事や人間関係で悩んだとき、最初にとる行動は？',
    choices: [
      { id: 'a', text: '信頼できる家族や友達にすぐ話を聞いてもらう', traits: { supporter: 2, harmonizer: 1 } },
      { id: 'b', text: '自分でネットや本で検索して解決策を調べる', traits: { analyst: 2, realist: 1 } },
      { id: 'c', text: '時間が解決してくれると信じて一旦好きなことに集中する', traits: { creator: 2, individual: 1 } },
      { id: 'd', text: '「こうすれば突破できる」と自分で決断して速攻で行動する', traits: { leader: 2, idealist: 1 } },
    ]
  },
  {
    id: 4,
    categoryLabel: '買い物のスタイル',
    question: 'ちょっと高めの大きな買い物をするとき、どう決める？',
    choices: [
      { id: 'a', text: '口コミやレビュー、仕様をじっくり比較検討して買う', traits: { analyst: 2, realist: 1 } },
      { id: 'b', text: '直感で「これだ！」と一目惚れしたらすぐに買う', traits: { creator: 2, idealist: 1 } },
      { id: 'c', text: '店員さんや知人のオススメを聞いて参考にして決める', traits: { harmonizer: 2, supporter: 1 } },
      { id: 'd', text: '「これを買ったらモチベが上がる」と自分への投資として即決する', traits: { leader: 2, individual: 1 } },
    ]
  },
  {
    id: 5,
    categoryLabel: 'トラブル対応',
    question: '予定通りにいかないハプニングが起きたらどう反応する？',
    choices: [
      { id: 'a', text: '焦らず原因を確認して、代わりのプランBを冷静に立てる', traits: { analyst: 2, realist: 1 } },
      { id: 'b', text: '「まあなんとかなるでしょ！」と臨機応変に楽しむ', traits: { creator: 2, individual: 1 } },
      { id: 'c', text: '周りの人が困っていないか心配して声をかける', traits: { supporter: 2, harmonizer: 1 } },
      { id: 'd', text: '自分が指示を出して速やかに事態を収束させる', traits: { leader: 2, idealist: 1 } },
    ]
  },
  {
    id: 6,
    categoryLabel: '連絡のペース',
    question: 'LINEやメッセージの返信スタンスはどれに近い？',
    choices: [
      { id: 'a', text: '気づいたらその場ですぐ返信するタイプ', traits: { supporter: 2, leader: 1 } },
      { id: 'b', text: '内容をじっくり考えてから落ち着いて返信するタイプ', traits: { analyst: 2, realist: 1 } },
      { id: 'c', text: 'マイペースで自分の手が空いたときに気まぐれに返すタイプ', traits: { individual: 2, creator: 1 } },
      { id: 'd', text: '相手に合わせたトーンや絵文字で返す気配りタイプ', traits: { harmonizer: 2, supporter: 1 } },
    ]
  },
  {
    id: 7,
    categoryLabel: '褒められたとき',
    question: '人から「すごいね！」と褒められたときの本当の心境は？',
    choices: [
      { id: 'a', text: '素直にすごく嬉しくて「もっと頑張ろう！」と思う', traits: { leader: 2, idealist: 1 } },
      { id: 'b', text: 'ちょっと照れくさくて「そんなことないですよ」と謙遜する', traits: { harmonizer: 2, supporter: 1 } },
      { id: 'c', text: '「具体的にどこが良かったのかな？」と理由を分析したくなる', traits: { analyst: 2, realist: 1 } },
      { id: 'd', text: '自分のこだわりやセンスが認めてもらえて内心ガッツポーズする', traits: { creator: 2, individual: 1 } },
    ]
  },
  {
    id: 8,
    categoryLabel: '人付き合いのスタンス',
    question: '人間関係で大事にしているバランスは？',
    choices: [
      { id: 'a', text: '狭く深く、心から信頼できる人とだけ長く付き合いたい', traits: { individual: 2, analyst: 1 } },
      { id: 'b', text: '広く浅く、いろんなタイプの人と楽しく繋がっていたい', traits: { harmonizer: 2, leader: 1 } },
      { id: 'c', text: '自分を刺激してくれる面白い人や尊敬できる人といたい', traits: { creator: 2, idealist: 1 } },
      { id: 'd', text: 'お互いに困ったとき助け合える誠実な関係が理想', traits: { supporter: 2, realist: 1 } },
    ]
  },
  {
    id: 9,
    categoryLabel: 'モチベーション',
    question: 'どんなときに「一番やる気が出る」？',
    choices: [
      { id: 'a', text: '大きな目標やライバルがいて勝ちに行きたいとき', traits: { leader: 2, idealist: 1 } },
      { id: 'b', text: '誰かに「ありがとう」と喜んでもらえたとき', traits: { supporter: 2, harmonizer: 1 } },
      { id: 'c', text: '自分のアイデアや好きなことを自由に形に出来るとき', traits: { creator: 2, individual: 1 } },
      { id: 'd', text: '成果やメリット、数字が目に見えてわかるとき', traits: { analyst: 2, realist: 1 } },
    ]
  },
  {
    id: 10,
    categoryLabel: 'ストレス発散',
    question: '疲れが溜まったときの一番のリフレッシュ方法は？',
    choices: [
      { id: 'a', text: '美味しいものを食べたりカラオケや運動でスッキリ発散', traits: { leader: 2, creator: 1 } },
      { id: 'b', text: '誰にも邪魔されずひたすら眠るか一人時間を満喫する', traits: { individual: 2, analyst: 1 } },
      { id: 'c', text: '仲の良い友達とおしゃべりして共感しあう', traits: { harmonizer: 2, supporter: 1 } },
      { id: 'd', text: '好きな音楽を聴いたり温泉や自然に行って癒やされる', traits: { idealist: 2, realist: 1 } },
    ]
  },
  {
    id: 11,
    categoryLabel: '自己評価',
    question: '自分の「一番の強み」はどこだと思う？',
    choices: [
      { id: 'a', text: '物事をサクサク進める決断力と行動力', traits: { leader: 2, realist: 1 } },
      { id: 'b', text: '人の気持ちに寄り添える優しさと傾聴力', traits: { supporter: 2, harmonizer: 1 } },
      { id: 'c', text: '冷静に物事を分析してミスを防ぐ観察力', traits: { analyst: 2, individual: 1 } },
      { id: 'd', text: '他の人が思いつかないような独自の発想法', traits: { creator: 2, idealist: 1 } },
    ]
  },
  {
    id: 12,
    categoryLabel: '仕事や作業の進め方',
    question: 'タスクや仕事をこなすとき、どんなスタイルが得意？',
    choices: [
      { id: 'a', text: '最初に全体の計画をきっちり立ててスケジュール通りに進める', traits: { analyst: 2, realist: 1 } },
      { id: 'b', text: '締め切りギリギリに集中して一気にスパートをかける', traits: { creator: 2, individual: 1 } },
      { id: 'c', text: '周りの進捗を見ながら声を掛け合って協力して進める', traits: { harmonizer: 2, supporter: 1 } },
      { id: 'd', text: 'ゴールを決めたら一番効率の良い最短ルートで突っ走る', traits: { leader: 2, idealist: 1 } },
    ]
  },
  {
    id: 13,
    categoryLabel: '意見が食い違ったとき',
    question: '話し合いで自分と他人の意見が分かれたらどうする？',
    choices: [
      { id: 'a', text: '自分の意見の根拠や理由を論理的に説明して説得する', traits: { analyst: 2, leader: 1 } },
      { id: 'b', text: 'お互いのいいところを取り入れた折衷案を探る', traits: { harmonizer: 2, supporter: 1 } },
      { id: 'c', text: '雰囲気が悪くなるくらいなら相手に合わせても構わない', traits: { supporter: 2, harmonizer: 1 } },
      { id: 'd', text: '「そういう考えもあるね」と流しつつ自分の軸は変えない', traits: { individual: 2, creator: 1 } },
    ]
  },
  {
    id: 14,
    categoryLabel: '新しいことへの挑戦',
    question: 'やったことのない新しい環境や課題に飛び込むときは？',
    choices: [
      { id: 'a', text: '不安よりもワクワク感の方が強くて飛び込んでみる', traits: { leader: 2, idealist: 1 } },
      { id: 'b', text: 'どんなリスクがあるかあらかじめ調べて準備してから挑む', traits: { analyst: 2, realist: 1 } },
      { id: 'c', text: '一緒に行く仲間やサポートしてくれる人がいれば安心できる', traits: { supporter: 2, harmonizer: 1 } },
      { id: 'd', text: '自分のペースで試行錯誤しながらマイペースに楽しむ', traits: { creator: 2, individual: 1 } },
    ]
  },
  {
    id: 15,
    categoryLabel: '理想の生き方',
    question: 'あなたが人生で一番大切にしたいキーワードは？',
    choices: [
      { id: 'a', text: '自由（何事にも縛られず自分らしく生きる）', traits: { individual: 2, creator: 1 } },
      { id: 'b', text: '安心（平穏で安全な生活と信頼できる人間関係）', traits: { realist: 2, supporter: 1 } },
      { id: 'c', text: '成長（新しい能力や実績を身につけ成果を出す）', traits: { leader: 2, analyst: 1 } },
      { id: 'd', text: '調和（周囲の人と笑顔で助け合って過ごす）', traits: { harmonizer: 2, idealist: 1 } },
    ]
  },
  {
    id: 16,
    categoryLabel: '他人の評価',
    question: '周りから「どんな人」と言われることが多い？',
    choices: [
      { id: 'a', text: '「しっかりしていて頼りになるね」', traits: { leader: 2, analyst: 1 } },
      { id: 'b', text: '「話しやすくて優しいね」', traits: { supporter: 2, harmonizer: 1 } },
      { id: 'c', text: '「個性的で面白い発想をするね」', traits: { creator: 2, individual: 1 } },
      { id: 'd', text: '「いつも落ち着いていて大人っぽいね」', traits: { analyst: 2, realist: 1 } },
    ]
  },
  {
    id: 17,
    categoryLabel: '約束の時間',
    question: '人との待ち合わせのとき、あなたの到着タイミングは？',
    choices: [
      { id: 'a', text: '10分以上前には着いて余裕を持って待っている', traits: { realist: 2, analyst: 1 } },
      { id: 'b', text: 'ピッタリちょうどか数分前に到着する', traits: { supporter: 2, harmonizer: 1 } },
      { id: 'c', text: '直前まで別のことをしていて時々ギリギリになる', traits: { creator: 2, individual: 1 } },
      { id: 'd', text: '待ち合わせ場所の近くで早めに別の作業や買い物をしている', traits: { leader: 2, idealist: 1 } },
    ]
  },
  {
    id: 18,
    categoryLabel: '落ち込んだとき',
    question: '失敗をして落ち込んだときの立ち直り方は？',
    choices: [
      { id: 'a', text: '何がダメだったのか原因を分析して反省材料にする', traits: { analyst: 2, realist: 1 } },
      { id: 'b', text: '「次は絶対成功させる」と糧にしてポジティブに切り替える', traits: { leader: 2, idealist: 1 } },
      { id: 'c', text: '好きな動画や趣味に没頭して忘れようとする', traits: { creator: 2, individual: 1 } },
      { id: 'd', text: '友達やパートナーに話を聞いてもらって共感してもらう', traits: { supporter: 2, harmonizer: 1 } },
    ]
  },
  {
    id: 19,
    categoryLabel: '部屋やデスクの状態',
    question: 'あなたの身の回りの整理整頓の状況はどれに近い？',
    choices: [
      { id: 'a', text: '定位置が決まっていていつも綺麗に片付いている', traits: { analyst: 2, realist: 1 } },
      { id: 'b', text: '一見散らかって見えても自分の中ではどこに何があるかわかる', traits: { creator: 2, individual: 1 } },
      { id: 'c', text: '人が来るときや気になったときにまとめて一気に片付ける', traits: { harmonizer: 2, leader: 1 } },
      { id: 'd', text: '使いやすさ優先で実用的な配置になっている', traits: { realist: 2, supporter: 1 } },
    ]
  },
  {
    id: 20,
    categoryLabel: '恋愛やパートナーシップ',
    question: 'パートナーに一番求めるものは？',
    choices: [
      { id: 'a', text: '一緒にいて包み込んでくれるような安心感と優しさ', traits: { supporter: 2, harmonizer: 1 } },
      { id: 'b', text: 'お互いの1人の時間や価値観を尊重できる自立心', traits: { individual: 2, analyst: 1 } },
      { id: 'c', text: '一緒にいろんな体験をして高め合える刺激や成長', traits: { leader: 2, idealist: 1 } },
      { id: 'd', text: '冗談を言い合えたり価値観がピッタリ合う楽しさ', traits: { creator: 2, harmonizer: 1 } },
    ]
  },
  {
    id: 21,
    categoryLabel: 'SNSや情報の接し方',
    question: 'SNSやニュースを見ているとき、どう行動しがち？',
    choices: [
      { id: 'a', text: '役立つ知識や気になった記事を積極的に保存・収集する', traits: { analyst: 2, realist: 1 } },
      { id: 'b', text: '友達の投稿に「いいね」やコメントをして反応する', traits: { harmonizer: 2, supporter: 1 } },
      { id: 'c', text: '自分の好きなことや作品、つぶやきを発信する', traits: { creator: 2, individual: 1 } },
      { id: 'd', text: '世の中のトレンドや最新情報をいち早くチェックする', traits: { leader: 2, idealist: 1 } },
    ]
  },
  {
    id: 22,
    categoryLabel: '目標の立て方',
    question: '何か新しい目標を立てるときはどうする？',
    choices: [
      { id: 'a', text: '具体的な数値や日付を決めて計画をしっかり作る', traits: { analyst: 2, realist: 1 } },
      { id: 'b', text: '「こうなれたら最高だな」というワクワクするビジョンを描く', traits: { idealist: 2, leader: 1 } },
      { id: 'c', text: 'あまりガチガチに決めず、その時の気分で進める', traits: { individual: 2, creator: 1 } },
      { id: 'd', text: '周りの人にも宣言して達成せざるを得ない環境を作る', traits: { leader: 2, supporter: 1 } },
    ]
  },
  {
    id: 23,
    categoryLabel: '集団での発言',
    question: '会議や打ち合わせで発言をするときはどうする？',
    choices: [
      { id: 'a', text: '自分の考えがまとまったらハッキリ積極的に発言する', traits: { leader: 2, analyst: 1 } },
      { id: 'b', text: '場の空気や他の人の意見を聞いてから発言する', traits: { harmonizer: 2, supporter: 1 } },
      { id: 'c', text: '他の人が言わないような新しい視点や工夫を提案する', traits: { creator: 2, individual: 1 } },
      { id: 'd', text: '必要がない限りはあまり自分からグイグイ発言しない', traits: { realist: 2, individual: 1 } },
    ]
  },
  {
    id: 24,
    categoryLabel: '休日の外食',
    question: 'ごはんを食べに行くお店を選ぶ基準は？',
    choices: [
      { id: 'a', text: '食べログやGoogleの評価・口コミが高い人気店', traits: { analyst: 2, realist: 1 } },
      { id: 'b', text: '一緒に行く人の好みやリクエストを最優先する', traits: { supporter: 2, harmonizer: 1 } },
      { id: 'c', text: 'まだ行ったことがない隠れ家的なお店や話題の新店', traits: { creator: 2, idealist: 1 } },
      { id: 'd', text: 'いつも行きつけのお気に入り安心スポット', traits: { realist: 2, individual: 1 } },
    ]
  },
  {
    id: 25,
    categoryLabel: '将来への意識',
    question: '自分が「将来目指したい姿」に一番近いのは？',
    choices: [
      { id: 'a', text: '周りから信頼され、グループや組織を導く存在', traits: { leader: 2, idealist: 1 } },
      { id: 'b', text: '好きなことに囲まれ、ブレずにマイペースで生きる存在', traits: { individual: 2, creator: 1 } },
      { id: 'c', text: '大切な人たちと笑顔で支え合い、穏やかに暮らす存在', traits: { harmonizer: 2, supporter: 1 } },
      { id: 'd', text: '自分の知識やスキルを高め、専門性を発揮する存在', traits: { analyst: 2, realist: 1 } },
    ]
  }
];
