import { TraitType } from './questions';

export interface PersonalityStatus {
  logic: number;       // 論理的思考
  action: number;      // 行動性・推進力
  empathy: number;     // 協調・共感力
  creativity: number;  // 創造性・独自性
  stability: number;   // 安定・メンタル
}

export interface CharacterAvatar {
  type: string;
  avatarBg: string;
  avatarIcon: string;
  accentGradient: string;
  badgeTitle: string;
  rarityStars: number;
}

export interface PersonalityResult {
  id: string;
  name: string;
  categoryTag: string;
  tagline: string;
  primaryTrait: TraitType;
  secondaryTrait: TraitType;
  themeColor: string;
  gradientBg: string;
  avatar: CharacterAvatar;
  status: PersonalityStatus;
  description: {
    overview: string;
    strengths: string;
    weaknesses: string;      // 注意点・陥りやすい穴
    relationship: string;    // 対人・コミュニケーション
    loveAndMarriage: string; // 恋愛・パートナーシップ傾向
    workStyle: string;       // 仕事・適職・働き方スタイル
    advice: string;          // アクションアドバイス
  };
  affinity: {
    bestPartnerName: string;
    bestPartnerCategory: string;
    bestPartnerReason: string;
    bestPartnerAdvice: string;
    synergyPartnerName: string;
    synergyPartnerCategory: string;
    synergyPartnerReason: string;
    challengePartnerName: string;
    challengePartnerCategory: string;
    challengeReason: string;
    challengeAdvice: string;
  };
  symbolEmoji: string;
}

