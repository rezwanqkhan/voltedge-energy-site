---
name: industrial-ui-design
description: Best practices for modern B2B industrial IoT web interfaces, curved glassmorphism, dynamic telemetry visualizations, and high-impact visual design.
---

# Industrial IoT & Curved Glassmorphism Design System

## Core Aesthetic Principles
1. **Atmospheric Depth & Mesh Gradients**:
   - Never use flat pitch-black backgrounds.
   - Use multi-layered ambient radial glows (emerald `#10b981`, electric cyan `#06b6d4`, deep indigo `#4f46e5`, and violet `#8b5cf6`) with smooth blur (`blur-[120px]`).
   - Layer technical grid patterns, isometric dot arrays, or circuit traces with `opacity-15` to `opacity-25`.

2. **Curved Glassmorphism (Frosted Glass)**:
   - Border radius: `rounded-2xl` (16px) to `rounded-3xl` (24px).
   - Glass effect: `bg-slate-900/40 backdrop-blur-xl border border-white/10`.
   - Gradient borders: Subtle top-to-bottom edge shine (`border-t-emerald-500/30 border-l-white/10 border-r-white/5 border-b-transparent`).
   - Inner glow / subtle shadow: `shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]`.

3. **Visual Punch & Real Hardware/Platform Graphics**:
   - Industrial B2B clients need to see the actual hardware and platform!
   - Feature 3D industrial renders of DIN-rail hardware, antennas, antennas, LED indicators, and high-resolution platform UI preview cards.
   - Never show bare text boxes with a tiny icon — every product must have rich visuals, status indicators, badges, and tangible engineering specs.

4. **Dynamic Telemetry & Micro-Interactions**:
   - Live pulsating status beacons (animated pings in emerald and cyan).
   - Real-time SVG sparklines, waveforms, and live-updating telemetry numbers.
   - Hover transformations: `hover:scale-[1.02]`, `hover:border-emerald-500/50`, `hover:shadow-emerald-500/10`.
   - Smooth Framer Motion transitions with spring physics.
