Movie App – Full Stack
This is a full-stack Movie Browser App built with:
 FastAPI + MongoDB for the backend

 React + TypeScript + Vite + Tailwind/MUI for the frontend

It allows users to view and filter movies, see profiles of actors/directors, and explore relationships between movies and the people behind them.

Project Structure:
 movie-app/
├── backend/           # FastAPI backend
├── frontend/          # React frontend
├── .vscode/        

Backend setup
    Features:
        REST APIs for movies, actors, directors, genres

        Filtering by name/year/role

        MongoDB queries with lookup logic

        Clean modular structure

    Requirements
        Python 3.10+

        FastAPI

        Pydantic v2

        Motor (MongoDB driver)

        Uvicorn

    Installation
        bash
        Copy code
        cd backend
        python -m venv venv
        source venv/bin/activate  # Windows: venv\Scripts\activate
        pip install -r requirements.txt
    Create .env file:

    env
        Copy code
        MONGO_URL=mongodb+srv://<your-db-url>
    Run server:
        run server from movieapp only commands below to follow:
            .\backend\venv\Scripts\Activate
            uvicorn backend.main:app --reload

Frontend setup:
    Features
        Movie listing with filters: actor, director, genre, year

        Drawer-based filter UI

        Search with Enter key for movies by name, actor, etc.

        Movie details page

        Actor/Director profile page with list of movies

    Requirements
        Node.js ≥ 18

        npm or yarn

        Vite

        React

        MUI or TailwindCSS
    
    Installation
        cd frontend
        npm install
        npm run dev

    App runs at: http://localhost:5173

sample end points
| Endpoint                                | Description                 |
| --------------------------------------- | --------------------------- |
| `GET /movies`                           | All movies                  |
| `GET /movies/search/?title=RRR`         | Filter movies & searchmovies|
| `GET /movies/by-role?id=xyz&role=actor` | Movies by actor or director |
| `GET /actors/:id`                       | Actor details               |
| `GET /directors/:id`                    | Director details            |

