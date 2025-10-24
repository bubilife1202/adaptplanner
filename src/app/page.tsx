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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* 헤더 */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">AI 생존 지수</h1>
        </div>
      </header>

      {/* 메인 히어로 - Two Column */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* 왼쪽: 텍스트 */}
            <div>
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                AI 시대 필수 진단
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                AI가 당신의<br />
                <span className="text-blue-600">일자리를 빼앗기</span><br />
                전에
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                5분 진단으로 AI 대체 위험도를 정확히 파악하고<br />
                당신만의 맞춤형 생존 전략을 받아보세요
              </p>

              {progress.surveyCompleted ? (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/results"
                      className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
                    >
                      📊 진단 결과 보기
                    </Link>
                    <Link
                      href="/training"
                      className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
                    >
                      📝 생존 노트 보기
                    </Link>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('진단을 다시 시작하면 기존 데이터가 삭제됩니다.')) {
                        localStorage.removeItem('userProgress');
                        window.location.href = '/survey';
                      }
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    새로 진단하기
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/survey"
                    className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-xl text-lg font-bold hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl group"
                  >
                    <span>무료로 진단 시작하기</span>
                    <span className="arrow-animate text-2xl">→</span>
                  </Link>
                  <div className="mt-6 flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600">⏱</span>
                      <span>소요시간 5분</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">💯</span>
                      <span>완전 무료</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-purple-600">🔒</span>
                      <span>개인정보 안전</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* 오른쪽: 시각적 요소 */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square">
                {/* 배경 그라디언트 원 */}
                <div className="absolute inset-0 animated-gradient rounded-full opacity-20 blur-3xl"></div>

                {/* 메인 원형 */}
                <div className="absolute inset-0 flex items-center justify-center float-animation">
                  <div className="w-80 h-80 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl flex items-center justify-center relative overflow-hidden">
                    {/* 내부 텍스트 */}
                    <div className="text-white text-center z-10">
                      <div className="text-7xl font-bold mb-2">AI</div>
                      <div className="text-xl">vs</div>
                      <div className="text-4xl font-bold mt-2">YOU</div>
                    </div>

                    {/* 회전하는 원형 요소들 */}
                    <div className="absolute inset-0">
                      <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/20 rounded-full pulse-scale"></div>
                      <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-white/20 rounded-full pulse-scale" style={{animationDelay: '1s'}}></div>
                      <div className="absolute bottom-1/3 left-1/3 w-10 h-10 bg-white/20 rounded-full pulse-scale" style={{animationDelay: '2s'}}></div>
                    </div>
                  </div>
                </div>

                {/* 떠다니는 카드들 */}
                <div className="absolute top-10 -left-10 w-32 h-24 bg-white rounded-lg shadow-xl p-4 float-animation" style={{animationDelay: '0.5s'}}>
                  <div className="text-3xl mb-1">📊</div>
                  <div className="text-xs font-semibold text-gray-700">데이터 분석</div>
                </div>
                <div className="absolute bottom-20 -right-10 w-32 h-24 bg-white rounded-lg shadow-xl p-4 float-animation" style={{animationDelay: '1.5s'}}>
                  <div className="text-3xl mb-1">🎯</div>
                  <div className="text-xs font-semibold text-gray-700">맞춤 전략</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 인터랙티브 프로세스 카드 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h3 className="text-4xl font-bold text-center text-gray-900 mb-4">
            간단한 3단계로 완료
          </h3>
          <p className="text-center text-gray-600 mb-16 text-lg">
            복잡한 절차 없이 누구나 쉽게 진단할 수 있습니다
          </p>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {/* 카드 1 */}
            <div className="interactive-card bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative group">
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                1
              </div>
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">📝</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">30개 질문 답변</h4>
              <p className="text-gray-600 mb-4">
                당신의 업무 스타일을 정확히 파악하는 간단한 질문들
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>패턴성 분석</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>창의성 측정</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>공감력 평가</span>
                </li>
              </ul>

              {/* 화살표 */}
              <div className="hidden md:block absolute -right-8 top-1/2 transform -translate-y-1/2 text-4xl text-gray-300 group-hover:text-blue-600 transition-colors">
                →
              </div>
            </div>

            {/* 카드 2 */}
            <div className="interactive-card bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative group">
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                2
              </div>
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">📊</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">AI 대체 지수 확인</h4>
              <p className="text-gray-600 mb-4">
                4가지 차원 분석으로 정확한 위험도를 측정합니다
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>레이더 차트 시각화</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>위험/안전 영역 분석</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>맞춤형 피드백</span>
                </li>
              </ul>

              {/* 화살표 */}
              <div className="hidden md:block absolute -right-8 top-1/2 transform -translate-y-1/2 text-4xl text-gray-300 group-hover:text-purple-600 transition-colors">
                →
              </div>
            </div>

            {/* 카드 3 */}
            <div className="interactive-card bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative group">
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                3
              </div>
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">🎯</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">맞춤 전략 실행</h4>
              <p className="text-gray-600 mb-4">
                당신만을 위한 구체적인 행동 계획을 제공합니다
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>위험 제거 방법</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>약점 보완 전략</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>실천 가능한 과제</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 왜 필요한가 */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold text-center text-gray-900 mb-4">
              왜 지금 진단이 필요한가요?
            </h3>
            <p className="text-center text-gray-600 mb-16 text-lg">
              AI 시대, 준비하지 않으면 도태됩니다
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">🔄</div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">반복 업무 많으신가요?</h4>
                <p className="text-gray-600">
                  정형화된 업무일수록 AI 대체 위험이 높습니다. 지금 확인하세요.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">💪</div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">경쟁력이 걱정되시나요?</h4>
                <p className="text-gray-600">
                  AI가 못하는 영역을 찾아 차별화하는 전략이 필요합니다.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">📋</div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">실질적인 대응책 필요하신가요?</h4>
                <p className="text-gray-600">
                  막연한 걱정 대신, 구체적인 행동 계획을 받아보세요.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">🔐</div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">개인정보가 걱정되시나요?</h4>
                <p className="text-gray-600">
                  모든 데이터는 브라우저에만 저장되며 외부로 전송되지 않습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            지금 바로 시작하세요
          </h3>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            5분이면 당신의 미래를 준비할 수 있습니다<br />
            이미 수천 명이 진단을 완료했습니다
          </p>
          {!progress.surveyCompleted && (
            <Link
              href="/survey"
              className="inline-flex items-center gap-3 px-12 py-5 bg-white text-blue-600 rounded-xl text-lg font-bold hover:bg-gray-100 transition-colors shadow-2xl group"
            >
              <span>무료 진단 시작하기</span>
              <span className="arrow-animate text-2xl">→</span>
            </Link>
          )}
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-sm">© 2024 AI 생존 지수. All rights reserved.</p>
            <p className="text-xs mt-2">모든 데이터는 브라우저에만 저장되며 외부로 전송되지 않습니다.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
