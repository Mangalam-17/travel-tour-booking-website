-- ============================================================
-- ROAMLY — Supabase Database Setup
-- Run this entire file in: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. TOURS TABLE
create table if not exists tours (
  id          serial primary key,
  title       text not null,
  destination text not null,
  country     text not null,
  images      text[] not null default '{}',
  description text,
  price       integer not null,
  rating      numeric(3,1) not null default 0,
  duration    text,
  tour_type   text,
  highlights  text[] default '{}',
  facilities  text[] default '{}'
);

-- 2. ITINERARY TABLE
create table if not exists itinerary (
  id          serial primary key,
  tour_id     integer references tours(id) on delete cascade,
  day         integer not null,
  title       text not null,
  description text
);

-- 3. REVIEWS TABLE
create table if not exists reviews (
  id       serial primary key,
  tour_id  integer references tours(id) on delete cascade,
  name     text not null,
  avatar   text,
  rating   integer not null default 5,
  comment  text,
  date     text
);

-- 4. Enable Row Level Security (read-only public access)
alter table tours     enable row level security;
alter table itinerary enable row level security;
alter table reviews   enable row level security;

create policy "Public read tours"     on tours     for select using (true);
create policy "Public read itinerary" on itinerary for select using (true);
create policy "Public read reviews"   on reviews   for select using (true);

-- ============================================================
-- 5. SEED DATA — Tours
-- ============================================================
insert into tours (id, title, destination, country, images, description, price, rating, duration, tour_type, highlights, facilities) values
(1,'Bali Paradise Escape','Bali','Indonesia',
 array['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80','https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80','https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80','https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80'],
 'Experience the magic of Bali with its stunning temples, lush rice terraces, and pristine beaches. This all-inclusive package takes you through the cultural heart of Ubud, the surf paradise of Seminyak, and the spiritual serenity of Tanah Lot.',
 1299,4.8,'7 Days / 6 Nights','Beach',
 array['Visit the iconic Tanah Lot Temple at sunset','Explore the Tegallalang Rice Terraces','Traditional Balinese cooking class','Sunset cruise along the coast','Ubud Monkey Forest visit','Kecak fire dance performance'],
 array['Hotel Stay','Breakfast','Airport Pickup','Tour Guide','Transportation']),

(2,'Swiss Alps Adventure','Zurich','Switzerland',
 array['https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80','https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80','https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80','https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80'],
 'Conquer the majestic Swiss Alps with this thrilling adventure package. From skiing on pristine slopes to hiking through breathtaking mountain trails, this journey offers the ultimate alpine experience.',
 2899,4.9,'8 Days / 7 Nights','Adventure',
 array['Skiing on world-famous Jungfrau slopes','Scenic train ride on the Glacier Express','Visit the Matterhorn viewpoint','Paragliding over Interlaken','Explore medieval old town of Bern','Swiss chocolate and cheese factory tour'],
 array['Hotel Stay','Breakfast','Airport Pickup','Tour Guide','Transportation']),

(3,'Maldives Luxury Retreat','Malé','Maldives',
 array['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80','https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80','https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&q=80','https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80'],
 'Indulge in the ultimate luxury escape to the Maldives. Stay in an overwater bungalow surrounded by crystal-clear turquoise waters, vibrant coral reefs, and pristine white sand beaches.',
 3499,5.0,'6 Days / 5 Nights','Luxury',
 array['Overwater bungalow accommodation','Private snorkeling in coral reefs','Sunset dolphin watching cruise','Underwater restaurant dining','Couples spa treatment','Private beach picnic'],
 array['Hotel Stay','Breakfast','Airport Pickup','Tour Guide','Transportation']),

(4,'Serengeti Wildlife Safari','Serengeti','Tanzania',
 array['https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80','https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80','https://images.unsplash.com/photo-1504173010664-32509107de5f?w=800&q=80','https://images.unsplash.com/photo-1551009175-15bdf9dcb580?w=800&q=80'],
 'Witness the greatest wildlife spectacle on Earth in the Serengeti. This premium safari package takes you deep into the African wilderness to witness the Great Migration and spot the Big Five.',
 4199,4.9,'9 Days / 8 Nights','Wildlife',
 array['Witness the Great Wildebeest Migration','Big Five game drives','Hot air balloon safari at sunrise','Visit Ngorongoro Crater','Maasai village cultural experience','Night game drive'],
 array['Hotel Stay','Breakfast','Airport Pickup','Tour Guide','Transportation']),

