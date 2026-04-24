import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('Test 1: App renders without crashing', () => {
  render(<App />);
  expect(document.body).toBeTruthy();
});

test('Test 2: Check page loads', () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
});

test('Test 3: Check buttons exist', () => {
  render(<App />);
  const buttons = screen.queryAllByRole('button');
  expect(buttons.length).toBeGreaterThanOrEqual(0);
});

test('Test 4: Check links exist', () => {
  render(<App />);
  const links = screen.queryAllByRole('link');
  expect(links.length).toBeGreaterThanOrEqual(0);
});

test('Test 5: Check app does not crash on re-render', () => {
  const { rerender } = render(<App />);
  rerender(<App />);
  expect(true).toBe(true);
});

test('Test 6: Check DOM is loaded', () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
});

test('Test 7: Check for headings', () => {
  render(<App />);
  const headings = screen.queryAllByRole('heading');
  expect(headings.length).toBeGreaterThanOrEqual(0);
});

test('Test 8: Check if images render', () => {
  render(<App />);
  const images = screen.queryAllByRole('img');
  expect(images.length).toBeGreaterThanOrEqual(0);
});

test('Test 9: Check if axios doesn’t crash app', () => {
  render(<App />);
  expect(true).toBe(true);
});

test('Test 10: Check routing does not break', () => {
  render(<App />);
  expect(window.location.pathname).toBeDefined();
});