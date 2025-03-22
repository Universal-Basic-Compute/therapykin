# TherapyKin

TherapyKin is an AI-powered therapeutic companion that builds a genuine relationship with users over time. Unlike traditional therapy apps that reset with each session, TherapyKin remembers user history, learns preferences, and evolves alongside them.

## Overview

TherapyKin offers:

- **Personalized Support**: Custom coping techniques based on specific needs
- **Continuous Memory**: Conversations build on previous interactions
- **Evidence-Based Approaches**: Access to CBT, DBT, ACT, and mindfulness practices
- **Flexible Communication**: Text or voice interactions that can be switched seamlessly
- **24/7 Availability**: Support exactly when needed, whether scheduled or during unexpected difficulties
- **Privacy-First Design**: End-to-end encryption and comprehensive privacy controls

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/therapykin.git
   cd therapykin
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
therapykin/
├── app/                  # Next.js app directory
│   ├── components/       # Reusable UI components
│   ├── privacy/          # Privacy policy page
│   ├── terms/            # Terms of service page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Home page
├── public/               # Static assets
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies and scripts
├── postcss.config.mjs    # PostCSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Key Components

- **Header**: Navigation and branding
- **Footer**: Site links and legal information
- **FeatureHighlights**: Showcases key product features
- **UserStories**: Real user testimonials
- **CommunicationFlexibility**: Explains text/voice interaction options
- **TherapyComparison**: Compares TherapyKin with traditional therapy
- **PricingTiers**: Displays available subscription plans
- **PrivacySection**: Highlights privacy features
- **GettingStarted**: Explains the onboarding process

## Styling

The project uses:
- Tailwind CSS for styling
- Custom CSS variables for theming
- Dark mode support via media queries
- Responsive design for all screen sizes

## Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Legal Pages

The site includes comprehensive legal documentation:
- **Privacy Policy**: Details data collection, usage, and user rights
- **Terms of Service**: Outlines usage terms, disclaimers, and legal agreements

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[MIT License](LICENSE)

## Contact

For questions or support, please contact: support@therapykin.ai
