# Teyro's practice coding agent, for Working with AI Coding Agents.
#
# Loaded by frontend/public/python/runner.worker.js (the learner's browser)
# and backend/src/originals/originals-code-verify.ts (the course checker),
# which write it into Python's file system so lessons can say:
#
#     from teyro_agent import Project, PracticeAgent, run_tests
#
# Nothing here calls a real AI model: no network, no API keys, no cost. The
# practice agent is small, rule-based and fully deterministic. It reads the
# brief it is given and reacts to what the brief contains, making the classic
# agent mistakes on cue, so learners SEE why a good brief matters:
#   - no task it recognises    -> builds something else (a weather dashboard)
#   - no example date          -> guesses the wrong date format
#   - no exact rule            -> guesses the rule (all of Friday, 100 km)
#   - no limits on files       -> "tidies" a file nobody mentioned
#   - no "done when tests pass"-> says "All tests pass" without running them
#   - tests fail, not protected-> weakens the tests until they pass
#   - mentions holidays        -> imports a module that doesn't exist
#
# Lessons check exact output: never change a rule, a file or a message
# without re-running `npm run originals` on Working with AI Coding Agents.

import difflib as _difflib
import importlib as _importlib
import os as _os
import re as _re
import shutil as _shutil
import sys as _sys

_sys.dont_write_bytecode = True

__all__ = ['Project', 'PracticeAgent', 'Change', 'TestReport', 'run_tests', 'read_brief']

# ── The Delivery Board project ───────────────────────────────────────────────

_START = {
    'README.md': (
        '# Delivery Board\n'
        '\n'
        'Flags Synergix deliveries that are at risk of arriving late, for the\n'
        'morning check. Owner: Remi. Reviewer: Felix.\n'
        '\n'
        '- board/rules.py: the at-risk rule (not written yet)\n'
        '- board/report.py: Zanele\'s weekly report (ask Zanele before changing it)\n'
        '- board/data.py: loads the deliveries\n'
        '- tests/: run them with run_tests(project)\n'
    ),
    'board/__init__.py': '',
    'board/data.py': (
        '"""Loads deliveries from a CSV file in the project."""\n'
        'import csv\n'
        'import os\n'
        '\n'
        'ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))\n'
        '\n'
        '\n'
        'def load_deliveries(name="data/sample.csv"):\n'
        '    with open(os.path.join(ROOT, name)) as f:\n'
        '        return list(csv.DictReader(f))\n'
    ),
    'board/rules.py': (
        '"""Rules for the Delivery Board. Nothing here yet: this is Remi\'s job."""\n'
        '\n'
        '\n'
        'def is_at_risk(delivery):\n'
        '    """True if this delivery is likely to arrive late. Not written yet."""\n'
        '    return False\n'
    ),
    'board/report.py': (
        '"""Zanele\'s weekly report. Owner: Zanele. Ask her before changing anything here."""\n'
        '\n'
        '\n'
        'def deliveries_by_city(rows):\n'
        '    counts = {}\n'
        '    for row in rows:\n'
        '        counts[row["city"]] = counts.get(row["city"], 0) + 1\n'
        '    return counts\n'
    ),
    'data/sample.csv': (
        'order_id,placed_at,city,distance_km,driver\n'
        'D-1001,2026-03-02 09:15,Nairobi,12,Amina\n'
        'D-1002,2026-03-02 16:40,Nakuru,160,Baraka\n'
        'D-1003,2026-03-03 11:05,Nairobi,8,Otieno\n'
        'D-1004,2026-03-04 10:30,Mombasa,480,Baraka\n'
        'D-1005,2026-03-04 14:20,Thika,45,Amina\n'
        'D-1006,2026-03-05 08:50,Nairobi,15,Wanjiru\n'
        'D-1007,2026-03-06 11:10,Kisumu,140,Otieno\n'
        'D-1008,2026-03-06 14:00,Nairobi,10,Wanjiru\n'
        'D-1009,2026-03-06 17:45,Nakuru,155,Baraka\n'
        'D-1010,2026-03-07 10:00,Nairobi,9,Amina\n'
        'D-1011,2026-03-07 15:30,Thika,40,Otieno\n'
        'D-1012,2026-03-09 09:00,Nairobi,11,Wanjiru\n'
    ),
    'tests/__init__.py': '',
    'tests/test_rules.py': (
        'from board.rules import is_at_risk\n'
        '\n'
        '\n'
        'def test_friday_afternoon_is_at_risk():\n'
        '    assert is_at_risk({"placed_at": "2026-03-06 15:00", "distance_km": "20"})\n'
        '\n'
        '\n'
        'def test_friday_morning_is_fine():\n'
        '    assert not is_at_risk({"placed_at": "2026-03-06 11:00", "distance_km": "20"})\n'
        '\n'
        '\n'
        'def test_saturday_is_at_risk():\n'
        '    assert is_at_risk({"placed_at": "2026-03-07 10:00", "distance_km": "20"})\n'
        '\n'
        '\n'
        'def test_monday_is_fine():\n'
        '    assert not is_at_risk({"placed_at": "2026-03-02 09:00", "distance_km": "20"})\n'
        '\n'
        '\n'
        'def test_long_route_is_at_risk():\n'
        '    assert is_at_risk({"placed_at": "2026-03-04 10:00", "distance_km": "180"})\n'
        '\n'
        '\n'
        'def test_medium_route_is_fine():\n'
        '    assert not is_at_risk({"placed_at": "2026-03-04 10:00", "distance_km": "120"})\n'
    ),
    'tests/test_report.py': (
        'from board.report import deliveries_by_city\n'
        '\n'
        '\n'
        'def test_counts_by_city():\n'
        '    rows = [{"city": "Nairobi"}, {"city": "Mombasa"}, {"city": "Nairobi"}]\n'
        '    assert deliveries_by_city(rows) == {"Nairobi": 2, "Mombasa": 1}\n'
    ),
}

