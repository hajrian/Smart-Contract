# HajrShield - Blockchain Risk Management & Consumer Protection Platform

## Overview
HajrShield is a comprehensive blockchain security platform designed for hackathons focused on risk management and consumer protection. It combines smart contract auditing capabilities with on-chain analysis to provide real-time security monitoring and protection for blockchain users.

## Features

### 🔐 Smart Contract Audit
- **Automated Vulnerability Detection**: Identifies reentrancy attacks, integer overflows, and other common vulnerabilities
- **Real-time Code Analysis**: Live scanning of smart contract source code
- **Comprehensive Reporting**: Detailed audit reports with severity classifications and recommendations
- **Multi-network Support**: Ethereum, BSC, Polygon, Arbitrum compatibility

### 📊 On-Chain Analysis
- **Transaction Monitoring**: Real-time analysis of blockchain transactions
- **Risk Scoring**: AI-powered risk assessment for addresses and transactions
- **Pattern Recognition**: Detection of suspicious activities and MEV operations
- **Interactive Dashboards**: Visual representation of blockchain activity and risks

### 🚨 Risk Management
- **Real-time Alerts**: Instant notifications for critical security issues
- **Consumer Protection**: Automated flagging of high-risk transactions
- **Historical Analysis**: Trend analysis and pattern recognition
- **Multi-severity Classification**: Critical, high, medium, and low risk categorization

### 📈 Analytics & Reporting
- **Comprehensive Reports**: Detailed security analysis and audit summaries
- **Data Visualization**: Interactive charts and graphs for trend analysis
- **Export Capabilities**: PDF and CSV export functionality
- **Historical Data**: Long-term security metrics and trends

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Routing**: React Router DOM

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd hajrshield
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Configure Supabase
- Create a new Supabase project
- Update `.env` with your Supabase URL and anon key
- Run the database migrations (see Database Setup section)

5. Start the development server
```bash
npm run dev
```

## Database Setup

The application requires several database tables for full functionality:

1. **Users** - User authentication and profiles
2. **Smart Contracts** - Contract audit records
3. **Audit Results** - Vulnerability findings and recommendations  
4. **Transactions** - On-chain transaction analysis
5. **Risk Alerts** - Security alerts and notifications

*Note: Database migration files will be provided upon Supabase connection setup.*

## Key Components

### Dashboard
- Real-time security metrics
- Risk trend visualization
- Recent alerts and activities
- System status overview

### Smart Contract Audit
- Contract address input and source code analysis
- Automated vulnerability scanning
- Detailed vulnerability reports with remediation suggestions
- Risk scoring and severity classification

### On-Chain Analysis  
- Address and transaction hash lookup
- Real-time transaction monitoring
- Risk pattern detection
- Network-specific analysis (Ethereum, BSC, Polygon, Arbitrum)

### Risk Alerts
- Real-time security notifications
- Severity-based filtering
- Alert management and resolution
- Evidence tracking and recommendations

### Reports & Analytics
- Comprehensive audit reports
- Statistical analysis and trends
- Export capabilities for compliance
- Historical data visualization

## Security Features

- **Multi-layer Risk Assessment**: Combines static analysis with dynamic monitoring
- **Real-time Threat Detection**: Instant alerts for critical security issues
- **Consumer Protection Mechanisms**: Automated warnings for high-risk interactions
- **Audit Trail**: Complete history of security events and responses

## Hackathon Alignment

This platform directly addresses the hackathon themes:

**Risk Management**:
- Proactive identification of smart contract vulnerabilities
- Real-time risk scoring and assessment
- Predictive analytics for emerging threats

**Consumer Protection**:
- Automated warnings for dangerous transactions
- User-friendly security recommendations
- Educational resources for safe blockchain interactions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Built for the future of blockchain security and consumer protection.**