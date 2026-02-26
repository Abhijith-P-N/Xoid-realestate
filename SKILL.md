🚀 Admin Panel – Convex Powered Property & Vehicle Management System
📌 Overview

The Admin Panel is a modern, secure, and fully functional dashboard built to manage properties and vehicles using Convex backend.

It allows admins to:

✅ Add new properties & vehicles

✅ Edit listings

✅ Delete listings

✅ Upload multiple images

✅ Filter & search listings

✅ Manage pricing & availability

✅ Seed demo data

✅ View analytics-ready structured data

Built for scalability, performance, and clean UI.

🧱 Tech Stack

Frontend:

React (Vite)

Tailwind CSS

Convex React Client

Lucide Icons

Backend:

Convex (Schema + Queries + Mutations)

Deployment:

Render / Vercel / Netlify

Convex Cloud

📂 Folder Structure
src/
 ├── pages/
 │    ├── AdminDashboard.jsx
 │    ├── AddProperty.jsx
 │    ├── EditProperty.jsx
 │
 ├── components/
 │    ├── PropertyTable.jsx
 │    ├── PropertyForm.jsx
 │    ├── ImageUploader.jsx
 │
convex/
 ├── schema.ts
 ├── properties.ts
🔐 Admin Features
1️⃣ Dashboard Overview

Total Properties

Total Vehicles

Total Buy / Rent listings

Recently Added Listings

Quick Add Button

2️⃣ Add Property / Vehicle

Admin can add:

Property Fields:

Title

Location

Price

Description

Beds

Baths

Area

Category (House / Apartment / Vehicle)

Type (Buy / Rent / Sold)

Furnished

Floor

Address

Parking

Negotiable

Vehicle Fields:

Year

Mileage

Fuel Type

Transmission

Color

Engine

Images:

Multiple upload support

Preview before save

Update images later

Connected to:

addProperty mutation
3️⃣ Edit Listing

Uses:

getPropertyById
updatePropertyImages

Admin can:

Modify text fields

Update price

Change listing type

Replace images

Update negotiable status

4️⃣ Delete Listing (Recommended Addition)

Add this mutation:

export const deleteProperty = mutation({
  args: { id: v.id("properties") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
5️⃣ Smart Filtering Panel

Connected to:

getProperties query

Filter by:

Type

Category

Min / Max Price

Beds

Baths

Search by Title or Location

🎨 UI Design Guidelines (Beautiful Admin)

Use:

Dark Mode Admin Theme

Glassmorphism cards

Gradient headers

Rounded cards (rounded-2xl)

Soft shadows

Hover transitions

Clean spacing

Data tables with sticky headers

Example Theme:

bg-gradient-to-r from-indigo-600 to-purple-600
bg-gray-900 text-white
rounded-2xl shadow-xl
📊 Admin Dashboard Layout
Top Section:

Page Title

Add Property Button

Stats Cards:

Total Listings

Total Vehicles

Total Buy

Total Rent

Table Section:

Columns:

Image

Title

Location

Price

Type

Category

Actions (Edit / Delete)

⚡ Convex Integration
Query Example
const properties = useQuery(api.properties.getProperties, {});
Mutation Example
const addProperty = useMutation(api.properties.addProperty);
🧪 Testing Checklist (Admin Panel)

Before Deployment:

 Add new property

 Add new vehicle

 Upload multiple images

 Edit property

 Update images

 Delete listing

 Filter works

 Search works

 Mobile responsive

 No console errors

🌱 Seed Demo Data

Use these mutations in Convex dashboard:

seedProperties

seedVehicles

seedDominar

🔒 Security Best Practice

Recommended:

Add admin authentication (Clerk / Firebase Auth)

Protect admin routes

Restrict mutation access

Role-based access

📈 Future Improvements

Pagination

Image compression

Cloudinary integration

Analytics chart

Export CSV

Approval workflow

Mark as Featured

Track views