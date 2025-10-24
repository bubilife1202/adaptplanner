'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { UserProgress } from '@/types';
import { getCategoryTitle, getCategoryDescription } from '@/utils/actionPlanModules';

export default function ActionPlanPage() {
  const router = useRouter();
  const [progress] = useLocalStorage<UserProgress>('userProgress', {
    surveyCompleted: false,
    surveyAnswers: [],
    checklist: [],
    notes: [],
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !progress.surveyCompleted) {
      router.push('/');
    }
  }, [mounted, progress.surveyCompleted, router]);

  if (!mounted || !progress.actionPlan) {
    return null;
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
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              당신을 위한 맞춤형 액션 플랜
            </h1>
            <p className="text-gray-600">
              진단 결과를 바탕으로 생성된 당신만의 생존 전략입니다
            </p>
          </div>

          {/* 안내 카드 */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">이 액션 플랜은 어떻게 만들어졌나요?</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  당신의 설문 답변을 분석하여, 수십 개의 액션 플랜 모듈 중
                  <strong className="text-gray-900"> 당신에게 필요한 것만</strong> 자동으로 선택되었습니다.
                  다른 사람은 완전히 다른 플랜을 받게 됩니다.
                  각 과제를 실천하고 생존 노트에 기록하세요.
                </p>
              </div>
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
                    <span className="text-2xl">{categoryEmojis[category]}</span>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {getCategoryTitle(category)}
                    </h2>
                  </div>
                  <p className="text-gray-600 ml-9">{getCategoryDescription(category)}</p>
                </div>

                <div className="space-y-4">
                  {modules.map((module) => (
                    <div
                      key={module.id}
                      className={`bg-white rounded-xl shadow-md border-2 p-6 ${categoryColors[category]}`}
                    >
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {module.title}
                        </h3>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </div>

                      <div className="space-y-3">
                        {module.tasks.map((task) => (
                          <div
                            key={task.id}
                            className="flex gap-3 p-4 bg-white rounded-lg border"
                          >
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {task.category}
                            </div>
                            <p className="text-gray-700 flex-1">{task.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* 요약 */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white mb-8">
            <h3 className="text-xl font-bold mb-3">📋 전체 과제 수</h3>
            <div className="text-4xl font-bold mb-4">
              {actionPlan.allTasks.length}개의 행동 과제
            </div>
            <p className="text-blue-100">
              각 과제를 하나씩 실천하며 체크리스트를 완성하고,
              생존 노트에 당신의 성장 과정을 기록하세요.
            </p>
          </div>

          {/* CTA */}
          <div className="flex gap-4 justify-center">
            <Link
              href="/training"
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-lg font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
            >
              생존 노트 시작하기 →
            </Link>
            <Link
              href="/results"
              className="px-8 py-4 bg-white text-gray-700 rounded-lg text-lg font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
            >
              ← 진단 결과 다시보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
