import { ActionPlanModule, ActionPlan, DimensionKey } from '@/types';

// 각 차원과 상황에 맞는 액션 플랜 모듈들
export const actionPlanModules: ActionPlanModule[] = [
  // === 위험 제거 (Risk) 모듈 ===
  {
    id: 'risk-pattern-high',
    title: '반복 업무 자동화',
    description: '패턴성이 높아 AI 대체 위험이 있습니다',
    category: 'risk',
    relatedDimension: 'pattern',
    condition: (dimensions) => dimensions.pattern >= 3.5,
    tasks: [
      {
        id: 'risk-pattern-high-1',
        category: '1.1',
        text: '당신의 업무 중 매주 반복되는 작업 5가지를 목록화하세요',
      },
      {
        id: 'risk-pattern-high-2',
        category: '1.2',
        text: '그 중 1개를 AI 도구(ChatGPT, 자동화 툴)로 처리하고 주 1시간을 절약하는 실험을 하세요',
      },
      {
        id: 'risk-pattern-high-3',
        category: '1.3',
        text: 'AI가 할 수 없는 "판단"이 필요한 업무를 최소 3가지 찾아 기록하세요',
      },
    ],
  },
  {
    id: 'risk-data-high',
    title: '데이터 해석력 강화',
    description: '데이터 의존도가 높아 AI가 대체하기 쉬운 영역입니다',
    category: 'risk',
    relatedDimension: 'dataReliance',
    condition: (dimensions) => dimensions.dataReliance >= 3.5,
    tasks: [
      {
        id: 'risk-data-high-1',
        category: '1.4',
        text: 'AI가 생성한 데이터 분석 결과에 "인간적 맥락"을 추가하는 연습을 하세요 (예: 숫자 뒤의 사람들의 이야기)',
      },
      {
        id: 'risk-data-high-2',
        category: '1.5',
        text: '데이터로는 설명할 수 없지만 중요한 직관적 판단 사례 3가지를 기록하세요',
      },
    ],
  },

  // === 약점 보완 (Weakness) 모듈 ===
  {
    id: 'weak-creativity-low',
    title: '창의력 훈련',
    description: '창의성이 부족하여 보완이 필요합니다',
    category: 'weakness',
    relatedDimension: 'creativity',
    condition: (dimensions) => dimensions.creativity <= 2.5,
    tasks: [
      {
        id: 'weak-creativity-low-1',
        category: '2.1',
        text: '매일 5분, 전혀 다른 단어 2개를 억지로 연결하는 훈련을 하세요 (예: "우산 + 피자 = ?")',
      },
      {
        id: 'weak-creativity-low-2',
        category: '2.2',
        text: 'AI가 만든 결과물을 볼 때, "더 엉뚱하게" 바꿀 수 있는 부분 1가지를 찾아보세요',
      },
      {
        id: 'weak-creativity-low-3',
        category: '2.3',
        text: '일주일에 1번, 당신의 업무 프로세스를 완전히 다르게 재설계해보는 사고 실험을 하세요',
      },
    ],
  },
  {
    id: 'weak-creativity-medium',
    title: '창의성 강화',
    description: '창의성을 더욱 발전시켜 경쟁력을 높이세요',
    category: 'weakness',
    relatedDimension: 'creativity',
    condition: (dimensions) => dimensions.creativity > 2.5 && dimensions.creativity < 3.5,
    tasks: [
      {
        id: 'weak-creativity-medium-1',
        category: '2.1',
        text: 'AI의 아이디어를 "조합"하여 새로운 제3의 아이디어를 만드는 연습을 하세요',
      },
      {
        id: 'weak-creativity-medium-2',
        category: '2.2',
        text: '다른 산업/분야의 혁신 사례를 당신의 업무에 적용하는 방법을 주 1회 탐구하세요',
      },
    ],
  },
  {
    id: 'weak-empathy-low',
    title: '공감 능력 개발',
    description: '공감력이 부족하여 인간적 강점을 키워야 합니다',
    category: 'weakness',
    relatedDimension: 'empathy',
    condition: (dimensions) => dimensions.empathy <= 2.5,
    tasks: [
      {
        id: 'weak-empathy-low-1',
        category: '2.4',
        text: '매일 업무 중 만난 사람 1명의 감정 상태를 관찰하고 기록하세요',
      },
      {
        id: 'weak-empathy-low-2',
        category: '2.5',
        text: 'AI 보고서에 "이 데이터가 실제 사람들에게 의미하는 것"을 추가하는 연습을 하세요',
      },
      {
        id: 'weak-empathy-low-3',
        category: '2.6',
        text: '주 1회, 동료와 업무 외 대화를 통해 관계를 깊게 만드는 시간을 가지세요',
      },
    ],
  },
  {
    id: 'weak-empathy-medium',
    title: '공감력 확장',
    description: '공감 능력을 전략적 자산으로 발전시키세요',
    category: 'weakness',
    relatedDimension: 'empathy',
    condition: (dimensions) => dimensions.empathy > 2.5 && dimensions.empathy < 3.5,
    tasks: [
      {
        id: 'weak-empathy-medium-1',
        category: '2.4',
        text: '이해관계자의 숨겨진 니즈를 파악하여 AI가 놓친 부분을 찾아내는 연습을 하세요',
      },
      {
        id: 'weak-empathy-medium-2',
        category: '2.5',
        text: '갈등 상황에서 중재자 역할을 자처하여 경험을 쌓으세요',
      },
    ],
  },

  // === 전략 수립 (Strategy) 모듈 ===
  {
    id: 'strategy-creativity-high',
    title: '창의성 레버리지',
    description: '당신의 창의성을 최대한 활용하세요',
    category: 'strategy',
    relatedDimension: 'creativity',
    condition: (dimensions) => dimensions.creativity >= 3.5,
    tasks: [
      {
        id: 'strategy-creativity-high-1',
        category: '3.1',
        text: 'AI를 "아이디어 생성 도구"로 활용하고, 당신은 "큐레이터"가 되어 최선을 선택하세요',
      },
      {
        id: 'strategy-creativity-high-2',
        category: '3.2',
        text: '팀 내에서 "혁신 제안자" 포지션을 구축하고 정기적으로 새 아이디어를 제안하세요',
      },
    ],
  },
  {
    id: 'strategy-empathy-high',
    title: '공감력 활용 전략',
    description: '공감력을 활용해 AI 결과물을 인간화하세요',
    category: 'strategy',
    relatedDimension: 'empathy',
    condition: (dimensions) => dimensions.empathy >= 3.5,
    tasks: [
      {
        id: 'strategy-empathy-high-1',
        category: '3.3',
        text: 'AI 리포트에 "인간적인 해석"과 "감정적 맥락"을 덧붙이는 역할을 맡으세요',
      },
      {
        id: 'strategy-empathy-high-2',
        category: '3.4',
        text: '고객/이해관계자와의 직접 소통 기회를 늘려 "관계 전문가"로 포지셔닝하세요',
      },
    ],
  },
  {
    id: 'strategy-balanced',
    title: 'AI 협업 전략가',
    description: '균형잡힌 역량으로 AI와 협업하는 방법을 익히세요',
    category: 'strategy',
    relatedDimension: 'pattern',
    condition: (dimensions) =>
      dimensions.pattern <= 3.5 &&
      dimensions.creativity >= 2.5 &&
      dimensions.empathy >= 2.5,
    tasks: [
      {
        id: 'strategy-balanced-1',
        category: '3.5',
        text: 'AI를 "1차 작업자"로, 자신을 "전략가/검수자"로 역할 분담하는 워크플로를 만드세요',
      },
      {
        id: 'strategy-balanced-2',
        category: '3.6',
        text: 'AI 도구 3개를 마스터하고 팀 내 "AI 활용 가이드" 역할을 자처하세요',
      },
    ],
  },
  {
    id: 'strategy-automation-learn',
    title: '자동화 마스터 되기',
    description: 'AI와 자동화 도구를 익혀 효율성을 극대화하세요',
    category: 'strategy',
    relatedDimension: 'pattern',
    condition: (dimensions) => dimensions.pattern >= 3.5 || dimensions.dataReliance >= 3.5,
    tasks: [
      {
        id: 'strategy-automation-learn-1',
        category: '3.7',
        text: '매달 1개의 새로운 AI/자동화 도구를 학습하고 업무에 적용하세요',
      },
      {
        id: 'strategy-automation-learn-2',
        category: '3.8',
        text: '자동화된 작업의 "품질 검수자" 역할로 전문성을 키우세요',
      },
    ],
  },
];

