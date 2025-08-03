import React, { useEffect, useState } from "react";
import axios from "axios";
import type { Director } from "../../types";
import { DIRECTORS_URL } from "../../constants/api";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { useNavigate } from "react-router-dom";

const DirectorsPage: React.FC = () => {
  const [directors, setDirectors] = useState<Director[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        const response = await axios.get<Director[]>(DIRECTORS_URL);
        setDirectors(response.data);
      } catch (error) {
        console.error("Failed to load directors", error);
      }
    };

    fetchDirectors();
  }, []);

    const handleCardClick = (profile: Director) => {
      navigate("/profile", {state: {id: profile._id, role: "director", profile}});
    }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {directors.map((director) => (
        <ProfileCard key={director._id} profile={director} 
        onClick={()=>handleCardClick(director)}
        />
      ))}
    </div>
  );
};

export default DirectorsPage;
