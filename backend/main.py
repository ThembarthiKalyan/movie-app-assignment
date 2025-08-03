from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from backend.schemas import (
    ActorCreate, ActorResponse,
    DirectorCreate, DirectorResponse,
    GenreCreate, GenreResponse,
    MovieCreate, MovieResponse
)
from backend.crud import (
    create_actor, get_actors,
    create_director, get_directors,
    create_genre, get_genres,
    create_movie, get_all_movies, get_movies_by_names_and_year,
    get_movies_by_person
)

app = FastAPI(title="Movie API", version="1.0")

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Movie API"}

# movies

@app.post("/movies/", response_model=MovieResponse)
async def add_movie(movie: MovieCreate):
    try:
        return create_movie(movie)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create movie: {str(e)}")

@app.get("/movies/", response_model=List[MovieResponse])
async def list_movies():
    try:
        return get_all_movies()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch movies: {str(e)}")

@app.get("/movies/search/", response_model=List[MovieResponse])
async def search_movies(
    actor: Optional[str] = None,
    director: Optional[str] = None,
    genre: Optional[str] = None,
    year: Optional[int] = None,
    title: Optional[str] = None
):
    try:
        return get_movies_by_names_and_year(actor, director, genre, year, title)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")

@app.get("/movies/by-role/", response_model=List[str])
async def get_movies_by_role(id: str, role: str):
    try:
        return get_movies_by_person(id=id, role=role)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch movies: {str(e)}")

# actors

@app.get("/actors/", response_model=List[ActorResponse])
async def list_actors():
    try:
        return get_actors()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch actors: {str(e)}")

@app.post("/actors/", response_model=ActorResponse)
async def add_actor(actor: ActorCreate):
    try:
        return create_actor(actor)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create actor: {str(e)}")

# directors

@app.get("/directors/", response_model=List[DirectorResponse])
async def list_directors():
    try:
        return get_directors()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch directors: {str(e)}")

@app.post("/directors/", response_model=DirectorResponse)
async def add_director(director: DirectorCreate):
    try:
        return create_director(director)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create director: {str(e)}")

# genres

@app.get("/genres/", response_model=List[GenreResponse])
async def list_genres():
    try:
        return get_genres()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch genres: {str(e)}")

@app.post("/genres/", response_model=GenreResponse)
async def add_genre(genre: GenreCreate):
    try:
        return create_genre(genre)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create genre: {str(e)}")

#  dev server entry point

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)

