import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, TrendingUp, Users, Clock, Brain, Loader2 } from 'lucide-react';
import { AnalysisResult } from '../types';

interface AnalysisResultsProps {
  analysis: AnalysisResult;
  isLoading: boolean;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Analyzing Content</h3>
          <p className="text-slate-500">Our AI is examining the text for misinformation indicators...</p>
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span>Checking language patterns</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-300"></div>
              <span>Analyzing bias indicators</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-slate-500">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-700"></div>
              <span>Verifying source credibility</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number, reverse = false) => {
    if (reverse) {
      if (score >= 70) return 'text-green-600 bg-green-50';
      if (score >= 40) return 'text-amber-600 bg-amber-50';
      return 'text-red-600 bg-red-50';
    } else {
      if (score <= 30) return 'text-green-600 bg-green-50';
      if (score <= 60) return 'text-amber-600 bg-amber-50';
      return 'text-red-600 bg-red-50';
    }
  };

  const getFactCheckIcon = () => {
    switch (analysis.factCheckStatus) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'disputed':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'false':
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getFactCheckStatus = () => {
    switch (analysis.factCheckStatus) {
      case 'verified':
        return { text: 'Likely Authentic', color: 'text-green-600 bg-green-50' };
      case 'disputed':
        return { text: 'Questionable', color: 'text-amber-600 bg-amber-50' };
      case 'false':
        return { text: 'Likely Fake', color: 'text-red-600 bg-red-50' };
    }
  };

  const status = getFactCheckStatus();

  return (
    <div className="space-y-6">
      {/* Overall Assessment */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Brain className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-slate-900">Analysis Results</h3>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <Clock className="w-4 h-4" />
            <span>{analysis.analysisTime.toLocaleTimeString()}</span>
          </div>
        </div>

        <div className={`flex items-center space-x-3 p-4 rounded-lg ${status.color} mb-6`}>
          {getFactCheckIcon()}
          <div>
            <h4 className="font-semibold">{status.text}</h4>
            <p className="text-sm opacity-80">
              Based on {Object.values(analysis.indicators).filter(Boolean).length} detected indicators
            </p>
          </div>
        </div>

        {/* Score Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg ${getScoreColor(analysis.overallScore)}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Fake News Risk</span>
              <span className="text-lg font-bold">{analysis.overallScore}%</span>
            </div>
            <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
              <div
                className="bg-current h-2 rounded-full transition-all duration-500"
                style={{ width: `${analysis.overallScore}%` }}
              />
            </div>
          </div>

          <div className={`p-4 rounded-lg ${getScoreColor(analysis.credibilityScore, true)}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Credibility</span>
              <span className="text-lg font-bold">{analysis.credibilityScore}%</span>
            </div>
            <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
              <div
                className="bg-current h-2 rounded-full transition-all duration-500"
                style={{ width: `${analysis.credibilityScore}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h4 className="font-semibold text-slate-900 mb-4">Detailed Analysis</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <span className="text-sm font-medium text-slate-700">Bias Score</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(analysis.biasScore)}`}>
              {analysis.biasScore}%
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <span className="text-sm font-medium text-slate-700">Emotional Manipulation</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(analysis.emotionalScore)}`}>
              {analysis.emotionalScore}%
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <span className="text-sm font-medium text-slate-700">Source Reliability</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(analysis.sourceReliability, true)}`}>
              {analysis.sourceReliability}%
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <span className="text-sm font-medium text-slate-700">Sentiment</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              analysis.sentiment === 'positive' ? 'text-green-600 bg-green-100' :
              analysis.sentiment === 'negative' ? 'text-red-600 bg-red-100' :
              'text-slate-600 bg-slate-100'
            }`}>
              {analysis.sentiment.charAt(0).toUpperCase() + analysis.sentiment.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Warning Indicators */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h4 className="font-semibold text-slate-900 mb-4">Warning Indicators</h4>
        <div className="space-y-3">
          {Object.entries(analysis.indicators).map(([key, value]) => {
            const labels = {
              sensationalLanguage: 'Sensational Language',
              emotionalManipulation: 'Emotional Manipulation',
              urgencyTactics: 'Urgency Tactics',
              lackOfSources: 'Lack of Sources',
              grammarIssues: 'Grammar Issues',
            };
            
            return (
              <div
                key={key}
                className={`flex items-center space-x-3 p-3 rounded-lg ${
                  value ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                }`}
              >
                {value ? (
                  <XCircle className="w-5 h-5" />
                ) : (
                  <CheckCircle className="w-5 h-5" />
                )}
                <span className="text-sm font-medium">
                  {labels[key as keyof typeof labels]}
                </span>
                <span className="text-xs opacity-70">
                  {value ? 'Detected' : 'Clear'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Analysis Stats */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h4 className="font-semibold text-slate-900 mb-4">Content Statistics</h4>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-4 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-slate-900">{analysis.wordCount}</div>
            <div className="text-sm text-slate-500">Words Analyzed</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-slate-900">
              {Object.values(analysis.indicators).filter(Boolean).length}
            </div>
            <div className="text-sm text-slate-500">Risk Indicators</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