(5,'Santorini Honeymoon Bliss','Santorini','Greece',
 array['https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80','https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80','https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80','https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800&q=80'],
 'Celebrate your love in the most romantic destination on Earth. Santorini''s iconic white-washed buildings, blue-domed churches, and breathtaking caldera views create the perfect backdrop for your honeymoon.',
 2599,4.9,'7 Days / 6 Nights','Honeymoon',
 array['Stay in iconic cave hotel with caldera views','Private sunset dinner in Oia','Catamaran cruise around the island','Wine tasting at local vineyards','Akrotiri archaeological site visit','Couples photography session'],
 array['Hotel Stay','Breakfast','Airport Pickup','Tour Guide','Transportation']),

(6,'Tokyo Cultural Immersion','Tokyo','Japan',
 array['https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80','https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&q=80','https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80','https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&q=80'],
 'Dive deep into the fascinating blend of ancient tradition and futuristic innovation that makes Tokyo one of the world''s most captivating cities.',
 2199,4.7,'8 Days / 7 Nights','Family',
 array['Tsukiji Fish Market morning tour','Traditional tea ceremony experience','Day trip to Mount Fuji','Akihabara electronics district','Shibuya Crossing and Harajuku','Sumo wrestling match attendance'],
 array['Hotel Stay','Breakfast','Airport Pickup','Tour Guide','Transportation']),

(7,'Amazon Rainforest Expedition','Manaus','Brazil',
 array['https://images.unsplash.com/photo-1518182170546-07661fd94144?w=800&q=80','https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80','https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80','https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80'],
 'Venture into the world''s largest tropical rainforest on this extraordinary expedition. Navigate the mighty Amazon River, encounter exotic wildlife, and stay in eco-lodges deep in the jungle.',
 1899,4.6,'7 Days / 6 Nights','Adventure',
 array['Amazon River boat expedition','Pink river dolphin spotting','Night jungle walk','Indigenous community visit','Piranha fishing experience','Canopy walkway through treetops'],
 array['Hotel Stay','Breakfast','Airport Pickup','Tour Guide','Transportation']),

(8,'Dubai Luxury Experience','Dubai','UAE',
 array['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80','https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80','https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80','https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=800&q=80'],
 'Experience the pinnacle of modern luxury in Dubai, where futuristic architecture meets Arabian heritage. From the world''s tallest building to golden desert dunes.',
 2799,4.8,'6 Days / 5 Nights','Luxury',
 array['Burj Khalifa observation deck','Desert safari with dune bashing','Dubai Mall and fountain show','Dhow cruise dinner on Dubai Creek','Palm Jumeirah and Atlantis visit','Gold and Spice Souk exploration'],
 array['Hotel Stay','Breakfast','Airport Pickup','Tour Guide','Transportation']),

(9,'Machu Picchu Discovery','Cusco','Peru',
 array['https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80','https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=800&q=80','https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80','https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=800&q=80'],
 'Trek to one of the world''s most iconic archaeological wonders through the Sacred Valley of the Incas, along the legendary Inca Trail, and to the breathtaking citadel of Machu Picchu.',
 1799,4.8,'8 Days / 7 Nights','Adventure',
 array['Inca Trail trek to Machu Picchu','Sacred Valley exploration','Cusco city tour','Sunrise at Machu Picchu','Huayna Picchu mountain climb','Traditional Peruvian cooking class'],
 array['Hotel Stay','Breakfast','Airport Pickup','Tour Guide','Transportation']),

(10,'Amalfi Coast Family Holiday','Amalfi','Italy',
 array['https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800&q=80','https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80','https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80','https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=800&q=80'],
 'Create unforgettable family memories along Italy''s most spectacular coastline. The Amalfi Coast offers a perfect blend of stunning scenery, rich history, delicious food, and family-friendly activities.',
 2299,4.7,'7 Days / 6 Nights','Family',
 array['Positano village exploration','Boat tour along the coastline','Pompeii archaeological site','Limoncello making class','Pizza making with local chef','Capri island day trip'],
 array['Hotel Stay','Breakfast','Airport Pickup','Tour Guide','Transportation']),

