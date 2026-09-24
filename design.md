```markdown
---
design_system:
  colors:
    primary: "#D35400" # Deep Orange/Burnt Sienna
    background_main: "#EBEBEB" # Light Grey
    surface_dark: "#1A1A1A" # Near Black
    surface_white: "#FFFFFF" # Pure White
    text_primary: "#000000" # Black
    text_secondary: "#8E8E8E" # Medium Grey
    text_on_dark: "#FFFFFF" # White
    accent_star: "#F1C40F" # Yellow for ratings
  typography:
    font_family: "Sans-Serif (Geometric, e.g., Montserrat/Poppins)"
    scales:
      h1: "22px / Bold"
      h2: "18px / Bold"
      body_bold: "14px / Bold"
      body_reg: "14px / Regular"
      caption: "12px / Regular"
      price: "16px / Bold"
  spacing:
    container_padding: "20px"
    element_gap: "16px"
    stack_tight: "8px"
    stack_loose: "24px"
  radius:
    card: "24px"
    input: "12px"
    button_pill: "50px"
    panel_top: "40px"
  shadows:
    soft_drop: "0px 10px 20px rgba(0,0,0,0.05)"
    card_glow: "0px 15px 30px rgba(0,0,0,0.2)"
---

## 🔬 Design Audit
- **Style:** Modern Minimalist with High Contrast.
- **Mood:** Energetic, Clean, Premium Food-Tech.
- **Screen Type:** Mobile Application (iOS/Android).
- **Visual Hierarchy:** Uses overlapping elements (food plates over dark cards) to create depth and focus.

## 🎨 Color Palette & Design Tokens
- **Primary Action:** `#D35400` - Used for the logo background, active indicators, and primary action buttons.
- **Dark Surface:** `#1A1A1A` - Used for product cards and category icons to make food photography pop.
- **Neutral Background:** `#EBEBEB` - Soft grey to reduce eye strain compared to pure white.
- **Status Indicator:** Small dot `#D35400` used for active tab states.

## 🧩 Components Detected
1.  **Top Navigation Bar:** Contains a hamburger menu icon (left) and a centered brand logo (`YO!`) on an orange square.
2.  **Search Input:** Full-width white bar with rounded corners, search icon, and placeholder text "Search for a dish...".
3.  **Horizontal Tab Scroller:** Text-based navigation (Rice Bowl, Rolls, Nigiri...) with an orange dot indicator for the active state.
4.  **Food Product Card:** 
    - Dark background (`#1A1A1A`).
    - Overlapping circular food image.
    - Title text (White).
    - Rating (Orange star + value).
    - Price (White, bold).
5.  **Category Icon Card:** Square-ish dark cards with white line-art icons (Beer, Soft, Wine) and labels below.
6.  **Sticky Bottom Action Bar:** Orange pill-shaped container showing delivery address and a "Change" button.
7.  **Order Summary Panel:** Large white surface with high-radius top corners.
8.  **Order List Item:** 
    - Small circular thumbnail.
    - Title and calorie count.
    - Quantity indicator (Boxed number).
    - Price (Orange text).
9.  **Price Summary Block:** Vertical stack of Order, Delivery, and Total (Bold) with aligned prices.

## ⚛️ Atomic Design Specification

### Atoms
- **Icons:** Hamburger menu, Search, Star, Beer mug, Soda cup, Wine glass.
- **Shapes:** Orange active dot, Rounded quantity box.
- **Typography:** Bold black headers, white card titles, orange prices.

### Molecules
- **Search Bar:** Icon + Placeholder + Rounded Container.
- **Tab Item:** Text + Active Dot.
- **Rating Badge:** Star Icon + Numeric Text.
- **Summary Row:** Label (left) + Value (right).

### Organisms
- **Product Card:** Dark container + Overlapping Image + Info Molecule + Price.
- **Category Grid:** Horizontal layout of Icon Cards.
- **Order List:** Vertical stack of Order List Items.
- **Bottom Delivery Bar:** Address info + "Change" Button molecule.

## 📐 Layout & Viewport Composition
- **Grid:** Single column with internal horizontal scrolling for tabs and categories.
- **Padding:** Consistent 20px lateral padding for content alignment.
- **Depth:** 
    - Layer 0: Background (`#EBEBEB`).
    - Layer 1: Cards and Panels.
    - Layer 2: Overlapping food images (Z-index elevation).
- **Composition:** 
    - **Screen 1:** Focus on discovery (Search -> Categories -> Products).
    - **Screen 2:** Focus on confirmation (Header -> Itemized List -> Total).
```