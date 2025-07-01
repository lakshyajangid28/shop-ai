'use client';

import React, { useState, useMemo } from 'react';
import SelectAgent from '@/components/AiAgents/SelectAgent';

const ShoppingAssistantsPage: React.FC = () => {
    const [agentSelected, setAgentSelected] = useState(true);
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
            <SelectAgent />
        </div>
    );
};

export default ShoppingAssistantsPage;