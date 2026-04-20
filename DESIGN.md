# Design Brief: Vintage Car Reselling Website

## Concept
Retro-authentic automotive marketplace (1950s–60s) with warm, nostalgia-driven aesthetic. Grounds design in real vintage materials — dealer showroom typography, enamel signs, period-accurate color blocking.

## Palette
| Token | OKLCH | Usage |
| --- | --- | --- |
| Primary | 0.58 0.15 35 | Rust/terracotta headers, card borders, CTAs |
| Secondary | 0.95 0.02 90 | Cream backgrounds, card surfaces, paper stock |
| Accent | 0.20 0.05 40 | Dark brown — signage, text, admin focus |
| Muted | 0.75 0.02 90 | Warm grey — subtle backdrops, secondary UI |
| Success | 0.52 0.18 120 | Muted olive — inquiry confirmed, vintage palette |

## Typography
- **Display**: Fraunces (serif, high-contrast) — masthead, section titles, car make/model
- **Body**: Lora (serif, warm, editorial) — descriptions, inquiry forms, body copy
- **Mono**: JetBrainsMono — admin dashboard inputs, order IDs, technical data

## Elevation & Depth
- **Cards**: Zero radius, 2px rust borders, subtle drop shadow (`shadow-card`)
- **Header**: Rust background, cream text, sharp bottom border
- **Admin panel**: Dark brown sidebar, cream/muted zones, rust accent on active state
- **Footer**: Dark brown background, cream text, visible top border

## Structural Zones
| Zone | Background | Border | Contrast |
| --- | --- | --- | --- |
| Header | Primary (rust) | Rust bottom border | Cream text |
| Card Grid | Secondary (cream) | Primary (rust) 2px | Dark brown text |
| Admin Sidebar | Accent (dark brown) | Rust highlight | Cream text |
| Content Area | Secondary (cream) | Muted border | Dark brown text |
| Footer | Accent (dark brown) | Rust top border | Cream text |

## Component Patterns
- **Car card**: Zero-radius cream container, rust border, image with 4px top border rust accent, title in Fraunces
- **Inquiry form**: Bordered inputs, rust label accent, cream button on focus
- **Admin status badge**: Rust background (new), muted background (contacted), success (resolved)
- **Navigation**: Cream text on rust, bold Fraunces for active states

## Motion & Interaction
- Fade-in on load (`animate-fade`, 0.4s ease-out)
- Smooth transitions on hover (`transition-smooth`, 0.3s)
- No bounce or skew — restraint maintains vintage authenticity
- Admin active states pulse rust border (400ms)

## Spacing & Rhythm
- Base unit: 0.5rem (4px)
- Dense padding on cards (1.5rem), generous gutters (2rem)
- Alternating cream/muted backgrounds on grid rows for rhythm
- Line height: 1.6 for warm, readable serif body

## Signature Detail
Hard edges (zero radius), visible 2px rust borders on every interactive element, Fraunces sans-serif — together they evoke authentic vintage automotive signage and period dealer aesthetics without pastiche.

## Constraints
- No gradients (flat color blocking only)
- No rounded corners on primary elements (rusticity over softness)
- Maximum 3 colors per view (avoid cognitive load)
- Serif typography throughout (reinforces period authenticity)

## Dark Mode
- Background: Deep dark grey with warm brown tint (0.15 0.02 90)
- Cards: Slightly lighter dark (0.22 0.03 40) with cream borders
- Text: Warm cream (0.92 0.01 85) — no pure white
- Primary: Slightly lifted rust (0.62 0.16 36) for visibility
- Accent: Warm muted (0.75 0.02 90) for secondary UI