_STAGES = {'start': _START}
_counter = [0]


class Project:
    """The Delivery Board: a tiny Python project, written to its own folder so
    its code really runs. Project() is always a fresh copy of the start."""

    def __init__(self, stage='start'):
        if stage not in _STAGES:
            raise ValueError(f'Unknown stage {stage!r}. Choose one of: {", ".join(_STAGES)}')
        _counter[0] += 1
        self.root = _os.path.join(_os.getcwd(), '.teyro_projects', f'board{_counter[0]}')
        if _os.path.exists(self.root):
            _shutil.rmtree(self.root)
        self.files = {}
        self._saved = {}
        for path, text in _STAGES[stage].items():
            self.write(path, text)

    def __repr__(self):
        return f'<Delivery Board project: {len(self.files)} files>'

    def ls(self):
        """Every file in the project, sorted."""
        return sorted(self.files)

    def read(self, path):
        if path not in self.files:
            raise FileNotFoundError(f'No file {path!r} in the project. Try project.ls().')
        return self.files[path]

    def write(self, path, text):
        self.files[path] = text
        full = _os.path.join(self.root, path)
        _os.makedirs(_os.path.dirname(full), exist_ok=True)
        with open(full, 'w') as f:
            f.write(text)

    def delete(self, path):
        self.files.pop(path, None)
        full = _os.path.join(self.root, path)
        if _os.path.exists(full):
            _os.remove(full)

    def checkpoint(self, name='last'):
        """Save every file, so you can go back to this point."""
        self._saved[name] = dict(self.files)

    def restore(self, name='last'):
        """Put every file back as it was at the checkpoint."""
        if name not in self._saved:
            raise ValueError(f'No checkpoint called {name!r}.')
        for path in list(self.files):
            if path not in self._saved[name]:
                self.delete(path)
        for path, text in self._saved[name].items():
            self.write(path, text)

    def load(self, module):
        """Import one of the project's modules, e.g. project.load("board.rules")."""
        _activate(self)
        return _importlib.import_module(module)


