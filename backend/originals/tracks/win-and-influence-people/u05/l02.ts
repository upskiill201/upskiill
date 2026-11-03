import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2 (Practice) — Rule 13 in daily life: warmth before the ask. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: `The Sun and the Wind`,
  summary: `Every tenant in the building had tried to get the rent cut, and every one had failed. One engineer got it reduced without even asking. He started by telling the landlord how much he liked the place.`,
  minutes: 11,
  outcomes: [
    `Open a request with honest warmth`,
    `See friendliness work in money, rent and business`,
    `Remember the fable of the sun and the wind`,
  ],
  learn: [
    {
      kind: `compare`,
      title: `The rent`,
      before: {
        label: `What the other tenants did`,
        text: `They complained about the rent. They wrote angry letters. One sent fourteen, some of them insulting. Another threatened to break his lease unless the man upstairs stopped snoring. Everyone said the landlord was impossible.`,
      },
      after: {
        label: `What O. L. Straub did`,
        text: `He wrote saying he'd move out when his lease ended, though he didn't want to. When the landlord came, Straub greeted him warmly and praised the building and how well it was run. He'd love to stay another year, he said, but couldn't afford it. The landlord, amazed, poured out his troubles with other tenants: "What a relief to have a satisfied tenant like you." Then, without being asked, he offered a lower rent.`,
      },
      notes: [
        `Straub named the figure he could afford, and the landlord accepted without a word.`,
        `As he left, the landlord asked: "What decorating can I do for you?"`,
      ],
    },
    {
      kind: `story`,
      title: `The fable`,
      beats: [
        { speaker: `narrator`, text: `As a barefoot boy in Missouri, Carnegie read a fable. The sun and the wind argued about which was stronger. "I'll prove it's me," said the wind. "See that old man in the coat? I bet I can get it off him faster than you."` },
        { speaker: `narrator`, text: `The sun went behind a cloud, and the wind blew until it was nearly a tornado. But the harder it blew, the tighter the old man clutched his coat. At last the wind gave up.` },
      ],
      choice: {
        prompt: `What did the sun do?`,
        options: [
          { text: `Blew even harder`, outcome: `That's the wind's method, and it failed.` },
          { text: `Came out and smiled warmly on the old man until he mopped his brow and took off his coat`, outcome: `That's it. The sun told the wind: gentleness and friendliness are always stronger than fury and force.`, best: true },
          { text: `Waited for night`, outcome: `No need. Warmth did it in minutes.` },
        ],
      },
    },
    {
      kind: `text`,
      html:
        `<p>Business leaders learned it too. When 2,500 workers at a truck factory went on strike, the company president didn't rage or threaten. He took out newspaper adverts praising the strikers for how peacefully they'd put down their tools. Seeing the pickets idle, he bought them baseball bats and gloves and rented a bowling alley.</p>` +
        `<p>Friendliness bred friendliness. The strikers borrowed brooms and carts and cleaned up the litter around the factory, while still on strike! The dispute was settled within a week, with no bitterness.</p>` +
        `<p>Daniel Webster, one of the greatest lawyers of his age, opened his strongest arguments with gentle phrases: "It will be for the jury to consider..." "This may be worth thinking about..." No bullying. No pressure.</p>`,
    },
    {
      kind: `callout`,
      tone: `tip`,
      text: `Before any request about money, start with one honest thing you appreciate about the other person or their work.`,
    },
  ],
  apply: {
    scenario: `Rule 13 in practice.`,
    items: [
      {
        kind: `mcq`,
        prompt: `How did Straub begin his meeting with the landlord?`,
        options: [
          { text: `By complaining about the rent`, why: `That's what every other tenant did.` },
          { text: `By praising the building and how it was run` },
          { text: `By threatening to leave`, why: `He'd mentioned leaving, but he opened with warmth.` },
        ],
        answer: 1,
      },
      {
        kind: `fillBlank`,
        prompt: `The landlord's words.`,
        template: `What a [[1]] it is to have a [[2]] tenant like you.`,
        blanks: [[`relief`], [`satisfied`]],
        distractors: [`pain`, `quiet`],
      },
      {
        kind: `typeAnswer`,
        prompt: `In the fable, who got the old man's coat off? The ________. (one word)`,
        answers: [`sun`],
        placeholder: `One word`,
      },
      {
        kind: `sortGroups`,
        prompt: `Sun or wind?`,
        groups: [`Sun`, `Wind`],
        items: [
          { text: `Praising strikers for their peaceful protest`, group: 0 },
          { text: `Fourteen angry letters to a landlord`, group: 1 },
          { text: `"It will be for the jury to consider..."`, group: 0 },
          { text: `Threatening to break a lease`, group: 1 },
        ],
      },
      {
        kind: `mcq`,
        prompt: `What did the truck company president buy the striking workers?`,
        options: [
          { text: `Lunch`, why: `He bought something to pass the time.` },
          { text: `Baseball bats and gloves` },
          { text: `Nothing; he sued them`, why: `The opposite.` },
        ],
        answer: 1,
      },
      {
        kind: `findBug`,
        prompt: `Emailing a supplier to ask for a better price. Which line is the wind?`,
        lines: [
          `We've loved working with you this year, the quality has been excellent.`,
          `Frankly, your prices are a rip-off compared with others.`,
          `Is there any way we could look at the pricing for next year's order?`,
        ],
        bug: 1,
        fix: `We'd love to keep working together.`,
        explanation: `The harder you blow, the tighter they hold their coat, or their price.`,
      },
      {
        kind: `matchPairs`,
        prompt: `Match each person to their friendly approach.`,
        pairs: [
          [`O. L. Straub`, `Praised the landlord's building`],
          [`The truck company president`, `Praised the strikers in the papers`],
          [`Daniel Webster`, `"This may be worth thinking about"`],
        ],
      },
      {
        kind: `mcq`,
        prompt: `Review (Chapter 4): what did Bruce Harvey keep repeating to his boss?`,
        options: [
          { text: `"It was my fault."` },
          { text: `"Personnel made the error."`, why: `That was his boss's attempt.` },
          { text: `"It's a small amount."`, why: `He owned it completely.` },
        ],
        answer: 0,
      },
      {
        kind: `tapBuild`,
        prompt: `Open a pay rise conversation with warmth.`,
        tiles: [`I've`, `loved`, `growing`, `here`, `this`, `year.`],
        distractors: [`Pay`, `me.`],
      },
      {
        kind: `mcq`,
        prompt: `You want your gym to waive a cancellation fee. Which opening follows the sun?`,
        options: [
          { text: `"Your fees are a scam."`, why: `The wind. They'll clutch the fee tighter.` },
          { text: `"I've really enjoyed this gym, the staff have been great. I'm moving cities and wondered if there's any flexibility on the fee?"` },
          { text: `"I'll leave a bad review if you charge me."`, why: `A threat. Fists doubled.` },
        ],
        answer: 1,
        explanation: `Honest warmth first, then the request. Like Straub with the landlord.`,
      },
    ],
  },
  reflect: {
    prompt: `Mission: begin one request today with honest praise. What did you praise, what did you ask, and what happened?`,
    starters: [`I praised...`, `Then I asked...`, `The answer was...`],
  },
  deepen: {
    title: `The fourteen letters`,
    summary: `Straub's neighbour wrote fourteen angry letters and got nowhere. Straub got a lower rent and an offer of redecorating. Next time you're tempted to send a stern message, remember the fourteen letters.`,
  },
  notes: `Source: Carnegie, Part Three ch. 4: O. L. Straub's rent (fourteen letters, the snoring complaint, "what a relief to have a satisfied tenant", decorating offer), White Motor Company strike (2,500 workers, newspaper praise, bats and gloves, bowling, strikers cleaning up, settled in a week), Daniel Webster's phrases, Aesop's sun and wind fable. Retold in our own words.`,
};

export default lesson;
