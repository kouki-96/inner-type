import { TraitType, QUESTIONS, DOMINANT_HAND_OPTIONS, COLOR_OPTIONS } from '../data/questions';
import { PERSONALITY_TYPES, PersonalityResult, PersonalityStatus } from '../data/results';

export interface UserProfile {
  birthdate: string;
  dominantHand: string;
  auraColor: string;
}

export interface ZodiacInfo {
  signJP: string;
  element: string;
}

export interface DiagnosisResult {
  profile: UserProfile;
  zodiac: ZodiacInfo;
  traitScores: Record<TraitType, number>;
  traitPercentages: Record<TraitType, number>;
  primaryTrait: TraitType;
  secondaryTrait: TraitType;
  matchedPersonality: PersonalityResult;
  customStatus: PersonalityStatus;
  aiPromptText: string;
  timestamp: string;
}

// Zodiac calculation
export function getZodiacInfo(birthdateStr: string): ZodiacInfo {
  if (!birthdateStr) {
    return { signJP: '牡羊座', element: '火' };
  }
  const parts = birthdateStr.split('-');
  const month = parseInt(parts[1], 10) || 1;
  const day = parseInt(parts[2], 10) || 1;

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { signJP: '牡羊座', element: '火' };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { signJP: '牡牛座', element: '地' };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return { signJP: '双子座', element: '風' };
  if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return { signJP: '蟹座', element: '水' };
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { signJP: '獅子座', element: '火' };
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { signJP: '乙女座', element: '地' };
  if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) return { signJP: '天秤座', element: '風' };
  if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) return { signJP: '蠍座', element: '水' };
  if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) return { signJP: '射手座', element: '火' };
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { signJP: '山羊座', element: '地' };
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { signJP: '水瓶座', element: '風' };
  return { signJP: '魚座', element: '水' };
}

// 8-Dimensional Personality Type Vectors
const TYPE_VECTORS: Record<string, Record<TraitType, number>> = {
  passion_leader: { leader: 10, idealist: 8, creator: 6, realist: 4, analyst: 3, individual: 3, supporter: 3, harmonizer: 2 },
  logical_analyst: { analyst: 10, realist: 8, individual: 6, leader: 4, creator: 4, supporter: 2, idealist: 2, harmonizer: 2 },
  gentle_harmonizer: { harmonizer: 10, supporter: 8, realist: 5, idealist: 4, creator: 3, analyst: 3, individual: 2, leader: 2 },
  free_creator: { creator: 10, individual: 8, idealist: 7, leader: 5, harmonizer: 4, analyst: 3, supporter: 2, realist: 2 },
  cautious_realist: { realist: 10, analyst: 8, supporter: 5, individual: 4, harmonizer: 3, leader: 2, creator: 1, idealist: 1 },
  sincere_supporter: { supporter: 10, harmonizer: 8, realist: 6, idealist: 4, analyst: 3, creator: 3, individual: 2, leader: 2 },
  my_way_individual: { individual: 10, analyst: 8, creator: 7, realist: 5, idealist: 3, leader: 2, supporter: 2, harmonizer: 1 },
  idealist_visionary: { idealist: 10, leader: 8, creator: 7, harmonizer: 4, analyst: 3, supporter: 3, realist: 2, individual: 2 },
  tactical_strategist: { analyst: 10, leader: 8, realist: 7, individual: 5, creator: 4, idealist: 3, supporter: 2, harmonizer: 1 },
  empathic_counselor: { supporter: 10, individual: 8, harmonizer: 7, creator: 6, idealist: 4, analyst: 3, realist: 2, leader: 1 },
  energetic_pioneer: { leader: 10, creator: 8, idealist: 7, individual: 5, realist: 3, analyst: 3, harmonizer: 2, supporter: 1 },
  steady_organizer: { realist: 10, supporter: 8, harmonizer: 6, analyst: 5, leader: 4, individual: 3, idealist: 2, creator: 1 },
  flexible_coordinator: { harmonizer: 10, analyst: 8, supporter: 6, realist: 5, creator: 4, idealist: 3, individual: 2, leader: 2 },
  curious_explorer: { idealist: 10, creator: 8, analyst: 6, leader: 5, individual: 4, harmonizer: 3, supporter: 2, realist: 2 },
  quiet_perfectionist: { individual: 10, realist: 8, analyst: 7, creator: 6, leader: 3, idealist: 2, supporter: 2, harmonizer: 1 },
  inspiring_promoter: { leader: 10, harmonizer: 8, creator: 7, idealist: 6, supporter: 5, analyst: 3, realist: 2, individual: 1 },
  balanced_mediator: { analyst: 10, harmonizer: 8, realist: 6, supporter: 5, individual: 4, idealist: 3, leader: 2, creator: 2 },
  resilient_striver: { realist: 10, idealist: 8, leader: 7, analyst: 5, individual: 4, supporter: 3, harmonizer: 2, creator: 1 },
  intuitive_innovator: { creator: 10, leader: 8, idealist: 7, individual: 6, analyst: 4, harmonizer: 2, supporter: 2, realist: 1 },
  calm_observer: { individual: 10, supporter: 8, analyst: 7, realist: 6, harmonizer: 5, creator: 3, idealist: 2, leader: 1 },
  charismatic_conductor: { leader: 10, supporter: 8, harmonizer: 7, idealist: 5, analyst: 4, realist: 3, creator: 2, individual: 1 },
  dedicated_guardian: { realist: 10, harmonizer: 8, supporter: 7, analyst: 5, individual: 3, leader: 3, idealist: 2, creator: 1 },
  expressive_artist: { creator: 10, supporter: 8, harmonizer: 7, idealist: 6, individual: 5, analyst: 3, realist: 2, leader: 1 },
  wise_thinker: { analyst: 10, individual: 8, realist: 7, creator: 5, idealist: 4, leader: 3, supporter: 2, harmonizer: 1 },
};

