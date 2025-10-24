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
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">AI 생존 지수</h1>
        </div>
      </header>

      {/* 메인 히어로 */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              AI 시대,<br />당신의 직무는 안전한가요?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              5분 진단으로 AI 대체 위험도를 확인하고<br />
              맞춤형 생존 전략을 받아보세요
            </p>

            {progress.surveyCompleted ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/results" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl inline-block">
                    진단 결과 보기
                  </Link>
                  <Link href="/training" className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block">
                    생존 노트 보기
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
              <Link href="/survey" className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl inline-block text-lg">
                무료로 진단 시작하기 →
              </Link>
            )}

            <p className="mt-8 text-sm text-gray-500">
              ⏱ 소요시간 5분 · 💯 완전 무료 · 🔒 개인정보 안전
            </p>
          </div>
        </div>
      </section>

      {/* 3단계 프로세스 */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-16">
            간단한 3단계
          </h3>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">30개 질문 답변</h4>
              <p className="text-gray-600">
                당신의 업무 스타일을 정확히 파악하는 간단한 질문들
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">AI 대체 지수 확인</h4>
              <p className="text-gray-600">
                4가지 차원 분석으로 정확한 위험도 측정
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">맞춤 전략 실행</h4>
              <p className="text-gray-600">
                당신만을 위한 구체적인 행동 계획 제공
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 왜 필요한가 */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
              왜 지금 진단이 필요한가요?
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <h4 className="text-lg font-bold text-gray-900 mb-3">✓ 반복 업무 많으신가요?</h4>
                <p className="text-gray-600">
                  정형화된 업무일수록 AI 대체 위험이 높습니다. 지금 확인하세요.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <h4 className="text-lg font-bold text-gray-900 mb-3">✓ 경쟁력이 걱정되시나요?</h4>
                <p className="text-gray-600">
                  AI가 못하는 영역을 찾아 차별화하는 전략이 필요합니다.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <h4 className="text-lg font-bold text-gray-900 mb-3">✓ 실질적인 대응책 필요하신가요?</h4>
                <p className="text-gray-600">
                  막연한 걱정 대신, 구체적인 행동 계획을 받아보세요.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <h4 className="text-lg font-bold text-gray-900 mb-3">✓ 개인정보가 걱정되시나요?</h4>
                <p className="text-gray-600">
                  모든 데이터는 브라우저에만 저장되며 외부로 전송되지 않습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            지금 바로 시작하세요
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            5분이면 당신의 미래를 준비할 수 있습니다
          </p>
          {!progress.surveyCompleted && (
            <Link
              href="/survey"
              className="inline-block px-12 py-5 bg-white text-blue-600 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors shadow-xl"
            >
              무료 진단 시작하기 →
            </Link>
          )}
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-6 text-center text-sm">
          <p>© 2024 AI 생존 지수. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
