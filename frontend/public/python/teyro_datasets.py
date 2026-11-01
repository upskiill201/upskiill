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


# clinic_weeks.csv: last year's weekly booking totals for the 8 pilot clinics
# (Machine Learning for Beginners, Chapter 5: predicting a number). Its own
# seed, so adding it changed none of the files above. Planted: each opening
# hour adds about half a booking; nurses help a lot at first, then level off
# (the curve a straight line can't follow); public-holiday weeks lose about 7;
# each rainy day costs a little under 1.
def __teyro_build_clinic_weeks():
    rng = __teyro_random.Random(52)
    base = {'Yaba': -5, 'Surulere': -6, 'Ikeja': -6, 'Lekki': -8, 'Ibadan North': -8, 'Wuse': -8,
            'Kano City': -7, 'Gumel': -14}
    hours = {'Yaba': 50, 'Surulere': 48, 'Ikeja': 48, 'Lekki': 44, 'Ibadan North': 42, 'Wuse': 44,
             'Kano City': 45, 'Gumel': 32}
    holidays = {1, 14, 15, 22, 40, 52}
    rows = []
    for clinic in __teyro_clinics:
        for week in range(1, 53):
            open_hours = hours[clinic] + rng.choice([-10, -5, 0, 0, 0, 5, 10])
            nurses = rng.randint(2, 6)
            holiday = 1 if week in holidays else 0
            rain_days = rng.randint(1, 5) if 15 <= week <= 40 else rng.randint(0, 2)
            staff = 18 * (1 - __teyro_math.exp(-1.1 * (nurses - 1)))
            mean = base[clinic] + 0.5 * open_hours + staff - 7 * holiday - 0.8 * rain_days
            bookings = max(0, int(round(rng.gauss(mean, 2.5))))
            rows.append([clinic, week, open_hours, nurses, holiday, rain_days, bookings])
    return rows


__teyro_clinic_weeks_header = 'clinic,week,open_hours,nurses,holiday,rain_days,bookings'


# ---------------------------------------------------------------------------
# The AI Stack: Mr Rao's online clothing shop in Pune (made-up data).
#
#   rao_products.csv   120 products: name, category, occasion, price, sizes,
#                      stock and a one-line description (for search and RAG)
#   rao_orders.csv     300 November orders with a status (for tool calling)
#   rao_policies.md    the shop's real help page: delivery, returns, sizes,
#                      payment, help (for RAG; teyro_ai's PracticeModel makes
#                      up different answers when it isn't given this page)
#   rao_questions.csv  30 customer questions with the answer each must contain
#                      (the evaluation set)

__teyro_rao_policies = """# Mr Rao's shop: customer help

## Delivery
- Orders in Pune arrive in 1 to 2 days.
- Orders to the rest of India arrive in 3 to 6 days.
- Delivery is free on orders over ₹999. Below that, delivery costs ₹79.
- We ship within 24 hours of payment, Monday to Saturday.

## Returns and exchanges
- You can return or exchange an item within 7 days of delivery.
- Items must be unworn, with the tags still on.
- Refunds go back to the original payment method within 5 working days.
- Sale items and custom-stitched items cannot be returned.

## Sizes
- Kurtas and kurtis come in S, M, L, XL and XXL.
- Sarees and dupattas are free size.
- Every product page has a size chart in inches.

## Payment
- We accept UPI, debit and credit cards, and cash on delivery.
- Cash on delivery is available for orders up to ₹5,000.

## Help
- Our team answers WhatsApp messages from 10 a.m. to 7 p.m., Monday to Saturday.
- For a damaged or wrong item, send a photo within 48 hours of delivery.
"""

# category: (gender, low price, high price, sizes, fabrics, occasions)
__teyro_rao_categories = {
    'kurta': ('men', 799, 2499, 'S/M/L/XL/XXL', ['cotton', 'linen', 'silk'], ['everyday', 'festive', 'office']),
    'kurti': ('women', 599, 1999, 'S/M/L/XL/XXL', ['cotton', 'rayon', 'chanderi'], ['everyday', 'office', 'festive']),
    'saree': ('women', 1499, 6999, 'Free size', ['silk', 'cotton', 'georgette'], ['festive', 'wedding', 'everyday']),
    'lehenga': ('women', 3999, 12999, 'S/M/L', ['silk', 'georgette'], ['wedding', 'festive']),
    'sherwani': ('men', 5999, 14999, '38/40/42/44', ['silk', 'brocade'], ['wedding']),
    'nehru jacket': ('men', 1299, 2999, 'S/M/L/XL', ['cotton', 'silk'], ['festive', 'office']),
    'dupatta': ('women', 399, 1299, 'Free size', ['chiffon', 'cotton', 'silk'], ['festive', 'everyday']),
    'juttis': ('women', 699, 1999, '5/6/7/8/9', ['leather', 'embroidered'], ['festive', 'wedding', 'everyday']),
    'kids kurta set': ('kids', 599, 1499, '2-4Y/4-6Y/6-8Y/8-10Y', ['cotton', 'silk'], ['festive', 'everyday']),
}
__teyro_rao_colours = ['Red', 'Maroon', 'Navy', 'Mustard', 'White', 'Green', 'Pink', 'Black', 'Peach', 'Teal']
__teyro_rao_phrases = {
    'everyday': 'comfortable for everyday wear',
    'office': 'smart enough for the office',
    'festive': 'for festivals and parties',
    'wedding': 'for weddings and receptions',
}


