import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import ActorsPage from "./pages/ActorsPage/ActorsPage";
import DirectorsPage from "./pages/DirectorsPage/DirectorsPage";
import MovieDetailPage from "./pages/MovieDetailPage/MovieDetailPage";
import ProfileDetailPage from "./pages/ProfileDetailPage/ProfileDetailPage";

export default function App() {
  return (
    <Router>
      <Header />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Navigate to="/movies" />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/actors" element={<ActorsPage />} />
          <Route path="/directors" element={<DirectorsPage />} />
          <Route path="/movies/:id" element={<MovieDetailPage/>}/>
          <Route path="/profile" element={<ProfileDetailPage/>} />
        </Routes>
      </main>
    </Router>
  );
}
