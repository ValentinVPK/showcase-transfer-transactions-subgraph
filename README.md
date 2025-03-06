# USDT Transfer Tracker on Sepolia

This application tracks ERC-20 USDT token transfers on the Sepolia testnet using a subgraph built on The Graph protocol. The app provides a user-friendly interface to view and filter transfer transactions.

## Features

- Real-time tracking of USDT transfers on Sepolia testnet
- Filter transactions by wallet address
- Pagination for browsing through transaction history
- Direct links to Etherscan for transaction details
- Responsive design for desktop and mobile

## Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Data Fetching**: Apollo Client for GraphQL
- **Indexing**: The Graph Protocol

## Subgraph Information

This application uses a custom subgraph to index USDT transfer events on the Sepolia testnet. The subgraph efficiently tracks all transfer events for the USDT contract at [0x93C5d30a7509E60871B77A3548a5BD913334cd35](https://sepolia.etherscan.io/address/0x93C5d30a7509E60871B77A3548a5BD913334cd35).

- **Subgraph Playground**: [https://thegraph.com/studio/subgraph/subgraph-transactions-on-sepolia/playground](https://thegraph.com/studio/subgraph/subgraph-transactions-on-sepolia/playground)
- **Subgraph Repository**: [https://github.com/ValentinVPK/subgraph-transactions-on-sepolia](https://github.com/ValentinVPK/subgraph-transactions-on-sepolia)

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/showcase-transfer-transactions-subgraph.git
cd showcase-transfer-transactions-subgraph
```

2. Install dependencies

```bash
npm install
# or
yarn
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Development

This project uses Vite for fast development with HMR (Hot Module Replacement):

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
