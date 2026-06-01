require('dotenv').config();
const mongoose = require('mongoose');
const Tour = require('./models/Tour');

const tours = [
  {
    title: 'Rajasthan Royal Heritage', destination: 'Jaipur', country: 'India',
    images: [
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80',
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80',
    ],
    description: 'Embark on a royal journey through the Land of Kings. Explore magnificent forts, opulent palaces, and vibrant bazaars of Jaipur, Jodhpur, and Jaisalmer. Experience the golden desert dunes, camel safaris, and the rich cultural heritage of Rajasthan that will leave you spellbound.',
    price: 24999, rating: 4.9, duration: '8 Days / 7 Nights', tourType: 'Heritage',
    highlights: ['Amber Fort and City Palace in Jaipur', 'Desert safari in Jaisalmer', 'Mehrangarh Fort in Jodhpur', 'Camel ride on Sam Sand Dunes', 'Traditional Rajasthani folk dance evening', 'Havelis and step-wells of Abhaneri'],
    facilities: ['Hotel Stay', 'Breakfast', 'Airport Pickup', 'Tour Guide', 'Transportation'],
    itinerary: [
      { day: 1, title: 'Arrival in Jaipur', description: 'Arrive at Jaipur airport, check-in to heritage hotel. Evening walk at Hawa Mahal and local bazaars.' },
      { day: 2, title: 'Pink City Exploration', description: 'Visit Amber Fort, City Palace, Jantar Mantar observatory, and the iconic Hawa Mahal.' },
      { day: 3, title: 'Jaipur to Jodhpur', description: 'Drive to the Blue City. Visit Mehrangarh Fort, Jaswant Thada, and explore the old city markets.' },
      { day: 4, title: 'Jodhpur to Jaisalmer', description: 'Travel to the Golden City. Check-in to a desert camp. Evening at Gadisar Lake.' },
      { day: 5, title: 'Jaisalmer Fort & Desert', description: 'Explore Jaisalmer Fort, Patwon Ki Haveli, and enjoy a camel safari on Sam Sand Dunes at sunset.' },
      { day: 6, title: 'Desert Camp Night', description: 'Overnight stay in luxury desert camp with folk music, dance, and bonfire under the stars.' },
      { day: 7, title: 'Return to Jaipur', description: 'Drive back to Jaipur via Pokhran. Visit Abhaneri step-well en route.' },
      { day: 8, title: 'Departure', description: 'Morning at leisure, last-minute shopping at Johari Bazaar, transfer to airport.' },
    ],
    reviews: [
      { name: 'Rahul Verma', avatar: 'https://i.pravatar.cc/60?img=3', rating: 5, comment: 'The desert safari and camel ride were absolutely magical. Rajasthan is truly the jewel of India!', date: 'March 2024' },
      { name: 'Sneha Patel', avatar: 'https://i.pravatar.cc/60?img=5', rating: 5, comment: 'Staying in the heritage hotel felt like living like royalty. Every fort was breathtaking!', date: 'February 2024' },
    ],
  },
  {
    title: 'Kerala Backwaters Honeymoon', destination: 'Alleppey', country: 'India',
    images: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&q=80',
    ],
    description: "Discover God's Own Country on this romantic Kerala escape. Drift through serene backwaters on a traditional houseboat, rejuvenate with Ayurvedic treatments, explore misty tea gardens in Munnar, and relax on pristine beaches in Kovalam. Kerala is romance personified.",
    price: 29999, rating: 4.9, duration: '7 Days / 6 Nights', tourType: 'Honeymoon',
    highlights: ['Houseboat stay on Alleppey backwaters', 'Ayurvedic spa and massage', 'Tea gardens of Munnar', 'Kathakali dance performance in Kochi', 'Kovalam beach sunset', 'Periyar Wildlife Sanctuary boat ride'],
    facilities: ['Hotel Stay', 'Breakfast', 'Airport Pickup', 'Tour Guide', 'Transportation'],
    itinerary: [
      { day: 1, title: 'Arrival in Kochi', description: 'Arrive at Cochin airport. Visit Fort Kochi, Chinese fishing nets, and attend a Kathakali performance.' },
      { day: 2, title: 'Kochi to Munnar', description: 'Drive through scenic ghats to Munnar. Visit tea gardens, Eravikulam National Park, and Mattupetty Dam.' },
      { day: 3, title: 'Munnar to Thekkady', description: 'Travel to Periyar. Boat ride on Periyar Lake, spice plantation tour, and cultural show.' },
      { day: 4, title: 'Thekkady to Alleppey', description: 'Drive to Alleppey. Board your private houseboat for an overnight stay on the backwaters.' },
      { day: 5, title: 'Backwaters & Kumarakom', description: 'Cruise through narrow canals, paddy fields, and coconut groves. Arrive at Kumarakom resort.' },
      { day: 6, title: 'Kovalam Beach', description: 'Drive to Kovalam. Relax on the crescent beach, enjoy Ayurvedic massage, and sunset dinner.' },
      { day: 7, title: 'Departure from Trivandrum', description: 'Morning yoga session, transfer to Trivandrum airport for departure.' },
    ],
    reviews: [
      { name: 'Arjun & Meera Nair', avatar: 'https://i.pravatar.cc/60?img=11', rating: 5, comment: 'The houseboat experience was absolutely dreamy. Kerala is the most romantic destination in India!', date: 'April 2024' },
      { name: 'Divya Krishnan', avatar: 'https://i.pravatar.cc/60?img=13', rating: 5, comment: 'The Ayurvedic spa was transformative. Munnar tea gardens are breathtakingly beautiful.', date: 'March 2024' },
    ],
  },
  {
    title: 'Ladakh Bike Expedition', destination: 'Leh', country: 'India',
    images: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
      'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    ],
    description: "Conquer the roof of the world on this epic Ladakh bike expedition. Ride through the world's highest motorable passes, camp beside the stunning Pangong Lake, explore ancient monasteries, and witness landscapes that seem straight out of another planet. This is adventure at its purest.",
    price: 34999, rating: 4.9, duration: '10 Days / 9 Nights', tourType: 'Adventure',
    highlights: ['Ride over Khardung La — world\'s highest motorable pass', 'Camping at Pangong Tso Lake', 'Nubra Valley and Diskit Monastery', 'Magnetic Hill and Gurudwara Pathar Sahib', 'Hemis and Thiksey Monastery visits', 'Zanskar Valley viewpoint'],
    facilities: ['Hotel Stay', 'Breakfast', 'Airport Pickup', 'Tour Guide', 'Transportation'],
    itinerary: [
      { day: 1, title: 'Arrival in Leh', description: 'Arrive at Leh airport. Rest day for acclimatization. Evening walk at Leh Market and Shanti Stupa.' },
      { day: 2, title: 'Leh Local Sightseeing', description: 'Visit Leh Palace, Hemis Monastery, Thiksey Monastery, and Shey Palace.' },
      { day: 3, title: 'Leh to Nubra Valley', description: 'Ride over Khardung La Pass (5,359m). Descend to Nubra Valley. Visit Diskit Monastery.' },
      { day: 4, title: 'Nubra Valley', description: 'Camel safari on Hunder sand dunes. Visit Sumur village and Samstanling Monastery.' },
      { day: 5, title: 'Nubra to Pangong Lake', description: 'Ride through Shyok Valley to the stunning Pangong Tso. Overnight camping by the lake.' },
      { day: 6, title: 'Pangong Lake', description: 'Sunrise at Pangong Lake. Explore the blue-green waters and surrounding mountains.' },
      { day: 7, title: 'Pangong to Leh', description: 'Return to Leh via Chang La Pass. Visit Hemis National Park.' },
      { day: 8, title: 'Leh to Kargil', description: 'Ride to Kargil via Magnetic Hill, Gurudwara Pathar Sahib, and Mulbekh Monastery.' },
      { day: 9, title: 'Kargil to Srinagar', description: 'Scenic ride through Zoji La Pass to Srinagar. Shikara ride on Dal Lake.' },
      { day: 10, title: 'Departure from Srinagar', description: 'Morning at leisure, transfer to Srinagar airport for departure.' },
    ],
    reviews: [
      { name: 'Vikram Singh', avatar: 'https://i.pravatar.cc/60?img=15', rating: 5, comment: 'Riding over Khardung La was the most exhilarating moment of my life. Pangong Lake is surreal!', date: 'July 2024' },
      { name: 'Aditya Sharma', avatar: 'https://i.pravatar.cc/60?img=17', rating: 5, comment: 'The landscapes of Ladakh are unlike anything on Earth. Roamly planned every detail perfectly.', date: 'June 2024' },
    ],
  },
  {
    title: 'Goa Beach & Culture', destination: 'Goa', country: 'India',
    images: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&q=80',
    ],
    description: "Experience the best of Goa — sun-kissed beaches, Portuguese heritage, vibrant nightlife, and delicious seafood. From the serene shores of North Goa to the tranquil beaches of South Goa, this package covers it all. Explore spice plantations, ancient churches, and the famous Saturday Night Market.",
    price: 14999, rating: 4.7, duration: '6 Days / 5 Nights', tourType: 'Beach',
    highlights: ['Baga and Calangute beach water sports', 'Old Goa churches — UNESCO World Heritage', 'Spice plantation tour with lunch', 'Dudhsagar Waterfall trek', 'Saturday Night Market at Arpora', 'Sunset cruise on Mandovi River'],
    facilities: ['Hotel Stay', 'Breakfast', 'Airport Pickup', 'Tour Guide', 'Transportation'],
    itinerary: [
      { day: 1, title: 'Arrival in Goa', description: 'Arrive at Goa airport. Check-in to beachside resort. Evening at Baga Beach and Tito\'s Lane.' },
      { day: 2, title: 'North Goa Beaches', description: 'Visit Calangute, Baga, Anjuna, and Vagator beaches. Water sports and beach shack lunch.' },
      { day: 3, title: 'Old Goa & Spice Plantation', description: 'Visit Basilica of Bom Jesus, Se Cathedral, and a spice plantation with traditional Goan lunch.' },
      { day: 4, title: 'Dudhsagar & South Goa', description: 'Jeep safari to Dudhsagar Waterfall. Afternoon at Colva and Palolem beaches.' },
      { day: 5, title: 'Leisure & Nightlife', description: 'Morning yoga on the beach. Evening sunset cruise on Mandovi River. Saturday Night Market.' },
      { day: 6, title: 'Departure', description: 'Final morning swim, souvenir shopping at Mapusa Market, transfer to airport.' },
    ],
    reviews: [
      { name: 'Rohan Mehta', avatar: 'https://i.pravatar.cc/60?img=19', rating: 5, comment: 'Goa is always a great idea! The spice plantation lunch was incredible and Dudhsagar was stunning.', date: 'January 2024' },
      { name: 'Pooja Desai', avatar: 'https://i.pravatar.cc/60?img=21', rating: 4, comment: 'Perfect beach holiday. The sunset cruise was romantic and the seafood was amazing!', date: 'December 2023' },
    ],
  },
  {
    title: 'Varanasi Spiritual Journey', destination: 'Varanasi', country: 'India',
    images: [
      'https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=800&q=80',
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80',
    ],
    description: "Journey to the spiritual heart of India — Varanasi, the oldest living city on Earth. Witness the mesmerizing Ganga Aarti, take a sunrise boat ride on the sacred Ganges, explore ancient temples, and experience the profound spirituality that has drawn pilgrims for thousands of years. Also includes a day trip to Sarnath.",
    price: 12999, rating: 4.8, duration: '5 Days / 4 Nights', tourType: 'Spiritual',
    highlights: ['Ganga Aarti at Dashashwamedh Ghat', 'Sunrise boat ride on the Ganges', 'Kashi Vishwanath Temple visit', 'Sarnath — where Buddha gave his first sermon', 'Old city lanes and silk weaving workshops', 'Evening meditation session by the ghats'],
    facilities: ['Hotel Stay', 'Breakfast', 'Airport Pickup', 'Tour Guide', 'Transportation'],
    itinerary: [
      { day: 1, title: 'Arrival in Varanasi', description: 'Arrive at Varanasi airport. Evening Ganga Aarti at Dashashwamedh Ghat — a truly divine experience.' },
      { day: 2, title: 'Sunrise on the Ganges', description: 'Pre-dawn boat ride to witness sunrise over the ghats. Visit Manikarnika Ghat and Assi Ghat.' },
      { day: 3, title: 'Temples & Old City', description: 'Visit Kashi Vishwanath Temple, Durga Temple, Sankat Mochan. Explore silk weaving workshops.' },
      { day: 4, title: 'Sarnath Day Trip', description: 'Visit Sarnath — Dhamek Stupa, Mulagandhakuti Vihara, and the Sarnath Museum.' },
      { day: 5, title: 'Departure', description: 'Morning meditation by the ghats. Transfer to airport for departure.' },
    ],
    reviews: [
      { name: 'Ananya Iyer', avatar: 'https://i.pravatar.cc/60?img=23', rating: 5, comment: 'The Ganga Aarti moved me to tears. Varanasi is a deeply spiritual experience unlike anything else.', date: 'March 2024' },
      { name: 'Suresh Kumar', avatar: 'https://i.pravatar.cc/60?img=25', rating: 5, comment: 'The sunrise boat ride was magical. Our guide\'s knowledge of Varanasi\'s history was incredible.', date: 'February 2024' },
    ],
  },
  {
    title: 'Andaman Island Escape', destination: 'Port Blair', country: 'India',
    images: [
      'https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=800&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
      'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    ],
    description: "Escape to the pristine paradise of the Andaman Islands — India's best-kept secret. Crystal-clear turquoise waters, vibrant coral reefs, white sand beaches, and lush tropical forests await. Snorkel with sea turtles at Havelock Island, witness bioluminescence at night, and explore the historic Cellular Jail.",
    price: 27999, rating: 4.8, duration: '7 Days / 6 Nights', tourType: 'Beach',
    highlights: ['Radhanagar Beach — Asia\'s best beach', 'Snorkeling and scuba diving at Havelock', 'Bioluminescent beach experience at night', 'Cellular Jail light and sound show', 'Glass-bottom boat ride at Elephant Beach', 'Neil Island day trip'],
    facilities: ['Hotel Stay', 'Breakfast', 'Airport Pickup', 'Tour Guide', 'Transportation'],
    itinerary: [
      { day: 1, title: 'Arrival in Port Blair', description: 'Arrive at Port Blair. Visit Cellular Jail and attend the evening light and sound show.' },
      { day: 2, title: 'Port Blair Sightseeing', description: 'Visit Corbyn\'s Cove Beach, Anthropological Museum, and Chatham Saw Mill.' },
      { day: 3, title: 'Havelock Island', description: 'Ferry to Havelock. Check-in to beach resort. Evening at Radhanagar Beach (Asia\'s best beach).' },
      { day: 4, title: 'Snorkeling & Diving', description: 'Snorkeling at Elephant Beach. Optional scuba diving. Bioluminescent beach walk at night.' },
      { day: 5, title: 'Neil Island', description: 'Day trip to Neil Island. Visit Natural Bridge, Bharatpur Beach, and Laxmanpur Beach.' },
      { day: 6, title: 'Leisure at Havelock', description: 'Kayaking through mangroves, beach volleyball, and sunset at Kalapathar Beach.' },
      { day: 7, title: 'Departure', description: 'Ferry back to Port Blair. Transfer to airport for departure.' },
    ],
    reviews: [
      { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/60?img=29', rating: 5, comment: 'Radhanagar Beach is the most beautiful beach I\'ve ever seen. The bioluminescence was magical!', date: 'January 2024' },
      { name: 'Karan Malhotra', avatar: 'https://i.pravatar.cc/60?img=31', rating: 5, comment: 'Scuba diving in Andaman was a life-changing experience. The coral reefs are stunning!', date: 'December 2023' },
    ],
  },
  {
    title: 'Himachal Hill Stations Tour', destination: 'Shimla', country: 'India',
    images: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    ],
    description: "Explore the queen of hill stations and beyond on this Himachal Pradesh tour. From the colonial charm of Shimla to the hippie paradise of Kasol, the apple orchards of Manali, and the snow-capped peaks of Rohtang Pass — this tour covers the best of the Himalayas in one unforgettable journey.",
    price: 19999, rating: 4.7, duration: '8 Days / 7 Nights', tourType: 'Adventure',
    highlights: ['Shimla Mall Road and Christ Church', 'Rohtang Pass snow experience', 'Solang Valley adventure sports', 'Kasol and Kheerganga trek', 'Hadimba Temple in Manali', 'River rafting on Beas River'],
    facilities: ['Hotel Stay', 'Breakfast', 'Airport Pickup', 'Tour Guide', 'Transportation'],
    itinerary: [
      { day: 1, title: 'Arrival in Shimla', description: 'Arrive at Shimla. Walk on Mall Road, visit Christ Church and Jakhu Temple.' },
      { day: 2, title: 'Shimla to Manali', description: 'Scenic drive through Kullu Valley. Stop at Kullu Shawl factories and Pandoh Dam.' },
      { day: 3, title: 'Manali Sightseeing', description: 'Visit Hadimba Temple, Manu Temple, Vashisht hot springs, and Old Manali village.' },
      { day: 4, title: 'Rohtang Pass', description: 'Day trip to Rohtang Pass (3,978m). Snow activities, skiing, and panoramic Himalayan views.' },
      { day: 5, title: 'Solang Valley', description: 'Adventure sports at Solang Valley — paragliding, zorbing, and river crossing.' },
      { day: 6, title: 'Kasol & Kheerganga', description: 'Drive to Kasol. Trek to Kheerganga hot springs through pine forests.' },
      { day: 7, title: 'River Rafting', description: 'White water rafting on Beas River. Evening bonfire and local Himachali dinner.' },
      { day: 8, title: 'Departure', description: 'Drive to Chandigarh airport for departure.' },
    ],
    reviews: [
      { name: 'Neha Gupta', avatar: 'https://i.pravatar.cc/60?img=33', rating: 5, comment: 'Rohtang Pass was a dream come true! The snow, the mountains, the fresh air — absolutely magical.', date: 'May 2024' },
      { name: 'Amit Joshi', avatar: 'https://i.pravatar.cc/60?img=35', rating: 4, comment: 'Kasol is a hidden gem. The Kheerganga trek was challenging but the hot springs were worth it!', date: 'April 2024' },
    ],
  },
  {
    title: 'Golden Triangle Classic', destination: 'Delhi', country: 'India',
    images: [
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80',
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80',
    ],
    description: "India's most iconic circuit — Delhi, Agra, and Jaipur. Stand before the magnificent Taj Mahal at sunrise, explore the Mughal grandeur of Delhi's Red Fort, and lose yourself in the pink-walled lanes of Jaipur. The Golden Triangle is the perfect introduction to the incredible diversity of India.",
    price: 17999, rating: 4.8, duration: '6 Days / 5 Nights', tourType: 'Heritage',
    highlights: ['Taj Mahal at sunrise — Wonder of the World', 'Red Fort and Qutub Minar in Delhi', 'Agra Fort and Fatehpur Sikri', 'Amber Fort and City Palace in Jaipur', 'Rickshaw ride through Old Delhi', 'Mehtab Bagh — Taj Mahal sunset view'],
    facilities: ['Hotel Stay', 'Breakfast', 'Airport Pickup', 'Tour Guide', 'Transportation'],
    itinerary: [
      { day: 1, title: 'Arrival in Delhi', description: 'Arrive in Delhi. Visit India Gate, Humayun\'s Tomb, and Qutub Minar.' },
      { day: 2, title: 'Old & New Delhi', description: 'Red Fort, Jama Masjid, rickshaw ride through Chandni Chowk, and Lotus Temple.' },
      { day: 3, title: 'Delhi to Agra', description: 'Drive to Agra. Visit Agra Fort and Mehtab Bagh for sunset view of Taj Mahal.' },
      { day: 4, title: 'Taj Mahal Sunrise', description: 'Pre-dawn visit to Taj Mahal for the magical sunrise. Visit Fatehpur Sikri en route to Jaipur.' },
      { day: 5, title: 'Jaipur Exploration', description: 'Amber Fort elephant ride, City Palace, Jantar Mantar, and Hawa Mahal.' },
      { day: 6, title: 'Departure from Jaipur', description: 'Morning at Johari Bazaar for shopping. Transfer to Jaipur airport.' },
    ],
    reviews: [
      { name: 'Riya Kapoor', avatar: 'https://i.pravatar.cc/60?img=37', rating: 5, comment: 'The Taj Mahal at sunrise was the most beautiful thing I have ever seen. Truly a wonder!', date: 'February 2024' },
      { name: 'Sanjay Tiwari', avatar: 'https://i.pravatar.cc/60?img=39', rating: 5, comment: 'The Golden Triangle covers so much of India\'s history. Our guide was incredibly knowledgeable.', date: 'January 2024' },
    ],
  },
  {
    title: 'Meghalaya & Northeast Explorer', destination: 'Shillong', country: 'India',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
    ],
    description: "Explore the Scotland of the East — Meghalaya, the abode of clouds. Trek to living root bridges in Cherrapunji, swim in crystal-clear rivers, explore the cleanest village in Asia, and witness the world's wettest place. Northeast India is a treasure trove of natural wonders and tribal culture.",
    price: 22999, rating: 4.8, duration: '7 Days / 6 Nights', tourType: 'Adventure',
    highlights: ['Double Decker Living Root Bridge trek', 'Dawki River — crystal clear waters', 'Mawlynnong — Asia\'s cleanest village', 'Nohkalikai Falls — India\'s tallest plunge waterfall', 'Elephant Falls and Ward\'s Lake in Shillong', 'Kaziranga National Park rhino safari'],
    facilities: ['Hotel Stay', 'Breakfast', 'Airport Pickup', 'Tour Guide', 'Transportation'],
    itinerary: [
      { day: 1, title: 'Arrival in Guwahati', description: 'Arrive at Guwahati airport. Visit Kamakhya Temple. Drive to Shillong.' },
      { day: 2, title: 'Shillong Sightseeing', description: 'Visit Ward\'s Lake, Elephant Falls, Don Bosco Museum, and Shillong Peak.' },
      { day: 3, title: 'Cherrapunji', description: 'Visit Nohkalikai Falls, Seven Sisters Falls, Mawsmai Cave, and Eco Park.' },
      { day: 4, title: 'Living Root Bridge Trek', description: 'Trek to the iconic Double Decker Living Root Bridge at Nongriat village.' },
      { day: 5, title: 'Dawki & Mawlynnong', description: 'Boat ride on crystal-clear Dawki River. Visit Mawlynnong — Asia\'s cleanest village.' },
      { day: 6, title: 'Kaziranga National Park', description: 'Elephant safari and jeep safari in Kaziranga. Spot one-horned rhinos and elephants.' },
      { day: 7, title: 'Departure from Guwahati', description: 'Drive to Guwahati airport for departure.' },
    ],
    reviews: [
      { name: 'Ishaan Bose', avatar: 'https://i.pravatar.cc/60?img=41', rating: 5, comment: 'The Living Root Bridge trek was incredible! Meghalaya is India\'s most underrated destination.', date: 'October 2024' },
      { name: 'Tanvi Reddy', avatar: 'https://i.pravatar.cc/60?img=43', rating: 5, comment: 'Dawki River is unbelievably clear — you can see the bottom! Northeast India is magical.', date: 'September 2024' },
    ],
  },
  {
    title: 'Ranthambore Wildlife Safari', destination: 'Ranthambore', country: 'India',
    images: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
      'https://images.unsplash.com/photo-1504173010664-32509107de5f?w=800&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80',
    ],
    description: "Embark on a thrilling wildlife safari in Ranthambore — one of India's best tiger reserves. Spot the majestic Royal Bengal Tiger in its natural habitat, explore the ancient Ranthambore Fort inside the jungle, and witness diverse wildlife including leopards, sloth bears, and hundreds of bird species.",
    price: 18999, rating: 4.7, duration: '5 Days / 4 Nights', tourType: 'Wildlife',
    highlights: ['Royal Bengal Tiger safari', 'Ranthambore Fort — inside the jungle', 'Leopard and sloth bear spotting', 'Bird watching — 300+ species', 'Jeep and Canter safari options', 'Keoladeo Bird Sanctuary in Bharatpur'],
    facilities: ['Hotel Stay', 'Breakfast', 'Airport Pickup', 'Tour Guide', 'Transportation'],
    itinerary: [
      { day: 1, title: 'Arrival in Ranthambore', description: 'Arrive at Sawai Madhopur. Check-in to jungle resort. Evening nature walk.' },
      { day: 2, title: 'Morning & Evening Safari', description: 'Two game drives in Ranthambore National Park. Best chance to spot tigers near lakes.' },
      { day: 3, title: 'Ranthambore Fort', description: 'Morning safari. Afternoon visit to Ranthambore Fort — a UNESCO World Heritage Site.' },
      { day: 4, title: 'Bharatpur Bird Sanctuary', description: 'Drive to Keoladeo National Park. Cycle rickshaw through the bird sanctuary.' },
      { day: 5, title: 'Departure', description: 'Final morning safari. Transfer to Jaipur airport for departure.' },
    ],
    reviews: [
      { name: 'Deepak Nair', avatar: 'https://i.pravatar.cc/60?img=45', rating: 5, comment: 'We spotted a tigress with her cubs on day 2! Ranthambore is absolutely incredible.', date: 'November 2023' },
      { name: 'Kavya Menon', avatar: 'https://i.pravatar.cc/60?img=47', rating: 4, comment: 'The jungle resort was amazing and the guides were very knowledgeable about wildlife.', date: 'October 2023' },
    ],
  },
  {
    title: 'Rishikesh Yoga & Adventure', destination: 'Rishikesh', country: 'India',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
    ],
    description: "Find your balance in Rishikesh — the Yoga Capital of the World. Combine spiritual rejuvenation with thrilling adventure on the banks of the sacred Ganges. Practice yoga at sunrise, raft through Grade 4 rapids, bungee jump from India's highest platform, and attend the magical Ganga Aarti at Triveni Ghat.",
    price: 11999, rating: 4.8, duration: '5 Days / 4 Nights', tourType: 'Adventure',
    highlights: ['White water rafting on the Ganges', 'Bungee jumping — India\'s highest at 83m', 'Sunrise yoga and meditation sessions', 'Ganga Aarti at Triveni Ghat', 'Beatles Ashram visit', 'Neelkanth Mahadev Temple trek'],
    facilities: ['Hotel Stay', 'Breakfast', 'Airport Pickup', 'Tour Guide', 'Transportation'],
    itinerary: [
      { day: 1, title: 'Arrival in Rishikesh', description: 'Arrive in Rishikesh. Evening Ganga Aarti at Triveni Ghat. Walk on Laxman Jhula.' },
      { day: 2, title: 'Yoga & Meditation', description: 'Sunrise yoga session. Visit Parmarth Niketan Ashram. Beatles Ashram exploration.' },
      { day: 3, title: 'White Water Rafting', description: '16km rafting from Shivpuri to Rishikesh through Grade 3-4 rapids. Cliff jumping.' },
      { day: 4, title: 'Bungee & Adventure', description: 'Bungee jumping at Jumpin Heights (83m). Giant swing and flying fox activities.' },
      { day: 5, title: 'Departure', description: 'Morning meditation. Trek to Neelkanth Mahadev Temple. Transfer to Dehradun airport.' },
    ],
    reviews: [
      { name: 'Aryan Kapoor', avatar: 'https://i.pravatar.cc/60?img=49', rating: 5, comment: 'The bungee jump was terrifying and exhilarating! Rishikesh is the perfect mix of adventure and peace.', date: 'August 2024' },
      { name: 'Meera Joshi', avatar: 'https://i.pravatar.cc/60?img=51', rating: 5, comment: 'The sunrise yoga by the Ganges was the most peaceful experience of my life. Highly recommend!', date: 'July 2024' },
    ],
  },
  {
    title: 'Coorg Coffee & Nature Retreat', destination: 'Coorg', country: 'India',
    images: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
      'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
    ],
    description: "Escape to the Scotland of India — Coorg, Karnataka's most beautiful hill station. Walk through aromatic coffee and spice plantations, trek to misty waterfalls, spot elephants at Nagarhole National Park, and experience the warm hospitality of the Kodava people. A perfect nature retreat.",
    price: 15999, rating: 4.7, duration: '5 Days / 4 Nights', tourType: 'Family',
    highlights: ['Coffee plantation walk and tasting', 'Abbey Falls and Iruppu Falls trek', 'Nagarhole National Park safari', 'Raja\'s Seat sunset viewpoint', 'Dubare Elephant Camp', 'Talakaveri — source of River Cauvery'],
    facilities: ['Hotel Stay', 'Breakfast', 'Airport Pickup', 'Tour Guide', 'Transportation'],
    itinerary: [
      { day: 1, title: 'Arrival in Coorg', description: 'Arrive at Madikeri. Check-in to coffee estate resort. Evening at Raja\'s Seat viewpoint.' },
      { day: 2, title: 'Coffee Plantation Tour', description: 'Guided walk through coffee and spice plantations. Coffee tasting session. Visit Abbey Falls.' },
      { day: 3, title: 'Nagarhole Safari', description: 'Jeep safari in Nagarhole National Park. Spot elephants, deer, and leopards.' },
      { day: 4, title: 'Dubare & Talakaveri', description: 'Elephant bathing at Dubare Elephant Camp. Visit Talakaveri and Bhagamandala temple.' },
      { day: 5, title: 'Departure', description: 'Morning nature walk. Transfer to Mysore or Mangalore airport for departure.' },
    ],
    reviews: [
      { name: 'Sunita Rao', avatar: 'https://i.pravatar.cc/60?img=53', rating: 5, comment: 'Coorg is absolutely stunning! The coffee plantation stay was unique and the safari was amazing.', date: 'June 2024' },
      { name: 'Rajesh Nambiar', avatar: 'https://i.pravatar.cc/60?img=55', rating: 4, comment: 'The elephant camp was the highlight for our kids. Coorg is perfect for a family getaway!', date: 'May 2024' },
    ],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    await Tour.deleteMany({});
    console.log('🗑️  Cleared existing tours');
    await Tour.insertMany(tours);
    console.log(`🌱 Seeded ${tours.length} Indian tours successfully`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDB();
