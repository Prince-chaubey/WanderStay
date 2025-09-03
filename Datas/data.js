const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    url: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    owner:"68b883e2eb159e12f14ad77a"
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    url: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    owner:"68b883e2eb159e12f14ad77a"
  },
  {
    title: "Mountain Retreat",
    description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    url: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
    owner:"68b883e2eb159e12f14ad77a"
  },
  {
    title: "Historic Villa in Tuscany",
    description: "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    url: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
    owner:"68b883e2eb159e12f14ad77a"
  },
  {
    title: "Secluded Treehouse Getaway",
    description: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    url: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 800,
    location: "Portland",
    country: "United States",
    owner:"68b883e2eb159e12f14ad77a"
  },
  {
    title: "Beachfront Paradise",
    description: "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    url: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    owner:"68b883e2eb159e12f14ad77a"
  },
  {
    title: "Luxury Penthouse with City Views",
    description: "Indulge in luxury living in this stunning penthouse with panoramic city views and modern amenities.",
    url: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 5000,
    location: "Dubai",
    country: "UAE",
    owner:"68b883e2eb159e12f14ad77a"
  },
  {
    title: "Charming Countryside B&B",
    description: "Enjoy a cozy stay at this countryside bed and breakfast. Homemade meals and fresh air await you.",
    url: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1475856033578-76b214d2e1d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 600,
    location: "Cotswolds",
    country: "United Kingdom",
    owner:"68b883e2eb159e12f14ad77a"
  },
  {
    title: "Desert Oasis Camp",
    description: "Experience the magic of the desert in this unique glamping site. Stargaze in comfort.",
    url: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 900,
    location: "Sahara Desert",
    country: "Morocco",
    owner:"68b883e2eb159e12f14ad77a"
  },
  {
    title: "Lakeside Cabin Escape",
    description: "Relax by the tranquil lake in this cozy cabin. Perfect for fishing, kayaking, or simply enjoying nature.",
    url: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 1100,
    location: "Lake Tahoe",
    country: "United States",
    owner:"68b883e2eb159e12f14ad77a"
  },
  {
    title: "Japanese Zen House",
    description: "Find peace in this traditional Japanese house surrounded by serene gardens.",
    url: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 1800,
    location: "Kyoto",
    country: "Japan",
    owner:"68b883e2eb159e12f14ad77a"
  },
  {
    title: "Icelandic Glass Igloo",
    description: "Watch the northern lights from your bed in this amazing glass igloo stay.",
    url: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1533598446973-09b3cf91f3c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 2200,
    location: "Reykjavik",
    country: "Iceland",
    owner:"68b883e2eb159e12f14ad77a"
  },
  {
    title: "Santorini Cliffside Suite",
    description: "Enjoy breathtaking sunsets in this luxurious cliffside suite in Santorini.",
    url: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 3000,
    location: "Santorini",
    country: "Greece",
    owner:"68b883e2eb159e12f14ad77a"
  },
  {
    title: "Safari Lodge",
    description: "Adventure into the wild with this luxury safari lodge surrounded by African wildlife.",
    url: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 4000,
    location: "Serengeti",
    country: "Tanzania",
    owner:"68b883e2eb159e12f14ad77a"
  },
  {
    title: "Swiss Alps Chalet",
    description: "Stay cozy in this ski chalet with stunning mountain views.",
    url: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 2800,
    location: "Zermatt",
    country: "Switzerland",
    owner:"68b883e2eb159e12f14ad77a"
  },
  {
    title: "Parisian Apartment",
    description: "Romantic apartment in the heart of Paris with Eiffel Tower views.",
    url: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 2600,
    location: "Paris",
    country: "France",
    owner:"68b883e2eb159e12f14ad77a"
  },
  {
    title: "Dubai Desert Villa",
    description: "Luxury villa in the desert with private pool and modern design.",
    url: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 5000,
    location: "Dubai",
    country: "UAE",
    owner:"68b883e2eb159e12f14ad77a"
  },
  {
    title: "Himalayan Mountain Cabin",
    description: "Remote cabin high in the Himalayas, perfect for trekkers and adventurers.",
    url: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1519817650390-64a93db511aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 1400,
    location: "Manali",
    country: "India",
    owner:"68b883e2eb159e12f14ad77a"
  },
  {
    title: "Rainforest Eco Lodge",
    description: "Sustainable eco lodge hidden in the rainforest canopy.",
    url: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 1600,
    location: "Costa Rica",
    country: "Costa Rica",
    owner:"68b883e2eb159e12f14ad77a"
  },
  {
    title: "Moroccan Riad",
    description: "Traditional Moroccan riad with a courtyard and colorful design.",
    url: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 1900,
    location: "Marrakech",
    country: "Morocco",
    owner:"68b883e2eb159e12f14ad77a"
  },
  {
    title: "Sydney Harbour Apartment",
    description: "Apartment overlooking Sydney Opera House and the harbour bridge.",
    url: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
    },
    price: 2700,
    location: "Sydney",
    country: "Australia",
    owner:"68b883e2eb159e12f14ad77a"
  }
];

module.exports = { data: sampleListings };
