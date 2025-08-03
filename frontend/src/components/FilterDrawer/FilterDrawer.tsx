import React from "react";
import {
    Drawer,
    Typography,
    Divider,
    Box,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


interface FilterDrawerProps {
    open: boolean;
    onClose: () => void;
    selectedGenres: string[];
    selectedActors: string[];
    selectedDirectors: string[];
    onGenreChange: (name: string) => void;
    onActorChange: (name: string) => void;
    onDirectorChange: (name: string) => void;
    onApply: () => void;
    genres: string[];
    actors: string[];
    directors: string[];
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({
    open,
    onClose,
    selectedGenres,
    selectedActors,
    selectedDirectors,
    onGenreChange,
    onActorChange,
    onDirectorChange,
    onApply,
    genres,
    actors,
    directors
}) => {
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            slotProps={{
                paper: {
                    sx: { width: 350, 
                        padding: 3,
                        position: 'fixed',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        zIndex: 1300,  }
                }
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" className="font-bold">Filter Movies</Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider className="mb-4" />

            <Box className="mb-6">
                <Typography className="font-semibold mb-2">Genres</Typography>
                <FormGroup>
                    {genres.map((genre) => (
                        <FormControlLabel
                            key={genre}
                            control={
                                <Checkbox
                                    checked={selectedGenres.includes(genre)}
                                    onChange={() => onGenreChange(genre)}
                                />
                            }
                            label={genre}
                        />
                    ))}
                </FormGroup>
            </Box>

            {/* Actors */}
            <Box className="mb-6">
                <Typography className="font-semibold mb-2">Actors</Typography>
                <FormGroup>
                    {actors.map((actor) => (
                        <FormControlLabel
                            key={actor}
                            control={
                                <Checkbox
                                    checked={selectedActors.includes(actor)}
                                    onChange={() => onActorChange(actor)}
                                />
                            }
                            label={actor}
                        />
                    ))}
                </FormGroup>
            </Box>

            {/* Directors */}
            <Box className="mb-6">
                <Typography className="font-semibold mb-2">Directors</Typography>
                <FormGroup>
                    {directors.map((director) => (
                        <FormControlLabel
                            key={director}
                            control={
                                <Checkbox
                                    checked={selectedDirectors.includes(director)}
                                    onChange={() => onDirectorChange(director)}
                                />
                            }
                            label={director}
                        />
                    ))}
                </FormGroup>
            </Box>

            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={onApply}
                className="mt-4"
            >
                Apply Filters
            </Button>
        </Drawer>
    )
}

export default FilterDrawer;