(11,'Phuket Beach Paradise','Phuket','Thailand',
 array['https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&q=80','https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80','https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&q=80','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'],
 'Discover the jewel of the Andaman Sea with this comprehensive Phuket package. From the famous Phi Phi Islands to the vibrant Patong Beach, experience Thailand''s most beloved destination.',
 999,4.6,'6 Days / 5 Nights','Beach',
 array['Phi Phi Islands boat tour','Phang Nga Bay sea kayaking','Scuba diving in Andaman Sea','Thai cooking class','Big Buddha and Wat Chalong','Patong Beach nightlife'],
 array['Hotel Stay','Breakfast','Airport Pickup','Tour Guide','Transportation']),

(12,'Patagonia Wilderness Trek','Torres del Paine','Chile',
 array['https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80','https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=80','https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80','https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80'],
 'Explore the raw, untamed wilderness of Patagonia on this epic trekking adventure. Torres del Paine National Park offers some of the most dramatic landscapes on Earth.',
 2199,4.8,'10 Days / 9 Nights','Adventure',
 array['W Trek through Torres del Paine','Grey Glacier hike','Mirador Las Torres sunrise','Kayaking on Lake Grey','Condor watching','Gaucho ranch visit'],
 array['Hotel Stay','Breakfast','Airport Pickup','Tour Guide','Transportation']);

