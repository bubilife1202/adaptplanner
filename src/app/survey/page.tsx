'use client';

import { useState } from 'react';
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

  const question = surveyQuestions[currentQuestion];
  const progressPercent = ((currentQuestion + 1) / surveyQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* 헤더 */}
          <div className="mb-8 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI 생존 지수 진단
                </h1>
                <p className="text-slate-600 mt-1">당신의 업무 스타일을 분석합니다</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">
                  {currentQuestion + 1}
                </div>
                <div className="text-sm text-slate-500">/ {surveyQuestions.length}</div>
              </div>
            </div>

            {/* 프로그레스 바 */}
            <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="absolute h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-500">
              <span>시작</span>
              <span>{Math.round(progressPercent)}% 완료</span>
              <span>완료</span>
            </div>
          </div>

          {/* 질문 카드 */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 mb-6 border border-slate-100 animate-slide-up">
            <div className="mb-10">
              <div className="inline-block px-4 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-semibold rounded-full mb-4">
                Question {currentQuestion + 1}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-relaxed">
                {question.text}
              </h2>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>척도:</span>
                <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs">1점 전혀 그렇지 않다</span>
                <span className="text-slate-300">→</span>
                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs">5점 매우 그렇다</span>
              </div>
            </div>

            {/* 답변 버튼 */}
            <div className="space-y-3">
              {[
                { value: 1, label: '전혀 그렇지 않다', color: 'red', emoji: '😟' },
                { value: 2, label: '그렇지 않다', color: 'orange', emoji: '🤔' },
                { value: 3, label: '보통이다', color: 'yellow', emoji: '😐' },
                { value: 4, label: '그렇다', color: 'lime', emoji: '🙂' },
                { value: 5, label: '매우 그렇다', color: 'green', emoji: '😊' },
              ].map(({ value, label, color, emoji }) => (
                <button
                  key={value}
                  onClick={() => handleAnswer(value)}
                  className={`w-full p-5 text-left border-2 border-slate-200 rounded-2xl hover:border-${color}-500 hover:bg-${color}-50 transition-all group relative overflow-hidden`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-${color}-500 to-${color}-600 opacity-0 group-hover:opacity-5 transition-opacity`} />
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{emoji}</span>
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-${color}-700 transition-colors">
                          {label}
                        </div>
                        <div className="text-sm text-slate-500">{value}점</div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: value }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full bg-${color}-500 group-hover:scale-110 transition-transform`}
                        />
                      ))}
                      {Array.from({ length: 5 - value }).map((_, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 rounded-full bg-slate-200"
                        />
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 네비게이션 */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-slate-900 disabled:text-slate-300 disabled:cursor-not-allowed font-medium transition-colors rounded-xl hover:bg-white"
            >
              <span>←</span>
              <span>이전</span>
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 text-slate-600 hover:text-slate-900 font-medium transition-colors rounded-xl hover:bg-white"
            >
              처음으로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
