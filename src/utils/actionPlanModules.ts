import { ActionPlanModule, ActionPlan, DimensionKey } from '@/types';

// 각 차원과 상황에 맞는 액션 플랜 모듈들
export const actionPlanModules: ActionPlanModule[] = [
  // === 위험 제거 (Risk) 모듈 ===
  {
    id: 'risk-pattern-high',
    title: '반복 업무 줄이기',
    description: '똑같은 일 반복하면 AI가 대신해요',
    category: 'risk',
    relatedDimension: 'pattern',
    condition: (dimensions) => dimensions.pattern >= 3.5,
    tasks: [
      {
        id: 'risk-pattern-high-1',
        category: '할 일 1',
        text: '매주 반복하는 일 5개 적기 (예: 보고서 쓰기, 엑셀 정리하기)',
      },
      {
        id: 'risk-pattern-high-2',
        category: '할 일 2',
        text: 'ChatGPT로 그 중 1개 대신 해보기 (시간 얼마나 절약되는지 체크)',
      },
      {
        id: 'risk-pattern-high-3',
        category: '할 일 3',
        text: 'AI가 못하는 일 찾기 (사람 설득, 협상, 눈치 보기 같은 거)',
      },
    ],
  },
  {
    id: 'risk-data-high',
    title: '숫자만 보지 말기',
    description: '데이터만 다루면 AI가 더 잘해요',
    category: 'risk',
    relatedDimension: 'dataReliance',
    condition: (dimensions) => dimensions.dataReliance >= 3.5,
    tasks: [
      {
        id: 'risk-data-high-1',
        category: '할 일 1',
        text: '데이터 볼 때 "이게 실제로 무슨 의미인지" 한 줄 쓰기 (예: 매출↑ = 사람들이 좋아한다)',
      },
      {
        id: 'risk-data-high-2',
        category: '할 일 2',
        text: '숫자로 안 나오는 중요한 것 적기 (예: 고객 표정, 직원 사기, 회의 분위기)',
      },
    ],
  },

  // === 약점 보완 (Weakness) 모듈 ===
  {
    id: 'weak-creativity-low',
    title: '새로운 생각 연습',
    description: '새로운 아이디어 내는 게 어려우시죠?',
    category: 'weakness',
    relatedDimension: 'creativity',
    condition: (dimensions) => dimensions.creativity <= 2.5,
    tasks: [
      {
        id: 'weak-creativity-low-1',
        category: '할 일 1',
        text: '하루 5분 "말도 안 되는 조합" 생각하기 (예: 우산+피자 = 비 오는 날 배달 세트?)',
      },
      {
        id: 'weak-creativity-low-2',
        category: '할 일 2',
        text: 'AI가 만든 거 보고 "이렇게 바꾸면 재밌겠다" 1개 생각해보기',
      },
      {
        id: 'weak-creativity-low-3',
        category: '할 일 3',
        text: '일주일에 1번 "만약에 이렇게 하면?" 상상하기 (일하는 방식 완전히 바꿔보기)',
      },
    ],
  },
  {
    id: 'weak-creativity-medium',
    title: '아이디어 키우기',
    description: '더 재미있는 생각 만들어봐요',
    category: 'weakness',
    relatedDimension: 'creativity',
    condition: (dimensions) => dimensions.creativity > 2.5 && dimensions.creativity < 3.5,
    tasks: [
      {
        id: 'weak-creativity-medium-1',
        category: '할 일 1',
        text: 'AI 아이디어 2개 섞어서 새로운 아이디어 만들기 (A+B=C)',
      },
      {
        id: 'weak-creativity-medium-2',
        category: '할 일 2',
        text: '다른 업종 성공 사례 보고 내 일에 적용해보기 (예: 카페 → 우리 회사)',
      },
    ],
  },
  {
    id: 'weak-empathy-low',
    title: '사람 마음 읽기',
    description: '다른 사람 감정 이해하는 게 AI는 못해요',
    category: 'weakness',
    relatedDimension: 'empathy',
    condition: (dimensions) => dimensions.empathy <= 2.5,
    tasks: [
      {
        id: 'weak-empathy-low-1',
        category: '할 일 1',
        text: '매일 만난 사람 1명 "기분 어때 보였는지" 메모하기',
      },
      {
        id: 'weak-empathy-low-2',
        category: '할 일 2',
        text: '보고서 볼 때 "이게 사람들한테 어떤 영향 줄까?" 한 줄 쓰기',
      },
      {
        id: 'weak-empathy-low-3',
        category: '할 일 3',
        text: '일주일에 1번 동료랑 일 얘기 말고 다른 대화하기 (커피 마시면서)',
      },
    ],
  },
  {
    id: 'weak-empathy-medium',
    title: '공감력 키우기',
    description: '사람 마음 잘 읽는 능력 더 키워요',
    category: 'weakness',
    relatedDimension: 'empathy',
    condition: (dimensions) => dimensions.empathy > 2.5 && dimensions.empathy < 3.5,
    tasks: [
      {
        id: 'weak-empathy-medium-1',
        category: '할 일 1',
        text: '상대방이 말 안 하는 진짜 원하는 것 찾기 (AI는 이거 못함)',
      },
      {
        id: 'weak-empathy-medium-2',
        category: '할 일 2',
        text: '사람들 싸울 때 중간에서 조율해보기 (경험 쌓기)',
      },
    ],
  },

  // === 전략 수립 (Strategy) 모듈 ===
  {
    id: 'strategy-creativity-high',
    title: '아이디어 강점 살리기',
    description: '새로운 생각 잘하시네요! 이걸 활용하세요',
    category: 'strategy',
    relatedDimension: 'creativity',
    condition: (dimensions) => dimensions.creativity >= 3.5,
    tasks: [
      {
        id: 'strategy-creativity-high-1',
        category: '할 일 1',
        text: 'AI한테 아이디어 100개 만들라고 하고, 내가 제일 좋은 거 고르기',
      },
      {
        id: 'strategy-creativity-high-2',
        category: '할 일 2',
        text: '팀에서 "새 아이디어 담당"으로 자리 잡기 (한 달에 1번 새 제안하기)',
      },
    ],
  },
  {
    id: 'strategy-empathy-high',
    title: '공감 능력 써먹기',
    description: '사람 마음 잘 읽으시네요! 이게 무기예요',
    category: 'strategy',
    relatedDimension: 'empathy',
    condition: (dimensions) => dimensions.empathy >= 3.5,
    tasks: [
      {
        id: 'strategy-empathy-high-1',
        category: '할 일 1',
        text: 'AI 보고서에 "사람들 입장에선 이런 느낌" 추가하는 역할 맡기',
      },
      {
        id: 'strategy-empathy-high-2',
        category: '할 일 2',
        text: '고객이랑 직접 대화하는 일 늘리기 (AI는 못하는 거니까)',
      },
    ],
  },
  {
    id: 'strategy-balanced',
    title: 'AI랑 팀 이루기',
    description: '전반적으로 괜찮아요. AI를 파트너로 쓰세요',
    category: 'strategy',
    relatedDimension: 'pattern',
    condition: (dimensions) =>
      dimensions.pattern <= 3.5 &&
      dimensions.creativity >= 2.5 &&
      dimensions.empathy >= 2.5,
    tasks: [
      {
        id: 'strategy-balanced-1',
        category: '할 일 1',
        text: 'AI한테 초안 만들라고 하고, 내가 검토하고 고치는 방식 만들기',
      },
      {
        id: 'strategy-balanced-2',
        category: '할 일 2',
        text: 'AI 도구 3개 능숙하게 다루기 (팀에서 "AI 잘 쓰는 사람" 되기)',
      },
    ],
  },
  {
    id: 'strategy-automation-learn',
    title: 'AI 도구 마스터하기',
    description: 'AI가 대신 일하게 만드는 법 배우세요',
    category: 'strategy',
    relatedDimension: 'pattern',
    condition: (dimensions) => dimensions.pattern >= 3.5 || dimensions.dataReliance >= 3.5,
    tasks: [
      {
        id: 'strategy-automation-learn-1',
        category: '할 일 1',
        text: '한 달에 AI 도구 1개씩 배우기 (ChatGPT, 자동화 툴 등)',
      },
      {
        id: 'strategy-automation-learn-2',
        category: '할 일 2',
        text: 'AI가 만든 결과 확인하는 전문가 되기 (틀린 거 찾아내기)',
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
    risk: '🛡️ 1단계: 위험한 것부터 없애기',
    weakness: '💪 2단계: 부족한 거 채우기',
    strategy: '🎯 3단계: 강점 활용하기',
  };
  return titles[category];
}

export function getCategoryDescription(category: 'risk' | 'weakness' | 'strategy'): string {
  const descriptions = {
    risk: 'AI한테 뺏길 수 있는 일 줄이고, 안전하게 지키기',
    weakness: '약한 부분 키워서 AI가 못 따라오게 만들기',
    strategy: '내가 잘하는 걸 더 잘 써먹기 (AI랑 같이 일하기)',
  };
  return descriptions[category];
}