def _activate(project):
    for name in list(_sys.modules):
        if name.split('.')[0] in ('board', 'tests'):
            del _sys.modules[name]
    _sys.path[:] = [p for p in _sys.path if '.teyro_projects' not in p]
    _sys.path.insert(0, project.root)
    _importlib.invalidate_caches()


# ── Tests ────────────────────────────────────────────────────────────────────

class TestReport:
    def __init__(self, passed, failed):
        self.passed = passed          # test names
        self.failed = failed          # {test name: reason}

    @property
    def total(self):
        return len(self.passed) + len(self.failed)

    @property
    def ok(self):
        return not self.failed

    def __repr__(self):
        if not self.failed:
            return f'{len(self.passed)} passed'
        return f'{len(self.passed)} passed, {len(self.failed)} failed: ' + ', '.join(self.failed)


def run_tests(project):
    """Run every test_ function in tests/test_*.py. A tiny runner, not pytest."""
    _activate(project)
    passed, failed = [], {}
    for path in project.ls():
        if not (path.startswith('tests/test_') and path.endswith('.py')):
            continue
        module_name = path[:-3].replace('/', '.')
        try:
            module = _importlib.import_module(module_name)
        except Exception as e:  # noqa: BLE001 - a broken test file counts as a failure
            failed[path] = f'{type(e).__name__}: {e}'
            continue
        for name, fn in list(vars(module).items()):
            if name.startswith('test_') and callable(fn):
                try:
                    fn()
                    passed.append(name)
                except AssertionError:
                    failed[name] = 'AssertionError'
                except Exception as e:  # noqa: BLE001
                    failed[name] = f'{type(e).__name__}: {e}'
    return TestReport(passed, failed)


# ── Reading the brief ────────────────────────────────────────────────────────

def _read_brief(brief):
    b = ' '.join(str(brief).split())
    low = b.lower()
    return {
        'task': _task(low),
        'example_date': bool(_re.search(r'\d{4}-\d{2}-\d{2} \d{1,2}:\d{2}', b)),
        'time_rule': bool(_re.search(r'2\s*p\.?\s*m|14:00|after 2\b|from 2\b', low)),
        'saturday': 'saturday' in low,
        'distance': '150' in low,
        'scope': bool(_re.search(r'only (change|edit|touch|work in)', low)
                      or _re.search(r"(don'?t|do not|never) (change|edit|touch)[^.]*report", low)),
        'protect_tests': bool(_re.search(r"(don'?t|do not|never) (change|edit|touch|modify)[^.]*test", low)),
        'done_when': bool(_re.search(r'tests?', low) and _re.search(r'\bpass|\brun\b', low)),
        'plan_only': bool(_re.search(r"plan (first|only)|just a plan|(don'?t|do not) write (any )?code", low)),
        'ask': bool(_re.search(r'ask me|questions first|any questions', low)),
        'holiday': 'holiday' in low,
        'blank_distance': bool(_re.search(r'(blank|missing|empty)[^.]*distance|distance[^.]*(blank|missing|empty)', low)),
        'explore': bool(_re.search(r"(don'?t|do not) change anything|just read|look around|explore", low)),
        'oldest_first': bool(_re.search(r'oldest first|earliest first|by placed_at|in time order', low)),
        'empty_case': bool(_re.search(r'\bnone\b|no deliveries|empty list|nothing is at risk', low)),
    }


def _task(low):
    if _re.search(r'whole (delivery )?board|the full board|entire board|everything at once|build everything', low):
        return 'whole_board'
    if _re.search(r'morning[_ ]list', low):
        return 'morning_list'
    if _re.search(r'morning[_ ]message', low):
        return 'morning_message'
    if _re.search(r'at[\s-]risk|is_at_risk|\blate\b', low):
        return 'at_risk'
    return 'unknown'


def read_brief(brief):
    """What the practice agent picked up from a brief: True for each thing it found."""
    return _read_brief(brief)


