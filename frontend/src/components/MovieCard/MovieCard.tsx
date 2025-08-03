// src/components/MovieCard.tsx
import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
} from '@mui/material';
import type { Movie } from '../../types';
import './MovieCard.css';

type Props = {
  movie: Movie;
  onClick?: ()=> void;
};

const MovieCard: React.FC<Props> = ({ movie, onClick }) => {
  return (
    <Card className="rounded-2xl shadow-lg movie-card-div cursor-pointer"
      onClick = {onClick}
    >
      <CardMedia
        component="img"
        image={movie.poster}
        alt={movie.title}
        className="object-cover movie-card-img"
      />
      <CardContent className='movie-card-content' style={{paddingTop: "10px"}}>
        <Typography variant="h6" component="h2" className="font-bold mb-2 movie-h2-card" style={{fontWeight: 700}} >
          {movie.title}
        </Typography>
        <Typography
          variant="body2"
          className="text-gray-500 mb-2"
          style={{ marginTop: "-4px" }}
        >
          {movie.year}
        </Typography>

        <Box className="flex flex-wrap gap-2 mb-3">
          {movie.genres.map((genre) => (
            <Chip
              key={genre}
              label={genre}
              className="bg-black text-white font-semibold text-xs"
              size="small"
            />
          ))}
        </Box>

        <Typography className="font-semibold text-sm" style={{fontWeight: 600}}>Actors:</Typography>
        <Typography variant="body2" className="text-gray-700 mb-2">
          {movie.actors.join(', ')}
        </Typography>

        <Typography className="font-semibold text-sm" style={{fontWeight: 600}}>Director:</Typography>
        <Typography variant="body2" className="text-gray-700">
          {movie.director}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
