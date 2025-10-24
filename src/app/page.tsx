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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] -z-10" />

        <div className="container mx-auto px-4 pt-20 pb-16">
          <div className="max-w-6xl mx-auto">
            {/* 메인 헤더 */}
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full shadow-lg">
                AI 시대 생존 전략
              </div>
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-900 bg-clip-text text-transparent mb-6">
                AI 생존 지수
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                당신의 직무가 AI에게 대체될 위험도를 <span className="font-bold text-blue-600">정확히 진단</span>하고
                <br className="hidden md:block" />
                <span className="font-bold text-purple-600">맞춤형 생존 전략</span>을 받아보세요
              </p>
            </div>

            {/* 주요 기능 카드 */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                {
                  emoji: '🎯',
                  title: '정확한 진단',
                  desc: '30가지 질문으로 4가지 차원 분석',
                  gradient: 'from-blue-500 to-cyan-500'
                },
                {
                  emoji: '📊',
                  title: '시각화 분석',
                  desc: 'AI 대체 지수와 레이더 차트',
                  gradient: 'from-purple-500 to-pink-500'
                },
                {
                  emoji: '🚀',
                  title: '맞춤형 전략',
                  desc: '당신만을 위한 구체적 행동 계획',
                  gradient: 'from-orange-500 to-red-500'
                },
                {
                  emoji: '✅',
                  title: '실천 도구',
                  desc: '체크리스트와 생존 노트',
                  gradient: 'from-green-500 to-emerald-500'
                }
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />
                  <div className="text-5xl mb-4">{feature.emoji}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* 작동 방식 */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-16 border border-slate-100">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
                어떻게 작동하나요?
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    step: '01',
                    title: '진단',
                    desc: '5분 설문으로 업무 스타일 분석',
                    color: 'blue',
                    icon: '📝'
                  },
                  {
                    step: '02',
                    title: '분석',
                    desc: 'AI 대체 지수와 레이더 차트 확인',
                    color: 'purple',
                    icon: '📈'
                  },
                  {
                    step: '03',
                    title: '처방',
                    desc: '맞춤형 액션 플랜 생성',
                    color: 'pink',
                    icon: '💊'
                  },
                  {
                    step: '04',
                    title: '실천',
                    desc: '생존 노트에 기록하며 성장',
                    color: 'green',
                    icon: '🎯'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className={`text-6xl text-${item.color}-100 font-black mb-2`}>
                      {item.step}
                    </div>
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className={`text-xl font-bold text-${item.color}-600 mb-2`}>
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                    {idx < 3 && (
                      <div className="hidden lg:block absolute top-8 -right-4 text-3xl text-slate-300">
                        →
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA 섹션 */}
            <div className="text-center mb-12">
              {progress.surveyCompleted ? (
                <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl mx-auto border border-slate-100">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    진단을 완료하셨습니다!
                  </h3>
                  <p className="text-slate-600 mb-6">
                    결과를 다시 확인하거나 생존 전략을 실천해보세요
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/results"
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                      📊 진단 결과 보기
                    </Link>
                    <Link
                      href="/training"
                      className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                      📝 생존 노트 보기
                    </Link>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('진단을 다시 시작하면 기존 데이터가 삭제됩니다. 계속하시겠습니까?')) {
                        localStorage.removeItem('userProgress');
                        window.location.href = '/survey';
                      }
                    }}
                    className="mt-4 text-slate-500 hover:text-slate-700 underline text-sm"
                  >
                    새로 진단하기
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20 animate-pulse" />
                  <Link
                    href="/survey"
                    className="relative inline-block px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl text-2xl font-bold hover:shadow-2xl transition-all hover:scale-105 group"
                  >
                    <span className="flex items-center gap-3">
                      지금 바로 시작하기
                      <span className="group-hover:translate-x-2 transition-transform">→</span>
                    </span>
                  </Link>
                  <p className="mt-6 text-slate-500 text-sm">
                    ⏱️ 소요 시간: 약 5분 | 💯 완전 무료
                  </p>
                </div>
              )}
            </div>

            {/* 특징 */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 border border-amber-200">
              <div className="flex items-start gap-4">
                <div className="text-4xl">💡</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">이 앱의 특징</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>모든 데이터는 브라우저에만 저장됩니다 (개인정보 안전)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>AI API 없이 정교한 로직으로 맞춤형 전략 생성</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>완전히 무료이며 언제든지 사용 가능</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 text-slate-400 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>© 2024 AI 생존 지수. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