def _rules_code(f):
    fmt = '%Y-%m-%d %H:%M' if f['example_date'] else '%d/%m/%Y %H:%M'
    friday = 'placed.weekday() == 4 and placed.hour >= 14' if f['time_rule'] else 'placed.weekday() == 4'
    weekend = 'placed.weekday() == 5' if f['saturday'] else 'placed.weekday() >= 5'
    km = '150' if f['distance'] else '100'
    lines = ['"""Rules for the Delivery Board."""', 'from datetime import datetime']
    if f['holiday']:
        lines.append('from board.calendar import is_public_holiday')
    lines += [
        '',
        '',
        'def is_at_risk(delivery):',
        '    """True if this delivery is likely to arrive late."""',
        f'    placed = datetime.strptime(delivery["placed_at"], "{fmt}")',
    ]
    if f['holiday']:
        lines += ['    if is_public_holiday(placed):', '        return True']
    lines += [
        f'    if {friday}:',
        '        return True',
        f'    if {weekend}:',
        '        return True',
    ]
    if f['blank_distance']:
        lines += [
            '    distance = str(delivery.get("distance_km", "")).strip()',
            '    if not distance:',
            '        return True',
            f'    return float(distance) > {km}',
        ]
    else:
        lines.append(f'    return float(delivery["distance_km"]) > {km}')
    lines.append('')
    return '\n'.join(lines)


_DASHBOARD = (
    '"""Delivery dashboard for Nairobi, with the weather."""\n'
    '\n'
    'WEATHER = {"Mon": "Sunny", "Tue": "Rain", "Wed": "Cloudy", "Thu": "Sunny", "Fri": "Rain"}\n'
    '\n'
    '\n'
    'def dashboard(rows):\n'
    '    print("NAIROBI DELIVERY DASHBOARD")\n'
    '    for day, weather in WEATHER.items():\n'
    '        print(f"{day}: {weather}")\n'
    '    print(f"{len(rows)} deliveries")\n'
)

def _morning_code(f):
    key = 'row["placed_at"]' if f['oldest_first'] else 'row["city"]'
    note = 'oldest first' if f['oldest_first'] else 'by city'
    return (
        f'"""The morning list: deliveries at risk, {note}."""\n'
        'from board.rules import is_at_risk\n'
        '\n'
        '\n'
        'def morning_list(rows):\n'
        f'    """Order ids of deliveries at risk, {note}."""\n'
        '    flagged = [row for row in rows if is_at_risk(row)]\n'
        f'    flagged.sort(key=lambda row: {key})\n'
        '    return [row["order_id"] for row in flagged]\n'
    )


def _message_code(f):
    lines = ['"""The morning message for Brian."""', '', '', 'def morning_message(order_ids):']
    if f['empty_case']:
        lines += ['    if not order_ids:', '        return "Good morning! No deliveries at risk today."']
    lines += ['    return f"Good morning! {len(order_ids)} deliveries at risk today: {\', \'.join(order_ids)}."', '']
    return '\n'.join(lines)


_CONFIG = (
    '"""Settings for the Delivery Board."""\n'
    '\n'
    'FRIDAY_CUTOFF_HOUR = 14\n'
    'LONG_ROUTE_KM = 150\n'
    'TIMEZONE = "Africa/Nairobi"\n'
    'COLOURS = {"at_risk": "red", "fine": "green"}\n'
    'REFRESH_MINUTES = 15\n'
)

_WHAT = {
    'at_risk': 'I added is_at_risk to board/rules.py.',
    'morning_list': 'I added morning_list to board/morning.py.',
    'morning_message': 'I added morning_message to board/message.py.',
    'whole_board': 'I built the whole Delivery Board: the rule, the morning list, the morning message, a dashboard and settings.',
}

_QUESTIONS = [
    ('task', 'What should I build, exactly?'),
    ('time_rule', 'From what time on Friday is a delivery at risk?'),
    ('saturday', 'Are Saturday orders at risk too?'),
    ('distance', 'How long a route counts as at risk?'),
    ('example_date', 'What format are the dates in? An example would help.'),
    ('scope', 'Which files may I change?'),
    ('done_when', 'How will we know it is done?'),
]


