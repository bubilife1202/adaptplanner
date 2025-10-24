'use client';

import React, { useState } from 'react';
import { NoteEntry } from '@/types';

interface NoteEditorProps {
  taskId: string;
  taskText: string;
  existingNote?: NoteEntry;
  onSave: (taskId: string, content: string) => void;
  onClose: () => void;
}

export default function NoteEditor({
  taskId,
  taskText,
  existingNote,
  onSave,
  onClose,
}: NoteEditorProps) {
  const [content, setContent] = useState(existingNote?.content || '');

  const handleSave = () => {
    if (content.trim()) {
      onSave(taskId, content);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2">생존 노트</h3>
          <p className="text-sm text-gray-600">{taskText}</p>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="이 과제를 수행하며 배운 점, 실행한 내용, 생각을 자유롭게 기록하세요..."
          className="w-full h-64 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={!content.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
