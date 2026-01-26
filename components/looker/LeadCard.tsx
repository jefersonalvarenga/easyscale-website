'use client';

import { Lead } from '@/types/lead';

interface LeadCardProps {
  lead: Lead;
  onClick?: (lead: Lead) => void;
}

export default function LeadCard({ lead, onClick }: LeadCardProps) {
  const getTimeInfo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    let formattedTime = '';
    if (minutes < 60) formattedTime = `${minutes}m`;
    else if (hours < 24) formattedTime = `${hours}h`;
    else formattedTime = `${days}d`;

    // Determinar cor baseado no tempo
    let colorClass = '';
    if (minutes > 10) {
      colorClass = 'bg-red-500 text-white'; // Mais de 10 minutos - vermelho
    } else if (minutes > 5) {
      colorClass = 'bg-yellow-500 text-white'; // Mais de 5 minutos - amarelo
    } else {
      colorClass = 'bg-green-500 text-white'; // Menos de 5 minutos - verde
    }

    return { formattedTime, colorClass };
  };

  const timeInfo = getTimeInfo(lead.lastMessageTime);

  return (
    <div
      onClick={() => onClick?.(lead)}
      className="bg-white rounded-lg border border-gray-200 p-3 cursor-pointer hover:shadow-md transition-all hover:border-[#635BFF]/30"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-900 text-sm truncate flex-1">{lead.name}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold flex-shrink-0 ml-2 ${timeInfo.colorClass}`}>
          {timeInfo.formattedTime}
        </span>
      </div>

      {/* Phone */}
      <p className="text-xs text-gray-500 mb-2">{lead.phone}</p>

      {/* Psychological Profile */}
      {lead.psychologicalProfile && (
        <div className="mb-2">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded">
            {lead.psychologicalProfile}
          </span>
        </div>
      )}

      {/* Summary */}
      {lead.summary && (
        <div className="mb-2 p-2 bg-gray-50 rounded text-xs text-gray-600 line-clamp-2">
          {lead.summary}
        </div>
      )}

      {/* Footer - Unread Count */}
      {lead.unreadCount > 0 && (
        <div className="flex justify-end">
          <span className="px-2 py-0.5 text-xs font-medium bg-gray-200 text-gray-700 rounded-full">
            {lead.unreadCount} nova{lead.unreadCount > 1 ? 's' : ''}
          </span>
        </div>
      )}
    </div>
  );
}
