'use client';

import { useState } from 'react';
import { Lead, LeadStage, KanbanColumn } from '@/types/lead';
import LeadCard from './LeadCard';

interface KanbanBoardProps {
  columns: KanbanColumn[];
  onLeadClick?: (lead: Lead) => void;
}

export default function KanbanBoard({ columns, onLeadClick }: KanbanBoardProps) {
  console.log('KanbanBoard - Rendering with columns:', columns);

  const getColumnColor = (stage: LeadStage) => {
    switch (stage) {
      case 'FRIOS': return 'from-gray-500 to-gray-600';
      case 'TOFU': return 'from-blue-500 to-blue-600';
      case 'MOFU': return 'from-yellow-500 to-yellow-600';
      case 'BOFU': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns?.map((column) => (
        <div
          key={column.id}
          className="flex flex-col bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
        >
          {/* Column Header */}
          <div className={`bg-gradient-to-r ${getColumnColor(column.id)} p-4 text-white`}>
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-bold text-lg">{column.title}</h2>
              <span className="px-2 py-1 bg-white/20 rounded-lg text-sm font-semibold">
                {column.leads.length}
              </span>
            </div>
            <p className="text-sm opacity-90">{column.description}</p>
          </div>

          {/* Column Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[400px]">
            {column.leads.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
                Nenhum lead nesta etapa
              </div>
            ) : (
              column.leads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onClick={onLeadClick}
                />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
