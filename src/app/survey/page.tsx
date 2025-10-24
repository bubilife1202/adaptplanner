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

  const handleAnswer = (value: number) => {
    const newAnswers = [
      ...answers,
      {
        questionId: surveyQuestions[currentQuestion].id,
        value,
      },
    ];
    setAnswers(newAnswers);

    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
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
