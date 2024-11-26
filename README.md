# Personal Budget Management Website

A comprehensive web application for managing personal finances, built with modern web technologies. This application helps users track their income and expenses, manage budgets, and visualize their financial data.

## Technologies Used

### Core Technologies

- **Next.js (v15.0.3)**: React-based web framework
- **TypeScript**: Typed superset of JavaScript
- **React (v18.2.0)**: UI development library
- **Tailwind CSS (v3.4.1)**: Utility-first CSS framework

### Data & State Management

- **Context API**: Application-wide state management
- **Local Storage**: Local data persistence
- **React Hooks**: State and lifecycle management

### UI Components & Styling

- **@heroicons/react (v2.2.0)**: SVG icon library
- **react-icons (v5.3.0)**: Icon library
- **Geist Fonts**: Custom fonts (GeistVF, GeistMonoVF)
- **Tailwind Dark Mode**: Dark/Light theme support

### Data Visualization

- **Chart.js (v4.4.6)**: Charting library
- **react-chartjs-2 (v5.2.0)**: React integration for Chart.js
- **react-apexcharts (v1.6.0)**: Advanced charting components

### Reporting & PDF

- **@react-pdf/renderer (v4.1.4)**: PDF generation
- **react-to-pdf (v1.0.1)**: Convert React components to PDF

### Date Operations

- **date-fns (v4.1.0)**: Date formatting and operations

## Key Features

### Transaction Management

The application uses a context-based state management system for handling transactions. Users can:

- Add new transactions with categories
- Set transaction dates
- Add descriptions and amounts
- Edit or delete existing transactions

### Budget Tracking

- Real-time budget monitoring
- Category-wise spending limits
- Automated warnings when approaching limits
- Monthly and yearly tracking

### Data Visualization

- Pie charts for expense distribution
- Bar charts for yearly comparisons
- Monthly income/expense trends
- Category-wise analysis

### Financial Analysis

- Monthly income and expense charts
- Yearly financial overview
- Category-wise spending analysis
- Expense distribution visualization
- Real-time budget tracking

### Reports

- Generate PDF reports
- Monthly financial statements
- Income and expense summaries
- Category-wise breakdowns
- Net worth tracking

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/yourusername/personal-budget-management-website.git
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```bash
── app/
│ ├── components/
│ │ ├── Advices/
│ │ ├── Categories/
│ │ ├── Charts/
│ │ ├── Hero/
│ │ ├── PDFReport/
│ │ ├── Transactions/
│ │ └── UI/
│ ├── context/
│ ├── layout.tsx
│ └── page.tsx
```
