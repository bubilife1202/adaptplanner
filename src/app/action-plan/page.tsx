'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { UserProgress } from '@/types';
import { getCategoryTitle, getCategoryDescription } from '@/utils/actionPlanModules';
import ActionTaskDetail from '@/components/ActionTaskDetail';

export default function ActionPlanPage() {
  const router = useRouter();
  const [progress, , isLoading] = useLocalStorage<UserProgress>('userProgress', {
    surveyCompleted: false,
    surveyAnswers: [],
    checklist: [],
    notes: [],
  });

  useEffect(() => {
    if (!isLoading && !progress.surveyCompleted) {
      router.push('/');
    }
  }, [isLoading, progress.surveyCompleted, router]);

  if (isLoading || !progress.actionPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">액션 플랜을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const { actionPlan } = progress;

  // 카테고리별로 모듈 그룹화
  const groupedModules = {
    risk: actionPlan.modules.filter((m) => m.category === 'risk'),
    weakness: actionPlan.modules.filter((m) => m.category === 'weakness'),
    strategy: actionPlan.modules.filter((m) => m.category === 'strategy'),
  };

  const categoryColors = {
    risk: 'bg-red-50 border-red-200',
    weakness: 'bg-yellow-50 border-yellow-200',
    strategy: 'bg-green-50 border-green-200',
  };

  const categoryEmojis = {
    risk: '🛡️',
    weakness: '💪',
    strategy: '🎯',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 상단 헤더 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Link href="/" className="inline-block">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              AI 생존 지수
            </h1>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-5xl mx-auto">
          {/* 페이지 제목 */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              당신만의 맞춤 액션 플랜
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              진단 결과로 만든 당신의 생존 전략이에요
            </p>
          </div>

          {/* 안내 카드 */}
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex items-start gap-3">
              <div className="text-xl sm:text-2xl flex-shrink-0">💡</div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">어떻게 만들어졌나요?</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  당신의 답변을 분석해서
                  <strong className="text-gray-900"> 딱 필요한 것만</strong> 골랐어요.
                  다른 사람은 완전히 다른 플랜을 받아요.
                  하나씩 실천하고 노트에 기록하세요!
                </p>
              </div>
            </div>
          </div>

          {/* 오늘 당장 할 것 TOP 3 */}
          <div className="mb-10">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl shadow-2xl p-6 sm:p-8 text-white mb-6">
              <div className="text-center mb-6">
                <div className="text-4xl sm:text-5xl mb-4">⚡</div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                  오늘 당장 할 것 TOP 3
                </h3>
                <p className="text-red-100 text-sm sm:text-base">
                  나머지는 나중에! 이 3가지만 오늘 하세요
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {actionPlan.allTasks.slice(0, 3).map((task, index) => (
                <div
                  key={task.id}
                  className="bg-white rounded-xl shadow-xl p-5 sm:p-6 border-4 border-orange-200"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                        {task.text}
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                          ⏰ 소요: {index === 0 ? '30분' : index === 1 ? '10분' : '5분'}
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          🎯 난이도: {index === 0 ? '⭐⭐ 쉬움' : '⭐ 매우 쉬움'}
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                          📈 효과: 즉시 체감
                        </span>
                      </div>
                    </div>
                  </div>
                  <ActionTaskDetail task={task} />
                </div>
              ))}
            </div>

            {/* 완료 체크 */}
            <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 sm:p-8 border-2 border-green-200 text-center">
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                ✨ 이 3가지만 오늘 하세요
              </h4>
              <p className="text-gray-700 mb-4">
                나머지는 내일부터! 작은 성공이 큰 변화를 만듭니다.
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold text-lg shadow-lg">
                <span>□ □ □</span>
                <span>3개 완료 체크</span>
              </div>
            </div>
          </div>

          {/* 구분선 */}
          <div className="relative mb-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-2 text-sm font-bold text-gray-600 rounded-full border-2 border-gray-300">
                📅 이번 주 / 이번 달 할 것
              </span>
            </div>
          </div>

          {/* 액션 플랜 카테고리별 */}
          {(['risk', 'weakness', 'strategy'] as const).map((category) => {
            const modules = groupedModules[category];
            if (modules.length === 0) return null;

            return (
              <div key={category} className="mb-8">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl sm:text-2xl">{categoryEmojis[category]}</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                      {getCategoryTitle(category)}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 ml-7 sm:ml-9">{getCategoryDescription(category)}</p>
                </div>

                <div className="space-y-4">
                  {modules.map((module) => (
                    <div
                      key={module.id}
                      className={`bg-white rounded-xl shadow-md border-2 p-4 sm:p-6 ${categoryColors[category]}`}
                    >
                      <div className="mb-4">
                        <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                          {module.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600">{module.description}</p>
                      </div>

                      <div className="space-y-3">
                        {module.tasks.map((task) => (
                          <ActionTaskDetail key={task.id} task={task} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* 요약 */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-6 sm:p-8 text-white mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-bold mb-3">📋 전체 과제 수</h3>
            <div className="text-3xl sm:text-4xl font-bold mb-4">
              {actionPlan.allTasks.length}개 과제
            </div>
            <p className="text-sm sm:text-base text-blue-100">
              하나씩 실천하며 체크하고,
              생존 노트에 기록하세요!
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/training"
              className="w-full sm:w-auto text-center px-6 sm:px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-base sm:text-lg font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
            >
              생존 노트 시작하기 →
            </Link>
            <Link
              href="/results"
              className="w-full sm:w-auto text-center px-6 sm:px-8 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-lg text-base sm:text-lg font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
            >
              ← 진단 결과
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto text-center px-6 sm:px-8 py-4 bg-gray-100 text-gray-600 rounded-lg text-base sm:text-lg font-bold hover:bg-gray-200 transition-all shadow-lg hover:shadow-xl"
            >
              🏠 처음으로
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
