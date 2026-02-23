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