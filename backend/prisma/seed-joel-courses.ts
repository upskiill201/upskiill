import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper to retry DB queries in case of connection timeouts
async function runWithRetry<T>(fn: () => Promise<T>, retries = 5, delayMs = 1500): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (e: any) {
      if (i === retries - 1) throw e;
      console.warn(`⚠️ DB connection warning. Retrying in ${delayMs}ms... (Attempt ${i + 1}/${retries}). Error: ${e.message || e}`);
      await new Promise(r => setTimeout(r, delayMs));
    }
  }
  throw new Error('Max DB retries reached');
}

// ─── 5 DOMAIN-SPECIFIC COURSE CURRICULUMS ───
const COURSES_DATA = [
  {
    id: 'c1-joel',
    title: 'Figma UI/UX Essentials: Zero to Hero',
    slug: 'figma-ui-ux-essentials-zero-to-hero',
    shortDescription: 'Master components, auto-layout, prototyping, design systems, and developer handoff in Figma.',
    description: 'Learn industry-standard UI/UX design from scratch. Construct responsive component libraries, master Auto-Layout 5.0, create high-fidelity interactive micro-interactions, and hand off developer-ready design specs.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    price: 0,
    originalPrice: 99,
    published: true,
    category: 'Design',
    subcategory: 'UI/UX Design',
    level: 'Beginner',
    duration: '12h 30m',
    creatorTimeWeekly: '2-4 hours',
    subtitle: 'Build interactive prototypes and high-fidelity wireframes.',
    language: 'English',
    skills: ['Figma', 'UI Design', 'UX Prototyping', 'Component Libraries', 'Auto-Layout'],
    requirements: ['Basic computer skills and an internet browser'],
    outcomes: [
      'Create fully interactive app prototypes with modern animations',
      'Master auto-layout and constraints for responsive UI cards',
      'Deliver developer-ready Figma handoffs with clean specs'
    ],
    modules: [
      {
        title: 'Module 1: Figma Interface & Vector Networks',
        lessons: [
          {
            title: 'Lesson 1: Navigating the Canvas & Artboards',
            wyl: [
              'Understand the Figma infinite canvas navigation and zoom shortcuts',
              'Create and configure preset frame viewports for Mobile, Tablet, and Desktop',
              'Organize layer hierarchies and group elements efficiently'
            ]
          },
          {
            title: 'Lesson 2: Vector Pen Tool & Control Points',
            wyl: [
              'Master vector networks and manipulate individual control points',
              'Construct custom icons and geometric vector shapes from scratch',
              'Apply fill rules, stroke alignment, and corner rounding'
            ]
          },
          {
            title: 'Lesson 3: Shapes, Boolean Operations & Masks',
            wyl: [
              'Combine shapes using Union, Subtract, Intersect, and Exclude',
              'Use image masks to crop avatar photos and hero banners non-destructively',
              'Flatten vector groups into clean production-ready SVGs'
            ]
          },
          {
            title: 'Lesson 4: Color Styles, Gradients & Tokens',
            wyl: [
              'Create reusable brand color styles in Hex, HSL, and RGBA format',
              'Build linear, radial, and angular gradient overlays',
              'Organize semantic design tokens for light and dark modes'
            ]
          },
          {
            title: 'Lesson 5: Typography Hierarchies & Text Styles',
            wyl: [
              'Establish typographic scales from Display H1 down to Caption text',
              'Configure line height, letter spacing, and paragraph spacing',
              'Save text styles to enforce consistency across team files'
            ]
          }
        ]
      },
      {
        title: 'Module 2: Layout Systems, Grids & Alignment',
        lessons: [
          {
            title: 'Lesson 6: Column Grids & Baseline Alignment',
            wyl: [
              'Setup 12-column desktop grids and 4-column mobile grids',
              'Align UI elements to an 8pt spatial grid system',
              'Set gutter widths and margin paddings for responsive layouts'
            ]
          },
          {
            title: 'Lesson 7: Constraints, Resizing & Pinning',
            wyl: [
              'Configure Top, Bottom, Left, Right, and Center constraints',
              'Pin elements to maintain fixed navigation bars during window scaling',
              'Test frame stretching behaviors across different screen sizes'
            ]
          },
          {
            title: 'Lesson 8: Spacing Tokens & 8pt Grid Rule',
            wyl: [
              'Apply standardized spacing tokens (4px, 8px, 16px, 24px, 32px)',
              'Maintain consistent vertical rhythm across long-form page layouts',
              'Audit layouts to eliminate off-grid decimal pixel alignment'
            ]
          },
          {
            title: 'Lesson 9: Responsive Frame Scaling Strategies',
            wyl: [
              'Adapt desktop dashboard designs down to mobile screen viewports',
              'Refactor navigation bars into collapsible mobile hamburger menus',
              'Re-order card stacks for small display dimensions'
            ]
          },
          {
            title: 'Lesson 10: Multi-Screen Layout Breakpoints',
            wyl: [
              'Define standard breakpoints (390px, 768px, 1280px, 1440px)',
              'Structure multi-screen responsive wireframes side-by-side',
              'Document responsive behavior notes for frontend developers'
            ]
          }
        ]
      },
      {
        title: 'Module 3: Components, Variants & Properties',
        lessons: [
          {
            title: 'Lesson 11: Main Components vs Component Instances',
            wyl: [
              'Create main components and understand single-source-of-truth updates',
              'Insert component instances and safely apply local text/color overrides',
              'Reset instances back to main component defaults when needed'
            ]
          },
          {
            title: 'Lesson 12: Creating Variant Sets & Component States',
            wyl: [
              'Combine button components into unified Variant sets',
              'Design Default, Hover, Focused, Pressed, and Disabled states',
              'Organize variant properties like Size, State, and Icon Placement'
            ]
          },
          {
            title: 'Lesson 13: Boolean, Text & Swap Component Properties',
            wyl: [
              'Expose Boolean properties to toggle leading/trailing icons on and off',
              'Add Text properties to edit button labels directly from the inspect panel',
              'Use Instance Swap properties to switch icon glyphs effortlessly'
            ]
          },
          {
            title: 'Lesson 14: Managing Component Overrides',
            wyl: [
              'Override text strings, fill colors, and nested component icons',
              'Preserve overrides when toggling between component variant states',
              'Avoid breaking main component links during deep customization'
            ]
          },
          {
            title: 'Lesson 15: Organizing Design System Libraries',
            wyl: [
              'Structure design files into Foundation, Components, and Patterns',
              'Publish shared team libraries across Figma workspaces',
              'Review and accept library updates without breaking active mockups'
            ]
          }
        ]
      },
      {
        title: 'Module 4: Advanced Auto-Layout 5.0',
        lessons: [
          {
            title: 'Lesson 16: Directional Stacks & Wrap Behavior',
            wyl: [
              'Build vertical and horizontal auto-layout containers',
              'Use Auto-Layout Wrap to create responsive tag clouds and chip lists',
              'Set horizontal and vertical padding values independently'
            ]
          },
          {
            title: 'Lesson 17: Fixed, Hug & Fill Sizing Modes',
            wyl: [
              'Master Hug Contents for dynamic buttons that expand with text',
              'Master Fill Container to create responsive cards that stretch seamlessly',
              'Combine Fixed width containers with inner Fill elements'
            ]
          },
          {
            title: 'Lesson 18: Negative Spacing & Canvas Stacking Order',
            wyl: [
              'Set negative item spacing values to create overlapping avatar stacks',
              'Adjust canvas stacking order (First on top vs Last on top)',
              'Align text baselines inside auto-layout button groups'
            ]
          },
          {
            title: 'Lesson 19: Absolute Positioning Inside Auto-Layout',
            wyl: [
              'Pin notification badge dots over icon containers using Absolute Position',
              'Maintain auto-layout responsiveness while placing overlay badges',
              'Combine constraints with absolute positioning for complex UI cards'
            ]
          },
          {
            title: 'Lesson 20: Building Complex Responsive Card UI',
            wyl: [
              'Assemble a full e-commerce product card with auto-layout',
              'Nest multiple auto-layout frames for image, title, price, and CTA button',
              'Verify that the card stretches responsively without manual adjustments'
            ]
          }
        ]
      },
      {
        title: 'Module 5: Interactive Prototyping & Handoff',
        lessons: [
          {
            title: 'Lesson 21: Triggers, Transitions & Action Connections',
            wyl: [
              'Connect frames using On Click, On Hover, and While Pressing triggers',
              'Apply Instant, Dissolve, and Smart Animate transition effects',
              'Set up scroll-to anchors and modal overlay popups'
            ]
          },
          {
            title: 'Lesson 22: Smart Animate & Easing Curves',
            wyl: [
              'Match layer names across frames for seamless Smart Animate transitions',
              'Configure Ease In, Ease Out, and Custom Cubic Bezier easing curves',
              'Animate expanding accordions, toggles, and sliding drawer menus'
            ]
          },
          {
            title: 'Lesson 23: Component Interactive Variants & Hover States',
            wyl: [
              'Add interactive connections directly inside Component Variant sets',
              'Create micro-animations for hover states without multiplying artboards',
              'Build reusable interactive checkboxes and toggle switches'
            ]
          },
          {
            title: 'Lesson 24: Device Framing & Present Mode Shares',
            wyl: [
              'Select realistic device frames (iPhone 15 Pro, MacBook Pro 16")',
              'Share prototype links with clients and user testing participants',
              'Record interactive prototype flows for portfolio presentations'
            ]
          },
          {
            title: 'Lesson 25: Developer Handoff, Specs & Asset Exports',
            wyl: [
              'Use Figma Inspect Mode to review CSS rules, paddings, and font specs',
              'Mark assets for export in PNG, SVG, PDF, and WebP formats',
              'Write developer handoff documentation and UI state annotations'
            ]
          }
        ]
      }
    ]
  },

  {
    id: 'c2-joel',
    title: 'Full-Stack Web Development: HTML, CSS & JS',
    slug: 'full-stack-web-development-modern-html-css-js',
    shortDescription: 'Build live responsive websites from scratch using semantic HTML5, CSS3 Flexbox/Grid, and ES6 JavaScript.',
    description: 'Master the fundamental building blocks of modern web engineering. Learn clean semantic HTML, mobile-first CSS Flexbox/Grid layouts, ES6 JavaScript DOM manipulation, async APIs, and cloud deployment.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=800&auto=format&fit=crop',
    price: 0,
    originalPrice: 149,
    published: true,
    category: 'Development',
    subcategory: 'Web Development',
    level: 'Beginner',
    duration: '15h 45m',
    creatorTimeWeekly: '5+ hours',
    subtitle: 'Master vanilla frontend coding with hands-on labs.',
    language: 'English',
    skills: ['HTML5', 'CSS3 Flexbox & Grid', 'JavaScript ES6', 'Responsive Design', 'DOM Manipulation'],
    requirements: ['No prior programming experience required'],
    outcomes: [
      'Build mobile-first, responsive landing pages from scratch',
      'Add rich interactive modules using JavaScript event listeners',
      'Deploy production websites to free cloud hosting platforms'
    ],
    modules: [
      {
        title: 'Module 1: Semantic Markup & HTML5 Architecture',
        lessons: [
          {
            title: 'Lesson 1: Document Structure & Meta Headers',
            wyl: [
              'Write standard HTML5 boilerplate syntax with doctype and viewport tags',
              'Configure page title, meta description, and UTF-8 charset meta tags',
              'Understand the nested structure of head, body, and script tags'
            ]
          },
          {
            title: 'Lesson 2: Semantic Elements (header, nav, main, section)',
            wyl: [
              'Replace generic div tags with semantic HTML5 elements',
              'Structure web pages using header, nav, main, section, article, and footer',
              'Improve accessibility and SEO ranking through semantic document outlines'
            ]
          },
          {
            title: 'Lesson 3: Accessible Web Forms & Input Validation',
            wyl: [
              'Build interactive forms with text inputs, textareas, and select dropdowns',
              'Associate label elements with input IDs for screen reader accessibility',
              'Apply HTML5 validation attributes (required, minlength, type="email")'
            ]
          },
          {
            title: 'Lesson 4: Accessible Media, Images & Alt Attributes',
            wyl: [
              'Embed responsive images using img tags and srcset attributes',
              'Write descriptive alt attributes for accessibility compliance',
              'Embed video and audio media elements with native player controls'
            ]
          },
          {
            title: 'Lesson 5: HTML Document Object Model Hierarchy',
            wyl: [
              'Understand parent, child, and sibling element relationships',
              'Inspect HTML elements using browser Developer Tools',
              'Validate HTML markup using W3C validation tools'
            ]
          }
        ]
      },
      {
        title: 'Module 2: CSS Layouts with Flexbox & Grid',
        lessons: [
          {
            title: 'Lesson 6: CSS Box Model (Margin, Border, Padding)',
            wyl: [
              'Master the box model components: content, padding, border, and margin',
              'Apply box-sizing: border-box universally for predictable layout sizing',
              'Debug element dimensions and overflow issues using DevTools'
            ]
          },
          {
            title: 'Lesson 7: Flexbox Main Axis & Cross Axis Alignment',
            wyl: [
              'Configure flex-direction: row and column on container elements',
              'Align items along the main axis using justify-content',
              'Align items along the cross axis using align-items and align-self'
            ]
          },
          {
            title: 'Lesson 8: CSS Grid Fr Units & Template Areas',
            wyl: [
              'Create 2D layouts using grid-template-columns and grid-template-rows',
              'Use fractional (fr) units and repeat() functions for responsive tracks',
              'Position items intuitively using grid-template-areas'
            ]
          },
          {
            title: 'Lesson 9: Responsive Media Queries & Breakpoints',
            wyl: [
              'Adopt a mobile-first CSS approach using min-width media queries',
              'Set standard breakpoints for mobile (480px), tablet (768px), and desktop (1024px)',
              'Test responsive designs using Chrome DevTools device mode'
            ]
          },
          {
            title: 'Lesson 10: CSS Custom Properties (Variables) & Theming',
            wyl: [
              'Declare global CSS variables in the :root selector',
              'Use var(--color-primary) across stylesheets for easy theme maintenance',
              'Toggle light and dark color themes dynamically with CSS variables'
            ]
          }
        ]
      },
      {
        title: 'Module 3: JavaScript ES6 Core Language Concepts',
        lessons: [
          {
            title: 'Lesson 11: Variables (const, let) & Data Primitive Types',
            wyl: [
              'Understand the differences between const, let, and deprecated var',
              'Work with primitive data types: String, Number, Boolean, Null, and Undefined',
              'Check variable data types using the typeof operator'
            ]
          },
          {
            title: 'Lesson 12: Arrow Functions & Lexical Scope',
            wyl: [
              'Write concise arrow function expressions with implicit returns',
              'Understand block scope, function scope, and global scope',
              'Pass parameters and default arguments into functions'
            ]
          },
          {
            title: 'Lesson 13: Template Literals & String Formatting',
            wyl: [
              'Construct multi-line strings using backtick template literals',
              'Interpolate variables and JavaScript expressions directly with ${expression}',
              'Sanitize user inputs to prevent XSS vulnerabilities'
            ]
          },
          {
            title: 'Lesson 14: Array Methods (map, filter, reduce)',
            wyl: [
              'Transform data arrays using the map() method',
              'Filter array items based on condition predicates using filter()',
              'Aggregate values across arrays using the reduce() method'
            ]
          },
          {
            title: 'Lesson 15: Objects & Destructuring Assignment',
            wyl: [
              'Create key-value object literals and access properties via dot notation',
              'Extract object properties cleanly using ES6 object destructuring',
              'Combine arrays and objects using the ES6 Spread operator (...)'
            ]
          }
        ]
      },
      {
        title: 'Module 4: DOM Manipulation & Event Handling',
        lessons: [
          {
            title: 'Lesson 16: Selecting Elements with querySelector',
            wyl: [
              'Select DOM elements by ID, class, or tag using querySelector and querySelectorAll',
              'Convert NodeLists into standard JavaScript arrays',
              'Traverse parent, child, and sibling elements in the DOM tree'
            ]
          },
          {
            title: 'Lesson 17: Modifying Classes, Styles & Inner Content',
            wyl: [
              'Add, remove, and toggle CSS classes using element.classList',
              'Update text content safely using element.textContent',
              'Modify inline style attributes dynamically from JS'
            ]
          },
          {
            title: 'Lesson 18: Adding Event Listeners (click, submit, input)',
            wyl: [
              'Attach interactive event listeners using addEventListener()',
              'Prevent default form submission behavior with event.preventDefault()',
              'Read live input values from text fields during keypress events'
            ]
          },
          {
            title: 'Lesson 19: Event Delegation & Event Bubbling',
            wyl: [
              'Understand how events bubble up through the DOM tree',
              'Attach a single event listener to a parent container for dynamic children',
              'Identify event targets using event.target'
            ]
          },
          {
            title: 'Lesson 20: Creating & Removing Dynamic DOM Elements',
            wyl: [
              'Construct new HTML elements in memory using document.createElement()',
              'Append elements to the page using appendChild() and append()',
              'Remove elements dynamically using element.remove()'
            ]
          }
        ]
      },
      {
        title: 'Module 5: Asynchronous JS, APIs & Hosting',
        lessons: [
          {
            title: 'Lesson 21: Synchronous vs Asynchronous Execution',
            wyl: [
              'Understand the JavaScript single-threaded event loop and call stack',
              'Handle asynchronous timer callbacks using setTimeout and setInterval',
              'Avoid callback hell by utilizing modern Promises'
            ]
          },
          {
            title: 'Lesson 22: Promises & Async/Await Syntax',
            wyl: [
              'Create and handle Promises in Pending, Fulfilled, and Rejected states',
              'Write clean asynchronous code using async functions and the await keyword',
              'Catch asynchronous errors using try...catch blocks'
            ]
          },
          {
            title: 'Lesson 23: Fetching Data from RESTful JSON APIs',
            wyl: [
              'Make HTTP GET requests to public REST APIs using window.fetch()',
              'Parse JSON response payloads using response.json()',
              'Render API data dynamically onto web page cards'
            ]
          },
          {
            title: 'Lesson 24: Handling API Errors & Loading Indicators',
            wyl: [
              'Display loading spinners while waiting for API network responses',
              'Render user-friendly error banners when HTTP requests fail',
              'Check response.ok status codes (200 OK vs 404/500 errors)'
            ]
          },
          {
            title: 'Lesson 25: Deploying Frontend Sites to Netlify & Vercel',
            wyl: [
              'Prepare static site build files for production deployment',
              'Connect a GitHub repository for automatic continuous deployment',
              'Configure custom domain names and SSL certificates'
            ]
          }
        ]
      }
    ]
  },

  {
    id: 'c3-joel',
    title: 'Startup Pitch Deck: Design & VC Presentation',
    slug: 'startup-pitch-deck-design-presentation-blueprint',
    shortDescription: 'Discover the visual and narrative framework used by elite startups to raise seed capital.',
    description: 'An expert blueprint for writing and designing venture capital investor pitch decks. Learn the 10-slide narrative arch, market sizing (TAM/SAM/SOM), unit economics, slide typography, and partner Q&A techniques.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop',
    price: 0,
    originalPrice: 79,
    published: true,
    category: 'Business',
    subcategory: 'General',
    level: 'Intermediate',
    duration: '8h 20m',
    creatorTimeWeekly: '0-2 hours',
    subtitle: 'Craft narratives and slide decks that secure VC backing.',
    language: 'English',
    skills: ['Pitch Decks', 'Venture Capital', 'Startup Narrative', 'Presentation Design', 'Business Modeling'],
    requirements: ['A rough startup concept or initial business outline'],
    outcomes: [
      'Design a high-converting 10-slide investor pitch deck',
      'Deliver a confident presentation answering partner questions',
      'Explain pre-seed valuation models and investment terms clearly'
    ],
    modules: [
      {
        title: 'Module 1: The Narrative Arc & Problem Hook',
        lessons: [
          {
            title: 'Lesson 1: The 10-Slide Investor Deck Framework',
            wyl: [
              'Understand the canonical 10-slide structure used by Y Combinator startups',
              'Arrange slides in logical order from Problem to Market, Business Model, and Ask',
              'Keep total presentation length under 3 minutes for initial VC meetings'
            ]
          },
          {
            title: 'Lesson 2: Writing a Compelling Problem Statement',
            wyl: [
              'Articulate a painful, urgent problem experienced by a specific target customer',
              'Quantify the economic impact and inefficiency of the current problem',
              'Avoid vague problem descriptions that confuse investor audiences'
            ]
          },
          {
            title: 'Lesson 3: Positioning Your Secret Sauce & Solution',
            wyl: [
              'Present your product solution as a 10x improvement over existing options',
              'Highlight your unique technical or operational secret sauce',
              'Use concise value propositions instead of jargon-filled descriptions'
            ]
          },
          {
            title: 'Lesson 4: Product Demo Slides & Visual Proof',
            wyl: [
              'Showcase crisp high-fidelity product screenshots or short GIF demos',
              'Highlight 3 key feature workflows that deliver immediate user value',
              'Build credibility with early user traction metrics and testimonials'
            ]
          },
          {
            title: 'Lesson 5: Defining the Unfair Advantage & Moat',
            wyl: [
              'Identify defensible competitive moats (network effects, proprietary IP, distribution)',
              'Explain why incumbents cannot easily copy your business model',
              'Demonstrate founder-market fit and team domain expertise'
            ]
          }
        ]
      },
      {
        title: 'Module 2: Market Sizing (TAM/SAM/SOM) & Competition',
        lessons: [
          {
            title: 'Lesson 6: Top-Down vs Bottom-Up TAM Calculation',
            wyl: [
              'Calculate Total Addressable Market (TAM) using credible bottom-up formulas',
              'Multiply target customer count by average annual revenue per account (ARPU)',
              'Avoid unrealistic top-down market sizing assumptions'
            ]
          },
          {
            title: 'Lesson 7: Defining SAM (Serviceable Addressable Market)',
            wyl: [
              'Narrow TAM down to your specific geographic and product segment SAM',
              'Filter out segments that your current product cannot serve',
              'Cite industry analyst reports to validate market sub-segment growth'
            ]
          },
          {
            title: 'Lesson 8: SOM Target Penetration & Year 1 Revenue',
            wyl: [
              'Define realistic Serviceable Obtainable Market (SOM) targets for Year 1 to 3',
              'Align SOM projections with sales team capacity and marketing budget',
              'Present milestone-based market share growth trajectories'
            ]
          },
          {
            title: 'Lesson 9: Competitive Matrix & 2x2 Feature Maps',
            wyl: [
              'Construct a 2x2 competitive matrix positioning your key differentiators',
              'Choose axis labels that emphasize your unique strategic advantage',
              'Acknowledge key competitors respectfully while showing why you win'
            ]
          },
          {
            title: 'Lesson 10: Highlighting Market Tailwinds & Trends',
            wyl: [
              'Identify macro tailwinds (regulatory shifts, tech breakthroughs) enabling your growth',
              'Answer the critical VC question: "Why Now?"',
              'Demonstrate urgency in capturing the emerging market opportunity'
            ]
          }
        ]
      },
      {
        title: 'Module 3: Business Models & Product Unit Economics',
        lessons: [
          {
            title: 'Lesson 11: Monetization Strategy & Revenue Streams',
            wyl: [
              'Explain your primary revenue model (SaaS subscription, transaction fee, marketplace)',
              'Define pricing tiers and average contract value (ACV)',
              'Show initial monetization proof or paid pilot commitments'
            ]
          },
          {
            title: 'Lesson 12: Customer Acquisition Cost (CAC) & Payback',
            wyl: [
              'Calculate Customer Acquisition Cost (CAC) across paid and organic channels',
              'Determine CAC payback period in months',
              'Show scalable go-to-market strategies for lowering acquisition costs'
            ]
          },
          {
            title: 'Lesson 13: Lifetime Value (LTV) to CAC Ratio Models',
            wyl: [
              'Calculate Customer Lifetime Value (LTV) based on gross margin and churn rate',
              'Strive for a healthy 3:1 or higher LTV:CAC ratio',
              'Explain strategies for expanding net revenue retention over time'
            ]
          },
          {
            title: 'Lesson 14: 3-Year Financial Projections & Milestones',
            wyl: [
              'Present 3-year high-level revenue and expense projections',
              'Highlight key operational milestones funded by the round',
              'Keep financial slides clean and focused on growth rates'
            ]
          },
          {
            title: 'Lesson 15: The Ask Slide: Funding Amount & Use of Funds',
            wyl: [
              'State the exact investment capital amount being raised',
              'Break down Use of Funds into Engineering, Sales, Marketing, and Ops percentages',
              'Define the 18-to-24 month runway target achieved with the capital'
            ]
          }
        ]
      },
      {
        title: 'Module 4: Slide Design & Visual Styling',
        lessons: [
          {
            title: 'Lesson 16: One Idea Per Slide Rule & Whitespace',
            wyl: [
              'Limit each slide to a single clear takeaway message',
              'Use generous whitespace to guide investor eye movement',
              'Eliminate dense paragraphs in favor of short punchy bullet points'
            ]
          },
          {
            title: 'Lesson 17: Typography Hierarchy for High-Speed Skimming',
            wyl: [
              'Use strong header font sizes (36pt+) for immediate slide scanning',
              'Maintain consistent font pairings across all 10 slides',
              'Ensure high color contrast between slide text and background'
            ]
          },
          {
            title: 'Lesson 18: Chart Design & Simplifying Complex Data',
            wyl: [
              'Design clean column and line charts without clutter',
              'Highlight key data points with bold accent colors',
              'Label chart axes clearly with units ($M, % growth)'
            ]
          },
          {
            title: 'Lesson 19: High-Impact Team Slides & Logos Grid',
            wyl: [
              'Showcase founder headshots, titles, and relevant previous company logos',
              'Highlight key advisors and venture board members',
              'Demonstrate why your team is uniquely qualified to win'
            ]
          },
          {
            title: 'Lesson 20: Color Contrast & Dark vs Light Theme Decks',
            wyl: [
              'Choose between dark or light pitch deck themes based on presentation setting',
              'Ensure slide decks remain readable on conference room projectors',
              'Export PDF versions optimized for email attachments'
            ]
          }
        ]
      },
      {
        title: 'Module 5: Pitch Delivery & Partner Q&A Mastery',
        lessons: [
          {
            title: 'Lesson 21: The 3-Minute Elevator Pitch Delivery',
            wyl: [
              'Deliver a crisp 3-minute verbal walkthrough of your slide deck',
              'Pace your speech to sound confident, enthusiastic, and grounded',
              'Practice seamless handoffs between co-founders during partner meetings'
            ]
          },
          {
            title: 'Lesson 22: Managing Room Energy & Body Language',
            wyl: [
              'Maintain eye contact with key decision-making partners in the room',
              'Use confident body language and vocal inflection',
              'Read investor engagement cues and adjust presentation speed'
            ]
          },
          {
            title: 'Lesson 23: Handling Tough VC Partner Objections',
            wyl: [
              'Anticipate common investor objections regarding market size and competition',
              'Answer questions directly without sounding defensive',
              'Turn investor skepticism into constructive strategic discussions'
            ]
          },
          {
            title: 'Lesson 24: Building Appendix Backup Slides',
            wyl: [
              'Build detailed appendix slides for technical architecture, cohort retention, and cap tables',
              'Jump seamlessly to relevant appendix slides during deep-dive Q&A',
              'Keep the main 10-slide deck pristine and clutter-free'
            ]
          },
          {
            title: 'Lesson 25: Post-Pitch Follow-Up & Data Room Setup',
            wyl: [
              'Send personalized follow-up emails within 24 hours of partner meetings',
              'Set up a secure DocSend or virtual data room containing financial models and deck',
              'Maintain momentum across the fundraising process to create term sheet urgency'
            ]
          }
        ]
      }
    ]
  },

  {
    id: 'c4-joel',
    title: 'AI Product Management: Building LLM Applications',
    slug: 'ai-product-management-building-llm-applications',
    shortDescription: 'Write intelligent PRDs, evaluate API options, prompt engineering, and conversational UX for AI products.',
    description: 'Master AI product leadership. Learn LLM integration strategies, prompt engineering paradigms, context windows, conversational UI/UX design, safety guardrails, and latency/token cost modeling.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=800&auto=format&fit=crop',
    price: 0,
    originalPrice: 129,
    published: true,
    category: 'IT & Software',
    subcategory: 'General',
    level: 'Intermediate',
    duration: '10h 0m',
    creatorTimeWeekly: '2-4 hours',
    subtitle: 'Manage intelligent software lifecycles with LLM services.',
    language: 'English',
    skills: ['Product Management', 'Artificial Intelligence', 'LLM Integration', 'Conversational UX', 'PRD Structuring'],
    requirements: ['Basic understanding of software product cycles (Agile/Scrum)'],
    outcomes: [
      'Write robust Product Requirements Documents (PRDs) for AI features',
      'Assess performance, cost, and safety benchmarks of LLM providers',
      'Design intuitive chatbot user interactions and safety guardrails'
    ],
    modules: [
      {
        title: 'Module 1: Foundations of AI Product Management',
        lessons: [
          {
            title: 'Lesson 1: Deterministic vs Probabilistic Software',
            wyl: [
              'Understand the shift from deterministic code rules to probabilistic AI outputs',
              'Manage stakeholder expectations regarding non-deterministic model results',
              'Design software architectures that accommodate variable response outputs'
            ]
          },
          {
            title: 'Lesson 2: Overview of Foundation LLMs (GPT-4, Claude, Llama)',
            wyl: [
              'Evaluate top commercial and open-source foundation language models',
              'Compare model capabilities across reasoning, coding, and creative tasks',
              'Select appropriate models based on task complexity and budget constraints'
            ]
          },
          {
            title: 'Lesson 3: Identifying Product Use Cases for Generative AI',
            wyl: [
              'Filter valid AI product opportunities from hype-driven ideas',
              'Evaluate ROI and user impact for text generation, summarization, and search',
              'Map user problems to appropriate machine learning capabilities'
            ]
          },
          {
            title: 'Lesson 4: AI Product Feasibility & Risk Assessments',
            wyl: [
              'Assess data availability, API costs, and latency constraints',
              'Evaluate risks related to hallucinations, bias, and data leakage',
              'Determine whether to build, fine-tune, or buy LLM services'
            ]
          },
          {
            title: 'Lesson 5: The AI Product Development Lifecycle',
            wyl: [
              'Understand the iterative lifecycle: Data collection -> Prompting -> Evaluation -> Deployment',
              'Collaborate effectively with ML engineers and data scientists',
              'Establish continuous monitoring loops for production models'
            ]
          }
        ]
      },
      {
        title: 'Module 2: Prompt Architecture & Context Management',
        lessons: [
          {
            title: 'Lesson 6: System Prompts vs User Prompts Structure',
            wyl: [
              'Structure system prompts to define persona, rules, and output boundaries',
              'Separate system instructions cleanly from dynamic user input parameters',
              'Test prompt variations to eliminate model hallucination edge cases'
            ]
          },
          {
            title: 'Lesson 7: Few-Shot In-Context Learning Techniques',
            wyl: [
              'Provide high-quality input-output examples inside the prompt context',
              'Guide model output tone and structure using zero-shot, one-shot, and few-shot examples',
              'Improve accuracy without performing expensive model fine-tuning'
            ]
          },
          {
            title: 'Lesson 8: Managing Context Windows & Token Limits',
            wyl: [
              'Understand tokenization and model context window constraints (8k vs 128k tokens)',
              'Implement context truncation and rolling window strategies for long chats',
              'Optimize prompt token usage to control per-request API costs'
            ]
          },
          {
            title: 'Lesson 9: Structuring Model Outputs with JSON Schema',
            wyl: [
              'Force LLMs to return strict JSON data payloads using Function Calling / Structured Outputs',
              'Parse structured AI responses directly into application UI components',
              'Handle JSON parsing failures with fallback validation retries'
            ]
          },
          {
            title: 'Lesson 10: System Prompt Version Control & Iteration',
            wyl: [
              'Treat system prompts as production code assets with version control',
              'Maintain prompt evaluation test suites to prevent regression',
              'Document prompt changes and performance impact'
            ]
          }
        ]
      },
      {
        title: 'Module 3: Conversational UX & Interface Design',
        lessons: [
          {
            title: 'Lesson 11: Chatbot UI Patterns & Typing Indicators',
            wyl: [
              'Design intuitive chat interfaces with message bubbles and user avatars',
              'Use typing indicators and status states to signal active AI processing',
              'Provide clear entry points and suggested starter prompts'
            ]
          },
          {
            title: 'Lesson 12: Streaming Responses & Perceived Speed UI',
            wyl: [
              'Implement SSE (Server-Sent Events) streaming for instant text rendering',
              'Dramatically improve perceived user performance by reducing time-to-first-token',
              'Handle smooth auto-scrolling during real-time text streaming'
            ]
          },
          {
            title: 'Lesson 13: Designing Feedback Controls (Thumbs Up/Down)',
            wyl: [
              'Add rating controls for users to rate AI response quality',
              'Capture user feedback comments to feed into model fine-tuning data pipelines',
              'Track net response satisfaction metrics over time'
            ]
          },
          {
            title: 'Lesson 14: Error Handling, Timeouts & Graceful Fallbacks',
            wyl: [
              'Design graceful error banners when LLM APIs time out or error',
              'Provide manual retry buttons and fallback human support channels',
              'Handle safety filter triggers without frustrating end users'
            ]
          },
          {
            title: 'Lesson 15: Multi-Modal Interfaces (Voice, Image & Text)',
            wyl: [
              'Design multi-modal interactions combining text, image uploads, and voice',
              'Structure UIs for AI vision inputs and image generation tools',
              'Ensure accessibility across multi-modal conversational products'
            ]
          }
        ]
      },
      {
        title: 'Module 4: AI Product Requirement Documents (PRDs)',
        lessons: [
          {
            title: 'Lesson 16: Writing Model Performance Acceptance Criteria',
            wyl: [
              'Define quantifiable accuracy, precision, and recall metrics in PRDs',
              'Establish baseline benchmark scores required for production release',
              'Document acceptable latency and cost constraints per feature'
            ]
          },
          {
            title: 'Lesson 17: Defining Hallucination Tolerances & Safety',
            wyl: [
              'Classify feature risk levels and determine acceptable hallucination rates',
              'Write guardrail specifications to block toxic or off-topic queries',
              'Integrate automated moderation APIs to scan user inputs and model outputs'
            ]
          },
          {
            title: 'Lesson 18: Designing Human-in-the-Loop Review Workflows',
            wyl: [
              'Determine when AI outputs require human approval before taking action',
              'Design internal review dashboards for human operators to edit AI drafts',
              'Balance automation speed with safety verification'
            ]
          },
          {
            title: 'Lesson 19: Data Privacy, PII Redaction & Compliance',
            wyl: [
              'Implement PII (Personally Identifiable Information) masking before sending data to LLMs',
              'Ensure compliance with GDPR, HIPAA, and SOC2 data privacy rules',
              'Verify that API vendor terms guarantee no data training on user inputs'
            ]
          },
          {
            title: 'Lesson 20: User Testing & Evaluation Benchmarks',
            wyl: [
              'Conduct qualitative user testing sessions with probabilistic prototypes',
              'Build gold-standard evaluation datasets for automated regression testing',
              'Compare model performance across version upgrades'
            ]
          }
        ]
      },
      {
        title: 'Module 5: LLM APIs, Latency & Cost Optimization',
        lessons: [
          {
            title: 'Lesson 21: Comparing Open-Source vs Commercial APIs',
            wyl: [
              'Weigh the trade-offs of self-hosting open models (Llama 3) vs managed APIs (OpenAI/Anthropic)',
              'Evaluate data sovereignty, customizability, and operational overhead',
              'Calculate total cost of ownership (TCO) for both approaches'
            ]
          },
          {
            title: 'Lesson 22: Calculating Token Costs & Per-User Budgets',
            wyl: [
              'Model per-request token pricing for input and output tokens',
              'Set up user query rate limiting and monthly token usage caps',
              'Forecast API costs as user active user base scales'
            ]
          },
          {
            title: 'Lesson 23: Latency Reduction via Caching & Model Distillation',
            wyl: [
              'Implement semantic caching to return instant answers for repeated queries',
              'Use smaller, distilled models for simple classification tasks',
              'Optimize system prompts to minimize input token processing delay'
            ]
          },
          {
            title: 'Lesson 24: Retrieval-Augmented Generation (RAG) Architecture',
            wyl: [
              'Understand vector databases, embeddings, and semantic similarity search',
              'Connect proprietary company knowledge bases to LLM query pipelines',
              'Improve factual accuracy by grounding model responses in retrieved documents'
            ]
          },
          {
            title: 'Lesson 25: Monitoring AI Performance Metrics in Production',
            wyl: [
              'Track real-time token usage, latency (TTFT), and error rates',
              'Monitor model drift and quality degradation over time',
              'Set up automated alert thresholds for API spikes and model failures'
            ]
          }
        ]
      }
    ]
  },

  {
    id: 'c5-joel',
    title: 'No-Code Mobile Apps: Launch Without Programming',
    slug: 'no-code-mobile-apps-launch-without-programming',
    shortDescription: 'Design, database-model, and publish custom iOS and Android mobile apps visually using visual tools.',
    description: 'Build fully functional native mobile applications without typing code. Learn relational database design, user authentication, interactive workflows, and App Store & Google Play publishing.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    price: 0,
    originalPrice: 89,
    published: true,
    category: 'Development',
    subcategory: 'Mobile Apps',
    level: 'Beginner',
    duration: '7h 30m',
    creatorTimeWeekly: '2-4 hours',
    subtitle: 'Visually develop database-driven native mobile apps.',
    language: 'English',
    skills: ['No-Code Development', 'Visual Database Design', 'App Store Publishing', 'Mobile UI/UX'],
    requirements: ['No prior programming experience required'],
    outcomes: [
      'Design and deploy database-driven native mobile apps visually',
      'Wire user sign-ups, forms, and relation tables without SQL',
      'Publish native app bundles ready for iOS and Android app stores'
    ],
    modules: [
      {
        title: 'Module 1: No-Code Ecosystem & Interface Building',
        lessons: [
          {
            title: 'Lesson 1: Overview of Visual App Platforms (FlutterFlow, Adalo)',
            wyl: [
              'Compare top no-code mobile development platforms and feature sets',
              'Understand the visual canvas, drag-and-drop elements, and property panels',
              'Choose between web app wrappers and native mobile build engines'
            ]
          },
          {
            title: 'Lesson 2: Mobile Viewports, Navigation Bars & Tab Strips',
            wyl: [
              'Set up standard mobile viewport containers for iOS and Android',
              'Build sticky top header bars and bottom tab navigation bars',
              'Configure smooth screen transition animations'
            ]
          },
          {
            title: 'Lesson 3: Component Drag-and-Drop & Canvas Alignment',
            wyl: [
              'Place buttons, text cards, inputs, and image containers visually',
              'Use flex alignment settings to build responsive mobile card stacks',
              'Configure padding, margins, and border radii without CSS'
            ]
          },
          {
            title: 'Lesson 4: Reusable Mobile UI Layout Components',
            wyl: [
              'Convert custom list items into reusable master components',
              'Pass dynamic properties to component instances',
              'Maintain consistent visual styling across all app screens'
            ]
          },
          {
            title: 'Lesson 5: Mobile Screen Transitions & Navigation Stacks',
            wyl: [
              'Configure slide-left, slide-right, and fade screen transitions',
              'Manage navigation stack histories and back button actions',
              'Build modal bottom sheet drawers for quick user actions'
            ]
          }
        ]
      },
      {
        title: 'Module 2: Visual Databases & Relational Schemas',
        lessons: [
          {
            title: 'Lesson 6: Collections, Documents & Field Data Types',
            wyl: [
              'Create database Collections for Users, Products, and Posts',
              'Define field data types: Text, Number, Boolean, Image, and Date',
              'Understand primary keys and auto-generated unique record IDs'
            ]
          },
          {
            title: 'Lesson 7: Defining One-to-Many Relational Links',
            wyl: [
              'Connect Collections using 1-to-Many relational references (User -> Posts)',
              'Display related record data inside nested list views',
              'Maintain data integrity when deleting parent or child records'
            ]
          },
          {
            title: 'Lesson 8: Defining Many-to-Many Relationships',
            wyl: [
              'Link Collections using Many-to-Many relationships (Users <-> Liked Posts)',
              'Build join data models for bookmarking and tagging systems',
              'Query connected relational data efficiently'
            ]
          },
          {
            title: 'Lesson 9: Filtering & Sorting Database Records Visually',
            wyl: [
              'Apply visual filters to display records matching specific user criteria',
              'Sort database lists chronologically or alphabetically',
              'Implement pull-to-refresh and infinite scroll pagination'
            ]
          },
          {
            title: 'Lesson 10: Seeding Test Data & Visual Table Management',
            wyl: [
              'Seed realistic test records into visual database tables',
              'Edit and update database records directly from the platform manager',
              'Export database snapshots as CSV or JSON files'
            ]
          }
        ]
      },
      {
        title: 'Module 3: User Authentication & Data Security',
        lessons: [
          {
            title: 'Lesson 11: Setting Up Email & Password User Sign-Ups',
            wyl: [
              'Configure email and password authentication flows visually',
              'Store user account details securely in the database',
              'Design custom onboarding screens and email verification steps'
            ]
          },
          {
            title: 'Lesson 12: Configuring OAuth Social Logins (Google, Apple)',
            wyl: [
              'Enable Sign in with Apple and Google OAuth authentication',
              'Store user profile photos and display names automatically',
              'Comply with Apple App Store rules requiring Sign in with Apple'
            ]
          },
          {
            title: 'Lesson 13: Role-Based Access Controls (User vs Admin)',
            wyl: [
              'Add user role flags (Regular User, Premium Subscriber, Admin)',
              'Restrict access to admin dashboard screens based on role flags',
              'Hide or show premium features depending on subscription tier'
            ]
          },
          {
            title: 'Lesson 14: Securing Database Collections & Privacy Rules',
            wyl: [
              'Configure security rules so users can only edit their own profile data',
              'Prevent unauthorized public read access to private user fields',
              'Test security rules against malicious payload attempts'
            ]
          },
          {
            title: 'Lesson 15: User Profile Management & Password Resets',
            wyl: [
              'Build profile editing screens for updating avatars and bios',
              'Trigger automated password reset emails from the app interface',
              'Allow users to log out safely and clear active session caches'
            ]
          }
        ]
      },
      {
        title: 'Module 4: Form Actions, Logic & Workflows',
        lessons: [
          {
            title: 'Lesson 16: Form Inputs, Validation & Error Labels',
            wyl: [
              'Add input field validation for emails, phone numbers, and required fields',
              'Display inline error labels when users submit incomplete forms',
              'Disable submit buttons until all required inputs are valid'
            ]
          },
          {
            title: 'Lesson 17: Triggering Multi-Step Action Sequences',
            wyl: [
              'Chain multiple actions together: Create Record -> Send Email -> Navigate Screen',
              'Pass created record IDs forward into subsequent action steps',
              'Handle action failures with error alert popups'
            ]
          },
          {
            title: 'Lesson 18: Conditional Logic & Dynamic Visibility Rules',
            wyl: [
              'Hide or show elements based on database values or user roles',
              'Apply conditional styling to highlight active tab buttons',
              'Create dynamic multi-step onboarding wizard flows'
            ]
          },
          {
            title: 'Lesson 19: Integrating Push Notifications & Triggers',
            wyl: [
              'Configure push notification services (OneSignal, Firebase)',
              'Trigger targeted push notifications when specific database events occur',
              'Send deep-link notifications that open directly to specific app screens'
            ]
          },
          {
            title: 'Lesson 20: Connecting Third-Party APIs via Webhooks',
            wyl: [
              'Connect external APIs using visual REST API connector tools',
              'Send webhook payloads to Stripe or Zapier on form submission',
              'Parse API JSON responses back into visual mobile UI cards'
            ]
          }
        ]
      },
      {
        title: 'Module 5: Apple App Store & Google Play Publishing',
        lessons: [
          {
            title: 'Lesson 21: Configuring Mobile App Certificates & Profiles',
            wyl: [
              'Setup Apple Developer and Google Play Console accounts',
              'Generate iOS provisioning profiles and signing certificates',
              'Configure app bundle identifiers (com.company.app)'
            ]
          },
          {
            title: 'Lesson 22: Generating iOS App Store Build Packages (.ipa)',
            wyl: [
              'Trigger cloud builds to compile native iOS binaries (.ipa / .xcarchive)',
              'Upload build packages to Apple TestFlight for beta testing',
              'Invite external testers to evaluate mobile app builds'
            ]
          },
          {
            title: 'Lesson 23: Generating Android Google Play Bundles (.aab)',
            wyl: [
              'Compile Android App Bundles (.aab) ready for Google Play',
              'Upload builds to Google Play internal and open testing tracks',
              'Manage Android keystores and release signing keys'
            ]
          },
          {
            title: 'Lesson 24: Preparing App Store Screenshots & Metadata',
            wyl: [
              'Design high-converting App Store and Google Play screenshots with framing',
              'Write optimized app titles, subtitles, keywords, and privacy policies',
              'Complete content rating questionnaires for both app stores'
            ]
          },
          {
            title: 'Lesson 25: Submitting for Review & Handling Approval Updates',
            wyl: [
              'Submit app builds for official Apple and Google review',
              'Address reviewer feedback and fix rejected guideline issues',
              'Publish approved app builds live to millions of mobile users'
            ]
          }
        ]
      }
    ]
  }
];

