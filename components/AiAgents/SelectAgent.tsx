'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { AssistantCard } from '@/components/AiAgents/AssistantCard';
import { SearchAndFilter } from '@/components/AiAgents/SearchAndFilter';
import { shoppingAssistants } from '@/data/shopping-assitants';
import { FilterOptions } from '@/types/shopping-assitants';
import ReactDOM from 'react-dom/client';
import { usePopoutPortal } from './usePopoutPortal';
import ChatBox from '../ChatBox/ChatBox';

const SelectAgent: React.FC = () => {
    const [filters, setFilters] = useState<FilterOptions>({
        search: '',
        specialty: 'All Specialties'
    });
    const [agentId, setAgentId] = useState<string | null>(null);
    const { openPortal, containerRef } = usePopoutPortal({ title: 'AI Assistant Chat' });
    const [popoutAssistant, setPopoutAssistant] = useState<any | null>(null);
    const rootRef = useRef<any>(null);

    // Filter assistants based on search and specialty
    const filteredAssistants = useMemo(() => {
        return shoppingAssistants.filter(assistant => {
            const matchesSearch = filters.search === '' ||
                assistant.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                assistant.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                assistant.expertise.some(skill =>
                    skill.toLowerCase().includes(filters.search.toLowerCase())
                );

            const matchesSpecialty = filters.specialty === 'All Specialties' ||
                assistant.category === filters.specialty;

            return matchesSearch && matchesSpecialty;
        });
    }, [filters]);

    useEffect(() => {
        if (popoutAssistant && containerRef.current) {
            if (!rootRef.current) {
                rootRef.current = ReactDOM.createRoot(containerRef.current);
            }
            rootRef.current.render(<ChatBox assistant={popoutAssistant} />);
        }
    }, [popoutAssistant, containerRef]);

    const handleStartShopping = (assistantId: string) => {
        const assistant = shoppingAssistants.find(a => a.id === assistantId);
        if (!assistant) return;
        setPopoutAssistant(assistant);
        openPortal();
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Meet Your AI Shopping Assistants
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Choose from our specialized AI shopping assistants to help you find the
                    perfect products for any occasion
                </p>
            </div>

            <SearchAndFilter
                filters={filters}
                onFiltersChange={setFilters}
            />

            {filters.search || filters.specialty !== 'All Specialties' ? (
                <div className="text-center mb-8">
                    <p className="text-gray-600">
                        Showing {filteredAssistants.length} of {shoppingAssistants.length} assistants
                    </p>
                </div>
            ) : null}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {filteredAssistants.map((assistant) => (
                    <AssistantCard
                        key={assistant.id}
                        assistant={assistant}
                        onStartShopping={handleStartShopping}
                    />
                ))}
            </div>

            {filteredAssistants.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No assistants found</h3>
                    <p className="text-gray-500">
                        Try adjusting your search terms or filter settings
                    </p>
                </div>
            )}

            {/* Portal container for popout window */}
            <div ref={containerRef} style={{ display: 'none' }} />
        </div>
    );
};

export default SelectAgent;