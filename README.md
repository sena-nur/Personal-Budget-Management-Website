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


## Application Screenshots

### Dashboard View
![image](https://github.com/user-attachments/assets/3b0d524c-c3c1-4d41-be98-5b5241f44c5f)
![image](https://github.com/user-attachments/assets/12becd94-b524-40b4-8e21-e19ac0db8485)
![image](https://github.com/user-attachments/assets/68ccfadc-eaed-46ef-9082-d37160f31b54)
![image](https://github.com/user-attachments/assets/7ef6c11f-1d7e-442f-9d60-fbe2c39cb552)
![image](https://github.com/user-attachments/assets/6f8fdc50-0e7e-4fcf-8de8-096ba24dcbd4)
![image](https://github.com/user-attachments/assets/4cdbc07d-763e-4bf3-9673-b668cff8af15)

### Category Management
![image](https://github.com/user-attachments/assets/9e9db290-a172-40be-a515-9cbefd1e8f86)
![image](https://github.com/user-attachments/assets/89a86228-f4ec-4957-88ab-64d6844159e9)
![image](https://github.com/user-attachments/assets/7e4fc8c0-6238-4250-a3d1-3991d43f577c)


### Budget Management Advices
![image](https://github.com/user-attachments/assets/4914bb1d-cb25-4c4a-a732-149e755f5e80)
![image](https://github.com/user-attachments/assets/edce04fa-049e-4363-8d0a-bbb9bd1627e6)


### Reports
![image](https://github.com/user-attachments/assets/fa0662f7-00d9-4b7a-a7a2-6d5cbcdf1eb6)





## Project Structure

```bash
src/
├── app/
│   ├── components/
│   │   ├── Advices/
│   │   │   └── BudgetAdvices.tsx
│   │   ├── Categories/
│   │   │   ├── ExpenseCategories.tsx
│   │   │   └── IncomeCategories.tsx
│   │   ├── Charts/
│   │   │   ├── MonthlyExpenseChart.tsx
│   │   │   ├── MonthlyIncomeChart.tsx
│   │   │   └── YearlyChart.tsx
│   │   ├── Hero/
│   │   │   ├── Hero.tsx
│   │   │   └── CategoryForm.tsx
│   │   ├── PDFReport/
│   │   │   └── Report.tsx
│   │   ├── Transactions/
│   │   │   ├── TransactionList.tsx
│   │   │   ├── TransactionItem.tsx
│   │   │   └── TransactionForm.tsx
│   │   └── UI/
│   │       ├── Alert.tsx
│   │       ├── DateSelector.tsx
│   │       ├── Navbar.tsx
│   │       ├── Pagination.tsx
│   │       └── Tab.tsx
│   ├── context/
│   │   ├── BudgetContext.tsx
│   │   └── ThemeContext.tsx
│   ├── fonts/
│   │   ├── GeistVF.woff
│   │   └── GeistMonoVF.woff
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── types/
│   └── index.ts
├── package.json
└── README.md
```
