import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 14. Before/After: chat shorthand — LGTM, WFH, IMO, BRB, AFAIK, np, ty — fine with colleagues, too casual for clients. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'Chat shorthand: LGTM, WFH, IMO, BRB',
  summary: 'Zanele replies to a client\'s long, careful email with "k ty np, LGTM, BRB". The client replies: "Sorry, is that a yes?" Chat shorthand has a time and a place.',
  minutes: 11,
  outcomes: [
    'Decode common chat shorthand: LGTM, WFH, IMO, BRB, AFAIK, IIRC, np, ty',
    'Know when shorthand is fine and when it\'s too casual',
    'Rewrite a shorthand message for a client',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'Zanele\'s reply to Kestrel Logistics',
      before: {
        label: 'Chat-style',
        text: 'k ty np. LGTM IMO. AFAIK pricing is fine but IIRC Brian is WFH so BRB w/ confirmation.',
      },
      after: {
        label: 'Client-ready',
        text: 'Thanks, this looks good to me. As far as I know the pricing works for us, but I\'ll confirm with Brian today and come back to you by 5 p.m.',
      },
      notes: [
        '"k ty np" became "Thanks". Short is fine; cryptic isn\'t.',
        '"LGTM IMO" became "this looks good to me".',
        '"AFAIK" and "IIRC" became plain words, so a client in any country can read it.',
        '"BRB w/ confirmation" became a clear promise with a time.',
      ],
    },
    {
      kind: 'text',
      html: "<p>The shorthand, decoded:</p><ul><li><strong>LGTM:</strong> looks good to me (approval, from software teams).</li><li><strong>WFH:</strong> working from home.</li><li><strong>IMO / IMHO:</strong> in my opinion / in my humble opinion.</li><li><strong>BRB:</strong> be right back.</li><li><strong>AFAIK:</strong> as far as I know.</li><li><strong>IIRC:</strong> if I remember correctly.</li><li><strong>np / ty / k:</strong> no problem / thank you / okay.</li></ul><p><strong>The rule:</strong> shorthand is fine in quick chats with colleagues who use it too. With clients, senior people you don't know well, and anyone outside your team, write the words. When in doubt, mirror the other person: if they write full sentences, so do you.</p>",
    },
  ],
  apply: {
    scenario: 'Friday morning. Zanele\'s client reply.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the shorthand.',
        pairs: [
          ['LGTM', 'Looks good to me'],
          ['AFAIK', 'As far as I know'],
          ['IIRC', 'If I remember correctly'],
          ['BRB', 'Be right back'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Is shorthand okay here?',
        groups: ['Shorthand is fine', 'Write it out'],
        items: [
          { text: 'Quick chat with Zanele', group: 0 },
          { text: 'Email to a new client', group: 1 },
          { text: 'Team group chat where everyone uses it', group: 0 },
          { text: 'First message to Mr Kamau', group: 1 },
          { text: 'A supplier in another country', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The client replied "Sorry, is that a yes?" Why?',
        options: [
          { text: 'The client is slow', why: 'The message was the problem, not the reader.' },
          { text: 'Chat shorthand made a business answer unclear' },
          { text: 'Zanele forgot to attach something', why: 'The issue was the words.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Draft looks fine to me, send it when ready.',
        prompt: 'Remi wants to reply in team-chat style. Which is fine here?',
        options: [
          { text: 'Will do, ty!' },
          { text: 'Dear Brian, thank you sincerely for your kind approval of my draft.', why: 'Too formal for a quick team chat.' },
          { text: 'k', why: 'A single "k" can read as annoyed, even when it isn\'t meant that way.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'IMO = in my ... (one word)',
        answers: ['opinion'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s email to Kestrel. Which line is too casual?',
        lines: [
          'Thanks for your proposal.',
          'AFAIK the dates work, but IIRC Finance needs to check, BRB.',
          'I\'ll confirm by 5 p.m. today.',
        ],
        bug: 1,
        fix: 'As far as I know the dates work, but Finance needs to check.',
        explanation: 'A client may not know the shorthand. Write it out.',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the "mirror" rule?',
        options: [
          { text: 'Always check your face in a mirror before calls', why: 'Not bad advice, but no.' },
          { text: 'Copy exactly what the other person writes', why: 'Match their style, not their words.' },
          { text: 'Match the other person\'s style: full sentences if they write full sentences' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Churn', 'Customers who stop buying'],
          ['Scope creep', 'A project growing beyond what was agreed'],
          ['OOO', 'Out of office'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Rewrite "LGTM, BRB w/ confirmation" for a client.',
        template: 'This looks [[1]] to me. I\'ll [[2]] and come back to you by [[3]] p.m.',
        blanks: [['good'], ['confirm', 'check'], ['5', '4', '3']],
        distractors: ['k', 'np'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Write "AFAIK it\'s fine" for a client.',
        tiles: ['As', 'far', 'as', 'I', 'know,', 'it', 'works', 'for', 'us.'],
        distractors: ['AFAIK', 'np'],
      },
    ],
  },
  reflect: {
    prompt: 'Look at the last three messages you sent. Which would confuse someone outside your group? How would you rewrite one?',
    starters: ['The confusing one was...', 'Rewritten: ...'],
  },
  deepen: {
    title: 'Two keyboards',
    summary: 'Think of yourself as having two keyboards: one for friends and teammates, one for everyone else. Before you hit send, ask which keyboard this message needs.',
  },
  notes: 'LGTM (software code-review slang), WFH, IMO/IMHO, BRB, AFAIK, IIRC, np, ty, k — common internet/chat abbreviations (Merriam-Webster/Cambridge internet slang entries). Kestrel Logistics fictional.',
};

export default lesson;
