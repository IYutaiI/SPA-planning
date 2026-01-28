import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import { Layout } from './components/Layout';
import { Roster } from './pages/Roster';
import { Planning } from './pages/Planning';
import { Scrims } from './pages/Scrims';
import { Compositions } from './pages/Compositions';
import { DraftSimulation } from './pages/DraftSimulation';
import { Statistiques } from './pages/Statistiques';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Roster />} />
            <Route path="planning" element={<Planning />} />
            <Route path="scrims" element={<Scrims />} />
            <Route path="compositions" element={<Compositions />} />
            <Route path="draft" element={<DraftSimulation />} />
            <Route path="statistiques" element={<Statistiques />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
