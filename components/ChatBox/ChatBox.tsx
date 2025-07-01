import React, { useState } from 'react';
import { AlertCircle, MessageCircle, ShoppingBag } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import AIMessage from './ChatAIMessage';
import UserMessage from './ChatUserMessage';
import ChatControls from './ChatControls';
import ChatTranscript from './ChatTranscript';

interface ChatBoxProps {
  assistant?: any;
}

const EnhancedChatBox: React.FC<ChatBoxProps> = ({ assistant }) => {
  const [conversationHistory, setConversationHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const startListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.abortListening();
  };

  // Browser Support Check for Speech Recognition
  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-12 shadow-2xl text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Browser Not Supported</h2>
          <p className="text-gray-600 leading-relaxed">
            Your browser doesn't support speech recognition. Please use Chrome, Edge, or Safari for the best experience.
          </p>
        </div>
      </div>
    );
  }

  // Handle Send Message with Backend Integration
  const handleSendMessage = async () => {
    const currentTranscript = transcript.trim();
    if (!currentTranscript) {
      setError('Please speak something before sending.');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Create user message
    const userMessage = {
      role: 'user',
      content: currentTranscript,
      timestamp: new Date().toISOString(),
    };

    const updatedHistory = [...conversationHistory, userMessage];
    setConversationHistory(updatedHistory);

    try {
      // Backend API call
      const response = await fetch('http://localhost:5001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: currentTranscript,
          messageHistory: conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Create AI response message
      const aiMessage = {
        role: 'assistant',
        content: data.message || 'I processed your request.',
        intent: data.intent || 'shopping',
        data: data.recommendations || data.data || null,
        query: data.query || null,
        timestamp: new Date().toISOString(),
        success: data.success || false,
        error: data.error || null,
        requiresClarification: data.requiresClarification || false,
        shoppingAdvice: data.shoppingAdvice || null,
      };

      setConversationHistory((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      setError(`Failed to get AI response: ${err.message}`);

      // Add error message to conversation
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        error: err.message,
        timestamp: new Date().toISOString(),
      };

      setConversationHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      resetTranscript();
    }
  };

  const clearHistory = () => {
    setConversationHistory([]);
    setError(null);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 flex flex-col">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-md">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight md:leading-tight tracking-tight" style={{ WebkitTextStroke: '1px #fff', paddingTop: '2px', paddingBottom: '2px' }}>
                AI Shopping Assistant
              </h1>
            </div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Speak naturally to get personalized product recommendations and shopping advice
            </p>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 w-full">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-8 shadow-lg animate-in fade-in duration-500">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <div>
                  <h3 className="font-semibold text-red-800">Error</h3>
                  <p className="text-red-600">{error}</p>
                </div>
              </div>
            </div>
          )}
          {/* Chat Controls */}
          <ChatControls
            transcript={transcript}
            isLoading={isLoading}
            isListening={isListening}
            onSend={handleSendMessage}
            onStart={startListening}
            onStop={stopListening}
            onReset={resetTranscript}
            onClear={clearHistory}
          />
          {/* Live Transcript */}
          <ChatTranscript transcript={transcript} />
          {/* Chat Container */}
          <div className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-2xl min-h-[600px]">
            {/* Chat Header */}
            <div className="bg-white/90 backdrop-blur-lg border-b border-gray-200 rounded-t-3xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-blue-700">Conversation</h2>
                </div>
                <div className="bg-blue-100/60 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-sm font-medium text-blue-700">{conversationHistory.length} messages</span>
                </div>
              </div>
            </div>
            {/* Chat Messages */}
            <div className="p-8">
              {conversationHistory.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <MessageCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Start Your Conversation</h3>
                  <p className="text-gray-600 mb-2">Click "Start Listening" and speak naturally</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4 text-sm text-gray-500">
                    <span className="bg-gray-100 px-3 py-1 rounded-full">"Find me wireless headphones"</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">"What's a good gift for mom?"</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">"I need a laptop for work"</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {conversationHistory.map((message, index) =>
                    message.role === 'user' ? (
                      <UserMessage key={index} message={message} />
                    ) : (
                      <AIMessage key={index} message={message} idx={index} />
                    ),
                  )}
                  {/* Loading State */}
                  {isLoading && (
                    <div className="flex items-center gap-4 animate-in fade-in duration-500">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
                      </div>
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-gray-200 rounded-2xl p-4 shadow-sm">
                        <p className="text-gray-700">AI is thinking...</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedChatBox;