// 4가지 영역 (패턴성, 창의성, 공감력, 데이터 의존도)
export type DimensionKey = 'pattern' | 'creativity' | 'empathy' | 'dataReliance';

export interface Dimension {
  key: DimensionKey;
  name: string;
  description: string;
  score: number; // 1-5
}

export interface SurveyQuestion {
  id: string;
  text: string;
  dimension: DimensionKey;
  // 높은 점수가 해당 차원의 강점인지 약점인지
  // true: 점수가 높을수록 AI 대체 위험 높음
  // false: 점수가 높을수록 AI 대체 위험 낮음
  isRisk: boolean;
}

export interface SurveyAnswer {
  questionId: string;
  value: number; // 1-5
}

export interface AnalysisResult {
  aiReplaceabilityIndex: number; // 0-100
  dimensions: Record<DimensionKey, number>; // 각 차원별 점수 (1-5)
  riskAreas: DimensionKey[]; // 위험 영역
  safeAreas: DimensionKey[]; // 안전 영역
  summary: string;
}

export interface ActionPlanModule {
  id: string;
  title: string;
  description: string;
  category: 'risk' | 'weakness' | 'strategy';
  relatedDimension: DimensionKey;
  // 모듈이 활성화되는 조건
  condition: (dimensions: Record<DimensionKey, number>) => boolean;
  tasks: ActionTask[];
}

export interface ActionTask {
  id: string;
  text: string;
  category: string; // e.g., "1.1", "2.1", etc.
}

export interface ActionPlan {
  modules: ActionPlanModule[];
  allTasks: ActionTask[];
}

export interface ChecklistItem {
  taskId: string;
  completed: boolean;
  completedAt?: Date;
}

export interface NoteEntry {
  id: string;
  taskId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProgress {
  surveyCompleted: boolean;
  surveyAnswers: SurveyAnswer[];
  analysisResult?: AnalysisResult;
  actionPlan?: ActionPlan;
  checklist: ChecklistItem[];
  notes: NoteEntry[];
}
