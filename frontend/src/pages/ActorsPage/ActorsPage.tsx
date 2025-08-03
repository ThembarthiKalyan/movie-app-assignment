import React, { useEffect, useState } from "react";
import axios from "axios";
import type { Actor } from "../../types"; 
import { ACTORS_URL} from "../../constants/api";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { useNavigate } from "react-router-dom";

const ActorsPage: React.FC = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await axios.get<Actor[]>(ACTORS_URL);
        setActors(response.data);
      } catch (error) {
        console.error("Failed to load actors", error);
      }
    };

    fetchActors();
  }, []);

  const handleCardClick = (profile: Actor) => {
    navigate("/profile", {state: {id: profile._id, role: "actor", profile}});
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {actors.map((actor) => (
        <ProfileCard key={actor._id} profile={actor} 
          onClick={()=>handleCardClick(actor)}
        />
      ))}
    </div>
  );
};

export default ActorsPage;
