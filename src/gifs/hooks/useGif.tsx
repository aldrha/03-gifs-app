import { useState } from 'react';
import { getGifsByQuery } from '../actions/get-gifs-by-query.action';
import type { Gif } from '../interfaces/gif.interface';

export const useGif = () => {
    const [gifs, setGifs] = useState<Gif[]>([]);

    const [previousTerms, setPreviousTerms] = useState<string[]>([]);

    const handleTermClicked = (term: string) => {
        console.log({ term });
    };

    const handleSearch = async (query: string = '') => {
        query = query.trim().toLocaleLowerCase();

        if (query.length === 0) return;

        if (previousTerms.includes(query)) return;

        setPreviousTerms([query, ...previousTerms].slice(0, 8));

        const gifs = await getGifsByQuery(query);

        setGifs(gifs);
    };

    return {
        //Values
        gifs,
        previousTerms,

        //Methods
        handleSearch,
        handleTermClicked,
    };
};
