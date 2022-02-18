import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import App from './App';
import * as api from './api/api';

describe('App', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  
  afterEach(() => {
    jest.useRealTimers()
  });

  test('Should submit form when all input fields are filled in correctly', async () => {
    const quantity = '1';
    const email = 'test@test.com';
    const cc = '1234123412341234';
    const exp = '11/22';
    const zip = '12345';
    
    render(<App />);
    const spyPostForm = jest.spyOn(api, 'postForm');

    fireEvent.change(screen.getByPlaceholderText(/max 3/i), { target: { value: quantity }});
    fireEvent.change(screen.getByPlaceholderText(/e-mail/i), { target: { value: email }});
    fireEvent.change(screen.getByPlaceholderText(/credit card number/i), { target: { value: cc }});
    fireEvent.change(screen.getByPlaceholderText(/mm\/yy/i), { target: { value: exp }});
    fireEvent.change(screen.getByPlaceholderText(/zip code/i), { target: { value: zip }});
    fireEvent.click(screen.getByRole('button', { name: /place your order/i}));

    act(() => jest.advanceTimersByTime(500));
    
    await waitFor(() => {
      expect(spyPostForm).toHaveBeenCalledTimes(1);
    });
  });

  test('Should not submit form when an input field is empty', async () => {
    const quantity = '1';
    const email = 'test@test.com';
    const cc = '1234123412341234';
    const exp = '11/22';
    
    render(<App />);
    const spyPostForm = jest.spyOn(api, 'postForm');

    fireEvent.change(screen.getByPlaceholderText(/max 3/i), { target: { value: quantity }});
    fireEvent.change(screen.getByPlaceholderText(/e-mail/i), { target: { value: email }});
    fireEvent.change(screen.getByPlaceholderText(/credit card number/i), { target: { value: cc }});
    fireEvent.change(screen.getByPlaceholderText(/mm\/yy/i), { target: { value: exp }});
    fireEvent.click(screen.getByRole('button', { name: /place your order/i}));

    act(() => jest.advanceTimersByTime(500));

    await waitFor(() => {
      expect(spyPostForm).toHaveBeenCalledTimes(0);
    });
  });

  test('Should not submit form if any input field is not filled in correctly', async () => {
    const quantity = '1';
    const email = 'test@test';
    const cc = '1234123412341234';
    const exp = '11/22';
    
    render(<App />);
    const spyPostForm = jest.spyOn(api, 'postForm');

    fireEvent.change(screen.getByPlaceholderText(/max 3/i), { target: { value: quantity }});
    fireEvent.change(screen.getByPlaceholderText(/e-mail/i), { target: { value: email }});
    fireEvent.change(screen.getByPlaceholderText(/credit card number/i), { target: { value: cc }});
    fireEvent.change(screen.getByPlaceholderText(/mm\/yy/i), { target: { value: exp }});
    fireEvent.click(screen.getByRole('button', { name: /place your order/i}));

    act(() => jest.advanceTimersByTime(500));

    await waitFor(() => {
      expect(spyPostForm).toHaveBeenCalledTimes(0);
    });
  });

  test('Should display error message if input is empty or invalid when trying to submit form', () => {
    const quantity = '';
    const invalidEmail = 'test@test';
    const cc = '123412341234';
    const exp = '11';
    
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText(/max 3/i), { target: { value: quantity }});
    fireEvent.change(screen.getByPlaceholderText(/e-mail/i), { target: { value: invalidEmail }});
    fireEvent.change(screen.getByPlaceholderText(/credit card number/i), { target: { value: cc }});
    fireEvent.change(screen.getByPlaceholderText(/mm\/yy/i), { target: { value: exp }});
    fireEvent.click(screen.getByRole('button', { name: /place your order/i}));

    expect(screen.getByText(/please enter a quantity \(max 3\)/i)).toBeVisible();
    expect(screen.getByText(/please enter a valid e-mail/i)).toBeVisible();
    expect(screen.getByText(/Please enter a valid credit card number/i)).toBeVisible();
    expect(screen.getByText(/please enter a valid e-mail/i)).toBeVisible();
    expect(screen.getByText(/please enter a valid zip code/i)).toBeVisible();
  });
});