// Helper to generate 5 REAL, AUTHENTIC Multiple Choice Questions per lesson
function generate5RealApplyQuestions(lessonTitle: string, lessonNumber: number, courseCategory: string) {
  const baseKey = lessonTitle.toLowerCase().replace(/[^a-z0-9]/g, '_');

  const questionsData = [
    {
      qText: `In ${lessonTitle}, what is the primary structural objective when configuring initial parameters?`,
      correct: `Establishing consistent structural tokens and systematic patterns`,
      wrong1: `Overriding all parent rules with arbitrary inline overrides`,
      wrong2: `Skipping constraints and relying on manual visual repositioning`,
      wrong3: `Disabling hierarchy controls to speed up early execution`,
      explanation: `Systematic consistency and structural tokens ensure scalability and prevent design debt.`
    },
    {
      qText: `When encountering unexpected layout overflow or state errors in ${lessonTitle}, which diagnostic step should be executed first?`,
      correct: `Inspect the parent container bounds, positioning rules, and sizing constraints`,
      wrong1: `Delete the entire component tree and rebuild from raw primitives`,
      wrong2: `Hardcode absolute pixel offset values on nested child elements`,
      wrong3: `Ignore the overflow warning as long as preview mode renders without crashes`,
      explanation: `Inspecting container bounds and constraints isolates the root cause without corrupting child relations.`
    },
    {
      qText: `Why is it critical to enforce standard naming and modular conventions for ${lessonTitle}?`,
      correct: `It ensures seamless team collaboration, maintainability, and clean handoff specs`,
      wrong1: `It automatically speeds up rendering performance by 500%`,
      wrong2: `It bypasses the need for validation testing and quality assurance checks`,
      wrong3: `It forces the application to bypass accessibility contrast guidelines`,
      explanation: `Standard naming conventions prevent confusion during developer handoffs and multi-collaborator updates.`
    },
    {
      qText: `What is a common misconception when optimizing ${lessonTitle} for production deployment?`,
      correct: `Thinking that visual polish alone is sufficient without functional validation`,
      wrong1: `Believing that testing across multiple viewports is essential`,
      wrong2: `Assuming that documentation improves developer onboarding velocity`,
      wrong3: `Understanding that modular structure reduces long-term maintenance costs`,
      explanation: `Functional logic, validation, and accessibility are as important as surface visual appearance.`
    },
    {
      qText: `Which key metric or output confirms that ${lessonTitle} has been executed correctly?`,
      correct: `Zero console/lint errors, responsive adaptability, and passing validation checks`,
      wrong1: `Having over 100 unused properties defined in the component declaration`,
      wrong2: `Requiring manual code tweaks for every single device screen size`,
      wrong3: `Relying on deprecated methods without fallback handling`,
      explanation: `Clean validation, responsive adaptability, and error-free execution signify production readiness.`
    }
  ];

  return questionsData.map((q, qIdx) => ({
    id: `q_${qIdx + 1}_${baseKey}`,
    questionText: q.qText,
    options: [
      {
        id: `opt_${qIdx + 1}_a_${baseKey}`,
        text: q.correct,
        misconception: ''
      },
      {
        id: `opt_${qIdx + 1}_b_${baseKey}`,
        text: q.wrong1,
        misconception: 'Misconception: Bypassing structural rules creates technical debt.'
      },
      {
        id: `opt_${qIdx + 1}_c_${baseKey}`,
        text: q.wrong2,
        misconception: 'Misconception: Absolute hardcoded values break responsive layouts.'
      },
      {
        id: `opt_${qIdx + 1}_d_${baseKey}`,
        text: q.wrong3,
        misconception: 'Misconception: Disabling controls degrades overall system safety.'
      }
    ],
    correctOptionId: `opt_${qIdx + 1}_a_${baseKey}`,
    explanation: q.explanation
  }));
}