export function generateActionPlan(
  dimensions: Record<DimensionKey, number>
): ActionPlan {
  // 조건에 맞는 모듈들을 선택
  const selectedModules = actionPlanModules.filter((module) =>
    module.condition(dimensions)
  );

  // 카테고리별로 정렬 (risk -> weakness -> strategy)
  const categoryOrder = { risk: 1, weakness: 2, strategy: 3 };
  selectedModules.sort((a, b) => categoryOrder[a.category] - categoryOrder[b.category]);

  // 모든 태스크를 평탄화
  const allTasks = selectedModules.flatMap((module) => module.tasks);

  return {
    modules: selectedModules,
    allTasks,
  };
}

export function getCategoryTitle(category: 'risk' | 'weakness' | 'strategy'): string {
  const titles = {
    risk: '1단계: 위험 제거 (Risk)',
    weakness: '2단계: 약점 보완 (Weakness)',
    strategy: '3단계: 전략 수립 (Strategy)',
  };
  return titles[category];
}

export function getCategoryDescription(category: 'risk' | 'weakness' | 'strategy'): string {
  const descriptions = {
    risk: 'AI에게 빼앗길 수 있는 업무를 최소화하고 방어 체계를 구축하세요',
    weakness: '부족한 역량을 보완하여 AI가 대체할 수 없는 영역을 넓히세요',
    strategy: '당신의 강점을 활용하여 AI와 협업하는 전략을 수립하세요',
  };
  return descriptions[category];
}
