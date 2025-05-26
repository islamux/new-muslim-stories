import { render, screen } from '@testing-library/react';
import HeroSection from './HeroSection';
import '@testing-library/jest-dom';

describe('HeroSection Component', () => {
  test('renders successfully without crashing', () => {
    render(<HeroSection />);
    // If render completes without throwing an error, this test implicitly passes.
  });

  test('displays the main headline text', () => {
    render(<HeroSection />);
    // Use a case-insensitive regex to match the text
    const headlineElement = screen.getByText(/Discover Inspiring Journeys/i);
    expect(headlineElement).toBeInTheDocument();
  });

  test('displays the tagline/sub-headline text', () => {
    render(<HeroSection />);
    // Using a more specific part of the tagline for the query
    const taglineElement = screen.getByText(/Explore stories of individuals embracing new beginnings, overcoming challenges/i);
    expect(taglineElement).toBeInTheDocument();
  });

  test('displays the call-to-action button with the correct text', () => {
    render(<HeroSection />);
    // Get by role 'button' and then by its accessible name (text content)
    const ctaButton = screen.getByRole('button', { name: /Explore Stories/i });
    expect(ctaButton).toBeInTheDocument();
  });
});
