import { TrendingUp, TrendingDown, Users, Clock, Trophy, Target, User } from 'lucide-react';

const stats = [
  { label: 'Win Rate', value: '67%', trend: 'up', change: '+5%', icon: Trophy, gradient: 'from-green-500 to-emerald-500' },
  { label: 'Scrims joues', value: '24', trend: 'neutral', change: '', icon: Target, gradient: 'from-purple-500 to-violet-500' },
  { label: 'Duree moyenne', value: '32:45', trend: 'down', change: '-2:30', icon: Clock, gradient: 'from-cyan-500 to-blue-500' },
  { label: 'KDA moyen', value: '4.2', trend: 'up', change: '+0.3', icon: TrendingUp, gradient: 'from-yellow-500 to-orange-500' },
];

const playerStats = [
  { name: 'NexusPlayer1', role: 'TOP', kda: '3.8', cs: '7.2', winRate: '65%', color: 'purple' },
  { name: 'JunglerGod', role: 'JNG', kda: '4.5', cs: '5.1', winRate: '70%', color: 'green' },
  { name: 'MidKing', role: 'MID', kda: '5.2', cs: '8.4', winRate: '68%', color: 'blue' },
  { name: 'CarryOnly', role: 'ADC', kda: '4.8', cs: '9.1', winRate: '72%', color: 'yellow' },
  { name: 'VisionLord', role: 'SUP', kda: '3.2', cs: '1.2', winRate: '66%', color: 'pink' },
];

const roleColors: Record<string, { bg: string; text: string; gradient: string }> = {
  TOP: { bg: 'bg-purple-500/10', text: 'text-purple-400', gradient: 'from-purple-500 to-violet-500' },
  JNG: { bg: 'bg-green-500/10', text: 'text-green-400', gradient: 'from-green-500 to-emerald-500' },
  MID: { bg: 'bg-blue-500/10', text: 'text-blue-400', gradient: 'from-blue-500 to-cyan-500' },
  ADC: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', gradient: 'from-yellow-500 to-orange-500' },
  SUP: { bg: 'bg-pink-500/10', text: 'text-pink-400', gradient: 'from-pink-500 to-rose-500' },
};

export const Statistiques = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="card p-5 group hover-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm">{stat.label}</span>
              {stat.trend === 'up' && (
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10">
                  <TrendingUp size={12} className="text-green-400" />
                  <span className="text-xs text-green-400 font-medium">{stat.change}</span>
                </div>
              )}
              {stat.trend === 'down' && (
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/10">
                  <TrendingDown size={12} className="text-red-400" />
                  <span className="text-xs text-red-400 font-medium">{stat.change}</span>
                </div>
              )}
            </div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} bg-opacity-20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon className="text-white" size={22} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Players Performance Table */}
      <div className="card overflow-hidden">
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/10 flex items-center justify-center">
                <Users size={20} className="text-purple-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Performance Joueurs</h2>
                <p className="text-gray-500 text-xs">Statistiques individuelles de l'equipe</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium">
                Cette saison
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-gray-500 text-xs font-semibold uppercase tracking-wider p-4">Joueur</th>
                <th className="text-left text-gray-500 text-xs font-semibold uppercase tracking-wider p-4">Role</th>
                <th className="text-left text-gray-500 text-xs font-semibold uppercase tracking-wider p-4">KDA</th>
                <th className="text-left text-gray-500 text-xs font-semibold uppercase tracking-wider p-4">CS/min</th>
                <th className="text-left text-gray-500 text-xs font-semibold uppercase tracking-wider p-4">Win Rate</th>
              </tr>
            </thead>
            <tbody>
              {playerStats.map((player, index) => {
                const role = roleColors[player.role];
                return (
                  <tr
                    key={player.name}
                    className={`border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group ${
                      index === playerStats.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${role.gradient} p-0.5`}>
                          <div className="w-full h-full rounded-xl bg-dark-800 flex items-center justify-center">
                            <User size={16} className="text-gray-400" />
                          </div>
                        </div>
                        <span className="text-white font-medium group-hover:text-purple-400 transition-colors">
                          {player.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-lg ${role.bg} ${role.text} text-xs font-bold`}>
                        {player.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-white font-semibold">{player.kda}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-white">{player.cs}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-dark-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                            style={{ width: player.winRate }}
                          ></div>
                        </div>
                        <span className="text-green-400 font-semibold text-sm">{player.winRate}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-5">
          <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">Meilleur KDA</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-0.5">
              <div className="w-full h-full rounded-xl bg-dark-800 flex items-center justify-center">
                <User size={18} className="text-gray-400" />
              </div>
            </div>
            <div>
              <p className="text-white font-semibold">MidKing</p>
              <p className="text-cyan-400 text-sm font-bold">5.2 KDA</p>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">Meilleur Win Rate</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 p-0.5">
              <div className="w-full h-full rounded-xl bg-dark-800 flex items-center justify-center">
                <User size={18} className="text-gray-400" />
              </div>
            </div>
            <div>
              <p className="text-white font-semibold">CarryOnly</p>
              <p className="text-green-400 text-sm font-bold">72% WR</p>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">Meilleur CS/min</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 p-0.5">
              <div className="w-full h-full rounded-xl bg-dark-800 flex items-center justify-center">
                <User size={18} className="text-gray-400" />
              </div>
            </div>
            <div>
              <p className="text-white font-semibold">CarryOnly</p>
              <p className="text-purple-400 text-sm font-bold">9.1 CS/min</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
