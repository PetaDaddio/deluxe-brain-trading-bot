'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Activity, TrendingUp, TrendingDown, Wifi, WifiOff, Users, DollarSign, Target, Brain, Bell, BarChart3, Zap } from 'lucide-react';

const SolanaWhaleTracker = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isConnected, setIsConnected] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0.000234);
  const [priceChange, setPriceChange] = useState(12.5);
  const [transactions, setTransactions] = useState([]);
  const [whaleAlerts, setWhaleAlerts] = useState([]);
  const [clusters, setClusters] = useState([
    { name: 'USELESS Alpha Group', wallets: 8, accuracy: 87.4, folder: 'USELESS_Whales', status: 'ACCUMULATING' },
    { name: 'SOL Ecosystem Pros', wallets: 23, accuracy: 91.2, folder: 'SOL_Veterans', status: 'HOLDING' },
    { name: 'DeFi Arbitrage Masters', wallets: 15, accuracy: 83.7, folder: 'DeFi_Specialists', status: 'ACTIVE' }
  ]);
  const [opportunities, setOpportunities] = useState([]);

  // Simulate real-time connection and data
  useEffect(() => {
    const connectToRPC = async () => {
      // Simulate connection to Helius RPC
      setTimeout(() => {
        setIsConnected(true);
        console.log('Connected to Helius RPC');
      }, 2000);
    };

    connectToRPC();
  }, []);

  // Simulate whale detection
  const simulateWhaleDetection = useCallback(() => {
    const whaleWallets = [
      '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
      'ASTyfSima4LLAdDgoFGkgqoKowG1LZFDr9fAQrg7iaJZ',
      'B8KQm5vP2kJhEwC9NzLx7mR3WqYzAcDfGh9VtXsRnKpM',
      'C9LRn6wQ3lKiEyD0OzMy8nS4XrZaAdEfHj0WuYtSoLqN'
    ];

    const actions = ['BUY', 'SELL'];
    const amounts = [500000, 1200000, 2400000, 850000, 1750000];
    const confidenceScores = [89, 92, 95, 87, 94];

    const newTransaction = {
      id: Date.now(),
      wallet: whaleWallets[Math.floor(Math.random() * whaleWallets.length)],
      action: actions[Math.floor(Math.random() * actions.length)],
      amount: amounts[Math.floor(Math.random() * amounts.length)],
      confidence: confidenceScores[Math.floor(Math.random() * confidenceScores.length)],
      timestamp: new Date(),
      valueUSD: Math.random() * 1000 + 200
    };

    setTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);

    // Create whale alert for large transactions
    if (newTransaction.valueUSD > 500) {
      const alert = {
        id: Date.now(),
        type: 'WHALE_ALERT',
        transaction: newTransaction,
        timestamp: new Date()
      };
      setWhaleAlerts(prev => [alert, ...prev.slice(0, 4)]);
      
      // Simulate Telegram alert
      sendTelegramAlert(newTransaction);
    }
  }, []);

  const sendTelegramAlert = async (transaction) => {
    const message = `🐋 WHALE ALERT 🐋

${transaction.action}: ${(transaction.amount / 1000000).toFixed(1)}M $USELESS
💰 Value: $${transaction.valueUSD.toFixed(2)}
🎯 Confidence: ${transaction.confidence}%
⏰ Time: ${transaction.timestamp.toLocaleTimeString()}
👛 Wallet: ${transaction.wallet.substring(0, 8)}...${transaction.wallet.substring(-6)}

🔍 Full wallet: ${transaction.wallet}`;

    console.log('Telegram Alert:', message);
    // In production, this would call the Telegram Bot API
  };

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const change = (Math.random() - 0.5) * 0.000001;
        return Math.max(0.0001, prev + change);
      });
      setPriceChange((Math.random() - 0.5) * 20);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Simulate whale detection
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        simulateWhaleDetection();
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isConnected, simulateWhaleDetection]);

  // Generate trading opportunities
  useEffect(() => {
    const generateOpportunities = () => {
      const patterns = ['Triangle Breakout', 'Support Hold', 'Liquidity Sweep', 'Accumulation Zone'];
      const newOpps = [
        {
          id: 1,
          token: 'BONK',
          pattern: patterns[Math.floor(Math.random() * patterns.length)],
          confidence: Math.floor(Math.random() * 15) + 85,
          entry: '$0.000024',
          target: '$0.000031',
          analysis: 'Based on 40 years of trading wisdom: Multiple whale clusters showing coordinated accumulation'
        },
        {
          id: 2,
          token: 'WIF',
          pattern: patterns[Math.floor(Math.random() * patterns.length)],
          confidence: Math.floor(Math.random() * 15) + 85,
          entry: '$2.45',
          target: '$3.20',
          analysis: 'Linda Bradford Raschke pattern: Volume confirmation with whale support'
        }
      ];
      setOpportunities(newOpps);
    };

    generateOpportunities();
    const interval = setInterval(generateOpportunities, 30000);
    return () => clearInterval(interval);
  }, []);

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        isActive 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  const TransactionCard = ({ transaction }) => (
    <div className={`p-3 rounded-lg border-l-4 ${
      transaction.action === 'BUY' ? 'border-green-500 bg-green-900/20' : 'border-red-500 bg-red-900/20'
    }`}>
      <div className="flex justify-between items-start">
        <div>
          <span className={`font-bold ${
            transaction.action === 'BUY' ? 'text-green-400' : 'text-red-400'
          }`}>
            {transaction.action}
          </span>
          <span className="text-gray-300 ml-2">
            {(transaction.amount / 1000000).toFixed(1)}M $USELESS
          </span>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-blue-400">{transaction.confidence}%</div>
          <div className="text-xs text-gray-400">{transaction.timestamp.toLocaleTimeString()}</div>
        </div>
      </div>
      <div className="text-xs text-gray-400 mt-1">
        {transaction.wallet.substring(0, 8)}...{transaction.wallet.substring(-6)}
      </div>
      <div className="text-xs text-yellow-400">${transaction.valueUSD.toFixed(2)}</div>
    </div>
  );

  const ClusterCard = ({ cluster }) => (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-white">{cluster.name}</h3>
        <span className={`px-2 py-1 rounded text-xs font-bold ${
          cluster.status === 'ACCUMULATING' ? 'bg-green-900 text-green-400' :
          cluster.status === 'DISTRIBUTING' ? 'bg-red-900 text-red-400' :
          'bg-blue-900 text-blue-400'
        }`}>
          {cluster.status}
        </span>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Wallets:</span>
          <span className="text-white">{cluster.wallets}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Accuracy:</span>
          <span className="text-green-400 font-bold">{cluster.accuracy}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Notion Folder:</span>
          <span className="text-blue-400 text-xs">{cluster.folder}</span>
        </div>
      </div>
    </div>
  );

  const OpportunityCard = ({ opportunity }) => (
    <div className="bg-gray-800 rounded-lg p-4 border border-yellow-500/30">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-yellow-400">{opportunity.token}</h3>
          <p className="text-sm text-gray-300">{opportunity.pattern}</p>
        </div>
        <div className="text-right">
          <div className="text-green-400 font-bold">{opportunity.confidence}%</div>
          <div className="text-xs text-gray-400">Confidence</div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm mb-3">
        <div className="flex justify-between">
          <span className="text-gray-400">Entry:</span>
          <span className="text-green-400">{opportunity.entry}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Target:</span>
          <span className="text-yellow-400">{opportunity.target}</span>
        </div>
      </div>
      
      <div className="text-xs text-gray-300 italic">
        {opportunity.analysis}
      </div>
      
      <button 
        onClick={() => navigator.clipboard.writeText(opportunity.token)}
        className="w-full mt-3 bg-yellow-600 hover:bg-yellow-700 py-2 rounded text-xs font-bold"
      >
        Copy Contract
      </button>
    </div>
  );

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Brain className="text-blue-400" size={40} />
            <div>
              <h1 className="text-3xl font-bold text-blue-400">DELUXE BRAIN</h1>
              <p className="text-gray-400">Solana Whale Intelligence System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {isConnected ? (
                <>
                  <Wifi className="text-green-400" size={20} />
                  <span className="text-green-400 text-sm">Connected</span>
                </>
              ) : (
                <>
                  <WifiOff className="text-red-400" size={20} />
                  <span className="text-red-400 text-sm">Connecting...</span>
                </>
              )}
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">
                ${currentPrice.toFixed(6)}
              </div>
              <div className={`text-sm flex items-center gap-1 ${
                priceChange >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {priceChange >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          <TabButton 
            id="dashboard" 
            label="Dashboard" 
            icon={BarChart3} 
            isActive={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <TabButton 
            id="whales" 
            label="Whales" 
            icon={Users} 
            isActive={activeTab === 'whales'}
            onClick={() => setActiveTab('whales')}
          />
          <TabButton 
            id="clusters" 
            label="Clusters" 
            icon={Target} 
            isActive={activeTab === 'clusters'}
            onClick={() => setActiveTab('clusters')}
          />
          <TabButton 
            id="opportunities" 
            label="Opportunities" 
            icon={Zap} 
            isActive={activeTab === 'opportunities'}
            onClick={() => setActiveTab('opportunities')}
          />
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Market Over
