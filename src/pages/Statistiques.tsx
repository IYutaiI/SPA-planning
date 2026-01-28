import { BarChart3, TrendingUp, TrendingDown, Users } from 'lucide-react';

const stats = [
  { label: 'Win Rate', value: '67%', trend: 'up', change: '+5%' },
  { label: 'Scrims joués', value: '24', trend: 'neutral', change: '' },
  { label: 'Durée moyenne', value: '32:45', trend: 'down', change: '-2:30' },
  { label: 'KDA moyen', value: '4.2', trend: 'up', change: '+0.3' },
];

const playerStats = [
  { name: 'NexusPlayer1', role: 'TOP', kda: '3.8', cs: '7.2', winRate: '65%' },
  { name: 'JunglerGod', role: 'JNG', kda: '4.5', cs: '5.1', winRate: '70%' },
  { name: 'MidKing', role: 'MID', kda: '5.2', cs: '8.4', winRate: '68%' },
  { name: 'CarryOnly', role: 'ADC', kda: '4.8', cs: '9.1', winRate: '72%' },
  { name: 'VisionLord', role: 'SUP', kda: '3.2', cs: '1.2', winRate: '66%' },
];

export const Statistiques = () => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="text-purple-500" size={24} />
        <h1 className="text-2xl font-bold text-white">Statistiques</h1>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="bg-dark-700 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">{stat.label}</span>
              {stat.trend === 'up' && (
                <div className="flex items-center gap-1 text-green-400">
                  <TrendingUp size={14} />
                  <span className="text-xs">{stat.change}</span>
                </div>
              )}
              {stat.trend === 'down' && (
                <div className="flex items-center gap-1 text-red-400">
                  <TrendingDown size={14} />
                  <span className="text-xs">{stat.change}</span>
                </div>
              )}
            </div>
            <div className="text-3xl font-bold text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-dark-700 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users size={20} className="text-purple-400" />
          <h2 className="text-lg font-bold text-white">Performance Joueurs</h2>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-600">
              <th className="text-left text-gray-500 text-sm p-3">Joueur</th>
              <th className="text-left text-gray-500 text-sm p-3">Rôle</th>
              <th className="text-left text-gray-500 text-sm p-3">KDA</th>
              <th className="text-left text-gray-500 text-sm p-3">CS/min</th>
              <th className="text-left text-gray-500 text-sm p-3">Win Rate</th>
            </tr>
          </thead>
          <tbody>
            {playerStats.map(player => (
              <tr key={player.name} className="border-b border-dark-600 hover:bg-dark-600">
                <td className="p-3">
                  <span className="text-white font-medium">{player.name}</span>
                </td>
                <td className="p-3">
                  <span className="text-purple-400">{player.role}</span>
                </td>
                <td className="p-3">
                  <span className="text-white">{player.kda}</span>
                </td>
                <td className="p-3">
                  <span className="text-white">{player.cs}</span>
                </td>
                <td className="p-3">
                  <span className="text-green-400">{player.winRate}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
