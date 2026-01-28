import { Plus, Calendar, Clock, Trophy, Swords, TrendingUp, Filter } from 'lucide-react';
import { useApp } from '../store/AppContext';

export const Scrims = () => {
  const { scrims } = useApp();

  const wins = scrims.filter(s => s.result === 'win').length;
  const losses = scrims.filter(s => s.result === 'loss').length;
  const pending = scrims.filter(s => s.result === 'pending').length;
  const winRate = scrims.length > 0 ? Math.round((wins / (wins + losses)) * 100) || 0 : 0;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-5 group hover-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Scrims</p>
              <p className="text-3xl font-bold text-white">{scrims.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Swords className="text-purple-400" size={24} />
            </div>
          </div>
        </div>

        <div className="card p-5 group hover-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Victoires</p>
              <p className="text-3xl font-bold text-green-400">{wins}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Trophy className="text-green-400" size={24} />
            </div>
          </div>
        </div>

        <div className="card p-5 group hover-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Defaites</p>
              <p className="text-3xl font-bold text-red-400">{losses}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/5 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="text-red-400 rotate-180" size={24} />
            </div>
          </div>
        </div>

        <div className="card p-5 group hover-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Win Rate</p>
              <p className="text-3xl font-bold gradient-text">{winRate}%</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="text-cyan-400" size={24} />
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full h-1.5 bg-dark-600 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full transition-all duration-500"
                style={{ width: `${winRate}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-light text-gray-400 hover:text-white hover:bg-white/10 transition-all">
            <Filter size={16} />
            <span className="text-sm">Filtrer</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-medium">
              {pending} a venir
            </span>
          </div>
        </div>

        <button className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium">
          <Plus size={16} />
          <span>Nouveau Scrim</span>
        </button>
      </div>

      {/* Scrims List */}
      <div className="space-y-3">
        {scrims.map(scrim => (
          <div
            key={scrim.id}
            className="card card-hover p-5 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                {/* Team Icon */}
                <div className="relative">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    scrim.result === 'win'
                      ? 'bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30'
                      : scrim.result === 'loss'
                      ? 'bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-500/30'
                      : 'bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 border border-yellow-500/30'
                  }`}>
                    <Trophy size={24} className={
                      scrim.result === 'win' ? 'text-green-400' :
                      scrim.result === 'loss' ? 'text-red-400' : 'text-yellow-400'
                    } />
                  </div>
                </div>

                {/* Match Info */}
                <div>
                  <h3 className="text-white font-semibold text-lg group-hover:text-purple-400 transition-colors">
                    vs {scrim.opponent}
                  </h3>
                  <div className="flex items-center gap-4 mt-1.5">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Calendar size={14} />
                      <span className="text-sm">{scrim.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <Clock size={14} />
                      <span className="text-sm">{scrim.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Result */}
              <div className="flex items-center gap-4">
                {scrim.result === 'pending' ? (
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium">
                      A venir
                    </span>
                  </div>
                ) : scrim.result === 'win' ? (
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
                      Victoire
                    </span>
                    <span className="text-2xl font-bold text-white">{scrim.score}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                      Defaite
                    </span>
                    <span className="text-2xl font-bold text-white">{scrim.score}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {scrims.length === 0 && (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/10 flex items-center justify-center mx-auto mb-4">
            <Swords className="text-purple-400" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Aucun scrim</h3>
          <p className="text-gray-500 text-sm mb-6">Planifiez votre premier match d'entrainement</p>
          <button className="btn-primary px-6 py-2.5 rounded-xl text-white font-medium inline-flex items-center gap-2">
            <Plus size={16} />
            <span>Nouveau Scrim</span>
          </button>
        </div>
      )}
    </div>
  );
};
