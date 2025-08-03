export interface BaseEntity {
  _id?: string;
}

export interface Actor extends BaseEntity {
  name: string;
  profilePic?: string;
}

export interface Director extends BaseEntity {
  name: string;
  profilePic?: string;
}

export interface Genre extends BaseEntity {
  name: string;
}

export interface Movie extends BaseEntity {
  title: string;
  description?: string;
  year?: number;
  poster?: string;
  genres: string[];
  actors: string[];
  director: string;
}