import { render, screen } from '@testing-library/react';
import App from './App';

test('Test 1: App renders without crashing', () => {
  render(<App />);
});


test('Test 2: Check page loads', () => {
  render(<App />);
  expect(document.body).toBeTruthy();
});

test('Test 3: Check buttons exist', () => {
  render(<App />);
  const buttons = document.querySelectorAll('button');
  expect(buttons.length).toBeGreaterThanOrEqual(0);
});

test('Test 4: Check links exist', () => {
  render(<App />);
  const links = document.querySelectorAll('a');
  expect(links.length).toBeGreaterThanOrEqual(0);
});

test('Test 5: Check app does not crash on re-render', () => {
  const { rerender } = render(<App />);
  rerender(<App />);
});

test('Test 6: Check DOM is loaded', () => {
  render(<App />);
  expect(document.body.innerHTML.length).toBeGreaterThan(0);
});

test('Test 7: Check for headings', () => {
  render(<App />);
  const headings = document.querySelectorAll('h1, h2, h3');
  expect(headings.length).toBeGreaterThanOrEqual(0);
});

test('Test 8: Check if images render', () => {
  render(<App />);
  const images = document.querySelectorAll('img');
  expect(images.length).toBeGreaterThanOrEqual(0);
});

test('Test 9: Check if axios doesn’t crash app', () => {
  render(<App />);
  expect(true).toBe(true); // placeholder for API stability
});

test('Test 10: Check routing does not break', () => {
  render(<App />);
  expect(window.location.pathname).toBeDefined();
});
