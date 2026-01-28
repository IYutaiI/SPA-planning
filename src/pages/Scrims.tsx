import { Plus, Calendar, Clock, Trophy } from 'lucide-react';
import { useApp } from '../store/AppContext';

export const Scrims = () => {
  const { scrims } = useApp();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Scrims</h1>
          <p className="text-gray-500">Gestion des matchs d'entraînement</p>
        </div>
        <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus size={16} />
          <span>Nouveau Scrim</span>
        </button>
      </div>

      <div className="grid gap-4">
        {scrims.map(scrim => (
          <div
            key={scrim.id}
            className="bg-dark-700 rounded-xl p-5 flex items-center justify-between hover:bg-dark-600 transition-colors"
          >
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-dark-500 flex items-center justify-center">
                <Trophy size={24} className="text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">vs {scrim.opponent}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Calendar size={14} />
                    <span className="text-sm">{scrim.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock size={14} />
                    <span className="text-sm">{scrim.time}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {scrim.result === 'pending' ? (
                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm">
                  À venir
                </span>
              ) : scrim.result === 'win' ? (
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                    Victoire
                  </span>
                  <span className="text-white font-bold">{scrim.score}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm">
                    Défaite
                  </span>
                  <span className="text-white font-bold">{scrim.score}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
