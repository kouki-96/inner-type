import { TraitType } from './questions';

export interface PersonalityStatus {
  logic: number;       // 論理的思考
  action: number;      // 行動性・推進力
  empathy: number;     // 協調・共感力
  creativity: number;  // 創造性・独自性
  stability: number;   // 安定・メンタル
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
  status: PersonalityStatus;
  description: {
    overview: string;
    strengths: string;
    weaknesses: string;
    relationship: string;
    advice: string;
  };
  affinity: {
    bestPartnerName: string;
    bestPartnerReason: string;
    challengePartnerName: string;
    challengeReason: string;
  };
  symbolEmoji: string;
}

export const PERSONALITY_TYPES: Record<string, PersonalityResult> = {
  passion_leader: {
    id: 'passion_leader',
    name: '情熱的なリーダータイプ',
    categoryTag: '行動派・推進型',
    tagline: '高い目標に向かって周囲を巻き込み、まっすぐに突き進む行動派',
    primaryTrait: 'leader',
    secondaryTrait: 'idealist',
    themeColor: '#ef4444',
    gradientBg: 'from-rose-900/40 via-red-950/50 to-slate-950',
    status: { logic: 75, action: 95, empathy: 70, creativity: 80, stability: 85 },
    description: {
      overview: 'エネルギッシュで決断力に優れ、目標に向かって迷わず行動を起こすタイプです。周りに情熱を伝え、チームやプロジェクトを力強くリードする頼もしさを持っています。',
      strengths: '高い決断力、目標達成への執着心、周囲を勇気づけるポジティブな影響力。',
      weaknesses: 'せっかちになりやすく、慎重な人や遅いペースにイライラしてしまうこと。',
      relationship: '裏表がなくストレートなコミュニケーションを好みます。一緒に目標に向かって走れる相手や、自分をしっかり支えてくれる相手と好相性です。',
      advice: '自分が前に出るだけでなく、時には周囲の意見をゆっくり聞く心のゆとりを持つと、さらに信頼が高まります。'
    },
    affinity: {
      bestPartnerName: '誠実なサポータータイプ',
      bestPartnerReason: 'あなたの力強い前進を陰から細やかにサポートし、安心感のある土台を作ってくれます。',
      challengePartnerName: '理屈派の分析家タイプ',
      challengeReason: 'スピード重視のあなたと慎重な分析重視で衝突しやすいですが、お互いの弱点を補い合えます。'
    },
    symbolEmoji: '🔥'
  },
  logical_analyst: {
    id: 'logical_analyst',
    name: '理屈派の分析家タイプ',
    categoryTag: '思考派・分析型',
    tagline: '客観的な視点とデータで本質を見抜き、確実な答えを導く頭脳派',
    primaryTrait: 'analyst',
    secondaryTrait: 'realist',
    themeColor: '#3b82f6',
    gradientBg: 'from-blue-900/40 via-indigo-950/50 to-slate-950',
    status: { logic: 98, action: 70, empathy: 60, creativity: 75, stability: 90 },
    description: {
      overview: '感情に流されず、事実と数字に基づいて冷徹かつ正確に状況を把握できるロジカルな性格です。計画性が高く、無駄のない効率的な解決策を見出すのが得意です。',
      strengths: '圧倒的な観察力、ブレない論理的思考、リスク回避とトラブル対応力。',
      weaknesses: '感情論やノリを軽視しがちで、冷たい人だと誤解されてしまうこと。',
      relationship: '無意味な駆け引きや感情的なもつれを嫌います。お互いに自立し、知的な会話が楽しめる関係を求めます。',
      advice: '人は正論だけでは動かないこともあります。相手の感情に共感を示すひとことを添えるだけで、人間関係が滑らかになります。'
    },
    affinity: {
      bestPartnerName: '自由奔放なクリエイタータイプ',
      bestPartnerReason: '自分にはないユニークな発想を提示してくれ、知的な刺激と発見をもたらしてくれます。',
      challengePartnerName: '情熱的なリーダータイプ',
      challengeReason: '根拠を求めるあなたと勢い優先のリーダーでペースが合わないことがありますが、最高のブレーキ役になれます。'
    },
    symbolEmoji: '💡'
  },
  gentle_harmonizer: {
    id: 'gentle_harmonizer',
    name: '穏やかな調和者タイプ',
    categoryTag: '配慮派・調和型',
    tagline: '周囲の気持ちに寄り添い、みんなが安心して過ごせる場を作る平和主義者',
    primaryTrait: 'harmonizer',
    secondaryTrait: 'supporter',
    themeColor: '#10b981',
    gradientBg: 'from-emerald-900/40 via-teal-950/50 to-slate-950',
    status: { logic: 65, action: 65, empathy: 98, creativity: 70, stability: 85 },
    description: {
      overview: '誰に対しても優しく、場を和ませる温かい雰囲気を持ったタイプです。人の長所を見つけるのが上手く、衝突を避けて円滑な人間関係を築く力に長けています。',
      strengths: '高い共感力、優れた聞き上手さ、相手の立場に立った細やかな気配り。',
      weaknesses: '自分の本音や嫌なことを我慢して溜め込み、ストレスを抱え込んでしまうこと。',
      relationship: '穏やかで心温まる人間関係を大切にします。焦らずゆっくり信頼関係を育む誠実なお付き合いを好みます。',
      advice: '時には自分の「嫌だ」「こうしたい」という気持ちを伝える練習をしてみましょう。本音を言ってもあなたの魅力は変わりません。'
    },
    affinity: {
      bestPartnerName: '頼れる実務家タイプ',
      bestPartnerReason: '優しすぎて優柔不断になりがちなあなたを、ブレない軸と現実的なアドバイスで守ってくれます。',
      challengePartnerName: 'マイペースな探求者タイプ',
      challengeReason: '掴みどころがないマイペースさに振り回されやすいですが、自分の時間を大切にする刺激をもらえます。'
    },
    symbolEmoji: '🌿'
  },
  free_creator: {
    id: 'free_creator',
    name: '自由奔放なクリエイタータイプ',
    categoryTag: '感性派・創造型',
    tagline: '型にはまらないひらめきと感性で、新しい楽しさを生み出す自由人',
    primaryTrait: 'creator',
    secondaryTrait: 'individual',
    themeColor: '#f59e0b',
    gradientBg: 'from-amber-900/40 via-orange-950/50 to-slate-950',
    status: { logic: 65, action: 85, empathy: 75, creativity: 98, stability: 65 },
    description: {
      overview: '豊かな発想力とユーモアを持ち、面白いアイデアや新しいことに常に目を向けているクリエイティブな性格です。退屈なルーティンを嫌い、自分の価値観で軽やかに生きます。',
      strengths: 'ユニークな企画力、環境への柔軟な適応力、周りを惹きつける独自のセンス。',
      weaknesses: '気分屋で飽きっぽく、細かい地味な作業やルールに縛られるのが苦手。',
      relationship: '束縛を嫌い、お互いの個性や自由を尊重し合える楽しい関係を求めます。',
      advice: 'アイデアを出すだけでなく、最後まで形にする習慣をつけると、あなたの価値はさらに高まります。'
    },
    affinity: {
      bestPartnerName: '理屈派の分析家タイプ',
      bestPartnerReason: 'あなたの散らかりがちなアイデアを現実的な形に整理・実現してくれる最強のパートナーです。',
      challengePartnerName: '慎重派の実務家タイプ',
      challengeReason: '細かすぎる指示に息苦しさを感じることがありますが、継続の大切さを学ぶ機会になります。'
    },
    symbolEmoji: '🎨'
  },
  cautious_realist: {
    id: 'cautious_realist',
    name: '慎重派の実務家タイプ',
    categoryTag: '堅実派・実行型',
    tagline: '地に足をつけた着実な努力で、確実に成果を積み上げる信頼の要石',
    primaryTrait: 'realist',
    secondaryTrait: 'analyst',
    themeColor: '#64748b',
    gradientBg: 'from-slate-800/60 via-slate-900 to-slate-950',
    status: { logic: 90, action: 75, empathy: 70, creativity: 60, stability: 98 },
    description: {
      overview: '真面目で責任感が強く、一度引き受けた約束や仕事は最後まで完璧にやり遂げるタイプです。無駄なリスクを避け、準備と確認を徹底するため周りから厚い信頼を得ています。',
      strengths: '高い実務遂行能力、揺るぎない安定感、丁寧でミスが少ない仕事ぶり。',
      weaknesses: '変化や急な予定変更に弱く、新しいやり方を受け入れるのに時間がかかること。',
      relationship: '誠実で嘘のない付き合いを重視します。一時のテンションよりも、将来を見据えた安心感を求めます。',
      advice: '時には失敗を怖がらず、新しいチャレンジを楽しんでみましょう。あなたの土台があれば大抵の失敗はカバーできます。'
    },
    affinity: {
      bestPartnerName: '穏やかな調和者タイプ',
      bestPartnerReason: 'あなたの頑張りをいつも温かくねぎらい、肩の力を抜いて安心できる居場所を作ってくれます。',
      challengePartnerName: '自由奔放なクリエイタータイプ',
      challengeReason: '大雑把な行動に不安を感じやすいですが、凝り固まった思考を解きほぐしてくれる良い刺激になります。'
    },
    symbolEmoji: '🛡️'
  },
  sincere_supporter: {
    id: 'sincere_supporter',
    name: '誠実なサポータータイプ',
    categoryTag: '献身派・支援型',
    tagline: '困っている人を見過ごさず、親身になって人を支える温かいサポーター',
    primaryTrait: 'supporter',
    secondaryTrait: 'harmonizer',
    themeColor: '#06b6d4',
    gradientBg: 'from-cyan-900/40 via-teal-950/50 to-slate-950',
    status: { logic: 70, action: 70, empathy: 95, creativity: 65, stability: 88 },
    description: {
      overview: '思いやりがあり、相手が何を求めているかを自然と察知して動ける優しい人柄です。裏方として周りを支えたり、誰かの役に立っていると実感できることに生きがいを感じます。',
      strengths: '高い奉仕精神、人から愛される誠実さ、親身なアフターフォロー力。',
      weaknesses: '人に頼むのが苦手で、自分ひとりで抱え込みすぎて疲弊してしまうこと。',
      relationship: '相手のために親身に尽くします。自分の気持ちを大切にしてくれる誠実で優しいパートナーと相性が良いです。',
      advice: '人を助けるのと同じくらい、自分自身を大切にして甘やかす時間を作ってあげてください。'
    },
    affinity: {
      bestPartnerName: '情熱的なリーダータイプ',
      bestPartnerReason: 'あなたのサポートに対して素直に感謝し、力強く未来へ引っ張っていってくれます。',
      challengePartnerName: 'マイペースな探求者タイプ',
      challengeReason: 'ドライな対応に冷たさを感じることがありますが、お互いの距離感を保つ練習になります。'
    },
    symbolEmoji: '🤝'
  },
  my_way_individual: {
    id: 'my_way_individual',
    name: 'マイペースな探求者タイプ',
    categoryTag: '独立派・探求型',
    tagline: '世間の流行に流されず、自分の価値観とこだわりを追求する探求者',
    primaryTrait: 'individual',
    secondaryTrait: 'analyst',
    themeColor: '#8b5cf6',
    gradientBg: 'from-purple-900/40 via-indigo-950/50 to-slate-950',
    status: { logic: 88, action: 70, empathy: 55, creativity: 90, stability: 80 },
    description: {
      overview: '群れることを好まず、自分のペースと軸をしっかり持って生きるタイプです。興味を持った分野には深い没頭力を発揮し、独自の視点や専門性を磨き上げます。',
      strengths: 'ブレない芯の強さ、深い集中力、他人に依存しない自立した精神。',
      weaknesses: '他人に興味がないように見られがちで、自分の考えを言葉で説明するのが面倒になりやすいこと。',
      relationship: 'お互いの1人の時間や趣味を尊重できる、適度な距離感の自立した関係を好みます。',
      advice: 'たまには自分の興味や考えていることを周囲に共有してみると、意外な共通点や協力者が現れます。'
    },
    affinity: {
      bestPartnerName: '理想を追うビジョナリータイプ',
      bestPartnerReason: 'あなたのこだわりや専門性を高く評価し、面白い刺激を与えてくれる良き理解者です。',
      challengePartnerName: '誠実なサポータータイプ',
      challengeReason: '相手の世話焼きを少し重く感じることがありますが、好意を素直に受け取ると関係がスムーズになります。'
    },
    symbolEmoji: '🔍'
  },
  idealist_visionary: {
    id: 'idealist_visionary',
    name: '理想を追うビジョナリータイプ',
    categoryTag: '未来派・創出型',
    tagline: '大きな夢と理想を描き、前向きなエネルギーで未来を拓く挑戦者',
    primaryTrait: 'idealist',
    secondaryTrait: 'leader',
    themeColor: '#eab308',
    gradientBg: 'from-yellow-800/40 via-amber-950/50 to-slate-950',
    status: { logic: 75, action: 90, empathy: 80, creativity: 90, stability: 70 },
    description: {
      overview: '「もっとこうなったら素晴らしい」という理想や可能性を追求する夢追い人です。ポジティブで前向きな思考を持ち、周りにも希望やワクワク感を与えるのが上手です。',
      strengths: '高いビジョン設定力、周囲を惹きつける魅力、前向きなチャレンジャー精神。',
      weaknesses: '足元の地味な現実作業や細部をおろそかにしがちで、計画が大雑把になりやすいこと。',
      relationship: '夢や将来の目標を楽しく語り合えるポジティブな関係を望みます。お互いに高め合える相手に惹かれます。',
      advice: '大きな目標だけでなく、今日できる1つの具体策に落とし込むことで、理想が現実化します。'
    },
    affinity: {
      bestPartnerName: 'マイペースな探求者タイプ',
      bestPartnerReason: 'あなたの描く世界観を深掘りし、独自のアドバイスで具体化の手助けをしてくれます。',
      challengePartnerName: '慎重派の実務家タイプ',
      challengeReason: '現実的な問題指摘を耳痛く感じることがありますが、夢を破綻させないための最大の味方です。'
    },
    symbolEmoji: '🌟'
  }
};
