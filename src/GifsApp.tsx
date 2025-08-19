import { useState } from 'react';
import { GifList } from './gifs/components/GifList';
import { PreviousSearches } from './gifs/components/PreviousSearches';
import { mockGifs } from './mock-data/gifs.mock';
import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar';

export const GifsApp = () => {
    const [previousTerms, setPreviousTerms] = useState(['naruto']);

    const handleTermClicked = (term: string) => {
        console.log({ term });
    };

    return (
        <>
            {/* Header */}
            <CustomHeader title="Buscador de Gifs" description="Busca y comparte el gif perfecto" />

            {/* Search */}
            <SearchBar placeholder="Busca lo que quieras" />

            {/* Busquedas Previas */}
            <PreviousSearches searches={previousTerms} onLabelClicked={handleTermClicked} />

            {/* Gifs Container */}
            <GifList gifs={mockGifs} />
        </>
    );
};
