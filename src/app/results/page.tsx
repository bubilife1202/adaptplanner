'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { UserProgress } from '@/types';
import RadarChart from '@/components/RadarChart';
import { getRiskLevel } from '@/utils/analysisEngine';
import { dimensionInfo } from '@/utils/surveyQuestions';

export default function ResultsPage() {
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

  if (!mounted || !progress.analysisResult) {
    return null;
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
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">진단 결과</h1>
            <p className="text-gray-600">당신의 AI 생존 지수를 확인하세요</p>
          </div>

          {/* AI 대체 지수 카드 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">AI 대체 지수</h2>
              <div className="relative inline-block">
                <div className="text-7xl font-bold text-gray-900">
                  {analysisResult.aiReplaceabilityIndex}
                  <span className="text-3xl text-gray-500">%</span>
                </div>
                <div
                  className={`mt-4 px-6 py-2 rounded-full border-2 font-bold ${riskColors[riskLevel]}`}
                >
                  {riskLabels[riskLevel]}
                </div>
              </div>
            </div>

            {/* 요약 코멘트 */}
            <div className="p-6 bg-blue-50 rounded-lg">
              <p className="text-gray-800 leading-relaxed">{analysisResult.summary}</p>
            </div>
          </div>

          {/* 방어 지도 (레이더 차트) */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
              나의 방어 지도
            </h2>
            <RadarChart dimensions={analysisResult.dimensions} />
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
          <div className="text-center">
            <Link
              href="/action-plan"
              className="inline-block px-12 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              맞춤형 액션 플랜 보기 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
