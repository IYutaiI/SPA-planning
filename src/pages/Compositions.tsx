import { Plus, Edit2, Trash2, Layers, Shield } from 'lucide-react';
import { useApp } from '../store/AppContext';
import type { Strategy, Champion } from '../types';

const roleColors = {
  top: 'from-purple-500 to-violet-500',
  jungle: 'from-green-500 to-emerald-500',
  mid: 'from-blue-500 to-cyan-500',
  adc: 'from-yellow-500 to-orange-500',
  support: 'from-pink-500 to-rose-500',
};

const ChampionBubble = ({ champion, size = 'md', role }: { champion: Champion; size?: 'sm' | 'md' | 'lg'; role?: string }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const gradient = role ? roleColors[role as keyof typeof roleColors] : 'from-purple-500 to-cyan-500';

  return (
    <div className={`relative group cursor-pointer`}>
      <div className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br ${gradient} p-0.5 transition-transform group-hover:scale-110`}>
        <div className="w-full h-full rounded-xl overflow-hidden bg-dark-800">
          <img src={champion.image} alt={champion.name} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

const BannedChampion = ({ champion }: { champion: Champion }) => {
  return (
    <div className="relative w-11 h-11 rounded-xl overflow-hidden group cursor-pointer">
      <div className="w-full h-full bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-500/30 rounded-xl p-0.5">
        <img src={champion.image} alt={champion.name} className="w-full h-full object-cover rounded-lg opacity-50 grayscale" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[140%] h-0.5 bg-red-500 rotate-45 absolute shadow-lg shadow-red-500/50"></div>
      </div>
    </div>
  );
};

const StrategyCard = ({ strategy }: { strategy: Strategy }) => {
  const roles = [
    { key: 'top' as const, label: 'Top', color: 'text-purple-400' },
    { key: 'jungle' as const, label: 'Jungle', color: 'text-green-400' },
    { key: 'mid' as const, label: 'Mid', color: 'text-blue-400' },
    { key: 'adc' as const, label: 'ADC', color: 'text-yellow-400' },
    { key: 'support' as const, label: 'Support', color: 'text-pink-400' },
  ];

  const totalChampions = roles.reduce((acc, role) => acc + strategy.champions[role.key].length, 0);

  return (
    <div className="card card-hover p-6 group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/10 flex items-center justify-center">
            <Layers className="text-purple-400" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all">{strategy.name}</h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-gray-500 text-xs uppercase tracking-wider">Mis a jour {strategy.updatedAt}</span>
              <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 text-xs font-medium">
                {totalChampions} champions
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2.5 rounded-xl glass-light hover:bg-white/10 transition-all">
            <Edit2 size={16} className="text-gray-400 hover:text-white" />
          </button>
          <button className="p-2.5 rounded-xl glass-light hover:bg-red-500/10 transition-all">
            <Trash2 size={16} className="text-gray-400 hover:text-red-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-6">
        {roles.map(role => (
          <div key={role.key} className="text-center">
            <h4 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${role.color}`}>{role.label}</h4>
            <div className="flex flex-wrap justify-center gap-1.5">
              {strategy.champions[role.key].slice(0, 4).map((champion, idx) => (
                <div
                  key={champion.id}
                  className={idx > 0 ? '-ml-2' : ''}
                  style={{ zIndex: 10 - idx }}
                >
                  <ChampionBubble champion={champion} size={idx === 0 ? 'lg' : 'md'} role={role.key} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/5 pt-5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-red-400" />
            <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Bans prioritaires</span>
          </div>
          <div className="flex items-center gap-2">
            {strategy.priorityBans.map(champion => (
              <BannedChampion key={champion.id} champion={champion} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Compositions = () => {
  const { strategies } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
            {strategies.length} strategies
          </span>
        </div>

        <button className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium">
          <Plus size={16} />
          <span>Nouvelle Strategie</span>
        </button>
      </div>

      {/* Strategies List */}
      <div className="space-y-4">
        {strategies.map(strategy => (
          <StrategyCard key={strategy.id} strategy={strategy} />
        ))}
      </div>

      {/* Empty State */}
      {strategies.length === 0 && (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/10 flex items-center justify-center mx-auto mb-4">
            <Layers className="text-purple-400" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Aucune strategie</h3>
          <p className="text-gray-500 text-sm mb-6">Creez votre premiere composition d'equipe</p>
          <button className="btn-primary px-6 py-2.5 rounded-xl text-white font-medium inline-flex items-center gap-2">
            <Plus size={16} />
            <span>Nouvelle Strategie</span>
          </button>
        </div>
      )}
    </div>
  );
};
