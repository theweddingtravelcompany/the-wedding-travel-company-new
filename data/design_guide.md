```markdown
---DESIGN_MD_START---
## Visual Theme
Elegant and trustworthy destination wedding agency featuring a sophisticated navy and white palette, vibrant magenta accents, and classic serif headings paired with clean sans-serif body text.

## Colors
- background: hsl(0, 0%, 100%)
- foreground: hsl(0, 0%, 18%)
- muted-foreground: hsl(0, 0%, 45%)
- border: hsl(0, 0%, 90%)
- surface: hsl(0, 0%, 96%)
- primary: hsl(317, 70%, 39%)
- primary-foreground: hsl(0, 0%, 100%)
- primary-hover: hsl(317, 70%, 29%)
- secondary: hsl(222, 37%, 19%)
- secondary-foreground: hsl(0, 0%, 100%)
- secondary-hover: hsl(222, 37%, 9%)
- dark: hsl(222, 37%, 19%)
- dark-foreground: hsl(0, 0%, 100%)
- dark-muted: hsl(0, 0%, 80%)
- dark-border: hsl(222, 37%, 29%)
- accent: hsl(317, 70%, 39%)

## Page Background
solid hsl(0, 0%, 100%)

## Typography
- Headlines: Playfair Display — 700
- Body: Montserrat — 400

## Components
- Buttons: Standard primary buttons are solid magenta (`bg-primary`), text white, `rounded-xl` (12px), px-8 py-4, font-bold text-sm. Secondary buttons are solid navy (`bg-secondary`), text white, `rounded-xl`. Nav CTA is `rounded-md` (4px).
- Cards: Standard cards use `bg-white`, `rounded-xl`, with a subtle `shadow-sm` and hover lift effect.
---DESIGN_MD_END---

## 1. Site Info
SITE_TYPE: Corporate/Travel Agency
HTML_LANG: en

## 2. Color Token Mapping
(Mapped in the markdown block above)

## 3. Navigation Spec
NAV_FULL_WIDTH: true
NAV_WIDTH: full
NAV_BACKGROUND: White (Main Nav) / Navy (Top Bar)
NAV_BORDER_RADIUS: none
NAV_POSITION: sticky
NAV_SHADOW: shadow-sm
SCROLL_BEHAVIOR: none

**Structure:**
The navigation consists of two rows:
1.  **Top Bar:** `bg-secondary` (Navy), height ~40px. Contains white, small uppercase text (`text-[10px] font-semibold tracking-widest`).
    *   Left: "TRUSTPILOT ★★★★★ 4.9/5"
    *   Right: "CALL US: 0800 0911 137"
2.  **Main Bar:** `bg-background` (White), sticky underneath the top bar.

**Link style (Main Bar):**
- fontSize: 11px
- fontWeight: 700
- textTransform: uppercase
- color: hsl(0, 0%, 20%)
- letterSpacing: 1.1px

**Logo:**
- Size: h-[44px] w-[282px]
- Position: inside-nav (left aligned in main bar)
- Badge: false

**Dropdowns:**
"DESTINATIONS" and "WEDDING TYPES" have `hasDropdown: true`. Add a small chevron-down SVG `∨` next to the text. Build standard hover dropdown panels for these.

**Icons:**
"WISHLIST" link has a heart outline icon before the text.

**CTA Button:**
The last link "ENQUIRE NOW" is a Solid button.
- Style: `bg-primary` (Magenta), `text-white`, `rounded-md` (4px), `px-4 py-2`, `text-[10px] font-bold tracking-[2px]`.

## 4. Section Plan

**Hero Section** id="hero"
- theme: DARK (text over image)
- background: bg-secondary
- text: text-white
- heading color: text-white (with accent words)
- heading size: text-[72px] font-bold leading-tight
- body size: text-[24px] font-normal
- layout: Two columns (Text left, Form Card right). Max-width container.
- padding: py-32
- content: 
  - Left: Headline "Design Your Dream Wedding Abroad". **CRITICAL:** The words "Wedding Abroad" must be wrapped in a span with `text-primary font-serif italic font-normal`. Subtitle below.
  - Right: A lead capture form inside a card.
- backgroundImage: cover photo of beach wedding setup.
- overlay: rgba(31, 42, 68, 0.45) (Dark gradient to improve text readability).
- form card style: `bg-white rounded-2xl p-8 max-w-md w-full text-foreground`. Heading "Let's Start Planning" (serif, text-2xl). Inputs: Full Name, Email, Phone, Destination (dropdown), Arrival Month (dropdown). Labels in uppercase `text-[10px] text-muted-foreground font-bold`. Inputs have `border border-border rounded-md px-4 py-3`.
- buttons: Inside form card -> Solid primary button "ENQUIRE NOW" — `bg-primary text-white rounded-[12px] w-full py-4 text-[12px] font-bold uppercase tracking-wider`.
- images: background image, objectFit: cover.

**Trust Badges Section** id="trust-badges"
- theme: LIGHT
- background: bg-surface
- text: text-foreground
- heading color: text-foreground
- heading size: text-[16px] font-bold
- body size: none
- layout: Grid, 3 columns wrapping to 5 items centered. `gap-8`. Max-width container.
- padding: py-16
- content: 5 identical white cards displaying trust metrics.
- card style: `bg-white rounded-xl shadow-sm p-6 flex flex-col items-center justify-center text-center gap-4`. Top is a magenta outline icon. Bottom is text (e.g., "4.9/5 ★ Trustpilot Rated").
- buttons: none.

**Featured Collection** id="featured-collection"
- theme: LIGHT
- background: bg-background
- text: text-muted-foreground
- heading color: text-foreground
- heading size: text-[36px] font-bold font-serif text-center
- body size: text-[16px] text-center
- layout: Grid, 3 columns. `gap-8`. Max-width container.
- padding: py-24
- content: Section heading, subtitle, and 3 venue cards.
- card style: `bg-white border border-border rounded-xl overflow-hidden`. 
  - Top: Image (aspect-video). Overlay tags: top-left small white pill "FEATURED VENUE", top-right white circle with heart icon.
  - Body: p-6. Location (small uppercase, text-muted-foreground), Title (serif text-2xl font-bold text-foreground), Description (sans).
  - Price row: "From £2,995" (Price is bold, text-xl). Small text next to it "COMPLETE WEDDING PACKAGE".
  - Actions (Grid of 2 buttons):
    - Button 1: Solid secondary button "View Venue" — `bg-secondary text-white rounded-[8px] py-3 text-[14px] font-bold text-center w-full hover:bg-secondary-hover`.
    - Button 2: Text button "ENQUIRE NOW" — `text-primary text-[10px] font-bold uppercase tracking-widest text-center w-full py-3 hover:opacity-80`.
- below cards: "BROWSE ALL VENUES →" link (`text-[11px] font-bold uppercase tracking-widest text-foreground flex justify-center mt-12`).

**European Destinations** id="european-destinations"
- theme: LIGHT
- background: bg-surface
- text: text-muted-foreground
- heading color: text-foreground
- heading size: text-[36px] font-bold font-serif text-center
- layout: Grid, 4 columns. `gap-8`. Max-width container.
- padding: py-24
- content: Heading "European Destinations" (Note: "Destinations" is `text-primary italic font-normal`). 4 vertical image cards.
- card style: `relative rounded-2xl overflow-hidden h-[400px] group`. Image is cover. Dark gradient overlay at bottom. 
  - Bottom content (absolute, bottom-0, left-0, p-6 w-full): Title (serif, text-white, text-2xl), "FROM £...". 
  - Hover Action: On group hover, a Solid primary button appears: "VIEW DESTINATIONS" — `bg-primary text-white rounded-[8px] w-full py-3 text-[10px] font-bold uppercase mt-4`.

**Long-Haul Paradise** id="long-haul-paradise"
- theme: LIGHT
- background: bg-background
- text: text-muted-foreground
- heading color: text-foreground
- heading size: text-[36px] font-bold font-serif text-center
- layout: Grid, 4 columns. `gap-8`. Max-width container.
- padding: py-24
- content: Heading "Long-Haul Paradise" (Note: "Paradise" is `text-primary italic font-normal`). 4 vertical image cards.
- card style: EXACTLY the same as "European Destinations" cards (Image cover, gradient bottom, title, price, hover button).
  - Button: Solid primary button "VIEW DESTINATIONS" — `bg-primary text-white rounded-[8px] w-full py-3 text-[10px] font-bold uppercase`.

**Why Couples Choose Us** id="why-choose-us"
- theme: LIGHT
- background: bg-surface
- text: text-muted-foreground
- heading color: text-foreground
- heading size: text-[36px] font-bold font-serif text-center
- layout: Grid, 3 columns, 2 rows. `gap-x-12 gap-y-16`. Max-width container.
- padding: py-24
- content: Heading "Why Couples Choose Us" (Note: "Us" is `text-primary italic font-normal`). 6 features.
- feature style: Centered text. Top is a 64x64 circle `bg-white rounded-full flex items-center justify-center shadow-sm text-primary mx-auto mb-6` containing an icon. Title is `text-[20px] font-bold text-foreground mb-3`. Body is `text-[14px] leading-relaxed`.

**Three Steps to I Do** id="three-steps"
- theme: LIGHT
- background: bg-surface (continues from above or white, use bg-surface)
- text: text-muted-foreground
- heading color: text-foreground
- heading size: text-[48px] font-bold font-serif text-center
- layout: Top part: Grid 3 columns. Bottom part: Grid 3 columns for quotes.
- padding: py-24
- content: Heading "Three Steps to I Do" (Note: "I Do" is `text-primary italic font-normal`). 3 step items.
- step style: Centered. Icon circle similar to previous section but with a small magenta badge `bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center absolute -top-2 -right-2 font-bold text-xs` overlapping the icon circle. Title `text-[20px] font-bold mb-3`. Body text.
- sub-content: Below the 3 steps, 3 small text-only testimonials. Italic serif text, followed by — NAME (uppercase sans text-xs).

**Personalized Quote CTA** id="quote-cta"
- theme: LIGHT
- background: bg-background
- text: text-muted-foreground
- heading color: text-foreground
- heading size: text-[36px] font-bold font-serif
- layout: Single centered column inside a max-w-4xl container. 
- padding: py-24
- content: A large centered block. Heading "Want a Personalised Quote?" ("Personalised Quote?" is stacked, with "Personalised" in `text-primary italic font-normal`). Body text. Button next to it or below it. In screenshot, text is left, button is right within a flex container.
- structure: `<div class="flex items-center justify-between max-w-4xl mx-auto bg-surface p-12 rounded-[32px]">`
- buttons: Solid secondary button "Start My Wedding Plan" — `bg-secondary text-white rounded-full px-8 py-4 text-[14px] font-bold hover:bg-secondary-hover`.

**Testimonials** id="testimonials"
- theme: LIGHT
- background: bg-surface
- text: text-foreground
- heading color: text-foreground
- heading size: text-[36px] font-bold font-serif text-center
- layout: Grid, 3 columns. `gap-8`. Max-width container.
- padding: py-24
- content: Heading "Trusted by Thousands of Couples" ("Couples" is `text-primary italic font-normal`). 3 review cards.
- card style: `bg-white p-8 rounded-xl shadow-sm`. Top: 5 stars `text-primary text-xl tracking-widest mb-6`. Body: Italic text `font-serif text-[16px] leading-relaxed mb-6`. Bottom: "— NAME" `text-[10px] font-bold uppercase tracking-wider`.

**Newsletter / Inspiration** id="newsletter"
- theme: DARK
- background: bg-background (The section background is white, but contains a large dark element)
- text: text-white
- heading color: text-white
- heading size: text-[36px] font-bold font-serif
- layout: Max-w-6xl container. Internal layout is 2 columns (flex row).
- padding: pb-24
- content: A large dark rounded box: `<div class="bg-secondary text-white rounded-[32px] p-16 flex items-center justify-between">`.
  - Left: Heading "Get Exclusive Inspiration" ("Inspiration" is `text-primary italic font-normal`). Subtext text-dark-muted.
  - Right: Form `<div class="flex gap-4 w-full max-w-md">`.
    - Input: `bg-white/10 border border-white/20 rounded-[8px] px-6 py-4 text-white w-full placeholder:text-white/50`.
    - Button: Solid primary button "Subscribe" — `bg-primary text-white rounded-[8px] px-8 py-4 text-[14px] font-bold hover:bg-primary-hover whitespace-nowrap`.

## 5. Favicon
https://cdn.pagesmith.app/4604757a/images/favicon-fa83bd6e.svg

## 6. Footer
- Style: bg-dark (hsl(222, 37%, 19%))
- Text color: text-dark-muted (hsl(0, 0%, 80%))
- Columns: 4
- Structure:
  - Grid cols 4. gap-12. py-16.
  - Col 1: Brand. Text "THE WEDDING TRAVEL CO." (TRAVEL in text-primary). Description text. Social icons (Instagram, Facebook) as small white outlined circles or just plain SVGs `text-white hover:text-primary`.
  - Col 2: Heading "EXPLORE" (text-white text-[10px] font-bold uppercase tracking-widest mb-6). Links: Browse Venues, How it Works, FAQ, Enquire Now, Careers.
  - Col 3: Heading "LEGAL" (same style). Links: Privacy Policy, Terms of Service, Cookie Policy.
  - Col 4: Empty / Spacer.
  - Bottom bar: `border-t border-white/10 pt-8 mt-12 flex justify-between items-center text-[10px] uppercase tracking-widest text-dark-muted`. Left: © 2026 THE WEDDING TRAVEL COMPANY... Right: ATOL PROTECTED 12345.

## 7. Files
MODIFY: src/components/Navigation.astro, src/components/Footer.astro, src/layouts/BaseLayout.astro, src/styles/global.css, src/utils/site.ts
CREATE: 
- src/components/home/Hero.astro
- src/components/home/TrustBadges.astro
- src/components/home/FeaturedCollection.astro
- src/components/home/EuropeanDestinations.astro
- src/components/home/LongHaulParadise.astro
- src/components/home/WhyChooseUs.astro
- src/components/home/ThreeSteps.astro
- src/components/home/QuoteCta.astro
- src/components/home/Testimonials.astro
- src/components/home/Newsletter.astro
```