import { useState } from 'react';
import { Calendar, Users, LayoutGrid, ChevronLeft, ChevronRight, Plus, Check, User } from 'lucide-react';
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
    <div className="bg-dark-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="text-purple-500" size={24} />
          <h1 className="text-xl font-bold text-white">Système de Planning Team</h1>
        </div>
        <div className="flex items-center gap-2 bg-dark-700 rounded-lg p-1">
          <button
            onClick={() => setView('agenda')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              view === 'agenda' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Calendar size={16} />
            <span>Agenda</span>
          </button>
          <button
            onClick={() => setView('dispo')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              view === 'dispo' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users size={16} />
            <span>Dispo</span>
          </button>
          <button
            onClick={() => setView('synthese')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              view === 'synthese' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <LayoutGrid size={16} />
            <span>Synthèse</span>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 bg-dark-700 rounded-lg px-4 py-2">
          <button onClick={() => navigateWeek('prev')} className="text-gray-400 hover:text-white">
            <ChevronLeft size={20} />
          </button>
          <div className="text-center px-4">
            <span className="text-purple-400 text-xs font-medium">SEMAINE DE</span>
            <div className="text-white font-medium">{formatWeekLabel()}</div>
          </div>
          <button onClick={() => navigateWeek('next')} className="text-gray-400 hover:text-white">
            <ChevronRight size={20} />
          </button>
        </div>
        <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus size={16} />
          <span>Planifier</span>
        </button>
      </div>

      {view === 'agenda' && (
        <div className="grid grid-cols-7 gap-3">
          {weekDates.map((item, index) => (
            <div
              key={item.day}
              className={`rounded-xl p-4 ${
                index === 3 ? 'bg-purple-600' : 'bg-dark-700'
              }`}
            >
              <div className="text-center mb-4">
                <div className={`text-xs font-medium ${index === 3 ? 'text-purple-200' : 'text-gray-500'}`}>
                  {item.day.toUpperCase()}
                </div>
                <div className={`text-2xl font-bold ${index === 3 ? 'text-white' : 'text-white'}`}>
                  {item.date}
                </div>
              </div>
              <div className="space-y-2">
                {getEventsForSlot(index, 18).map(event => (
                  <div
                    key={event.id}
                    className="rounded-lg p-3"
                    style={{ backgroundColor: event.color || '#1e1b4b' }}
                  >
                    <div className="text-white font-medium text-sm">{event.title}</div>
                    <div className="text-gray-400 text-xs">
                      {event.startTime} - {event.endTime}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'dispo' && (
        <div className="flex gap-6">
          <div className="w-48 space-y-2">
            {players.map(player => (
              <button
                key={player.id}
                onClick={() => setSelectedPlayer(player.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  selectedPlayer === player.id
                    ? 'bg-dark-600 border border-purple-500'
                    : 'bg-dark-700 hover:bg-dark-600'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-dark-500 flex items-center justify-center">
                  <User size={16} className="text-gray-400" />
                </div>
                <span className="text-white font-medium">{player.name}</span>
              </button>
            ))}
            <div className="mt-6 p-3 bg-dark-700 rounded-lg">
              <div className="text-gray-500 text-xs font-medium mb-3">LÉGENDE</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-500"></div>
                  <span className="text-sm text-gray-300">Disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-yellow-500"></div>
                  <span className="text-sm text-gray-300">Pas sûr (Jaune)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-500"></div>
                  <span className="text-sm text-gray-300">Indisponible</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-gray-500 text-sm p-2">JOUR</th>
                  {hours.map(hour => (
                    <th key={hour} className="text-gray-500 text-sm p-2 min-w-[40px]">
                      {hour}h
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map(day => (
                  <tr key={day} className="border-t border-dark-600">
                    <td className="text-white p-2 font-medium">{day}</td>
                    {hours.map(hour => {
                      const status = getPlayerAvailability(selectedPlayer, day, hour);
                      return (
                        <td key={hour} className="p-1">
                          <div
                            className={`w-8 h-8 rounded flex items-center justify-center ${
                              status === 'available'
                                ? 'bg-green-500/20'
                                : status === 'maybe'
                                ? 'bg-yellow-500/20'
                                : status === 'unavailable'
                                ? 'bg-red-500/20'
                                : 'bg-dark-700'
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

      {view === 'synthese' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-white">Synthèse Équipe</h2>
              <p className="text-gray-500 text-sm">Aperçu rapide des créneaux (12h - 00h).</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-400">5+ Dispo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-gray-400">Activité</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-3 mb-4">
            {weekDates.map((item, index) => (
              <div
                key={item.day}
                className={`rounded-xl p-3 text-center ${
                  index === 3 ? 'bg-purple-600' : 'bg-dark-700'
                }`}
              >
                <div className={`text-xs font-medium ${index === 3 ? 'text-purple-200' : 'text-gray-500'}`}>
                  {item.dayShort}
                </div>
                <div className={`text-lg font-bold ${index === 3 ? 'text-white' : 'text-white'}`}>
                  {item.date}
                </div>
                <div className={`text-xs ${index === 3 ? 'text-purple-200' : 'text-gray-500'}`}>
                  {item.month}
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-gray-500 text-sm p-2 w-16"></th>
                  {weekDates.map((item) => (
                    <th key={item.day} className="p-1" colSpan={1}>
                      <div className="grid grid-cols-2 gap-0.5">
                        {hours.slice(0, 2).map(hour => (
                          <div key={hour} className="text-gray-500 text-xs">{hour}h</div>
                        ))}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hours.map(hour => (
                  <tr key={hour} className="border-t border-dark-600">
                    <td className="text-gray-500 text-sm p-2 font-medium">{hour}:00</td>
                    {weekDates.map((item, dayIndex) => {
                      const count = getSlotAvailabilityCount(days[dayIndex], hour);
                      const slotEvents = getEventsForSlot(dayIndex, hour);
                      const hasFullTeam = count === 5;

                      return (
                        <td key={item.day} className="p-1">
                          <div
                            className={`rounded p-2 min-h-[50px] ${
                              hasFullTeam ? 'bg-green-500/20 border border-green-500/30' : 'bg-dark-700'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-gray-400 text-xs">{hour}h</span>
                              <span className={`text-xs font-medium ${hasFullTeam ? 'text-green-400' : 'text-gray-500'}`}>
                                {count}/5
                              </span>
                            </div>
                            {slotEvents.map(event => (
                              <div
                                key={event.id}
                                className="rounded px-2 py-1 mt-1 text-xs"
                                style={{ backgroundColor: event.color || '#1e1b4b' }}
                              >
                                <div className="text-white font-medium truncate">{event.title.toUpperCase()}</div>
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
