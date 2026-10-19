import type { OriginalTrackDef } from './originals-authoring.types';

/**
 * Pins the behaviour of the practice coding agent (frontend/public/python/teyro_agent.py)
 * and its Delivery Board project, which Working with AI Coding Agents' lessons
 * check exact output against. If this fails after a change to the agent,
 * re-check those lessons too. npm run originals runs it with the real Pyodide
 * checker, like teyro-ai-selftest.ts, and blocks --write if it fails.
 */
const GOOD =
  'Write is_at_risk in board/rules.py. At risk: placed on Friday from 2 p.m., or on Saturday, or a route over 150 km. ' +
  'Dates look like 2026-03-06 15:00. Only change board/rules.py. Done when all tests pass.';

const SETUP =
  'from teyro_agent import *\n' +
  `GOOD = ${JSON.stringify(GOOD)}\n` +
  'def go(brief, mode="run"):\n    p = Project()\n    c = PracticeAgent(mode=mode).run(brief, p)\n    return p, c\n';

export const AGENT_CHECKS: [string, string][] = [
  ['the start project has 9 files and 4 of 7 tests pass', '(lambda p: (len(p.ls()), repr(run_tests(p)).startswith("4 passed, 3 failed")))(Project()) == (9, True)'],
  ['a vague brief builds a weather dashboard', '(lambda pc: pc[1].files_touched == ["board/dashboard.py"] and "weather" in pc[1].message)(go("make the delivery thing"))'],
  ['a good brief passes all 7 tests and touches only rules.py', '(lambda pc: (repr(run_tests(pc[0])), pc[1].files_touched, pc[1].message))(go(GOOD)) == ("7 passed", ["board/rules.py"], "Done. All 7 tests pass.")'],
  ['no "done when": claims the tests pass without running them', '(lambda pc: (pc[1].ran_tests, pc[1].message.endswith("All tests pass."), run_tests(pc[0]).ok))(go("Write is_at_risk in board/rules.py: flag deliveries that will be late.")) == (False, True, False)'],
  ['no example date: guesses the wrong format', '"%d/%m/%Y %H:%M" in go("Write is_at_risk. Only change board/rules.py.")[0].read("board/rules.py")'],
  ['no limits: renames the report function', '"count_by_city" in go("Write is_at_risk for late deliveries.")[0].read("board/report.py")'],
  ['failing tests and no protection: weakens the tests', '(lambda pc: ("assert True  # simplified" in pc[0].read("tests/test_rules.py"), pc[1].message))(go("Write is_at_risk so it flags late deliveries. Done when all tests pass.")) == (True, "Done. All 7 tests pass.")'],
  ['protected tests: reports failures honestly', '(lambda pc: pc[1].message.startswith("0 of 7 tests pass") and "tests/test_rules.py" not in pc[1].files_touched)(go("Write is_at_risk. Friday from 2 p.m., Saturday, over 150 km. Don\'t change the tests. Done when all tests pass."))'],
  ['plan only: no files change', '(lambda pc: (pc[1].files_touched, pc[1].message))(go("Write is_at_risk. Plan first, don\'t write code yet.")) == ([], "Here is my plan. Say go and I will start.")'],
  ['asks one question per missing piece', 'len(go("Write is_at_risk. Ask me any questions first.")[1].questions) == 6'],
  ['holidays: imports a module that does not exist', '"ModuleNotFoundError" in " ".join(run_tests(go(GOOD.replace("or a route over 150 km", "a route over 150 km, or a public holiday"))[0]).failed.values())'],
  ['suggest mode changes nothing', '(lambda pc: (pc[1].files_touched, repr(run_tests(pc[0])).startswith("4 passed")))(go(GOOD, "suggest")) == (["board/rules.py"], True)'],
  ['checkpoint and restore', '(lambda p: (p.checkpoint(), p.write("board/rules.py", "x = 1\\n"), p.restore(), p.read("board/rules.py").startswith(\'"""Rules\'))[3])(Project())'],
  ['token estimate of a good run', 'go(GOOD)[1].tokens == 4500'],
];

/** A one-lesson pretend Track whose checks are the practice agent's expected behaviour. */
export function agentSelfTestTrack(): OriginalTrackDef {
  const items = AGENT_CHECKS.map(([message, expr]) => ({
    kind: 'writeCode' as const,
    prompt: message,
    solution: SETUP + 'print("ok")\n',
    starter: '',
    checks: [{ message, expr }],
  }));
  return {
    slug: 'teyro-agent-test',
    title: 'Agent test',
    category: 'Coding',
    description: 'test',
    levels: [
      {
        level: 1,
        slug: 'teyro-agent-test',
        title: 'Agent test',
        upcomingUnits: 0,
        units: [
          {
            key: 'u01',
            title: 'Agent',
            lessons: [{ key: 'l01', title: 'Agent', summary: '', minutes: 10, outcomes: [], learn: [], apply: { scenario: '', items } }],
          },
        ],
      },
    ],
  } as unknown as OriginalTrackDef;
}
