import type { Player, Event, Availability, Strategy, Champion, Scrim } from '../types';

export const players: Player[] = [
  { id: '1', name: 'NexusPlayer1', tag: 'SPN_Cata#SPA', role: 'TOP' },
  { id: '2', name: 'JunglerGod', tag: 'JunglerGod#EUW', role: 'JNG' },
  { id: '3', name: 'MidKing', tag: 'MidKing#EUW', role: 'MID' },
  { id: '4', name: 'CarryOnly', tag: 'CarryOnly#EUW', role: 'ADC' },
  { id: '5', name: 'VisionLord', tag: 'VisionLord#EUW', role: 'SUP' },
];

export const events: Event[] = [
  {
    id: '1',
    title: 'VOD Review LFL',
    type: 'vod_review',
    date: '2025-01-22',
    startTime: '18:00',
    endTime: '19:30',
    color: '#1e1b4b',
  },
  {
    id: '2',
    title: 'Scrim vs G2 Academy',
    type: 'scrim',
    date: '2025-01-22',
    startTime: '18:00',
    endTime: '21:00',
    color: '#5c1d1d',
  },
];

const generateAvailabilities = (): Availability[] => {
  const availabilities: Availability[] = [];
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  players.forEach(player => {
    days.forEach(day => {
      for (let hour = 12; hour <= 23; hour++) {
        if (hour >= 18 && hour <= 22) {
          availabilities.push({
            playerId: player.id,
            day,
            hour,
            status: 'available',
          });
        }
      }
    });
  });

  return availabilities;
};

export const availabilities: Availability[] = generateAvailabilities();

const championImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1518173946687-a4c036bc3d8b?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=100&h=100&fit=crop',
];

const createChampion = (id: string, name: string, imageIndex: number): Champion => ({
  id,
  name,
  image: championImages[imageIndex % championImages.length],
});

export const strategies: Strategy[] = [
  {
    id: '1',
    name: 'Stratégie Standard',
    updatedAt: '11/24/2025',
    champions: {
      top: [
        createChampion('1', 'Gnar', 0),
        createChampion('2', 'Renekton', 1),
        createChampion('3', 'Aatrox', 2),
        createChampion('4', 'Jax', 3),
      ],
      jungle: [
        createChampion('5', 'LeeSin', 4),
        createChampion('6', 'Viego', 5),
        createChampion('7', 'Rek\'Sai', 6),
        createChampion('8', 'Jarvan IV', 7),
      ],
      mid: [
        createChampion('9', 'Azir', 0),
        createChampion('10', 'Orianna', 1),
        createChampion('11', 'Ahri', 2),
        createChampion('12', 'Syndra', 3),
      ],
      adc: [
        createChampion('13', 'Jinx', 4),
        createChampion('14', 'Aphelios', 5),
        createChampion('15', 'Kai\'Sa', 6),
        createChampion('16', 'Xayah', 7),
      ],
      support: [
        createChampion('17', 'Thresh', 0),
        createChampion('18', 'Nautilus', 1),
        createChampion('19', 'Lulu', 2),
        createChampion('20', 'Rakan', 3),
      ],
    },
    priorityBans: [
      createChampion('21', 'Zeri', 4),
      createChampion('22', 'Yuumi', 5),
      createChampion('23', 'K\'Sante', 6),
      createChampion('24', 'Maokai', 7),
      createChampion('25', 'Viego', 0),
      createChampion('26', 'Aurelion Sol', 1),
      createChampion('27', 'Neeko', 2),
    ],
  },
];

export const scrims: Scrim[] = [
  { id: '1', opponent: 'G2 Academy', date: '2025-01-22', time: '18:00', result: 'pending' },
  { id: '2', opponent: 'Fnatic Rising', date: '2025-01-20', time: '19:00', result: 'win', score: '2-1' },
  { id: '3', opponent: 'MAD Lions Madrid', date: '2025-01-18', time: '17:00', result: 'loss', score: '1-2' },
];
