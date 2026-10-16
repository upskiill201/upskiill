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
# that uses these files (today: Data Science for Beginners).
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


def __teyro_write_datasets():
    rows = __teyro_build_deliveries()
    with open('deliveries_clean.csv', 'w') as f:
        f.write(__teyro_csv(rows))
    with open('deliveries.csv', 'w') as f:
        f.write(__teyro_csv(__teyro_make_messy(rows)))
