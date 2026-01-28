import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useApp } from '../store/AppContext';
import type { Strategy, Champion } from '../types';

const ChampionBubble = ({ champion, size = 'md' }: { champion: Champion; size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-dark-600 hover:border-purple-500 transition-colors cursor-pointer`}
    >
      <img src={champion.image} alt={champion.name} className="w-full h-full object-cover" />
    </div>
  );
};

const BannedChampion = ({ champion }: { champion: Champion }) => {
  return (
    <div className="relative w-10 h-10 rounded-full overflow-hidden">
      <img src={champion.image} alt={champion.name} className="w-full h-full object-cover opacity-50" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-0.5 bg-red-500 rotate-45 absolute"></div>
      </div>
    </div>
  );
};

const StrategyCard = ({ strategy }: { strategy: Strategy }) => {
  const roles = [
    { key: 'top' as const, label: 'Top Lane' },
    { key: 'jungle' as const, label: 'Jungle' },
    { key: 'mid' as const, label: 'Mid Lane' },
    { key: 'adc' as const, label: 'Bot Lane (ADC)' },
    { key: 'support' as const, label: 'Support' },
  ];

  return (
    <div className="bg-dark-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">{strategy.name}</h3>
          <p className="text-gray-500 text-sm">
            MIS À JOUR {strategy.updatedAt} • {
              roles.reduce((acc, role) => acc + strategy.champions[role.key].length, 0)
            } CHAMPIONS
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 bg-dark-600 rounded-lg hover:bg-dark-500 transition-colors">
            <Edit2 size={18} className="text-gray-400" />
          </button>
          <button className="p-2 bg-dark-600 rounded-lg hover:bg-dark-500 transition-colors">
            <Trash2 size={18} className="text-gray-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6 mb-8">
        {roles.map(role => (
          <div key={role.key} className="text-center">
            <h4 className="text-gray-400 text-sm mb-4">{role.label}</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {strategy.champions[role.key].slice(0, 4).map((champion, idx) => (
                <div
                  key={champion.id}
                  className={idx === 0 ? '' : '-ml-3'}
                  style={{ zIndex: 10 - idx }}
                >
                  <ChampionBubble champion={champion} size={idx === 0 ? 'lg' : 'md'} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-dark-600 pt-6">
        <div className="flex items-center gap-4">
          <span className="text-gray-500 text-sm font-medium">BANS PRIORITAIRES</span>
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
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white italic">Mes Stratégies</h1>
          <p className="text-purple-400 text-sm">CONFIGURATIONS TACTIQUES OFFICIELLES</p>
        </div>
        <button className="flex items-center gap-2 bg-transparent border border-white text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
          <Plus size={16} />
          <span>Nouvelle Stratégie</span>
        </button>
      </div>

      <div className="space-y-6">
        {strategies.map(strategy => (
          <StrategyCard key={strategy.id} strategy={strategy} />
        ))}
      </div>
    </div>
  );
};
