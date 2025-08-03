import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Movie } from "../../types";
import { Button } from "@mui/material";
import "./MovieDetailPage.css"


const MovieDetailPage: React.FC = () => {
    const {state} = useLocation();
    const navigate = useNavigate();
    const movie = state as Movie;

    const handleBack = () => {
        navigate("/movies");
    }

    return(
        <div className='p-6 flex flex-col items-center text-center'>
            <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
            <img src={movie.poster} alt={movie.title} className="mb-4 w-60 img-movie-detail" />
            <p className="mb-2"><strong>Year:</strong> {movie.year}</p>
            <p className="mb-4">{movie.description}</p>
            <p className="mb-2"><strong>Director:</strong> {movie.director}</p>
            <p className="mb-2"><strong>Actors:</strong> {movie.actors?.join(', ')}</p>
            <p className="mb-2"><strong>Genres:</strong> {movie.genres?.join(', ')}</p>
            <div className="mt-6">
                <Button variant="contained" color="primary" onClick={handleBack}>OK</Button>
            </div>
        </div>
    )
}

export default MovieDetailPage;