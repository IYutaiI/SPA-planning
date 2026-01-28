import { useState } from 'react';
import { Calendar, Users, LayoutGrid, ChevronLeft, ChevronRight, Plus, Check, User, Clock } from 'lucide-react';
import { useApp } from '../store/AppContext';

type ViewType = 'agenda' | 'dispo' | 'synthese';

const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const daysShort = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];
const hours = Array.from({ length: 13 }, (_, i) => i + 12);

export const Planning = () => {
  const [view, setView] = useState<ViewType>('agenda');
  const { players, events, availabilities, currentWeekStart, navigateWeek } = useApp();
  const [selectedPlayer, setSelectedPlayer] = useState(players[0]?.id || '');

  const formatWeekLabel = () => {
    const day = currentWeekStart.getDate();
    const month = currentWeekStart.toLocaleDateString('fr-FR', { month: 'long' });
    return `${day} ${month}`;
  };

  const getWeekDates = () => {
    return days.map((day, index) => {
      const date = new Date(currentWeekStart);
      date.setDate(date.getDate() + index);
      return { day, date: date.getDate(), dayShort: daysShort[index], month: 'JANV.' };
    });
  };

  const weekDates = getWeekDates();
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;

  const getPlayerAvailability = (playerId: string, day: string, hour: number) => {
    return availabilities.find(
      a => a.playerId === playerId && a.day === day && a.hour === hour
    )?.status || null;
  };

  const getSlotAvailabilityCount = (day: string, hour: number) => {
    return players.filter(p => getPlayerAvailability(p.id, day, hour) === 'available').length;
  };

  const getEventsForSlot = (dayIndex: number, hour: number) => {
    const date = new Date(currentWeekStart);
    date.setDate(date.getDate() + dayIndex);
    const dateStr = date.toISOString().split('T')[0];

    return events.filter(event => {
      if (event.date !== dateStr) return false;
      const startHour = parseInt(event.startTime.split(':')[0]);
      const endHour = parseInt(event.endTime.split(':')[0]);
      return hour >= startHour && hour < endHour;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 p-1 rounded-xl glass-light">
          {[
            { id: 'agenda', icon: Calendar, label: 'Agenda' },
            { id: 'dispo', icon: Users, label: 'Dispo' },
            { id: 'synthese', icon: LayoutGrid, label: 'Synthese' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id as ViewType)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 ${
                view === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/25'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon size={16} />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-light">
            <button
              onClick={() => navigateWeek('prev')}
              className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="text-center px-3">
              <span className="text-purple-400 text-xs font-medium uppercase tracking-wider">Semaine de</span>
              <div className="text-white font-semibold">{formatWeekLabel()}</div>
            </div>
            <button
              onClick={() => navigateWeek('next')}
              className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <button className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium">
            <Plus size={16} />
            <span>Planifier</span>
          </button>
        </div>
      </div>

      {/* Agenda View */}
      {view === 'agenda' && (
        <div className="grid grid-cols-7 gap-3">
          {weekDates.map((item, index) => (
            <div
              key={item.day}
              className={`card p-4 transition-all duration-300 ${
                index === todayIndex
                  ? 'gradient-border glow-purple'
                  : 'hover:border-white/10'
              }`}
            >
              <div className="text-center mb-4">
                <div className={`text-xs font-semibold uppercase tracking-wider ${
                  index === todayIndex ? 'text-purple-400' : 'text-gray-500'
                }`}>
                  {item.day}
                </div>
                <div className={`text-3xl font-bold mt-1 ${
                  index === todayIndex ? 'gradient-text' : 'text-white'
                }`}>
                  {item.date}
                </div>
                {index === todayIndex && (
                  <div className="mt-2 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium inline-block">
                    Aujourd'hui
                  </div>
                )}
              </div>
              <div className="space-y-2">
                {getEventsForSlot(index, 18).map(event => (
                  <div
                    key={event.id}
                    className="rounded-xl p-3 glass-light border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer"
                  >
                    <div className="text-white font-medium text-sm">{event.title}</div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                      <Clock size={10} />
                      <span>{event.startTime} - {event.endTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dispo View */}
      {view === 'dispo' && (
        <div className="flex gap-6">
          <div className="w-52 space-y-2">
            {players.map(player => (
              <button
                key={player.id}
                onClick={() => setSelectedPlayer(player.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  selectedPlayer === player.id
                    ? 'glass-light border border-purple-500/50 shadow-lg shadow-purple-500/10'
                    : 'glass-light hover:bg-white/10'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  selectedPlayer === player.id
                    ? 'bg-gradient-to-br from-purple-500 to-cyan-500'
                    : 'bg-dark-600'
                }`}>
                  <User size={18} className="text-white" />
                </div>
                <span className="text-white font-medium">{player.name}</span>
                {selectedPlayer === player.id && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                )}
              </button>
            ))}

            <div className="card p-4 mt-4">
              <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">Legende</div>
              <div className="space-y-2">
                {[
                  { color: 'bg-green-500', label: 'Disponible' },
                  { color: 'bg-yellow-500', label: 'Incertain' },
                  { color: 'bg-red-500', label: 'Indisponible' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm text-gray-300">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 card p-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-gray-500 text-xs font-semibold uppercase p-3">Jour</th>
                  {hours.map(hour => (
                    <th key={hour} className="text-gray-500 text-xs font-semibold p-3 min-w-[44px]">
                      {hour}h
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map(day => (
                  <tr key={day} className="border-t border-white/5">
                    <td className="text-white p-3 font-medium">{day}</td>
                    {hours.map(hour => {
                      const status = getPlayerAvailability(selectedPlayer, day, hour);
                      return (
                        <td key={hour} className="p-1">
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer hover:scale-110 ${
                              status === 'available'
                                ? 'bg-green-500/20 border border-green-500/30'
                                : status === 'maybe'
                                ? 'bg-yellow-500/20 border border-yellow-500/30'
                                : status === 'unavailable'
                                ? 'bg-red-500/20 border border-red-500/30'
                                : 'bg-dark-600 hover:bg-dark-500'
                            }`}
                          >
                            {status === 'available' && <Check size={14} className="text-green-400" />}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Synthese View */}
      {view === 'synthese' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Synthese Equipe</h2>
              <p className="text-gray-500 text-sm">Apercu des disponibilites (12h - 00h)</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                <span className="text-gray-400">5/5 Dispo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <span className="text-gray-400">Activite</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-3">
            {weekDates.map((item, index) => (
              <div
                key={item.day}
                className={`card p-3 text-center ${
                  index === todayIndex ? 'gradient-border' : ''
                }`}
              >
                <div className={`text-xs font-semibold uppercase ${
                  index === todayIndex ? 'text-purple-400' : 'text-gray-500'
                }`}>
                  {item.dayShort}
                </div>
                <div className={`text-xl font-bold ${
                  index === todayIndex ? 'gradient-text' : 'text-white'
                }`}>
                  {item.date}
                </div>
              </div>
            ))}
          </div>

          <div className="card overflow-hidden">
            <table className="w-full">
              <tbody>
                {hours.map(hour => (
                  <tr key={hour} className="border-t border-white/5">
                    <td className="text-gray-500 text-sm p-3 font-medium w-20">{hour}:00</td>
                    {weekDates.map((item, dayIndex) => {
                      const count = getSlotAvailabilityCount(days[dayIndex], hour);
                      const slotEvents = getEventsForSlot(dayIndex, hour);
                      const hasFullTeam = count === 5;

                      return (
                        <td key={item.day} className="p-1.5">
                          <div
                            className={`rounded-xl p-2.5 min-h-[56px] transition-all ${
                              hasFullTeam
                                ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/30'
                                : 'glass-light'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-xs font-semibold ${
                                hasFullTeam ? 'text-green-400' : 'text-gray-500'
                              }`}>
                                {count}/5
                              </span>
                              {hasFullTeam && (
                                <Check size={12} className="text-green-400" />
                              )}
                            </div>
                            {slotEvents.map(event => (
                              <div
                                key={event.id}
                                className="rounded-lg px-2 py-1 bg-purple-500/30 text-xs mt-1"
                              >
                                <div className="text-white font-medium truncate">{event.title}</div>
                              </div>
                            ))}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
