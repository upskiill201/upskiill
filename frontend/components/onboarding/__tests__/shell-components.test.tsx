/**
 * Progress, footer, dialogue and review — the parts of the frame a learner
 * navigates with.
 */

import { fireEvent, render, screen } from '@testing-library/react';
import { OnboardingProgress } from '../OnboardingProgress';
import { OnboardingFooter } from '../OnboardingFooter';
import { TeyMessage } from '../TeyMessage';
import ReviewScreen from '../screens/ReviewScreen';
import type { Beat } from '@/lib/onboarding/dialogue/types';
import type { OnboardingAnswersV2 } from '@/lib/onboarding/types';

const beat = (text: string): Beat => ({ text, pose: 'curious', poseFamily: 'curious' });

describe('OnboardingProgress', () => {
  const props = {
    step: 7,
    total: 15,
    percent: 46.6,
    onBack: jest.fn(),
    muted: false,
    onToggleSound: jest.fn(),
  };

  it('exposes position as a real progressbar, not just a coloured bar', () => {
    render(<OnboardingProgress {...props} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '7');
    expect(bar).toHaveAttribute('aria-valuemin', '1');
    expect(bar).toHaveAttribute('aria-valuemax', '15');
    expect(bar).toHaveAccessibleName('Step 7 of 15');
  });

  it('updates when the step changes', () => {
    const { rerender } = render(<OnboardingProgress {...props} />);
    rerender(<OnboardingProgress {...props} step={8} percent={53.3} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '8');
  });

  it('calls back when the back button is pressed', () => {
    const onBack = jest.fn();
    render(<OnboardingProgress {...props} onBack={onBack} />);
    fireEvent.click(screen.getByRole('button', { name: /go back/i }));
    expect(onBack).toHaveBeenCalled();
  });

  it('disables back during a transition so a double tap cannot skip a step', () => {
    render(<OnboardingProgress {...props} backDisabled />);
    expect(screen.getByRole('button', { name: /go back/i })).toBeDisabled();
  });

  it('offers a sound toggle that reports its state', () => {
    const onToggleSound = jest.fn();
    const { rerender } = render(
      <OnboardingProgress {...props} onToggleSound={onToggleSound} />,
    );

    const toggle = screen.getByRole('button', { name: /turn sound off/i });
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(toggle);
    expect(onToggleSound).toHaveBeenCalled();

    rerender(<OnboardingProgress {...props} muted onToggleSound={onToggleSound} />);
    expect(screen.getByRole('button', { name: /turn sound on/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });
});

describe('OnboardingFooter', () => {
  it('blocks Continue until the question is answered', () => {
    const onContinue = jest.fn();
    render(<OnboardingFooter onContinue={onContinue} canContinue={false} />);

    const cta = screen.getByRole('button', { name: /continue/i });
    expect(cta).toBeDisabled();
    fireEvent.click(cta);
    expect(onContinue).not.toHaveBeenCalled();
  });

  it('explains WHY Continue is unavailable, for anyone who cannot see the cards', () => {
    render(
      <OnboardingFooter
        onContinue={jest.fn()}
        canContinue={false}
        disabledReason="Pick at least one option to continue"
      />,
    );
    expect(screen.getByRole('button', { name: /continue/i })).toHaveAccessibleDescription(
      'Pick at least one option to continue',
    );
  });

  it('enables Continue once the answer is there', () => {
    const onContinue = jest.fn();
    render(<OnboardingFooter onContinue={onContinue} canContinue />);

    const cta = screen.getByRole('button', { name: /continue/i });
    expect(cta).toBeEnabled();
    fireEvent.click(cta);
    expect(onContinue).toHaveBeenCalledTimes(1);
  });

  it('cannot be double-submitted while busy', () => {
    const onContinue = jest.fn();
    render(<OnboardingFooter onContinue={onContinue} canContinue busy />);
    fireEvent.click(screen.getByRole('button'));
    expect(onContinue).not.toHaveBeenCalled();
  });

  it('shows a skip control only on optional steps', () => {
    const { rerender } = render(<OnboardingFooter onContinue={jest.fn()} canContinue />);
    expect(screen.queryByRole('button', { name: /skip/i })).not.toBeInTheDocument();

    const onSkip = jest.fn();
    rerender(<OnboardingFooter onContinue={jest.fn()} canContinue onSkip={onSkip} />);
    fireEvent.click(screen.getByRole('button', { name: /skip/i }));
    expect(onSkip).toHaveBeenCalled();
  });
});

describe('TeyMessage', () => {
  it('announces the beat, so a reaction is not conveyed by animation alone', () => {
    const { container } = render(<TeyMessage beat={beat('Ohhh, AI? Now we are talking.')} />);

    const live = container.querySelector('[aria-live="polite"]');
    expect(live).toBeInTheDocument();
    expect(live).toHaveAttribute('aria-atomic', 'true');
  });

  it('puts the complete text in the DOM immediately, not after the typewriter', () => {
    render(<TeyMessage beat={beat('Starting from zero? Perfect.')} />);
    // The sr-only copy carries the whole sentence from the first frame.
    expect(screen.getByText('Starting from zero? Perfect.')).toBeInTheDocument();
  });

  it('renders nothing when there is no beat', () => {
    const { container } = render(<TeyMessage beat={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe('ReviewScreen', () => {
  const answers: OnboardingAnswersV2 = {
    name: 'Ada',
    category: 'ai',
    interests: ['build-agents'],
    goals: ['build-projects'],
    experienceLevel: 'beginner',
    dailyCommitment: '10',
    preferredTime: 'evening',
  };

  const props = {
    answers,
    saveAnswer: jest.fn(),
    react: jest.fn(),
    onNext: jest.fn(),
    goToStep: jest.fn(),
  };

  it('shows human labels, never internal ids', () => {
    render(<ReviewScreen {...props} />);

    expect(screen.getByText('Build AI Agents')).toBeInTheDocument();
    expect(screen.getByText('AI')).toBeInTheDocument();
    expect(screen.getByText('10 minutes a day')).toBeInTheDocument();
    // The raw answer ids must not leak onto the screen.
    expect(screen.queryByText('build-agents')).not.toBeInTheDocument();
    expect(screen.queryByText('dailyCommitment')).not.toBeInTheDocument();
  });

  it('gives every Edit button a distinct accessible name', () => {
    render(<ReviewScreen {...props} />);
    // Seven visually identical "Edit" buttons would be unusable by voice or
    // screen reader without this.
    expect(screen.getByRole('button', { name: 'Edit learning' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Edit focus' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Edit daily goal' })).toBeInTheDocument();
  });

  it('jumps back to the step that owns the answer', () => {
    const goToStep = jest.fn();
    render(<ReviewScreen {...props} goToStep={goToStep} />);

    fireEvent.click(screen.getByRole('button', { name: 'Edit learning' }));
    expect(goToStep).toHaveBeenCalledWith(3); // the category step

    fireEvent.click(screen.getByRole('button', { name: 'Edit focus' }));
    expect(goToStep).toHaveBeenCalledWith(5); // the interests step
  });

  it('omits rows the learner never answered instead of showing blanks', () => {
    render(<ReviewScreen {...props} answers={{ name: 'Ada', category: 'coding' }} />);
    expect(screen.queryByRole('button', { name: 'Edit daily goal' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Edit name' })).toBeInTheDocument();
  });
});
