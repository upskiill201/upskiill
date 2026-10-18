# Teyro's built-in practice datasets for the Python runner.
#
# Loaded once by frontend/public/python/runner.worker.js (the learner's
# browser) and by backend/src/originals/originals-code-verify.ts (the course
# checker), so both see exactly the same files. The harness calls
# __teyro_write_datasets() before any program that mentions ".csv", which
# (re)writes the files into Python's in-memory file system.
#
# Everything is generated from a fixed seed: the same rows, every time, on
# every device. Lessons check exact numbers, so never change the seed, the
# order of random calls, or the row rules without re-checking every course
# that uses these files (today: Data Science for Beginners and Machine
# Learning for Beginners).
#
#   deliveries_clean.csv  400 Synergix deliveries, March 2026, tidy
#   deliveries.csv        the same data as it arrives: messy city names,
#                         blanks, duplicate rows, "161 km" text, a typo
#
# The story inside the data: orders placed on Friday afternoon (from 2 p.m.)
# or on Saturday wait over the weekend, so most of them arrive late. Driver
# Baraka looks like by far the worst driver, mostly because he gets the
# longest routes: compare like with like and the gap shrinks to a little.

import random as __teyro_random


def __teyro_build_deliveries():
    rng = __teyro_random.Random(2026)
    days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    depots = ['Nairobi', 'Mombasa', 'Kisumu']
    routes = {
        'Nairobi': [('Nairobi', 15), ('Thika', 45), ('Nakuru', 160), ('Eldoret', 310), ('Kisumu', 345)],
        'Mombasa': [('Mombasa', 12), ('Malindi', 120), ('Voi', 160), ('Nairobi', 485)],
        'Kisumu': [('Kisumu', 10), ('Kakamega', 52), ('Kericho', 85), ('Eldoret', 155)],
    }
    drivers = ['Wanjiru', 'Kiprop', 'Mwangi', 'Auma', 'Juma']
    customers = ['Shop', 'Pharmacy', 'Supermarket']
    rows = []
    for i in range(400):
        delivery_id = 'D' + str(1001 + i)
        week = i // 100
        day = days[rng.randrange(6)]
        date_num = 2 + week * 7 + days.index(day)
        date = '2026-03-' + str(date_num).zfill(2)
        hour = rng.randrange(8, 18)
        depot = depots[rng.choice([0, 0, 0, 1, 1, 2])]
        city, km = rng.choice(routes[depot])
        km = km + rng.randrange(0, 11)
        long_route = km > 250
        if long_route and rng.random() < 0.7:
            driver = 'Baraka'
        else:
            driver = rng.choice(drivers)
        vehicle = 'Motorbike' if km < 60 and rng.random() < 0.5 else ('Truck' if km > 250 else 'Van')
        customer = rng.choice(customers)
        promised = 1 if km < 60 else (2 if km < 250 else 3)
        actual = promised
        weekend_hold = (day == 'Fri' and hour >= 14) or day == 'Sat'
        if weekend_hold and rng.random() < 0.85:
            actual += 2
        if long_route and rng.random() < 0.45:
            actual += 1
        if rng.random() < 0.07:
            actual += 1
        late = 'yes' if actual > promised else 'no'
        rows.append([delivery_id, date, day, hour, depot, city, km, driver, vehicle, customer, promised, actual, late])
    return rows


__teyro_header = 'delivery_id,date,day,hour,depot,city,distance_km,driver,vehicle,customer,promised_days,actual_days,late'


def __teyro_csv(rows):
    lines = [__teyro_header]
    for r in rows:
        lines.append(','.join(str(v) for v in r))
    return '\n'.join(lines) + '\n'


