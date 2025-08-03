// src/components/MovieCard.tsx
import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import type { Actor, Director } from '../../types';
import './ProfileCard.css';

type Props = {
  profile: Actor | Director;
  onClick: () => void;
};

const ProfileCard: React.FC<Props> = ({ profile, onClick }) => {
  return (
    <Card className="rounded-2xl shadow-lg card-div cursor-pointer"
      onClick={onClick}
    >
      <CardMedia
        component="img"
        image={profile.profilePic}
        alt={profile.name}
        className="object-cover card-img"
      />
      <CardContent className='card-content' style={{paddingTop: "10px"}}>
        <Typography variant="h6" component="h2" className="font-bold mb-2 h2-card" style={{fontWeight: 700}} >
          {profile.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
