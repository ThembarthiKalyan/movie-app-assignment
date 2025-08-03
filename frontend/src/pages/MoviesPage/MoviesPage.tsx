// src/pages/MoviesPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../../components/MovieCard/MovieCard';
import FilterDrawer from '../../components/FilterDrawer/FilterDrawer';
import type { Movie, Actor, Director, Genre } from '../../types';
import { MOVIES_URL, MOVIES_SEARCH_URL, ACTORS_URL, DIRECTORS_URL, GENRES_URL } from '../../constants/api';
import { TextField, IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

interface SelectedFilters {
  actor: string;
  director: string;
  genre: string;
}

const MoviePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [actors, setActors] = useState<Actor[]>([]);
  const [directors, setDirectors] = useState<Director[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    actor: '',
    director: '',
    genre: '',
  });

  const fetchMovies = async () => {
    try {
      const response = await axios.get<Movie[]>(MOVIES_URL);
      setMovies(response.data);
    } catch (err) {
      console.error('Failed to load movies', err);
    }
  };

  const fetchMetadata = async () => {
    const [actorsRes, directorsRes, genresRes] = await Promise.all([
      axios.get<Actor[]>(ACTORS_URL),
      axios.get<Director[]>(DIRECTORS_URL),
      axios.get<Genre[]>(GENRES_URL)
    ]);
    setActors(actorsRes.data);
    setDirectors(directorsRes.data);
    setGenres(genresRes.data);
  };

  useEffect(() => {
    fetchMetadata();
    fetchMovies();
  }, []);

  const handleApplyFilters = async () => {
    try {
      const params: Record<string, string> = {};
      if (selectedFilters.actor) params.actor = selectedFilters.actor;
      if (selectedFilters.director) params.director = selectedFilters.director;
      if (selectedFilters.genre) params.genre = selectedFilters.genre;
      if (searchTerm) params.title = searchTerm;

      const response = await axios.get<Movie[]>(MOVIES_SEARCH_URL, { params });
      setMovies(response.data);
      setDrawerOpen(false);
    } catch (error) {
      console.error('Failed to apply filters', error);
    }
  };

  const handleFilterChange = (type: keyof SelectedFilters, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? '' : value,
    }));
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      const response = await axios.get<Movie[]>(MOVIES_SEARCH_URL, {
        params: {
          actor: searchTerm,
          director: searchTerm,
          title: searchTerm,
          year: isNaN(Number(searchTerm)) ? undefined : Number(searchTerm)
        }
      });
      setMovies(response.data);
    } catch (error) {
      console.error('Search failed', error);
    }
  };

  const handleCardClick = (movie: Movie) => {
    navigate(`/movies/${movie._id}`, { state: movie });
  };

  return (
    <div>
      <div className="flex justify-end p-4 gap-2">
        <TextField
          label="Search movies"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <IconButton onClick={() => setDrawerOpen(true)} color="primary">
          <FilterListIcon />
        </IconButton>
      </div>

      <FilterDrawer
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        onApply={handleApplyFilters}
        selectedGenres={[selectedFilters.genre]}
        selectedActors={[selectedFilters.actor]}
        selectedDirectors={[selectedFilters.director]}
        onGenreChange={(genre) => handleFilterChange('genre', genre)}
        onActorChange={(actor) => handleFilterChange('actor', actor)}
        onDirectorChange={(director) => handleFilterChange('director', director)}
        actors={actors.map(actor => actor.name)}
        directors={directors.map(director => director.name)}
        genres={genres.map(genre => genre.name)}
      />

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} onClick={() => handleCardClick(movie)} />
        ))}
      </div>
    </div>
  );
};

export default MoviePage;
