import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  properties: defineTable({
    title: v.string(),
    location: v.string(),
    price: v.number(),
    images: v.optional(v.array(v.string())),
    image: v.optional(v.string()), // Legacy field support
    description: v.string(),
    beds: v.number(),
    baths: v.number(),
    area: v.number(),
    type: v.optional(v.string()), // "Buy", "Rent", "Sold"
    category: v.optional(v.string()), // "House", "Apartment", etc.
    furnished: v.optional(v.string()), // "Furnished", "Semi-Furnished", "Unfurnished"
    floor: v.optional(v.string()), // e.g., "5th", "Ground"
    address: v.optional(v.string()), // Exact location/address
    parking: v.optional(v.string()), // e.g., "1 Covered", "Open", "None"
    negotiable: v.optional(v.boolean()), // Whether the price is negotiable
    createdAt: v.number(),
  }),
});