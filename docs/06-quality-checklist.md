# Quality Checklist

## Visual
- [ ] Hero looks restaurant-specific, not template-like.
- [ ] Real food dominates above the fold.
- [ ] Color usage follows `DESIGN.md`.
- [ ] Typography has clear poster/editorial hierarchy.
- [ ] No repeated generic card grid.
- [ ] No random visual effects copied from component libraries.
- [ ] Every third-party component has been restyled to the project system.

## Content integrity
- [ ] Restaurant name/location correct.
- [ ] Phone verified.
- [ ] Hours re-verified.
- [ ] Rating/review count re-verified if displayed.
- [ ] Order URL verified.
- [ ] No invented reviews.
- [ ] No invented prices.
- [ ] Restaurant images are approved for use.

## Responsive
- [ ] 360px.
- [ ] 390px.
- [ ] 768px.
- [ ] 1024px.
- [ ] 1440px.
- [ ] 1920px.
- [ ] No horizontal overflow.
- [ ] Mobile sticky bar respects safe area.
- [ ] Gallery and dish rail swipe naturally.

## Accessibility
- [ ] Semantic heading order.
- [ ] Keyboard navigation.
- [ ] Visible focus.
- [ ] Alt text.
- [ ] Sufficient contrast.
- [ ] Reduced motion.
- [ ] Menu sheet/dialog focus behavior correct.
- [ ] Minimum 44px touch targets.

## Performance
- [ ] Hero image compressed and responsive.
- [ ] Below-fold images lazy-loaded.
- [ ] No production hotlinks to Instagram/Google image CDNs.
- [ ] No autoplay video with huge payload.
- [ ] Fonts limited to necessary weights.
- [ ] `npm run build` passes.
- [ ] No console errors.

## Deployment
- [ ] GitHub repo clean.
- [ ] PR quality workflow green.
- [ ] Vercel Preview works.
- [ ] `main` production deploy works.
- [ ] Social metadata correct.
- [ ] Canonical URL correct.
- [ ] External CTA links tested on mobile.
