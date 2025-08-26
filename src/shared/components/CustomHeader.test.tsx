import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { CustomHeader } from './CustomHeader';

describe('CustomHeader', () => {
    const title = 'Buscador';
    test('should render the title correctly', () => {
        render(<CustomHeader title={title} />);

        const h1 = screen.getByRole('heading', { level: 1 });
        expect(screen.getByText(title)).toBeDefined();
        expect(h1).toBeDefined();
    });

    test('should render the description when provided', () => {
        const description = 'Test Descripción';
        render(<CustomHeader title={title} description={description} />);

        expect(screen.getByText(description)).toBeDefined();
        expect(screen.getByRole('paragraph')).toBeDefined();
        expect(screen.getByRole('paragraph').innerHTML).toBe(description);
    });

    test('should not render description when not provided', () => {
        const { container } = render(<CustomHeader title={title} />);

        const divElement = container.querySelector('.content-center');
        const h1 = divElement?.querySelector('h1');
        expect(h1?.innerHTML).toBe(title);

        const paragraph = divElement?.querySelector('p');
        expect(paragraph).toBeFalsy();
        expect(paragraph).toBeNull();
        // const paragraph = container.getElementsByTagName('p');
        // expect(paragraph[0]).toBeFalsy();
    });
});
