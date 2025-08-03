import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))


from fastapi.testclient import TestClient
from backend.main import app
from bson import ObjectId

client = TestClient(app)

# Generate valid ObjectIds
actor_id = str(ObjectId())
director_id = str(ObjectId())
genre_id = str(ObjectId())

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the Movie API"}

def test_create_actor():
    data = {
        "id": actor_id,
        "name": "Test Actor",
        "profilePic": "http://example.com/pic.jpg"
    }
    response = client.post("/actors/", json=data)
    assert response.status_code in [200, 201]

def test_get_actors():
    response = client.get("/actors/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_director():
    data = {
        "id": director_id,
        "name": "Test Director",
        "profilePic": "http://example.com/dir.jpg"
    }
    response = client.post("/directors/", json=data)
    assert response.status_code in [200, 201]

def test_get_directors():
    response = client.get("/directors/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_genre():
    data = {
        "id": genre_id,
        "name": "Drama"
    }
    response = client.post("/genres/", json=data)
    assert response.status_code in [200, 201]

def test_get_genres():
    response = client.get("/genres/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_movie():
    data = {
        "title": "Test Movie",
        "description": "A test movie",
        "year": 2025,
        "poster": "http://example.com/poster.jpg",
        "genre_ids": [genre_id],
        "actor_ids": [actor_id],
        "director_id": director_id
    }
    response = client.post("/movies/", json=data)
    assert response.status_code in [200, 201]

def test_get_all_movies():
    response = client.get("/movies/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
