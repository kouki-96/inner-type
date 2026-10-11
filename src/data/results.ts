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
      overview: 'あなたは高い目標意識と圧倒的な決断力を兼ね備え、停滞した状況でも自ら進んで打開策を切り拓くバイタリティ溢れるリーダーです。自分の意見やビジョンを堂々と発信し、熱量をもって周囲を巻き込んで前進させることができます。常に成果や前進を求め、逆境に立たされるほど本領を発揮する逞しさを持っています。',
      strengths: '速やかな決断力と実行力、明確なゴール設定、周囲の士気を高める圧倒的な影響力。トラブルが起きてもウジウジ悩まず、すぐ次の一手を打てる強さがあります。',
      weaknesses: '自分のスピード感や基準を他人に求めてしまい、ペースが遅い人や慎重すぎる人に対して苛立ちを感じやすい点です。また、結果を急ぐあまり確認不足によるケアレスミスを犯すことがあります。',
      relationship: '裏表がなくストレートな物言いを好みます。自分と同じように高い目標を持つ人と高め合うか、自分の前進を信頼してしっかりバックアップしてくれる誠実な人と長続きします。',
      advice: '自分が走るスピードを少し緩め、仲間がついてきているか振り返る習慣を持ちましょう。全員があなたと同じエネルギー量を持っているわけではないと理解することが、真の信頼構築につながります。'
    },
    affinity: {
      bestPartnerName: '誠実なサポータータイプ',
      bestPartnerReason: 'あなたが勢いで見落としがちな細部や事務作業を完璧にフォローし、最高のパフォーマンスを発揮できるよう支えてくれます。',
      challengePartnerName: '理屈派の分析家タイプ',
      challengeReason: 'スピードと直感で動くあなたに対し、データと根拠を詰めてくるためペースが乱れやすいです。しかし、客観的なリスク回避には欠かせない相手です。'
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
      overview: 'あなたは一時の感情や場のノリに流されず、事実・数字・論理的根拠に基づいて冷静に状況を判断できる確かな思考力の持ち主です。物事の全体像と裏にある問題点を客観的に把握し、最も無駄がなく効率的な解決ルートを見出すことに長けています。',
      strengths: 'ズバ抜けた洞察力と分析力、高い問題解決能力、感情に振り回されない冷静さ。予期せぬアクシデントが起きても冷静に原因を特定し、着実に収束させることができます。',
      weaknesses: '正論を重視しすぎるあまり、人の感情論や人間味あふれる「気持ち」の配慮を無意識に切り捨ててしまい、冷たい人だと勘違いされやすい点です。',
      relationship: '無意味な噂話や感情的なもつれを嫌い、適度な距離感と知的な会話ができる成熟した関係を望みます。信頼した相手には非常に誠実です。',
      advice: '論理や正解だけでは人が動かないことも多いと知りましょう。「正しいかどうか」だけでなく「相手がどう感じるか」に少し寄り添うだけで、人間関係の摩擦が劇的に減ります。'
    },
    affinity: {
      bestPartnerName: '自由奔放なクリエイタータイプ',
      bestPartnerReason: '自分の型にはまった思考に新しい風を吹き込んでくれ、予期せぬ視点やアイデアをもたらしてくれる刺激的な相棒になります。',
      challengePartnerName: '情熱的なリーダータイプ',
      challengeReason: '根拠を求めるあなたに対して勢いと感覚で突き進むため、衝突しやすいです。しかし、暴走を防ぐ最高のブレーキ役になれます。'
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
      overview: 'あなたは誰に対しても温かく接し、場の雰囲気を自然となごませる卓越した社交性と優しさを持ったタイプです。人の感情の変化や言葉にならない気持ちを察する気配りが得意で、ギスギスした場をまるく収めるクッションのような存在です。',
      strengths: '高い共感力と傾聴力、相手の長所を見つける洞察力、衝突を回避し協力体制を作る調整能力。あなたの周りには自然と安心感が漂います。',
      weaknesses: '自分の本音や「NO」と言いたい気持ちを過剰に抑え込み、他人の都合に振り回されて溜め込んだストレスが突然限界を迎えてしまう点です。',
      relationship: '穏やかで心温まる人間関係を何より大切にします。自分のプライベートを尊重しつつ、お互いを気遣い合える誠実な相手と末永く信頼を育みます。',
      advice: '周りへの配慮と同じくらい、自分自身の「嫌だ」「こうしたい」という声に耳を傾けてください。断ることは悪ではなく、自分を守るための大切なステップです。'
    },
    affinity: {
      bestPartnerName: '慎重派の実務家タイプ',
      bestPartnerReason: '優しすぎて優柔不断になりがちなあなたを、ブレない軸と現実的な判断力で守り、導いてくれます。',
      challengePartnerName: 'マイペースな探求者タイプ',
      challengeReason: '言葉が少なく何を考えているか掴みにくいため不安になりがちですが、一定の距離感を保つ居心地の良さを学べます。'
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
      overview: 'あなたは常識や前例にとらわれない柔軟なひらめきと独自のセンスを持ち、新しい面白さを探求するクリエイティブな精神の持ち主です。退屈なルーティンや細かいルールに縛られることを嫌い、自分の直感と好奇心に従って生きる自由人です。',
      strengths: '独創的なアイデア力、予想外のアクシデントをも楽しむ柔軟性、周りをパッと明るくする魅力と表現力。新しいアイデアをゼロから生み出す天才です。',
      weaknesses: '気分や感情の波が大きく、計画的な地味な作業や継続を途中で投げ出してしまう傾向があります。やる気のムラが課題です。',
      relationship: '束縛や過度な干渉を嫌い、お互いのプライベートや趣味を尊重し合える風通しの良い関係を求めます。面白いアイデアを共有できる相手と惹かれ合います。',
      advice: 'アイデアを出すだけで満足せず、信頼できる人に協力してもらいながら1つでも最後まで形にする習慣をつけると、人生の成果が跳ね上がります。'
    },
    affinity: {
      bestPartnerName: '理屈派の分析家タイプ',
      bestPartnerReason: 'あなたが思いついたアイデアの実現可能性を現実的に計算し、具現化のための具体的な計画を授けてくれます。',
      challengePartnerName: '慎重派の実務家タイプ',
      challengeReason: '細かいルールや計画通りの進行を求めてくるため息苦しく感じますが、投げ出しがちな作業を完遂させる最高のアドバイザーになります。'
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
      overview: 'あなたは非常に真面目で責任感が強く、一度引き受けた約束や仕事は最後まで完璧にやり遂げる頼もしい実務家です。一時の感情や一か八かのギャンブルに頼らず、事前準備と確実なステップを重ねることで着実に結果を出します。',
      strengths: '高い実務遂行力、ブレない精神的安定感、細部まで行き届いた確認とケア。組織やチームにおいて、あなたが提示する基準は安心感そのものです。',
      weaknesses: '変化や急な方向転換への対応が苦手で、新しいやり方や不確定なリスクに対して過剰に身構えてしまう点です。柔軟性に欠けると見られることがあります。',
      relationship: '軽率な口約束を嫌い、行動と事実で信頼を示してくれる誠実な相手を望みます。ゆっくり時間をかけて深い絆を育むタイプです。',
      advice: '世の中の8割の物事は「完璧でなくても十分合格点」であることを思い出しましょう。たまには予定外のハプニングを楽しむ余裕を持つと心が楽になります。'
    },
    affinity: {
      bestPartnerName: '穏やかな調和者タイプ',
      bestPartnerReason: 'あなたの責任感の強さと頑張りを心から理解し、疲れを優しく癒やしてくれる居心地の良い時間を与えてくれます。',
      challengePartnerName: '自由奔放なクリエイタータイプ',
      challengeReason: '計画性のなさや突発的な行動にハラハラさせられますが、自分の凝り固まった枠を打ち破ってくれる貴重な存在です。'
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
      overview: 'あなたは困っている人や悩んでいる人を自然と放っておけない、豊かな思いやりと奉仕の心を持った優しいタイプです。表舞台で目立つことよりも、陰で人を支えたり誰かの役に立つことに深い達成感と喜びを見出します。',
      strengths: '相手のニーズを先回りして察知する気づかい力、温かい共感力、面倒見の良さ。あなたの周りでは誰もが居場所を感じることができます。',
      weaknesses: '人に甘えることや頼むことが苦手で、頼まれたら嫌と言えず一人で抱え込みすぎて心身ともに消耗してしまう点です。',
      relationship: '自分の思いやりやサポートを当たり前と思わずに、感謝の気持ちを言葉で返してくれる誠実で優しいパートナーと最高の関係を築けます。',
      advice: '「まずは自分を満たすこと」を優先しましょう。あなたがエネルギーを満たして初めて、真の意味で持続的に周りを助けることができます。'
    },
    affinity: {
      bestPartnerName: '情熱的なリーダータイプ',
      bestPartnerReason: 'あなたの献身的なサポートに対して心からの感謝とリスペクトを示し、力強い行動力であなたを守ってくれます。',
      challengePartnerName: 'マイペースな探求者タイプ',
      challengeReason: '感情表現が少なくお礼やリアクションが薄いため寂しさを感じがちですが、相手の距離感を認める学びになります。'
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
      overview: 'あなたは無駄な人付き合いや世間の流行に惑わされず、自分自身の独自の価値観とこだわりを追求する芯の強い研究者タイプです。興味を持ったテーマには驚異的な集中力を発揮し、誰にも真似できない専門性を築き上げます。',
      strengths: '自立した精神力、深い探求心と集中力、他人に流されないブレない自分軸。一人での作業や分析において卓越したクオリティを生み出します。',
      weaknesses: '自分の興味がない話題や集団行動に対して無関心になりやすく、言葉足らずで周囲から「扱いづらい人」と見られてしまうことがあります。',
      relationship: 'お互いの1人の時間や趣味を第一に尊重し合える、ベタベタしすぎない成熟した関係を求めます。精神的に自立した相手がベストです。',
      advice: '頭の中で考えているこだわりや感謝の気持ちを、たまには言葉にして周囲に開示してみましょう。理解者が一気に増えて過ごしやすくなります。'
    },
    affinity: {
      bestPartnerName: '理想を追うビジョナリータイプ',
      bestPartnerReason: 'あなたのマニアックなこだわりや専門性を面白がり、高く評価してくれる最高の発掘者・理解者になります。',
      challengePartnerName: '誠実なサポータータイプ',
      challengeReason: '相手の世話焼きや過度な気遣いに少しノイズを感じることがありますが、感謝を伝えることで穏やかな関係が保てます。'
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
      overview: 'あなたは「もっとこうなったら世界が良くなる」という大きな可能性と理想を描き、人々に希望を与える熱い心の持ち主です。現状維持に満足せず、常に未来のビジョンを見つめて新しい挑戦を続ける前向きなパワーを持っています。',
      strengths: 'スケールの大きい構想力、周囲に希望を与えるポジティブさ、現状を変革する情熱。困難な状況でも「どうすればできるか」を考えられる人です。',
      weaknesses: '理想ばかりが高くなり、足元の現実的な手順や細かいデータ分析がおろそかになって大風呂敷を広げてしまいがちな点です。',
      relationship: 'お互いの夢や将来についてワクワクしながら語り合える、刺激的で前向きなパートナーシップを好みます。',
      advice: '大きなビジョンを描いたら、信頼できる実務家タイプに相談して「今日始めるべき最初の一歩」に分解する癖をつけましょう。'
    },
    affinity: {
      bestPartnerName: 'マイペースな探求者タイプ',
      bestPartnerReason: 'あなたの壮大なビジョンに対して専門的な知見や冷静なアドバイスをくれ、アイデアをより強固にしてくれます。',
      challengePartnerName: '慎重派の実務家タイプ',
      challengeReason: '現実的な懸念点や細かいリスクを指摘されて水を差された気になりますが、夢を途中で挫折させないための命綱になります。'
    },
    symbolEmoji: '🌟'
  },
  tactical_strategist: {
    id: 'tactical_strategist',
    name: '策士な戦略家タイプ',
    categoryTag: '知略派・構想型',
    tagline: '全体を俯瞰し、数歩先を読む戦略で有利な盤面を作り出す参謀',
    primaryTrait: 'analyst',
    secondaryTrait: 'leader',
    themeColor: '#6366f1',
    gradientBg: 'from-indigo-900/40 via-slate-900 to-slate-950',
    status: { logic: 96, action: 82, empathy: 62, creativity: 85, stability: 88 },
    description: {
      overview: 'あなたは感情に目を奪われることなく、常に数歩先の展開を予測して手札を準備する戦略家タイプです。目立つ位置で騒ぐよりも、裏でゲームの盤面をコントロールし、確実に勝利や成功を引き寄せるクレバーさを持っています。',
      strengths: '先読みの洞察力、効率的なプロセス構築能力、土壇場での冷静な判断力。問題の本質を短時間で見抜く才能に長けています。',
      weaknesses: '計算高さが裏目に出て、人を自分の思い通りに動かそうとするコントロール欲求が出やすい点です。心の奥を見せない警戒心も強めです。',
      relationship: 'お互いの領域を荒らさず、知的でメリットのある関係を好みます。自分の戦略や考えを理解してくれる賢い相手と相性抜群です。',
      advice: '相手を説得するときはロジックだけでなく、感情や人間味を見せることが一番の近道です。素直な弱みを見せる勇気も持ちましょう。'
    },
    affinity: {
      bestPartnerName: '情熱的なリーダータイプ',
      bestPartnerReason: 'あなたが描いた完璧な戦略を、圧倒的な熱量と行動力で現場で実行してくれる最高のビジネスパートナーになります。',
      challengePartnerName: '穏やかな調和者タイプ',
      challengeReason: '情に流されやすい姿勢にジレンマを感じることがありますが、冷たくなりがちなあなたの印象をマイルドにしてくれます。'
    },
    symbolEmoji: '♟️'
  },
  empathic_counselor: {
    id: 'empathic_counselor',
    name: '深い傾聴者カウンセラータイプ',
    categoryTag: '共感派・包容型',
    tagline: '人の心の痛みや孤独を深く受け止め、静かに癒やしを与える相談役',
    primaryTrait: 'supporter',
    secondaryTrait: 'individual',
    themeColor: '#a855f7',
    gradientBg: 'from-purple-950/50 via-slate-900 to-slate-950',
    status: { logic: 72, action: 60, empathy: 99, creativity: 80, stability: 82 },
    description: {
      overview: 'あなたは人の心の奥底にある孤独や傷、言葉にできない微細な感情まで汲み取ることができる卓越した感受性の持ち主です。否定せずに最後まで話を聞く姿勢は、傷ついた人々に深い救いと心の静寂をもたらします。',
      strengths: '圧倒的な聴く力と受け止める包容力、人間の弱さに対する深い理解、一対一の信頼関係構築能力。',
      weaknesses: '他人のネガティブな感情を吸収しすぎて自分まで落ち込んでしまったり、相手の感情に境界線を引けなくなる点です。',
      relationship: '表面的な付き合いではなく、魂レベルで心の深い部分を分かち合える特別な相手を求めます。嘘や誤魔化しのない関係を好みます。',
      advice: '他人の心の問題は他人自身の課題です。自分が背負い込もうとせず、一歩引いて自分と相手の境界線をしっかり保ちましょう。'
    },
    affinity: {
      bestPartnerName: '疾風のパイオニアタイプ',
      bestPartnerReason: '明るくポジティブでサバサバしたエネルギーが、溜まりがちなあなたの心の湿気を爽やかに吹き飛ばしてくれます。',
      challengePartnerName: '理屈派の分析家タイプ',
      challengeReason: '感情を一切交えないドライな分析に傷つくことがありますが、客観的でブレない視点を与えてくれる存在です。'
    },
    symbolEmoji: '🕯️'
  },
  energetic_pioneer: {
    id: 'energetic_pioneer',
    name: '疾風のパイオニアタイプ',
    categoryTag: '突破派・開拓型',
    tagline: '前人未到の領域へ一番に飛び込み、持ち前のスピードで時代を切り拓く者',
    primaryTrait: 'leader',
    secondaryTrait: 'creator',
    themeColor: '#ec4899',
    gradientBg: 'from-pink-900/40 via-purple-950/50 to-slate-950',
    status: { logic: 70, action: 99, empathy: 65, creativity: 92, stability: 75 },
    description: {
      overview: 'あなたはリスクを恐れず新しい前線へ一番乗りで飛び込んでいく、驚異的なフットワークと開拓精神の持ち主です。「誰もやったことがないこと」に強い快感を覚え、その圧倒的なスピードで新しいブームを起こします。',
      strengths: '超人的な行動スピード、前例のない道を切り拓く勇気、失敗してもすぐ起き上がる立ち直りの早さ。',
      weaknesses: '後先考えずに突進して周囲を振り回したり、一度形になると途中で興味を失って放置してしまう飽き性なところです。',
      relationship: '一緒にワクワクする冒険を楽しめる明るいパートナーを好みます。過度な束縛や愚痴ばかりの人間関係は即座に遠ざけます。',
      advice: '自分が突進した後に残された後始末をしてくれる仲間に、日頃からしっかり感謝の気持ちを伝えるようにしましょう。'
    },
    affinity: {
      bestPartnerName: '堅実なオーガナイザータイプ',
      bestPartnerReason: 'あなたが散らかしていった開拓地を綺麗に整理整頓し、継続的なシステムに仕上げてくれる最高のパートナーです。',
      challengePartnerName: '慎重派の実務家タイプ',
      challengeReason: '慎重すぎる態度に焦れったさを感じやすいですが、一歩踏み止まって事故を防ぐブレーキ役になります。'
    },
    symbolEmoji: '⚡'
  },
  steady_organizer: {
    id: 'steady_organizer',
    name: '堅実なオーガナイザータイプ',
    categoryTag: '構築派・整備型',
    tagline: '仕組みとルールを美しく整え、安定した運用を裏で支える整理の達人',
    primaryTrait: 'realist',
    secondaryTrait: 'supporter',
    themeColor: '#059669',
    gradientBg: 'from-emerald-950/60 via-slate-900 to-slate-950',
    status: { logic: 88, action: 75, empathy: 80, creativity: 60, stability: 96 },
    description: {
      overview: 'あなたは混乱した状況や散らかったタスクをきれいに整理整頓し、誰にとっても分かりやすい仕組みやルールを作り上げるのが得意な実力派です。目立たない作業でもコツコツと継続し、運用のクオリティを高く保ちます。',
      strengths: '抜群の整理収納・構造化能力、誠実で手抜きの無い仕事ぶり、安定した進行管理。',
      weaknesses: 'ルールやマニュアルにこだわりすぎて柔軟な特例対応を拒んでしまったり、マニュアル通りに動かない人に厳しくなってしまう点です。',
      relationship: 'お互いの約束を守り、日常の些細な配慮を忘れずに感謝し合える誠実な人間関係を何より大切にします。',
      advice: '「完璧なルール」よりも「その場のノリや笑顔」が大事な場面もあります。時にはルールを緩めて柔軟に楽しんでみましょう。'
    },
    affinity: {
      bestPartnerName: '疾風のパイオニアタイプ',
      bestPartnerReason: '勢いだけで走るパイオニアを足元で支え、その破天荒さに日常の新しい刺激とワクワクをもらえます。',
      challengePartnerName: '自由奔放なクリエイタータイプ',
      challengeReason: 'ルールを守らない気まぐれさにストレスを感じがちですが、自分の発想の枠を広げてくれる存在です。'
    },
    symbolEmoji: '📁'
  },
  flexible_coordinator: {
    id: 'flexible_coordinator',
    name: '柔軟なコーディネータータイプ',
    categoryTag: 'バランス派・調整型',
    tagline: '多様な価値観をフラットに受け入れ、最適な調和点を見出す仲介者',
    primaryTrait: 'harmonizer',
    secondaryTrait: 'analyst',
    themeColor: '#14b8a6',
    gradientBg: 'from-teal-900/40 via-slate-900 to-slate-950',
    status: { logic: 82, action: 70, empathy: 90, creativity: 75, stability: 88 },
    description: {
      overview: 'あなたはどちらか一方に偏ることなく、公平で客観的な視点から異なる意見や人物をまとめあげる優れたコーディネート能力の持ち主です。感情と論理のバランス感覚が絶妙で、誰からも信頼されるアドバイザーです。',
      strengths: '高い客観性とバランス感覚、相手の立場に立った調整力、争いを平和的に納める仲裁力。',
      weaknesses: 'バランスを取りすぎるあまり、自分自身の主観や「こうしたい」という意志が薄れ、他人の意見の板挟みで悩む点です。',
      relationship: '偏見がなく誰とでもフラットに付き合えます。お互いに尊重し合い、対等な関係で意見交換ができる相手を好みます。',
      advice: '周りの意見をまとめるだけでなく、時には「私はこう思う」と自分の主観を前面に出して決断する度胸を持ちましょう。'
    },
    affinity: {
      bestPartnerName: '直感型イノベータータイプ',
      bestPartnerReason: '尖ったアイデアを持つイノベーターの思想を、現実の社会や人に伝わるように美しくコーディネートできます。',
      challengePartnerName: '不屈の努力家タイプ',
      challengeReason: '不器用で頑固な姿勢に接しづらさを感じることがありますが、一度信頼し合えれば強固な相棒になります。'
    },
    symbolEmoji: '⚖️'
  },
  curious_explorer: {
    id: 'curious_explorer',
    name: '好奇心旺盛なチャレンジャータイプ',
    categoryTag: '探求派・挑戦型',
    tagline: '未知の知識や体験を貪欲に吸収し、自分の世界を広げ続ける冒険家',
    primaryTrait: 'idealist',
    secondaryTrait: 'creator',
    themeColor: '#38bdf8',
    gradientBg: 'from-sky-900/40 via-indigo-950/50 to-slate-950',
    status: { logic: 78, action: 88, empathy: 72, creativity: 95, stability: 70 },
    description: {
      overview: 'あなたは「知りたい」「体験したい」という無邪気で強い好奇心に突き動かされ、常に新しい学びや場所に飛び込んでいく少年少女のような感性の持ち主です。多彩な興味関心を持ち、人々に新しい刺激を与えます。',
      strengths: '無限の学習意欲、面白いものを発見する感度、異なるジャンルを結びつけるアイデア発想力。',
      weaknesses: '興味の対象が次々と目移りしてしまい、一つのことを深掘りする前に別のことに意識が向いて器用貧乏になりやすい点です。',
      relationship: '一緒に新しいスポットに出かけたり、面白い本や趣味について語り合える好奇心旺盛な相手と最高の関係を築けます。',
      advice: '手を出したたくさんの興味の中から、一生モノと思えるコアなテーマを1つか2つ選んで深掘りしてみましょう。'
    },
    affinity: {
      bestPartnerName: '静観するオブザーバータイプ',
      bestPartnerReason: 'あなたの散らかしがちな知識や体験を静かに聞き取り、本質的な洞察を加えて自分の学びを深めてくれます。',
      challengePartnerName: '堅実なオーガナイザータイプ',
      challengeReason: '形式や型にはめようとされて窮屈さを感じますが、自分の得た知見を整理して活かす術を学べます。'
    },
    symbolEmoji: '🧭'
  },
  quiet_perfectionist: {
    id: 'quiet_perfectionist',
    name: '孤高のパーフェクショニストタイプ',
    categoryTag: '妥協ゼロ・洗練型',
    tagline: '妥協のない高い美学と基準を持ち、黙々と完璧を追求する職人',
    primaryTrait: 'individual',
    secondaryTrait: 'realist',
    themeColor: '#475569',
    gradientBg: 'from-slate-800/80 via-slate-900 to-slate-950',
    status: { logic: 92, action: 72, empathy: 50, creativity: 88, stability: 92 },
    description: {
      overview: 'あなたは自分の仕事やこだわりに対して一切の妥協を許さず、静かに最高のクオリティを追求する孤高の職人肌です。他人の評価や世間のブームに左右されず、自らが決めた高い基準を満たすことに全力を注ぎます。',
      strengths: '妥協のないクオリティ管理、徹底した自己規律、洗練された独自のセンスと美意識。',
      weaknesses: '自分だけでなく他人にも完璧さを求めてしまったり、少しの不備でも許せずに一からやり直そうとして疲弊する点です。',
      relationship: '軽薄な言葉よりも、沈黙やこだわりを理解し合える静かな時間を共有できる落ち着いた相手と相性抜群です。',
      advice: '「8割の完成度で世に出す」勇気を持ちましょう。あなたの8割は世間の10割以上のクオリティであることがほとんどです。'
    },
    affinity: {
      bestPartnerName: '情熱的なアジテータータイプ',
      bestPartnerReason: 'あなたが黙々と磨き上げた素晴らしい成果物を、世の中に大々的にアピールして広めてくれる最高のプロモーターになります。',
      challengePartnerName: '柔軟なコーディネータータイプ',
      challengeReason: '妥協や適当な折衷案を提示されてイラッとすることがありますが、世間と折り合いをつける術を教えてくれます。'
    },
    symbolEmoji: '💎'
  },
  inspiring_promoter: {
    id: 'inspiring_promoter',
    name: '情熱的なプロモータータイプ',
    categoryTag: '発信派・魅惑型',
    tagline: '溢れる魅力と発信力で人の心を揺さぶり、大きなムーブメントを起こす者',
    primaryTrait: 'leader',
    secondaryTrait: 'harmonizer',
    themeColor: '#f43f5e',
    gradientBg: 'from-rose-900/50 via-slate-900 to-slate-950',
    status: { logic: 70, action: 92, empathy: 88, creativity: 85, stability: 80 },
    description: {
      overview: 'あなたは人の心の感情のスイッチを入れる天才的なスピーチ力と共感力を持ち、自分の好きなものや熱意を世の中に広めるプロモータータイプです。場を華やかに盛り上げ、多くのファンを味方につけます。',
      strengths: '高い共感発信力、人の心を動かすストーリーテリング能力、明るく社交的なカリスマ性。',
      weaknesses: '調子の良いことばかり言って実行が追いつかなかったり、他者からの承認欲求や評価に振り回されて心が疲れる点です。',
      relationship: '自分の活動や発信を一番のファンとして応援し、寄り添ってくれる温かいパートナーと深い絆を結べます。',
      advice: '他人の評価や「いいね」の数ではなく、自分が本当に大切にしたい原点の気持ちを大切に守り続けましょう。'
    },
    affinity: {
      bestPartnerName: '孤高のパーフェクショニストタイプ',
      bestPartnerReason: '妥協なく作られた本物の成果物を提供してくれ、あなたが自信を持って世の中に広めることができる最高のタッグです。',
      challengePartnerName: '理屈派の分析家タイプ',
      challengeReason: 'データや矛盾点を突かれて調子を狂わされがちですが、根拠のあるアピールをするための補強になります。'
    },
    symbolEmoji: '📢'
  },
  balanced_mediator: {
    id: 'balanced_mediator',
    name: 'クールなメディエータータイプ',
    categoryTag: '裁定派・中立型',
    tagline: '一歩引いた視点で真実を見極め、感情に惑わされず公平な判断を下す裁定者',
    primaryTrait: 'analyst',
    secondaryTrait: 'harmonizer',
    themeColor: '#6366f1',
    gradientBg: 'from-indigo-950/60 via-slate-900 to-slate-950',
    status: { logic: 92, action: 68, empathy: 85, creativity: 70, stability: 92 },
    description: {
      overview: 'あなたは争いごとや揉め事の中で、当事者のどちらにも偏ることなく冷静に双方の言い分を聞き取り、もっとも公平で納得感のある解決策を見出す裁判官のような存在です。落ち着きと理性を兼ね備えています。',
      strengths: '圧倒的な中立性と公平さ、感情的にならず話を聞く能力、客観的な真実を見抜く目。',
      weaknesses: '冷めていて当事者意識が薄いと見られたり、情熱的な熱量を前にしたときに引いてしまうクールすぎる面です。',
      relationship: 'お互いに愚痴や愚行を排し、落ち着いた大人の付き合いができる相手を好みます。安心感のある関係を築きます。',
      advice: '時には正論や公平さよりも、ただ相手の味方になって一緒に熱くなったり怒ったりする熱量を見せることも大切です。'
    },
    affinity: {
      bestPartnerName: '不屈の努力家タイプ',
      bestPartnerReason: '不器用で損をしがちな努力家の功績を正当に評価し、正しく報われる環境を整えてあげることができます。',
      challengePartnerName: '疾風のパイオニアタイプ',
      challengeReason: '暴走気味の行動にハラハラさせられますが、自分に足りない泥臭い情熱をもらえます。'
    },
    symbolEmoji: '⚖️'
  },
  resilient_striver: {
    id: 'resilient_striver',
    name: '不屈の努力家タイプ',
    categoryTag: '粘り強さ・叩き上げ型',
    tagline: 'どんな逆境や泥臭い作業でも諦めず、静かな執念で最後に笑う苦労人',
    primaryTrait: 'realist',
    secondaryTrait: 'idealist',
    themeColor: '#78350f',
    gradientBg: 'from-amber-950/70 via-slate-900 to-slate-950',
    status: { logic: 80, action: 85, empathy: 75, creativity: 65, stability: 95 },
    description: {
      overview: 'あなたは才能やセンスだけに頼らず、誰も嫌がるような泥臭い努力や下積みをコツコツと続け、最後に大きな成果を勝ち取る不屈の魂の持ち主です。どんな逆境でも愚痴を言わずに耐え抜く忍耐力があります。',
      strengths: '驚異的な忍耐力とガッツ、約束を守る泥臭い誠実さ、苦境でも折れない雑草魂。',
      weaknesses: '頑固で苦労を美徳としがちで、要領よくスマートに立ち回る要領の良い人を過剰に嫌悪してしまう点です。',
      relationship: '口先だけの調子が良い人ではなく、不器用でも努力し続ける真面目な相手と深い信頼関係を結びます。',
      advice: '楽をすることや文明のツールを使うことは手抜きではありません。効率化を取り入れて賢く努力する術を覚えましょう。'
    },
    affinity: {
      bestPartnerName: 'クールなメディエータータイプ',
      bestPartnerReason: 'あなたの不器用な努力や成果を公平に見て評価してくれ、正当な報酬や立場を用意してくれます。',
      challengePartnerName: '直感型イノベータータイプ',
      challengeReason: '要領よく一瞬で成果を出す姿にモヤモヤしますが、新しいやり方を取り入れるきっかけになります。'
    },
    symbolEmoji: '⛰️'
  },
  intuitive_innovator: {
    id: 'intuitive_innovator',
    name: '直感型イノベータータイプ',
    categoryTag: '閃き・変革型',
    tagline: '一瞬の閃きとインスピレーションで、停滞した常識を塗り替える天才',
    primaryTrait: 'creator',
    secondaryTrait: 'leader',
    themeColor: '#805ad5',
    gradientBg: 'from-purple-900/50 via-slate-900 to-slate-950',
    status: { logic: 70, action: 90, empathy: 65, creativity: 99, stability: 65 },
    description: {
      overview: 'あなたはアイデアが降ってくるような一瞬のインスピレーションと直感で、時代遅れの常識や停滞を一気に打破するイノベーターです。考えるより先に閃きが走り、世界に新しい風を吹き込みます。',
      strengths: '圧巻の発想力と革命的直感、常識を恐れない突破力、人を引きつける個性的な魅力。',
      weaknesses: '直感で動くため論理的な説明が苦手で、周りから「気まぐれで支離滅裂」と受け取られてしまう点です。',
      relationship: '自分の直感や感性を面白がって受け止めてくれる寛大な相手と相性抜群です。刺激し合える関係を求めます。',
      advice: 'あなたの直感は本物ですが、人に協力してもらう時は「なぜそう思ったか」を言葉にして伝える努力をしましょう。'
    },
    affinity: {
      bestPartnerName: '柔軟なコーディネータータイプ',
      bestPartnerReason: 'あなたの支離滅裂になりがちな天才的ひらめきを言語化し、周囲に伝わる架け橋になってくれます。',
      challengePartnerName: '不屈の努力家タイプ',
      challengeReason: '地道さを求められて鬱陶しく感じますが、ひらめきを本物の実績に変えるための粘り強さを教えてくれます。'
    },
    symbolEmoji: '💡'
  },
  calm_observer: {
    id: 'calm_observer',
    name: '静観するオブザーバータイプ',
    categoryTag: '静観・熟考型',
    tagline: '喧騒から一歩離れ、静かな場所から世界の真実を静かに見守る観察者',
    primaryTrait: 'individual',
    secondaryTrait: 'supporter',
    themeColor: '#475569',
    gradientBg: 'from-slate-800/80 via-slate-900 to-slate-950',
    status: { logic: 85, action: 55, empathy: 80, creativity: 82, stability: 90 },
    description: {
      overview: 'あなたは渦中に飛び込んで騒ぐよりも、一歩引いた安全な静寂から物事の推移をじっくり見守る静かな賢者タイプです。過度な主張はしませんが、周囲の人間関係や隠れた危険を誰よりも早く見抜いています。',
      strengths: '卓越した観察力とリスク察知力、感情に惑わされない静かな安定感、深い思考力。',
      weaknesses: '自己主張や自分からのアプローチが極端に少なく、消極的・不気味と誤解されてチャンスを逃しやすい点です。',
      relationship: '静かで穏やかな空間を共に過ごせる、安心感のあるパートナーと一歩一歩静かに仲を深めます。',
      advice: 'たまには自分の考えや意見を声に出してみましょう。あなたの観察眼から出る一言は、周囲にとって非常に価値があります。'
    },
    affinity: {
      bestPartnerName: '好奇心旺盛なチャレンジャータイプ',
      bestPartnerReason: '外の世界からワクワクする面白い話題や体験を持ち帰ってくれ、静かなあなたの日常に彩りを与えてくれます。',
      challengePartnerName: '情熱的なアジテータータイプ',
      challengeReason: '暑苦しい熱量や巻き込みに引き気味になりますが、殻を破って一歩踏み出すきっかけを与えてくれます。'
    },
    symbolEmoji: '🦉'
  }
};
