import { SurveyAnswer, AnalysisResult, DimensionKey } from '@/types';
import { surveyQuestions, dimensionInfo } from './surveyQuestions';

export function analyzeAnswers(answers: SurveyAnswer[]): AnalysisResult {
  // 각 차원별 점수 계산
  const dimensionScores: Record<DimensionKey, number[]> = {
    pattern: [],
    creativity: [],
    empathy: [],
    dataReliance: [],
  };

  answers.forEach((answer) => {
    const question = surveyQuestions.find((q) => q.id === answer.questionId);
    if (!question) return;

    const dimension = question.dimension;
    // isRisk가 true면 점수 그대로, false면 역산 (6 - score)
    const normalizedScore = question.isRisk ? answer.value : 6 - answer.value;
    dimensionScores[dimension].push(normalizedScore);
  });

  // 각 차원의 평균 계산
  const dimensions: Record<DimensionKey, number> = {
    pattern: average(dimensionScores.pattern),
    creativity: average(dimensionScores.creativity),
    empathy: average(dimensionScores.empathy),
    dataReliance: average(dimensionScores.dataReliance),
  };

  // AI 대체 위험도 계산
  // pattern과 dataReliance가 높을수록 위험, creativity와 empathy가 낮을수록 위험
  const riskScore = (dimensions.pattern + dimensions.dataReliance) / 2;
  const safetyScore = (dimensions.creativity + dimensions.empathy) / 2;

  // 0-100 스케일로 변환
  // 위험 점수가 높고 안전 점수가 낮을수록 대체 지수 증가
  const aiReplaceabilityIndex = Math.round(
    ((riskScore / 5) * 50 + ((5 - safetyScore) / 5) * 50) * 100
  );

  // 위험 영역과 안전 영역 분류
  const riskAreas: DimensionKey[] = [];
  const safeAreas: DimensionKey[] = [];

  if (dimensions.pattern >= 3.5) riskAreas.push('pattern');
  if (dimensions.dataReliance >= 3.5) riskAreas.push('dataReliance');
  if (dimensions.creativity <= 2.5) riskAreas.push('creativity');
  if (dimensions.empathy <= 2.5) riskAreas.push('empathy');

  if (dimensions.pattern <= 2.5) safeAreas.push('pattern');
  if (dimensions.dataReliance <= 2.5) safeAreas.push('dataReliance');
  if (dimensions.creativity >= 3.5) safeAreas.push('creativity');
  if (dimensions.empathy >= 3.5) safeAreas.push('empathy');

  // 요약 코멘트 생성
  const summary = generateSummary(dimensions, riskAreas, safeAreas, aiReplaceabilityIndex);

  return {
    aiReplaceabilityIndex,
    dimensions,
    riskAreas,
    safeAreas,
    summary,
  };
}

function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
}

function generateSummary(
  dimensions: Record<DimensionKey, number>,
  riskAreas: DimensionKey[],
  safeAreas: DimensionKey[],
  aiReplaceabilityIndex: number
): string {
  const parts: string[] = [];

  // 위험도 평가
  if (aiReplaceabilityIndex >= 70) {
    parts.push('당신의 업무는 AI 대체 위험이 높습니다.');
  } else if (aiReplaceabilityIndex >= 50) {
    parts.push('당신의 업무는 중간 수준의 AI 대체 위험이 있습니다.');
  } else {
    parts.push('당신의 업무는 비교적 안전합니다.');
  }

  // 위험 영역
  if (riskAreas.length > 0) {
    const riskNames = riskAreas.map((area) => `'${dimensionInfo[area].name}'`).join(', ');
    if (riskAreas.includes('pattern')) {
      parts.push(`${riskNames} 비중이 높아 주의가 필요합니다.`);
    } else {
      parts.push(`${riskNames}에서 취약점이 발견되었습니다.`);
    }
  }

  // 안전 영역
  if (safeAreas.length > 0) {
    const safeNames = safeAreas.map((area) => `'${dimensionInfo[area].name}'`).join(', ');
    parts.push(`다행히 ${safeNames}이라는 강점을 보유하고 있습니다.`);
  }

  // 개선 제안
  if (dimensions.creativity < 3) {
    parts.push('창의성 보완이 시급합니다.');
  }
  if (dimensions.empathy < 3) {
    parts.push('공감 능력 향상이 필요합니다.');
  }
  if (dimensions.pattern > 3.5) {
    parts.push('반복 업무를 자동화하는 방법을 배워야 합니다.');
  }

  return parts.join(' ');
}

export function getDimensionLevel(score: number): 'low' | 'medium' | 'high' {
  if (score <= 2.5) return 'low';
  if (score <= 3.5) return 'medium';
  return 'high';
}

export function getRiskLevel(aiReplaceabilityIndex: number): 'low' | 'medium' | 'high' {
  if (aiReplaceabilityIndex < 40) return 'low';
  if (aiReplaceabilityIndex < 70) return 'medium';
  return 'high';
}
