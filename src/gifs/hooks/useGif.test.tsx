import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, test, vi } from 'vitest';
import * as gifAction from '../actions/get-gifs-by-query.action';
import { useGif } from './useGif';

describe('useGif', () => {
    test('should render default values and methods', () => {
        const { result } = renderHook(() => useGif());

        expect(result.current.gifs.length).toBe(0);
        expect(result.current.previousTerms.length).toBe(0);
        expect(result.current.handleSearch).toBeDefined();
        expect(result.current.handleTermClicked).toBeDefined();
    });

    test('should return a list of gifs', async () => {
        const { result } = renderHook(() => useGif());

        await act(async () => {
            await result.current.handleSearch('naruto');
        });

        expect(result.current.gifs.length).toBe(10);
    });

    test('should return a list of gifs when handleTermClicked is called', async () => {
        const { result } = renderHook(() => useGif());

        await act(async () => {
            await result.current.handleTermClicked('naruto');
        });

        expect(result.current.gifs.length).toBe(10);
    });

    test('should return a list of gifs from cache', async () => {
        const { result } = renderHook(() => useGif());

        await act(async () => {
            await result.current.handleTermClicked('naruto');
        });

        expect(result.current.gifs.length).toBe(10);

        vi.spyOn(gifAction, 'getGifsByQuery').mockRejectedValue(new Error('This is my custom error'));

        await act(async () => {
            await result.current.handleTermClicked('naruto');
        });

        expect(result.current.gifs.length).toBe(10);
    });

    test('should return no more tha 8 preview terms', async () => {
        const { result } = renderHook(() => useGif());

        vi.spyOn(gifAction, 'getGifsByQuery').mockResolvedValue([]);

        await act(async () => {
            await result.current.handleSearch('naruto');
        });
        await act(async () => {
            await result.current.handleSearch('naruto2');
        });
        await act(async () => {
            await result.current.handleSearch('naruto3');
        });
        await act(async () => {
            await result.current.handleSearch('naruto4');
        });
        await act(async () => {
            await result.current.handleSearch('naruto5');
        });
        await act(async () => {
            await result.current.handleSearch('naruto6');
        });
        await act(async () => {
            await result.current.handleSearch('naruto7');
        });
        await act(async () => {
            await result.current.handleSearch('naruto8');
        });
        await act(async () => {
            await result.current.handleSearch('naruto9');
        });

        expect(result.current.previousTerms.length).toBe(8);
        expect(result.current.previousTerms).toStrictEqual([
            'naruto9',
            'naruto8',
            'naruto7',
            'naruto6',
            'naruto5',
            'naruto4',
            'naruto3',
            'naruto2',
        ]);
        console.log(result.current.previousTerms);
    });
});
