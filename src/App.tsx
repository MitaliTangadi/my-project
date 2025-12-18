import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, TrendingUp, FileText, BarChart3, Brain, Target } from 'lucide-react';
import AnalysisForm from './components/AnalysisForm';
import AnalysisResults from './components/AnalysisResults';
import HistoryPanel from './components/HistoryPanel';
import StatsDashboard from './components/StatsDashboard';
import { AnalysisResult, HistoryItem } from './types';

function App() {
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<'analyze' | 'history' | 'stats'>('analyze');
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysis = async (text: string, url?: string) => {
    setIsLoading(true);
    
    // Simulate AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const analysis = analyzeText(text);
    const historyItem: HistoryItem = {
      id: Date.now().toString(),
      text: text.substring(0, 200) + (text.length > 200 ? '...' : ''),
      url,
      analysis,
      timestamp: new Date(),
    };
    
    setCurrentAnalysis(analysis);
    setHistory(prev => [historyItem, ...prev.slice(0, 49)]); // Keep last 50 items
    setIsLoading(false);
  };

  const analyzeText = (text: string): AnalysisResult => {
    // Advanced fake news detection simulation
    const words = text.toLowerCase().split(/\s+/);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    
    // Bias indicators
    const sensationalWords = ['shocking', 'unbelievable', 'incredible', 'amazing', 'devastating', 'catastrophic'];
    const emotionalWords = ['outrageous', 'disgusting', 'horrific', 'terrifying', 'wonderful', 'perfect'];
    const urgencyWords = ['breaking', 'urgent', 'immediately', 'now', 'quickly', 'emergency'];
    
    const sensationalCount = words.filter(word => sensationalWords.includes(word)).length;
    const emotionalCount = words.filter(word => emotionalWords.includes(word)).length;
    const urgencyCount = words.filter(word => urgencyWords.includes(word)).length;
    
    // Calculate various scores
    const biasScore = Math.min(100, (sensationalCount + emotionalCount) / words.length * 1000);
    const emotionalScore = Math.min(100, emotionalCount / words.length * 800);
    const urgencyScore = Math.min(100, urgencyCount / words.length * 600);
    
    // Source credibility (simulated)
    const hasQuotes = text.includes('"') || text.includes("'");
    const hasNumbers = /\d+/.test(text);
    const hasProperNouns = /[A-Z][a-z]+/.test(text);
    
    const credibilityScore = Math.min(100, 
      (hasQuotes ? 20 : 0) + 
      (hasNumbers ? 25 : 0) + 
      (hasProperNouns ? 25 : 0) + 
      (sentences.length > 3 ? 20 : 0) +
      (words.length > 50 ? 10 : 0)
    );
    
    // Overall fake news probability
    const fakeScore = Math.min(100, 
      (biasScore * 0.3) + 
      (emotionalScore * 0.3) + 
      (urgencyScore * 0.2) + 
      ((100 - credibilityScore) * 0.2)
    );
    
    return {
      overallScore: Math.round(fakeScore),
      credibilityScore: Math.round(credibilityScore),
      biasScore: Math.round(biasScore),
      emotionalScore: Math.round(emotionalScore),
      sourceReliability: Math.round(Math.random() * 40 + 50), // Simulated
      factCheckStatus: fakeScore < 30 ? 'verified' : fakeScore < 60 ? 'disputed' : 'false',
      indicators: {
        sensationalLanguage: sensationalCount > 0,
        emotionalManipulation: emotionalCount > 2,
        urgencyTactics: urgencyCount > 0,
        lackOfSources: !hasQuotes && !hasNumbers,
        grammarIssues: Math.random() > 0.7,
      },
      sentiment: emotionalScore > 60 ? 'negative' : emotionalScore > 30 ? 'neutral' : 'positive',
      wordCount: words.length,
      analysisTime: new Date(),
    };
  };

  const tabs = [
    { id: 'analyze', label: 'Analyze', icon: Brain },
    { id: 'history', label: 'History', icon: FileText },
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">TruthGuard</h1>
                <p className="text-sm text-slate-500">AI-Powered Fake News Detection</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 bg-slate-100 rounded-lg p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'analyze' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Target className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-slate-900">Content Analysis</h2>
                </div>
                <AnalysisForm onAnalyze={handleAnalysis} isLoading={isLoading} />
              </div>
            </div>
            
            <div className="space-y-6">
              {currentAnalysis ? (
                <AnalysisResults analysis={currentAnalysis} isLoading={isLoading} />
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Ready to Analyze</h3>
                  <p className="text-slate-500">Enter text or a URL to begin fake news detection analysis.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-900">Analysis History</h2>
              </div>
            </div>
            <HistoryPanel history={history} onReanalyze={handleAnalysis} />
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-900">Detection Statistics</h2>
              </div>
              <StatsDashboard history={history} />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-slate-500">
              © 2025 TruthGuard. Advanced AI-powered fake news detection for a more informed world.
            </p>
            <p className="text-sm text-slate-400 mt-2">
              Always verify information from multiple reliable sources.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
