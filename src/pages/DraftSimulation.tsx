import { Wand2, Play, RotateCcw } from 'lucide-react';

export const DraftSimulation = () => {
  const positions = ['TOP', 'JNG', 'MID', 'ADC', 'SUP'];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Wand2 className="text-purple-500" size={24} />
          <h1 className="text-2xl font-bold text-white">Draft Simulation</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-dark-700 hover:bg-dark-600 text-white px-4 py-2 rounded-lg transition-colors">
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
          <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Play size={16} />
            <span>Démarrer</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-dark-700 rounded-xl p-6">
          <h2 className="text-blue-400 font-bold text-lg mb-4 text-center">ÉQUIPE BLEUE</h2>
          <div className="space-y-3">
            {positions.map(pos => (
              <div
                key={pos}
                className="flex items-center gap-3 bg-dark-600 rounded-lg p-3"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border-2 border-dashed border-blue-500/40"></div>
                <span className="text-gray-400">{pos}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-dark-600">
            <h3 className="text-gray-500 text-sm mb-2">BANS</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-dark-600 border-2 border-dashed border-dark-500"
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-dark-700 rounded-xl p-6 flex flex-col items-center justify-center">
          <div className="text-6xl font-bold text-purple-500 mb-4">VS</div>
          <p className="text-gray-500 text-center">
            Sélectionnez les champions pour simuler le draft
          </p>
        </div>

        <div className="bg-dark-700 rounded-xl p-6">
          <h2 className="text-red-400 font-bold text-lg mb-4 text-center">ÉQUIPE ROUGE</h2>
          <div className="space-y-3">
            {positions.map(pos => (
              <div
                key={pos}
                className="flex items-center gap-3 bg-dark-600 rounded-lg p-3 flex-row-reverse"
              >
                <div className="w-10 h-10 rounded-full bg-red-500/20 border-2 border-dashed border-red-500/40"></div>
                <span className="text-gray-400">{pos}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-dark-600">
            <h3 className="text-gray-500 text-sm mb-2 text-right">BANS</h3>
            <div className="flex gap-2 justify-end">
              {[1, 2, 3, 4, 5].map(i => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-dark-600 border-2 border-dashed border-dark-500"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