def __teyro_build_rao():
    rng = __teyro_random.Random(2027)
    names = list(__teyro_rao_categories)
    products = []
    for i in range(120):
        category = names[i % len(names)]
        gender, low, high, sizes, fabrics, occasions = __teyro_rao_categories[category]
        colour = rng.choice(__teyro_rao_colours)
        fabric = rng.choice(fabrics)
        occasion = rng.choice(occasions)
        price = rng.randrange((low + 1) // 100, (high + 1) // 100 + 1) * 100 - 1
        in_stock = 1 if rng.random() < 0.85 else 0
        name = f'{colour} {fabric} {category}'
        description = f'{name} for {gender}, {__teyro_rao_phrases[occasion]}'
        products.append(['P' + str(101 + i), name, category, gender, occasion, price, sizes, in_stock, description])

    cities = ['Pune', 'Pune', 'Pune', 'Pune', 'Mumbai', 'Bengaluru', 'Delhi', 'Hyderabad', 'Chennai', 'Nagpur']
    statuses = ['Delivered', 'Shipped', 'Out for delivery', 'Packed', 'Returned', 'Cancelled']
    orders = []
    for i in range(300):
        day = rng.randrange(1, 31)
        count = rng.choice([1, 1, 1, 2, 2, 3])
        items = [rng.choice(products) for _ in range(count)]
        total = sum(p[5] for p in items)
        status = rng.choices(statuses, weights=[55, 15, 8, 10, 7, 5])[0]
        payment = rng.choices(['UPI', 'Card', 'Cash on delivery'], weights=[55, 25, 20])[0]
        orders.append(['R-' + str(1001 + i), '2026-11-' + str(day).zfill(2), rng.choice(cities), count,
                       total, payment, status])
    return products, orders


# Handwritten: each question, its topic, and a phrase the correct answer must contain.
__teyro_rao_questions = [
    ['Q01', 'How long does delivery to Pune take?', 'delivery', '1 to 2 days'],
    ['Q02', 'How many days for delivery to Delhi?', 'delivery', '3 to 6 days'],
    ['Q03', 'Is delivery free?', 'delivery', '₹999'],
    ['Q04', 'How much is delivery on a small order?', 'delivery', '₹79'],
    ['Q05', 'When do you ship my order after I pay?', 'delivery', '24 hours'],
    ['Q06', 'Can I return a kurta?', 'returns', '7 days'],
    ['Q07', 'What is your return policy?', 'returns', '7 days'],
    ['Q08', 'Can I return something I wore once?', 'returns', 'unworn'],
    ['Q09', 'When will I get my refund?', 'returns', '5 working days'],
    ['Q10', 'Can I return a sale item?', 'returns', 'cannot be returned'],
    ['Q11', 'Can I exchange for a different size?', 'returns', '7 days'],
    ['Q12', 'What sizes do kurtas come in?', 'size', 'XXL'],
    ['Q13', 'Do you have a size chart?', 'size', 'size chart'],
    ['Q14', 'What size is a saree?', 'size', 'free size'],
    ['Q15', 'Do kurtis come in XL?', 'size', 'XL'],
    ['Q16', 'Can I pay with UPI?', 'payment', 'UPI'],
    ['Q17', 'Do you take cash on delivery?', 'payment', 'cash on delivery'],
    ['Q18', 'Is there a limit for cash on delivery?', 'payment', '₹5,000'],
    ['Q19', 'Can I pay by credit card?', 'payment', 'credit cards'],
    ['Q20', 'When can I message your team on WhatsApp?', 'help', '10 a.m. to 7 p.m.'],
    ['Q21', 'My item arrived damaged. What do I do?', 'help', 'photo'],
    ['Q22', 'I got the wrong item.', 'help', '48 hours'],
    ['Q23', 'Do you deliver on Sunday?', 'delivery', 'Monday to Saturday'],
    ['Q24', 'Can I return a custom-stitched kurta?', 'returns', 'cannot be returned'],
    ['Q25', 'Do refunds go to my card?', 'returns', 'original payment method'],
    ['Q26', 'Is the dupatta free size?', 'size', 'free size'],
    ['Q27', 'How do I talk to a person?', 'help', 'WhatsApp'],
    ['Q28', 'Do you have a discount code?', 'price', 'NOT IN POLICY'],
    ['Q29', 'Do you sell shoes for men?', 'products', 'NOT IN POLICY'],
    ['Q30', 'Can you deliver to Dubai?', 'delivery', 'NOT IN POLICY'],
]


def __teyro_csv_rows(header, rows):
    import csv as _csv
    import io as _io
    buf = _io.StringIO()
    writer = _csv.writer(buf, lineterminator='\n')
    writer.writerow(header)
    writer.writerows(rows)
    return buf.getvalue()


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
        __teyro_cache['clinic_weeks.csv'] = __teyro_csv_with(
            __teyro_clinic_weeks_header, __teyro_build_clinic_weeks())
        products, orders = __teyro_build_rao()
        __teyro_cache['rao_products.csv'] = __teyro_csv_rows(
            ['product_id', 'name', 'category', 'gender', 'occasion', 'price_rupees', 'sizes', 'in_stock', 'description'],
            products)
        __teyro_cache['rao_orders.csv'] = __teyro_csv_rows(
            ['order_id', 'order_date', 'city', 'items', 'total_rupees', 'payment', 'status'], orders)
        __teyro_cache['rao_questions.csv'] = __teyro_csv_rows(
            ['question_id', 'question', 'topic', 'answer_must_include'], __teyro_rao_questions)
        __teyro_cache['rao_policies.md'] = __teyro_rao_policies
    return __teyro_cache


def __teyro_write_datasets():
    for name, text in __teyro_files().items():
        with open(name, 'w') as f:
            f.write(text)
