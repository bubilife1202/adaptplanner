'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      // 모든 질문 완료 - 분석 시작
      const analysisResult = analyzeAnswers(newAnswers);
      const actionPlan = generateActionPlan(analysisResult.dimensions);

      // 체크리스트 초기화
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

      router.push('/results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  if (!mounted) {
    return null;
  }

  const question = surveyQuestions[currentQuestion];
  const progressPercent = ((currentQuestion + 1) / surveyQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* 헤더 */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900">AI 생존 지수 진단</h1>
              <span className="text-sm text-gray-600">
                {currentQuestion + 1} / {surveyQuestions.length}
              </span>
            </div>
            {/* 프로그레스 바 */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* 질문 카드 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{question.text}</h2>
              <p className="text-sm text-gray-500">
                1점: 전혀 그렇지 않다 | 5점: 매우 그렇다
              </p>
            </div>

            {/* 답변 버튼 */}
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleAnswer(value)}
                  className="w-full p-4 text-left border-2 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700 group-hover:text-blue-700">
                      {value === 1 && '전혀 그렇지 않다'}
                      {value === 2 && '그렇지 않다'}
                      {value === 3 && '보통이다'}
                      {value === 4 && '그렇다'}
                      {value === 5 && '매우 그렇다'}
                    </span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: value }).map((_, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full bg-blue-600 group-hover:bg-blue-700"
                        />
                      ))}
                      {Array.from({ length: 5 - value }).map((_, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full bg-gray-200 group-hover:bg-gray-300"
                        />
                      ))}
                    </div>
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
              className="px-6 py-3 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed font-medium"
            >
              ← 이전
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
            >
              처음으로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
