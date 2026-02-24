import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getProperties = query({
  args: {
    type: v.optional(v.string()),
    search: v.optional(v.string()),
    minPrice: v.optional(v.number()),
    maxPrice: v.optional(v.number()),
    beds: v.optional(v.number()),
    baths: v.optional(v.number()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let properties = await ctx.db.query("properties").collect();

    if (args.type) {
      properties = properties.filter((p) => p.type === args.type);
    }

    if (args.search) {
      const searchLower = args.search.toLowerCase();
      properties = properties.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.location.toLowerCase().includes(searchLower)
      );
    }

    if (args.minPrice !== undefined) {
      properties = properties.filter((p) => p.price >= args.minPrice!);
    }
    if (args.maxPrice !== undefined) {
      properties = properties.filter((p) => p.price <= args.maxPrice!);
    }
    if (args.beds !== undefined && args.beds > 0) {
      properties = properties.filter((p) => p.beds >= args.beds!);
    }
    if (args.baths !== undefined && args.baths > 0) {
      properties = properties.filter((p) => p.baths >= args.baths!);
    }
    if (args.category) {
      properties = properties.filter((p) => p.category === args.category);
    }

    return properties;
  },
});

export const getPropertyById = query({
  args: { id: v.id("properties") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const addProperty = mutation({
  args: {
    title: v.string(),
    location: v.string(),
    price: v.number(),
    images: v.array(v.string()),
    description: v.string(),
    beds: v.number(),
    baths: v.number(),
    area: v.number(),
    type: v.string(),
    category: v.optional(v.string()),
    furnished: v.optional(v.string()),
    floor: v.optional(v.string()),
    address: v.optional(v.string()),
    parking: v.optional(v.string()),
    negotiable: v.optional(v.boolean()),
    // Vehicle fields
    year: v.optional(v.string()),
    mileage: v.optional(v.string()),
    fuelType: v.optional(v.string()),
    transmission: v.optional(v.string()),
    vehicleColor: v.optional(v.string()),
    engine: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("properties", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const updatePropertyImages = mutation({
  args: {
    id: v.id("properties"),
    images: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { images: args.images });
  },
});

export const seedProperties = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("properties").collect();
    for (const prop of existing) {
      if (!prop.images || prop.images.length <= 1) {
        const demoImages = [
          prop.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
          "https://images.unsplash.com/photo-1600607687940-4e2a09695d51"
        ];
        await ctx.db.patch(prop._id, {
          images: demoImages,
          furnished: prop.furnished || "Semi-Furnished",
          floor: prop.floor || (prop.category === "House" ? "Ground" : "4th"),
          address: prop.address || `${prop.location}, Near City Center, Area 51`,
          parking: prop.parking || "1 Covered",
          negotiable: prop.negotiable ?? true
        });
      }
    }
  },
});

export const seedVehicles = mutation({
  args: {},
  handler: async (ctx) => {
    const vehicles = [
      {
        title: "Toyota Innova Crysta 2.4 GX",
        location: "Kochi, Kerala",
        price: 1850000,
        images: [
          "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",
          "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800",
          "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800",
        ],
        description: "Well-maintained Toyota Innova Crysta with a diesel engine. Single owner, full service history. Suitable for families and long-distance travel. All documents up to date.",
        beds: 0,
        baths: 0,
        area: 0,
        type: "Buy",
        category: "Vehicle",
        negotiable: true,
        year: "2021",
        mileage: "42,000 km",
        fuelType: "Diesel",
        transmission: "Manual",
        vehicleColor: "Pearl White",
        engine: "2.4L Diesel",
        address: "Edappally, Kochi - 682024",
        createdAt: Date.now(),
      },
      {
        title: "Honda City ZX CVT 5th Gen",
        location: "Thrissur, Kerala",
        price: 1250000,
        images: [
          "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800",
          "https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?w=800",
          "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
        ],
        description: "Honda City ZX with automatic CVT transmission. Petrol engine with excellent fuel efficiency. Sunroof, lane assist, and cruise control. Accident-free, two owners.",
        beds: 0,
        baths: 0,
        area: 0,
        type: "Buy",
        category: "Vehicle",
        negotiable: true,
        year: "2022",
        mileage: "28,500 km",
        fuelType: "Petrol",
        transmission: "Automatic (CVT)",
        vehicleColor: "Obsidian Blue",
        engine: "1.5L VTEC",
        address: "Swaraj Round, Thrissur - 680001",
        createdAt: Date.now(),
      },
      {
        title: "Royal Enfield Meteor 350 Supernova",
        location: "Calicut, Kerala",
        price: 210000,
        images: [
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
          "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800",
          "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800",
        ],
        description: "Royal Enfield Meteor 350 in Supernova Red. Barely used, in showroom condition. Comes with windshield, saddlebag, and extended warranty. Perfect touring bike.",
        beds: 0,
        baths: 0,
        area: 0,
        type: "Buy",
        category: "Vehicle",
        negotiable: false,
        year: "2023",
        mileage: "6,200 km",
        fuelType: "Petrol",
        transmission: "Manual (5-speed)",
        vehicleColor: "Supernova Red",
        engine: "349cc Single Cylinder",
        address: "Mavoor Road, Calicut - 673004",
        createdAt: Date.now(),
      },
    ];

    for (const vehicle of vehicles) {
      await ctx.db.insert("properties", vehicle);
    }
  },
});

export const seedDominar = mutation({
  args: {},
  handler: async (ctx) => {
    await ctx.db.insert("properties", {
      title: "Dominar 2019 BS4 Model",
      location: "Kerala",
      price: 160000,
      images: [
        "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800",
        "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      ],
      description: "Bajaj Dominar 400 2019 BS4 model in excellent condition. Well maintained, single owner. Perfect for long-distance touring and daily commute.",
      beds: 0,
      baths: 0,
      area: 0,
      type: "Buy",
      category: "Vehicle",
      negotiable: true,
      year: "2019",
      mileage: "25-30 km/l",
      fuelType: "Petrol",
      transmission: "Manual",
      vehicleColor: "Green",
      engine: "BS4 Model - 373cc",
      address: "Kerala",
      createdAt: Date.now(),
    });
  },
});
