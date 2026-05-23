import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider, useCart } from './CartContext';

// Mock localStorage
const localStorageMock = (function () {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('CartContext', () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  const TestComponent = () => {
    const { items, addItem, removeItem, clearCart, totalItems, totalPrice, isInCart } = useCart();

    return (
      <div>
        <div data-testid="total-items">{totalItems}</div>
        <div data-testid="total-price">{totalPrice}</div>
        <div data-testid="items-length">{items.length}</div>
        <div data-testid="is-in-cart">{isInCart('1') ? 'yes' : 'no'}</div>

        <button
          onClick={() =>
            addItem({
              id: '1',
              title: 'Test Course 1',
              thumbnail: 'test1.jpg',
              instructorName: 'Instructor 1',
              price: 10,
            })
          }
        >
          Add Item 1
        </button>
        <button
          onClick={() =>
            addItem({
              id: '2',
              title: 'Test Course 2',
              thumbnail: 'test2.jpg',
              instructorName: 'Instructor 2',
              price: 20,
            })
          }
        >
          Add Item 2
        </button>
        <button onClick={() => removeItem('1')}>Remove Item 1</button>
        <button onClick={() => clearCart()}>Clear Cart</button>
      </div>
    );
  };

  it('provides empty cart by default', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('total-items')).toHaveTextContent('0');
    expect(screen.getByTestId('total-price')).toHaveTextContent('0');
    expect(screen.getByTestId('items-length')).toHaveTextContent('0');
  });

  it('loads cart from localStorage on mount', async () => {
    const mockItems = [
      {
        id: '1',
        title: 'Stored Course',
        thumbnail: 'stored.jpg',
        instructorName: 'Stored Instructor',
        price: 50,
      },
    ];
    window.localStorage.setItem('upskiill_cart', JSON.stringify(mockItems));

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Context sets state asynchronously from localStorage
    await screen.findByText('1', { selector: '[data-testid="total-items"]' });

    expect(screen.getByTestId('total-price')).toHaveTextContent('50');
  });

  it('adds an item to the cart', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    await user.click(screen.getByText('Add Item 1'));

    expect(screen.getByTestId('total-items')).toHaveTextContent('1');
    expect(screen.getByTestId('total-price')).toHaveTextContent('10');
    expect(screen.getByTestId('is-in-cart')).toHaveTextContent('yes');
    expect(window.localStorage.getItem('upskiill_cart')).toContain('Test Course 1');
  });

  it('does not add duplicate items', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    await user.click(screen.getByText('Add Item 1'));
    await user.click(screen.getByText('Add Item 1')); // Try adding again

    expect(screen.getByTestId('total-items')).toHaveTextContent('1');
    expect(screen.getByTestId('total-price')).toHaveTextContent('10');
  });

  it('removes an item from the cart', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    await user.click(screen.getByText('Add Item 1'));
    await user.click(screen.getByText('Add Item 2'));

    expect(screen.getByTestId('total-items')).toHaveTextContent('2');
    expect(screen.getByTestId('total-price')).toHaveTextContent('30');

    await user.click(screen.getByText('Remove Item 1'));

    expect(screen.getByTestId('total-items')).toHaveTextContent('1');
    expect(screen.getByTestId('total-price')).toHaveTextContent('20');
    expect(window.localStorage.getItem('upskiill_cart')).not.toContain('Test Course 1');
  });

  it('clears the cart', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    await user.click(screen.getByText('Add Item 1'));
    await user.click(screen.getByText('Add Item 2'));

    expect(screen.getByTestId('total-items')).toHaveTextContent('2');

    await user.click(screen.getByText('Clear Cart'));

    expect(screen.getByTestId('total-items')).toHaveTextContent('0');
    expect(screen.getByTestId('total-price')).toHaveTextContent('0');
    expect(window.localStorage.getItem('upskiill_cart')).toBe('[]');
  });

  it('throws an error if useCart is used outside of CartProvider', () => {
    // Suppress console.error for this expected error test
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useCart must be used within a CartProvider');

    consoleErrorSpy.mockRestore();
  });
});
