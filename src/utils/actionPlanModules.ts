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
        text: '반복 업무 찾아내기',
        why: 'AI는 반복적인 일을 가장 잘해요. 내가 매주 똑같이 하는 일을 먼저 알아야 그걸 AI한테 맡길 수 있어요.',
        howTo: [
          '노트에 이번 주 한 일 전부 적기',
          '그 중에서 "지난주에도 했던 것" 체크하기',
          '반복되는 일 5개 골라서 목록 만들기',
          '각각 얼마나 시간 걸리는지 옆에 적기'
        ],
        example: '예: 매주 월요일 회의록 정리, 매일 이메일 확인, 주간 보고서 작성, 데이터 엑셀 입력, 고객 문의 답변',
        aiPrompt: '나는 [직종]에서 일해요. 매주 반복적으로 하는 업무를 찾고 싶은데, 어떤 것들이 반복 업무인지 리스트로 정리해줘. 그리고 각 업무가 AI로 자동화 가능한지도 알려줘.'
      },
      {
        id: 'risk-pattern-high-2',
        category: '할 일 2',
        text: 'ChatGPT로 하나 대신해보기',
        why: 'AI가 정말 내 일을 대신할 수 있는지 직접 해봐야 알아요. 시간 절약되면 그 시간에 더 중요한 일 할 수 있어요.',
        howTo: [
          '위에서 찾은 반복 업무 중 제일 쉬운 거 1개 고르기',
          'ChatGPT 들어가서 "나 대신 이거 해줘"라고 요청',
          '결과물 받아서 내가 다듬기',
          '걸린 시간 측정 (전: ____분, 후: ____분)',
          '일주일 동안 매일 써보기'
        ],
        example: '예: "회의록을 보기 좋게 정리해줘. 중요한 결정사항, 액션 아이템, 다음 회의 날짜로 분류해서"',
        aiPrompt: '나는 매주 [업무명]을 해요. 이 업무를 ChatGPT가 대신하게 하려면 어떤 프롬프트를 써야 할까? 단계별로 알려줘.'
      },
      {
        id: 'risk-pattern-high-3',
        category: '할 일 3',
        text: 'AI가 못하는 일 찾기',
        why: 'AI가 못하는 일을 하는 게 생존 전략이에요. 내가 잘하는데 AI는 못하는 걸 찾아야 해요.',
        howTo: [
          '내 업무 중에서 "사람 설득", "눈치 보기", "분위기 파악" 같은 거 찾기',
          '고객이랑 직접 대화하거나 협상하는 일 리스트 만들기',
          '팀원이랑 갈등 조정하거나 동기부여하는 일 적기',
          '이런 일에 더 많은 시간 쓰기로 계획 세우기'
        ],
        example: '예: 고객 불만 직접 전화 받기, 팀원 동기부여 면담, 프로젝트 방향 제안, 새로운 거래처 발굴, 위기 상황 대처',
        aiPrompt: '[내 직업]에서 AI가 절대 대체 못하는 업무는 뭐야? 인간만 할 수 있는 일을 구체적으로 알려줘.'
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
        text: '데이터에 의미 붙이기',
        why: 'AI는 숫자 계산은 잘하지만 "이게 왜 중요한지"는 몰라요. 의미를 해석하는 건 사람만 할 수 있어요.',
        howTo: [
          '보고서나 데이터 하나 고르기',
          '숫자 옆에 "이게 의미하는 건..." 문장 쓰기',
          '"이 때문에 우리는...해야 한다" 결론 추가',
          '상사나 동료한테 설명하듯이 쓰기'
        ],
        example: '예: "매출 10% 증가 → 우리 신제품이 고객한테 통한다는 뜻 → 마케팅 예산 더 투입해야 함"',
        aiPrompt: '이 데이터가 있어: [데이터 붙여넣기]. 이게 비즈니스적으로 무슨 의미인지, 왜 중요한지, 어떤 액션을 취해야 하는지 쉽게 설명해줘.'
      },
      {
        id: 'risk-data-high-2',
        category: '할 일 2',
        text: '숫자 밖의 것 관찰하기',
        why: '데이터에 안 나오는 게 더 중요할 때가 많아요. 현장 분위기, 고객 표정 같은 걸 읽는 게 진짜 능력이에요.',
        howTo: [
          '회의할 때 사람들 표정 관찰하기',
          '고객 만날 때 말투, 태도 메모하기',
          '팀 분위기 느낌 적어보기',
          '이런 관찰을 보고서에 추가하기'
        ],
        example: '예: "매출은 올랐지만 고객 센터 직원들 표정이 안 좋음 → 뭔가 문제 있을 수 있음"',
        aiPrompt: '데이터에는 안 나오지만 현장에서 관찰해야 할 중요한 신호들이 뭐가 있을까? [내 업종]에서 놓치면 안 되는 비언어적 신호를 알려줘.'
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
        text: '말도 안 되는 조합하기',
        why: '창의성은 근육처럼 연습하면 늘어요. 처음엔 억지로라도 새로운 연결을 만들어야 해요.',
        howTo: [
          '아침에 일어나면 눈에 보이는 물건 2개 고르기',
          '그 둘을 억지로 합쳐보기 (예: 우산+피자)',
          '"이게 뭐에 쓸모 있을까?" 생각해보기',
          '5분만 투자, 매일 하기'
        ],
        example: '예: "우산+피자 = 비 오는 날 배달하면 우산이 덮개 역할? 아니면 우산 모양 피자?" → 말이 안 돼도 OK!',
        aiPrompt: '창의성 훈련을 하고 싶어. 서로 전혀 관계없는 단어 2개 줘. 그리고 그걸 합쳐서 새로운 아이디어를 만드는 방법을 알려줘.'
      },
      {
        id: 'weak-creativity-low-2',
        category: '할 일 2',
        text: 'AI 결과를 더 재밌게 바꾸기',
        why: 'AI가 만든 걸 그대로 쓰면 창의성이 안 늘어요. AI 답을 보고 "더 재밌게 만들 순 없을까?" 생각하는 게 훈련이에요.',
        howTo: [
          'ChatGPT한테 뭔가 만들어달라고 하기',
          '결과물 보고 "이걸 더 엉뚱하게 하려면?" 생각',
          '1개만이라도 바꿔보기',
          '왜 더 좋은지 설명해보기'
        ],
        example: '예: AI가 "고객 감사 메일" 초안 줌 → "여기에 농담 하나 추가하면?" → 훨씬 기억에 남을 듯',
        aiPrompt: '이 아이디어를 더 창의적이고 독특하게 만들려면 어떻게 해야 할까? [아이디어 설명]. 5가지 방법 알려줘.'
      },
      {
        id: 'weak-creativity-low-3',
        category: '할 일 3',
        text: '일하는 방식 뒤집어보기',
        why: '늘 하던 대로 하면 새로운 생각 안 나와요. 일부러 다르게 해보면 아이디어가 생겨요.',
        howTo: [
          '일주일에 1번, 금요일에 하기',
          '"만약 이 일을 완전히 반대로 하면?" 상상',
          '종이에 적어보기',
          '실제로 해볼 수 있는지 생각해보기'
        ],
        example: '예: "보고서를 글로 쓰지 말고 그림으로 그리면?" "회의를 앉아서 하지 말고 걸으면서 하면?"',
        aiPrompt: '[내 업무]를 완전히 새로운 방식으로 하려면 어떻게 해야 할까? 기존 방식의 정반대로 하는 아이디어를 5가지 줘.'
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
        text: 'AI 아이디어 섞기',
        why: '좋은 아이디어는 기존 아이디어를 새롭게 조합한 거예요. AI한테 여러 개 받아서 섞는 게 효율적이에요.',
        howTo: [
          'ChatGPT한테 같은 질문 3번 다르게 하기',
          '3개 답변 중 마음에 드는 부분만 골라내기',
          '그걸 합쳐서 새로운 버전 만들기',
          '내 스타일로 다듬기'
        ],
        example: '예: AI 답변1의 시작 + 답변2의 중간 + 답변3의 마무리 = 완전히 새로운 아이디어',
        aiPrompt: '[문제]에 대한 해결책을 3가지 완전히 다른 방식으로 제안해줘. 각각 다른 업종의 사례를 참고해서.'
      },
      {
        id: 'weak-creativity-medium-2',
        category: '할 일 2',
        text: '다른 업종 베끼기',
        why: '다른 업종의 성공 사례를 내 일에 적용하면 혁신이 돼요. "저기서 저렇게 했는데 우리도 할 수 있지 않을까?"',
        howTo: [
          '완전히 다른 업종 뉴스 1개 읽기 (주 1회)',
          '"이거 우리한테 적용하면?" 생각하기',
          '동료한테 아이디어 말해보기',
          '작은 것부터 시도해보기'
        ],
        example: '예: 카페의 "단골 스탬프" → 우리 회사 고객 로열티 프로그램에 적용?',
        aiPrompt: '[다른 업종]에서 최근 성공한 혁신 사례를 알려줘. 그걸 [내 업종]에 어떻게 적용할 수 있을지 아이디어 줘.'
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
        text: '매일 1명 관찰하기',
        why: '공감은 관찰에서 시작해요. 상대방 기분을 읽는 연습을 하면 점점 잘하게 돼요.',
        howTo: [
          '오늘 만난 사람 중 1명 고르기',
          '"오늘 저 사람 기분 어때 보였지?" 메모',
          '왜 그렇게 보였는지 이유 적기',
          '저녁에 5분만 투자'
        ],
        example: '예: "팀장님 오늘 표정 안 좋았음. 말도 적었고. 아마 위에서 압박 받으신 듯"',
        aiPrompt: '사람의 감정 상태를 읽는 법을 배우고 싶어. 표정, 말투, 행동에서 어떤 신호를 봐야 할까? 초보자를 위한 가이드 줘.'
      },
      {
        id: 'weak-empathy-low-2',
        category: '할 일 2',
        text: '숫자 뒤의 사람 생각하기',
        why: '데이터는 그냥 숫자지만 그 뒤에는 진짜 사람이 있어요. 그걸 생각하면 더 좋은 결정을 할 수 있어요.',
        howTo: [
          '보고서 볼 때 "이게 누구한테 영향 줄까?" 생각',
          '숫자 하나마다 "이게 사람들한테 뭘 의미할까?" 쓰기',
          '회의에서 이렇게 말해보기',
          '점점 습관 만들기'
        ],
        example: '예: "매출 10% 증가" → "우리 직원들 보너스 받을 수 있겠네" or "고객들이 우리 제품 만족한다는 뜻"',
        aiPrompt: '이 비즈니스 지표가 실제 사람들(직원, 고객, 파트너)한테 어떤 영향을 미치는지 설명해줘. [지표 설명]'
      },
      {
        id: 'weak-empathy-low-3',
        category: '할 일 3',
        text: '일 말고 다른 대화하기',
        why: '일 얘기만 하면 관계가 안 깊어져요. 사람을 이해하려면 그 사람에 대해 알아야 해요.',
        howTo: [
          '일주일에 1번, 동료랑 커피 마시기',
          '일 얘기 금지하고 다른 얘기하기',
          '취미, 주말 계획, 요즘 고민 물어보기',
          '진심으로 들어주기'
        ],
        example: '예: "요즘 뭐 재밌는 거 있어요?" "주말에 뭐 하셨어요?" → 그 사람 더 이해하게 됨',
        aiPrompt: '동료와 친해지기 위한 대화 주제를 추천해줘. 너무 사적이지 않으면서도 서로 알아갈 수 있는 질문 10가지.'
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
        text: '말 안 하는 것 찾기',
        why: '진짜 프로는 상대방이 말 안 한 것을 알아채요. AI는 말한 것만 이해하지만 사람은 침묵도 읽을 수 있어요.',
        howTo: [
          '회의나 대화 중에 "뭔가 불편해 보이는 사람" 찾기',
          '무슨 말을 안 하고 있는지 생각해보기',
          '나중에 조용히 물어보기 "혹시 ~때문에 불편하셨어요?"',
          '맞으면 신뢰 쌓임, 틀려도 배움'
        ],
        example: '예: 회의에서 계속 침묵하는 팀원 → "혹시 이 방향에 동의 안 하시는 건가?" → 진짜 의견 들음',
        aiPrompt: '회의나 대화에서 사람들이 불편함을 느끼지만 말하지 않는 신호들이 뭐가 있을까? 비언어적 신호 리스트 줘.'
      },
      {
        id: 'weak-empathy-medium-2',
        category: '할 일 2',
        text: '갈등 중재해보기',
        why: '갈등 중재는 최고의 공감력 훈련이에요. 양쪽 입장을 다 이해해야 하니까요.',
        howTo: [
          '팀에서 의견 충돌 생기면 자원하기',
          '각자 입장 따로 듣기',
          '양쪽 말을 정리해서 전달하기',
          '공통점 찾아서 해결책 제시'
        ],
        example: '예: A가 "빨리 해야 해" vs B가 "꼼꼼하게 해야 해" → "둘 다 품질 좋은 결과 원하시는 거죠. 단계별로 나눠서 하면 어때요?"',
        aiPrompt: '두 사람이 의견 충돌할 때 중재하는 방법을 알려줘. 양쪽 모두 만족시킬 수 있는 대화 기술과 질문들을 구체적으로 알려줘.'
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
        text: 'AI로 아이디어 100배 늘리기',
        why: '창의력이 강점이면 AI를 아이디어 발전기로 써야 해요. AI가 100개 만들면 나는 최고를 고르는 큐레이터 역할.',
        howTo: [
          'ChatGPT한테 "~에 대한 아이디어 50개 줘" 요청',
          '그 중 마음에 드는 거 5개 고르기',
          '그 5개를 내 스타일로 개선하기',
          '최종 1개를 팀에 제안하기'
        ],
        example: '예: "고객 이탈 줄이는 방법 50개" → 그 중 3개 골라서 → 우리 상황에 맞게 변형 → 실행',
        aiPrompt: '[주제]에 대한 독창적이고 실행 가능한 아이디어를 50개 줘. 각각 한 문장으로. 업종은 [내 업종]이야.'
      },
      {
        id: 'strategy-creativity-high-2',
        category: '할 일 2',
        text: '팀의 아이디어 담당 되기',
        why: '강점을 공식 역할로 만들면 나의 가치가 명확해져요. "새로운 아이디어는 저한테 물어보세요"',
        howTo: [
          '한 달에 1번 "아이디어 데이" 만들기',
          '팀 회의에서 "새로운 제안" 코너 만들기',
          '작은 것부터 시작 (회의 방식, 업무 개선 등)',
          '성공하면 범위 넓히기'
        ],
        example: '예: 매달 마지막 금요일 = 혁신 아이디어 공유의 날. 작은 거라도 시도 → 팀의 혁신 리더 됨',
        aiPrompt: '팀에서 혁신 제안자로 자리잡고 싶어. 어떻게 시작하고, 어떤 아이디어를 먼저 제안해야 신뢰를 쌓을 수 있을까?'
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
        text: 'AI 결과에 사람 마음 추가하기',
        why: 'AI는 정확하지만 차가워요. 당신이 따뜻함을 더하면 완벽해져요.',
        howTo: [
          'AI가 만든 보고서나 메일 받기',
          '읽는 사람 입장에서 다시 읽기',
          '"이 부분이 오해받을 수 있겠네" 찾기',
          '부드럽게 표현 바꾸거나 설명 추가'
        ],
        example: '예: AI 고객 답변 "귀하의 요청은 불가능합니다" → "고객님 요청 이해했습니다. 현재는 어렵지만 이런 대안은 어떨까요?"',
        aiPrompt: '이 메시지를 더 공감적이고 따뜻하게 바꿔줘. 내용은 같지만 받는 사람이 기분 나쁘지 않게. [메시지 내용]'
      },
      {
        id: 'strategy-empathy-high-2',
        category: '할 일 2',
        text: '고객 직접 만나는 역할 맡기',
        why: 'AI는 고객을 절대 직접 못 만나요. 대면 소통이 필요한 역할은 안전해요.',
        howTo: [
          '팀에 "고객 인터뷰 제가 할게요" 자원하기',
          '고객 불만 대응 맡기',
          'VIP 고객 담당자 되기',
          '현장 미팅 적극 참여하기'
        ],
        example: '예: "저는 고객 만나는 걸 좋아해요" → 점점 고객 관계 전문가로 포지셔닝',
        aiPrompt: '[내 직종]에서 고객과의 직접 소통이 특히 중요한 상황은 언제일까? 그리고 어떻게 하면 고객 관계 전문가로 인정받을 수 있을까?'
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
        text: 'AI는 초안, 나는 검수',
        why: 'AI한테 80%는 맡기고 나는 마지막 20% 핵심만 하면 효율 10배 올라요.',
        howTo: [
          '보고서, 이메일 같은 거 AI한테 먼저 만들라고 하기',
          '내가 "톤 조정", "핵심 추가", "실수 고치기" 역할',
          '"이 문서는 AI+내가 함께 만듦" 자신있게 말하기',
          '시간 아낀 거로 더 중요한 일 하기'
        ],
        example: '예: 주간 보고서 - AI가 데이터 정리 → 내가 해석과 제안 추가 → 30분 → 5분으로 단축',
        aiPrompt: '[문서 종류]의 초안을 만들어줘. 나중에 내가 검토하고 수정할 거니까 일단 기본 구조와 내용부터 작성해줘. [필요한 정보]'
      },
      {
        id: 'strategy-balanced-2',
        category: '할 일 2',
        text: 'AI 도구 3개 마스터',
        why: 'AI 잘 쓰는 사람이 되면 팀에서 가치 올라가요. "AI 문제는 저한테 물어보세요"',
        howTo: [
          'ChatGPT, Gemini, Claude 중 2개 골라서 매일 써보기',
          '각 도구 장단점 익히기',
          '팀원한테 사용법 알려주기',
          '"AI 활용 팁" 공유 문서 만들기'
        ],
        example: '예: ChatGPT는 글쓰기, Gemini는 검색, Claude는 분석 → 상황별로 최적 도구 추천',
        aiPrompt: 'ChatGPT, Claude, Gemini의 차이점과 각각 어떤 상황에 제일 좋은지 알려줘. [내 업무] 하는 사람 기준으로.'
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
        text: '매달 새 AI 도구 배우기',
        why: 'AI 도구는 계속 나와요. 먼저 배우는 사람이 유리해요. 1년이면 12개 마스터!',
        howTo: [
          '매달 1일에 새 AI 도구 1개 고르기',
          '유튜브나 블로그에서 튜토리얼 보기 (30분)',
          '업무에 바로 적용해보기',
          '한 달 동안 계속 써보기'
        ],
        example: '예: 1월=Notion AI, 2월=Canva AI, 3월=Zapier... → 나만의 AI 도구 세트 구축',
        aiPrompt: '[내 직종]에서 유용한 AI 도구를 추천해줘. 초보자도 쉽게 배울 수 있고 바로 업무에 쓸 수 있는 거로. 각각 어떤 일에 쓰는지도 알려줘.'
      },
      {
        id: 'strategy-automation-learn-2',
        category: '할 일 2',
        text: 'AI 결과 검증 전문가 되기',
        why: 'AI는 실수해요. 그걸 찾아내는 사람이 필요해요. 이게 새로운 직업이 될 수도 있어요.',
        howTo: [
          'AI가 만든 것 꼼꼼히 확인하는 습관 만들기',
          '어떤 종류의 실수를 자주 하는지 패턴 파악',
          '"AI 검수 체크리스트" 만들기',
          '동료들한테 알려주기'
        ],
        example: '예: ChatGPT는 숫자 틀릴 때 많음 → 숫자 나오면 항상 확인 → 실수 0건',
        aiPrompt: 'AI가 자주 하는 실수 유형을 알려줘. 그리고 그걸 체크하는 검증 방법도 알려줘. [AI 사용 분야]에서.'
      },
    ],
  },
];

export function generateActionPlan(
  dimensions: Record<DimensionKey, number>
): ActionPlan {
  const selectedModules = actionPlanModules.filter((module) =>
    module.condition(dimensions)
  );

  const categoryOrder = { risk: 1, weakness: 2, strategy: 3 };
  selectedModules.sort((a, b) => categoryOrder[a.category] - categoryOrder[b.category]);

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
