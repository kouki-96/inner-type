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
  { id: 'black', name: '黒', hex: '#18181b', trait: 'individual' },
  { id: 'none', name: '無回答', hex: '#71717a', trait: 'realist' },
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
    question: '急に予定が空いた休日、どう過ごすことが多い？',
    choices: [
      { id: 'a', text: '友達を誘ってお出かけや買いものに行く', traits: { leader: 2, harmonizer: 1 } },
      { id: 'b', text: '家でゆっくり動画や本を見ながら過ごす', traits: { analyst: 2, individual: 1 } },
      { id: 'c', text: '趣味や創作、気になっていた作業に没頭する', traits: { creator: 2, idealist: 1 } },
      { id: 'd', text: '部屋の片付けや溜まった家事をすっきり済ませる', traits: { realist: 2, supporter: 1 } },
      { id: 'e', text: '急な変更に戸惑い、何をすればいいかわからずダラダラ過してしまう', traits: { individual: 2, realist: 1 } },
    ]
  },
  {
    id: 2,
    categoryLabel: 'グループでの役割',
    question: 'みんなでお出かけするとき、自然とどんな立ち位置になる？',
    choices: [
      { id: 'a', text: '「ここ行こう！」と行先やスケジュールを提案する役割', traits: { leader: 2, idealist: 1 } },
      { id: 'b', text: '予約や移動手段、予算などをしっかり確認する役割', traits: { analyst: 2, realist: 1 } },
      { id: 'c', text: 'みんなの意見を聞きながら、雰囲気を和ませる役割', traits: { harmonizer: 2, supporter: 1 } },
      { id: 'd', text: 'その場のノリを全力で楽しむムードメーカー', traits: { creator: 2, individual: 1 } },
      { id: 'e', text: '浮かないか気になり、基本的に人に任せて目立たないようにする', traits: { supporter: 1, realist: 2 } },
    ]
  },
  {
    id: 3,
    categoryLabel: '悩んだときの対応',
    question: '仕事や人間関係で困ったとき、どう行動することが多い？',
    choices: [
      { id: 'a', text: '親しい友人や家族にすぐ相談して意見を聞く', traits: { supporter: 2, harmonizer: 1 } },
      { id: 'b', text: 'ネットや本でじっくり調べて自分で解決策を探す', traits: { analyst: 2, realist: 1 } },
      { id: 'c', text: '一通り考えたら、好きなことをして一旦気分転換する', traits: { creator: 2, individual: 1 } },
      { id: 'd', text: '「こうすれば突破できる」と自分で決めて即行動する', traits: { leader: 2, idealist: 1 } },
      { id: 'e', text: '悩みすぎて抱え込み、「どうせ自分が悪いのかも」と自己批判に陥る', traits: { analyst: 1, individual: 2 } },
    ]
  },
  {
    id: 4,
    categoryLabel: '買い物のスタイル',
    question: '少し高価な買い物をするとき、決め手になるのは？',
    choices: [
      { id: 'a', text: '口コミや機能、価格を他と比較してから買う', traits: { analyst: 2, realist: 1 } },
      { id: 'b', text: '「これだ！」と一目惚れした直感で決める', traits: { creator: 2, idealist: 1 } },
      { id: 'c', text: '店員さんや知人のオススメを参考にして決める', traits: { harmonizer: 2, supporter: 1 } },
      { id: 'd', text: '自分の目標達成やモチベアップのために即決する', traits: { leader: 2, individual: 1 } },
      { id: 'e', text: '「あとで後悔するかも…」と不安でなかなか決断できず見送る', traits: { realist: 2, analyst: 1 } },
    ]
  },
  {
    id: 5,
    categoryLabel: 'トラブルへの対応',
    question: '予定外のハプニングが起きたら、どう対応する？',
    choices: [
      { id: 'a', text: '落ち着いて原因を確かめ、別のプランを立てる', traits: { analyst: 2, realist: 1 } },
      { id: 'b', text: '「なんとかなる！」と臨機応変に切り替える', traits: { creator: 2, individual: 1 } },
      { id: 'c', text: '困っている人がいないか周りに気を配る', traits: { supporter: 2, harmonizer: 1 } },
      { id: 'd', text: '自分が中心になってテキパキ指示を出して収める', traits: { leader: 2, idealist: 1 } },
      { id: 'e', text: '強い焦りを感じ、「どうしてこうなるの…」とネガティブに落ち込む', traits: { realist: 1, individual: 2 } },
    ]
  },
  {
    id: 6,
    categoryLabel: '連絡のペース',
    question: 'メッセージやLINEの返信スタンスはどれに近い？',
    choices: [
      { id: 'a', text: '気づいたらその場ですぐ返す', traits: { supporter: 2, leader: 1 } },
      { id: 'b', text: '文章をきちんと考えてから落ち着いて返す', traits: { analyst: 2, realist: 1 } },
      { id: 'c', text: '自分のペースで時間がある時に気まぐれで返す', traits: { individual: 2, creator: 1 } },
      { id: 'd', text: '相手のトーンや雰囲気に合わせて心地よく返す', traits: { harmonizer: 2, supporter: 1 } },
      { id: 'e', text: '「変な意味に取られたら…」と考えすぎて返信にすごく時間がかかる', traits: { analyst: 1, harmonizer: 2 } },
    ]
  },
  {
    id: 7,
    categoryLabel: '褒められたとき',
    question: '人から「すごいね！」と褒められたとき、心の中ではどう思う？',
    choices: [
      { id: 'a', text: '素直に嬉しくて「もっと頑張ろう！」とテンションが上がる', traits: { leader: 2, idealist: 1 } },
      { id: 'b', text: 'ちょっと照れくさくて「自分なんてまだまだ」と遠慮する', traits: { harmonizer: 2, supporter: 1 } },
      { id: 'c', text: '「具体的にどこが良かったのかな？」と理由を考える', traits: { analyst: 2, realist: 1 } },
      { id: 'd', text: '自分のこだわりが伝わったと感じて嬉しくなる', traits: { creator: 2, individual: 1 } },
      { id: 'e', text: '「お世辞かも…」「次は期待を裏切るかも」とプレッシャーを感じる', traits: { analyst: 1, individual: 2 } },
    ]
  },
  {
    id: 8,
    categoryLabel: '人間関係のスタンス',
    question: '人間関係で一番心地いいと感じる距離感は？',
    choices: [
      { id: 'a', text: '心から信頼できるごく少数の人と深く付き合いたい', traits: { individual: 2, analyst: 1 } },
      { id: 'b', text: 'いろんなタイプの人と広く浅く楽しくつながりたい', traits: { harmonizer: 2, leader: 1 } },
      { id: 'c', text: 'お互いの刺激になる面白くて個性的な人といたい', traits: { creator: 2, idealist: 1 } },
      { id: 'd', text: '困ったときに助け合える誠実な関係を築きたい', traits: { supporter: 2, realist: 1 } },
      { id: 'e', text: '人に気を使いすぎて疲れるので、なるべく干渉されないひとり空間がほしい', traits: { individual: 2, realist: 1 } },
    ]
  },
  {
    id: 9,
    categoryLabel: 'モチベーション',
    question: '一番「やる気」スイッチが入るのはどんなとき？',
    choices: [
      { id: 'a', text: '自分の力で何かを達成したい目標があるとき', traits: { leader: 2, idealist: 1 } },
      { id: 'b', text: '誰かに「助かった、ありがとう」と感謝されたとき', traits: { supporter: 2, harmonizer: 1 } },
      { id: 'c', text: '自分のアイデアや好きなことを自由に作れるとき', traits: { creator: 2, individual: 1 } },
      { id: 'd', text: 'やるべきことや数字の成果がハッキリ見えているとき', traits: { analyst: 2, realist: 1 } },
      { id: 'e', text: '「やらないと不利益が出る」「怒られる」という危機感があるとき', traits: { realist: 2, analyst: 1 } },
    ]
  },
  {
    id: 10,
    categoryLabel: 'リフレッシュ方法',
    question: '疲れたときの一番のリフレッシュ方法は？',
    choices: [
      { id: 'a', text: '美味しいものを食べたり体を動かしてストレス発散する', traits: { leader: 2, creator: 1 } },
      { id: 'b', text: '一人で静かに過ごしたりゲームや本に没頭する', traits: { individual: 2, analyst: 1 } },
      { id: 'c', text: '仲の良い友達とおしゃべりして共感しあう', traits: { harmonizer: 2, supporter: 1 } },
      { id: 'd', text: '好きな音楽を聴いたり自然の場所に行って癒やされる', traits: { idealist: 2, realist: 1 } },
      { id: 'e', text: '何もする気力が湧かず、ただベッドに包まって愚痴や溜め息をつく', traits: { individual: 2, realist: 1 } },
    ]
  },
  {
    id: 11,
    categoryLabel: '自分の長所',
    question: '自分の「得意なところ」を強いて言うならどれ？',
    choices: [
      { id: 'a', text: '物事をサクサク進める決断力と実行力', traits: { leader: 2, realist: 1 } },
      { id: 'b', text: '相手の気持ちに寄り添える優しさと傾聴力', traits: { supporter: 2, harmonizer: 1 } },
      { id: 'c', text: '冷静に状況を分析してミスを防ぐ観察力', traits: { analyst: 2, individual: 1 } },
      { id: 'd', text: '他の人が思いつかないようなユニークなアイデア力', traits: { creator: 2, idealist: 1 } },
      { id: 'e', text: 'リスクや危険、最悪のシナリオを事前に察知して警戒する慎重さ', traits: { realist: 2, analyst: 1 } },
    ]
  },
  {
    id: 12,
    categoryLabel: '仕事や作業の進め方',
    question: 'タスクや作業を進めるとき、自分に合っているスタイルは？',
    choices: [
      { id: 'a', text: '最初にスケジュールをしっかり立てて順番通りに進める', traits: { analyst: 2, realist: 1 } },
      { id: 'b', text: '締め切り間際に集中力を高めて一気に片付ける', traits: { creator: 2, individual: 1 } },
      { id: 'c', text: '周りの進捗を見ながら協力して進める', traits: { harmonizer: 2, supporter: 1 } },
      { id: 'd', text: '最短でゴールにたどりつける効率の良い方法を選ぶ', traits: { leader: 2, idealist: 1 } },
      { id: 'e', text: '「失敗したらどうしよう」と慎重になりすぎて着手が遅れがちになる', traits: { analyst: 1, realist: 2 } },
    ]
  },
  {
    id: 13,
    categoryLabel: '意見の食い違い',
    question: '話し合いで自分の考えと他人の意見が分かれたら？',
    choices: [
      { id: 'a', text: '自分の考えの理由やメリットを論理的に説明する', traits: { analyst: 2, leader: 1 } },
      { id: 'b', text: 'お互いのいいところを取り入れた折衷案を探す', traits: { harmonizer: 2, supporter: 1 } },
      { id: 'c', text: 'ギスギスするくらいなら相手の意見に合わせる', traits: { supporter: 2, harmonizer: 1 } },
      { id: 'd', text: '「それもあるね」と受け流しつつ自分の方針は変えない', traits: { individual: 2, creator: 1 } },
      { id: 'e', text: '衝突が怖くて言い出せず、「どうせ言っても無駄」と意見を飲み込む', traits: { harmonizer: 1, individual: 2 } },
    ]
  },
  {
    id: 14,
    categoryLabel: '新しい挑戦',
    question: '未経験のことや新しい環境にチャレンジするときは？',
    choices: [
      { id: 'a', text: '不安よりもワクワク感が勝って思い切って飛び込む', traits: { leader: 2, idealist: 1 } },
      { id: 'b', text: 'リスクや準備項目を調べてから慎重に挑む', traits: { analyst: 2, realist: 1 } },
      { id: 'c', text: '頼れる仲間やサポートしてくれる人がいれば安心できる', traits: { supporter: 2, harmonizer: 1 } },
      { id: 'd', text: '無理のない範囲で自分のペースで試してみる', traits: { creator: 2, individual: 1 } },
      { id: 'e', text: '変化や失敗が怖くてできれば現状維持で避けたいと思う', traits: { realist: 2, individual: 1 } },
    ]
  },
  {
    id: 15,
    categoryLabel: '価値観',
    question: '日常の中で大切にしたいテーマはどれに近い？',
    choices: [
      { id: 'a', text: '自由（周りに縛られず自分らしくいること）', traits: { individual: 2, creator: 1 } },
      { id: 'b', text: '安心（平穏で安全な生活と信頼関係）', traits: { realist: 2, supporter: 1 } },
      { id: 'c', text: '成長（新しい成果や能力を伸ばすこと）', traits: { leader: 2, analyst: 1 } },
      { id: 'd', text: '調和（みんなで笑顔で助け合って過ごすこと）', traits: { harmonizer: 2, idealist: 1 } },
      { id: 'e', text: '無難（波風を立てず、傷ついたり損をしないこと）', traits: { realist: 2, harmonizer: 1 } },
    ]
  },
  {
    id: 16,
    categoryLabel: '周囲からの評価',
    question: '周りの人から言われることが多い言葉は？',
    choices: [
      { id: 'a', text: '「しっかりしていて頼りになるね」', traits: { leader: 2, analyst: 1 } },
      { id: 'b', text: '「話しやすくて優しいね」', traits: { supporter: 2, harmonizer: 1 } },
      { id: 'c', text: '「個性的で面白い視点を持っているね」', traits: { creator: 2, individual: 1 } },
      { id: 'd', text: '「いつも冷静で落ち着いているね」', traits: { analyst: 2, realist: 1 } },
      { id: 'e', text: '「心配性で考えすぎちゃうところがあるね」', traits: { analyst: 1, realist: 2 } },
    ]
  },
  {
    id: 17,
    categoryLabel: '約束の時間',
    question: '待ち合わせの時、到着するタイミングはどれが多い？',
    choices: [
      { id: 'a', text: '10分以上前には着いて余裕を持って待つ', traits: { realist: 2, analyst: 1 } },
      { id: 'b', text: 'ちょうど良い時間や数分前に着く', traits: { supporter: 2, harmonizer: 1 } },
      { id: 'c', text: '他のことをしていて時々ギリギリになる', traits: { creator: 2, individual: 1 } },
      { id: 'd', text: '早めに行って近くで用事を済ませながら待つ', traits: { leader: 2, idealist: 1 } },
      { id: 'e', text: '「遅刻したらどうしよう」と不安で極端に早く着いてしまう', traits: { realist: 2, analyst: 1 } },
    ]
  },
  {
    id: 18,
    categoryLabel: '失敗したとき',
    question: '何か失敗して落ち込んだとき、どう立ち直る？',
    choices: [
      { id: 'a', text: '何が悪かったか原因を分析して次に活かす', traits: { analyst: 2, realist: 1 } },
      { id: 'b', text: '「次は絶対成功させる！」と前向きに切り替える', traits: { leader: 2, idealist: 1 } },
      { id: 'c', text: '好きなことに没頭して一旦頭を空っぽにする', traits: { creator: 2, individual: 1 } },
      { id: 'd', text: '親しい人に気持ちを聞いてもらって共感してもらう', traits: { supporter: 2, harmonizer: 1 } },
      { id: 'e', text: 'しばらく自責の念を引きずり、「自分はダメだ」と落ち込み続ける', traits: { individual: 2, analyst: 1 } },
    ]
  },
  {
    id: 19,
    categoryLabel: '身の回りの整理',
    question: 'デスクや部屋の整理整頓はどんな状態？',
    choices: [
      { id: 'a', text: '物の定位置が決まっていて、いつも片付いている', traits: { analyst: 2, realist: 1 } },
      { id: 'b', text: '一見散らかって見えても、自分の中ではどこにあるかわかる', traits: { creator: 2, individual: 1 } },
      { id: 'c', text: '気になったときや来客のときにまとめて片付ける', traits: { harmonizer: 2, leader: 1 } },
      { id: 'd', text: '使いやすさ優先で実用的に配置されている', traits: { realist: 2, supporter: 1 } },
      { id: 'e', text: '片付けるのが面倒・億劫で、散らかっていても見ないフリをしている', traits: { individual: 2, realist: 1 } },
    ]
  },
  {
    id: 20,
    categoryLabel: 'パートナーシップ',
    question: '恋人や親しいパートナーに一番求めるものは？',
    choices: [
      { id: 'a', text: '包み込んでくれるような安心感と優しさ', traits: { supporter: 2, harmonizer: 1 } },
      { id: 'b', text: 'お互いの1人の時間や趣味を尊重できる自立心', traits: { individual: 2, analyst: 1 } },
      { id: 'c', text: '一緒にいろんな体験をして高め合える成長や刺激', traits: { leader: 2, idealist: 1 } },
      { id: 'd', text: '笑い合えたり価値観がピッタリ合う楽しさ', traits: { creator: 2, harmonizer: 1 } },
      { id: 'e', text: '否定されたり見捨てられたりしない絶対的な安全と包容力', traits: { supporter: 1, realist: 2 } },
    ]
  },
  {
    id: 21,
    categoryLabel: '情報の接し方',
    question: 'SNSやニュースを見ているときの行動パターンは？',
    choices: [
      { id: 'a', text: '役立つ知識や気になる情報を積極的に収集・保存する', traits: { analyst: 2, realist: 1 } },
      { id: 'b', text: '友達の投稿にリアクションやコメントをする', traits: { harmonizer: 2, supporter: 1 } },
      { id: 'c', text: '自分の好きなことや気になったことを投稿する', traits: { creator: 2, individual: 1 } },
      { id: 'd', text: '世の中の最新トレンドや話題を素早くチェックする', traits: { leader: 2, idealist: 1 } },
      { id: 'e', text: '周りと比較して落ち込んだり批判が怖くて、基本閲覧のみで静観する', traits: { analyst: 1, individual: 2 } },
    ]
  },
  {
    id: 22,
    categoryLabel: '目標の立て方',
    question: '目標ややりたいことを決めるときはどうする？',
    choices: [
      { id: 'a', text: '具体的な数字や期限を決めて計画を作る', traits: { analyst: 2, realist: 1 } },
      { id: 'b', text: '「こうなったら良いな」という理想のイメージを描く', traits: { idealist: 2, leader: 1 } },
      { id: 'c', text: 'ガチガチに決めず、その時の気分で進める', traits: { individual: 2, creator: 1 } },
      { id: 'd', text: '周りの人に宣言して達成しやすい環境を作る', traits: { leader: 2, supporter: 1 } },
      { id: 'e', text: '達成できなかった時の挫折が怖いので、大きな目標はあえて立てない', traits: { realist: 2, individual: 1 } },
    ]
  },
  {
    id: 23,
    categoryLabel: '話し合いでの発言',
    question: '会議や大勢での話し合いでのスタンスは？',
    choices: [
      { id: 'a', text: '考えがまとまったらハッキリ自分の意見を伝える', traits: { leader: 2, analyst: 1 } },
      { id: 'b', text: '全体の空気や他の人の発言を聞いてから話す', traits: { harmonizer: 2, supporter: 1 } },
      { id: 'c', text: '他の人があまり言わないような視点や提案をしてみる', traits: { creator: 2, individual: 1 } },
      { id: 'd', text: '必要がない限りは自分から無理に発言しない', traits: { realist: 2, individual: 1 } },
      { id: 'e', text: '変な発言をして浮くのが嫌で、地味に深くうなずいている', traits: { harmonizer: 1, realist: 2 } },
    ]
  },
  {
    id: 24,
    categoryLabel: 'お店選び',
    question: '外食するお店を選ぶときの基準は？',
    choices: [
      { id: 'a', text: '評価や口コミ、メニューの内容を確認したお店', traits: { analyst: 2, realist: 1 } },
      { id: 'b', text: '一緒に行く人の好みやリクエストを最優先', traits: { supporter: 2, harmonizer: 1 } },
      { id: 'c', text: '行ったことがない話題の新店や面白いお店', traits: { creator: 2, idealist: 1 } },
      { id: 'd', text: 'いつも美味しくて失敗のないお気に入り店', traits: { realist: 2, individual: 1 } },
      { id: 'e', text: '失敗したり不快な思いをしたくないので、定番で有名な店を選ぶ', traits: { realist: 2, analyst: 1 } },
    ]
  },
  {
    id: 25,
    categoryLabel: '将来のイメージ',
    question: '自分が「目指したい姿」に一番近いものは？',
    choices: [
      { id: 'a', text: '周りから頼りにされ、人を導いていける存在', traits: { leader: 2, idealist: 1 } },
      { id: 'b', text: 'ブレずにマイペースで自分の好きを極める存在', traits: { individual: 2, creator: 1 } },
      { id: 'c', text: '大切な人たちと温かい信頼で支え合う存在', traits: { harmonizer: 2, supporter: 1 } },
      { id: 'd', text: '専門知識や実務スキルを高めて成果を出す存在', traits: { analyst: 2, realist: 1 } },
      { id: 'e', text: '大きなリスクを抱えず、心穏やかに自分と身内を守れる存在', traits: { realist: 2, harmonizer: 1 } },
    ]
  }
];
