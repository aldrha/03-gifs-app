import AxiosMockAdapter from 'axios-mock-adapter';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { giphyApi } from '../api/giphy.api';
import { getGifsByQuery } from './get-gifs-by-query.action';

import { GiphySearchResponseMock } from '../../../test/mocks/giphy.response.data';

describe('get-gifs-by-query.action', () => {
    let mock = new AxiosMockAdapter(giphyApi);

    beforeEach(() => {
        // mock.reset();
        mock = new AxiosMockAdapter(giphyApi);
    });

    // test('should be return a list gifs', async() => {

    //     const gifs = await getGifsByQuery('naruto')
    //     const [gif1] = gifs;

    //     expect(gifs.length).toBe(10)

    //     expect(gif1).toStrictEqual({
    //         id: expect.any(String),
    //         height: expect.any(Number),
    //         title: expect.any(String),
    //         url: expect.any(String),
    //         width: expect.any(Number),
    //     })

    //  })

    test('should be return a list of gifs', async () => {
        mock.onGet('/search').reply(200, GiphySearchResponseMock);

        const gifs = await getGifsByQuery('naruto');

        expect(gifs.length).toBe(10);

        gifs.forEach((gif) => {
            expect(typeof gif.id).toBe('string');
            expect(typeof gif.title).toBe('string');
            expect(typeof gif.url).toBe('string');
            expect(typeof gif.height).toBe('number');
            expect(typeof gif.width).toBe('number');
        });
    });

    test('should be a return empty list of gifs if query us empty', async () => {
        // mock.onGet('/search').reply(200, GiphySearchResponseMock);
        mock.restore();

        const gifs = await getGifsByQuery('');

        expect(gifs.length).toBe(0);
    });

    test('should handle error when API returns a error', async () => {
        const consoleMockSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        mock.onGet('/search').reply(400, {
            data: {
                message: 'Bad Request',
            },
        });

        const gifs = await getGifsByQuery('naruto');

        expect(gifs.length).toBe(0);
        expect(consoleMockSpy).toBeCalled();
        expect(consoleMockSpy).toBeCalledTimes(1);

        expect(consoleMockSpy).toBeCalledWith(expect.anything());
    });
});
