import React from 'react';
import { PieChart, BarChart3, TrendingUp, Activity } from 'lucide-react';
import { HistoryItem } from '../types';

interface StatsDashboardProps {
  history: HistoryItem[];
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ history }) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No Statistics Available</h3>
        <p className="text-slate-500">
          Analyze some content to see detailed statistics and trends.
        </p>
      </div>
    );
  }

  // Calculate statistics
  const totalAnalyses = history.length;
  const averageFakeScore = Math.round(
    history.reduce((sum, item) => sum + item.analysis.overallScore, 0) / totalAnalyses
  );
  const averageCredibility = Math.round(
    history.reduce((sum, item) => sum + item.analysis.credibilityScore, 0) / totalAnalyses
  );

  const statusCounts = history.reduce((acc, item) => {
    acc[item.analysis.factCheckStatus] = (acc[item.analysis.factCheckStatus] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sentimentCounts = history.reduce((acc, item) => {
    acc[item.analysis.sentiment] = (acc[item.analysis.sentiment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topIndicators = Object.keys(history[0]?.analysis.indicators || {}).map(indicator => {
    const count = history.filter(item => item.analysis.indicators[indicator as keyof typeof item.analysis.indicators]).length;
    const labels = {
      sensationalLanguage: 'Sensational Language',
      emotionalManipulation: 'Emotional Manipulation',
      urgencyTactics: 'Urgency Tactics',
      lackOfSources: 'Lack of Sources',
      grammarIssues: 'Grammar Issues',
    };
    return {
      name: labels[indicator as keyof typeof labels],
      count,
      percentage: Math.round((count / totalAnalyses) * 100),
    };
  }).sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Analyses</p>
              <p className="text-3xl font-bold">{totalAnalyses}</p>
            </div>
            <Activity className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Avg Credibility</p>
              <p className="text-3xl font-bold">{averageCredibility}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm">Avg Fake Risk</p>
              <p className="text-3xl font-bold">{averageFakeScore}%</p>
            </div>
            <PieChart className="w-8 h-8 text-amber-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">High Risk</p>
              <p className="text-3xl font-bold">
                {history.filter(item => item.analysis.overallScore > 60).length}
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fact Check Status Distribution */}
        <div className="bg-slate-50 p-6 rounded-xl">
          <h4 className="font-semibold text-slate-900 mb-4">Fact Check Status</h4>
          <div className="space-y-3">
            {Object.entries(statusCounts).map(([status, count]) => {
              const percentage = Math.round((count / totalAnalyses) * 100);
              const colors = {
                verified: 'bg-green-500',
                disputed: 'bg-amber-500',
                false: 'bg-red-500',
              };
              
              return (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${colors[status as keyof typeof colors]}`} />
                    <span className="text-sm font-medium text-slate-700 capitalize">
                      {status === 'false' ? 'Likely Fake' : status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${colors[status as keyof typeof colors]}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-slate-600 w-12 text-right">{percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sentiment Distribution */}
        <div className="bg-slate-50 p-6 rounded-xl">
          <h4 className="font-semibold text-slate-900 mb-4">Sentiment Analysis</h4>
          <div className="space-y-3">
            {Object.entries(sentimentCounts).map(([sentiment, count]) => {
              const percentage = Math.round((count / totalAnalyses) * 100);
              const colors = {
                positive: 'bg-green-500',
                neutral: 'bg-slate-500',
                negative: 'bg-red-500',
              };
              
              return (
                <div key={sentiment} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${colors[sentiment as keyof typeof colors]}`} />
                    <span className="text-sm font-medium text-slate-700 capitalize">{sentiment}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${colors[sentiment as keyof typeof colors]}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-slate-600 w-12 text-right">{percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Warning Indicators */}
      <div className="bg-slate-50 p-6 rounded-xl">
        <h4 className="font-semibold text-slate-900 mb-4">Most Common Warning Indicators</h4>
        <div className="space-y-3">
          {topIndicators.map((indicator, index) => (
            <div key={indicator.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 bg-slate-200 text-slate-600 rounded-full text-sm font-medium flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-slate-700">{indicator.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-slate-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-red-500"
                    style={{ width: `${indicator.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-slate-600 w-16 text-right">
                  {indicator.count} ({indicator.percentage}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;