export const PERSONALITY_TYPES: Record<string, PersonalityResult> = {
  passion_leader: {
    id: 'passion_leader',
    name: '情熱のリーダー',
    categoryTag: '行動派・推進型',
    tagline: '高い目標に向かって周囲を引っ張り、自ら真っ先に突き進む行動派',
    primaryTrait: 'leader',
    secondaryTrait: 'idealist',
    themeColor: '#ef4444',
    gradientBg: 'from-rose-900/70 via-red-950/80 to-slate-950',
    avatar: {
      type: 'fire_lion',
      avatarBg: 'bg-gradient-to-tr from-red-600 via-rose-500 to-amber-400',
      avatarIcon: '🦁',
      accentGradient: 'from-red-500 to-amber-400',
      badgeTitle: '熱血の原初獅子',
      rarityStars: 5
    },
    status: { logic: 75, action: 95, empathy: 70, creativity: 80, stability: 85 },
    description: {
      overview: 'あなたは高い目標意識と圧倒的な決断力を兼ね備え、停滞した状況でも自ら進んで打開策を切り拓くバイタリティ溢れるリーダーです。自分の決めたビジョンを堂々と打ち出し、その圧倒的な熱量をもって周囲を自然と前進させます。逆境や土壇場に立たされるほど、本領を発揮するタフネスを持っています。自分の掲げた旗のもとに人々が集まり、新しい時代やプロジェクトを始動させる圧倒的な先陣を切ることができます。',
      strengths: '明確で迅速な決断力と実行力が最大の強みです。トラブルや不測の事態に直面しても立ち止まらず、すぐさま次の一手を決めて自ら手本を見せながら動くことができます。目標に対するまっすぐな情熱は周りの人のモチベーションを著しく引き上げ、チーム全体のエネルギーレベルを最大化する推進力となります。',
      weaknesses: '自分のスピード感や判断基準をそのまま他人に求めてしまい、ペースが遅い人や慎重すぎる人に対してイライラや焦燥感を抱きやすい点に注意が必要です。また、結果を急ぐあまり事前確認や細部のアフターフォローがおろそかになり、後から確認漏れやケアレスミスを招いてしまうことがあります。',
      relationship: '裏表のないストレートでわかりやすいコミュニケーションを好みます。自分と同じように高い目的意識を持つ相手と切磋琢磨して高め合うか、自分の前進を理解してしっかりと足元や事務作業を支えてくれる誠実な人物と長期的に強固な信頼関係を構築できます。',
      loveAndMarriage: '恋愛においても自分からアプローチする情熱的で主導権を握るスタイルです。相手を引っ張りながら楽しい思い出を作っていくことを好みます。互いの夢を応援し合える自立したパートナーや、自分の忙しさを大らかな優しさで包み込んでくれるおだやかなパートナーと末永い関係を結べます。',
      workStyle: '目標が明確で自ら決定権を持って指揮を執れる裁量の大きい職場や、立ち上げ期のスタートアップ、営業・事業開発・経営・チームリーダーといったポジションで最大の成果を出します。ルーティンワークよりも変化に富んだ環境で輝きます。',
      advice: '自分が走るスピードを時には少し緩め、仲間がついてきているか振り返る余裕を持ちましょう。「全員が自分と同じ体力や決断スピードで動けるわけではない」と心に留めることが、より大きなチームの成果と深い信頼につながります。'
    },
    affinity: {
      bestPartnerName: '温厚なサポーター',
      bestPartnerCategory: '献身派・支援型',
      bestPartnerReason: '勢いだけで前進しがちなあなたに対し、完璧な確認作業と丁寧なフォローで足元を固めてくれる最高の相棒です。あなたが外で戦って疲れたときも、否定せず温かく包み込んでくれる深い安心感を提供してくれます。お互いの役割分担が明確で、感謝を言葉にし合える関係です。',
      bestPartnerAdvice: '相手の献身的な気配りを当たり前と思わず、「いつも支えてくれてありがとう」と言葉で伝え続けることで、揺るぎない最高のパートナーシップが持続します。',
      synergyPartnerName: '理想を描くビジョナリー',
      synergyPartnerCategory: '未来派・構想型',
      synergyPartnerReason: 'ビジョナリーが描くスケールの大きい構想を、あなたの圧倒的な行動力で現実化できる強力なタッグです。未来の夢を語り合いながら二人三脚で世界を広げていけます。',
      challengePartnerName: '冷静なアナリスト',
      challengePartnerCategory: '思考派・分析型',
      challengeReason: '直感とスピードで動くあなたに対し、データや根拠を求めて慎重なアプローチをとるため、「決断が遅い」「水を差された」と焦れったさを感じやすい相手です。価値観の優先順位が真逆なため、感情的になると平行線をたどります。',
      challengeAdvice: 'アナリストの細かい懸念点はあなたを邪魔するためではなく、事故を防ぐ命綱です。相手のデータ分析を「前進するための補強材」として素直に取り入れることで無敵の布陣となります。'
    },
    symbolEmoji: '🦁'
  },
  logical_analyst: {
    id: 'logical_analyst',
    name: '冷静なアナリスト',
    categoryTag: '思考派・分析型',
    tagline: '客観的な視点とデータで本質を見抜き、最適な答えを導き出す頭脳派',
    primaryTrait: 'analyst',
    secondaryTrait: 'realist',
    themeColor: '#3b82f6',
    gradientBg: 'from-blue-900/70 via-indigo-950/80 to-slate-950',
    avatar: {
      type: 'blue_falcon',
      avatarBg: 'bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400',
      avatarIcon: '🦅',
      accentGradient: 'from-blue-500 to-cyan-400',
      badgeTitle: '天空の深遠鷹',
      rarityStars: 5
    },
    status: { logic: 98, action: 70, empathy: 60, creativity: 75, stability: 90 },
    description: {
      overview: 'あなたはその場の感情や曖昧な噂話に流されることなく、事実・データ・論理的思考に基づいて冷静に物事を評価できる確かな分析力の持ち主です。混乱した現場や複雑な問題が発生しても一切感情的にならず、全体像と根本原因を客観的に見抜いて、最も無駄がなく再現性の高い解決ルートを提示します。静かな洞察力で信頼を得る知性派です。',
      strengths: '圧倒的な観察力と論理的思考力が強みです。雑多で複雑な情報の中から本質的な法則や課題を見つけ出し、説得力のある構造化されたデータや分析を提示できます。予期せぬトラブルにもパニックにならず、原因を速やかに特定して冷静に対処する圧倒的頼もしさがあります。',
      weaknesses: '正しい論理やデータを重視するあまり、相手の感情や「言葉にできない情理」への配慮を無意識に削ぎ落としてしまい、冷たい印象を与えてしまう点に注意が必要です。人間関係や組織においては論理だけでなく共感や感情への配慮も重要な潤滑油となります。',
      relationship: '無意味な噂話や無駄な感情的摩擦を避けて、お互いのプライベートと価値観を尊重できる知的なコミュニケーションを好みます。信頼した相手には無口ながらも非常に誠実で一貫した対応をとります。',
      loveAndMarriage: '恋愛においても一時の感情に流されず、相手の誠実さや生活の安定感、価値観の一致を重視する落ち着いたスタイルです。華やかなサプライズよりも、日々の約束を守り安定した知的な時間を共有できるパートナーと末永い愛を育みます。',
      workStyle: 'データ分析・システム設計・戦略コンサルティング・研究開発・財務会計など、専門的な知性と客観的な判断力が問われる分野で無敵の才能を発揮します。',
      advice: '正論だけでは人が動かないことも多いと知りましょう。「論理的に正しいかどうか」だけでなく「相手がどう受け取るか」に少しだけ共感の言葉を加えるだけで、周りとの摩擦が劇的に減ります。'
    },
    affinity: {
      bestPartnerName: 'ひらめきのクリエイター',
      bestPartnerCategory: '感性派・創造型',
      bestPartnerReason: '論理的思考に固まりがちなあなたの脳に刺激的なインスピレーションを与えてくれる最高の相棒です。クリエイターの斬新なアイデアを、あなたが現実的な数値や計画へ落とし込むことで理想的な共同作業が生まれます。',
      bestPartnerAdvice: 'クリエイターの気まぐれさや感覚的な表現を批判せず、「面白い視点だね」と一度受け止めた上で論理的な補強をしてあげると強い信頼が生まれます。',
      synergyPartnerName: '堅実なプロフェッショナル',
      synergyPartnerCategory: '実行派・定着型',
      synergyPartnerReason: 'お互いにデータと手順を重んじるため、ストレスなく高精度な仕事を分担できます。確実でミスがない最強の実務ペアを作れます。',
      challengePartnerName: '情熱のリーダー',
      challengePartnerCategory: '行動派・推進型',
      challengeReason: '根拠や分析を重視するあなたに対し、直感とノリで突進する相手のためペースを乱されやすいです。「理由を言わない行動」に対して不信感やイライラを感じやすい傾向があります。',
      challengeAdvice: '相手の勢いは状況を爆発的に前に進めるパワーです。批判するのではなく「その方針で失敗しないためのリスクヘッジ案」を冷静に提示すると、最高の参謀として重宝されます。'
    },
    symbolEmoji: '🦅'
  },
  gentle_harmonizer: {
    id: 'gentle_harmonizer',
    name: '温和なハーモナイザー',
    categoryTag: '配慮派・調和型',
    tagline: '周りの心地よさを一番に考え、穏やかな安心感を与える平和主義者',
    primaryTrait: 'harmonizer',
    secondaryTrait: 'supporter',
    themeColor: '#10b981',
    gradientBg: 'from-emerald-900/70 via-teal-950/80 to-slate-950',
    avatar: {
      type: 'emerald_deer',
      avatarBg: 'bg-gradient-to-tr from-emerald-600 via-teal-500 to-green-300',
      avatarIcon: '🦌',
      accentGradient: 'from-emerald-500 to-teal-300',
      badgeTitle: '聖霊の翠鹿',
      rarityStars: 5
    },
    status: { logic: 65, action: 65, empathy: 98, creativity: 70, stability: 85 },
    description: {
      overview: 'あなたは誰に対しても温かく親しみやすい態度で接し、場の雰囲気や人間関係を柔らかく和ませる高い対人スキルを持った人物です。他人の顔色の変化や言葉にならない小さなSOSにすぐ気づく優しさがあり、意見が対立したときも角を立てずに穏やかな着地点を見つけるクッション的存在です。',
      strengths: '深い共感力と親身になって聴く傾聴力、相手の隠れた美点を見つけて肯定する優しさが最大の強みです。誰もが安心できる居場所を作り出します。',
      weaknesses: '自分の本音や嫌だという気持ちを抑え込んで相手に合わせすぎてしまい、ストレスや疲労を一人で溜め込んでしまう傾向があります。',
      relationship: 'お互いに感謝と思いやりを素直に伝え合える誠実な相手と時間をかけて固い絆を深めていきます。',
      loveAndMarriage: 'お互いを尊重し合い、穏やかな休日を一緒に過ごせる平和で信頼に満ちた結婚生活を築くことができます。',
      workStyle: 'チームの雰囲気を良くするカスタマーサポート・人事・教育・カウンセリングで大きな能力を発揮します。',
      advice: '周りへの配慮と同じくらい、自分自身の「嫌だ」「こうしたい」という心の声に耳を傾けてあげてください。'
    },
    affinity: {
      bestPartnerName: '堅実なプロフェッショナル',
      bestPartnerCategory: '実行派・定着型',
      bestPartnerReason: '優しすぎて迷いが生じやすいあなたに対し、ブレない強い軸と現実的な判断力で守り導いてくれる心強いパートナーです。あなたが安心できる生活基盤をプロフェッショナルがしっかり作り上げてくれます。',
      bestPartnerAdvice: '相手の不器用な優しさを察し、日々のちょっとしたお世話や家事・サポートで感謝を行動で返すと、相思相愛の穏やかな関係が続きます。',
      synergyPartnerName: '温厚なサポーター',
      synergyPartnerCategory: '献身派・支援型',
      synergyPartnerReason: 'お互いに相手の心地よさを優先する優しさの持ち主同士。争いごとが一切発生せず、平和で心の安らぐ最高の癒やし空間を作れます。',
      challengePartnerName: 'マイペースなスペシャリスト',
      challengePartnerCategory: '独立派・探求型',
      challengeReason: '自分の世界に没頭して反応が薄いスペシャリストに対し、「怒っているのかな？」「拒絶されたのかな？」と気疲れしやすい相性です。会話の少なさに不安を感じがちです。',
      challengeAdvice: '相手が口数が少ないのは嫌いだからではなく集中しているだけです。無理に会話を求めず「自分の時間」を楽しむことで、お互い自由で快適な距離感が掴めます。'
    },
    symbolEmoji: '🦌'
  },
  free_creator: {
    id: 'free_creator',
    name: 'ひらめきのクリエイター',
    categoryTag: '感性派・創造型',
    tagline: '常識にとらわれない柔軟な感性で、新しいワクワクを生み出す自由人',
    primaryTrait: 'creator',
    secondaryTrait: 'individual',
    themeColor: '#f59e0b',
    gradientBg: 'from-amber-900/70 via-orange-950/80 to-slate-950',
    avatar: {
      type: 'gold_fox',
      avatarBg: 'bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-400',
      avatarIcon: '🦊',
      accentGradient: 'from-amber-400 to-orange-400',
      badgeTitle: '金狐の閃き',
      rarityStars: 5
    },
    status: { logic: 65, action: 85, empathy: 75, creativity: 98, stability: 65 },
    description: {
      overview: 'あなたは既成概念や前例に縛られることを嫌い、独自の感性と自由な発想で新しい価値を生み出すクリエイティブな心の持ち主です。退屈なルーティン作業よりも、自分の直感や感性が刺激される面白いテーマを追求するときに最大の才能を発揮します。',
      strengths: '豊かな発想力と、即興での素晴らしい応用力が強みです。予想外のトラブルが発生しても「面白い」と楽しみながら前向きに乗り越えます。',
      weaknesses: '気分やモチベーションの波が大きく、計画的な地味な下準備や管理を途中で投げ出してしまう傾向があります。',
      relationship: '束縛や過度な干渉を嫌い、お互いの個性やプライベートな時間を大切にできる風通しの良い関係を好みます。',
      loveAndMarriage: '個性や作品、センスを心から愛し肯定してくれるパートナーに対しては一途で深い愛を注ぎます。',
      workStyle: '企画・デザイン・コンテンツ制作・イベントプロデュースなど、自由度が高い職場で才能を爆発させます。',
      advice: 'アイデアをただ思いついて満足するだけでなく、1つでも最後まで完成させる習慣をつけましょう。'
    },
    affinity: {
      bestPartnerName: '冷静なアナリスト',
      bestPartnerCategory: '思考派・分析型',
      bestPartnerReason: 'あなたがひらめいた突飛なアイデアに対してバカにせず論理的に向き合い、実現に必要な工程や数値計算を完璧にしてくれる最高の理解者です。感覚と論理が結びつくことで夢が実現します。',
      bestPartnerAdvice: 'アナリストから「これだと予算や時間が足りない」と言われても怒らず、代替案を一緒に考えてもらう姿勢を持つと強い絆が生まれます。',
      synergyPartnerName: '探求のチャレンジャー',
      synergyPartnerCategory: '好奇心・冒険型',
      synergyPartnerReason: '互いに新しい体験や面白い刺激が大好きなため、何時間話しても飽きないワクワクに満ちたパートナーになります。',
      challengePartnerName: '緻密なオーガナイザー',
      challengePartnerCategory: '構造派・整備型',
      challengeReason: 'ルールやマニュアル通りの手順を求めてくるオーガナイザーに対し、「型にはめられて息苦しい」と反発しやすい関係です。約束や時間を破って相手を怒らせることもあります。',
      challengeAdvice: '最低限の納期や約束だけは守る姿勢を見せましょう。ルールを守ることで自由な活動領域が広がり、オーガナイザーが強力な味方になってくれます。'
    },
    symbolEmoji: '🦊'
  },
  cautious_realist: {
    id: 'cautious_realist',
    name: '堅実なプロフェッショナル',
    categoryTag: '実行派・定着型',
    tagline: '地に足のついた着実な努力で、確実に成果を積み上げる信頼の要',
    primaryTrait: 'realist',
    secondaryTrait: 'analyst',
    themeColor: '#64748b',
    gradientBg: 'from-slate-800/90 via-slate-900 to-slate-950',
    avatar: {
      type: 'silver_bear',
      avatarBg: 'bg-gradient-to-tr from-slate-600 via-zinc-500 to-slate-400',
      avatarIcon: '🐻',
      accentGradient: 'from-slate-400 to-zinc-300',
      badgeTitle: '銀熊の堅盾',
      rarityStars: 5
    },
    status: { logic: 90, action: 75, empathy: 70, creativity: 60, stability: 98 },
    description: {
      overview: 'あなたは責任感が極めて強く、一度引き受けた役目や約束は最後まで手抜きなくやり遂げる抜群の信頼感を誇る実務派です。事前準備と確実なステップを積み重ねることで高いクオリティの成果を出し続けます。',
      strengths: '実務遂行能力の高さと、どんな逆境でも動じないブレない安定感が最大の武器です。',
      weaknesses: '急な方針変更やリスクに対して過剰に身構えてしまい、チャンスを逃してしまうことがあります。',
      relationship: '実際の行動や事実で信頼を示してくれる誠実な人物を求めます。',
      loveAndMarriage: '日常の安定や家族としての約束を第一に考え、将来を見据えた確実な家庭を築いていくことができます。',
      workStyle: '経理・品質管理・プロジェクトマネジメント・法務・運用管理など正確性が問われる専門職で成果を出します。',
      advice: '最初から完璧を求めすぎず、時には予定外のハプニングや変化も柔軟に受け入れる余裕を持ちましょう。'
    },
    affinity: {
      bestPartnerName: '温和なハーモナイザー',
      bestPartnerCategory: '配慮派・調和型',
      bestPartnerReason: '責任感が強くて自分に厳しいあなたの緊張を、温かい優しさでふんわりと解きほぐしてくれる最高の癒ややパートナーです。家庭や日常で心が休まる時間を与えてくれます。',
      bestPartnerAdvice: 'ハーモナイザーの気遣いに対して「いつもありがとう」と感謝を伝えることで、相手も自信を持ってあなたをサポートし続けられます。',
      synergyPartnerName: '信頼のガーディアン',
      synergyPartnerCategory: '護衛派・守護型',
      synergyPartnerReason: 'お互いに約束と規律を重んじるため、絶対に嘘や裏切りのない鉄壁の信頼関係を長期的に築くことができます。',
      challengePartnerName: 'ひらめきのクリエイター',
      challengePartnerCategory: '感性派・創造型',
      challengeReason: '計画性がなく気分で動くクリエイターに対して「適当すぎる」「約束を守らない」とストレスを抱えやすい関係です。ハラハラさせられることが多い相性です。',
      challengeAdvice: 'クリエイターの突発的な言動を悪気がない「自由な感性」として捉え、1から10まで計画させずに「要点だけ事前に共有する」ルールを作ると上手くいきます。'
    },
    symbolEmoji: '🐻'
  },
  sincere_supporter: {
    id: 'sincere_supporter',
    name: '温厚なサポーター',
    categoryTag: '献身派・支援型',
    tagline: '困っている人を見過ごさず、親身になって人を支える温かいパートナー',
    primaryTrait: 'supporter',
    secondaryTrait: 'harmonizer',
    themeColor: '#06b6d4',
    gradientBg: 'from-cyan-900/70 via-teal-950/80 to-slate-950',
    avatar: {
      type: 'cyan_dolphin',
      avatarBg: 'bg-gradient-to-tr from-cyan-600 via-blue-500 to-teal-300',
      avatarIcon: '🐬',
      accentGradient: 'from-cyan-400 to-blue-300',
      badgeTitle: '碧海の包容者',
      rarityStars: 5
    },
    status: { logic: 70, action: 70, empathy: 95, creativity: 65, stability: 88 },
    description: {
      overview: 'あなたは悩んでいる人や困っている人を放っておけない、豊かな思いやりと奉仕の心を持った優しい人物です。陰で誰かの役に立つことに深い喜びを見出します。',
      strengths: '相手の求めるニーズやSOSを事前に察知する優れた気づかいと共感力が強みです。',
      weaknesses: '頼まれたお願いごとを断るのが苦手で、キャパシティを超えて疲弊してしまう点に注意が必要です。',
      relationship: '感謝の言葉をきちんと言い合える誠実な相手と最高の相性を発揮します。',
      loveAndMarriage: 'パートナーの体調や感情に細やかに気を配り、温かい愛情で包み込みます。',
      workStyle: '医療・福祉・秘書・カスタマーサクセス・相談員・コミュニティマネージャーなどサポート職で才能を発揮します。',
      advice: '「まず自分自身のコップをエネルギーで満たすこと」を何より優先してください。'
    },
    affinity: {
      bestPartnerName: '情熱のリーダー',
      bestPartnerCategory: '行動派・推進型',
      bestPartnerReason: '前線で果敢に戦うリーダーを足元で支え、リーダーからは圧倒的な感謝と守られている安心感をもらえる相思相愛の黄金ペアです。お互いの長所が完全に噛み合います。',
      bestPartnerAdvice: 'リーダーが忙しさで不器用になったときも、一歩引いてサポートしつつ「たまには休んでね」と優しく声をかけると信頼が深まります。',
      synergyPartnerName: '包容力のカウンセラー',
      synergyPartnerCategory: '共感派・傾聴型',
      synergyPartnerReason: '相手の痛みを自分事のように分かり合える優しさ溢れるペア。悩みや愚痴を素直に聴き合い、互いの心の疲労を癒やせます。',
      challengePartnerName: 'マイペースなスペシャリスト',
      challengePartnerCategory: '独立派・探求型',
      challengeReason: '手厚く世話を焼こうとするあなたに対し、一人で放置してほしいスペシャリストからは「お節介」「干渉しないで」と思われる悲しいすれ違いが起きやすいです。',
      challengeAdvice: '相手が求めてきたときだけ手を差し伸べ、普段は「見守る優しさ」を意識することで、スペシャリストにとっても快適な距離感が保てます。'
    },
    symbolEmoji: '🐬'
  },
  my_way_individual: {
    id: 'my_way_individual',
    name: 'マイペースなスペシャリスト',
    categoryTag: '独立派・探求型',
    tagline: '世間の流行に流されず、自分の価値観とこだわりを極める探求者',
    primaryTrait: 'individual',
    secondaryTrait: 'analyst',
    themeColor: '#8b5cf6',
    gradientBg: 'from-purple-900/70 via-indigo-950/80 to-slate-950',
    avatar: {
      type: 'purple_panther',
      avatarBg: 'bg-gradient-to-tr from-purple-600 via-indigo-500 to-fuchsia-400',
      avatarIcon: '🐆',
      accentGradient: 'from-purple-400 to-indigo-300',
      badgeTitle: '紫黒の豹影',
      rarityStars: 5
    },
    status: { logic: 88, action: 70, empathy: 55, creativity: 90, stability: 80 },
    description: {
      overview: 'あなたはいらない人間関係の摩擦や周囲の流行に惑わされず、自分自身の独自の価値観とこだわりを追求する芯の強い専門家タイプです。自分の関心のあるテーマには驚異的な集中力を発揮し、誰にも真似できない深みを持った知識や作品を生み出します。',
      strengths: 'ブレない自分軸と、一つのことに深く没頭できる集中力が最大の強みです。独自の専門領域を確立します。',
      weaknesses: '興味がない話題や大勢での集団行動に対してあからさまに無関心になり、誤解されてしまう点に注意が必要です。',
      relationship: 'お互いの個人の時間や趣味を第一に尊重し合える適度な距離感の関係を求めます。',
      loveAndMarriage: '自分の1人時間や集中できる趣味を理解してくれる人と自立した大人同士の信頼関係で長続きします。',
      workStyle: '研究開発・専門職・ライター・プログラマーなど一人で没頭できる環境で能力を最大発揮します。',
      advice: '自分が考えているこだわりや感謝の気持ちを、たまには口に出して周囲に伝えてみましょう。'
    },
    affinity: {
      bestPartnerName: '理想を描くビジョナリー',
      bestPartnerCategory: '未来派・構想型',
      bestPartnerReason: '世間から理解されにくいあなたの深いこだわりやマニアックな専門性を「それ凄すぎるよ！」と心から評価し、陽の目を見せてくれる最大の発掘者・理解者となってくれます。',
      bestPartnerAdvice: 'ビジョナリーの大きな夢に対し、あなたの専門的な知見から現実的な助言をしてあげると、お互いに欠かせないソウルメイトとなります。',
      synergyPartnerName: '不屈のパーフェクショニスト',
      synergyPartnerCategory: '洗練派・職人型',
      synergyPartnerReason: '互いに静かにクオリティを極める職人同士。無駄な干渉をせず沈黙の時間が居心地良い大人な関係を築けます。',
      challengePartnerName: '温厚なサポーター',
      challengePartnerCategory: '献身派・支援型',
      challengeReason: 'あれこれ気遣い世話を焼いてくれるサポーターの情熱を「ほっといてほしいのに」と過干渉に感じて鬱陶しく思ってしまうことがあります。相手の優しさを無駄にして傷つける恐れがあります。',
      challengeAdvice: '「気遣ってくれてありがとう。でも今は一人で集中したいんだ」と事前に優しく理由を伝えることで、相手を不必要に傷つけずに済みます。'
    },
    symbolEmoji: '🐆'
  },
  idealist_visionary: {
    id: 'idealist_visionary',
    name: '理想を描くビジョナリー',
    categoryTag: '未来派・構想型',
    tagline: '大きな理想を描き、前向きなエネルギーで未来を切り拓く挑戦者',
    primaryTrait: 'idealist',
    secondaryTrait: 'leader',
    themeColor: '#eab308',
    gradientBg: 'from-yellow-800/70 via-amber-950/80 to-slate-950',
    avatar: {
      type: 'gold_phoenix',
      avatarBg: 'bg-gradient-to-tr from-yellow-500 via-amber-500 to-rose-400',
      avatarIcon: '🦅',
      accentGradient: 'from-yellow-400 to-amber-300',
      badgeTitle: '黄金の鳳凰',
      rarityStars: 5
    },
    status: { logic: 75, action: 90, empathy: 80, creativity: 90, stability: 70 },
    description: {
      overview: 'あなたは「もっとこうすれば良くなる」「こんな未来にしたい」という大きなビジョンを描き、人々に希望を与える熱い情熱の持ち主です。常に高い可能性を見据えて新しい挑戦を続ける前向きなパワーに溢れています。',
      strengths: 'スケールの大きい構想力と、周囲に希望を与えるポジティブな発信力が強みです。',
      weaknesses: '理想が大きくなるあまり、足元の泥臭い実行手順がおろそかになりがちです。',
      relationship: 'お互いの夢や将来の目標についてワクワクしながら語り合えるパートナーシップを求めます。',
      loveAndMarriage: '互いをインスパイアし合えるエネルギーに満ちたパートナーシップを築きます。',
      workStyle: '新規事業開発・起業家・プロデューサーなど、大きなビジョンを示して人を動かす職種で活躍します。',
      advice: '大きなビジョンを描いたら「今日始めるべき具体的第一歩」まで落とし込む癖をつけましょう。'
    },
    affinity: {
      bestPartnerName: 'マイペースなスペシャリスト',
      bestPartnerCategory: '独立派・探求型',
      bestPartnerReason: 'あなたのスケールの大きい抽象的な夢に対して、尖った専門知識で「それは技術的にこうやれば可能だ」と具体化の鍵をくれる最高の相棒です。お互いの長所が引き立ちます。',
      bestPartnerAdvice: 'スペシャリストの意見を「細かいな」と流さず、具体的助言として尊重して組み入れることで構想が確実に現実化します。',
      synergyPartnerName: '情熱のリーダー',
      synergyPartnerCategory: '行動派・推進型',
      synergyPartnerReason: '描いたビジョンをすぐさま現場で実行してくれる圧倒的推進力ペア。現状を劇的に変える大きなブームを起こせます。',
      challengePartnerName: '堅実なプロフェッショナル',
      challengePartnerCategory: '実行派・定着型',
      challengeReason: '夢を語るあなたに対し「予算は？リスクは？実績はあるの？」と現実的なデータで詰めてくるプロフェッショナルは「水を差す人」と感じやすいです。',
      challengeAdvice: '相手は夢を壊したいのではなく守りたいのです。懸念点への対策をあらかじめプロフェッショナルに相談すると強い味方になってくれます。'
    },
    symbolEmoji: '🦅'
  },
  tactical_strategist: {
    id: 'tactical_strategist',
    name: '鋭敏なストラテジスト',
    categoryTag: '知略派・戦略型',
    tagline: '全体を俯瞰し、数歩先を読む戦略で勝利を引き寄せる参謀',
    primaryTrait: 'analyst',
    secondaryTrait: 'leader',
    themeColor: '#6366f1',
    gradientBg: 'from-indigo-900/70 via-slate-900 to-slate-950',
    avatar: {
      type: 'indigo_owl',
      avatarBg: 'bg-gradient-to-tr from-indigo-600 via-purple-600 to-blue-500',
      avatarIcon: '🦉',
      accentGradient: 'from-indigo-400 to-violet-300',
      badgeTitle: '神智の知者',
      rarityStars: 5
    },
    status: { logic: 96, action: 82, empathy: 62, creativity: 85, stability: 88 },
    description: {
      overview: 'あなたは一時の感情に目を取られることなく、常に数歩先のアドバンテージを予測して戦略を組み立てるクレバーな参謀タイプです。最も効率よく目標を達成する盤面を作り上げます。',
      strengths: '先読みの洞察力、効率的なプロセス構築能力、土壇場での冷静な判断力が最大の武器です。',
      weaknesses: '計算高さが目立ってしまうと警戒される点です。弱みを見せるのが苦手な側面もあります。',
      relationship: '無駄な探り合いのない、知的でメリットのある明確な関係を好みます。',
      loveAndMarriage: '落ち着いた知的なやり取りを楽しみ、お互いの人生の相互メリットを高め合える関係を築きます。',
      workStyle: '経営戦略・コンサルティング・プロジェクトマネジメント・金融アナリストなどで力を発揮します。',
      advice: '人を動かしたいときはロジックだけでなく、感情や人間味を見せることが一番の近道です。'
    },
    affinity: {
      bestPartnerName: '情熱のリーダー',
      bestPartnerCategory: '行動派・推進型',
      bestPartnerReason: 'あなたが緻密に練り上げた勝率の高い戦略を、圧倒的な熱量と行動力で現場で形にしてくれる最高のビジネス・ライフパートナーになります。王と参謀の黄金タッグです。',
      bestPartnerAdvice: 'リーダーの暴走や思いつきに対して冷たく否定せず「その熱量を活かすための戦略」として軌道修正してあげると絶大な信頼を得ます。',
      synergyPartnerName: '深遠のシンカー',
      synergyPartnerCategory: '哲理派・智恵型',
      synergyPartnerReason: '戦術レベルだけでなく本質的な長期的原理まで語り合える最高の知性派ペア。盤石な戦略を組み立てられます。',
      challengePartnerName: '温和なハーモナイザー',
      challengePartnerCategory: '配慮派・調和型',
      challengeReason: '感情論や周りの顔色を最優先するハーモナイザーに対し「無駄が多い」「決断が甘い」とイライラを感じやすい関係です。冷徹な印象を与えてしまうこともあります。',
      challengeAdvice: '「感情や人間関係の安心感」も戦略を成功させる重要な資源だと認識し、ハーモナイザーの気遣いを戦略の一部として評価しましょう。'
    },
    symbolEmoji: '🦉'
  },
  empathic_counselor: {
    id: 'empathic_counselor',
    name: '包容力のカウンセラー',
    categoryTag: '共感派・傾聴型',
    tagline: '人の心によりそい、言葉にならない想いを静かに受け止める相談役',
    primaryTrait: 'supporter',
    secondaryTrait: 'individual',
    themeColor: '#a855f7',
    gradientBg: 'from-purple-950/80 via-slate-900 to-slate-950',
    avatar: {
      type: 'purple_swan',
      avatarBg: 'bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-pink-400',
      avatarIcon: '🦢',
      accentGradient: 'from-purple-400 to-fuchsia-300',
      badgeTitle: '慈愛の白鳥',
      rarityStars: 5
    },
    status: { logic: 72, action: 60, empathy: 99, creativity: 80, stability: 82 },
    description: {
      overview: 'あなたは人の心の深い部分にある孤独や悩み、言葉に表現しきれない微細な感情まで察知することができる卓越した感性の持ち主です。否定せずに最後までじっくり話を聞く姿勢は安心感を与えます。',
      strengths: '圧倒的な聴く力と深い包容力、人間の弱さや痛みを理解する優しさが強みです。',
      weaknesses: '他人のネガティブな感情を自分のことのように吸収してしまい疲弊してしまう点に注意が必要です。',
      relationship: '心を開いて本音で深く語り合える特別な人間関係を好みます。',
      loveAndMarriage: 'うわべだけの飾り気がない誠実な愛情でお互いの魂を癒やし合う確かな絆を結びます。',
      workStyle: '臨床心理・相談員・ライフコーチ・人材育成・セラピストなどで力を発揮します。',
      advice: '他人の問題はあくまで「他人の課題」です。一歩引いて健全な境界線を引く意識を持ちましょう。'
    },
    affinity: {
      bestPartnerName: '疾風のパイオニア',
      bestPartnerCategory: '突破派・開拓型',
      bestPartnerReason: '共感力が高すぎて他人の感情を吸い込み湿っぽくなり勝ちなあなたを、明るくサバサバした破天荒なエネルギーで爽やかに連れ出してくれる最高の相棒です。心がとても軽くなります。',
      bestPartnerAdvice: 'パイオニアが傷ついたり挫折したときに、静かに話を聴いて寄り添ってあげることで、相手にとっての「帰るべき港」となれます。',
      synergyPartnerName: '感性の表現者',
      synergyPartnerCategory: '表現派・芸術型',
      synergyPartnerReason: '言葉にならない人の痛みを表現や芸術へ高め合える深い感性派ペア。お互いの心を言葉以上に理解し合えます。',
      challengePartnerName: '冷静なアナリスト',
      challengePartnerCategory: '思考派・分析型',
      challengeReason: '悩みを打ち明けたときに感情に共感せず「原因はこれだからこうすればいい」とドライに正論で回答され、傷つき悲しくなることが多くなりがちな相性です。',
      challengeAdvice: 'アナリストは冷たいのではなく「問題解決」という形であなたを助けようとしています。共感を求めるなら「ただ話を聞いてほしいだけ」と事前に伝えましょう。'
    },
    symbolEmoji: '🦢'
  },
  energetic_pioneer: {
    id: 'energetic_pioneer',
    name: '疾風のパイオニア',
    categoryTag: '突破派・開拓型',
    tagline: '前人未到の領域へ真っ先に飛び込み、圧倒的なスピードで時代を切り拓く者',
    primaryTrait: 'leader',
    secondaryTrait: 'creator',
    themeColor: '#ec4899',
    gradientBg: 'from-pink-900/70 via-purple-950/80 to-slate-950',
    avatar: {
      type: 'pink_cheetah',
      avatarBg: 'bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-400',
      avatarIcon: '🐆',
      accentGradient: 'from-pink-400 to-rose-300',
      badgeTitle: '紅蓮の開拓者',
      rarityStars: 5
    },
    status: { logic: 70, action: 99, empathy: 65, creativity: 92, stability: 75 },
    description: {
      overview: 'あなたはリスクを恐れずに新しいフロンティアへ一番乗りで飛び込んでいく、圧倒的な行動力と野性的なフットワークの持ち主です。新しい流れを作ります。',
      strengths: 'スピード感と、未知の領域を恐れず突き進む強い開拓心が最大の強みです。',
      weaknesses: '後先考えずに突進して周囲を置き去りにしたり途中で飽きてしまう点に注意が必要です。',
      relationship: '一緒にワクワクする冒険や新しい挑戦を楽しめる、フットワークの軽いパートナーを好みます。',
      loveAndMarriage: '自分の冒険心や活動を一番に楽しんで応援してくれるパートナーと強い絆を結びます。',
      workStyle: '新規事業立ち上げ・海外展開・イベントプロデューサーなどで無双します。',
      advice: '残された後始末や仕組み化を引き受けてくれている周りの仲間に日頃から感謝を伝えましょう。'
    },
    affinity: {
      bestPartnerName: '緻密なオーガナイザー',
      bestPartnerCategory: '構造派・整備型',
      bestPartnerReason: '突進した後に散らかしがちなあなたの開拓成果を綺麗に整理・運用システム化してくれる最高の相棒です。パイオニアが自由に次へ進めるのはオーガナイザーのおかげです。',
      bestPartnerAdvice: 'オーガナイザーの地味な作業に「君が作ってくれたシステムのおかげでまた勝てた！」と定期的に感謝を伝えることで信頼が永遠に続きます。',
      synergyPartnerName: '魅惑のプロモーター',
      synergyPartnerCategory: '発信派・牽引型',
      synergyPartnerReason: '切り拓いた新しいフロンティアを大々的に告知・世の中にムーブメントとしてバズらせてくれる最強の広報タッグになれます。',
      challengePartnerName: '堅実なプロフェッショナル',
      challengePartnerCategory: '実行派・定着型',
      challengeReason: 'リスクを回避し準備を重ねるプロフェッショナルに対し「慎重すぎて遅い！」と苛立ちを感じやすい関係です。お互いの進行スピードの違いに不満が出やすい相性です。',
      challengeAdvice: 'プロフェッショナルに全工程を任せるのではなく「まず小さく実験する許可」だけ取って動くと、お互いストレスなく前進できます。'
    },
    symbolEmoji: '🐆'
  },
  steady_organizer: {
    id: 'steady_organizer',
    name: '緻密なオーガナイザー',
    categoryTag: '構造派・整備型',
    tagline: '仕組みとルールをきれいに整え、組織や運用の安定を陰で支える整理の達人',
    primaryTrait: 'realist',
    secondaryTrait: 'supporter',
    themeColor: '#059669',
    gradientBg: 'from-emerald-950/90 via-slate-900 to-slate-950',
    avatar: {
      type: 'emerald_beaver',
      avatarBg: 'bg-gradient-to-tr from-emerald-600 via-green-500 to-teal-400',
      avatarIcon: '🦫',
      accentGradient: 'from-emerald-400 to-green-300',
      badgeTitle: '秩序の整備士',
      rarityStars: 5
    },
    status: { logic: 88, action: 75, empathy: 80, creativity: 60, stability: 96 },
    description: {
      overview: 'あなたは混乱した状況や散らかったタスクを分かりやすく整理し、誰にとってもスムーズに動けるルールや仕組みを作り出すのが得意な実務能力の持ち主です。',
      strengths: '構造化する整理能力と、手抜きの無い真面目な仕事ぶりが最大の武器です。',
      weaknesses: '一度決めたルールにこだわりすぎてしまい、臨機応変な例外対応に頑なになる点です。',
      relationship: '約束をきちんと守り、日々の些細な配慮に感謝し合える誠実な関係を大切にします。',
      loveAndMarriage: '安定した規則正しい生活と堅実な将来設計を共有できるパートナーと穏やかな幸せを享受します。',
      workStyle: '運営事務・プロジェクト進行・ロジスティクスで重宝されます。',
      advice: 'たまにはルールを少し緩め、イレギュラーな状況も楽しむゆとりを持つと世界が広がります。'
    },
    affinity: {
      bestPartnerName: '疾風のパイオニア',
      bestPartnerCategory: '突破派・開拓型',
      bestPartnerReason: '自分には真似できない規格外のスピードと行動力で新しい案件や成果を持ち帰ってくるパイオニアに対し、尊敬とワクワクを感じられます。パイオニアの足元を支えることで強いやりがいを得られます。',
      bestPartnerAdvice: 'パイオニアの型破りな行動を全て縛ろうとせず「事故にならないライン」だけ決めて自由に走らせてあげると上手くいきます。',
      synergyPartnerName: '柔軟なコーディネーター',
      synergyPartnerCategory: '調整派・仲介型',
      synergyPartnerReason: 'あなたが作ったルールや仕組みを、現場の人々にカドを立てず優しく浸透させてくれる最高の現場調整ペアになれます。',
      challengePartnerName: 'ひらめきのクリエイター',
      challengePartnerCategory: '感性派・創造型',
      challengeReason: 'ルールや納期を守らず気分で仕様変更を繰り返すクリエイターに対し「いい加減にしてほしい」とイライラが限界を迎えやすい相性です。',
      challengeAdvice: 'クリエイターにガチガチの工程を強いるのではなく「絶対に守るべき1つの締め切り」だけ提示し、それ以外は自由にさせる柔軟性が秘訣です。'
    },
    symbolEmoji: '🦫'
  },
  flexible_coordinator: {
    id: 'flexible_coordinator',
    name: '柔軟なコーディネーター',
    categoryTag: '調整派・仲介型',
    tagline: '多様な価値観をフラットに受け入れ、最適な着地点を見出す仲介者',
    primaryTrait: 'harmonizer',
    secondaryTrait: 'analyst',
    themeColor: '#14b8a6',
    gradientBg: 'from-teal-900/70 via-slate-900 to-slate-950',
    avatar: {
      type: 'teal_crane',
      avatarBg: 'bg-gradient-to-tr from-teal-600 via-cyan-500 to-emerald-400',
      avatarIcon: '🦩',
      accentGradient: 'from-teal-400 to-cyan-300',
      badgeTitle: '調律の仲介者',
      rarityStars: 5
    },
    status: { logic: 82, action: 70, empathy: 90, creativity: 75, stability: 88 },
    description: {
      overview: 'あなたはいずれか一方に偏ることなく、公平で客観的な視点から異なる意見や人物をまとめるバランス感覚に優れた人物です。',
      strengths: '圧倒的なバランス感覚と、双方の立場を考慮した柔軟な調整能力が強みです。',
      weaknesses: '周りの意見を考慮しすぎるあまり、自分自身の意志が薄れて八方美人に思われる点です。',
      relationship: 'お互いに尊重し合い、対等な関係で意見を交換できる落ち着いた相手と相性抜群です。',
      loveAndMarriage: 'お互いの自由と役割を公平に分かち合い、対等で平和な家庭を築きます。',
      workStyle: 'コーディネーター・進行管理・広報・調停役で大きな価値を発揮します。',
      advice: '時には「私はこうしたい」と自分自身の主観をはっきり主張してみましょう。'
    },
    affinity: {
      bestPartnerName: '直感のイノベーター',
      bestPartnerCategory: '閃き・変革型',
      bestPartnerReason: '尖りすぎて誤解されやすいイノベーターの天才的ひらめきを言語化し、一般の人々や現場にも受け入れられる素晴らしい形へ翻訳・プロデュースしてあげられる最高のパートナーです。',
      bestPartnerAdvice: 'イノベーターの尖った言動を「悪気はない」とフォローしつつ、社会と折り合いをつけるクッションになってあげると深く感謝されます。',
      synergyPartnerName: '中立のメディエーター',
      synergyPartnerCategory: '俯瞰派・裁定型',
      synergyPartnerReason: '感情論を整理し、公平で納得感のある平和な環境を作る洗練された大人同士のペア。どんな対立も収められます。',
      challengePartnerName: '雑草魂のストライバー',
      challengePartnerCategory: '粘り強さ・努力型',
      challengeReason: '妥協やスマートな折衷案を提案するあなたに対し、泥臭い根性論や頑固さを貫くストライバーとは会話が噛み合わず「扱いにくい」と感じやすい相性です。',
      challengeAdvice: 'ストライバーの頑固さは信念の証です。折衷案を押し付けるのではなく、相手の誇りを尊重した上で選択肢を提示しましょう。'
    },
    symbolEmoji: '🦩'
  },
  curious_explorer: {
    id: 'curious_explorer',
    name: '探求のチャレンジャー',
    categoryTag: '好奇心・冒険型',
    tagline: '未知の知識や体験を貪欲に吸収し、自らの世界を広げ続ける冒険家',
    primaryTrait: 'idealist',
    secondaryTrait: 'creator',
    themeColor: '#38bdf8',
    gradientBg: 'from-sky-900/70 via-indigo-950/80 to-slate-950',
    avatar: {
      type: 'sky_wolf',
      avatarBg: 'bg-gradient-to-tr from-sky-500 via-blue-500 to-indigo-400',
      avatarIcon: '🐺',
      accentGradient: 'from-sky-400 to-blue-300',
      badgeTitle: '蒼空の探究狼',
      rarityStars: 5
    },
    status: { logic: 78, action: 88, empathy: 72, creativity: 95, stability: 70 },
    description: {
      overview: 'あなたは「もっと知りたい」「体験してみたい」という旺盛な好奇心に突き動かされ、常に新しい学びや未知の場所へと飛び込んでいく純粋なエネルギーの持ち主です。',
      strengths: '学習意欲の高さと、面白いものを見つけ出す感度の高さが最大の強みです。',
      weaknesses: '興味の対象が目移りしてしまい、持続的な継続が課題です。',
      relationship: '一緒に新しいスポットに出かけたり、面白いニュースや趣味について語り合える相手とワクワクする関係を築けます。',
      loveAndMarriage: 'パートナーと一緒に新しい経験を楽しみ、日常に笑いと新鮮さを注ぎ込みます。',
      workStyle: 'ジャーナリスト・マーケター・企画職・リサーチャーで頭角を現します。',
      advice: 'コアテーマを1つ〜2つ絞って深く掘り下げてみましょう。'
    },
    affinity: {
      bestPartnerName: '深謀のオブザーバー',
      bestPartnerCategory: '熟考派・静観型',
      bestPartnerReason: '外でたくさんの面白い体験やニュースを持ち帰ってくるあなたを、静かな部屋で深く面白がって聞き、本質的な知恵を与えてくれる最高の知恵袋パートナーです。',
      bestPartnerAdvice: 'オブザーバーが静かに聞いてくれることに甘えず、時には相手の得意分野の話もしっかり聞いてあげることで関係がより深まります。',
      synergyPartnerName: 'ひらめきのクリエイター',
      synergyPartnerCategory: '感性派・創造型',
      synergyPartnerReason: 'インプットが得意なあなたとアウトプットが得意なクリエイター。新しいトレンドを発信・形にする刺激的な関係です。',
      challengePartnerName: '緻密なオーガナイザー',
      challengePartnerCategory: '構造派・整備型',
      challengeReason: '枠にとらわれず自由に学び散らかしたいあなたに対し、型にはめて管理しようとしてくるオーガナイザーからは窮屈さを強く感じがちです。',
      challengeAdvice: 'オーガナイザーの管理は自分の学んだ知見を整理整頓してくれるためのものと捉え、定期的にノートや結果を共有してみましょう。'
    },
    symbolEmoji: '🐺'
  },
  quiet_perfectionist: {
    id: 'quiet_perfectionist',
    name: '不屈のパーフェクショニスト',
    categoryTag: '洗練派・職人型',
    tagline: '妥協のない高い美学を持ち、黙々と最高のクオリティを追求する職人',
    primaryTrait: 'individual',
    secondaryTrait: 'realist',
    themeColor: '#475569',
    gradientBg: 'from-slate-800/95 via-slate-900 to-slate-950',
    avatar: {
      type: 'dark_panther',
      avatarBg: 'bg-gradient-to-tr from-slate-700 via-zinc-600 to-slate-500',
      avatarIcon: '🦬',
      accentGradient: 'from-slate-300 to-zinc-200',
      badgeTitle: '漆黒の美学者',
      rarityStars: 5
    },
    status: { logic: 92, action: 72, empathy: 50, creativity: 88, stability: 92 },
    description: {
      overview: 'あなたは自分の仕事やこだわる作品に対して一切の妥協を許さず、最高の精度とクオリティを静かに追求する職人肌です。',
      strengths: '完成度に対する徹底的なこだわりと自己規律が強みです。',
      weaknesses: '他人にも完璧さを求めたり作り直そうとして時間とエネルギーを使い果たす点に注意が必要です。',
      relationship: '静かにこだわりや考えを理解し合える落ち着いた人間関係を求めます。',
      loveAndMarriage: '一言多く語らなくても約束と態度で愛を示し、パートナーと静かな時間を共有できる成熟した愛情を育みます。',
      workStyle: 'エンジニア・建築家・デザイナー・品質監査で絶対的な地位を築きます。',
      advice: '「8割のクオリティで世に出す」勇気を持ちましょう。スピード感を持つことで可能性が広がります。'
    },
    affinity: {
      bestPartnerName: '魅惑のプロモーター',
      bestPartnerCategory: '発信派・牽引型',
      bestPartnerReason: 'あなたが黙々と部屋で磨き上げた妥協のない本物の作品や技術を、圧倒的な華やかさと発信力で世界に広めてくれる最高のプロデューサーです。職人と興行主の理想的コンビです。',
      bestPartnerAdvice: 'プロモーターの派手さや見栄を軽薄と笑わず、自分の努力を世に伝えてくれるパートナーとして全幅の信頼を預けましょう。',
      synergyPartnerName: 'マイペースなスペシャリスト',
      synergyPartnerCategory: '独立派・探求型',
      synergyPartnerReason: '互いに無駄なお世辞を言わず本物の実力だけを認め合う硬派なペア。無言の沈黙が最も心地よい関係です。',
      challengePartnerName: '柔軟なコーディネーター',
      challengePartnerCategory: '調整派・仲介型',
      challengeReason: 'クオリティに妥協したくないあなたに対し、世間や予算に合わせて適度な折衷案を提示してくるコーディネーターに「こだわりを理解していない」と苛立ちを感じやすいです。',
      challengeAdvice: 'コーディネーターは美学を壊したいのではなく世間に届ける架け橋です。「譲れないコア部分」だけ指定し、その他の調整は任せましょう。'
    },
    symbolEmoji: '🦬'
  },
  inspiring_promoter: {
    id: 'inspiring_promoter',
    name: '魅惑のプロモーター',
    categoryTag: '発信派・牽引型',
    tagline: '溢れる魅力と発信力で人の心を揺さぶり、大きなムーブメントを起こす者',
    primaryTrait: 'leader',
    secondaryTrait: 'harmonizer',
    themeColor: '#f43f5e',
    gradientBg: 'from-rose-900/80 via-slate-900 to-slate-950',
    avatar: {
      type: 'rose_peacock',
      avatarBg: 'bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400',
      avatarIcon: '🦚',
      accentGradient: 'from-rose-400 to-pink-300',
      badgeTitle: '絢爛の孔雀',
      rarityStars: 5
    },
    status: { logic: 70, action: 92, empathy: 88, creativity: 85, stability: 80 },
    description: {
      overview: 'あなたは人々の情熱や共感のスイッチを入れる卓越した発信力と表現力を持ち、自分の好きなものや熱意を多くの人に広めていくスター性の持ち主です。',
      strengths: '高い共感発信力と、人の感情を動かすプレゼンテーション能力が強みです。',
      weaknesses: '見栄を張ったり承認欲求に振り回されて心が疲弊してしまう点に注意が必要です。',
      relationship: '自分の挑戦や発信を温かく応援し、一番の理解者として寄り添ってくれるパートナーを好みます。',
      loveAndMarriage: 'ドラマチックで愛情豊かなコミュニケーションでパートナーを魅了します。',
      workStyle: '広報・インフルエンサーマーケティング・営業・司会・PRディレクターで活躍します。',
      advice: '自分が「本当に伝えたい原点の情熱」を大切にしてください。'
    },
    affinity: {
      bestPartnerName: '不屈のパーフェクショニスト',
      bestPartnerCategory: '洗練派・職人型',
      bestPartnerReason: 'あなたがいくら熱意を語っても肝心の「中身」が伴っていなければメッキが剥がれます。パーフェクショニストが作る本物のクオリティがあるからこそ、あなたは自信を持って世にアピールできます。',
      bestPartnerAdvice: 'パーフェクショニストのこだわりを心から絶賛し、広報成果をこまめに還元することで、相手も最高の作品を提供し続けてくれます。',
      synergyPartnerName: '疾風のパイオニア',
      synergyPartnerCategory: '突破派・開拓型',
      synergyPartnerReason: 'パイオニアが開拓した新しい流行を、あなたが大々的に宣伝してバズらせるムーブメントメーカーペアです。',
      challengePartnerName: '冷静なアナリスト',
      challengePartnerCategory: '思考派・分析型',
      challengeReason: '熱量で押し通そうとするあなたに対し、データや数字の矛盾点を冷たく突いてくるアナリストは「テンションを下げる人」と感じやすいです。',
      challengeAdvice: 'アナリストのデータはアピール内容の「裏付け根拠」になります。データを取り入れることであなたのプレゼンは無敵の説得力を持ちます。'
    },
    symbolEmoji: '🦚'
  },
  balanced_mediator: {
    id: 'balanced_mediator',
    name: '中立のメディエーター',
    categoryTag: '俯瞰派・裁定型',
    tagline: '一歩引いた視点で真実を見極め、感情に惑わされず公平な判断を下す裁定者',
    primaryTrait: 'analyst',
    secondaryTrait: 'harmonizer',
    themeColor: '#6366f1',
    gradientBg: 'from-indigo-950/90 via-slate-900 to-slate-950',
    avatar: {
      type: 'indigo_dragon',
      avatarBg: 'bg-gradient-to-tr from-indigo-700 via-blue-600 to-purple-500',
      avatarIcon: '🐉',
      accentGradient: 'from-indigo-400 to-blue-300',
      badgeTitle: '蒼竜の審判者',
      rarityStars: 5
    },
    status: { logic: 92, action: 68, empathy: 85, creativity: 70, stability: 92 },
    description: {
      overview: 'あなたは対立や問題が起きた際に、どちらの側にも偏ることなく冷静に双方向の言い分を聴き取り、最も公平で納得度の高い判断を下す裁判官のような存在です。',
      strengths: '高い客観性と公平な判断力が最大の武器です。',
      weaknesses: '冷静すぎるあまり「冷めていて何を考えているか分からない」と取られてしまうことがあります。',
      relationship: 'お互いに愚痴や感情論を押し付けず、落ち着いた大人のコミュニケーションができる相手を好みます。',
      loveAndMarriage: '感情的にならず落ち着いた大人のパートナーシップを築きます。',
      workStyle: '法務・労務管理・裁判・監査・調停員・人事相談窓口で重宝されます。',
      advice: '時には正論や公平さよりも、ただ相手の感情に共感し一緒に喜んだり怒ったりしてみましょう。'
    },
    affinity: {
      bestPartnerName: '雑草魂のストライバー',
      bestPartnerCategory: '粘り強さ・努力型',
      bestPartnerReason: '不器用で口下手なために正当な評価を受けにくく損をしがちな努力家ストライバーの功績を、あなたが公平に見抜いて正当なポジションや報酬を与えてあげられる最高の理解者となれます。',
      bestPartnerAdvice: 'ストライバーの隠れた苦労や実績を周りにも伝えてあげることで、ストライバーから生涯をかけた固い忠誠と信頼を得られます。',
      synergyPartnerName: '柔軟なコーディネーター',
      synergyPartnerCategory: '調整派・仲介型',
      synergyPartnerReason: '公平な裁定を下すあなたと現場を和ませて繋ぐコーディネーター。組織の摩擦をゼロにする完璧な管理ペアです。',
      challengePartnerName: '疾風のパイオニア',
      challengePartnerCategory: '突破派・開拓型',
      challengeReason: 'ルールや合意形成を無視して突進するパイオニアに対し「勝手な行動で現場を混乱させるな」と冷ややな視線を送りやすい相性です。',
      challengeAdvice: 'パイオニアの突破力は停滞を打破する鍵です。全否定せず「ここまでの枠組みの中なら自由にやっていい」と安全圏を提示してあげましょう。'
    },
    symbolEmoji: '🐉'
  },
  resilient_striver: {
    id: 'resilient_striver',
    name: '雑草魂のストライバー',
    categoryTag: '粘り強さ・努力型',
    tagline: '泥臭い作業や逆境も諦めず、静かな執念で最後に勝利を掴む努力家',
    primaryTrait: 'realist',
    secondaryTrait: 'idealist',
    themeColor: '#78350f',
    gradientBg: 'from-amber-950/90 via-slate-900 to-slate-950',
    avatar: {
      type: 'amber_bull',
      avatarBg: 'bg-gradient-to-tr from-amber-700 via-yellow-600 to-stone-500',
      avatarIcon: '🐂',
      accentGradient: 'from-amber-400 to-yellow-300',
      badgeTitle: '不屈の金角牛',
      rarityStars: 5
    },
    status: { logic: 80, action: 85, empathy: 75, creativity: 65, stability: 95 },
    description: {
      overview: 'あなたは一時的なセンスや器用さだけに頼らず、泥臭い下積みや継続的な努力を愚直に積み重ね、最後に大きな成果を手にする不屈の粘り強さを持った人物です。',
      strengths: '驚異的な忍耐力と、約束をやり遂げる圧倒的な誠実さが強みです。',
      weaknesses: '頑固で苦労を美徳としすぎるあまり要領の良い人を嫌悪してしまう点に注意が必要です。',
      relationship: '不器用でもひたむきに努力する真面目な人と深い信頼を結びます。',
      loveAndMarriage: '不器用ですが家族やパートナーを守る圧倒的な責任感を持ち、安定感を提供し続けます。',
      workStyle: '現場監督・伝統工芸・技術職・長期的事業運用で成功します。',
      advice: '効率化を取り入れて賢く努力する術を身につけることで、努力の成果は何倍にも膨らみます。'
    },
    affinity: {
      bestPartnerName: '中立のメディエーター',
      bestPartnerCategory: '俯瞰派・裁定型',
      bestPartnerReason: '自分の成果をアピールするのが下手で口不器用なあなたの努力を、客観的な目線で正当に認め、適切な評価と居場所を与えてくれる頼もしい公平な味方となってくれます。',
      bestPartnerAdvice: 'メディエーターの前ではカッコつけず日頃の苦労や実情をありのまま共有することで、正しいサポートが受けられます。',
      synergyPartnerName: '堅実なプロフェッショナル',
      synergyPartnerCategory: '実行派・定着型',
      synergyPartnerReason: '互いに根性と手順を惜しまない泥臭いペア。どんな厳しい試練や長期戦も力強く乗り越えられます。',
      challengePartnerName: '直感のイノベーター',
      challengePartnerCategory: '閃き・変革型',
      challengeReason: '一瞬のひらめきや要領の良さだけで大きな成果を出すイノベーターに対し「ズルい」「苦労を知らない」と嫉妬や不快感を感じやすい相性です。',
      challengeAdvice: '相手のひらめきは努力とは別の才能です。相手のアイデアをあなたの粘り強い努力で実体化すれば、最強の成果が得られます。'
    },
    symbolEmoji: '🐂'
  },
  intuitive_innovator: {
    id: 'intuitive_innovator',
    name: '直感のイノベーター',
    categoryTag: '閃き・変革型',
    tagline: '一瞬の閃きとインスピレーションで、停滞した常識を塗り替える天才',
    primaryTrait: 'creator',
    secondaryTrait: 'leader',
    themeColor: '#805ad5',
    gradientBg: 'from-purple-900/80 via-slate-900 to-slate-950',
    avatar: {
      type: 'purple_lightning',
      avatarBg: 'bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-400',
      avatarIcon: '⚡',
      accentGradient: 'from-purple-400 to-pink-300',
      badgeTitle: '紫電の革新者',
      rarityStars: 5
    },
    status: { logic: 70, action: 90, empathy: 65, creativity: 99, stability: 65 },
    description: {
      overview: 'あなたは降ってくるような閃きと直感によって、時代遅れのやり方や停滞を一気に打破する変革者です。思考よりも先にインスピレーションが走り、世界に革新をもたらします。',
      strengths: '圧倒的な発想力と常識を破る革命的なアイデアが最大の強みです。',
      weaknesses: '自分のアイデアを論理的に整理して説明するのが苦手で孤立しやすい点に注意が必要です。',
      relationship: '自分のアイデアや独特の感性を面白がって受け止めてくれる寛大な人物と相性抜群です。',
      loveAndMarriage: '常識に捉われないユニークな恋愛感の持ち主で、刺激的な関係を楽しめます。',
      workStyle: 'イノベーション推進・テック起業・アートディレクターなど前例のない新規軸を作る仕事で輝きます。',
      advice: '周りに協力してもらうときは「なぜそう思ったか」を言葉にして説明する努力をしましょう。'
    },
    affinity: {
      bestPartnerName: '柔軟なコーディネーター',
      bestPartnerCategory: '調整派・仲介型',
      bestPartnerReason: '天才的な閃きを持ちながら言葉足らずで周囲から浮いてしまいがちなあなたのアイデアを、誰にでも分かる言葉と資料に翻訳して現場へ浸透させてくれる最高のプロデューサーです。',
      bestPartnerAdvice: 'コーディネーターの質問に対して面倒くさがらず自分のイメージを話し伝えることで、アイデアが完璧な形で具現化します。',
      synergyPartnerName: 'ひらめきのクリエイター',
      synergyPartnerCategory: '感性派・創出型',
      synergyPartnerReason: '常識を超えた感性を持つもの同士。アイデアがアイデアを呼び、時代を変えるセンセーショナルな作品を生みます。',
      challengePartnerName: '雑草魂のストライバー',
      challengePartnerCategory: '粘り強さ・努力型',
      challengeReason: '直感で飛び跳ねるあなたに対し「順序を踏め」「根性が足りない」と説教してくるストライバーとは息が詰まりやすいです。',
      challengeAdvice: 'ストライバーの地道な手堅さはあなたの弱点を補う防具です。アイデアの「実現部分」をストライバーに任せると大成功します。'
    },
    symbolEmoji: '⚡'
  },
  calm_observer: {
    id: 'calm_observer',
    name: '深謀のオブザーバー',
    categoryTag: '熟考派・静観型',
    tagline: '喧騒から一歩離れ、静かな場所から世界の真実をじっくり見守る観察者',
    primaryTrait: 'individual',
    secondaryTrait: 'supporter',
    themeColor: '#475569',
    gradientBg: 'from-slate-800/95 via-slate-900 to-slate-950',
    avatar: {
      type: 'slate_cat',
      avatarBg: 'bg-gradient-to-tr from-slate-600 via-zinc-500 to-slate-400',
      avatarIcon: '🐈‍⬛',
      accentGradient: 'from-slate-400 to-zinc-300',
      badgeTitle: '静寂の黒猫',
      rarityStars: 5
    },
    status: { logic: 85, action: 55, empathy: 80, creativity: 82, stability: 90 },
    description: {
      overview: 'あなたは渦中に飛び込んで騒ぐよりも、一歩引いた安全な静寂から物事の推移をじっくり観察する賢者タイプです。人間関係の変化や潜むリスクを誰よりも早く見抜いています。',
      strengths: '優れた観察力とリスク察知力、動じない深い静けさが強みです。',
      weaknesses: '自己主張が少なすぎて「何を考えているか分からない」と誤解される点に注意が必要です。',
      relationship: '穏やかで落ち着いた空間を共有できる、安心感のあるパートナーと仲を深めます。',
      loveAndMarriage: '静かで深い信頼感を大切にし、お互いの世界観を守り合える落ち着いた暮らしを共有できます。',
      workStyle: 'リスクコンサル・セキュリティー・監理・研究・バックオフィスで無敵です。',
      advice: 'たまには自分の考えや観察内容を声に出して周りに伝えてみましょう。'
    },
    affinity: {
      bestPartnerName: '探求のチャレンジャー',
      bestPartnerCategory: '好奇心・冒険型',
      bestPartnerReason: '自分からはあまり部屋から出ないあなたに、外の世界のワクワクする面白いニュースや話題を持って帰ってきて楽しませてくれる最高のパートナーです。相手の元気さに癒やされます。',
      bestPartnerAdvice: 'チャレンジャーの話を「うんうん」と楽しそうに聴いてあげることで、相手はあなたに一番の安心感を感じて懐きます。',
      synergyPartnerName: '冷静なアナリスト',
      synergyPartnerCategory: '思考派・分析型',
      synergyPartnerReason: '無駄な喋りをせず客観的な事実だけで会話できる知的なコンビ。静かで生産的な関係を築けます。',
      challengePartnerName: '魅惑のプロモーター',
      challengePartnerCategory: '発信派・牽引型',
      challengeReason: '大声でアピールし周囲を巻き込もうとするプロモーターに対し「暑苦しい」「目立ちたがり屋」と引いてしまいやすい相性です。',
      challengeAdvice: 'プロモーターのエネルギーは外の世界と繋がる窓口です。直接巻き込まれず「遠くから応援するファン」のポジションをとると上手くいきます。'
    },
    symbolEmoji: '🐈‍⬛'
  },
  charismatic_conductor: {
    id: 'charismatic_conductor',
    name: '熱意のマエストロ',
    categoryTag: '統率派・協奏型',
    tagline: 'メンバー個々の才能を調和させ、見事な成果を創り出す指揮者',
    primaryTrait: 'leader',
    secondaryTrait: 'supporter',
    themeColor: '#d97706',
    gradientBg: 'from-amber-900/80 via-slate-900 to-slate-950',
    avatar: {
      type: 'amber_lion',
      avatarBg: 'bg-gradient-to-tr from-amber-600 via-orange-500 to-yellow-400',
      avatarIcon: '🎼',
      accentGradient: 'from-amber-400 to-orange-300',
      badgeTitle: '協奏のマエストロ',
      rarityStars: 5
    },
    status: { logic: 80, action: 90, empathy: 88, creativity: 82, stability: 85 },
    description: {
      overview: 'あなたは一人で突破するだけでなく、チームのメンバー一人ひとりの強みや適性をしっかりと見抜き、それぞれの才能を調和させて大きな成果へと導く魅力溢れる指揮者タイプです。',
      strengths: '高い統率力と人を見る目、全員の強みを引き出す動機づけ能力が最大の強みです。',
      weaknesses: '全体の調和や成果にこだわりすぎるあまり自分を追い込んでしまう点です。',
      relationship: 'お互いの役割を認め合い、刺激と安心感のバランスが取れた関係を築きます。',
      loveAndMarriage: '家庭でもパートナーの成長を心から喜びサポートし、誇りあるペアになります。',
      workStyle: 'ディレクター・人事責任者・オーガナイザー・教育者で圧倒的成果を出します。',
      advice: '時には指揮棒を置き、周りに身を委ねて甘えてみる時間を作りましょう。'
    },
    affinity: {
      bestPartnerName: '深遠のシンカー',
      bestPartnerCategory: '哲理派・智恵型',
      bestPartnerReason: 'あなたが大勢を指揮する中で見落としがちな本質的課題や長期的リスクを、静かな知恵で的確に教えてくれる賢者アドバイザーです。マエストロの判断に絶対的な根拠を与えてくれます。',
      bestPartnerAdvice: 'シンカーの静かな助言を重んじ「君の意見のおかげで救われた」と感謝することで、不変の信頼関係が築かれます。',
      synergyPartnerName: '信頼のガーディアン',
      synergyPartnerCategory: '護衛派・守護型',
      synergyPartnerReason: 'あなたが舞台で輝く間に、安全な土台と生活基盤をしっかり護衛してくれる最強の防衛ペアとなります。',
      challengePartnerName: 'マイペースなスペシャリスト',
      challengePartnerCategory: '独立派・探求型',
      challengeReason: 'チームの調和や指揮に従わず個人のこだわりを貫くスペシャリストに対し「身勝手だ」と頭を悩ませやすい関係です。',
      challengeAdvice: 'スペシャリストを無理に全員と同じ型にハメず「特別なソロ奏者」として孤立した役割を与えると素晴らしい成果を出してくれます。'
    },
    symbolEmoji: '🎼'
  },
  dedicated_guardian: {
    id: 'dedicated_guardian',
    name: '信頼のガーディアン',
    categoryTag: '護衛派・守護型',
    tagline: '大切な場所や仲間を静かに見守り、圧倒的な責任感で守り抜く防人',
    primaryTrait: 'realist',
    secondaryTrait: 'harmonizer',
    themeColor: '#15803d',
    gradientBg: 'from-green-950/90 via-slate-900 to-slate-950',
    avatar: {
      type: 'green_turtle',
      avatarBg: 'bg-gradient-to-tr from-green-700 via-emerald-600 to-teal-400',
      avatarIcon: '🛡️',
      accentGradient: 'from-green-400 to-emerald-300',
      badgeTitle: '不変の防人',
      rarityStars: 5
    },
    status: { logic: 82, action: 72, empathy: 90, creativity: 58, stability: 99 },
    description: {
      overview: 'あなたはいかなる困難や時代の変化があっても、自分が守るべき日常や仲間、約束を徹底的に防衛し続ける誠実な守護者タイプです。',
      strengths: '圧倒的な精神的ブレなさと、守り抜く強い責任感が強みです。',
      weaknesses: '変化や新しい提案に対して過剰に防衛的になってしまう点に注意が必要です。',
      relationship: '一度築いた深い絆は何があっても裏切らず大切に守り続けます。',
      loveAndMarriage: '生涯をかけた揺るぎない愛と安全な生活を守り抜く最高のパートナーとなります。',
      workStyle: '防犯・セキュリティ・インフラ管理・医療看護・家庭支援で不可欠です。',
      advice: 'たまにはリスクを恐れず新しい変化を歓迎してみましょう。'
    },
    affinity: {
      bestPartnerName: '熱意のマエストロ',
      bestPartnerCategory: '統率派・協奏型',
      bestPartnerReason: 'あなたが命がけで守っている安全な基盤と組織の上で、最高の才能を発揮して成果を世に届けてくれる最高の指揮者です。守る甲斐を心から実感できます。',
      bestPartnerAdvice: 'マエストロが疲れたときに安心できる家庭や居場所を提供してあげることで、生涯離れられない絆が生まれます。',
      synergyPartnerName: '堅実なプロフェッショナル',
      synergyPartnerCategory: '実行派・定着型',
      synergyPartnerReason: '互いに規律と約束を守り抜く最強の防衛体制。どんなハプニングや危機からも大切な環境を守り抜けます。',
      challengePartnerName: '直感のイノベーター',
      challengePartnerCategory: '閃き・変革型',
      challengeReason: '自分が苦労して築いたルールや安心な現状を破壊・変更しようとするイノベーターに対し「危険人物だ」と強い拒絶を感じやすいです。',
      challengeAdvice: 'イノベーターの破壊は悪意ではなく発展のためです。「ここだけは絶対守る領域」を決め、それ以外の実験は温かく見守りましょう。'
    },
    symbolEmoji: '🛡️'
  },
  expressive_artist: {
    id: 'expressive_artist',
    name: '感性の表現者',
    categoryTag: '表現派・芸術型',
    tagline: '心の奥にある世界を繊細に言葉や作品へ昇華させ、感動を呼ぶアーティスト',
    primaryTrait: 'creator',
    secondaryTrait: 'supporter',
    themeColor: '#c026d3',
    gradientBg: 'from-fuchsia-950/90 via-slate-900 to-slate-950',
    avatar: {
      type: 'fuchsia_butterfly',
      avatarBg: 'bg-gradient-to-tr from-fuchsia-600 via-pink-500 to-rose-400',
      avatarIcon: '🦋',
      accentGradient: 'from-fuchsia-400 to-pink-300',
      badgeTitle: '彩華の蝶',
      rarityStars: 5
    },
    status: { logic: 62, action: 75, empathy: 92, creativity: 98, stability: 68 },
    description: {
      overview: 'あなたは日常の風景や人の感情から繊細な美しい感動を感じ取り、それを絵や言葉、作品として見事に表現する豊かな感性の持ち主です。',
      strengths: '細やかな感受性と独自の美意識、感情をかたちにする高い表現力が最大の武器です。',
      weaknesses: '周りの批判や些細な言葉で深く傷ついてしまいスランプに陥りやすい繊細さがあります。',
      relationship: '感性や価値観を優しく肯定し、繊細な心を受け止めてくれるパートナーと安らげる関係を築きます。',
      loveAndMarriage: 'ロマンチックで感受性豊かな深い愛を育み、作品や言葉で愛を表現します。',
      workStyle: 'イラスト・デザイン・音楽・文章・空間プロデュースで世界を魅了します。',
      advice: '傷ついたときは自分を責めず「これも一つの表現の種だ」とゆったり休息を取りましょう。'
    },
    affinity: {
      bestPartnerName: '信頼のガーディアン',
      bestPartnerCategory: '護衛派・守護型',
      bestPartnerReason: 'ガラスのように繊細なあなたの感性と心を、社会の辛辣な批判や現実の厳しさから温かく守り、安心して作品作りに没頭できる安全なアトリエを提供してくれる最高の守護者です。',
      bestPartnerAdvice: 'ガーディアンの守りに感謝し、あなたの美しい表現や作品を真っ先にプレゼントしてあげることで、深い絆で結ばれます。',
      synergyPartnerName: '包容力のカウンセラー',
      synergyPartnerCategory: '共感派・傾聴型',
      synergyPartnerReason: '人の感情の深みを共有し合える芸術的ソウルメイト。心が傷ついたときも静かに寄り添い癒やし合えます。',
      challengePartnerName: '鋭知の参謀',
      challengePartnerCategory: '知略派・戦略型',
      challengeReason: '感性で作った作品や想いに対し「効率が悪い」「マーケットの需要とズレている」と冷静に数字でロジハラされ、心が折れやすい相性です。',
      challengeAdvice: '参謀はあなたの作品を否定したいのではなく売るための戦略を考えています。「批評」ではなく「ビジネス助言」として受け取りましょう。'
    },
    symbolEmoji: '🦋'
  },
  wise_thinker: {
    id: 'wise_thinker',
    name: '深遠のシンカー',
    categoryTag: '哲理派・智恵型',
    tagline: '物事の根本にある真理を探求し、静かな知恵で真実を示す哲学者',
    primaryTrait: 'analyst',
    secondaryTrait: 'individual',
    themeColor: '#0284c7',
    gradientBg: 'from-sky-950/95 via-slate-900 to-slate-950',
    avatar: {
      type: 'sky_turtle',
      avatarBg: 'bg-gradient-to-tr from-sky-700 via-cyan-600 to-blue-500',
      avatarIcon: '🐢',
      accentGradient: 'from-sky-400 to-cyan-300',
      badgeTitle: '深遠の長寿亀',
      rarityStars: 5
    },
    status: { logic: 99, action: 60, empathy: 65, creativity: 88, stability: 92 },
    description: {
      overview: 'あなたは表面的な現象にとらわれず、「なぜそうなるのか」という物事の根本原理や哲学的な真理を探求する深い思索の持ち主です。',
      strengths: '深い思考力と長期的視点、本質を見抜く知恵が強みです。',
      weaknesses: '考えすぎて行動を起こすタイミングを逃してしまったり実務から浮いてしまう点に注意が必要です。',
      relationship: '浅いお世辞よりも、本質的なテーマを静かに語り合える相手と繋がります。',
      loveAndMarriage: '言葉よりも信頼と長期的視点で家族を静かに支え続ける誠実な伴侶となります。',
      workStyle: '学者・哲学者・ストラテジスト・シンクタンク研究員で真価を出します。',
      advice: '「10考えたら1行動する」バランスを意識することで人生が大きく開けます。'
    },
    affinity: {
      bestPartnerName: '熱意のマエストロ',
      bestPartnerCategory: '統率派・協奏型',
      bestPartnerReason: 'あなたが部屋で一人温めていた深い原理や知恵を「これは世の中に絶対必要な知恵だ！」と見抜き、大勢の人々や社会へ向けて形にし展開してくれる最高の実行パートナーです。',
      bestPartnerAdvice: 'マエストロに知恵を預け、実際の運用は任せることで、あなたの知識が社会の大きな力として結実します。',
      synergyPartnerName: '神智の知者',
      synergyPartnerCategory: '知略派・戦略型',
      synergyPartnerReason: '原理と思考を高次元で語り合える最高峰の知性派ペア。時代の先を見通す洞察を得られます。',
      challengePartnerName: '魅惑のプロモーター',
      challengePartnerCategory: '発信派・牽引型',
      challengeReason: '根拠の薄い大誇張やアピールで周囲を盛り上げるプロモーターに対し「浅はかで嘘くさい」と冷ややかに見下してしまいがちな相性です。',
      challengeAdvice: 'プロモーターの発信力は多くの人に届けるための才能です。批判するのではなく、根拠となる正しいデータを与えてあげましょう。'
    },
    symbolEmoji: '🐢'
  }
};