# ── The practice agent ───────────────────────────────────────────────────────

class Change:
    """What the agent did: its plan, its log, the files it changed and its claim."""

    def __init__(self):
        self.plan = []
        self.log = []
        self.questions = []
        self.message = ''
        self.ran_tests = False
        self.tests = None            # the last TestReport, if it ran the tests
        self.before = {}             # path -> text before (None for a new file)
        self.after = {}              # path -> text after

    def __repr__(self):
        return self.message

    @property
    def files_touched(self):
        return sorted(self.after)

    @property
    def diff(self):
        out = []
        for path in self.files_touched:
            old = (self.before.get(path) or '').splitlines(keepends=True)
            new = self.after[path].splitlines(keepends=True)
            out += _difflib.unified_diff(old, new, f'a/{path}', f'b/{path}', n=1)
        return ''.join(line if line.endswith('\n') else line + '\n' for line in out)

    @property
    def lines_added(self):
        return sum(1 for line in self.diff.splitlines() if line.startswith('+') and not line.startswith('+++'))

    @property
    def lines_removed(self):
        return sum(1 for line in self.diff.splitlines() if line.startswith('-') and not line.startswith('---'))

    @property
    def tokens(self):
        """Practice estimate of what the session used: reading costs more than writing here."""
        reads = sum(1 for line in self.log if line.startswith('read'))
        edits = sum(1 for line in self.log if line.startswith(('edit', 'create', 'propose')))
        runs = sum(1 for line in self.log if line.startswith('run'))
        return 2000 + 600 * reads + 400 * edits + 300 * runs


