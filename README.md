# Bankist App

## Overview
Bankist is a minimalist online banking application that allows users to manage their finances through a clean and intuitive interface. The application simulates core banking features such as checking balance, transferring money, requesting loans, and closing accounts, all within a sleek, modern UI.

## Learning Project
This project was created as part of Jonas Schmedtmann's JavaScript course. I built it to improve my JavaScript skills and understand core concepts including:
- DOM manipulation
- Array methods
- Event handling
- User authentication flows
- Timer functionality
- Data transformations
- Internationalization API usage

Working on this project has significantly enhanced my front-end development capabilities and provided practical experience with modern JavaScript features.

## Features

### User Authentication
- Log in with username and PIN
- Automatic logout timer for security (2 minutes)
- Welcome message personalized to the account owner

### Account Management
- Real-time balance display
- Transaction history with deposits and withdrawals
- Summary calculations for incoming and outgoing funds
- Interest calculations based on account type and interest rate

### Banking Operations
- Transfer money to other accounts
- Request loans based on eligibility (must have a deposit at least 10% of loan amount)
- Close account with verification

### Data Visualization
- Color-coded transaction history (green for deposits, red for withdrawals)
- Sort transactions by amount
- Visual summary of account statistics

### Internationalization
- Currency formatting based on user's locale
- Date formatting according to regional preferences
- Number formatting with appropriate decimal separators

## Technical Details

### Architecture
The application follows a simple MVC-like pattern:
- Data stored in account objects with transaction history
- DOM manipulation for UI updates
- Event handlers for user interactions

### Date and Currency Handling
- Modern JavaScript Intl API for formatting currencies and dates
- Relative time display for recent transactions ("Today", "Yesterday", "X days ago")
- Currency symbols and formatting based on account settings

### Timer Implementation
- Session timeout security feature
- Countdown display in minutes and seconds
- Automatic logout after inactivity

## User Guide

### Logging In
1. Enter your username (first letter of each word in your name, lowercase)
2. Enter your PIN
3. Click the login arrow or press Enter

### Account Overview
- Current balance is displayed at the top
- Transaction history shows your recent activity with dates
- Summary section at the bottom shows totals for deposits, withdrawals, and interest

### Making Transfers
1. Enter the recipient's username
2. Enter the amount to transfer
3. Click the transfer arrow
4. Transfer will be recorded with current date and time

### Requesting Loans
1. Enter the desired loan amount
2. Click the loan button
3. Loan is granted if you have a deposit of at least 10% of the requested amount
4. Loan processing has a simulated delay of 2.5 seconds

### Closing Your Account
1. Enter your username
2. Enter your PIN
3. Click the close button
4. Account will be removed from the system

## Demo Accounts
Test the application with these demo accounts:

| Owner | Username | PIN | Account Type | Currency | Locale |
|-------|----------|-----|--------------|----------|--------|
| Vicky Kent | vk | 1111 | Premium | EUR | Portuguese |
| Jessica Kent | jk | 2222 | Standard | USD | American |
| Steven Thomas Williams | stw | 3333 | Premium | - | - |
| Sarah Smith | ss | 4444 | Basic | - | - |

## Security Notice
This app is for demonstration purposes only. In a production environment, additional security measures would be implemented, including:
- Secure authentication protocols
- Data encryption
- Server-side validation
- HTTPS connections
- More robust session management

## Development
Bankist is built with vanilla JavaScript and leverages modern ES6+ features:
- Arrow functions
- Destructuring and parameter defaults
- Optional chaining
- Array methods (map, filter, reduce, find, some)
- Modern DOM manipulation techniques
- Internationalization API
- Timeout and interval functions

## Future Enhancements
- Currency conversion features
- Scheduled payments
- Budget planning tools
- Mobile applications
- Data visualizations with charts
- Complete locale support for all accounts
- Transaction search and filtering