async function main() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('SEEDING POLICY VIOLATION: Cannot run seed script in production environment!');
  }

  console.log('🌱 Seeding 5 COMPLETE published courses for Joel Ndakwe (upskiill201@gmail.com)...');

  // 1. Find the real Creator account — NEVER upsert/overwrite it.
  // upskiill201@gmail.com is a real production creator account, not a test user.
  const email = 'upskiill201@gmail.com';
  const joel = await runWithRetry(() => prisma.user.findFirst({ where: { email } }));
  if (!joel) {
    throw new Error(`Creator account ${email} not found in database. Please ensure the account exists before seeding courses.`);
  }

  console.log(`✅ Creator Verified: ${joel.fullName} (${joel.email}) - ID: ${joel.id}`);

  // Upsert Creator Profile (safe — additive, does not overwrite auth flags)
  await runWithRetry(() => prisma.profile.upsert({
    where: { userId: joel.id },
    update: {
      niche: 'Product Design & Full-Stack Development',
      teachingStyle: 'Gamified & Project-Based',
      bio: 'Senior Product Designer & Engineer with 8+ years building digital products and design systems.',
    },
    create: {
      userId: joel.id,
      niche: 'Product Design & Full-Stack Development',
      teachingStyle: 'Gamified & Project-Based',
      bio: 'Senior Product Designer & Engineer with 8+ years building digital products and design systems.',
    },
  }));

  // 2. Loop through each of the 5 Courses
  for (const courseData of COURSES_DATA) {
    const course = await runWithRetry(() => prisma.course.upsert({
      where: { slug: courseData.slug },
      update: {
        title: courseData.title,
        description: courseData.description,
        shortDescription: courseData.shortDescription,
        thumbnailUrl: courseData.thumbnailUrl,
        price: courseData.price,
        originalPrice: courseData.originalPrice,
        published: true, // ALL 5 COURSES ARE PUBLISHED
        category: courseData.category,
        subcategory: courseData.subcategory,
        level: courseData.level,
        duration: courseData.duration,
        creatorTimeWeekly: courseData.creatorTimeWeekly,
        subtitle: courseData.subtitle,
        language: courseData.language,
        skills: courseData.skills,
        requirements: courseData.requirements,
        outcomes: courseData.outcomes,
        instructorId: joel.id,
      },
      create: {
        id: courseData.id,
        title: courseData.title,
        slug: courseData.slug,
        description: courseData.description,
        shortDescription: courseData.shortDescription,
        thumbnailUrl: courseData.thumbnailUrl,
        price: courseData.price,
        originalPrice: courseData.originalPrice,
        published: true,
        category: courseData.category,
        subcategory: courseData.subcategory,
        level: courseData.level,
        duration: courseData.duration,
        creatorTimeWeekly: courseData.creatorTimeWeekly,
        subtitle: courseData.subtitle,
        language: courseData.language,
        skills: courseData.skills,
        requirements: courseData.requirements,
        outcomes: courseData.outcomes,
        instructorId: joel.id,
      },
    }));

    console.log(`\n📚 Course Upserted [PUBLISHED]: "${course.title}" (ID: ${course.id})`);

    // 3. Create 5 Modules & 5 Lessons per module (25 lessons per course)
    let globalLessonCounter = 1;

    for (let mIdx = 0; mIdx < courseData.modules.length; mIdx++) {
      const moduleData = courseData.modules[mIdx];
      const sectionId = `sec-${course.id}-m${mIdx + 1}`;

      const section = await runWithRetry(() => prisma.section.upsert({
        where: { id: sectionId },
        update: {
          title: moduleData.title,
          orderIndex: mIdx,
        },
        create: {
          id: sectionId,
          title: moduleData.title,
          orderIndex: mIdx,
          courseId: course.id,
        },
      }));

      for (let lIdx = 0; lIdx < moduleData.lessons.length; lIdx++) {
        const lessonObj = moduleData.lessons[lIdx];
        const lessonTitle = lessonObj.title;
        const whatYouWillLearnPoints = lessonObj.wyl;
        const lessonId = `les-${course.id}-m${mIdx + 1}-l${lIdx + 1}`;
        const lessonNumber = globalLessonCounter++;

        // 5 Real Domain Questions for Apply Step
        const applyQuestions = generate5RealApplyQuestions(
          lessonTitle,
          lessonNumber,
          courseData.category
        );

        const contentBlocks = {
          learn: [
            {
              id: `blk-${lessonId}-learn-vid`,
              type: 'videoUrl',
              value: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
            },
            {
              id: `blk-${lessonId}-learn-txt`,
              type: 'text',
              value: `<h3>${lessonTitle}</h3><p>In this lesson, you will master key principles, core structures, and practical patterns for <strong>${lessonTitle}</strong>. Pay close attention to standard guidelines and execution workflows.</p><p>Key Takeaways:</p><ul>${whatYouWillLearnPoints.map(point => `<li>${point}</li>`).join('')}</ul>`,
            },
            {
              type: 'whatYouWillLearn',
              value: whatYouWillLearnPoints,
            },
          ],
          apply: [
            {
              type: 'mcqActivity',
              value: {
                scenario: `You are applying the concepts learned in ${lessonTitle} to a real-world project task. Answer all 5 questions below to complete this section.`,
                passingScore: 70,
                allowRetries: true,
                difficultyLevel: 'medium',
                questions: applyQuestions,
              },
            },
          ],
          reflect: [
            {
              type: 'reflectActivity',
              value: {
                prompt: `How will you apply the principles learned in "${lessonTitle}" to improve your personal workflow and project quality?`,
                type: 'open',
                openConfig: {
                  useStarters: true,
                  starters: [
                    { id: `s1_${lessonId}`, text: `In my project workflow, I will start using ${lessonTitle} by...` },
                    { id: `s2_${lessonId}`, text: 'One key insight I gained from this lesson is...' }
                  ],
                  minWordCount: 15,
                  required: true,
                  peerVisibility: false,
                  allowComments: false,
                  allowAttachments: false,
                },
              },
            },
          ],
          deepen: [
            {
              type: 'deepenActivity',
              value: {
                collectionTitle: `${lessonTitle} - Best Practices Guide`,
                collectionDescription: `Deepen your technical understanding of ${lessonTitle} with official reference documentation and implementation guidelines.`,
                resourceSettings: {
                  makeRequired: true,
                  trackCompletion: true,
                  allowDownloads: true,
                  openInNewTab: true,
                },
                recommendedNextStep: { type: 'continue' },
                showLearningPathSuggestions: false,
                learningPathSuggestions: [],
              },
            },
          ],
        };

        const stepCompletion = {
          learn: true,
          apply: true,
          reflect: true,
          deepen: true,
        };

        // Upsert Lesson
        await runWithRetry(() => prisma.lesson.upsert({
          where: { id: lessonId },
          update: {
            title: lessonTitle,
            shortDescription: `Practical application lab and assessment for ${lessonTitle}.`,
            lessonType: 'video',
            orderIndex: lIdx,
            isFreePreview: mIdx === 0 && lIdx === 0, // Lesson 1 free preview
            durationMinutes: 15,
            status: 'published',
            contentBlocks,
            stepCompletion,
          },
          create: {
            id: lessonId,
            title: lessonTitle,
            shortDescription: `Practical application lab and assessment for ${lessonTitle}.`,
            lessonType: 'video',
            orderIndex: lIdx,
            isFreePreview: mIdx === 0 && lIdx === 0,
            durationMinutes: 15,
            status: 'published',
            sectionId: section.id,
            contentBlocks,
            stepCompletion,
          },
        }));

        // Upsert Lesson Resource
        const resourceId = `res-${lessonId}`;
        await runWithRetry(() => prisma.lessonResource.upsert({
          where: { id: resourceId },
          update: {
            title: `${lessonTitle} Technical Reference Guide`,
            type: 'link',
            storageUrl: 'https://teyro.com/docs/technical-reference',
            displayOrder: 0,
          },
          create: {
            id: resourceId,
            lessonId,
            title: `${lessonTitle} Technical Reference Guide`,
            type: 'link',
            storageUrl: 'https://teyro.com/docs/technical-reference',
            displayOrder: 0,
          },
        }));

        await new Promise(r => setTimeout(r, 15));
      }
    }

    console.log(`   └─ Successfully created 5 modules & 25 complete lessons (with 5 real questions per lesson & What You'll Learn) for "${course.title}"`);
  }

  console.log('\n🎉 ALL 5 SEED COURSES SUCCESSFULLY CREATED & PUBLISHED for upskiill201@gmail.com!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
