'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { UserProgress, NoteEntry } from '@/types';
import ChecklistItem from '@/components/ChecklistItem';
import NoteEditor from '@/components/NoteEditor';

export default function TrainingPage() {
  const router = useRouter();
  const [progress, setProgress, isLoading] = useLocalStorage<UserProgress>('userProgress', {
    surveyCompleted: false,
    surveyAnswers: [],
    checklist: [],
    notes: [],
  });
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  useEffect(() => {
    if (!isLoading && !progress.surveyCompleted) {
      router.push('/');
    }
  }, [isLoading, progress.surveyCompleted, router]);

  if (isLoading || !progress.actionPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const { actionPlan, checklist, notes } = progress;

  const handleToggleTask = (taskId: string) => {
    const newChecklist = checklist.map((item) =>
      item.taskId === taskId
        ? {
            ...item,
            completed: !item.completed,
            completedAt: !item.completed ? new Date() : undefined,
          }
        : item
    );
    setProgress({ ...progress, checklist: newChecklist });
  };

  const handleSaveNote = (taskId: string, content: string) => {
    const existingNote = notes.find((n) => n.taskId === taskId);
    let newNotes;

    if (existingNote) {
      newNotes = notes.map((n) =>
        n.taskId === taskId
          ? { ...n, content, updatedAt: new Date() }
          : n
      );
    } else {
      const newNote: NoteEntry = {
        id: `note-${Date.now()}`,
        taskId,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      newNotes = [...notes, newNote];
    }

    setProgress({ ...progress, notes: newNotes });
  };

  const completedCount = checklist.filter((item) => item.completed).length;
  const totalCount = checklist.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const filteredTasks = actionPlan.allTasks.filter((task) => {
    const checklistItem = checklist.find((item) => item.taskId === task.id);
    if (!checklistItem) return filter === 'all' || filter === 'pending';

    if (filter === 'completed') return checklistItem.completed;
    if (filter === 'pending') return !checklistItem.completed;
    return true;
  });

  const editingTask = editingTaskId
    ? actionPlan.allTasks.find((t) => t.id === editingTaskId)
    : null;

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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">생존 노트</h2>
            <p className="text-sm sm:text-base text-gray-600">과제 실천하고 성장 기록하기</p>
          </div>

          {/* 진행률 카드 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-gray-900">전체 진행률</h2>
                <span className="text-2xl font-bold text-blue-600">
                  {completedCount} / {totalCount}
                </span>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-600 to-emerald-600 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {progressPercent === 100
                ? '🎉 모든 과제를 완료했습니다! 지속적으로 실천하세요.'
                : `${Math.round(progressPercent)}% 완료 - 계속 진행하세요!`}
            </p>
          </div>

          {/* 필터 */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                전체 ({totalCount})
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'pending'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                미완료 ({totalCount - completedCount})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'completed'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                완료 ({completedCount})
              </button>
            </div>
          </div>

          {/* 체크리스트 */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">체크리스트</h2>
            {filteredTasks.length > 0 ? (
              <div className="space-y-3">
                {filteredTasks.map((task) => {
                  const checklistItem = checklist.find((item) => item.taskId === task.id) || {
                    taskId: task.id,
                    completed: false,
                  };
                  return (
                    <ChecklistItem
                      key={task.id}
                      item={checklistItem}
                      taskText={`[${task.category}] ${task.text}`}
                      onToggle={handleToggleTask}
                      onAddNote={setEditingTaskId}
                    />
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                {filter === 'completed'
                  ? '아직 완료한 과제가 없습니다'
                  : '표시할 과제가 없습니다'}
              </p>
            )}
          </div>

          {/* 내 노트 요약 */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">내 노트</h2>
            {notes.length > 0 ? (
              <div className="space-y-4">
                {notes.map((note) => {
                  const task = actionPlan.allTasks.find((t) => t.id === note.taskId);
                  return (
                    <div key={note.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900 text-sm">
                          {task ? `[${task.category}] ${task.text}` : '삭제된 과제'}
                        </h3>
                        <button
                          onClick={() => setEditingTaskId(note.taskId)}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          수정
                        </button>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap mb-2">
                        {note.content}
                      </p>
                      <p className="text-xs text-gray-400">
                        마지막 수정: {new Date(note.updatedAt).toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-2">아직 작성된 노트가 없습니다</p>
                <p className="text-sm text-gray-400">
                  체크리스트에서 "노트" 버튼을 눌러 시작하세요
                </p>
              </div>
            )}
          </div>

          {/* 네비게이션 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/action-plan"
              className="w-full sm:w-auto text-center px-6 sm:px-8 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-lg text-base sm:text-lg font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
            >
              ← 액션 플랜
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto text-center px-6 sm:px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-base sm:text-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              🏠 처음으로
            </Link>
          </div>
        </div>
      </div>

      {/* 노트 에디터 모달 */}
      {editingTaskId && editingTask && (
        <NoteEditor
          taskId={editingTaskId}
          taskText={`[${editingTask.category}] ${editingTask.text}`}
          existingNote={notes.find((n) => n.taskId === editingTaskId)}
          onSave={handleSaveNote}
          onClose={() => setEditingTaskId(null)}
        />
      )}
    </div>
  );
}
