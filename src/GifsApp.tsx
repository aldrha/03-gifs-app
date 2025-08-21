import { GifList } from './gifs/components/GifList';
import { PreviousSearches } from './gifs/components/PreviousSearches';
import { useGif } from './gifs/hooks/useGif';
import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar';

export const GifsApp = () => {
    const { gifs, previousTerms, handleSearch, handleTermClicked } = useGif();

    return (
        <>
            {/* Header */}
            <CustomHeader title="Buscador de Gifs" description="Busca y comparte el gif perfecto" />

            {/* Search */}
            <SearchBar placeholder="Busca lo que quieras" onQuery={handleSearch} />

            {/* Busquedas Previas */}
            <PreviousSearches searches={previousTerms} onLabelClicked={handleTermClicked} />

            {/* Gifs Container */}
            <GifList gifs={gifs} />
        </>
    );
};
