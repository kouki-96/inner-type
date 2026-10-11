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

  // 1. Dominant Hand Bonus
  const handOpt = DOMINANT_HAND_OPTIONS.find(h => h.id === profile.dominantHand);
  if (handOpt) {
    Object.entries(handOpt.bonus).forEach(([trait, bonus]) => {
      traitScores[trait as TraitType] += bonus * 2;
    });
  }

  // 2. Color Choice Bonus
  const colorOpt = COLOR_OPTIONS.find(c => c.id === profile.auraColor);
  if (colorOpt && colorOpt.id !== 'none') {
    traitScores[colorOpt.trait] += 3;
  }

  // 3. Process 25 Questions
  QUESTIONS.forEach(q => {
    const selectedChoiceId = answers[q.id];
    if (selectedChoiceId) {
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

  // Sort traits
  const sortedTraits = (Object.keys(traitScores) as TraitType[]).sort(
    (a, b) => traitScores[b] - traitScores[a]
  );

  const primaryTrait = sortedTraits[0];
  let secondaryTrait = sortedTraits[1];
  if (primaryTrait === secondaryTrait) {
    secondaryTrait = sortedTraits[2] || 'realist';
  }

  // Match Personality from PERSONALITY_TYPES
  const allTypes = Object.values(PERSONALITY_TYPES);
  let matchedPersonality = allTypes.find(
    p => p.primaryTrait === primaryTrait && p.secondaryTrait === secondaryTrait
  );

  if (!matchedPersonality) {
    matchedPersonality = allTypes.find(p => p.primaryTrait === primaryTrait);
  }

  if (!matchedPersonality) {
    matchedPersonality = allTypes[0];
  }

  // Calculate Status Parameters
  const customStatus: PersonalityStatus = {
    logic: Math.min(99, Math.max(50, Math.round(matchedPersonality.status.logic + (traitScores.analyst + traitScores.realist) * 0.3 - 5))),
    action: Math.min(99, Math.max(50, Math.round(matchedPersonality.status.action + (traitScores.leader + traitScores.idealist) * 0.3 - 5))),
    empathy: Math.min(99, Math.max(50, Math.round(matchedPersonality.status.empathy + (traitScores.harmonizer + traitScores.supporter) * 0.3 - 5))),
    creativity: Math.min(99, Math.max(50, Math.round(matchedPersonality.status.creativity + (traitScores.creator + traitScores.individual) * 0.3 - 5))),
    stability: Math.min(99, Math.max(50, Math.round(matchedPersonality.status.stability + (traitScores.realist + traitScores.analyst) * 0.3 - 5))),
  };

  const zodiac = getZodiacInfo(profile.birthdate);
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
