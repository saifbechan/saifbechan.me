import { describe, expect, test } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Contact from '../../components/Contact';

describe('Contact', () => {
  test('renders the logo correctly', () => {
    render(<Contact />);
    const contact = within(screen.getByRole('contact'));
    expect(contact.getByRole('logo')).toBeDefined();
  });
});
