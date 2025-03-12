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

Working on this project has significantly enhanced my front-end development capabilities and provided practical experience with modern JavaScript features.

## Features

### User Authentication
- Log in with username and PIN
- Automatic logout timer for security (5 minutes)
- Welcome message personalized to the account owner

### Account Management
- Real-time balance display
- Transaction history with deposits and withdrawals
- Summary calculations for incoming and outgoing funds
- Interest calculations based on account type

### Banking Operations
- Transfer money to other accounts
- Request loans based on eligibility (must have a deposit at least 10% of loan amount)
- Close account with verification

### Data Visualization
- Color-coded transaction history (green for deposits, red for withdrawals)
- Sort transactions by amount
- Visual summary of account statistics

## Technical Details

### Architecture
The application follows a simple MVC-like pattern:
- Data stored in account objects
- DOM manipulation for UI updates
- Event handlers for user interactions

### Responsive Design
- Fluid layout adapts to different screen sizes
- Mobile-first approach with progressive enhancement
- Optimized for both touch and mouse interactions

### Performance Optimizations
- Efficient array methods for data processing
- Real-time UI updates without page reloads
- Timer management for session control

## User Guide

### Logging In
1. Enter your username (first letter of each word in your name, lowercase)
2. Enter your PIN
3. Click the login arrow or press Enter

### Account Overview
- Current balance is displayed at the top
- Transaction history shows your recent activity
- Summary section at the bottom shows totals for deposits and withdrawals

### Making Transfers
1. Enter the recipient's username
2. Enter the amount to transfer
3. Click the transfer arrow

### Requesting Loans
1. Enter the desired loan amount
2. Click the loan button
3. Loan is granted if you have a deposit of at least 10% of the requested amount

### Closing Your Account
1. Enter your username
2. Enter your PIN
3. Click the close button

## Demo Accounts
Test the application with these demo accounts:

| Owner | Username | PIN | Account Type |
|-------|----------|-----|--------------|
| Vicky Kent | vk | 1111 | Premium |
| Jessica Kent | jk | 2222 | Standard |
| Steven Thomas Williams | stw | 3333 | Premium |
| Sarah Smith | ss | 4444 | Basic |

## Security Notice
This app is for demonstration purposes only. In a production environment, additional security measures would be implemented, including:
- Secure authentication protocols
- Data encryption
- Server-side validation
- HTTPS connections

## Development
Bankist is built with vanilla JavaScript and leverages modern ES6+ features:
- Arrow functions
- Destructuring
- Optional chaining
- Array methods (map, filter, reduce)
- Modern DOM manipulation techniques

## Future Enhancements
- Currency conversion features
- Scheduled payments
- Budget planning tools
- Mobile applications
- Data visualizations with charts