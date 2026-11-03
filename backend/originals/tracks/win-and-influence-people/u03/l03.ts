import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3 (Pressure) — Rule 7 under attack: let the complainer talk themselves out. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: `Let the Complainer Talk`,
  summary: `The angriest customer a phone company ever had cursed, sued, and wrote to the papers. The company sent one man to see him. He said almost nothing for three hours, and came back with the case closed.`,
  minutes: 12,
  outcomes: [
    `Stay quiet and listen while someone is angry with you`,
    `Let a complainer talk themselves out before you respond`,
    `Understand that people in trouble often want a listener, not advice`,
  ],
  learn: [
    {
      kind: `story`,
      title: `The stormiest customer`,
      beats: [
        { speaker: `narrator`, text: `A New York telephone company had a customer who cursed at its staff, threatened to tear his phone out of the wall, refused to pay charges he said were false, wrote to the newspapers, filed complaint after complaint and started several lawsuits.` },
        { speaker: `narrator`, text: `The company sent one of its most skilful troubleshooters to see him. The man raved for nearly three hours. The troubleshooter listened, said "yes", and sympathised with his grievances. Then he went back and listened some more.` },
        { speaker: `narrator`, text: `He visited four times. By the fourth visit, he'd become a founding member of an association the customer was starting, a society to protect phone users from the company. He was its only other member.` },
      ],
      choice: {
        prompt: `What happened on that fourth visit?`,
        options: [
          { text: `The customer sued again`, outcome: `Not this time.` },
          { text: `The customer paid every bill in full and withdrew all his complaints`, outcome: `That's it. The real issue wasn't even mentioned until the fourth visit. Then the case closed completely.`, best: true },
          { text: `The troubleshooter finally told him he was wrong`, outcome: `He never did. That's exactly why it worked.` },
        ],
      },
    },
    {
      kind: `reading`,
      title: `What he really wanted`,
      html:
        `<p>That customer saw himself as a crusader defending the public. What he really wanted was a feeling of importance. He got it by complaining. The moment a company man gave it to him by listening, his grievances vanished into thin air.</p>` +
        `<p>The owner of a big woollens firm told a similar story. An angry customer who owed a small sum, and swore he didn't, travelled all the way to Chicago to say he'd never buy another thing from them. The owner was tempted to interrupt. He didn't. He let the man talk himself out.</p>` +
        `<p>Then he thanked him for coming: if his credit department had annoyed this customer, it might annoy others, and he was far keener to hear it than the man was to tell it. He cancelled the charge, took him to lunch, and even recommended other suppliers. The man placed his biggest order ever, later found the missing bill and paid it, and named his newborn son after the firm.</p>` +
        `<p>Even Lincoln, in the darkest days of the war, once called an old friend all the way to Washington, talked at him for hours about whether to free the slaves, then sent him home without asking his opinion. Lincoln didn't want advice. He wanted a friendly listener. So do most people in trouble: the upset customer, the unhappy employee, the hurt friend.</p>`,
    },
    {
      kind: `callout`,
      tone: `remember`,
      text: `When someone is angry, let them pour it all out. Don't interrupt, don't defend, don't argue. Most of the heat goes out with the words.`,
    },
  ],
  apply: {
    scenario: `Rule 7, under attack.`,
    items: [
      {
        kind: `mcq`,
        prompt: `How long did the troubleshooter listen on his first visit?`,
        options: [
          { text: `About ten minutes`, why: `Much longer.` },
          { text: `Nearly three hours` },
          { text: `He didn't; he explained the bill`, why: `He listened, and kept listening.` },
        ],
        answer: 1,
      },
      {
        kind: `mcq`,
        prompt: `What did the furious phone customer really want?`,
        options: [
          { text: `A refund`, why: `He ended up paying every bill.` },
          { text: `A feeling of importance` },
          { text: `A new phone`, why: `It was never about the phone.` },
        ],
        answer: 1,
      },
      {
        kind: `sortGroups`,
        prompt: `Someone is shouting at you about a mistake. Calm it or inflame it?`,
        groups: [`Calms it`, `Inflames it`],
        items: [
          { text: `Letting them finish every point`, group: 0 },
          { text: `"Actually, if you'd read the terms..."`, group: 1 },
          { text: `"I'd feel the same in your shoes."`, group: 0 },
          { text: `"Calm down."`, group: 1 },
        ],
      },
      {
        kind: `fillBlank`,
        prompt: `What the woollens owner told the angry customer.`,
        template: `If our credit department annoyed you, it may [[1]] other good customers. I'm more eager to [[2]] this than you are to tell it.`,
        blanks: [[`annoy`], [`hear`]],
        distractors: [`help`, `deny`],
      },
      {
        kind: `typeAnswer`,
        prompt: `The angry woollens customer later named his son after the ________. (one word)`,
        answers: [`firm`, `company`, `business`],
        placeholder: `One word`,
      },
      {
        kind: `findBug`,
        prompt: `Replying to an angry review. Which line restarts the fight?`,
        lines: [
          `Thank you for taking the time to tell us.`,
          `To be fair, most customers don't have this problem, so...`,
          `I'd really like to hear exactly what happened.`,
        ],
        bug: 1,
        fix: `I'm sorry this was your experience.`,
        explanation: `It tells them they're the problem. The woollens owner thanked, listened and took their side.`,
      },
      {
        kind: `orderLines`,
        prompt: `Handling a furious person, in order.`,
        lines: [`Let them talk themselves out`, `Sympathise with how they feel`, `Thank them for telling you`, `Only then talk about the fix`],
      },
      {
        kind: `matchPairs`,
        prompt: `Match each story to what the listener did.`,
        pairs: [
          [`The phone troubleshooter`, `Listened for three hours, four visits`],
          [`The woollens owner`, `Let the customer talk himself out`],
          [`Lincoln's old friend`, `Listened and was never asked his view`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 1): which rule did the woollens owner also follow by not arguing about the bill?`,
        options: [
          { text: `Don't criticise, condemn or complain` },
          { text: `Smile`, why: `Maybe, but the bigger rule was not criticising.` },
          { text: `Remember names`, why: `Not the point here.` },
        ],
        answer: 0,
      },
      {
        kind: `mcq`,
        prompt: `A friend calls in tears about a breakup. You can see exactly what they did wrong. What does this lesson say to do?`,
        options: [
          { text: `Gently point out their part in it so they learn`, why: `Right now they need a listener, not a lesson.` },
          { text: `Listen, let them pour it out, and hold your advice unless they ask` },
          { text: `Change the subject to cheer them up`, why: `That shuts down what they need to say.` },
        ],
        answer: 1,
        explanation: `Like Lincoln with his old friend: people in trouble usually want to be heard, not advised.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: the next time someone complains to you, let them finish completely before you say a single word in your defence. What happened to their tone by the end?`,
    starters: [`Someone complained about...`, `I let them finish, and...`],
  },
  deepen: {
    title: `The recipe for being avoided`,
    summary: `Carnegie gave a recipe for making people avoid you: never listen for long, talk endlessly about yourself, and interrupt in the middle of their sentence. Check yourself against it this week. Be honest.`,
  },
  notes: `Source: Carnegie, Part Two ch. 4: the New York Telephone troubleshooter (three hours, four visits, Telephone Subscribers' Protective Association), Julian F. Detmer and the woollens customer (son named Detmer), Lincoln and his Springfield neighbour, the recipe for being shunned. Retold in our own words.`,
};

export default lesson;