class PracticeAgent:
    """A practice coding agent. mode: "suggest" (shows changes only), "edit"
    (changes files, runs nothing) or "run" (changes files and runs the tests)."""

    MODES = ('suggest', 'edit', 'run')

    def __init__(self, mode='run'):
        if mode not in self.MODES:
            raise ValueError(f'Unknown mode {mode!r}. Choose one of: {", ".join(self.MODES)}')
        self.mode = mode
        self.runs = 0
        self.session_tokens = 0      # grows with every run in the same session

    def run(self, brief, project):
        c = self._run(brief, project)
        self.runs += 1
        self.session_tokens += c.tokens
        return c

    def _run(self, brief, project):
        f = _read_brief(brief)
        c = Change()
        c.log.append('read README.md')

        if f['ask']:
            c.questions = [q for key, q in _QUESTIONS if not f[key]]
            if c.questions:
                c.message = f'Before I start, I have {len(c.questions)} question(s).'
                return c

        if f['explore']:
            return self._explore(c, project)

        if f['task'] == 'unknown':
            c.plan = ['Create board/dashboard.py', 'Add the Nairobi weather', 'Show the number of deliveries']
            if f['plan_only']:
                c.message = 'Here is my plan. Say go and I will start.'
                return c
            self._edit(c, project, 'board/dashboard.py', _DASHBOARD)
            c.message = 'Done! I built a delivery dashboard for Nairobi with the weather, so you can plan around the rain.'
            return c

        task = f['task']
        if task == 'at_risk':
            c.plan = ['Read board/rules.py and tests/test_rules.py', 'Write is_at_risk in board/rules.py']
        elif task == 'morning_list':
            c.plan = ['Read board/rules.py', 'Write morning_list in board/morning.py']
        elif task == 'morning_message':
            c.plan = ['Write morning_message in board/message.py']
        else:
            c.plan = ['Write is_at_risk in board/rules.py', 'Write morning_list in board/morning.py',
                      'Write morning_message in board/message.py', 'Add a weather dashboard in board/dashboard.py',
                      'Add settings in board/config.py']
        if not f['scope']:
            c.plan.append('Tidy up board/report.py')
        if f['done_when']:
            c.plan.append('Run the tests')
        if f['plan_only']:
            c.message = 'Here is my plan. Say go and I will start.'
            return c

        if task == 'at_risk':
            c.log += ['read board/rules.py', 'read tests/test_rules.py']
            self._edit(c, project, 'board/rules.py', _rules_code(f))
        elif task == 'morning_list':
            c.log.append('read board/rules.py')
            self._edit(c, project, 'board/morning.py', _morning_code(f))
        elif task == 'morning_message':
            self._edit(c, project, 'board/message.py', _message_code(f))
        else:
            c.log += ['read board/rules.py', 'read tests/test_rules.py']
            self._edit(c, project, 'board/rules.py', _rules_code(f))
            self._edit(c, project, 'board/morning.py', _morning_code(f))
            self._edit(c, project, 'board/message.py', _message_code(f))
            self._edit(c, project, 'board/dashboard.py', _DASHBOARD)
            self._edit(c, project, 'board/config.py', _CONFIG)
        if not f['scope']:
            c.log.append('read board/report.py')
            report = project.read('board/report.py').replace(
                'def deliveries_by_city(rows):', 'def count_by_city(rows):\n    """Count deliveries per city."""')
            self._edit(c, project, 'board/report.py', report)

        what = _WHAT[task]
        if not f['done_when']:
            c.message = f'Done! {what} All tests pass.'
            return c
        if self.mode != 'run':
            c.message = (f'{what} I am not allowed to run commands in '
                         f'{self.mode} mode, so I have not run the tests.')
            return c

        report_ = self._test(c, project)
        if report_.ok:
            c.message = f'Done. All {report_.total} tests pass.'
            return c
        if f['scope'] or f['protect_tests']:
            c.message = (f'{len(report_.passed)} of {report_.total} tests pass. These still fail: '
                         + ', '.join(report_.failed) + '. I did not change the tests.')
            return c
        self._weaken(c, project, report_)
        report_ = self._test(c, project)
        c.message = f'Done. All {report_.total} tests pass.'
        return c

    def _explore(self, c, project):
        # Read everything, change nothing, report what it found.
        c.log = ['read ' + path for path in project.ls()]
        notes = [f'I read {len(project.ls())} files and changed nothing.']
        if self.mode == 'run':
            notes.append(f'Tests: {self._test(c, project)}.')
        if 'return False' in project.files.get('board/rules.py', '') and 'Not written yet' in project.files.get('board/rules.py', ''):
            notes.append('board/rules.py: is_at_risk is not written yet; it always returns False.')
        if 'Zanele' in project.files.get('README.md', ''):
            notes.append('board/report.py belongs to Zanele; the README says to ask her before changing it.')
        c.plan = ['Read every file', 'Run the tests', 'Report what I found']
        c.message = ' '.join(notes)
        return c

    def _edit(self, c, project, path, text):
        c.before[path] = project.files.get(path)
        c.after[path] = text
        verb = 'create' if c.before[path] is None else 'edit'
        if self.mode == 'suggest':
            c.log.append(f'propose {verb} {path}')
        else:
            project.write(path, text)
            c.log.append(f'{verb} {path}')

    def _test(self, c, project):
        result = run_tests(project)
        c.ran_tests = True
        c.tests = result
        c.log.append(f'run tests: {result}')
        return result

    def _weaken(self, c, project, result):
        # The classic shortcut: make the tests agree with the code.
        if 'tests/test_report.py' in result.failed:
            text = project.read('tests/test_report.py').replace('deliveries_by_city', 'count_by_city')
            self._edit(c, project, 'tests/test_report.py', text)
        text = project.read('tests/test_rules.py')
        blocks = text.split('\n\n\n')
        for i, block in enumerate(blocks):
            name = _re.search(r'def (test_\w+)', block)
            if name and name.group(1) in result.failed:
                blocks[i] = _re.sub(r'    assert .*', '    assert True  # simplified', block)
        new = '\n\n\n'.join(blocks)
        if new != text:
            self._edit(c, project, 'tests/test_rules.py', new)
