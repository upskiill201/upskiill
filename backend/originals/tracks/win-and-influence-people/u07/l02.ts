import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 7 · Lesson 2 (Practice) — Rule 19 in practice: honour, fairness and care. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: `Appeal to the Best in Them`,
  summary: `Six customers refused to pay their repair bills. The credit team told them they were wrong and got nowhere. Then one man visited each of them and said: you decide what's fair. Five of the six paid more than they had to.`,
  minutes: 11,
  outcomes: [
    `Phrase requests around fairness, honour and care`,
    `Let people decide what's fair`,
    `Use the nobler motive in a real dispute`,
  ],
  learn: [
    {
      kind: `steps`,
      title: `How James Thomas collected six "uncollectible" bills`,
      steps: [
        { title: `Visit to listen, not to collect`, body: `Six car owners each disputed one charge on their service bill. The credit team had told them bluntly the company was right, they were wrong, and the company knew more about cars than they did. Result: arguments. Thomas visited each one and said he'd come to find out what the company had done, or failed to do.` },
        { title: `No opinion until he'd heard them`, body: `He made it clear he had no view until he'd heard their story, and that the company didn't claim to be perfect.` },
        { title: `Make them the expert`, body: `He said he was only interested in their car, and they knew more about their car than anyone.` },
        { title: `Let them talk`, body: `He listened with all the interest and sympathy they wanted.` },
        { title: `Appeal to their fairness`, body: `Then he said: you've been badly treated, and I apologise. Listening to you, I've been impressed by your fairness. So here's your bill. Adjust it as you would if you were president of my company. Whatever you say goes.` },
      ],
    },
    {
      kind: `reading`,
      title: `The result`,
      html:
        `<p>The bills ranged from $150 to $400. One customer refused to pay a penny of the disputed charge. The other five all gave the company the best of it. And within two years, the company sold new cars to all six.</p>` +
        `<p>Thomas said: when you know nothing about a customer, the only sound basis is to assume they're sincere, honest and willing to pay once they're convinced the charges are right. People are honest and want to pay what they owe. The exceptions are few, and even people inclined to cheat usually respond well when you make them feel you see them as honest and fair.</p>` +
        `<p>Other examples: when Lord Northcliffe didn't want a newspaper to keep printing a photo of him, he didn't say "I don't like it." He wrote: "Please don't publish that picture. My mother doesn't like it." When John D. Rockefeller Jr. wanted photographers to stop snapping his children, he said: "You know how it is, boys. Some of you have children yourselves. It's not good for youngsters to get too much publicity."</p>`,
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `Try: "I'll leave it to you. Whatever you think is fair." Most people will be fairer than you'd dare ask.`,
    },
  ],
  apply: {
    scenario: `Rule 19 in practice.`,
    items: [
      {
        kind: `mcq`,
        prompt: `What did the credit team do wrong with the six customers?`,
        options: [
          { text: `They told them bluntly the company was right and they were wrong` },
          { text: `They were too polite`, why: `Quite the opposite.` },
          { text: `They waited too long`, why: `The problem was their approach.` },
        ],
        answer: 0,
      },
      {
        kind: `orderLines`,
        prompt: `Thomas's method, in order.`,
        lines: [`Say you've come to find out what went wrong`, `Hold back your opinion`, `Make them the expert on their car`, `Listen with sympathy`, `Let them set the fair amount`],
      },
      {
        kind: `mcq`,
        prompt: `How many of the six paid in full or more?`,
        options: [
          { text: `Five` },
          { text: `All six`, why: `One refused to pay the disputed charge.` },
          { text: `Two`, why: `Five of the six.` },
        ],
        answer: 0,
      },
      {
        kind: `fillBlank`,
        prompt: `Northcliffe's request.`,
        template: `Please don't publish that picture of me. My [[1]] doesn't [[2]] it.`,
        blanks: [[`mother`], [`like`]],
        distractors: [`lawyer`, `need`],
      },
      {
        kind: `sortGroups`,
        prompt: `Which nobler motive does each appeal use?`,
        groups: [`Fairness`, `Care for others`],
        items: [
          { text: `"Adjust the bill as you think is fair."`, group: 0 },
          { text: `"Some of you have children yourselves."`, group: 1 },
          { text: `"My mother doesn't like that photo."`, group: 1 },
          { text: `"I trust you to do the right thing."`, group: 0 },
        ],
      },
      {
        kind: `typeAnswer`,
        prompt: `Within two years, the company sold new cars to how many of the six customers? (a number)`,
        answers: [`6`, `six`],
        placeholder: `A number`,
      },
      {
        kind: `findBug`,
        prompt: `Settling a disputed invoice with a client. Which line ruins the nobler appeal?`,
        lines: [
          `I'm sorry this has been frustrating.`,
          `You know your project better than anyone, so tell me what's fair.`,
          `But don't try to lowball me, I know how this works.`,
        ],
        bug: 2,
        fix: `Whatever you decide, I'll accept.`,
        explanation: `Suspicion cancels the trust. Thomas assumed honesty, and got it five times out of six.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to their appeal.`,
        pairs: [
          [`James Thomas`, `"Whatever you say goes"`],
          [`Lord Northcliffe`, `"My mother doesn't like it"`],
          [`Rockefeller Jr.`, `"Some of you have children yourselves"`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 5): what did Rockefeller Jr. say to the striking miners?`,
        options: [
          { text: `"We meet not as strangers, but as friends."` },
          { text: `"You're breaking the law."`, why: `He was friendly, not legal.` },
          { text: `"Go back to work."`, why: `They chose to, after his friendly speech.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `A photographer keeps posting pictures of your small business's staff without asking. Which request uses a nobler motive?`,
        options: [
          { text: `"Stop or I'll report you."`, why: `A threat. Expect a fight.` },
          { text: `"Some of my staff are private people and it worries them. I'm sure you'd want them comfortable."` },
          { text: `"I don't like it."`, why: `That's your want. Appeal to theirs.` },
        ],
        answer: 1,
        explanation: `Like Rockefeller with the photographers: appeal to their decency, not your preference.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: in your next disagreement about money or fairness, try "I'll leave it to you to decide what's fair." What did they decide?`,
    starters: [`The disagreement was about...`, `I said...`, `They decided...`],
  },
  deepen: {
    title: `Assume honesty`,
    summary: `Thomas assumed every customer was honest until proven otherwise. For one week, assume the best motive in every person who annoys you. Notice how often you're right.`,
  },
  notes: `Source: Carnegie, Part Three ch. 10: Lord Northcliffe ("my mother doesn't like it"), John D. Rockefeller Jr. and the photographers, Cyrus Curtis and Louisa May Alcott's charity (omitted here), James L. Thomas and the six disputed service bills ($150–$400, five paid, new cars to all six within two years, his rule of assuming honesty). Retold in our own words.`,
};

export default lesson;
