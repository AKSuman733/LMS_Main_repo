# 🎓 Learnify - EdTech Course Platform

A modern, clean EdTech platform built with React, TypeScript, and Tailwind CSS. Features a completely original design system with a focus on content-first aesthetics.

![Design System](https://img.shields.io/badge/Design-Plus%20Jakarta%20Sans-2D1B69?style=flat-square)
![Primary Color](https://img.shields.io/badge/Brand-Indigo%20%232D1B69-2D1B69?style=flat-square)
![Accent Color](https://img.shields.io/badge/Accent-Lime%20%23BBFF00-BBFF00?style=flat-square&labelColor=2D1B69)

## 🎨 Design Philosophy

**Clean, airy, content-first.** Think Notion meets Linear meets a premium learning tool.

- **Light backgrounds only** - White (#FFFFFF) and off-white (#F7F6F3)
- **Deep indigo brand** - #2D1B69 for primary elements
- **Electric lime accent** - #BBFF00 used sparingly for CTAs and highlights only
- **Frosted glass effects** - Subtle shadows, no heavy drop-shadows
- **8px spacing system** - Consistent, predictable spacing
- **Plus Jakarta Sans** - Clean, modern typography

## 🚀 Features

### Public Pages
- **Home** - Hero with stats, features, and CTA
- **Course Listing** - Editorial layout with search, filters, 3-column grid
- **Course Detail** - Tabbed content, curriculum accordion, reviews
- **Authentication** - Split-screen login, register, password reset

### Student Dashboard
- **Overview** - KPI cards, progress tracking, streak counter
- **Continue Learning** - Horizontal scroll of in-progress courses
- **Certificates** - Achievement showcase with download/share
- **Mobile Navigation** - Bottom tab bar for easy access

### Admin Panel
- **Dashboard** - Analytics with line charts, top courses
- **User Management** - Searchable table, invite functionality
- **Modern UI** - Linear/Vercel-inspired design

## 📱 Responsive Design

- **Desktop (1280px+)** - 3-column grids, full sidebar navigation
- **Tablet (768-1279px)** - 2-column grids, condensed layouts
- **Mobile (<768px)** - 1-column grids, bottom navigation, hamburger menu

## 🎯 Routes

```
/                    Home page
/login               Login
/register            Register
/forgot-password     Password reset
/courses             Course listing
/courses/:id         Course detail
/dashboard           Student dashboard
/admin               Admin dashboard
/admin/users         User management
/style-guide         Design system showcase
```

## 🎨 Design System

Visit `/style-guide` to see:
- Complete color palette (brand, neutral, feedback)
- Typography scale (H1-H4, body, labels)
- Button variants (primary, secondary, ghost)
- Form inputs (default, error, disabled states)
- Card styles (standard, gradient)
- Icon system (Lucide React)
- Spacing tokens (8px base unit)
- Lime accent usage rules

## 📐 Component Architecture

### Core Components
- `Navbar` - Semi-transparent with backdrop blur
- `Footer` - 3-column grid with social links
- `Button` - Primary/Secondary/Ghost variants
- `Input` - With label, error states, icon support
- `CourseCard` - Category stripe, enrollment badge, hover effects
- `MobileBottomNav` - 4-tab mobile navigation

### Page Components
All pages in `src/app/pages/`:
- Home, Login, Register, ForgotPassword
- CourseListing, CourseDetail
- Dashboard (student)
- AdminDashboard, AdminUsers
- StyleGuide

## 🎨 Design Tokens

```css
/* Brand Colors */
--brand-indigo-900: #2D1B69;
--action-lime: #BBFF00;

/* Neutrals */
--neutral-900: #1A1A2E;  /* Text */
--neutral-600: #6B6B80;  /* Secondary text */
--neutral-200: #E2E1F0;  /* Borders */
--neutral-50: #F7F6F3;   /* Off-white backgrounds */

/* Typography */
--text-h1: 56px / 700 / 1.15
--text-h2: 40px / 700 / 1.15
--text-h3: 28px / 700 / 1.15
--text-body: 16px / 400 / 1.65

/* Spacing */
8px base unit (1x, 2x, 3x, 4x, 6x, 10x, 12x)

/* Effects */
Card shadow: 0 2px 16px rgba(45,27,105,0.06)
Border radius: 16px (cards), 10px (buttons/inputs)
```

## ⚡ Lime Accent Usage Rule

The lime color (#BBFF00) appears **ONLY** on:
1. Primary CTA button text
2. Active navigation indicator dot (6px)
3. Progress fill bars
4. Enrollment count badges

Everywhere else: use indigo (#2D1B69) or neutral grays.

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Router 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first styling
- **Recharts** - Data visualization
- **Lucide React** - Icon system
- **Vite** - Build tool

## 📦 Key Dependencies

```json
{
  "react": "18.3.1",
  "react-router": "7.13.0",
  "tailwindcss": "4.1.12",
  "lucide-react": "0.487.0",
  "recharts": "2.15.2"
}
```

## 📂 Project Structure

```
src/
├── app/
│   ├── App.tsx                 # Router configuration
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── CourseCard.tsx
│   │   └── MobileBottomNav.tsx
│   └── pages/
│       ├── Home.tsx
│       ├── Login.tsx
│       ├── Register.tsx
│       ├── ForgotPassword.tsx
│       ├── CourseListing.tsx
│       ├── CourseDetail.tsx
│       ├── Dashboard.tsx
│       ├── AdminDashboard.tsx
│       ├── AdminUsers.tsx
│       └── StyleGuide.tsx
└── styles/
    ├── fonts.css              # Plus Jakarta Sans import
    ├── theme.css              # Design tokens
    ├── globals.css            # Global styles & animations
    └── index.css              # CSS imports
```

## 🎯 Design Highlights

1. **Split-Screen Auth** - Indigo gradient left panel with testimonials, white form right
2. **Editorial Course Listing** - Off-white hero, pill search, sticky filter strip
3. **Premium Course Detail** - 60/40 hero split, tabbed content, sticky enrollment panel
4. **Productivity Dashboard** - Light indigo tint, KPI cards, progress tracking
5. **Modern Admin** - Linear-inspired, clean tables, data visualization
6. **Frosted Glass Cards** - 80% white opacity, subtle shadows, 1px borders
7. **Responsive Mobile** - Bottom tab nav, full-screen overlays, optimized layouts

## 📱 Mobile Optimizations

- **Bottom Tab Navigation** - 4 primary tabs (Home, Courses, Certificates, Profile)
- **Hamburger Menu** - Full-screen overlay for main navigation
- **Single Column Grids** - Optimized for vertical scrolling
- **Horizontal Scrolls** - Certificate and progress card galleries
- **Touch-Friendly** - 48px minimum touch targets
- **Adaptive Typography** - Hero scales from 56px to 36px

## 🎨 Figma Export Ready

The complete design system is implemented with semantic tokens that map 1:1 to Figma:
- Color styles: Brand, Neutral, Feedback palettes
- Text styles: H1-H4, Body, Labels, Caption
- Component variants: Button states, Input states, Card types
- Layout grids: 1280px max-width, 8px spacing system

## 📝 Notes

- All components use Tailwind utility classes
- Design tokens defined in `theme.css` as CSS variables
- Responsive breakpoints: 768px (tablet), 1280px (desktop)
- Icons from Lucide React (20px default, 16px compact)
- Charts use Recharts with indigo/lime color scheme
- Password strength meter in Register page
- Countdown timer in Forgot Password
- Mobile bottom nav for dashboard

## 🔍 Complete Implementation Checklist

✅ Design System & Visual Identity  
✅ Navigation & Layout Shell  
✅ Auth Screens (Login, Register, Reset)  
✅ Course Listing Page  
✅ Course Detail Page  
✅ Student Dashboard  
✅ Admin UI (Dashboard, Users)  
✅ Responsive Design Rules  
✅ Component Library  
✅ Mobile Navigation  
✅ Style Guide Page  

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
