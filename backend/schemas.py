from pydantic import BaseModel, Field
from typing import List, Optional, Any
from bson import ObjectId
from pydantic.json_schema import JsonSchemaValue
from pydantic_core import core_schema
from pydantic import GetJsonSchemaHandler

class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(cls, source_type: type, handler: GetJsonSchemaHandler) -> core_schema.CoreSchema:
        return core_schema.no_info_after_validator_function(
            cls.validate,
            core_schema.str_schema()
        )

    @classmethod
    def validate(cls, v):
        if isinstance(v, ObjectId):
            return v
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(str(v))

    @classmethod
    def __get_pydantic_json_schema__(cls, core_schema: core_schema.CoreSchema, handler: GetJsonSchemaHandler) -> JsonSchemaValue:
        return {"type": "string"}

pydantic_model_config = {
    "populate_by_name": True,
    "arbitrary_types_allowed": True,
    "json_encoders": {ObjectId: str}
}

class ActorCreate(BaseModel):
    name: str
    profilePic: Optional[str] = None


class ActorResponse(ActorCreate):
    id: PyObjectId = Field(alias="_id")

    model_config = pydantic_model_config

class DirectorCreate(BaseModel):
    name: str
    profilePic: Optional[str] = None


class DirectorResponse(DirectorCreate):
    id: PyObjectId = Field(alias="_id")

    model_config = pydantic_model_config

class GenreCreate(BaseModel):
    name: str


class GenreResponse(GenreCreate):
    id: PyObjectId = Field(alias="_id")

    model_config = pydantic_model_config

class MovieCreate(BaseModel):
    title: str
    description: Optional[str] = None
    year: Optional[int] = None
    poster: Optional[str] = None
    genre_ids: List[str]
    actor_ids: List[str]
    director_id: str


class MovieResponse(BaseModel):
    id: PyObjectId = Field(alias="_id")
    title: str
    description: str | None = None
    year: int | None = None
    poster: str | None = None
    genres: List[str]
    actors: List[str]
    director: str

    model_config = pydantic_model_config
