import { Play, RotateCcw, Swords, Shield } from 'lucide-react';

export const DraftSimulation = () => {
  const positions = [
    { id: 'TOP', label: 'Top Lane' },
    { id: 'JNG', label: 'Jungle' },
    { id: 'MID', label: 'Mid Lane' },
    { id: 'ADC', label: 'Bot Lane' },
    { id: 'SUP', label: 'Support' },
  ];

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-light text-gray-400 hover:text-white hover:bg-white/10 transition-all">
          <RotateCcw size={16} />
          <span className="text-sm">Reset</span>
        </button>
        <button className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium">
          <Play size={16} />
          <span>Demarrer</span>
        </button>
      </div>

      {/* Draft Board */}
      <div className="grid grid-cols-3 gap-6">
        {/* Blue Team */}
        <div className="card p-6 border-t-2 border-t-blue-500">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
            <h2 className="text-blue-400 font-bold text-lg uppercase tracking-wider">Equipe Bleue</h2>
          </div>

          <div className="space-y-3">
            {positions.map(pos => (
              <div
                key={pos.id}
                className="group flex items-center gap-4 glass-light rounded-xl p-3 cursor-pointer hover:bg-blue-500/10 hover:border-blue-500/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border-2 border-dashed border-blue-500/40 flex items-center justify-center group-hover:border-blue-500 transition-all">
                  <span className="text-blue-400/50 text-xs font-bold">+</span>
                </div>
                <div>
                  <span className="text-white font-medium">{pos.id}</span>
                  <p className="text-gray-500 text-xs">{pos.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-5 border-t border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={14} className="text-blue-400" />
              <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Bans</span>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-2 border-dashed border-blue-500/30 hover:border-blue-500 transition-all cursor-pointer flex items-center justify-center"
                >
                  <span className="text-blue-400/30 text-xs">+</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* VS Center */}
        <div className="card p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5"></div>
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/10 flex items-center justify-center mb-4 mx-auto">
              <Swords className="text-purple-400" size={36} />
            </div>
            <div className="text-5xl font-black gradient-text mb-4">VS</div>
            <p className="text-gray-500 text-center text-sm max-w-[200px]">
              Selectionnez les champions pour simuler le draft
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="h-0.5 w-16 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 rounded-full"></div>
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
            </div>
          </div>
        </div>

        {/* Red Team */}
        <div className="card p-6 border-t-2 border-t-red-500">
          <div className="flex items-center justify-center gap-2 mb-6">
            <h2 className="text-red-400 font-bold text-lg uppercase tracking-wider">Equipe Rouge</h2>
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          </div>

          <div className="space-y-3">
            {positions.map(pos => (
              <div
                key={pos.id}
                className="group flex items-center gap-4 glass-light rounded-xl p-3 cursor-pointer hover:bg-red-500/10 hover:border-red-500/30 transition-all flex-row-reverse"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/5 border-2 border-dashed border-red-500/40 flex items-center justify-center group-hover:border-red-500 transition-all">
                  <span className="text-red-400/50 text-xs font-bold">+</span>
                </div>
                <div className="text-right">
                  <span className="text-white font-medium">{pos.id}</span>
                  <p className="text-gray-500 text-xs">{pos.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-5 border-t border-white/5">
            <div className="flex items-center justify-end gap-2 mb-3">
              <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Bans</span>
              <Shield size={14} className="text-red-400" />
            </div>
            <div className="flex gap-2 justify-end">
              {[1, 2, 3, 4, 5].map(i => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 border-2 border-dashed border-red-500/30 hover:border-red-500 transition-all cursor-pointer flex items-center justify-center"
                >
                  <span className="text-red-400/30 text-xs">+</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Draft Order Info */}
      <div className="card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Ordre du draft</span>
            <div className="flex items-center gap-1">
              {['B', 'R', 'R', 'B', 'B', 'R', 'R', 'B', 'B', 'R'].map((team, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                    team === 'B'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {team}
                </div>
              ))}
            </div>
          </div>
          <span className="text-gray-500 text-sm">Pick 1/10</span>
        </div>
      </div>
    </div>
  );
};