// Calculate cosine similarity between two trait vectors
function calculateCosineSimilarity(
  vecA: Record<TraitType, number>,
  vecB: Record<TraitType, number>
): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  const traits: TraitType[] = ['leader', 'analyst', 'creator', 'supporter', 'realist', 'idealist', 'individual', 'harmonizer'];

  traits.forEach(trait => {
    const a = vecA[trait] || 0;
    const b = vecB[trait] || 0;
    dotProduct += a * b;
    normA += a * a;
    normB += b * b;
  });

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function calculateDiagnosis(
  profile: UserProfile,
  answers: Record<number, string>
): DiagnosisResult {
  const traitScores: Record<TraitType, number> = {
    leader: 0,
    analyst: 0,
    creator: 0,
    supporter: 0,
    realist: 0,
    idealist: 0,
    individual: 0,
    harmonizer: 0,
  };

  const zodiac = getZodiacInfo(profile.birthdate);
  let anxiousChoiceCount = 0;

  // 1. Dominant Hand Synergy
  const handOpt = DOMINANT_HAND_OPTIONS.find(h => h.id === profile.dominantHand);
  if (handOpt) {
    Object.entries(handOpt.bonus).forEach(([trait, bonus]) => {
      traitScores[trait as TraitType] += bonus * 1.5;
    });
  }

  // 2. Color Choice Synergy
  const colorOpt = COLOR_OPTIONS.find(c => c.id === profile.auraColor);
  if (colorOpt && colorOpt.id !== 'none') {
    traitScores[colorOpt.trait] += 2.5;
  }

  // 3. Zodiac Element Synergy
  if (zodiac.element === '火') {
    traitScores.leader += 1.5;
    traitScores.idealist += 1.5;
  } else if (zodiac.element === '地') {
    traitScores.realist += 1.5;
    traitScores.analyst += 1.5;
  } else if (zodiac.element === '風') {
    traitScores.analyst += 1.5;
    traitScores.harmonizer += 1.5;
  } else if (zodiac.element === '水') {
    traitScores.supporter += 1.5;
    traitScores.creator += 1.5;
  }

  // 4. Process 25 Questions
  QUESTIONS.forEach(q => {
    const selectedChoiceId = answers[q.id];
    if (selectedChoiceId) {
      if (selectedChoiceId === 'e') {
        anxiousChoiceCount++;
      }
      const choice = q.choices.find(c => c.id === selectedChoiceId);
      if (choice) {
        Object.entries(choice.traits).forEach(([trait, score]) => {
          if (score) {
            traitScores[trait as TraitType] += score * 3;
          }
        });
      }
    }
  });

  // Calculate percentages
  const totalScore = Object.values(traitScores).reduce((a, b) => a + b, 0) || 1;
  const traitPercentages: Record<TraitType, number> = {
    leader: Math.round((traitScores.leader / totalScore) * 100),
    analyst: Math.round((traitScores.analyst / totalScore) * 100),
    creator: Math.round((traitScores.creator / totalScore) * 100),
    supporter: Math.round((traitScores.supporter / totalScore) * 100),
    realist: Math.round((traitScores.realist / totalScore) * 100),
    idealist: Math.round((traitScores.idealist / totalScore) * 100),
    individual: Math.round((traitScores.individual / totalScore) * 100),
    harmonizer: Math.round((traitScores.harmonizer / totalScore) * 100),
  };

  // Sort traits by user score
  const sortedTraits = (Object.keys(traitScores) as TraitType[]).sort(
    (a, b) => traitScores[b] - traitScores[a]
  );

  const primaryTrait = sortedTraits[0];
  let secondaryTrait = sortedTraits[1];
  if (primaryTrait === secondaryTrait) {
    secondaryTrait = sortedTraits[2] || 'realist';
  }

  // High Precision Vector Distance + Trait Synergy Matching
  const allTypes = Object.values(PERSONALITY_TYPES);
  let bestMatch: PersonalityResult = allTypes[0];
  let highestSimilarity = -1;

  allTypes.forEach(p => {
    const targetVector = TYPE_VECTORS[p.id] || {
      leader: p.primaryTrait === 'leader' ? 10 : 2,
      analyst: p.primaryTrait === 'analyst' ? 10 : 2,
      creator: p.primaryTrait === 'creator' ? 10 : 2,
      supporter: p.primaryTrait === 'supporter' ? 10 : 2,
      realist: p.primaryTrait === 'realist' ? 10 : 2,
      idealist: p.primaryTrait === 'idealist' ? 10 : 2,
      individual: p.primaryTrait === 'individual' ? 10 : 2,
      harmonizer: p.primaryTrait === 'harmonizer' ? 10 : 2,
    };

    let sim = calculateCosineSimilarity(traitScores, targetVector);

    // Exact Primary Trait Match Bonus
    if (p.primaryTrait === primaryTrait) {
      sim += 0.12;
    }
    // Exact Secondary Trait Match Bonus
    if (p.secondaryTrait === secondaryTrait) {
      sim += 0.08;
    }
    // Reverse Trait Match Bonus
    if (p.primaryTrait === secondaryTrait && p.secondaryTrait === primaryTrait) {
      sim += 0.04;
    }

    // Astrological Element Alignment
    if (zodiac.element === '火' && (p.primaryTrait === 'leader' || p.primaryTrait === 'idealist' || p.primaryTrait === 'creator')) {
      sim += 0.02;
    } else if (zodiac.element === '地' && (p.primaryTrait === 'realist' || p.primaryTrait === 'analyst' || p.primaryTrait === 'supporter')) {
      sim += 0.02;
    } else if (zodiac.element === '風' && (p.primaryTrait === 'analyst' || p.primaryTrait === 'harmonizer' || p.primaryTrait === 'individual')) {
      sim += 0.02;
    } else if (zodiac.element === '水' && (p.primaryTrait === 'supporter' || p.primaryTrait === 'harmonizer' || p.primaryTrait === 'creator')) {
      sim += 0.02;
    }

    if (sim > highestSimilarity) {
      highestSimilarity = sim;
      bestMatch = p;
    }
  });

  const matchedPersonality = bestMatch;

  // Fully dynamic calculation across full 15-99 range without artificial floors
  const rawLogic = (traitPercentages.analyst * 2.2 + traitPercentages.realist * 1.5 + traitPercentages.individual * 0.5);
  const rawAction = (traitPercentages.leader * 2.5 + traitPercentages.idealist * 1.8 + traitPercentages.creator * 1.2) - (anxiousChoiceCount * 1.2);
  const rawEmpathy = (traitPercentages.harmonizer * 2.4 + traitPercentages.supporter * 2.0);
  const rawCreativity = (traitPercentages.creator * 2.5 + traitPercentages.individual * 1.8 + traitPercentages.idealist * 1.2);
  const rawStability = (traitPercentages.realist * 2.0 + traitPercentages.harmonizer * 1.2 + traitPercentages.analyst * 1.0) - (anxiousChoiceCount * 2.5);

  const customStatus: PersonalityStatus = {
    logic: Math.min(99, Math.max(15, Math.round(20 + rawLogic * 1.1))),
    action: Math.min(99, Math.max(15, Math.round(20 + rawAction * 1.1))),
    empathy: Math.min(99, Math.max(15, Math.round(20 + rawEmpathy * 1.1))),
    creativity: Math.min(99, Math.max(15, Math.round(20 + rawCreativity * 1.1))),
    stability: Math.min(99, Math.max(15, Math.round(45 + rawStability * 0.9))),
  };

  const colorName = COLOR_OPTIONS.find(c => c.id === profile.auraColor)?.name || '未回答';
  const handName = DOMINANT_HAND_OPTIONS.find(h => h.id === profile.dominantHand)?.label || '右手';

  // Construct Rich AI Prompt
  const aiPromptText = `【本格性格診断・プロファイル分析データ】
あなたは非常に優れた臨床心理学者およびライフコーチです。
以下の私の診断結果および行動プロファイルデータを元に、私の強み・潜在能力・今後のキャリアや人間関係に関する具体的なアドバイスと分析を行ってください。

■ 基本プロフィール
・生年月日: ${profile.birthdate || '未設定'} (${zodiac.signJP}・${zodiac.element}属性)
・利き手: ${handName}
・直感選択カラー: ${colorName}

■ 診断された性格タイプ
・タイプ名: ${matchedPersonality.name} (${matchedPersonality.categoryTag})
・キャッチコピー: 「${matchedPersonality.tagline}」
・シンボル称号: ${matchedPersonality.avatar.badgeTitle} (${matchedPersonality.symbolEmoji})

■ 行動・心理指標ステータス (100段階評価)
・論理的思考力: ${customStatus.logic} / 100
・行動力・推進力: ${customStatus.action} / 100
・協調性・共感力: ${customStatus.empathy} / 100
・創造性・独創性: ${customStatus.creativity} / 100
・精神的安定度: ${customStatus.stability} / 100

■ 性格の基本傾向と詳細データ
・全体像: ${matchedPersonality.description.overview}
・主な強み: ${matchedPersonality.description.strengths}
・注意点・陥りやすい穴: ${matchedPersonality.description.weaknesses}
・人間関係と対人スタイル: ${matchedPersonality.description.relationship}
・恋愛・パートナーシップ傾向: ${matchedPersonality.description.loveAndMarriage}
・仕事・適職スタイル: ${matchedPersonality.description.workStyle}
・開運アドバイス: ${matchedPersonality.description.advice}

■ 相性分析
・最も相性の良いタイプ: ${matchedPersonality.affinity.bestPartnerName}
  理由: ${matchedPersonality.affinity.bestPartnerReason}
・注意が必要なタイプ: ${matchedPersonality.affinity.challengePartnerName}
  理由: ${matchedPersonality.affinity.challengeReason}

■ AIへのお願い
1. 上記データから見える私の隠された才能や、仕事・プライベートでより成果を出すための「具体的な行動指針」を3つ提案してください。
2. 今後の人生で直面しやすいストレス原因とその乗り越え方をアドバイスしてください。
3. 私の性格タイプに最適な働き方や、周囲との関係を良くするコミュニケーション術について教えてください。
4. 最後に、私への質問を1つ投げかけて、さらに深い対話のきっかけを作ってください。`;

  return {
    profile,
    zodiac,
    traitScores,
    traitPercentages,
    primaryTrait,
    secondaryTrait,
    matchedPersonality,
    customStatus,
    aiPromptText,
    timestamp: new Date().toISOString(),
  };
}
