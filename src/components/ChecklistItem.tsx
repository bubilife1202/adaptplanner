'use client';

import React from 'react';
import { ChecklistItem as ChecklistItemType } from '@/types';

interface ChecklistItemProps {
  item: ChecklistItemType;
  taskText: string;
  onToggle: (taskId: string) => void;
  onAddNote: (taskId: string) => void;
}

export default function ChecklistItem({ item, taskText, onToggle, onAddNote }: ChecklistItemProps) {
  return (
    <div className="flex items-start gap-3 p-3 bg-white border rounded-lg hover:shadow-sm transition-shadow">
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onToggle(item.taskId)}
        className="mt-1 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
      />
      <div className="flex-1">
        <p className={`text-sm ${item.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
          {taskText}
        </p>
        {item.completed && item.completedAt && (
          <p className="text-xs text-gray-400 mt-1">
            완료: {new Date(item.completedAt).toLocaleDateString('ko-KR')}
          </p>
        )}
      </div>
      <button
        onClick={() => onAddNote(item.taskId)}
        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
      >
        노트
      </button>
    </div>
  );
}