-- ============================================================
-- 6. SEED DATA — Itinerary
-- ============================================================
insert into itinerary (tour_id, day, title, description) values
-- Tour 1: Bali
(1,1,'Arrival & Seminyak','Arrive at Ngurah Rai Airport, transfer to hotel. Evening at leisure on Seminyak Beach.'),
(1,2,'Ubud Cultural Tour','Visit Tegallalang Rice Terraces, Ubud Palace, and the famous Monkey Forest.'),
(1,3,'Temple Trail','Explore Tanah Lot, Uluwatu Temple, and enjoy a Kecak fire dance at sunset.'),
(1,4,'Adventure Day','White water rafting on the Ayung River, followed by a traditional Balinese spa.'),
(1,5,'Cooking & Culture','Morning cooking class, afternoon visit to Batuan Temple and local art villages.'),
(1,6,'Beach & Leisure','Free day at Nusa Dua Beach. Optional water sports and sunset dinner cruise.'),
(1,7,'Departure','Breakfast at hotel, last-minute shopping, transfer to airport.'),
-- Tour 2: Swiss Alps
(2,1,'Arrival in Zurich','Arrive in Zurich, transfer to hotel. Evening city walk along Lake Zurich.'),
(2,2,'Zurich to Interlaken','Scenic train journey to Interlaken. Afternoon paragliding or boat ride on Lake Thun.'),
(2,3,'Jungfraujoch','Full day excursion to the Top of Europe - Jungfraujoch at 3,454m altitude.'),
(2,4,'Zermatt & Matterhorn','Travel to Zermatt, iconic views of the Matterhorn, evening in the car-free village.'),
(2,5,'Skiing Day','Full day skiing or snowboarding on Zermatt''s world-class slopes.'),
(2,6,'Glacier Express','Scenic Glacier Express train journey through the Alps to St. Moritz.'),
(2,7,'Bern & Lucerne','Visit the Swiss capital Bern and the beautiful lakeside city of Lucerne.'),
(2,8,'Departure','Transfer back to Zurich airport for departure.'),
-- Tour 3: Maldives
(3,1,'Arrival in Paradise','Arrive at Malé, seaplane transfer to your private island resort. Welcome cocktails and sunset viewing.'),
(3,2,'Ocean Exploration','Morning snorkeling in the house reef, afternoon glass-bottom boat tour, evening beach dinner.'),
(3,3,'Water Sports Day','Jet skiing, windsurfing, kayaking, and paddleboarding. Afternoon spa treatment.'),
(3,4,'Island Hopping','Visit local Maldivian islands, explore fishing villages, and enjoy a traditional lunch.'),
(3,5,'Relaxation & Romance','Private beach picnic, couples massage, sunset dolphin cruise, underwater restaurant dinner.'),
(3,6,'Departure','Final morning swim, seaplane transfer back to Malé for departure.'),
-- Tour 4: Serengeti
(4,1,'Arrival in Arusha','Arrive at Kilimanjaro Airport, transfer to Arusha. Safari briefing and welcome dinner.'),
(4,2,'Tarangire National Park','Full day game drive in Tarangire, famous for its elephant herds and baobab trees.'),
(4,3,'Ngorongoro Crater','Descend into the world''s largest intact volcanic caldera, home to 25,000 animals.'),
(4,4,'Enter the Serengeti','Drive into the Serengeti, afternoon game drive, overnight in luxury tented camp.'),
(4,5,'Great Migration','Full day tracking the Great Migration. Witness thousands of wildebeest crossing rivers.'),
(4,6,'Balloon Safari','Pre-dawn hot air balloon flight over the Serengeti, champagne breakfast on the plains.'),
(4,7,'Central Serengeti','Game drives in the Seronera Valley, famous for leopard and lion sightings.'),
(4,8,'Maasai Culture','Visit a traditional Maasai village, learn about their customs and way of life.'),
(4,9,'Departure','Morning game drive, transfer to Arusha for departure flight.'),
-- Tour 5: Santorini
(5,1,'Arrival in Santorini','Arrive at Santorini Airport, transfer to cave hotel. Welcome champagne and sunset viewing.'),
(5,2,'Oia & Fira Exploration','Explore the iconic villages of Oia and Fira, sunset dinner at a cliffside restaurant.'),
(5,3,'Catamaran Cruise','Full day private catamaran cruise, snorkeling in volcanic hot springs, BBQ on board.'),
(5,4,'Wine & Culture','Visit Santo Wines for tasting, explore Akrotiri ruins, afternoon at Red Beach.'),
(5,5,'Perissa & Kamari','Relax on black sand beaches, water sports, romantic beachside dinner.'),
(5,6,'Couples Spa Day','Luxury spa treatments, private photography session, farewell dinner with caldera views.'),
(5,7,'Departure','Final morning stroll through Oia, transfer to airport.'),
-- Tour 6: Tokyo
(6,1,'Arrival in Tokyo','Arrive at Narita Airport, Shinkansen to city center, check-in and evening Shinjuku walk.'),
(6,2,'Traditional Tokyo','Senso-ji Temple, Asakusa district, tea ceremony, Ueno Park and museums.'),
(6,3,'Modern Tokyo','Shibuya Crossing, Harajuku, Omotesando, Akihabara electronics and anime district.'),
(6,4,'Mount Fuji Day Trip','Full day excursion to Mount Fuji and Hakone, views of the iconic peak, hot spring bath.'),
(6,5,'Tsukiji & Ginza','Early morning Tsukiji market tour, sushi breakfast, afternoon luxury shopping in Ginza.'),
(6,6,'Kyoto Day Trip','Shinkansen to Kyoto, Fushimi Inari shrine, Arashiyama bamboo grove, return to Tokyo.'),
(6,7,'Sumo & Nightlife','Sumo wrestling match, Roppongi nightlife, Tokyo Tower night views.'),
(6,8,'Departure','Final morning in Shinjuku, transfer to airport.'),
-- Tour 7: Amazon
(7,1,'Arrival in Manaus','Arrive in Manaus, transfer to eco-lodge by boat. Evening orientation and jungle briefing.'),
(7,2,'Amazon River Exploration','Morning boat tour, Meeting of the Waters, afternoon wildlife spotting along riverbanks.'),
(7,3,'Deep Jungle Trek','Full day jungle trek with expert guide, identify medicinal plants, spot exotic birds.'),
(7,4,'Indigenous Culture','Visit Yanomami community, learn traditional crafts, participate in cultural ceremonies.'),
(7,5,'Wildlife Day','Pink dolphin swimming, piranha fishing, caiman spotting at night.'),
(7,6,'Canopy & Kayaking','Treetop canopy walkway, kayaking through flooded forest, sunset on the river.'),
(7,7,'Departure','Morning bird watching, boat transfer back to Manaus, departure flight.'),
-- Tour 8: Dubai
(8,1,'Arrival in Dubai','Arrive at Dubai International Airport, transfer to 5-star hotel. Evening Dubai Marina walk.'),
(8,2,'Modern Dubai','Burj Khalifa, Dubai Mall, Dubai Fountain show, Dubai Frame, City Walk.'),
(8,3,'Desert Safari','Afternoon desert safari with dune bashing, camel riding, BBQ dinner under the stars.'),
(8,4,'Old Dubai','Gold Souk, Spice Souk, Abra ride across Dubai Creek, Al Fahidi Historical District.'),
(8,5,'Palm & Beach','Palm Jumeirah monorail, Atlantis Aquaventure, JBR Beach, sunset at Burj Al Arab.'),
(8,6,'Departure','Morning at leisure, last-minute shopping, transfer to airport.'),
-- Tour 9: Machu Picchu
(9,1,'Arrival in Lima','Arrive in Lima, transfer to hotel. Evening in Miraflores district, seafood dinner.'),
(9,2,'Lima to Cusco','Flight to Cusco, acclimatization day, gentle city walk, San Pedro Market visit.'),
(9,3,'Sacred Valley','Explore Pisac ruins and market, Ollantaytambo fortress, overnight in the valley.'),
(9,4,'Inca Trail Day 1','Begin the classic 4-day Inca Trail trek, pass through cloud forest and Inca ruins.'),
(9,5,'Inca Trail Day 2','Dead Woman''s Pass (4,215m), most challenging day, stunning mountain views.'),
(9,6,'Inca Trail Day 3','Archaeological sites along the trail, cloud forest, arrive at Aguas Calientes.'),
(9,7,'Machu Picchu','Early morning entry to Machu Picchu, guided tour, optional Huayna Picchu climb.'),
(9,8,'Return & Departure','Train back to Cusco, transfer to airport for departure.'),
-- Tour 10: Amalfi
(10,1,'Arrival in Naples','Arrive in Naples, transfer to Amalfi Coast hotel. Evening stroll in Amalfi town.'),
(10,2,'Positano & Ravello','Explore colorful Positano, hike the Path of the Gods, visit Ravello gardens.'),
(10,3,'Pompeii & Herculaneum','Full day at Pompeii archaeological site, visit Herculaneum ruins.'),
(10,4,'Capri Day Trip','Ferry to Capri, Blue Grotto, Villa San Michele, chairlift to Monte Solaro.'),
(10,5,'Cooking & Culture','Morning pizza making class, afternoon limoncello tasting, boat tour of the coast.'),
(10,6,'Beach & Leisure','Free day at Maiori Beach, optional kayaking, farewell dinner with sea views.'),
(10,7,'Departure','Transfer to Naples airport for departure.'),
-- Tour 11: Phuket
(11,1,'Arrival in Phuket','Arrive at Phuket Airport, transfer to beachfront hotel. Evening at Patong Beach.'),
(11,2,'Phi Phi Islands','Full day speedboat tour to Phi Phi Islands, snorkeling, Maya Bay, beach BBQ.'),
(11,3,'Phang Nga Bay','James Bond Island, sea kayaking through limestone caves, floating village visit.'),
(11,4,'Culture & Temples','Big Buddha, Wat Chalong, Old Phuket Town, Thai cooking class in the evening.'),
(11,5,'Diving & Leisure','Morning scuba diving or snorkeling, afternoon Thai massage, Bangla Road evening.'),
(11,6,'Departure','Final morning at Kata Beach, transfer to airport.'),
-- Tour 12: Patagonia
(12,1,'Arrival in Punta Arenas','Arrive in Punta Arenas, transfer to Puerto Natales. Briefing and gear check.'),
(12,2,'Enter Torres del Paine','Enter the national park, hike to Mirador Condor, overnight at mountain lodge.'),
(12,3,'Valle del Francés','Full day hike through the French Valley, dramatic hanging glaciers and waterfalls.'),
(12,4,'Grey Glacier','Hike to Grey Glacier, optional ice trekking on the glacier surface.'),
(12,5,'Mirador Las Torres','Pre-dawn hike to the iconic Torres viewpoint for sunrise. Most rewarding day.'),
(12,6,'Kayaking Lake Grey','Morning kayak among icebergs on Lake Grey, afternoon at leisure.'),
(12,7,'Gaucho Ranch','Visit a traditional estancia, horseback riding, asado dinner with local gauchos.'),
(12,8,'Puerto Natales','Return to Puerto Natales, explore the town, farewell dinner.'),
(12,9,'Punta Arenas','Transfer to Punta Arenas, optional city tour.'),
(12,10,'Departure','Transfer to airport for departure flight.');

