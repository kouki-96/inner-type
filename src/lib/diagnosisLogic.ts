import { TraitType, QUESTIONS, DOMINANT_HAND_OPTIONS, COLOR_OPTIONS } from '../data/questions';
import { PERSONALITY_TYPES, PersonalityResult, PersonalityStatus } from '../data/results';

export interface UserProfile {
  birthdate: string;
  dominantHand: string;
  auraColor: string;
  customColor?: string;
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

  return {
    profile,
    zodiac,
    traitScores,
    traitPercentages,
    primaryTrait,
    secondaryTrait,
    matchedPersonality,
    customStatus,
    timestamp: new Date().toISOString(),
  };
}
