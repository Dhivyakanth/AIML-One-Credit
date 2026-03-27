# Test Case Document
## Design Portfolio - Dhivyakanth P

**Project Name:** My Design Portfolio  
**Version:** 1.0.0  
**Document Date:** March 27, 2026  
**Prepared By:** QA Team  
**Technology Stack:** React 18, TypeScript, Vite, Framer Motion, Tailwind CSS, Vitest

---

## Table of Contents
1. [Introduction](#introduction)
2. [Test Environment](#test-environment)
3. [Test Strategy](#test-strategy)
4. [Functional Test Cases](#functional-test-cases)
5. [UI/UX Test Cases](#ui-ux-test-cases)
6. [Performance Test Cases](#performance-test-cases)
7. [Accessibility Test Cases](#accessibility-test-cases)
8. [Cross-Browser Test Cases](#cross-browser-test-cases)
9. [Responsive Design Test Cases](#responsive-design-test-cases)
10. [Animation & Interaction Test Cases](#animation--interaction-test-cases)
11. [Security Test Cases](#security-test-cases)
12. [Integration Test Cases](#integration-test-cases)

---

## 1. Introduction

### 1.1 Purpose
This document outlines comprehensive test cases for the Design Portfolio web application. It covers functional, non-functional, UI/UX, performance, and accessibility testing to ensure a high-quality user experience.

### 1.2 Scope
- All portfolio sections (Hero, Skills, Experience, Projects, Education, Contact)
- Navigation and routing functionality
- Interactive components and animations
- Form validation and submission
- Responsive design across devices
- Cross-browser compatibility
- Performance optimization
- Accessibility compliance (WCAG 2.1)

### 1.3 Test Objectives
- Verify all features work as expected
- Ensure smooth animations and interactions
- Validate responsive design on all devices
- Confirm accessibility standards compliance
- Test performance metrics meet targets
- Verify cross-browser compatibility

---

## 2. Test Environment

### 2.1 Hardware Requirements
- Desktop: Windows 11, macOS, Linux
- Mobile: iOS 14+, Android 10+
- Tablets: iPad, Android tablets

### 2.2 Software Requirements
- **Browsers:** Chrome 120+, Firefox 120+, Safari 17+, Edge 120+
- **Node.js:** v18+
- **Testing Framework:** Vitest 3.2.4
- **Testing Library:** @testing-library/react 16.0.0

### 2.3 Test Data
- Valid email formats
- Invalid email formats
- Form input edge cases
- Various screen resolutions

---

## 3. Test Strategy

### 3.1 Testing Levels
- **Unit Testing:** Individual component testing
- **Integration Testing:** Component interaction testing
- **System Testing:** End-to-end functionality
- **Acceptance Testing:** User experience validation

### 3.2 Testing Types
- Functional Testing
- UI/UX Testing
- Performance Testing
- Accessibility Testing
- Responsive Design Testing
- Cross-Browser Testing

---

## 4. Functional Test Cases

### 4.1 Navigation Tests

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| NAV-001 | Verify navbar displays on page load | 1. Open application<br>2. Observe navbar | Navbar visible with all menu items (About, Skills, Experience, Projects, Education, Contact) | High | ⬜ |
| NAV-002 | Verify smooth scroll to sections | 1. Click "Skills" in navbar<br>2. Observe scroll behavior | Page smoothly scrolls to Skills section | High | ⬜ |
| NAV-003 | Verify active section highlighting | 1. Scroll through page<br>2. Observe navbar | Active section highlighted in navbar | Medium | ⬜ |
| NAV-004 | Verify "Hire Me" button functionality | 1. Click "Hire Me" button<br>2. Observe behavior | Page scrolls to Contact section | High | ⬜ |
| NAV-005 | Verify navbar background on scroll | 1. Scroll down page<br>2. Observe navbar | Navbar background becomes glass effect after 50px scroll | Medium | ⬜ |
| NAV-006 | Verify scroll progress bar | 1. Scroll through page<br>2. Observe progress bar | Progress bar fills proportionally to scroll position | Low | ⬜ |
| NAV-007 | Verify Back to Top button | 1. Scroll down page<br>2. Click Back to Top button | Page smoothly scrolls to top | Medium | ⬜ |
| NAV-008 | Verify Back to Top visibility | 1. Scroll down 300px<br>2. Observe button | Back to Top button appears after scrolling | Medium | ⬜ |

### 4.2 Hero Section Tests

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| HERO-001 | Verify profile image loads | 1. Open application<br>2. Check Hero section | Profile image displays correctly | High | ⬜ |
| HERO-002 | Verify role cycling animation | 1. Observe role text<br>2. Wait 3 seconds | Role text cycles through: Full Stack Developer, AI & ML Engineer, Problem Solver, Tech Enthusiast | Medium | ⬜ |
| HERO-003 | Verify contact info pills display | 1. Check Hero section | Email, Phone, Location pills visible | High | ⬜ |
| HERO-004 | Verify resume download | 1. Click "My Resume" button<br>2. Check download | Resume PDF downloads successfully | High | ⬜ |
| HERO-005 | Verify social links | 1. Click LinkedIn link<br>2. Verify new tab opens | LinkedIn profile opens in new tab | High | ⬜ |
| HERO-006 | Verify GitHub link | 1. Click GitHub link<br>2. Verify new tab opens | GitHub profile opens in new tab | High | ⬜ |
| HERO-007 | Verify LeetCode link | 1. Click LeetCode link<br>2. Verify new tab opens | LeetCode profile opens in new tab | High | ⬜ |
| HERO-008 | Verify background video plays | 1. Open application<br>2. Observe background | Background video plays automatically and loops | Medium | ⬜ |
| HERO-009 | Verify scroll indicator | 1. Check bottom of Hero section | Scroll indicator with chevron animates | Low | ⬜ |
| HERO-010 | Verify status dot animation | 1. Hover over profile image<br>2. Observe status dot | Green status dot with ping animation visible | Low | ⬜ |

### 4.3 Skills Section Tests

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| SKILL-001 | Verify all skill categories display | 1. Navigate to Skills section | 4 categories visible: Programming Languages, Web Technologies, AI/ML, Tools & Platforms | High | ⬜ |
| SKILL-002 | Verify skill pills display | 1. Check each category | All skills display as interactive pills | High | ⬜ |
| SKILL-003 | Verify CGPA counter | 1. Scroll to Skills section<br>2. Observe counter | CGPA counter animates to 9.0 | Medium | ⬜ |
| SKILL-004 | Verify Internships counter | 1. Scroll to Skills section<br>2. Observe counter | Internships counter animates to 3+ | Medium | ⬜ |
| SKILL-005 | Verify Projects counter | 1. Scroll to Skills section<br>2. Observe counter | Projects counter animates to 4+ | Medium | ⬜ |
| SKILL-006 | Verify skill card hover effect | 1. Hover over skill card<br>2. Observe effect | Card glows and tilts slightly | Low | ⬜ |
| SKILL-007 | Verify skill pill hover effect | 1. Hover over skill pill<br>2. Observe effect | Pill scales up and changes color | Low | ⬜ |
| SKILL-008 | Verify inline image card | 1. Check Skills section<br>2. Observe image card | AI Full Stack Development image card displays with badge | Medium | ⬜ |

### 4.4 Experience Section Tests

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| EXP-001 | Verify experience entries display | 1. Navigate to Experience section | All experience entries visible with timeline | High | ⬜ |
| EXP-002 | Verify company logos display | 1. Check experience cards | Company logos/icons display correctly | Medium | ⬜ |
| EXP-003 | Verify date ranges | 1. Check each experience entry | Date ranges display correctly | High | ⬜ |
| EXP-004 | Verify job descriptions | 1. Read experience details | Job descriptions and responsibilities visible | High | ⬜ |
| EXP-005 | Verify technology tags | 1. Check experience cards | Technology tags display for each role | Medium | ⬜ |
| EXP-006 | Verify timeline animation | 1. Scroll to Experience section<br>2. Observe animation | Timeline animates into view | Low | ⬜ |

### 4.5 Projects Section Tests

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| PROJ-001 | Verify project cards display | 1. Navigate to Projects section | 3 project cards visible in stacked layout | High | ⬜ |
| PROJ-002 | Verify card spread animation | 1. Scroll to Projects section<br>2. Observe animation | Cards spread out in carpet layout | High | ⬜ |
| PROJ-003 | Verify River AI project details | 1. Check River AI card | Title, subtitle, description, tags, and image display | High | ⬜ |
| PROJ-004 | Verify AI Sales Chatbot details | 1. Check AI Chatbot card | Title, subtitle, description, tags, and image display | High | ⬜ |
| PROJ-005 | Verify Sign Language project details | 1. Check Sign Language card | Title, subtitle, description, tags, and image display | High | ⬜ |
| PROJ-006 | Verify card hover effect | 1. Hover over project card<br>2. Observe effect | Hovered card scales up, others dim | High | ⬜ |
| PROJ-007 | Verify project modal opens | 1. Click on project card<br>2. Observe modal | Modal opens with full project details | High | ⬜ |
| PROJ-008 | Verify modal close button | 1. Open modal<br>2. Click X button | Modal closes smoothly | High | ⬜ |
| PROJ-009 | Verify modal backdrop close | 1. Open modal<br>2. Click outside modal | Modal closes when clicking backdrop | Medium | ⬜ |
| PROJ-010 | Verify project tags in modal | 1. Open modal<br>2. Check tags | All technology tags display and are interactive | Medium | ⬜ |
| PROJ-011 | Verify inline image cards | 1. Check Projects section<br>2. Observe image reel | 4 inline image cards display (Smart Systems, Neural Network, Computer Vision, Robotics) | Medium | ⬜ |
| PROJ-012 | Verify project number badges | 1. Check each card | Number badges (01, 02, 03) display correctly | Low | ⬜ |

### 4.6 Education Section Tests

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| EDU-001 | Verify education entries display | 1. Navigate to Education section | All education entries visible | High | ⬜ |
| EDU-002 | Verify degree information | 1. Check education cards | Degree, institution, dates display correctly | High | ⬜ |
| EDU-003 | Verify CGPA/percentage display | 1. Check education cards | Academic scores display correctly | High | ⬜ |
| EDU-004 | Verify institution logos | 1. Check education cards | Institution logos/images display | Medium | ⬜ |
| EDU-005 | Verify timeline animation | 1. Scroll to Education section<br>2. Observe animation | Education cards animate into view | Low | ⬜ |

### 4.7 Contact Section Tests

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| CONT-001 | Verify contact form displays | 1. Navigate to Contact section | Form with Name, Email, Message fields visible | High | ⬜ |
| CONT-002 | Verify name field validation | 1. Leave name empty<br>2. Submit form | Error message: "Please fill in all fields" | High | ⬜ |
| CONT-003 | Verify email field validation | 1. Enter invalid email<br>2. Submit form | Error message: "Please enter a valid email" | High | ⬜ |
| CONT-004 | Verify message field validation | 1. Leave message empty<br>2. Submit form | Error message: "Please fill in all fields" | High | ⬜ |
| CONT-005 | Verify valid form submission | 1. Fill all fields correctly<br>2. Click Send Message | Mail client opens with pre-filled data | High | ⬜ |
| CONT-006 | Verify form field focus animation | 1. Click on name field<br>2. Observe label | Label animates up and changes color | Medium | ⬜ |
| CONT-007 | Verify loading state | 1. Submit form<br>2. Observe button | Button shows loading spinner | Medium | ⬜ |
| CONT-008 | Verify form reset after submission | 1. Submit form<br>2. Check fields | Form fields clear after submission | Medium | ⬜ |
| CONT-009 | Verify email contact card | 1. Check contact info cards<br>2. Click email card | Email link opens mail client | High | ⬜ |
| CONT-010 | Verify phone contact card | 1. Check contact info cards<br>2. Click phone card | Phone dialer opens (on mobile) | Medium | ⬜ |
| CONT-011 | Verify location card displays | 1. Check contact info cards | Location card shows: Tiruchengode, Namakkal | Medium | ⬜ |
| CONT-012 | Verify social links in contact | 1. Check contact section<br>2. Click social links | LinkedIn, GitHub, LeetCode links work | Medium | ⬜ |
| CONT-013 | Verify character limits | 1. Enter 101 characters in name<br>2. Observe behavior | Name field limited to 100 characters | Low | ⬜ |
| CONT-014 | Verify message character limit | 1. Enter 1001 characters in message<br>2. Observe behavior | Message field limited to 1000 characters | Low | ⬜ |
| CONT-015 | Verify footer copyright | 1. Scroll to bottom<br>2. Check footer | Footer shows: "© 2025 Dhivyakanth P. All rights reserved." | Low | ⬜ |

---

## 5. UI/UX Test Cases

### 5.1 Visual Design Tests

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| UI-001 | Verify color scheme consistency | 1. Navigate through all sections<br>2. Check colors | Primary color (emerald green) used consistently | High | ⬜ |
| UI-002 | Verify typography consistency | 1. Check all text elements | Font families consistent throughout | High | ⬜ |
| UI-003 | Verify gradient text effects | 1. Check headings and accents | Gradient text displays correctly | Medium | ⬜ |
| UI-004 | Verify glass morphism effects | 1. Check cards and navbar | Glass effect with backdrop blur visible | Medium | ⬜ |
| UI-005 | Verify border styles | 1. Check all cards and components | Border colors and styles consistent | Medium | ⬜ |
| UI-006 | Verify spacing consistency | 1. Check padding and margins | Spacing follows design system | Medium | ⬜ |
| UI-007 | Verify icon consistency | 1. Check all icons | Lucide icons used consistently | Low | ⬜ |
| UI-008 | Verify background effects | 1. Check all sections | Gradient glows and particles display | Low | ⬜ |

### 5.2 Interactive Elements Tests

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| INT-001 | Verify button hover states | 1. Hover over all buttons | Buttons show hover effects (scale, glow) | High | ⬜ |
| INT-002 | Verify link hover states | 1. Hover over all links | Links show underline animation | Medium | ⬜ |
| INT-003 | Verify card hover effects | 1. Hover over cards | Cards tilt and glow on hover | Medium | ⬜ |
| INT-004 | Verify magnetic button effect | 1. Move cursor near magnetic buttons<br>2. Observe behavior | Buttons follow cursor slightly | Low | ⬜ |
| INT-005 | Verify custom cursor | 1. Move cursor on page<br>2. Observe cursor | Custom cursor with glow effect follows mouse | Low | ⬜ |
| INT-006 | Verify cursor on hover | 1. Hover over interactive elements<br>2. Observe cursor | Cursor changes on hover | Low | ⬜ |

---

## 6. Performance Test Cases

### 6.1 Load Performance Tests

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| PERF-001 | Verify initial page load time | 1. Open application<br>2. Measure load time | Page loads in < 3 seconds | High | ⬜ |
| PERF-002 | Verify First Contentful Paint (FCP) | 1. Open application<br>2. Measure FCP | FCP < 1.8 seconds | High | ⬜ |
| PERF-003 | Verify Largest Contentful Paint (LCP) | 1. Open application<br>2. Measure LCP | LCP < 2.5 seconds | High | ⬜ |
| PERF-004 | Verify Time to Interactive (TTI) | 1. Open application<br>2. Measure TTI | TTI < 3.8 seconds | High | ⬜ |
| PERF-005 | Verify Cumulative Layout Shift (CLS) | 1. Load page<br>2. Measure CLS | CLS < 0.1 | Medium | ⬜ |
| PERF-006 | Verify image optimization | 1. Check network tab<br>2. Verify image sizes | Images properly optimized and lazy loaded | Medium | ⬜ |
| PERF-007 | Verify bundle size | 1. Build application<br>2. Check bundle size | Total bundle < 500KB (gzipped) | Medium | ⬜ |

### 6.2 Runtime Performance Tests

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| PERF-008 | Verify smooth scrolling | 1. Scroll through entire page<br>2. Observe performance | Scrolling maintains 60fps | High | ⬜ |
| PERF-009 | Verify animation performance | 1. Trigger all animations<br>2. Monitor frame rate | Animations run at 60fps | High | ⬜ |
| PERF-010 | Verify memory usage | 1. Use page for 5 minutes<br>2. Check memory | No memory leaks detected | Medium | ⬜ |
| PERF-011 | Verify video performance | 1. Play background videos<br>2. Monitor CPU usage | CPU usage remains reasonable | Medium | ⬜ |
| PERF-012 | Verify particle effects performance | 1. Observe starfield animation<br>2. Monitor performance | Particle effects don't impact performance | Low | ⬜ |

---

## 7. Accessibility Test Cases

### 7.1 Keyboard Navigation Tests

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| A11Y-001 | Verify tab navigation | 1. Press Tab key repeatedly<br>2. Observe focus | All interactive elements focusable in logical order | High | ⬜ |
| A11Y-002 | Verify focus indicators | 1. Tab through elements<br>2. Observe focus | Clear focus indicators visible | High | ⬜ |
| A11Y-003 | Verify Enter key on buttons | 1. Focus on button<br>2. Press Enter | Button activates | High | ⬜ |
| A11Y-004 | Verify Space key on buttons | 1. Focus on button<br>2. Press Space | Button activates | High | ⬜ |
| A11Y-005 | Verify Escape key on modal | 1. Open modal<br>2. Press Escape | Modal closes | Medium | ⬜ |
| A11Y-006 | Verify skip to content link | 1. Tab on page load<br>2. Check first focus | Skip to content link available | Medium | ⬜ |

### 7.2 Screen Reader Tests

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| A11Y-007 | Verify heading hierarchy | 1. Use screen reader<br>2. Navigate by headings | Proper heading hierarchy (h1, h2, h3) | High | ⬜ |
| A11Y-008 | Verify alt text on images | 1. Use screen reader<br>2. Navigate to images | All images have descriptive alt text | High | ⬜ |
| A11Y-009 | Verify ARIA labels | 1. Use screen reader<br>2. Navigate interactive elements | ARIA labels present where needed | High | ⬜ |
| A11Y-010 | Verify form labels | 1. Use screen reader<br>2. Navigate form | All form fields have associated labels | High | ⬜ |
| A11Y-011 | Verify link descriptions | 1. Use screen reader<br>2. Navigate links | Links have descriptive text | Medium | ⬜ |
| A11Y-012 | Verify button descriptions | 1. Use screen reader<br>2. Navigate buttons | Buttons have clear purpose descriptions | Medium | ⬜ |

### 7.3 Color Contrast Tests

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| A11Y-013 | Verify text contrast ratio | 1. Check all text elements<br>2. Measure contrast | Text contrast ratio ≥ 4.5:1 (WCAG AA) | High | ⬜ |
| A11Y-014 | Verify heading contrast | 1. Check all headings<br>2. Measure contrast | Heading contrast ratio ≥ 3:1 | High | ⬜ |
| A11Y-015 | Verify button contrast | 1. Check all buttons<br>2. Measure contrast | Button text contrast ratio ≥ 4.5:1 | High | ⬜ |
| A11Y-016 | Verify link contrast | 1. Check all links<br>2. Measure contrast | Link contrast ratio ≥ 4.5:1 | Medium | ⬜ |

---

## 8. Cross-Browser Test Cases

### 8.1 Browser Compatibility Tests

| Test ID | Test Case | Browser | Steps | Expected Result | Priority | Status |
|---------|-----------|---------|-------|-----------------|----------|--------|
| BROW-001 | Verify Chrome compatibility | Chrome 120+ | 1. Open in Chrome<br>2. Test all features | All features work correctly | High | ⬜ |
| BROW-002 | Verify Firefox compatibility | Firefox 120+ | 1. Open in Firefox<br>2. Test all features | All features work correctly | High | ⬜ |
| BROW-003 | Verify Safari compatibility | Safari 17+ | 1. Open in Safari<br>2. Test all features | All features work correctly | High | ⬜ |
| BROW-004 | Verify Edge compatibility | Edge 120+ | 1. Open in Edge<br>2. Test all features | All features work correctly | High | ⬜ |
| BROW-005 | Verify animations in Chrome | Chrome 120+ | 1. Trigger animations<br>2. Observe behavior | Animations smooth and correct | Medium | ⬜ |
| BROW-006 | Verify animations in Firefox | Firefox 120+ | 1. Trigger animations<br>2. Observe behavior | Animations smooth and correct | Medium | ⬜ |
| BROW-007 | Verify animations in Safari | Safari 17+ | 1. Trigger animations<br>2. Observe behavior | Animations smooth and correct | Medium | ⬜ |
| BROW-008 | Verify video playback in all browsers | All browsers | 1. Check background videos<br>2. Verify playback | Videos play correctly in all browsers | Medium | ⬜ |

---

## 9. Responsive Design Test Cases

### 9.1 Mobile Tests (320px - 767px)

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| RESP-001 | Verify mobile layout | 1. Resize to 375px width<br>2. Check layout | Layout adapts to mobile view | High | ⬜ |
| RESP-002 | Verify mobile navigation | 1. Check navbar on mobile<br>2. Test navigation | Navigation works on mobile | High | ⬜ |
| RESP-003 | Verify mobile hero section | 1. Check Hero on mobile<br>2. Verify elements | All Hero elements visible and properly sized | High | ⬜ |
| RESP-004 | Verify mobile project cards | 1. Check Projects on mobile<br>2. Test interactions | Project cards display and interact correctly | High | ⬜ |
| RESP-005 | Verify mobile contact form | 1. Check Contact form on mobile<br>2. Test form | Form usable on mobile devices | High | ⬜ |
| RESP-006 | Verify touch interactions | 1. Use touch gestures<br>2. Test all interactions | Touch interactions work smoothly | High | ⬜ |
| RESP-007 | Verify mobile typography | 1. Check text on mobile<br>2. Verify readability | Text sizes appropriate for mobile | Medium | ⬜ |
| RESP-008 | Verify mobile images | 1. Check images on mobile<br>2. Verify loading | Images load and display correctly | Medium | ⬜ |

### 9.2 Tablet Tests (768px - 1023px)

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| RESP-009 | Verify tablet layout | 1. Resize to 768px width<br>2. Check layout | Layout adapts to tablet view | High | ⬜ |
| RESP-010 | Verify tablet navigation | 1. Check navbar on tablet<br>2. Test navigation | Navigation works on tablet | High | ⬜ |
| RESP-011 | Verify tablet grid layouts | 1. Check Skills/Projects on tablet<br>2. Verify grids | Grid layouts adapt appropriately | Medium | ⬜ |
| RESP-012 | Verify tablet touch/mouse | 1. Test with touch and mouse<br>2. Verify interactions | Both input methods work | Medium | ⬜ |

### 9.3 Desktop Tests (1024px+)

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| RESP-013 | Verify desktop layout | 1. View at 1920px width<br>2. Check layout | Layout displays optimally | High | ⬜ |
| RESP-014 | Verify large screen layout | 1. View at 2560px width<br>2. Check layout | Content doesn't stretch excessively | Medium | ⬜ |
| RESP-015 | Verify hover effects on desktop | 1. Hover over elements<br>2. Observe effects | All hover effects work correctly | Medium | ⬜ |
| RESP-016 | Verify desktop navigation | 1. Check navbar on desktop<br>2. Test all links | Full navigation menu visible and functional | High | ⬜ |

### 9.4 Orientation Tests

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| RESP-017 | Verify portrait orientation | 1. View on mobile portrait<br>2. Check layout | Layout works in portrait mode | High | ⬜ |
| RESP-018 | Verify landscape orientation | 1. Rotate to landscape<br>2. Check layout | Layout adapts to landscape mode | High | ⬜ |
| RESP-019 | Verify orientation change | 1. Rotate device<br>2. Observe transition | Smooth transition between orientations | Medium | ⬜ |

---

## 10. Animation & Interaction Test Cases

### 10.1 Scroll Animation Tests

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| ANIM-001 | Verify scroll-triggered animations | 1. Scroll through page<br>2. Observe animations | Elements animate into view on scroll | High | ⬜ |
| ANIM-002 | Verify parallax effects | 1. Scroll through Hero section<br>2. Observe parallax | Parallax scrolling works smoothly | Medium | ⬜ |
| ANIM-003 | Verify section shuffle effect | 1. Scroll through sections<br>2. Observe transitions | Sections have subtle shuffle animation | Medium | ⬜ |
| ANIM-004 | Verify fade-in animations | 1. Scroll to new sections<br>2. Observe fade-in | Elements fade in smoothly | Medium | ⬜ |
| ANIM-005 | Verify text reveal animations | 1. Scroll to headings<br>2. Observe text reveal | Text reveals word by word | Low | ⬜ |

### 10.2 Hover Animation Tests

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| ANIM-006 | Verify card tilt on hover | 1. Hover over GlowCard<br>2. Observe tilt | Card tilts based on mouse position | Medium | ⬜ |
| ANIM-007 | Verify button scale on hover | 1. Hover over buttons<br>2. Observe scale | Buttons scale up slightly | Medium | ⬜ |
| ANIM-008 | Verify glow effect on hover | 1. Hover over cards<br>2. Observe glow | Glow effect appears on hover | Low | ⬜ |
| ANIM-009 | Verify image zoom on hover | 1. Hover over project images<br>2. Observe zoom | Images zoom in slightly | Low | ⬜ |

### 10.3 Loading Animation Tests

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| ANIM-010 | Verify page load animations | 1. Refresh page<br>2. Observe initial animations | Hero section animates on load | High | ⬜ |
| ANIM-011 | Verify character animations | 1. Load page<br>2. Observe title | Title characters animate in sequence | Medium | ⬜ |
| ANIM-012 | Verify stagger animations | 1. Scroll to Skills<br>2. Observe cards | Cards animate in with stagger effect | Medium | ⬜ |
| ANIM-013 | Verify spinner animation | 1. Submit contact form<br>2. Observe button | Loading spinner animates | Low | ⬜ |

### 10.4 Background Animation Tests

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| ANIM-014 | Verify starfield animation | 1. Observe background<br>2. Check stars | Stars twinkle and move subtly | Medium | ⬜ |
| ANIM-015 | Verify particle effects | 1. Check background<br>2. Observe particles | Particle effects animate smoothly | Low | ⬜ |
| ANIM-016 | Verify gradient animations | 1. Observe background glows<br>2. Check animation | Gradient glows pulse gently | Low | ⬜ |

---

## 11. Security Test Cases

### 11.1 Input Validation Tests

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| SEC-001 | Verify XSS prevention in name field | 1. Enter `<script>alert('XSS')</script>` in name<br>2. Submit form | Script not executed, treated as text | High | ⬜ |
| SEC-002 | Verify XSS prevention in email field | 1. Enter malicious script in email<br>2. Submit form | Script not executed | High | ⬜ |
| SEC-003 | Verify XSS prevention in message field | 1. Enter malicious script in message<br>2. Submit form | Script not executed | High | ⬜ |
| SEC-004 | Verify SQL injection prevention | 1. Enter SQL injection string<br>2. Submit form | Input sanitized, no SQL execution | High | ⬜ |
| SEC-005 | Verify email format validation | 1. Enter various invalid emails<br>2. Submit form | Only valid email formats accepted | High | ⬜ |

### 11.2 Link Security Tests

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| SEC-006 | Verify external links security | 1. Check external links<br>2. Verify attributes | External links have rel="noopener noreferrer" | High | ⬜ |
| SEC-007 | Verify download link security | 1. Click resume download<br>2. Verify file | PDF downloads safely | Medium | ⬜ |
| SEC-008 | Verify mailto link security | 1. Click email links<br>2. Verify behavior | Mailto links don't expose sensitive data | Medium | ⬜ |

### 11.3 Content Security Tests

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| SEC-009 | Verify CSP headers | 1. Check network headers<br>2. Verify CSP | Content Security Policy headers present | Medium | ⬜ |
| SEC-010 | Verify HTTPS enforcement | 1. Try HTTP access<br>2. Verify redirect | HTTP redirects to HTTPS | High | ⬜ |
| SEC-011 | Verify no sensitive data in console | 1. Open dev console<br>2. Check logs | No sensitive data logged | Medium | ⬜ |

---

## 12. Integration Test Cases

### 12.1 Component Integration Tests

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| INT-001 | Verify Hero to Skills navigation | 1. Click Skills in navbar<br>2. Verify scroll | Smooth scroll from Hero to Skills | High | ⬜ |
| INT-002 | Verify form submission flow | 1. Fill form<br>2. Submit<br>3. Check toast | Complete flow works: validation → submission → toast | High | ⬜ |
| INT-003 | Verify modal open/close flow | 1. Click project card<br>2. Close modal<br>3. Repeat | Modal opens and closes reliably | High | ⬜ |
| INT-004 | Verify scroll progress tracking | 1. Scroll through page<br>2. Check navbar | Active section updates correctly | Medium | ⬜ |
| INT-005 | Verify Back to Top integration | 1. Scroll down<br>2. Click Back to Top<br>3. Verify position | Returns to top and navbar updates | Medium | ⬜ |

### 12.2 Third-Party Integration Tests

| Test ID | Test Case | Steps | Expected Result | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| INT-006 | Verify Framer Motion integration | 1. Trigger animations<br>2. Check performance | Animations work without errors | High | ⬜ |
| INT-007 | Verify React Router integration | 1. Navigate to invalid route<br>2. Check 404 page | 404 page displays correctly | High | ⬜ |
| INT-008 | Verify toast notifications | 1. Trigger various toasts<br>2. Observe display | Toasts display and dismiss correctly | Medium | ⬜ |
| INT-009 | Verify video element integration | 1. Load page<br>2. Check video playback | Background videos play without errors | Medium | ⬜ |

---

## Test Execution Summary

### Test Metrics

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Test Coverage | 95% | TBD | ⬜ |
| Pass Rate | 98% | TBD | ⬜ |
| Critical Bugs | 0 | TBD | ⬜ |
| Performance Score | 90+ | TBD | ⬜ |
| Accessibility Score | 95+ | TBD | ⬜ |

### Priority Distribution

- **High Priority:** 120 test cases
- **Medium Priority:** 85 test cases
- **Low Priority:** 45 test cases
- **Total:** 250 test cases

---

## Test Execution Guidelines

### 1. Pre-Test Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

### 2. Test Environment Setup
- Clear browser cache before testing
- Use incognito/private mode for clean state
- Test on actual devices when possible
- Use browser dev tools for debugging

### 3. Bug Reporting Format
```
Bug ID: BUG-XXX
Title: [Brief description]
Severity: Critical/High/Medium/Low
Priority: P0/P1/P2/P3
Steps to Reproduce:
1. Step 1
2. Step 2
3. Step 3
Expected Result: [What should happen]
Actual Result: [What actually happens]
Environment: [Browser, OS, Device]
Screenshots: [Attach if applicable]
```

### 4. Test Status Indicators
- ⬜ Not Started
- 🔄 In Progress
- ✅ Passed
- ❌ Failed
- ⚠️ Blocked
- 🔁 Retest Required

---

## Automation Recommendations

### High Priority for Automation
1. Form validation tests
2. Navigation tests
3. Responsive design tests
4. Cross-browser compatibility tests
5. Performance regression tests

### Suggested Tools
- **Unit Testing:** Vitest, React Testing Library
- **E2E Testing:** Playwright, Cypress
- **Visual Regression:** Percy, Chromatic
- **Performance:** Lighthouse CI
- **Accessibility:** axe-core, Pa11y

---

## Appendix

### A. Test Data

#### Valid Email Formats
- user@example.com
- test.user@domain.co.uk
- name+tag@company.org

#### Invalid Email Formats
- invalid.email
- @example.com
- user@
- user @example.com

#### Edge Case Inputs
- Empty strings
- Very long strings (>1000 chars)
- Special characters: `<>'"&`
- Unicode characters
- Emoji characters

### B. Browser Versions Tested
- Chrome: 120.0.6099.109
- Firefox: 121.0
- Safari: 17.2
- Edge: 120.0.2210.61

### C. Device Resolutions Tested
- Mobile: 375x667, 414x896, 360x640
- Tablet: 768x1024, 820x1180
- Desktop: 1920x1080, 2560x1440, 3840x2160

### D. Accessibility Tools
- NVDA Screen Reader
- JAWS Screen Reader
- VoiceOver (macOS/iOS)
- TalkBack (Android)
- axe DevTools
- WAVE Browser Extension

---

## Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-27 | QA Team | Initial document creation |

---

## Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| QA Lead | | | |
| Project Manager | | | |
| Developer | | | |

---

**End of Test Case Document**
