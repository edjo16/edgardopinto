import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatBar } from '../components/StatBar/StatBar';
import { SectionHeading } from '../components/SectionHeading/SectionHeading';
import { Button } from '../components/Button/Button';
import { AudioProvider } from '../providers/AudioProvider';

describe('StatBar', () => {
  it('renders label and value', () => {
    render(<StatBar label="Frontend" value={92} />);
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('92%')).toBeInTheDocument();
  });
});

describe('SectionHeading', () => {
  it('renders the title and eyebrow', () => {
    render(<SectionHeading eyebrow="LOADOUT" title="Arsenal" index="03" />);
    expect(screen.getByRole('heading', { name: 'Arsenal' })).toBeInTheDocument();
    expect(screen.getByText('LOADOUT')).toBeInTheDocument();
  });
});

describe('Button', () => {
  it('renders children inside an AudioProvider', () => {
    render(
      <AudioProvider>
        <Button>View Projects</Button>
      </AudioProvider>
    );
    expect(
      screen.getByRole('button', { name: /View Projects/i })
    ).toBeInTheDocument();
  });
});
