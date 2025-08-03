import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load .env variables
from pathlib import Path
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)
# load_dotenv()

# Get MONGO_URI from .env
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise EnvironmentError("MONGO_URI is not set in .env file")

# Connect to MongoDB Atlas
client = MongoClient(MONGO_URI)

try:
    # Test the connection
    client.admin.command("ping")
    print("MongoDB Atlas connected successfully.")
except Exception as e:
    print(f"Failed to connect to MongoDB Atlas: {e}")
    raise e

# Select database and collections
db = client["movie_db"]

movies_collection = db["movies"]
actors_collection = db["actors"]
directors_collection = db["directors"]
genres_collection = db["genres"]
