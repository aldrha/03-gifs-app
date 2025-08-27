import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useCounter } from './useCounter';

describe('useCounter', () => {
    test('should inicialized with default values', () => {
        const { result } = renderHook(() => useCounter());

        expect(result.current.counter).toBe(10);
    });

    test('should inicialize width value 20', () => {
        const initialValue = 20;
        const { result } = renderHook(() => useCounter(initialValue));

        expect(result.current.counter).toBe(initialValue);
    });

    test('should increment counter when handleAdd is called', () => {
        const { result } = renderHook(() => useCounter(10));

        act(() => {
            result.current.handleAdd();
        });

        expect(result.current.counter).toBe(11);
    });

    test('should decrease counter when handleSubtract is called', () => {
        const { result } = renderHook(() => useCounter(10));

        act(() => {
            result.current.handleSubtract();
        });

        expect(result.current.counter).toBe(9);
    });

    test('should counter is restore to initialValue when handleReset is called', () => {
        const { result } = renderHook(() => useCounter());

        act(() => {
            result.current.handleAdd();
            result.current.handleAdd();
            result.current.handleAdd();
            result.current.handleAdd();
            result.current.handleAdd();
        });

        expect(result.current.counter).toBe(15);

        act(() => {
            result.current.handleReset();
        });

        expect(result.current.counter).toBe(10);
    });
});
