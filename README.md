# UJ.02 | Search & Use Units/Components

A modern, interactive prototype for searching and managing VVS (plumbing/HVAC) units and components in estimation software.

## 🚀 Live Demo

**[View Live Prototype](https://your-username.github.io/uj-02-search-units/)**

## 📋 Overview

This prototype demonstrates a comprehensive solution for:
- **Modern Search**: Natural language search with fuzzy matching
- **Smart Filtering**: Multi-criteria filters (tier, category, supplier, price, freshness)
- **Unit Tiers**: Standard, Lean, and Custom units for different business models
- **Favorites & Recently Used**: Quick access to frequently used units
- **Unit Details**: Complete material and labor breakdowns with Akkord times
- **Custom Units**: Modify and save units for future use
- **Real-time Calculations**: Dynamic cost updates when quantities change

## ✨ Key Features

### Search & Discovery
- **AI Suggestions**: Context-aware recommendations (placeholder)
- **Recently Used**: Track last 10 units with 30-day expiry
- **Favorites**: Persist across sessions with localStorage
- **Fuzzy Search**: Handle typos and variations ("toalet" finds "toilet")
- **Advanced Filters**: Filter by tier, category, supplier, price range, and freshness

### Unit Management
- **Three Tiers**:
  - 📦 **Standard**: Full-featured, comprehensive units
  - 🔥 **Lean**: Framework pricing optimized, lower cost
  - ⚙️ **Custom**: User-modified units saved for reuse

### Unit Details
- **Materials Tab**: View all components with quantities, pricing, and suppliers
- **Labor Tab**: Akkord time calculations with Danish wage breakdowns
- **Inline Editing**: Adjust quantities with +/- buttons
- **Cost Recalculation**: Real-time updates when modifying units
- **Discount Details**: Expandable pricing breakdown

### Custom Units
- **Clone & Modify**: Start from any unit and customize
- **Save for Reuse**: Name and describe your custom units
- **Change Detection**: See what you've modified
- **Auto-favorite**: Custom units automatically added to favorites

## 🛠️ Tech Stack

- **React 18**: Modern component-based UI
- **Vite**: Lightning-fast development and builds
- **TailwindCSS**: Utility-first styling
- **Lucide React**: Beautiful, consistent icons
- **LocalStorage**: Client-side persistence (favorites, recent)

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

## 🚢 Deployment

### Deploy to GitHub Pages

```bash
# Build and deploy
npm run deploy
```

The app will be available at: `https://your-username.github.io/uj-02-search-units/`

## 📁 Project Structure

```
uj-02-search-units/
├── src/
│   ├── components/          # React components
│   │   ├── EstimateList.jsx
│   │   ├── SearchModal.jsx
│   │   ├── UnitCard.jsx
│   │   ├── UnitDetailsModal.jsx
│   │   ├── FilterSection.jsx
│   │   └── SaveCustomUnitModal.jsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useFavorites.js
│   │   ├── useRecentlyUsed.js
│   │   └── useSearch.js
│   ├── data/                # Mock data
│   │   └── mockUnits.js     # 15 realistic VVS units
│   ├── utils/               # Helper functions
│   │   └── helpers.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Design System

### Colors
- **Primary Orange**: `#FF8C00`
- **Tier Standard**: `#6366F1`
- **Tier Lean**: `#F59E0B`
- **Tier Custom**: `#8B5CF6`

## 📊 Mock Data

The prototype includes **15 realistic VVS units** from Danish suppliers:
- Skovgaard
- Danfoss
- VVS Grossisten
- Leverandørservice
- AO Ishøj

## 🎯 User Flows

### Add Unit to Estimate
1. Click "Add Items/Components"
2. Browse or search for unit
3. View unit details
4. Click "Add to Estimate"

### Create Custom Unit
1. Open unit details
2. Modify quantities
3. Click "Clone as Custom"
4. Name and save

## 📝 License

This is a prototype for demonstration purposes.

---

**Built for VVS professionals** • Prototype for UJ.02 feature
