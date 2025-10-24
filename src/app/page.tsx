'use client';

import Link from 'next/link';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { UserProgress } from '@/types';

export default function Home() {
  const [progress] = useLocalStorage<UserProgress>('userProgress', {
    surveyCompleted: false,
    surveyAnswers: [],
    checklist: [],
    notes: [],
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              AI 생존 지수
            </h1>
            <p className="text-xl text-gray-600">
              당신의 직무가 AI에게 대체될 위험도를 진단하고
              <br />
              맞춤형 생존 전략을 받아보세요
            </p>
          </div>

          {/* 메인 카드 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  이 앱은 무엇을 제공하나요?
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl mb-2">📊</div>
                    <h3 className="font-bold text-gray-900 mb-1">정확한 진단</h3>
                    <p className="text-sm text-gray-600">
                      30가지 질문으로 당신의 업무를 4가지 차원에서 분석합니다
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl mb-2">🎯</div>
                    <h3 className="font-bold text-gray-900 mb-1">맞춤형 전략</h3>
                    <p className="text-sm text-gray-600">
                      당신만을 위한 구체적인 행동 계획을 자동으로 생성합니다
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl mb-2">✅</div>
                    <h3 className="font-bold text-gray-900 mb-1">실천 도구</h3>
                    <p className="text-sm text-gray-600">
                      체크리스트와 생존 노트로 실제 발전을 추적합니다
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="text-3xl mb-2">🚀</div>
                    <h3 className="font-bold text-gray-900 mb-1">4단계 플로우</h3>
                    <p className="text-sm text-gray-600">
                      진단 → 분석 → 처방 → 훈련의 체계적인 과정을 제공합니다
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  어떻게 작동하나요?
                </h2>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">진단 (5분)</h3>
                      <p className="text-sm text-gray-600">
                        간단한 설문으로 당신의 업무 스타일을 분석합니다
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">분석 결과 확인</h3>
                      <p className="text-sm text-gray-600">
                        AI 대체 지수와 레이더 차트로 당신의 현재 상태를 시각화합니다
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">맞춤형 액션 플랜</h3>
                      <p className="text-sm text-gray-600">
                        당신의 약점과 강점을 기반으로 구체적인 행동 과제를 받습니다
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">실천 & 기록</h3>
                      <p className="text-sm text-gray-600">
                        과제를 수행하고 생존 노트에 기록하며 발전을 추적합니다
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA 버튼 */}
          <div className="text-center">
            {progress.surveyCompleted ? (
              <div className="space-y-4">
                <p className="text-gray-600 mb-4">
                  이미 진단을 완료하셨습니다. 결과를 다시 보거나 액션 플랜을 확인하세요.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link
                    href="/results"
                    className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-bold hover:bg-blue-700 transition-colors"
                  >
                    진단 결과 보기
                  </Link>
                  <Link
                    href="/training"
                    className="px-8 py-4 bg-green-600 text-white rounded-lg text-lg font-bold hover:bg-green-700 transition-colors"
                  >
                    생존 노트 보기
                  </Link>
                </div>
                <button
                  onClick={() => {
                    if (confirm('진단을 다시 시작하면 기존 데이터가 삭제됩니다. 계속하시겠습니까?')) {
                      localStorage.removeItem('userProgress');
                      window.location.href = '/survey';
                    }
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  새로 진단하기
                </button>
              </div>
            ) : (
              <Link
                href="/survey"
                className="inline-block px-12 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
              >
                지금 바로 시작하기 →
              </Link>
            )}
          </div>

          {/* 주의사항 */}
          <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-2">💡 이 앱의 특징</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 모든 데이터는 당신의 브라우저에만 저장됩니다 (개인정보 안전)</li>
              <li>• AI API를 사용하지 않으며, 정교한 로직으로 맞춤형 전략을 생성합니다</li>
              <li>• 완전히 무료이며 언제든지 사용할 수 있습니다</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
