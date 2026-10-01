/**
 * Option cards and the question screen.
 *
 * These assert the accessibility contract as much as the behaviour, because
 * "selected" being visible only as a border colour is the exact failure mode
 * the brief rules out.
 */

import { fireEvent, render, screen, within } from '@testing-library/react';
import { OptionCard, OptionGroup } from '../OptionCard';
import QuestionScreen from '../screens/QuestionScreen';

describe('OptionCard', () => {
  it('announces its selected state, not just its colour', () => {
    const { rerender } = render(
      <OptionCard id="a" label="Web Development" selected={false} onSelect={jest.fn()} />,
    );
    expect(screen.getByRole('radio')).toHaveAttribute('aria-checked', 'false');

    rerender(<OptionCard id="a" label="Web Development" selected onSelect={jest.fn()} />);
    expect(screen.getByRole('radio')).toHaveAttribute('aria-checked', 'true');
  });

  it('uses a checkbox role for multi-select questions', () => {
    render(<OptionCard id="a" label="Career" selected={false} multi onSelect={jest.fn()} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('fires onSelect when clicked', () => {
    const onSelect = jest.fn();
    render(<OptionCard id="a" label="Career" selected={false} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('radio'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('is keyboard operable, because it is a real button', () => {
    const onSelect = jest.fn();
    render(<OptionCard id="a" label="Career" selected={false} onSelect={onSelect} />);
    const card = screen.getByRole('radio');
    expect(card.tagName).toBe('BUTTON');
    fireEvent.keyDown(card, { key: 'Enter' });
    fireEvent.click(card); // what Enter does on a native button
    expect(onSelect).toHaveBeenCalled();
  });

  it('does not fire when disabled', () => {
    const onSelect = jest.fn();
    render(<OptionCard id="a" label="Career" selected={false} disabled onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('radio'));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('exposes the description as part of the card, not a tooltip', () => {
    render(
      <OptionCard
        id="a"
        label="Build AI Agents"
        description="Create AI agents and explore agentic AI."
        selected={false}
        onSelect={jest.fn()}
      />,
    );
    expect(
      within(screen.getByRole('radio')).getByText('Create AI agents and explore agentic AI.'),
    ).toBeInTheDocument();
  });
});

describe('OptionGroup', () => {
  it('names the group so the question is announced before the options', () => {
    render(
      <OptionGroup legend="What do you want to do with AI?">
        <OptionCard id="a" label="Use AI Tools" selected={false} onSelect={jest.fn()} />
      </OptionGroup>,
    );
    expect(
      screen.getByRole('radiogroup', { name: 'What do you want to do with AI?' }),
    ).toBeInTheDocument();
  });
});

describe('QuestionScreen', () => {
  const options = [
    { id: 'use-tools', label: 'Use AI Tools' },
    { id: 'build-agents', label: 'Build AI Agents' },
    { id: 'exploring', label: "I'm still figuring it out", secondary: true },
  ];

  it('renders every option', () => {
    render(
      <QuestionScreen
        legend="What do you want to do with AI?"
        options={options}
        selected={[]}
        multi
        onToggle={jest.fn()}
      />,
    );
    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
  });

  it('separates the exploratory option from the headline choices', () => {
    render(
      <QuestionScreen
        legend="What do you want to do with AI?"
        options={options}
        selected={[]}
        multi
        onToggle={jest.fn()}
      />,
    );
    // Two fieldsets: the primary options and the quieter "other" one.
    // (<fieldset> carries the implicit "group" role.)
    expect(screen.getAllByRole('group')).toHaveLength(2);
  });

  it('reports the tapped option id', () => {
    const onToggle = jest.fn();
    render(
      <QuestionScreen
        legend="What do you want to do with AI?"
        options={options}
        selected={[]}
        multi
        onToggle={onToggle}
      />,
    );
    fireEvent.click(screen.getByRole('checkbox', { name: /Build AI Agents/ }));
    expect(onToggle).toHaveBeenCalledWith('build-agents');
  });

  it('marks exactly the selected options as checked', () => {
    render(
      <QuestionScreen
        legend="What do you want to do with AI?"
        options={options}
        selected={['build-agents']}
        multi
        onToggle={jest.fn()}
      />,
    );
    expect(screen.getByRole('checkbox', { name: /Build AI Agents/ })).toHaveAttribute(
      'aria-checked',
      'true',
    );
    expect(screen.getByRole('checkbox', { name: /Use AI Tools/ })).toHaveAttribute(
      'aria-checked',
      'false',
    );
  });

  it('still selects when the sound cue throws', () => {
    // Audio is decoration; a broken AudioContext must not break the question.
    const audio = jest.requireMock('@/lib/audio/onboardingAudio');
    audio.playOnboardingCue.mockImplementationOnce(() => {
      throw new Error('AudioContext blocked');
    });

    const onToggle = jest.fn();
    render(
      <QuestionScreen
        legend="Pick one"
        options={options}
        selected={[]}
        onToggle={onToggle}
      />,
    );

    expect(() =>
      fireEvent.click(screen.getByRole('radio', { name: /Use AI Tools/ })),
    ).not.toThrow();
    expect(onToggle).toHaveBeenCalledWith('use-tools');
  });
});
