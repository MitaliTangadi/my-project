export interface AnalysisResult {
  overallScore: number; // 0-100, higher means more likely fake
  credibilityScore: number; // 0-100, higher means more credible
  biasScore: number; // 0-100, higher means more biased
  emotionalScore: number; // 0-100, higher means more emotional
  sourceReliability: number; // 0-100, higher means more reliable
  factCheckStatus: 'verified' | 'disputed' | 'false';
  indicators: {
    sensationalLanguage: boolean;
    emotionalManipulation: boolean;
    urgencyTactics: boolean;
    lackOfSources: boolean;
    grammarIssues: boolean;
  };
  sentiment: 'positive' | 'neutral' | 'negative';
  wordCount: number;
  analysisTime: Date;
}

export interface HistoryItem {
  id: string;
  text: string;
  url?: string;
  analysis: AnalysisResult;
  timestamp: Date;
}