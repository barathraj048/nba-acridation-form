# Faculty Management System

A comprehensive faculty data management and reporting system built with Next.js 15, TypeScript, and Prisma.

## Features

- **Faculty Management**: Complete CRUD operations for faculty profiles
- **Research Data Tracking**: Journals, conferences, books, patents, NPTEL courses, and awards
- **Advanced Search & Filtering**: Multi-criteria search with pagination
- **Data Import/Export**: CSV import/export for all datasets
- **PDF Report Generation**: Comprehensive reporting capabilities
- **Responsive Design**: Mobile-friendly interface with modern UI

## Technology Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (development), PostgreSQL (production)
- **UI Components**: shadcn/ui, Radix UI
- **Data Fetching**: SWR
- **Form Handling**: React Hook Form with Zod validation
- **File Processing**: PapaParse for CSV operations
- **PDF Generation**: @react-pdf/renderer

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd faculty-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push
```

4. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Production Database Setup

For production deployment, switch from SQLite to PostgreSQL:

#### Using Supabase

1. Create a new project at [Supabase](https://supabase.com)
2. Get your database URL from Settings > Database
3. Update your `.env` file:
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/[DATABASE]"
```

#### Using Neon

1. Create a new project at [Neon](https://neon.tech)
2. Get your connection string
3. Update your `.env` file:
```env
DATABASE_URL="postgresql://[USERNAME]:[PASSWORD]@[HOST]/[DATABASE]?sslmode=require"
```

#### Update Prisma Schema

In `prisma/schema.prisma`, change the datasource:

```prisma
datasource db {
  provider = "postgresql"  // Changed from "sqlite"
  url      = env("DATABASE_URL")
}
```

Then run the migration:
```bash
npm run db:migrate
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── faculty/           # Faculty management pages
│   ├── datasets/          # Dataset management pages
│   └── reports/           # Report generation pages
├── components/            # React components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── faculty/          # Faculty-specific components
│   └── datasets/         # Dataset-specific components
├── lib/                   # Utility functions
│   ├── prisma.ts         # Prisma client
│   ├── validations.ts    # Zod schemas
│   ├── csv-utils.ts      # CSV import/export utilities
│   └── utils.ts          # General utilities
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## Database Schema

### Faculty Table
- Basic information: name, department, joining year, qualification
- Contact details: phone, email
- Research profiles: Google Scholar, Scopus, Web of Science

### Related Tables
- **Journals**: Research paper publications
- **Conferences**: Conference proceedings
- **Books**: Book chapters and publications
- **Patents**: Patent applications and grants
- **NPTEL Courses**: Online course completions
- **Awards**: Academic and research awards

## Key Features

### Search & Filtering
- Global search by faculty name
- Department-wise filtering
- Joining year range filters
- Research presence toggles (Scholar, Scopus, etc.)
- Quick filters for patents and NPTEL courses

### Data Management
- Bulk CSV import with validation
- Individual record editing (inline and modal)
- Data export to CSV format
- Template downloads for bulk import

### Reporting
- Faculty profile reports
- Research output summaries
- Award listings (recent 4 years highlighted)
- PDF generation for comprehensive reports

## Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run format:check # Check code formatting

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes to database
npm run db:migrate   # Run database migrations
npm run db:reset     # Reset database (development only)
npm run db:seed      # Seed database with sample data
```

## Deployment

The application can be deployed to any platform that supports Next.js:

### Vercel (Recommended)
1. Connect your Git repository to Vercel
2. Set environment variables in the Vercel dashboard
3. Deploy automatically on push

### Other Platforms
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

Make sure to:
1. Set up your production database (PostgreSQL)
2. Update environment variables
3. Run database migrations
4. Configure any necessary build settings

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.