'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { UserProgress } from '@/types';
import RadarChart from '@/components/RadarChart';
import { getRiskLevel } from '@/utils/analysisEngine';
import { dimensionInfo } from '@/utils/surveyQuestions';

export default function ResultsPage() {
  const router = useRouter();
  const [progress, , isLoading] = useLocalStorage<UserProgress>('userProgress', {
    surveyCompleted: false,
    surveyAnswers: [],
    checklist: [],
    notes: [],
  });

  useEffect(() => {
    // localStorage 로딩이 완료되고, 설문이 완료되지 않았을 때만 리다이렉트
    if (!isLoading && !progress.surveyCompleted) {
      router.push('/');
    }
  }, [isLoading, progress.surveyCompleted, router]);

  // 로딩 중이거나 결과가 없으면 로딩 화면 표시
  if (isLoading || !progress.analysisResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">진단 결과를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const { analysisResult } = progress;
  const riskLevel = getRiskLevel(analysisResult.aiReplaceabilityIndex);

  const riskColors = {
    low: 'bg-green-100 text-green-800 border-green-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    high: 'bg-red-100 text-red-800 border-red-300',
  };

  const riskLabels = {
    low: '안전',
    medium: '주의',
    high: '위험',
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">진단 결과</h2>
            <p className="text-sm sm:text-base text-gray-600">당신의 AI 생존 지수를 확인하세요</p>
          </div>

          {/* AI 대체 지수 카드 */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6">
            <div className="text-center mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">AI 대체 지수</h3>
              <div className="relative inline-block">
                <div className="text-5xl sm:text-7xl font-bold text-gray-900">
                  {analysisResult.aiReplaceabilityIndex}
                  <span className="text-2xl sm:text-3xl text-gray-500">%</span>
                </div>
                <div
                  className={`mt-4 px-4 sm:px-6 py-2 rounded-full border-2 font-bold text-sm sm:text-base ${riskColors[riskLevel]}`}
                >
                  {riskLabels[riskLevel]}
                </div>
              </div>
            </div>

            {/* 요약 코멘트 */}
            <div className="p-4 sm:p-6 bg-blue-50 rounded-lg">
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed">{analysisResult.summary}</p>
            </div>
          </div>

          {/* 방어 지도 (레이더 차트) */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 text-center">
              나의 방어 지도
            </h3>
            <div className="max-w-md mx-auto">
              <RadarChart dimensions={analysisResult.dimensions} />
            </div>
          </div>

          {/* 위험/안전 영역 분석 */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* 위험 영역 */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-2xl">⚠️</div>
                <h3 className="text-lg font-bold text-red-700">위험 영역</h3>
              </div>
              {analysisResult.riskAreas.length > 0 ? (
                <ul className="space-y-3">
                  {analysisResult.riskAreas.map((area) => (
                    <li key={area} className="p-3 bg-red-50 rounded-lg">
                      <div className="font-bold text-gray-900">
                        {dimensionInfo[area].name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {dimensionInfo[area].riskDescription}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">특별히 위험한 영역이 없습니다</p>
              )}
            </div>

            {/* 안전 영역 */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-2xl">✅</div>
                <h3 className="text-lg font-bold text-green-700">안전 영역</h3>
              </div>
              {analysisResult.safeAreas.length > 0 ? (
                <ul className="space-y-3">
                  {analysisResult.safeAreas.map((area) => (
                    <li key={area} className="p-3 bg-green-50 rounded-lg">
                      <div className="font-bold text-gray-900">
                        {dimensionInfo[area].name}
                      </div>
                      <div className="text-sm text-gray-600">
                        당신의 강점입니다
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">안전 영역을 개발해야 합니다</p>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/action-plan"
              className="w-full sm:w-auto text-center px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-lg sm:text-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              맞춤형 액션 플랜 보기 →
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto text-center px-8 sm:px-12 py-4 sm:py-5 bg-white text-gray-700 border-2 border-gray-300 rounded-lg text-lg sm:text-xl font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
            >
              ← 처음으로
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
