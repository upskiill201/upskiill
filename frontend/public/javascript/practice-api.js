/*
 * The practice API built into Teyro's JavaScript runner: Silver Pine Ski Hill
 * (Alder Gap, Colorado), from the JavaScript Original. fetch() calls to
 * https://api.silverpine.test go here instead of the internet (runner.js),
 * so lessons work offline and every learner gets the same answers.
 * `.test` is a name reserved for testing: it never reaches a real server.
 *
 * Lessons and their checks depend on these exact values. Never change them;
 * add new routes instead.
 *
 * Sets window.__teyroPracticeApi(method, path, searchParams, body) → { status, body, delay? }.
 */
(function () {
  'use strict';

  var LIFTS = [
    { id: 'old-blue', name: 'Old Blue', type: 'chair', status: 'open', waitMinutes: 12 },
    { id: 'ridge-tbar', name: 'Ridge T-Bar', type: 'surface', status: 'hold', waitMinutes: 0 },
    { id: 'bunny-carpet', name: 'Bunny Carpet', type: 'carpet', status: 'open', waitMinutes: 3 },
  ];

  // 14 trails: 4 green (3 open), 6 blue (5 open), 4 black (2 open). 10 open in all.
  var TRAILS = [
    { id: 'schoolhouse', name: 'Schoolhouse', level: 'green', open: true, groomed: true },
    { id: 'lazy-elk', name: 'Lazy Elk', level: 'green', open: true, groomed: true },
    { id: 'bunny-hollow', name: 'Bunny Hollow', level: 'green', open: true, groomed: true },
    { id: 'old-mill', name: 'Old Mill', level: 'green', open: false, groomed: false },
    { id: 'bluebird', name: 'Bluebird', level: 'blue', open: true, groomed: true },
    { id: 'mags-run', name: "Mags's Run", level: 'blue', open: true, groomed: true },
    { id: 'big-sky', name: 'Big Sky', level: 'blue', open: true, groomed: false },
    { id: 'aspen-alley', name: 'Aspen Alley', level: 'blue', open: true, groomed: false },
    { id: 'lone-pine', name: 'Lone Pine', level: 'blue', open: true, groomed: true },
    { id: 'silver-streak', name: 'Silver Streak', level: 'blue', open: false, groomed: false },
    { id: 'rattlesnake', name: 'Rattlesnake', level: 'black', open: true, groomed: false },
    { id: 'ridgeline', name: 'Ridgeline', level: 'black', open: true, groomed: false },
    { id: 'hermit-glade', name: 'Hermit Glade', level: 'black', open: false, groomed: false },
    { id: 'the-chute', name: 'The Chute', level: 'black', open: false, groomed: false },
  ];

  var SNOW = { baseInches: 41, newInches: 7, tempF: 18, conditions: 'Powder', updated: '2027-03-13T07:30' };

  // The Colorado Junior Freeride Championship, Saturday 13 March 2027. Scores out of 100.
  var RIDERS = [
    { bib: 1, name: 'Ava Brooks', hometown: 'Denver', division: 'U16', score: 86.5 },
    { bib: 2, name: 'Mateo Rossi', hometown: 'Boulder', division: 'U16', score: 91 },
    { bib: 3, name: 'Lily Chen', hometown: 'Aspen', division: 'U14', score: 78.5 },
    { bib: 4, name: 'Noah Kim', hometown: 'Vail', division: 'U18', score: 88 },
    { bib: 5, name: 'Isla Moreno', hometown: 'Durango', division: 'U18', score: 93.5 },
    { bib: 6, name: "Finn O'Brien", hometown: 'Breckenridge', division: 'U14', score: 82 },
    { bib: 7, name: 'Zara Patel', hometown: 'Telluride', division: 'U16', score: 89.5 },
    { bib: 8, name: 'Eli Novak', hometown: 'Steamboat Springs', division: 'U18', score: 79 },
    { bib: 9, name: 'Maya Johansson', hometown: 'Salida', division: 'U14', score: 85.5 },
    { bib: 10, name: 'Kenji Watanabe', hometown: 'Crested Butte', division: 'U18', score: 90.5 },
    { bib: 11, name: 'Ruby Castillo', hometown: 'Alder Gap', division: 'U14', score: 87 },
    { bib: 12, name: 'Owen Hart', hometown: 'Gunnison', division: 'U16', score: 76.5 },
    { bib: 13, name: 'Wes Ellery', hometown: 'Alder Gap', division: 'U16', score: 84 },
  ];

  // A saved answer from Open-Meteo (open-meteo.com), shaped exactly like the real one
  // for Alder Gap with temperature_unit=fahrenheit, wind_speed_unit=mph, precipitation_unit=inch.
  var FORECAST = {
    latitude: 39.5,
    longitude: -106.04,
    timezone: 'America/Denver',
    current_units: { time: 'iso8601', temperature_2m: '°F', snowfall: 'inch', wind_speed_10m: 'mp/h' },
    current: { time: '2027-03-13T07:00', temperature_2m: 19.4, snowfall: 0.3, wind_speed_10m: 8.2 },
    daily_units: { time: 'iso8601', temperature_2m_max: '°F', snowfall_sum: 'inch' },
    daily: {
      time: ['2027-03-13', '2027-03-14', '2027-03-15', '2027-03-16', '2027-03-17'],
      temperature_2m_max: [27.1, 31.6, 35.2, 29.8, 24.3],
      snowfall_sum: [2.1, 0, 0, 4.7, 8.9],
    },
  };

  function copy(v) {
    return JSON.parse(JSON.stringify(v));
  }
  function withoutScore(r) {
    return { bib: r.bib, name: r.name, hometown: r.hometown, division: r.division };
  }
  function ok(body, delay) {
    return { status: 200, body: copy(body), delay: delay };
  }
  function fail(status, message) {
    return { status: status, body: { error: message } };
  }

  var liveCalls = 0;

  function answer(method, path, q, rawBody) {
    path = path.replace(/\/+$/, '') || '/';
    if (method === 'POST' && path === '/checkins') {
      var body = null;
      try {
        body = typeof rawBody === 'string' ? JSON.parse(rawBody) : null;
      } catch (e) {
        return fail(400, 'The body must be JSON, like JSON.stringify({ bib: 7 })');
      }
      if (!body || body.bib === undefined) return fail(400, 'bib is required');
      var rider = RIDERS.filter(function (r) {
        return r.bib === Number(body.bib);
      })[0];
      if (!rider) return fail(404, 'No rider with bib ' + body.bib);
      return { status: 201, body: { bib: rider.bib, name: rider.name, checkedIn: true, time: '08:15' } };
    }
    if (method !== 'GET') return fail(400, method + ' is not allowed on ' + path);

    if (path === '/lifts') return ok(LIFTS);
    if (path === '/snow') return ok(SNOW);
    if (path === '/forecast') return ok(FORECAST);
    if (path === '/trails') {
      var list = TRAILS.filter(function (t) {
        if (q.get('level') && t.level !== q.get('level')) return false;
        if (q.get('open') && String(t.open) !== q.get('open')) return false;
        return true;
      });
      return ok(list);
    }
    var trail = /^\/trails\/([\w-]+)$/.exec(path);
    if (trail) {
      var t = TRAILS.filter(function (x) {
        return x.id === trail[1];
      })[0];
      return t ? ok(t) : fail(404, 'No trail called ' + trail[1]);
    }
    if (path === '/riders') {
      var riders = RIDERS.filter(function (r) {
        return !q.get('division') || r.division === q.get('division');
      });
      return ok(riders.map(withoutScore));
    }
    var one = /^\/riders\/(\d+)$/.exec(path);
    if (one) {
      var found = RIDERS.filter(function (r) {
        return r.bib === Number(one[1]);
      })[0];
      return found ? ok(withoutScore(found)) : fail(404, 'No rider with bib ' + one[1]);
    }
    if (path === '/results') {
      return ok(
        RIDERS.filter(function (r) {
          return !q.get('division') || r.division === q.get('division');
        }),
      );
    }
    // Live results: each call, two more riders have finished their run.
    if (path === '/results/live') {
      liveCalls += 1;
      var finished = Math.min(RIDERS.length, 5 + 2 * liveCalls);
      return ok(
        RIDERS.map(function (r, i) {
          var row = copy(r);
          if (i >= finished) row.score = null;
          return row;
        }),
      );
    }
    if (path === '/broken') return fail(500, 'The results server fell over. Try again in a minute.');
    if (path === '/slow') return ok({ message: 'Sorry for the wait!' }, 2000);
    return fail(404, 'Nothing at ' + path + '. Try /lifts, /trails, /snow, /riders or /results.');
  }

  window.__teyroPracticeApi = answer;
})();
