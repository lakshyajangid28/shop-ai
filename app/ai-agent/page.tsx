'use client';

import React, { useState } from 'react';
import SelectAgent from '@/components/AiAgents/SelectAgent';

const ShoppingAssistantsPage = () => {
    return (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50">
            <SelectAgent />
            <br />
        </div>
    );
};

export default ShoppingAssistantsPage;