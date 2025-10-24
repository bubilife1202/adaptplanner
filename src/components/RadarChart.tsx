'use client';

import React from 'react';
import { DimensionKey } from '@/types';
import { dimensionInfo } from '@/utils/surveyQuestions';

interface RadarChartProps {
  dimensions: Record<DimensionKey, number>;
  size?: number;
}

export default function RadarChart({ dimensions, size = 300 }: RadarChartProps) {
  const center = size / 2;
  const maxRadius = size / 2 - 40;
  const levels = 5;

  const dimensionKeys: DimensionKey[] = ['pattern', 'creativity', 'empathy', 'dataReliance'];
  const numDimensions = dimensionKeys.length;
  const angleStep = (Math.PI * 2) / numDimensions;

  // 각 차원의 좌표 계산
  const getPoint = (dimensionIndex: number, value: number) => {
    const angle = angleStep * dimensionIndex - Math.PI / 2;
    const radius = (value / 5) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // 레이블 위치 계산 (좀 더 바깥쪽)
  const getLabelPoint = (dimensionIndex: number) => {
    const angle = angleStep * dimensionIndex - Math.PI / 2;
    const radius = maxRadius + 25;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // 배경 격자선 생성
  const gridLines = [];
  for (let level = 1; level <= levels; level++) {
    const points = dimensionKeys.map((_, i) => {
      const point = getPoint(i, level);
      return `${point.x},${point.y}`;
    });
    gridLines.push(
      <polygon
        key={`grid-${level}`}
        points={points.join(' ')}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="1"
      />
    );
  }

  // 축선 생성
  const axisLines = dimensionKeys.map((_, i) => {
    const point = getPoint(i, 5);
    return (
      <line
        key={`axis-${i}`}
        x1={center}
        y1={center}
        x2={point.x}
        y2={point.y}
        stroke="#e5e7eb"
        strokeWidth="1"
      />
    );
  });

  // 데이터 포인트 생성
  const dataPoints = dimensionKeys.map((key, i) => {
    const point = getPoint(i, dimensions[key]);
    return `${point.x},${point.y}`;
  });

  // 위험/안전 영역 색상
  const getColor = (key: DimensionKey) => {
    const score = dimensions[key];
    if (key === 'pattern' || key === 'dataReliance') {
      // 높을수록 위험
      if (score >= 3.5) return '#ef4444'; // red
      if (score >= 2.5) return '#f59e0b'; // orange
      return '#10b981'; // green
    } else {
      // 낮을수록 위험
      if (score <= 2.5) return '#ef4444'; // red
      if (score <= 3.5) return '#f59e0b'; // orange
      return '#10b981'; // green
    }
  };

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* 배경 격자 */}
        {gridLines}
        {axisLines}

        {/* 데이터 영역 */}
        <polygon
          points={dataPoints.join(' ')}
          fill="#3b82f6"
          fillOpacity="0.3"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        {/* 데이터 포인트 */}
        {dimensionKeys.map((key, i) => {
          const point = getPoint(i, dimensions[key]);
          return (
            <circle
              key={`point-${i}`}
              cx={point.x}
              cy={point.y}
              r="5"
              fill={getColor(key)}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}

        {/* 차원 레이블 */}
        {dimensionKeys.map((key, i) => {
          const labelPoint = getLabelPoint(i);
          return (
            <text
              key={`label-${i}`}
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-sm font-semibold fill-gray-700"
            >
              {dimensionInfo[key].name}
            </text>
          );
        })}
      </svg>

      {/* 범례 */}
      <div className="mt-6 space-y-2 w-full max-w-md">
        {dimensionKeys.map((key) => {
          const score = dimensions[key];
          const color = getColor(key);
          const isRisk = (key === 'pattern' || key === 'dataReliance') ? score >= 3.5 : score <= 2.5;

          return (
            <div key={key} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm font-medium">{dimensionInfo[key].name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{score.toFixed(1)}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  isRisk ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                  {isRisk ? '위험' : '안전'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
