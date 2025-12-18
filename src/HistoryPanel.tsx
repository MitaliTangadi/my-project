import React from 'react';
import { RefreshCw, ExternalLink, Calendar, TrendingDown, TrendingUp } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryPanelProps {
  history: HistoryItem[];
  onReanalyze: (text: string, url?: string) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onReanalyze }) => {
  const getScoreColor = (score: number) => {
    if (score <= 30) return 'text-green-600 bg-green-100';
    if (score <= 60) return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreIcon = (score: number) => {
    if (score <= 30) return <TrendingDown className="w-4 h-4 text-green-600" />;
    return <TrendingUp className="w-4 h-4 text-red-600" />;
  };

  if (history.length === 0) {
    return (
      <div className="p-8 text-center">
        <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No Analysis History</h3>
        <p className="text-slate-500">
          Your analyzed content will appear here. Start by analyzing some text or URLs.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-200">
      {history.map((item) => (
        <div key={item.id} className="p-6 hover:bg-slate-50 transition-colors duration-200">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(item.analysis.overallScore)}`}>
                  {item.analysis.overallScore}% Risk
                </span>
                {getScoreIcon(item.analysis.overallScore)}
                <span className="text-sm text-slate-500">
                  {item.timestamp.toLocaleDateString()} at {item.timestamp.toLocaleTimeString()}
                </span>
              </div>
              
              <p className="text-slate-900 mb-2 line-clamp-2">{item.text}</p>
              
              {item.url && (
                <div className="flex items-center space-x-2 text-sm text-blue-600 mb-3">
                  <ExternalLink className="w-4 h-4" />
                  <span className="truncate">{item.url}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-4 text-sm text-slate-500">
                <span>Credibility: {item.analysis.credibilityScore}%</span>
                <span>Bias: {item.analysis.biasScore}%</span>
                <span>Status: {item.analysis.factCheckStatus}</span>
              </div>
            </div>
            
            <button
              onClick={() => onReanalyze(item.text, item.url)}
              className="ml-4 p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              title="Reanalyze this content"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
          
          {/* Indicators Summary */}
          <div className="flex flex-wrap gap-2">
            {Object.entries(item.analysis.indicators).map(([key, value]) => {
              if (!value) return null;
              const labels = {
                sensationalLanguage: 'Sensational',
                emotionalManipulation: 'Emotional',
                urgencyTactics: 'Urgent',
                lackOfSources: 'No Sources',
                grammarIssues: 'Grammar',
              };
              
              return (
                <span
                  key={key}
                  className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full"
                >
                  {labels[key as keyof typeof labels]}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryPanel;
