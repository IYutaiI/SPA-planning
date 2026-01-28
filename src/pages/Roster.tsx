import { ExternalLink } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { PlayerCard } from '../components/PlayerCard';

export const Roster = () => {
  const { players } = useApp();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Effectif</h1>
        <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
          <ExternalLink size={16} />
          <span>OP.GG Multi</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.map(player => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
};
