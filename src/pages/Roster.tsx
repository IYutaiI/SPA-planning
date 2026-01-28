import { ExternalLink, UserPlus, Filter, Users, Trophy, Target } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { PlayerCard } from '../components/PlayerCard';

export const Roster = () => {
  const { players } = useApp();

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-5 group hover-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Joueurs actifs</p>
              <p className="text-3xl font-bold text-white">{players.length}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="text-purple-400" size={24} />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-500">Tous en ligne</span>
          </div>
        </div>

        <div className="card p-5 group hover-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Winrate moyen</p>
              <p className="text-3xl font-bold text-white">58.4%</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Trophy className="text-green-400" size={24} />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-green-400">+2.3%</span>
            <span className="text-xs text-gray-500">vs. semaine derniere</span>
          </div>
        </div>

        <div className="card p-5 group hover-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Objectif hebdo</p>
              <p className="text-3xl font-bold text-white">12/20</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Target className="text-cyan-400" size={24} />
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full h-1.5 bg-dark-600 rounded-full overflow-hidden">
              <div className="h-full w-[60%] bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"></div>
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
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <span className="text-xs text-purple-400">5 roles</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-light text-gray-400 hover:text-white hover:bg-white/10 transition-all">
            <ExternalLink size={16} />
            <span className="text-sm">OP.GG Multi</span>
          </button>
          <button className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium">
            <UserPlus size={16} />
            <span className="text-sm">Ajouter</span>
          </button>
        </div>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {players.map(player => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>

      {/* Empty state (if needed) */}
      {players.length === 0 && (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/10 flex items-center justify-center mx-auto mb-4">
            <Users className="text-purple-400" size={32} />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Aucun joueur</h3>
          <p className="text-gray-500 text-sm mb-6">Commencez par ajouter des joueurs a votre effectif</p>
          <button className="btn-primary px-6 py-2.5 rounded-xl text-white font-medium inline-flex items-center gap-2">
            <UserPlus size={16} />
            <span>Ajouter un joueur</span>
          </button>
        </div>
      )}
    </div>
  );
};
