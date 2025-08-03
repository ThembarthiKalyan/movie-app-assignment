// src/pages/ProfileDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import type { Actor, Director } from "../../types";
import { MOVIES_BY_ROLE_URL } from "../../constants/api";
import { Button } from "@mui/material";
import "./ProfileDetailPage.css"

const ProfileDetailPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { id, role, profile } = state as {
    id: string;
    role: "actor" | "director";
    profile: Actor | Director;
  };

  const [movies, setMovies] = useState<string[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(MOVIES_BY_ROLE_URL, {
          params: { id, role },
        });
        setMovies(response.data);
      } catch (err) {
        console.error("Failed to fetch movies", err);
      }
    };

    fetchMovies();
  }, [id, role]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-6 flex flex-col items-center text-center">
      <img
        src={profile.profilePic}
        alt={profile.name}
        className="mb-4 w-60 img-profile-detail"
      />
      <h1 className="text-3xl font-bold mb-4">{profile.name}</h1>

      <h2 className="text-xl font-semibold mt-4 mb-2">Movies</h2>
      <ul className="list-none mb-6">
        {movies.map((title, idx) => (
          <li key={idx}>{title}</li>
        ))}
      </ul>

      <Button variant="contained" color="primary" onClick={handleBack}>
        OK
      </Button>
    </div>
  );
};

export default ProfileDetailPage;
