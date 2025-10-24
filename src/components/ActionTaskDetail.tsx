'use client';

import { useState } from 'react';
import { ActionTask } from '@/types';

interface ActionTaskDetailProps {
  task: ActionTask;
}

export default function ActionTaskDetail({ task }: ActionTaskDetailProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* 헤더 - 클릭 가능 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 flex items-start gap-3 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-lg flex items-center justify-center text-sm sm:text-base font-bold shadow-md">
          {task.category.replace('할 일 ', '')}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{task.text}</h4>
          <p className="text-xs sm:text-sm text-gray-500">{isOpen ? '접기' : '자세히 보기'}</p>
        </div>
        <div className="flex-shrink-0 text-2xl text-gray-400">
          {isOpen ? '▲' : '▼'}
        </div>
      </button>

      {/* 상세 내용 */}
      {isOpen && (
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 space-y-4 sm:space-y-5 border-t border-gray-100">
          {/* 왜 해야 하나요? */}
          <div className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg sm:text-xl">💡</span>
              <h5 className="text-sm sm:text-base font-bold text-gray-900">왜 해야 하나요?</h5>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-blue-50 p-3 sm:p-4 rounded-lg">
              {task.why}
            </p>
          </div>

          {/* 어떻게 하나요? */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg sm:text-xl">📝</span>
              <h5 className="text-sm sm:text-base font-bold text-gray-900">어떻게 하나요?</h5>
            </div>
            <ol className="space-y-2">
              {task.howTo.map((step, index) => (
                <li key={index} className="flex gap-3 text-xs sm:text-sm text-gray-700">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xs">
                    {index + 1}
                  </span>
                  <span className="flex-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* 예시 */}
          {task.example && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg sm:text-xl">✨</span>
                <h5 className="text-sm sm:text-base font-bold text-gray-900">예시</h5>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 bg-green-50 p-3 sm:p-4 rounded-lg leading-relaxed">
                {task.example}
              </p>
            </div>
          )}

          {/* ChatGPT 프롬프트 */}
          {task.aiPrompt && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg sm:text-xl">🤖</span>
                <h5 className="text-sm sm:text-base font-bold text-gray-900">ChatGPT 활용 팁</h5>
              </div>
              <div className="bg-gray-900 text-gray-100 p-3 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm mb-3 leading-relaxed">{task.aiPrompt}</p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(task.aiPrompt!);
                    alert('프롬프트가 복사됐어요! ChatGPT에 붙여넣으세요');
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-white text-gray-900 rounded-lg text-xs sm:text-sm font-bold hover:bg-gray-100 transition-colors"
                >
                  📋 복사하기
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
