'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { surveyQuestions } from '@/utils/surveyQuestions';
import { analyzeAnswers } from '@/utils/analysisEngine';
import { generateActionPlan } from '@/utils/actionPlanModules';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { UserProgress, SurveyAnswer } from '@/types';

export default function SurveyPage() {
  const router = useRouter();
  const [progress, setProgress] = useLocalStorage<UserProgress>('userProgress', {
    surveyCompleted: false,
    surveyAnswers: [],
    checklist: [],
    notes: [],
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswer[]>([]);
  const [showInsight, setShowInsight] = useState(false);

  const handleAnswer = (value: number) => {
    const newAnswers = [
      ...answers,
      {
        questionId: surveyQuestions[currentQuestion].id,
        value,
      },
    ];
    setAnswers(newAnswers);

    // 포커스 제거 (모바일에서 테두리 남는 문제 해결)
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    if (currentQuestion < surveyQuestions.length - 1) {
      // 10번째, 20번째 질문 후에 인사이트 표시
      if (currentQuestion + 1 === 10 || currentQuestion + 1 === 20) {
        setShowInsight(true);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    } else {
      const analysisResult = analyzeAnswers(newAnswers);
      const actionPlan = generateActionPlan(analysisResult.dimensions);

      const checklist = actionPlan.allTasks.map((task) => ({
        taskId: task.id,
        completed: false,
      }));

      setProgress({
        surveyCompleted: true,
        surveyAnswers: newAnswers,
        analysisResult,
        actionPlan,
        checklist,
        notes: [],
      });

      // localStorage에 저장될 시간을 주기 위해 약간의 딜레이 후 이동
      setTimeout(() => {
        router.push('/results');
      }, 100);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const question = surveyQuestions[currentQuestion];
  const progressPercent = ((currentQuestion + 1) / surveyQuestions.length) * 100;

  const handleContinueFromInsight = () => {
    setShowInsight(false);
    setCurrentQuestion(currentQuestion + 1);
  };

  // 인사이트 렌더링 (10번째, 20번째 질문 후)
  if (showInsight) {
    const insightContent = currentQuestion + 1 === 10 ? {
      title: '💡 중간 인사이트',
      message: '지금까지 답변 분석 결과:\n반복 업무 비중이 높으시네요.',
      stat: '📌 알고 계셨나요?',
      statDetail: '반복 업무 80% 이상인 직군의 AI 대체율이 평균 2.3배 높습니다.',
      encouragement: '하지만 걱정 마세요. 이미 500명이 이 진단으로 구체적 대응 전략을 세웠습니다.',
    } : {
      title: '💡 거의 다 왔어요!',
      message: '창의성 점수가 평균보다 낮게 나오고 있어요.',
      stat: '📌 희소식',
      statDetail: '창의성은 훈련으로 키울 수 있습니다.',
      encouragement: '결과 페이지에서 "창의성 키우는 법" 상세 가이드를 드릴게요. 마지막 10문항만 더!',
    };

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-6 sm:p-10 border-2 border-blue-200">
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">💡</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {insightContent.title}
            </h2>
            <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div className="p-5 bg-blue-50 rounded-xl border-2 border-blue-200">
              <p className="text-lg text-gray-800 font-semibold mb-3 whitespace-pre-line">
                {insightContent.message}
              </p>
            </div>

            <div className="p-5 bg-purple-50 rounded-xl border-2 border-purple-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {insightContent.stat}
              </h3>
              <p className="text-gray-700">
                {insightContent.statDetail}
              </p>
            </div>

            <div className="p-5 bg-green-50 rounded-xl border-2 border-green-200">
              <p className="text-gray-700">
                {insightContent.encouragement}
              </p>
            </div>
          </div>

          <button
            onClick={handleContinueFromInsight}
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
          >
            계속하기 →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Link href="/" className="inline-block">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              AI 생존 지수 진단
            </h1>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* 진행률 */}
          <div className="mb-6 sm:mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs sm:text-sm font-medium text-gray-600">
                질문 {currentQuestion + 1} / {surveyQuestions.length}
              </span>
              <span className="text-xs sm:text-sm font-medium text-gray-600">
                {Math.round(progressPercent)}% 완료
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* 질문 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-8 mb-6">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">{question.text}</h2>

            <div className="space-y-2 sm:space-y-3">
              {[
                { value: 1, label: '전혀 그렇지 않다' },
                { value: 2, label: '그렇지 않다' },
                { value: 3, label: '보통이다' },
                { value: 4, label: '그렇다' },
                { value: 5, label: '매우 그렇다' },
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => handleAnswer(value)}
                  className="w-full p-3 sm:p-4 text-left border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-colors active:scale-95"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base font-medium text-gray-900">{label}</span>
                    <span className="text-xs sm:text-sm text-gray-500">{value}점</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 네비게이션 */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              ← 이전
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-600 hover:text-gray-900"
            >
              처음으로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
