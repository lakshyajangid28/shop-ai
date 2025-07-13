'use client';

import React, { useState } from 'react';
import { AssistantCard } from '@/components/AiAgents/AssistantCard';
import { shoppingAssistants } from '@/data/shopping-assitants';
import ChatBox from '../ChatBox/ChatBox';
import { useUser } from '@clerk/nextjs';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const SelectAgent: React.FC = () => {
    const [selectedAssistant, setSelectedAssistant] = useState<any | null>(null);
    const router = useRouter();
    const { isLoaded, isSignedIn } = useUser();

    const handleAgentClick = (assistantId: string) => {
        if (!isLoaded || !isSignedIn) {
            Swal.fire({
                title: 'Sign in required',
                text: 'Please sign in to access your AI Assistant.',
                icon: 'warning',
            });
            router.push('/login');
            return;
        }
        if (assistantId === 'serenity') {
            const assistant = shoppingAssistants.find(a => a.id === 'serenity');
            setSelectedAssistant(assistant);
        } else if (assistantId === 'sparkle') {
            router.push('/customer-support');
        }
    };

    if (selectedAssistant) {
        return <ChatBox assistant={selectedAssistant} />;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Meet Your AI Assistants
                </h1>
                <br />
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Choose from our specialized AI shopping assistants to help you find the
                    perfect products for any occasion
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 justify-items-center">
                {shoppingAssistants.map((assistant) => (
                    <AssistantCard
                        key={assistant.id}
                        assistant={assistant}
                        onStartShopping={() => handleAgentClick(assistant.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default SelectAgent;