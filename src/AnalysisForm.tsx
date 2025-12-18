import React, { useState } from 'react';
import { Search, Link, FileText, Loader2, AlertCircle } from 'lucide-react';

interface AnalysisFormProps {
  onAnalyze: (text: string, url?: string) => void;
  isLoading: boolean;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({ onAnalyze, isLoading }) => {
  const [inputMode, setInputMode] = useState<'text' | 'url'>('text');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMode === 'text' && text.trim()) {
      onAnalyze(text.trim());
    } else if (inputMode === 'url' && url.trim()) {
      // In a real app, you'd fetch the URL content
      onAnalyze(`Content from ${url}`, url.trim());
    }
  };

  const exampleTexts = [
    "BREAKING: Scientists discover shocking truth about climate change that governments don't want you to know!",
    "Local mayor announces new infrastructure improvements following town hall meeting with community members.",
    "URGENT: This miracle cure will change your life forever - doctors hate this simple trick!",
  ];

  const handleExampleClick = (example: string) => {
    setText(example);
    setInputMode('text');
  };

  return (
    <div className="space-y-6">
      {/* Input Mode Toggle */}
      <div className="flex space-x-1 bg-slate-100 rounded-lg p-1">
        <button
          onClick={() => setInputMode('text')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            inputMode === 'text'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Text</span>
        </button>
        <button
          onClick={() => setInputMode('url')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            inputMode === 'url'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Link className="w-4 h-4" />
          <span>URL</span>
        </button>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {inputMode === 'text' ? (
          <div>
            <label htmlFor="text" className="block text-sm font-medium text-slate-700 mb-2">
              Enter text to analyze
            </label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste the news article or text you want to analyze for potential misinformation..."
              rows={8}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors duration-200"
              disabled={isLoading}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-slate-500">
                {text.length} characters
              </span>
              {text.length > 0 && text.length < 50 && (
                <div className="flex items-center text-amber-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Text too short for accurate analysis
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-slate-700 mb-2">
              Enter article URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/news-article"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              disabled={isLoading}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || (inputMode === 'text' && text.length < 50) || (inputMode === 'url' && !url.trim())}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span>Analyze for Fake News</span>
            </>
          )}
        </button>
      </form>

      {/* Example Texts */}
      {inputMode === 'text' && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-slate-700">Try these examples:</h4>
          <div className="space-y-2">
            {exampleTexts.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="w-full text-left p-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm text-slate-600 border border-slate-200 hover:border-slate-300 transition-colors duration-200"
                disabled={isLoading}
              >
                "{example}"
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisForm;