def __teyro_make_messy(rows):
    rng = __teyro_random.Random(7)
    messy = [list(r) for r in rows]
    # Inconsistent city names: lower case, upper case, stray spaces.
    for idx in range(3, 400, 13):
        city = messy[idx][5]
        style = (idx // 13) % 3
        messy[idx][5] = city.lower() if style == 0 else (city.upper() if style == 1 else city + ' ')
    # Blanks: actual_days and late were never filled in.
    for idx in [17, 58, 121, 203, 266, 341]:
        messy[idx][11] = ''
        messy[idx][12] = ''
    # Distances typed as text.
    for idx in [9, 77, 150, 233, 318]:
        messy[idx][6] = str(messy[idx][6]) + ' km'
    # A typo: 99 days instead of 9 (well, instead of the real value).
    messy[288][11] = 99
    messy[288][12] = 'yes'
    # Duplicate rows, pasted in twice by accident.
    for idx in [25, 90, 144, 190, 251, 300, 352, 377]:
        messy.insert(rng.randrange(len(messy)), list(messy[idx]))
    return messy


# ---------------------------------------------------------------------------
# Machine Learning for Beginners: Afiya's clinic appointments (made-up data).
#
#   appointments.csv      2,400 appointments at 8 Afiya pilot clinics over
#                         12 weeks, tidy, with the label no_show (1 = missed)
#   appointments_raw.csv  the same as Emmanuel exports it: clinic spellings,
#                         blank and "12 km" distances, duplicates, a typo
#   clinic_visits.csv     300 Afiya clinics, one row each, no labels (clustering)
#
# Planted on purpose (docs/originals/machine-learning-for-beginners-outline.md):
# long waits, no SMS reminder, distance, past no-shows and rain raise the
# chance of a no-show. confirmed_on_day is filled in at the front desk AFTER
# the appointment, so it leaks the answer. Gumel, the small rural clinic, has
# few rows, far more no-shows and a different pattern (distance and rain
# matter more), so a model trained mostly on city clinics does worse there.
# clinic_visits.csv hides four kinds of clinic.

import math as __teyro_math

__teyro_clinics = ['Yaba', 'Surulere', 'Ikeja', 'Lekki', 'Ibadan North', 'Wuse', 'Kano City', 'Gumel']
__teyro_clinic_weights = [16, 15, 15, 12, 12, 12, 13, 5]
__teyro_weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
__teyro_visit_types = ['Check-up', 'Follow-up', 'Antenatal', 'Vaccination']
__teyro_age_groups = ['0-17', '18-34', '35-59', '60+']


def __teyro_build_appointments():
    rng = __teyro_random.Random(1959)
    # Rain falls on a whole day, everywhere in the pilot (a simplification).
    rain_days = {}
    for week in range(1, 13):
        for day in __teyro_weekdays:
            rain_days[(week, day)] = 1 if rng.random() < 0.3 else 0
    rows = []
    for i in range(2400):
        week = i // 200 + 1
        clinic = rng.choices(__teyro_clinics, weights=__teyro_clinic_weights)[0]
        rural = clinic == 'Gumel'
        weekday = rng.choice(__teyro_weekdays)
        hour = rng.randrange(8, 17)
        visit_type = rng.choices(__teyro_visit_types, weights=[40, 25, 20, 15])[0]
        age_group = rng.choices(__teyro_age_groups, weights=[20, 35, 30, 15])[0]
        wait_days = min(45, int(rng.expovariate(1 / 8)))
        sms = 1 if rng.random() < (0.3 if rural else 0.6) else 0
        distance = rng.randint(5, 60) if rural else rng.randint(1, 18)
        previous = rng.choices([0, 1, 2, 3, 4], weights=[60, 22, 10, 5, 3])[0]
        rain = rain_days[(week, weekday)]
        if rural:
            z = -3.0 + 0.02 * wait_days - 0.15 * sms + 0.06 * distance + 0.3 * previous + 1.0 * rain
        else:
            z = (-2.9 + 0.06 * wait_days - 0.9 * sms + 0.05 * distance + 0.55 * previous + 0.6 * rain
                 + (0.35 if age_group == '18-34' else 0) - (0.3 if visit_type == 'Antenatal' else 0)
                 + (0.25 if weekday == 'Mon' else 0))
        no_show = 1 if rng.random() < 1 / (1 + __teyro_math.exp(-z)) else 0
        # Filled in at the desk on the day: "did they confirm?" Almost the answer itself.
        confirmed = 1 - no_show
        if rng.random() < 0.03:
            confirmed = 1 - confirmed
        rows.append(['A' + str(10001 + i), clinic, week, weekday, hour, visit_type, age_group,
                     wait_days, sms, distance, previous, rain, confirmed, no_show])
    return rows


__teyro_appointments_header = ('appointment_id,clinic,week,weekday,hour,visit_type,age_group,wait_days,'
                               'sms_reminder,distance_km,previous_no_shows,rain,confirmed_on_day,no_show')


def __teyro_make_messy_appointments(rows):
    rng = __teyro_random.Random(11)
    messy = [list(r) for r in rows]
    # Clinic names typed by hand: lower case, upper case, stray spaces.
    for idx in range(5, 2400, 97):
        clinic = messy[idx][1]
        style = (idx // 97) % 3
        messy[idx][1] = clinic.lower() if style == 0 else (clinic.upper() if style == 1 else clinic + ' ')
    # Distances never filled in.
    for idx in [33, 210, 455, 731, 990, 1204, 1530, 1777, 2042, 2301]:
        messy[idx][9] = ''
    # Distances typed as text.
    for idx in [61, 388, 902, 1415, 1888, 2250]:
        messy[idx][9] = str(messy[idx][9]) + ' km'
    # A typo: 400 days of waiting.
    messy[1666][7] = 400
    # Duplicate rows, exported twice.
    for idx in [14, 260, 517, 802, 1033, 1290, 1468, 1702, 1951, 2117, 2288, 2390]:
        messy.insert(rng.randrange(len(messy)), list(messy[idx]))
    return messy


def __teyro_build_clinic_visits():
    rng = __teyro_random.Random(300)
    # Four kinds of clinic, never written in the file: busy city, quiet city,
    # rural and far, and new clinics that remind everyone.
    kinds = [
        # patients/week, wait days, sms rate, distance km, no-show rate
        (180, 16, 0.55, 6, 0.22),
        (70, 5, 0.65, 5, 0.12),
        (45, 9, 0.25, 32, 0.30),
        (30, 3, 0.90, 8, 0.08),
    ]
    rows = []
    for i in range(300):
        patients, wait, sms, km, rate = kinds[rng.choices([0, 1, 2, 3], weights=[30, 30, 25, 15])[0]]
        rows.append([
            'C' + str(i + 1).zfill(3),
            max(10, int(rng.gauss(patients, patients * 0.15))),
            round(max(1.0, rng.gauss(wait, wait * 0.2)), 1),
            round(min(1.0, max(0.0, rng.gauss(sms, 0.07))), 2),
            round(max(1.0, rng.gauss(km, km * 0.2)), 1),
            round(min(0.6, max(0.02, rng.gauss(rate, 0.03))), 2),
        ])
    return rows


__teyro_clinic_visits_header = 'clinic_id,patients_per_week,avg_wait_days,sms_rate,avg_distance_km,no_show_rate'


def __teyro_csv_with(header, rows):
    return '\n'.join([header] + [','.join(str(v) for v in r) for r in rows]) + '\n'


__teyro_cache = {}


def __teyro_files():
    # Built once per Python session (the rows never change), written fresh each run.
    if not __teyro_cache:
        rows = __teyro_build_deliveries()
        __teyro_cache['deliveries_clean.csv'] = __teyro_csv(rows)
        __teyro_cache['deliveries.csv'] = __teyro_csv(__teyro_make_messy(rows))
        appointments = __teyro_build_appointments()
        __teyro_cache['appointments.csv'] = __teyro_csv_with(__teyro_appointments_header, appointments)
        __teyro_cache['appointments_raw.csv'] = __teyro_csv_with(
            __teyro_appointments_header, __teyro_make_messy_appointments(appointments))
        __teyro_cache['clinic_visits.csv'] = __teyro_csv_with(
            __teyro_clinic_visits_header, __teyro_build_clinic_visits())
    return __teyro_cache


def __teyro_write_datasets():
    for name, text in __teyro_files().items():
        with open(name, 'w') as f:
            f.write(text)
