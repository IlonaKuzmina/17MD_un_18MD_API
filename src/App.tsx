import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import './styles/base.scss';
import CharactersPage from './pages/Characters/CharactersPage';
import EpisodesPage from './pages/Episodes/EpisodesPage';
import Page404 from './pages/Page404/Page404';
import Footer from './pages/Footer/Footer';
import AboutPage from './pages/About/AboutPage';
import HomePage from './pages/HomePage/HomePage';
import Header from './components/Header/Header';
import CharacterCard from './pages/Character/CharacterCard';
import EpisodeCard from './pages/Episode/EpisodeCard';
import LocationPage from './pages/Locations/LocationPage';
import LocationCard from './pages/Location/LocationCard';

const App = () => (
  <Router>
    <header>
      <Header />
    </header>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/characters" element={<CharactersPage />} />
      <Route path="/characters/:id" element={<CharacterCard />} />
      <Route path="/episodes" element={<EpisodesPage />} />
      <Route path="/episodes/:id" element={<EpisodeCard />} />
      <Route path="/location" element={<LocationPage />} />
      <Route path="/location/:id" element={<LocationCard />} />
      <Route path="*" element={<Page404 />} />
    </Routes>

    <footer>
      <Footer />
    </footer>
  </Router>
);

export default App;
