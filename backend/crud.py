from bson import ObjectId
from backend.database import (
    movies_collection,
    actors_collection,
    directors_collection,
    genres_collection
)
from backend.schemas import (
    MovieCreate, MovieResponse,
    ActorCreate, ActorResponse,
    DirectorCreate, DirectorResponse,
    GenreCreate, GenreResponse
)

# helper

def stringify_id(document: dict) -> dict:
    document["_id"] = str(document["_id"])
    return document

# actors

def get_actors() -> list[ActorResponse]:
    actors = actors_collection.find()
    return [ActorResponse.model_validate(stringify_id(actor)) for actor in actors]

def create_actor(actor: ActorCreate) -> ActorResponse:
    actor_dict = actor.model_dump()
    result = actors_collection.insert_one(actor_dict)
    actor_dict["_id"] = str(result.inserted_id)
    return ActorResponse.model_validate(actor_dict)

# directors

def get_directors() -> list[DirectorResponse]:
    directors = directors_collection.find()
    return [DirectorResponse.model_validate(stringify_id(director)) for director in directors]

def create_director(director: DirectorCreate) -> DirectorResponse:
    director_dict = director.model_dump()
    result = directors_collection.insert_one(director_dict)
    director_dict["_id"] = str(result.inserted_id)
    return DirectorResponse.model_validate(director_dict)

# genres

def get_genres() -> list[GenreResponse]:
    genres = genres_collection.find()
    return [GenreResponse.model_validate(stringify_id(genre)) for genre in genres]

def create_genre(genre: GenreCreate) -> GenreResponse:
    genre_dict = genre.model_dump()
    result = genres_collection.insert_one(genre_dict)
    genre_dict["_id"] = str(result.inserted_id)
    return GenreResponse.model_validate(genre_dict)

# movies

def create_movie(movie: MovieCreate) -> MovieResponse:
    movie_dict = movie.model_dump()
    result = movies_collection.insert_one(movie_dict)
    movie_dict["_id"] = str(result.inserted_id)
    return MovieResponse.model_validate(movie_dict)

def get_all_movies() -> list[MovieResponse]:
    movies = movies_collection.find()
    enriched_movies = [enrich_movie_data(movie) for movie in movies]
    return [MovieResponse.model_validate(stringify_id(movie)) for movie in enriched_movies]

def get_movies_by_names_and_year(
    actor_name: str = None,
    director_name: str = None,
    genre_name: str = None,
    year: int = None,
    title: str = None
) -> list[MovieResponse]:
    query = {}

    # Search mode
    if actor_name and actor_name == director_name == title:
        # Unified search term
        search_term = actor_name
        or_conditions = []

        # Title match
        or_conditions.append({"title": {"$regex": search_term, "$options": "i"}})

        # Actor match
        actors = list(actors_collection.find({"name": {"$regex": search_term, "$options": "i"}}))
        actor_ids = [str(a["_id"]) for a in actors]
        if actor_ids:
            or_conditions.append({"actor_ids": {"$in": actor_ids}})

        # Director match
        directors = list(directors_collection.find({"name": {"$regex": search_term, "$options": "i"}}))
        director_ids = [str(d["_id"]) for d in directors]
        if director_ids:
            or_conditions.append({"director_id": {"$in": director_ids}})

        # Year
        try:
            year_val = int(search_term)
            or_conditions.append({"year": year_val})
        except ValueError:
            pass

        if not or_conditions:
            return []

        query = {"$or": or_conditions}

    else:
        # Filter mode (AND logic)
        if actor_name:
            actors = list(actors_collection.find({"name": {"$regex": actor_name, "$options": "i"}}))
            actor_ids = [str(a["_id"]) for a in actors]
            if actor_ids:
                query["actor_ids"] = {"$in": actor_ids}
            else:
                return []

        if director_name:
            directors = list(directors_collection.find({"name": {"$regex": director_name, "$options": "i"}}))
            director_ids = [str(d["_id"]) for d in directors]
            if director_ids:
                query["director_id"] = {"$in": director_ids}
            else:
                return []

        if genre_name:
            genres = list(genres_collection.find({"name": {"$regex": genre_name, "$options": "i"}}))
            genre_ids = [str(g["_id"]) for g in genres]
            if genre_ids:
                query["genre_ids"] = {"$in": genre_ids}
            else:
                return []

        if year:
            query["year"] = year

        if title:
            query["title"] = {"$regex": title, "$options": "i"}

    movies = movies_collection.find(query)
    enriched_movies = [enrich_movie_data(movie) for movie in movies]
    return [MovieResponse.model_validate(stringify_id(movie)) for movie in enriched_movies]

def enrich_movie_data(movie: dict) -> dict:
    doc = {
        "_id": movie["_id"],
        "title": movie["title"],
        "description": movie["description"],
        "year": movie["year"],
        "poster": movie["poster"]
    }

    # Genres
    genre_names = []
    for id in movie.get("genre_ids", []):
        genre = genres_collection.find_one({"_id": ObjectId(id)})
        if genre:
            genre_names.append(genre["name"])
    doc["genres"] = genre_names

    # Actors
    actor_names = []
    for id in movie.get("actor_ids", []):
        actor = actors_collection.find_one({"_id": ObjectId(id)})
        if actor:
            actor_names.append(actor["name"])
    doc["actors"] = actor_names

    # Director
    director_id = movie.get("director_id")
    if director_id:
        director_doc = directors_collection.find_one({"_id": ObjectId(director_id)})
        doc["director"] = director_doc["name"] if director_doc else None
    else:
        doc["director"] = None

    return doc

def get_movies_by_person(id: str, role: str) -> list[str]:
    if not ObjectId.is_valid(id):
        return []

    if role == "actor":
        query = {"actor_ids": {"$in": [id]}}
    elif role == "director":
        query = {"director_id": id}  # director_id is a string
    else:
        return []

    movies = movies_collection.find(query, {"title": 1, "_id": 0})
    return [movie["title"] for movie in movies]


