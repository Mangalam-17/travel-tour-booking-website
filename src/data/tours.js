const tours = [
  {
    id: 1,
    title: "Bali Paradise Escape",
    destination: "Bali",
    country: "Indonesia",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80"
    ],
    description: "Experience the magic of Bali with its stunning temples, lush rice terraces, and pristine beaches. This all-inclusive package takes you through the cultural heart of Ubud, the surf paradise of Seminyak, and the spiritual serenity of Tanah Lot. Immerse yourself in Balinese traditions, enjoy world-class spa treatments, and savor authentic local cuisine.",
    price: 1299,
    rating: 4.8,
    duration: "7 Days / 6 Nights",
    tourType: "Beach",
    highlights: [
      "Visit the iconic Tanah Lot Temple at sunset",
      "Explore the Tegallalang Rice Terraces",
      "Traditional Balinese cooking class",
      "Sunset cruise along the coast",
      "Ubud Monkey Forest visit",
      "Kecak fire dance performance"
    ],
    facilities: ["Hotel Stay", "Breakfast", "Airport Pickup", "Tour Guide", "Transportation"],
    itinerary: [
      { day: 1, title: "Arrival & Seminyak", description: "Arrive at Ngurah Rai Airport, transfer to hotel. Evening at leisure on Seminyak Beach." },
      { day: 2, title: "Ubud Cultural Tour", description: "Visit Tegallalang Rice Terraces, Ubud Palace, and the famous Monkey Forest." },
      { day: 3, title: "Temple Trail", description: "Explore Tanah Lot, Uluwatu Temple, and enjoy a Kecak fire dance at sunset." },
      { day: 4, title: "Adventure Day", description: "White water rafting on the Ayung River, followed by a traditional Balinese spa." },
      { day: 5, title: "Cooking & Culture", description: "Morning cooking class, afternoon visit to Batuan Temple and local art villages." },
      { day: 6, title: "Beach & Leisure", description: "Free day at Nusa Dua Beach. Optional water sports and sunset dinner cruise." },
      { day: 7, title: "Departure", description: "Breakfast at hotel, last-minute shopping, transfer to airport." }
    ],
    reviews: [
      { id: 1, name: "Sarah Johnson", avatar: "https://i.pravatar.cc/60?img=1", rating: 5, comment: "Absolutely magical trip! The guide was knowledgeable and the hotels were stunning.", date: "March 2024" },
      { id: 2, name: "Mike Chen", avatar: "https://i.pravatar.cc/60?img=3", rating: 5, comment: "Best vacation of my life. Bali is breathtaking and this package covered everything perfectly.", date: "February 2024" },
      { id: 3, name: "Emma Wilson", avatar: "https://i.pravatar.cc/60?img=5", rating: 4, comment: "Great experience overall. The rice terraces were stunning. Would highly recommend!", date: "January 2024" }
    ]
  },
  {
    id: 2,
    title: "Swiss Alps Adventure",
    destination: "Zurich",
    country: "Switzerland",
    images: [
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80"
    ],
    description: "Conquer the majestic Swiss Alps with this thrilling adventure package. From skiing on pristine slopes to hiking through breathtaking mountain trails, this journey offers the ultimate alpine experience. Stay in charming mountain chalets, explore medieval towns, and witness some of Europe's most spectacular scenery.",
    price: 2899,
    rating: 4.9,
    duration: "8 Days / 7 Nights",
    tourType: "Adventure",
    highlights: [
      "Skiing on world-famous Jungfrau slopes",
      "Scenic train ride on the Glacier Express",
      "Visit the Matterhorn viewpoint",
      "Paragliding over Interlaken",
      "Explore medieval old town of Bern",
      "Swiss chocolate and cheese factory tour"
    ],
    facilities: ["Hotel Stay", "Breakfast", "Airport Pickup", "Tour Guide", "Transportation"],
    itinerary: [
      { day: 1, title: "Arrival in Zurich", description: "Arrive in Zurich, transfer to hotel. Evening city walk along Lake Zurich." },
      { day: 2, title: "Zurich to Interlaken", description: "Scenic train journey to Interlaken. Afternoon paragliding or boat ride on Lake Thun." },
      { day: 3, title: "Jungfraujoch", description: "Full day excursion to the 'Top of Europe' - Jungfraujoch at 3,454m altitude." },
      { day: 4, title: "Zermatt & Matterhorn", description: "Travel to Zermatt, iconic views of the Matterhorn, evening in the car-free village." },
      { day: 5, title: "Skiing Day", description: "Full day skiing or snowboarding on Zermatt's world-class slopes." },
      { day: 6, title: "Glacier Express", description: "Scenic Glacier Express train journey through the Alps to St. Moritz." },
      { day: 7, title: "Bern & Lucerne", description: "Visit the Swiss capital Bern and the beautiful lakeside city of Lucerne." },
      { day: 8, title: "Departure", description: "Transfer back to Zurich airport for departure." }
    ],
    reviews: [
      { id: 1, name: "David Park", avatar: "https://i.pravatar.cc/60?img=7", rating: 5, comment: "The Alps are absolutely stunning. Skiing was incredible and the chalets were cozy.", date: "February 2024" },
      { id: 2, name: "Lisa Anderson", avatar: "https://i.pravatar.cc/60?img=9", rating: 5, comment: "Jungfraujoch was a once-in-a-lifetime experience. Everything was perfectly organized.", date: "January 2024" }
    ]
  },
  {
    id: 3,
    title: "Maldives Luxury Retreat",
    destination: "Malé",
    country: "Maldives",
    images: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&q=80",
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80"
    ],
    description: "Indulge in the ultimate luxury escape to the Maldives. Stay in an overwater bungalow surrounded by crystal-clear turquoise waters, vibrant coral reefs, and pristine white sand beaches. This exclusive package offers world-class dining, private snorkeling excursions, and unparalleled relaxation in paradise.",
    price: 3499,
    rating: 5.0,
    duration: "6 Days / 5 Nights",
    tourType: "Luxury",
    highlights: [
      "Overwater bungalow accommodation",
      "Private snorkeling in coral reefs",
      "Sunset dolphin watching cruise",
      "Underwater restaurant dining",
      "Couples spa treatment",
      "Private beach picnic"
    ],
    facilities: ["Hotel Stay", "Breakfast", "Airport Pickup", "Tour Guide", "Transportation"],
    itinerary: [
      { day: 1, title: "Arrival in Paradise", description: "Arrive at Malé, seaplane transfer to your private island resort. Welcome cocktails and sunset viewing." },
      { day: 2, title: "Ocean Exploration", description: "Morning snorkeling in the house reef, afternoon glass-bottom boat tour, evening beach dinner." },
      { day: 3, title: "Water Sports Day", description: "Jet skiing, windsurfing, kayaking, and paddleboarding. Afternoon spa treatment." },
      { day: 4, title: "Island Hopping", description: "Visit local Maldivian islands, explore fishing villages, and enjoy a traditional lunch." },
      { day: 5, title: "Relaxation & Romance", description: "Private beach picnic, couples massage, sunset dolphin cruise, underwater restaurant dinner." },
      { day: 6, title: "Departure", description: "Final morning swim, seaplane transfer back to Malé for departure." }
    ],
    reviews: [
      { id: 1, name: "James & Sophie", avatar: "https://i.pravatar.cc/60?img=11", rating: 5, comment: "Absolute perfection. The overwater bungalow was a dream. Worth every penny!", date: "April 2024" },
      { id: 2, name: "Rachel Kim", avatar: "https://i.pravatar.cc/60?img=13", rating: 5, comment: "The most beautiful place I've ever been. The underwater restaurant was surreal.", date: "March 2024" }
    ]
  },
  {
    id: 4,
    title: "Serengeti Wildlife Safari",
    destination: "Serengeti",
    country: "Tanzania",
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
      "https://images.unsplash.com/photo-1504173010664-32509107de5f?w=800&q=80",
      "https://images.unsplash.com/photo-1551009175-15bdf9dcb580?w=800&q=80"
    ],
    description: "Witness the greatest wildlife spectacle on Earth in the Serengeti. This premium safari package takes you deep into the African wilderness to witness the Great Migration, spot the Big Five, and experience the raw beauty of the savanna. Stay in luxury tented camps under a canopy of stars.",
    price: 4199,
    rating: 4.9,
    duration: "9 Days / 8 Nights",
    tourType: "Wildlife",
    highlights: [
      "Witness the Great Wildebeest Migration",
      "Big Five game drives",
      "Hot air balloon safari at sunrise",
      "Visit Ngorongoro Crater",
      "Maasai village cultural experience",
      "Night game drive"
    ],
    facilities: ["Hotel Stay", "Breakfast", "Airport Pickup", "Tour Guide", "Transportation"],
    itinerary: [
      { day: 1, title: "Arrival in Arusha", description: "Arrive at Kilimanjaro Airport, transfer to Arusha. Safari briefing and welcome dinner." },
      { day: 2, title: "Tarangire National Park", description: "Full day game drive in Tarangire, famous for its elephant herds and baobab trees." },
      { day: 3, title: "Ngorongoro Crater", description: "Descend into the world's largest intact volcanic caldera, home to 25,000 animals." },
      { day: 4, title: "Enter the Serengeti", description: "Drive into the Serengeti, afternoon game drive, overnight in luxury tented camp." },
      { day: 5, title: "Great Migration", description: "Full day tracking the Great Migration. Witness thousands of wildebeest crossing rivers." },
      { day: 6, title: "Balloon Safari", description: "Pre-dawn hot air balloon flight over the Serengeti, champagne breakfast on the plains." },
      { day: 7, title: "Central Serengeti", description: "Game drives in the Seronera Valley, famous for leopard and lion sightings." },
      { day: 8, title: "Maasai Culture", description: "Visit a traditional Maasai village, learn about their customs and way of life." },
      { day: 9, title: "Departure", description: "Morning game drive, transfer to Arusha for departure flight." }
    ],
    reviews: [
      { id: 1, name: "Thomas Brown", avatar: "https://i.pravatar.cc/60?img=15", rating: 5, comment: "The Great Migration was beyond words. Our guide was exceptional. Life-changing trip!", date: "July 2024" },
      { id: 2, name: "Maria Garcia", avatar: "https://i.pravatar.cc/60?img=17", rating: 5, comment: "Saw all Big Five on day 2! The tented camps were surprisingly luxurious.", date: "June 2024" }
    ]
  },
  {
    id: 5,
    title: "Santorini Honeymoon Bliss",
    destination: "Santorini",
    country: "Greece",
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800&q=80"
    ],
    description: "Celebrate your love in the most romantic destination on Earth. Santorini's iconic white-washed buildings, blue-domed churches, and breathtaking caldera views create the perfect backdrop for your honeymoon. Enjoy private sunset dinners, wine tasting, and luxury cave hotel accommodations.",
    price: 2599,
    rating: 4.9,
    duration: "7 Days / 6 Nights",
    tourType: "Honeymoon",
    highlights: [
      "Stay in iconic cave hotel with caldera views",
      "Private sunset dinner in Oia",
      "Catamaran cruise around the island",
      "Wine tasting at local vineyards",
      "Akrotiri archaeological site visit",
      "Couples photography session"
    ],
    facilities: ["Hotel Stay", "Breakfast", "Airport Pickup", "Tour Guide", "Transportation"],
    itinerary: [
      { day: 1, title: "Arrival in Santorini", description: "Arrive at Santorini Airport, transfer to cave hotel. Welcome champagne and sunset viewing." },
      { day: 2, title: "Oia & Fira Exploration", description: "Explore the iconic villages of Oia and Fira, sunset dinner at a cliffside restaurant." },
      { day: 3, title: "Catamaran Cruise", description: "Full day private catamaran cruise, snorkeling in volcanic hot springs, BBQ on board." },
      { day: 4, title: "Wine & Culture", description: "Visit Santo Wines for tasting, explore Akrotiri ruins, afternoon at Red Beach." },
      { day: 5, title: "Perissa & Kamari", description: "Relax on black sand beaches, water sports, romantic beachside dinner." },
      { day: 6, title: "Couples Spa Day", description: "Luxury spa treatments, private photography session, farewell dinner with caldera views." },
      { day: 7, title: "Departure", description: "Final morning stroll through Oia, transfer to airport." }
    ],
    reviews: [
      { id: 1, name: "Alex & Nina", avatar: "https://i.pravatar.cc/60?img=19", rating: 5, comment: "The most romantic trip imaginable. The cave hotel views were absolutely stunning!", date: "May 2024" },
      { id: 2, name: "Chris Taylor", avatar: "https://i.pravatar.cc/60?img=21", rating: 5, comment: "Perfect honeymoon destination. Every detail was taken care of. Highly recommend!", date: "April 2024" }
    ]
  },
  {
    id: 6,
    title: "Tokyo Cultural Immersion",
    destination: "Tokyo",
    country: "Japan",
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
      "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&q=80",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&q=80"
    ],
    description: "Dive deep into the fascinating blend of ancient tradition and futuristic innovation that makes Tokyo one of the world's most captivating cities. From serene temples and tea ceremonies to neon-lit streets and cutting-edge technology, this cultural immersion package offers an unforgettable Japanese experience.",
    price: 2199,
    rating: 4.7,
    duration: "8 Days / 7 Nights",
    tourType: "Family",
    highlights: [
      "Tsukiji Fish Market morning tour",
      "Traditional tea ceremony experience",
      "Day trip to Mount Fuji",
      "Akihabara electronics district",
      "Shibuya Crossing and Harajuku",
      "Sumo wrestling match attendance"
    ],
    facilities: ["Hotel Stay", "Breakfast", "Airport Pickup", "Tour Guide", "Transportation"],
    itinerary: [
      { day: 1, title: "Arrival in Tokyo", description: "Arrive at Narita Airport, Shinkansen to city center, check-in and evening Shinjuku walk." },
      { day: 2, title: "Traditional Tokyo", description: "Senso-ji Temple, Asakusa district, tea ceremony, Ueno Park and museums." },
      { day: 3, title: "Modern Tokyo", description: "Shibuya Crossing, Harajuku, Omotesando, Akihabara electronics and anime district." },
      { day: 4, title: "Mount Fuji Day Trip", description: "Full day excursion to Mount Fuji and Hakone, views of the iconic peak, hot spring bath." },
      { day: 5, title: "Tsukiji & Ginza", description: "Early morning Tsukiji market tour, sushi breakfast, afternoon luxury shopping in Ginza." },
      { day: 6, title: "Kyoto Day Trip", description: "Shinkansen to Kyoto, Fushimi Inari shrine, Arashiyama bamboo grove, return to Tokyo." },
      { day: 7, title: "Sumo & Nightlife", description: "Sumo wrestling match, Roppongi nightlife, Tokyo Tower night views." },
      { day: 8, title: "Departure", description: "Final morning in Shinjuku, transfer to airport." }
    ],
    reviews: [
      { id: 1, name: "Kevin Lee", avatar: "https://i.pravatar.cc/60?img=23", rating: 5, comment: "Tokyo exceeded all expectations. The guide knew every hidden gem in the city!", date: "March 2024" },
      { id: 2, name: "Amanda Foster", avatar: "https://i.pravatar.cc/60?img=25", rating: 4, comment: "Amazing cultural experience. The tea ceremony and Mount Fuji were highlights.", date: "February 2024" }
    ]
  },
  {
    id: 7,
    title: "Amazon Rainforest Expedition",
    destination: "Manaus",
    country: "Brazil",
    images: [
      "https://images.unsplash.com/photo-1518182170546-07661fd94144?w=800&q=80",
      "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80",
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
    ],
    description: "Venture into the world's largest tropical rainforest on this extraordinary expedition. Navigate the mighty Amazon River, encounter exotic wildlife, and stay in eco-lodges deep in the jungle. Learn from indigenous communities and discover the incredible biodiversity of this irreplaceable ecosystem.",
    price: 1899,
    rating: 4.6,
    duration: "7 Days / 6 Nights",
    tourType: "Adventure",
    highlights: [
      "Amazon River boat expedition",
      "Pink river dolphin spotting",
      "Night jungle walk",
      "Indigenous community visit",
      "Piranha fishing experience",
      "Canopy walkway through treetops"
    ],
    facilities: ["Hotel Stay", "Breakfast", "Airport Pickup", "Tour Guide", "Transportation"],
    itinerary: [
      { day: 1, title: "Arrival in Manaus", description: "Arrive in Manaus, transfer to eco-lodge by boat. Evening orientation and jungle briefing." },
      { day: 2, title: "Amazon River Exploration", description: "Morning boat tour, Meeting of the Waters, afternoon wildlife spotting along riverbanks." },
      { day: 3, title: "Deep Jungle Trek", description: "Full day jungle trek with expert guide, identify medicinal plants, spot exotic birds." },
      { day: 4, title: "Indigenous Culture", description: "Visit Yanomami community, learn traditional crafts, participate in cultural ceremonies." },
      { day: 5, title: "Wildlife Day", description: "Pink dolphin swimming, piranha fishing, caiman spotting at night." },
      { day: 6, title: "Canopy & Kayaking", description: "Treetop canopy walkway, kayaking through flooded forest, sunset on the river." },
      { day: 7, title: "Departure", description: "Morning bird watching, boat transfer back to Manaus, departure flight." }
    ],
    reviews: [
      { id: 1, name: "Robert Hayes", avatar: "https://i.pravatar.cc/60?img=27", rating: 5, comment: "The most adventurous trip I've ever taken. Swimming with pink dolphins was surreal!", date: "August 2024" },
      { id: 2, name: "Priya Sharma", avatar: "https://i.pravatar.cc/60?img=29", rating: 4, comment: "Incredible biodiversity. The indigenous community visit was deeply moving.", date: "July 2024" }
    ]
  },
  {
    id: 8,
    title: "Dubai Luxury Experience",
    destination: "Dubai",
    country: "UAE",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80",
      "https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=800&q=80"
    ],
    description: "Experience the pinnacle of modern luxury in Dubai, where futuristic architecture meets Arabian heritage. From the world's tallest building to golden desert dunes, this premium package showcases the best of this extraordinary city. Enjoy 5-star hotels, fine dining, and exclusive experiences.",
    price: 2799,
    rating: 4.8,
    duration: "6 Days / 5 Nights",
    tourType: "Luxury",
    highlights: [
      "Burj Khalifa observation deck",
      "Desert safari with dune bashing",
      "Dubai Mall and fountain show",
      "Dhow cruise dinner on Dubai Creek",
      "Palm Jumeirah and Atlantis visit",
      "Gold and Spice Souk exploration"
    ],
    facilities: ["Hotel Stay", "Breakfast", "Airport Pickup", "Tour Guide", "Transportation"],
    itinerary: [
      { day: 1, title: "Arrival in Dubai", description: "Arrive at Dubai International Airport, transfer to 5-star hotel. Evening Dubai Marina walk." },
      { day: 2, title: "Modern Dubai", description: "Burj Khalifa, Dubai Mall, Dubai Fountain show, Dubai Frame, City Walk." },
      { day: 3, title: "Desert Safari", description: "Afternoon desert safari with dune bashing, camel riding, BBQ dinner under the stars." },
      { day: 4, title: "Old Dubai", description: "Gold Souk, Spice Souk, Abra ride across Dubai Creek, Al Fahidi Historical District." },
      { day: 5, title: "Palm & Beach", description: "Palm Jumeirah monorail, Atlantis Aquaventure, JBR Beach, sunset at Burj Al Arab." },
      { day: 6, title: "Departure", description: "Morning at leisure, last-minute shopping, transfer to airport." }
    ],
    reviews: [
      { id: 1, name: "Jennifer Walsh", avatar: "https://i.pravatar.cc/60?img=31", rating: 5, comment: "Dubai is unlike anywhere else. The desert safari was the highlight of the trip!", date: "November 2023" },
      { id: 2, name: "Omar Abdullah", avatar: "https://i.pravatar.cc/60?img=33", rating: 5, comment: "Exceptional service throughout. The Burj Khalifa views at night were breathtaking.", date: "October 2023" }
    ]
  },
  {
    id: 9,
    title: "Machu Picchu Discovery",
    destination: "Cusco",
    country: "Peru",
    images: [
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80",
      "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=800&q=80",
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80",
      "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=800&q=80"
    ],
    description: "Trek to one of the world's most iconic archaeological wonders. This adventure package takes you through the Sacred Valley of the Incas, along the legendary Inca Trail, and to the breathtaking citadel of Machu Picchu. Experience ancient history, stunning Andean landscapes, and vibrant Peruvian culture.",
    price: 1799,
    rating: 4.8,
    duration: "8 Days / 7 Nights",
    tourType: "Adventure",
    highlights: [
      "Inca Trail trek to Machu Picchu",
      "Sacred Valley exploration",
      "Cusco city tour",
      "Sunrise at Machu Picchu",
      "Huayna Picchu mountain climb",
      "Traditional Peruvian cooking class"
    ],
    facilities: ["Hotel Stay", "Breakfast", "Airport Pickup", "Tour Guide", "Transportation"],
    itinerary: [
      { day: 1, title: "Arrival in Lima", description: "Arrive in Lima, transfer to hotel. Evening in Miraflores district, seafood dinner." },
      { day: 2, title: "Lima to Cusco", description: "Flight to Cusco, acclimatization day, gentle city walk, San Pedro Market visit." },
      { day: 3, title: "Sacred Valley", description: "Explore Pisac ruins and market, Ollantaytambo fortress, overnight in the valley." },
      { day: 4, title: "Inca Trail Day 1", description: "Begin the classic 4-day Inca Trail trek, pass through cloud forest and Inca ruins." },
      { day: 5, title: "Inca Trail Day 2", description: "Dead Woman's Pass (4,215m), most challenging day, stunning mountain views." },
      { day: 6, title: "Inca Trail Day 3", description: "Archaeological sites along the trail, cloud forest, arrive at Aguas Calientes." },
      { day: 7, title: "Machu Picchu", description: "Early morning entry to Machu Picchu, guided tour, optional Huayna Picchu climb." },
      { day: 8, title: "Return & Departure", description: "Train back to Cusco, transfer to airport for departure." }
    ],
    reviews: [
      { id: 1, name: "Carlos Mendez", avatar: "https://i.pravatar.cc/60?img=35", rating: 5, comment: "The Inca Trail was challenging but absolutely worth it. Machu Picchu at sunrise is magical!", date: "September 2024" },
      { id: 2, name: "Hannah Schmidt", avatar: "https://i.pravatar.cc/60?img=37", rating: 5, comment: "Best adventure of my life. Our guide's knowledge of Inca history was incredible.", date: "August 2024" }
    ]
  },
  {
    id: 10,
    title: "Amalfi Coast Family Holiday",
    destination: "Amalfi",
    country: "Italy",
    images: [
      "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800&q=80",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80",
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80",
      "https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=800&q=80"
    ],
    description: "Create unforgettable family memories along Italy's most spectacular coastline. The Amalfi Coast offers a perfect blend of stunning scenery, rich history, delicious food, and family-friendly activities. From colorful cliffside villages to crystal-clear Mediterranean waters, this is Italy at its finest.",
    price: 2299,
    rating: 4.7,
    duration: "7 Days / 6 Nights",
    tourType: "Family",
    highlights: [
      "Positano village exploration",
      "Boat tour along the coastline",
      "Pompeii archaeological site",
      "Limoncello making class",
      "Pizza making with local chef",
      "Capri island day trip"
    ],
    facilities: ["Hotel Stay", "Breakfast", "Airport Pickup", "Tour Guide", "Transportation"],
    itinerary: [
      { day: 1, title: "Arrival in Naples", description: "Arrive in Naples, transfer to Amalfi Coast hotel. Evening stroll in Amalfi town." },
      { day: 2, title: "Positano & Ravello", description: "Explore colorful Positano, hike the Path of the Gods, visit Ravello gardens." },
      { day: 3, title: "Pompeii & Herculaneum", description: "Full day at Pompeii archaeological site, visit Herculaneum ruins." },
      { day: 4, title: "Capri Day Trip", description: "Ferry to Capri, Blue Grotto, Villa San Michele, chairlift to Monte Solaro." },
      { day: 5, title: "Cooking & Culture", description: "Morning pizza making class, afternoon limoncello tasting, boat tour of the coast." },
      { day: 6, title: "Beach & Leisure", description: "Free day at Maiori Beach, optional kayaking, farewell dinner with sea views." },
      { day: 7, title: "Departure", description: "Transfer to Naples airport for departure." }
    ],
    reviews: [
      { id: 1, name: "The Martinez Family", avatar: "https://i.pravatar.cc/60?img=39", rating: 5, comment: "Perfect family vacation! Kids loved Pompeii and the pizza class. Stunning scenery.", date: "June 2024" },
      { id: 2, name: "Patricia Moore", avatar: "https://i.pravatar.cc/60?img=41", rating: 4, comment: "The Amalfi Coast is breathtaking. Capri was a highlight. Great family memories!", date: "May 2024" }
    ]
  },
  {
    id: 11,
    title: "Phuket Beach Paradise",
    destination: "Phuket",
    country: "Thailand",
    images: [
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&q=80",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
      "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
    ],
    description: "Discover the jewel of the Andaman Sea with this comprehensive Phuket package. From the famous Phi Phi Islands to the vibrant Patong Beach, experience Thailand's most beloved destination. Enjoy world-class diving, Thai massage, street food adventures, and the legendary Thai hospitality.",
    price: 999,
    rating: 4.6,
    duration: "6 Days / 5 Nights",
    tourType: "Beach",
    highlights: [
      "Phi Phi Islands boat tour",
      "Phang Nga Bay sea kayaking",
      "Scuba diving in Andaman Sea",
      "Thai cooking class",
      "Big Buddha and Wat Chalong",
      "Patong Beach nightlife"
    ],
    facilities: ["Hotel Stay", "Breakfast", "Airport Pickup", "Tour Guide", "Transportation"],
    itinerary: [
      { day: 1, title: "Arrival in Phuket", description: "Arrive at Phuket Airport, transfer to beachfront hotel. Evening at Patong Beach." },
      { day: 2, title: "Phi Phi Islands", description: "Full day speedboat tour to Phi Phi Islands, snorkeling, Maya Bay, beach BBQ." },
      { day: 3, title: "Phang Nga Bay", description: "James Bond Island, sea kayaking through limestone caves, floating village visit." },
      { day: 4, title: "Culture & Temples", description: "Big Buddha, Wat Chalong, Old Phuket Town, Thai cooking class in the evening." },
      { day: 5, title: "Diving & Leisure", description: "Morning scuba diving or snorkeling, afternoon Thai massage, Bangla Road evening." },
      { day: 6, title: "Departure", description: "Final morning at Kata Beach, transfer to airport." }
    ],
    reviews: [
      { id: 1, name: "Sophie Turner", avatar: "https://i.pravatar.cc/60?img=43", rating: 5, comment: "Phuket is paradise! The Phi Phi Islands were stunning and the food was incredible.", date: "January 2024" },
      { id: 2, name: "Mark Johnson", avatar: "https://i.pravatar.cc/60?img=45", rating: 4, comment: "Great value for money. The sea kayaking in Phang Nga Bay was unforgettable.", date: "December 2023" }
    ]
  },
  {
    id: 12,
    title: "Patagonia Wilderness Trek",
    destination: "Torres del Paine",
    country: "Chile",
    images: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80"
    ],
    description: "Explore the raw, untamed wilderness of Patagonia in this epic trekking adventure. Torres del Paine National Park offers some of the world's most dramatic landscapes, from soaring granite towers to turquoise glacial lakes. This challenging yet rewarding journey is for those who seek the extraordinary.",
    price: 2499,
    rating: 4.8,
    duration: "10 Days / 9 Nights",
    tourType: "Adventure",
    highlights: [
      "W Trek through Torres del Paine",
      "Perito Moreno Glacier walk",
      "Grey Glacier boat tour",
      "Condor and guanaco spotting",
      "Milodon Cave exploration",
      "Punta Arenas city tour"
    ],
    facilities: ["Hotel Stay", "Breakfast", "Airport Pickup", "Tour Guide", "Transportation"],
    itinerary: [
      { day: 1, title: "Arrival in Punta Arenas", description: "Arrive in Punta Arenas, city tour, Milodon Cave visit, transfer to Puerto Natales." },
      { day: 2, title: "Enter the Park", description: "Enter Torres del Paine, afternoon hike to Mirador Las Torres base." },
      { day: 3, title: "Las Torres", description: "Pre-dawn hike to the iconic Torres del Paine towers at sunrise." },
      { day: 4, title: "Valle del Francés", description: "Trek through the Valley of the French, hanging glaciers and condor sightings." },
      { day: 5, title: "Grey Glacier", description: "Boat tour on Grey Lake, walk on the glacier, stunning ice formations." },
      { day: 6, title: "Lago Pehoé", description: "Catamaran across Lago Pehoé, hike to Mirador Cuernos, camp under the stars." },
      { day: 7, title: "El Calafate", description: "Cross into Argentina, transfer to El Calafate, evening at leisure." },
      { day: 8, title: "Perito Moreno", description: "Full day at Perito Moreno Glacier, ice trekking, watch massive calving events." },
      { day: 9, title: "Estancia Day", description: "Visit a traditional Patagonian estancia, gaucho culture, lamb asado." },
      { day: 10, title: "Departure", description: "Transfer to El Calafate airport for departure." }
    ],
    reviews: [
      { id: 1, name: "Erik Larsson", avatar: "https://i.pravatar.cc/60?img=47", rating: 5, comment: "The most spectacular landscapes I've ever seen. Torres del Paine is otherworldly!", date: "November 2023" },
      { id: 2, name: "Natalie Brooks", avatar: "https://i.pravatar.cc/60?img=49", rating: 5, comment: "Challenging but absolutely worth it. The glacier walk was a highlight!", date: "October 2023" }
    ]
  },
  {
    id: 13,
    title: "Morocco Desert Adventure",
    destination: "Marrakech",
    country: "Morocco",
    images: [
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
      "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=800&q=80",
      "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&q=80"
    ],
    description: "Journey through the magical kingdom of Morocco, from the vibrant souks of Marrakech to the golden dunes of the Sahara Desert. Experience the rich tapestry of Berber culture, ancient medinas, and stunning desert landscapes. Sleep under a canopy of stars in a luxury desert camp.",
    price: 1399,
    rating: 4.7,
    duration: "8 Days / 7 Nights",
    tourType: "Adventure",
    highlights: [
      "Sahara Desert camel trek",
      "Overnight in luxury desert camp",
      "Marrakech medina exploration",
      "Atlas Mountains day trip",
      "Fes ancient medina tour",
      "Traditional hammam experience"
    ],
    facilities: ["Hotel Stay", "Breakfast", "Airport Pickup", "Tour Guide", "Transportation"],
    itinerary: [
      { day: 1, title: "Arrival in Marrakech", description: "Arrive in Marrakech, transfer to riad. Evening in Djemaa el-Fna square." },
      { day: 2, title: "Marrakech Medina", description: "Bahia Palace, Saadian Tombs, souks, Majorelle Garden, cooking class." },
      { day: 3, title: "Atlas Mountains", description: "Day trip to High Atlas, Berber villages, Ouzoud Waterfalls, mule trekking." },
      { day: 4, title: "Road to Sahara", description: "Drive through Draa Valley, Todra Gorge, arrive at Merzouga desert camp." },
      { day: 5, title: "Sahara Desert", description: "Sunrise camel trek, sandboarding, quad biking, stargazing in the desert." },
      { day: 6, title: "Fes Journey", description: "Drive through Middle Atlas, cedar forests with Barbary macaques, arrive in Fes." },
      { day: 7, title: "Ancient Fes", description: "Fes el-Bali medina, tanneries, Al-Qarawiyyin University, traditional hammam." },
      { day: 8, title: "Departure", description: "Transfer to Fes airport or return to Marrakech for departure." }
    ],
    reviews: [
      { id: 1, name: "Isabella Romano", avatar: "https://i.pravatar.cc/60?img=51", rating: 5, comment: "Morocco is magical! The Sahara night was the most beautiful experience of my life.", date: "April 2024" },
      { id: 2, name: "Daniel Wright", avatar: "https://i.pravatar.cc/60?img=53", rating: 4, comment: "Incredible culture and landscapes. The medinas are like stepping back in time.", date: "March 2024" }
    ]
  },
  {
    id: 14,
    title: "Maldives Family Splash",
    destination: "North Malé Atoll",
    country: "Maldives",
    images: [
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80",
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800&q=80"
    ],
    description: "A family-friendly Maldives escape designed for all ages. Enjoy snorkeling with sea turtles, building sandcastles on pristine beaches, and exploring vibrant coral reefs. This package offers the perfect balance of adventure and relaxation for families seeking a tropical paradise.",
    price: 2199,
    rating: 4.7,
    duration: "7 Days / 6 Nights",
    tourType: "Family",
    highlights: [
      "Family snorkeling with sea turtles",
      "Kids' marine biology program",
      "Glass-bottom boat tour",
      "Beach bonfire and BBQ",
      "Manta ray watching",
      "Island hopping adventure"
    ],
    facilities: ["Hotel Stay", "Breakfast", "Airport Pickup", "Tour Guide", "Transportation"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Speedboat transfer to resort. Welcome orientation and beach exploration." },
      { day: 2, title: "Snorkeling Day", description: "Family snorkeling with sea turtles and reef sharks, kids' marine biology class." },
      { day: 3, title: "Island Hopping", description: "Visit local islands, sandbank picnic, glass-bottom boat tour." },
      { day: 4, title: "Water Sports", description: "Family kayaking, paddleboarding, banana boat rides, beach volleyball." },
      { day: 5, title: "Marine Life", description: "Manta ray watching excursion, sunset fishing, beach bonfire dinner." },
      { day: 6, title: "Leisure Day", description: "Free day at the beach, optional spa for parents, kids' club activities." },
      { day: 7, title: "Departure", description: "Final morning swim, speedboat transfer to Malé airport." }
    ],
    reviews: [
      { id: 1, name: "The Thompson Family", avatar: "https://i.pravatar.cc/60?img=55", rating: 5, comment: "Kids absolutely loved it! Swimming with turtles was a dream come true for them.", date: "July 2024" },
      { id: 2, name: "Grace Williams", avatar: "https://i.pravatar.cc/60?img=57", rating: 4, comment: "Perfect family destination. The kids' program was excellent and kept them engaged.", date: "June 2024" }
    ]
  },
  {
    id: 15,
    title: "Iceland Northern Lights",
    destination: "Reykjavik",
    country: "Iceland",
    images: [
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
      "https://images.unsplash.com/photo-1520769945061-0a448c463865?w=800&q=80",
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80"
    ],
    description: "Chase the magical Aurora Borealis across Iceland's otherworldly landscapes. From geysers and waterfalls to black sand beaches and ice caves, Iceland offers some of the most dramatic scenery on Earth. This winter wonderland package combines natural wonders with the chance to witness the Northern Lights.",
    price: 2699,
    rating: 4.9,
    duration: "7 Days / 6 Nights",
    tourType: "Adventure",
    highlights: [
      "Northern Lights hunting tours",
      "Golden Circle day trip",
      "Blue Lagoon geothermal spa",
      "Glacier hiking on Vatnajökull",
      "Black sand beach at Reynisfjara",
      "Ice cave exploration"
    ],
    facilities: ["Hotel Stay", "Breakfast", "Airport Pickup", "Tour Guide", "Transportation"],
    itinerary: [
      { day: 1, title: "Arrival in Reykjavik", description: "Arrive at Keflavik Airport, Blue Lagoon stop, check-in to hotel in Reykjavik." },
      { day: 2, title: "Golden Circle", description: "Þingvellir National Park, Geysir hot springs, Gullfoss waterfall, evening Northern Lights hunt." },
      { day: 3, title: "South Coast", description: "Seljalandsfoss and Skógafoss waterfalls, Reynisfjara black sand beach, Jökulsárlón glacier lagoon." },
      { day: 4, title: "Glacier Adventure", description: "Glacier hiking on Vatnajökull, ice cave exploration, snowmobile tour." },
      { day: 5, title: "Snæfellsnes Peninsula", description: "Snæfellsjökull glacier, Kirkjufell mountain, Arnarstapi cliffs, Northern Lights." },
      { day: 6, title: "Reykjavik & Relaxation", description: "City tour, Hallgrímskirkja church, Harpa concert hall, farewell dinner." },
      { day: 7, title: "Departure", description: "Transfer to Keflavik Airport for departure." }
    ],
    reviews: [
      { id: 1, name: "Anna Kowalski", avatar: "https://i.pravatar.cc/60?img=59", rating: 5, comment: "Saw the Northern Lights on 3 nights! Iceland is absolutely magical in winter.", date: "February 2024" },
      { id: 2, name: "Ben Harrison", avatar: "https://i.pravatar.cc/60?img=61", rating: 5, comment: "The ice caves were surreal. Best trip I've ever taken. Iceland is incredible!", date: "January 2024" }
    ]
  }
];

export default tours;
