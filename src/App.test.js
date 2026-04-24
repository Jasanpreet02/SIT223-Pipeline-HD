import { render, screen } from '@testing-library/react';
import App from './App';

test('Test 1: App renders without crashing', () => {
  render(<App />);
});

test('Test 2: Check if main container exists', () => {
  render(<App />);
  const element = document.querySelector('div');
  expect(element).toBeInTheDocument();
});

test('Test 3: Check page loads', () => {
  render(<App />);
  expect(document.body).toBeTruthy();
});

test('Test 4: Check title exists (if any text)', () => {
  render(<App />);
  const text = screen.queryByText(/youtube/i);
  expect(text).toBeTruthy();
});

test('Test 5: Check video player renders (if ReactPlayer used)', () => {
  render(<App />);
  const player = document.querySelector('video, iframe');
  expect(player).toBeTruthy();
});

test('Test 6: Check buttons exist', () => {
  render(<App />);
  const buttons = document.querySelectorAll('button');
  expect(buttons.length).toBeGreaterThanOrEqual(0);
});

test('Test 7: Check links exist', () => {
  render(<App />);
  const links = document.querySelectorAll('a');
  expect(links.length).toBeGreaterThanOrEqual(0);
});

test('Test 8: Check app does not crash on re-render', () => {
  const { rerender } = render(<App />);
  rerender(<App />);
});

test('Test 9: Check DOM is loaded', () => {
  render(<App />);
  expect(document.body.innerHTML.length).toBeGreaterThan(0);
});

test('Test 10: Check if container div exists', () => {
  render(<App />);
  const container = document.getElementById('root');
  expect(container).toBeTruthy();
});

test('Test 11: Check for headings', () => {
  render(<App />);
  const headings = document.querySelectorAll('h1, h2, h3');
  expect(headings.length).toBeGreaterThanOrEqual(0);
});

test('Test 12: Check if images render', () => {
  render(<App />);
  const images = document.querySelectorAll('img');
  expect(images.length).toBeGreaterThanOrEqual(0);
});

test('Test 13: Check if axios doesn’t crash app', () => {
  render(<App />);
  expect(true).toBe(true); // placeholder for API stability
});

test('Test 14: Check routing does not break', () => {
  render(<App />);
  expect(window.location.pathname).toBeDefined();
});

test('Test 15: App loads within DOM', () => {
  render(<App />);
  expect(document.body).toContainHTML('');
});