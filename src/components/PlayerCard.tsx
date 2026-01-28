import { User, TrendingUp, Gamepad2 } from 'lucide-react';
import type { Player, Role } from '../types';

const roleConfig: Record<Role, { color: string; bg: string; gradient: string }> = {
  TOP: { color: 'text-purple-400', bg: 'bg-purple-500/20', gradient: 'from-purple-500 to-violet-500' },
  JNG: { color: 'text-green-400', bg: 'bg-green-500/20', gradient: 'from-green-500 to-emerald-500' },
  MID: { color: 'text-blue-400', bg: 'bg-blue-500/20', gradient: 'from-blue-500 to-cyan-500' },
  ADC: { color: 'text-yellow-400', bg: 'bg-yellow-500/20', gradient: 'from-yellow-500 to-orange-500' },
  SUP: { color: 'text-pink-400', bg: 'bg-pink-500/20', gradient: 'from-pink-500 to-rose-500' },
};

interface PlayerCardProps {
  player: Player;
}

export const PlayerCard = ({ player }: PlayerCardProps) => {
  const role = roleConfig[player.role];

  return (
    <div className="group card card-hover p-5 cursor-pointer relative overflow-hidden">
      {/* Background gradient on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

      {/* Role indicator line */}
      <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${role.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

      <div className="relative flex items-center gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${role.gradient} p-0.5`}>
            <div className="w-full h-full rounded-xl bg-dark-800 flex items-center justify-center overflow-hidden">
              {player.avatar ? (
                <img src={player.avatar} alt={player.name} className="w-full h-full object-cover" />
              ) : (
                <User size={24} className="text-gray-400" />
              )}
            </div>
          </div>
          {/* Online indicator */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-dark-800 rounded-full flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold truncate">{player.name}</span>
            <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${role.bg} ${role.color}`}>
              {player.role}
            </span>
          </div>
          <span className="text-gray-500 text-sm block truncate">{player.tag}</span>

          {/* Stats preview */}
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <TrendingUp size={12} className="text-green-400" />
              <span>62% WR</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Gamepad2 size={12} className="text-purple-400" />
              <span>142 games</span>
            </div>
          </div>
        </div>

        {/* Rank badge */}
        <div className="flex flex-col items-center gap-1">
          <div className={`w-10 h-10 rounded-lg ${role.bg} flex items-center justify-center`}>
            <span className={`text-lg font-bold ${role.color}`}>D1</span>
          </div>
          <span className="text-xs text-gray-500">Rank</span>
        </div>
      </div>
    </div>
  );
};
