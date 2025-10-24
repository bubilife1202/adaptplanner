import { SurveyQuestion } from '@/types';

export const surveyQuestions: SurveyQuestion[] = [
  // 패턴성 (Pattern) - 8 questions
  // 높은 점수 = 반복 업무 많음 = 위험
  {
    id: 'pattern-1',
    text: '당신의 업무 중 정해진 규칙과 절차를 따르는 일의 비중은 얼마나 되나요?',
    dimension: 'pattern',
    isRisk: true,
  },
  {
    id: 'pattern-2',
    text: '같은 형태의 작업을 반복적으로 수행하는 빈도는?',
    dimension: 'pattern',
    isRisk: true,
  },
  {
    id: 'pattern-3',
    text: '매뉴얼이나 가이드라인만 있으면 누구나 할 수 있는 업무의 비중은?',
    dimension: 'pattern',
    isRisk: true,
  },
  {
    id: 'pattern-4',
    text: '데이터를 단순히 입력, 정리, 분류하는 작업의 비중은?',
    dimension: 'pattern',
    isRisk: true,
  },
  {
    id: 'pattern-5',
    text: '업무에서 예측 불가능한 상황에 대응해야 하는 빈도는?',
    dimension: 'pattern',
    isRisk: false, // 높을수록 안전
  },
  {
    id: 'pattern-6',
    text: '매일 다른 유형의 문제를 해결해야 하는 빈도는?',
    dimension: 'pattern',
    isRisk: false,
  },
  {
    id: 'pattern-7',
    text: '업무 프로세스를 스스로 설계하고 개선하는 빈도는?',
    dimension: 'pattern',
    isRisk: false,
  },
  {
    id: 'pattern-8',
    text: '업무에서 판단과 의사결정이 필요한 순간의 빈도는?',
    dimension: 'pattern',
    isRisk: false,
  },

  // 창의성 (Creativity) - 8 questions
  // 높은 점수 = 창의적 = 안전
  {
    id: 'creativity-1',
    text: '기존과 다른 새로운 아이디어를 제안하는 빈도는?',
    dimension: 'creativity',
    isRisk: false,
  },
  {
    id: 'creativity-2',
    text: '정해진 답이 없는 문제를 해결해야 하는 빈도는?',
    dimension: 'creativity',
    isRisk: false,
  },
  {
    id: 'creativity-3',
    text: '서로 다른 분야의 지식을 연결하여 문제를 해결하는 빈도는?',
    dimension: 'creativity',
    isRisk: false,
  },
  {
    id: 'creativity-4',
    text: '업무에서 실험하고 시도해볼 수 있는 자유도는?',
    dimension: 'creativity',
    isRisk: false,
  },
  {
    id: 'creativity-5',
    text: '업무의 결과물이 표준화되어 있고 정형화된 정도는?',
    dimension: 'creativity',
    isRisk: true,
  },
  {
    id: 'creativity-6',
    text: '업무에서 "정답"이 명확하게 존재하는 비중은?',
    dimension: 'creativity',
    isRisk: true,
  },
  {
    id: 'creativity-7',
    text: '예술적 감각이나 미적 판단이 필요한 업무의 비중은?',
    dimension: 'creativity',
    isRisk: false,
  },
  {
    id: 'creativity-8',
    text: '기존 방식을 깨고 혁신적인 방법을 시도하는 빈도는?',
    dimension: 'creativity',
    isRisk: false,
  },

  // 공감력 (Empathy) - 7 questions
  // 높은 점수 = 공감 능력 높음 = 안전
  {
    id: 'empathy-1',
    text: '업무에서 사람들의 감정과 심리를 이해해야 하는 빈도는?',
    dimension: 'empathy',
    isRisk: false,
  },
  {
    id: 'empathy-2',
    text: '고객, 동료, 이해관계자와 직접 소통하고 관계를 맺는 빈도는?',
    dimension: 'empathy',
    isRisk: false,
  },
  {
    id: 'empathy-3',
    text: '갈등을 중재하거나 협상해야 하는 상황의 빈도는?',
    dimension: 'empathy',
    isRisk: false,
  },
  {
    id: 'empathy-4',
    text: '타인에게 동기부여를 하거나 설득해야 하는 빈도는?',
    dimension: 'empathy',
    isRisk: false,
  },
  {
    id: 'empathy-5',
    text: '업무가 주로 컴퓨터나 기계와의 상호작용으로 이루어지는 비중은?',
    dimension: 'empathy',
    isRisk: true,
  },
  {
    id: 'empathy-6',
    text: '문화적, 사회적 맥락을 고려한 판단이 필요한 빈도는?',
    dimension: 'empathy',
    isRisk: false,
  },
  {
    id: 'empathy-7',
    text: '타인의 비언어적 신호(표정, 분위기 등)를 읽어야 하는 빈도는?',
    dimension: 'empathy',
    isRisk: false,
  },

  // 데이터 의존도 (Data Reliance) - 7 questions
  // 높은 점수 = 데이터에만 의존 = 위험
  {
    id: 'data-1',
    text: '업무 의사결정이 주로 데이터와 통계에 기반하는 정도는?',
    dimension: 'dataReliance',
    isRisk: true,
  },
  {
    id: 'data-2',
    text: '숫자와 지표 분석이 업무의 핵심인 정도는?',
    dimension: 'dataReliance',
    isRisk: true,
  },
  {
    id: 'data-3',
    text: '업무 결과를 명확한 수치로 측정할 수 있는 정도는?',
    dimension: 'dataReliance',
    isRisk: true,
  },
  {
    id: 'data-4',
    text: '데이터로 설명할 수 없는 직관과 경험이 필요한 빈도는?',
    dimension: 'dataReliance',
    isRisk: false,
  },
  {
    id: 'data-5',
    text: '정량적 분석보다 정성적 판단이 중요한 정도는?',
    dimension: 'dataReliance',
    isRisk: false,
  },
  {
    id: 'data-6',
    text: '업무에서 불확실하고 애매한 상황을 다루는 빈도는?',
    dimension: 'dataReliance',
    isRisk: false,
  },
  {
    id: 'data-7',
    text: '최종 결정을 내릴 때 "감"과 "맥락"을 고려하는 정도는?',
    dimension: 'dataReliance',
    isRisk: false,
  },
];

export const dimensionInfo = {
  pattern: {
    name: '패턴성',
    description: '반복적이고 정형화된 업무의 정도',
    riskDescription: '높을수록 AI가 대체하기 쉬움',
  },
  creativity: {
    name: '창의성',
    description: '새로운 아이디어와 혁신적 사고의 정도',
    riskDescription: '높을수록 AI가 대체하기 어려움',
  },
  empathy: {
    name: '공감력',
    description: '인간관계와 감정 이해의 정도',
    riskDescription: '높을수록 AI가 대체하기 어려움',
  },
  dataReliance: {
    name: '데이터 의존도',
    description: '데이터와 수치 기반 의사결정의 정도',
    riskDescription: '높을수록 AI가 대체하기 쉬움',
  },
};