-- ============================================================
-- 7. SEED DATA — Reviews
-- ============================================================
insert into reviews (tour_id, name, avatar, rating, comment, date) values
(1,'Sarah Johnson','https://i.pravatar.cc/60?img=1',5,'Absolutely magical trip! The guide was knowledgeable and the hotels were stunning.','March 2024'),
(1,'Mike Chen','https://i.pravatar.cc/60?img=3',5,'Best vacation of my life. Bali is breathtaking and this package covered everything perfectly.','February 2024'),
(1,'Emma Wilson','https://i.pravatar.cc/60?img=5',4,'Great experience overall. The rice terraces were stunning. Would highly recommend!','January 2024'),
(2,'David Park','https://i.pravatar.cc/60?img=7',5,'The Alps are absolutely stunning. Skiing was incredible and the chalets were cozy.','February 2024'),
(2,'Lisa Anderson','https://i.pravatar.cc/60?img=9',5,'Jungfraujoch was a once-in-a-lifetime experience. Everything was perfectly organized.','January 2024'),
(3,'James & Sophie','https://i.pravatar.cc/60?img=11',5,'Absolute perfection. The overwater bungalow was a dream. Worth every penny!','April 2024'),
(3,'Rachel Kim','https://i.pravatar.cc/60?img=13',5,'The most beautiful place I''ve ever been. The underwater restaurant was surreal.','March 2024'),
(4,'Thomas Brown','https://i.pravatar.cc/60?img=15',5,'The Great Migration was beyond words. Our guide was exceptional. Life-changing trip!','July 2024'),
(4,'Maria Garcia','https://i.pravatar.cc/60?img=17',5,'Saw all Big Five on day 2! The tented camps were surprisingly luxurious.','June 2024'),
(5,'Alex & Nina','https://i.pravatar.cc/60?img=19',5,'The most romantic trip imaginable. The cave hotel views were absolutely stunning!','May 2024'),
(5,'Chris Taylor','https://i.pravatar.cc/60?img=21',5,'Perfect honeymoon destination. Every detail was taken care of. Highly recommend!','April 2024'),
(6,'Kevin Lee','https://i.pravatar.cc/60?img=23',5,'Tokyo exceeded all expectations. The guide knew every hidden gem in the city!','March 2024'),
(6,'Amanda Foster','https://i.pravatar.cc/60?img=25',4,'Amazing cultural experience. The tea ceremony and Mount Fuji were highlights.','February 2024'),
(7,'Robert Hayes','https://i.pravatar.cc/60?img=27',5,'The most adventurous trip I''ve ever taken. Swimming with pink dolphins was surreal!','August 2024'),
(7,'Priya Sharma','https://i.pravatar.cc/60?img=29',4,'Incredible biodiversity. The indigenous community visit was deeply moving.','July 2024'),
(8,'Jennifer Walsh','https://i.pravatar.cc/60?img=31',5,'Dubai is unlike anywhere else. The desert safari was the highlight of the trip!','November 2023'),
(8,'Omar Abdullah','https://i.pravatar.cc/60?img=33',5,'Exceptional service throughout. The Burj Khalifa views at night were breathtaking.','October 2023'),
(9,'Carlos Mendez','https://i.pravatar.cc/60?img=35',5,'The Inca Trail was challenging but absolutely worth it. Machu Picchu at sunrise is magical!','September 2024'),
(9,'Hannah Schmidt','https://i.pravatar.cc/60?img=37',5,'Best adventure of my life. Our guide''s knowledge of Inca history was incredible.','August 2024'),
(10,'The Martinez Family','https://i.pravatar.cc/60?img=39',5,'Perfect family vacation! Kids loved Pompeii and the pizza class. Stunning scenery.','June 2024'),
(10,'Patricia Moore','https://i.pravatar.cc/60?img=41',4,'The Amalfi Coast is breathtaking. Capri was a highlight. Great family memories!','May 2024'),
(11,'Sophie Turner','https://i.pravatar.cc/60?img=43',5,'Phuket is paradise! The Phi Phi Islands were stunning and the food was incredible.','January 2024'),
(11,'Mark Johnson','https://i.pravatar.cc/60?img=45',4,'Great value for money. The sea kayaking in Phang Nga Bay was unforgettable.','December 2023'),
(12,'Elena Vasquez','https://i.pravatar.cc/60?img=47',5,'Patagonia is unlike anywhere on Earth. The Torres sunrise was worth every step!','October 2024'),
(12,'Ben Nakamura','https://i.pravatar.cc/60?img=49',5,'The glacier hike was incredible. Our guide was fantastic. Truly bucket-list worthy.','September 2024');

-- Reset sequences so new inserts get correct IDs
select setval('tours_id_seq', (select max(id) from tours));
select setval('itinerary_id_seq', (select max(id) from itinerary));
select setval('reviews_id_seq', (select max(id) from reviews));
