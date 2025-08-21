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

    const handleSearch = (query: string = '') => {
        query = query.trim().toLocaleLowerCase();

        if (query.length === 0) return;

        if (previousTerms.includes(query)) return;

        setPreviousTerms([query, ...previousTerms].slice(0, 8));
    };

    return (
        <>
            {/* Header */}
            <CustomHeader title="Buscador de Gifs" description="Busca y comparte el gif perfecto" />

            {/* Search */}
            <SearchBar placeholder="Busca lo que quieras" onQuery={handleSearch} />

            {/* Busquedas Previas */}
            <PreviousSearches searches={previousTerms} onLabelClicked={handleTermClicked} />

            {/* Gifs Container */}
            <GifList gifs={mockGifs} />
        </>
    );
};
