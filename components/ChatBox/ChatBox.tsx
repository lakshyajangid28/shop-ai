'use client';

import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import AIMessage from './ChatAIMessage';
import UserMessage from './ChatUserMessage';
import ChatControls from './ChatControls';
import ChatTranscript from './ChatTranscript';
import ChatHeader from './ChatHeader';
import ChatIntro from './ChatIntro';
import ChatError from './ChatError';

interface ChatBoxProps {
  assistant?: any;
}

const EnhancedChatBox: React.FC<ChatBoxProps> = ({ assistant }) => {
  const [conversationHistory, setConversationHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ChatError />
      </div>
    );
  }

  const handleSendMessage = async () => {
    const currentTranscript = transcript.trim();
    if (!currentTranscript) {
      setError('Please speak something before sending.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const userMessage = {
      role: 'user',
      content: currentTranscript,
      timestamp: new Date().toISOString(),
    };

    const updatedHistory = [...conversationHistory, userMessage];
    setConversationHistory(updatedHistory);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chat`, {
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

  const startListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.abortListening();
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 flex flex-col">
        <ChatHeader />
      <div className="flex-1 w-full">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          {error && <ChatError message={error} />}

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

          <ChatTranscript transcript={transcript} />

          <div className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-2xl min-h-[600px]">
            <div className="bg-white/90 backdrop-blur-lg border-b border-gray-200 rounded-t-3xl p-6 pb-8">
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

            <div className="p-8">
              {conversationHistory.length === 0 ? (
                <ChatIntro />
              ) : (
                <div className="space-y-8">
                  {conversationHistory.map((message, index) =>
                    message.role === 'user' ? (
                      <UserMessage key={index} message={message} />
                    ) : (
                      <AIMessage key={index} message={message} idx={index} />
                    )
                  )}

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
