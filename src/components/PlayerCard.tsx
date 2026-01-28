import { User } from 'lucide-react';
import type { Player, Role } from '../types';

const roleColors: Record<Role, string> = {
  TOP: 'text-purple-400',
  JNG: 'text-green-400',
  MID: 'text-blue-400',
  ADC: 'text-yellow-400',
  SUP: 'text-pink-400',
};

interface PlayerCardProps {
  player: Player;
}

export const PlayerCard = ({ player }: PlayerCardProps) => {
  return (
    <div className="bg-dark-700 rounded-xl p-4 flex items-center gap-4 hover:bg-dark-600 transition-colors cursor-pointer">
      <div className="w-12 h-12 rounded-full bg-dark-500 flex items-center justify-center">
        {player.avatar ? (
          <img src={player.avatar} alt={player.name} className="w-full h-full rounded-full object-cover" />
        ) : (
          <User size={24} className="text-gray-400" />
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-white font-medium">{player.name}</span>
        <span className="text-gray-500 text-sm">{player.tag}</span>
        <span className={`text-sm font-semibold ${roleColors[player.role]}`}>{player.role}</span>
      </div>
    </div>
  );
};
