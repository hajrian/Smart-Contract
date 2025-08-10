import React, { useState } from 'react';
import { 
  Search, 
  TrendingUp, 
  AlertTriangle, 
  Activity,
  Eye,
  Filter,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  timestamp: string;
  riskScore: number;
  flagged: boolean;
  reason?: string;
}

const OnChainAnalysis: React.FC = () => {
  const [searchAddress, setSearchAddress] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');
  const [timeFilter, setTimeFilter] = useState('24h');

  const mockTransactions: Transaction[] = [
    {
      hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      from: '0x742d35Cc6634C0532925a3b8D400B1b3DC24fa55',
      to: '0x8ba1f109551bd432803012645hopa312213fa55',
      value: '2.5',
      gasUsed: '21000',
      timestamp: '2025-01-27T10:30:00Z',
      riskScore: 8.5,
      flagged: true,
      reason: 'High-risk address interaction'
    },
    {
      hash: '0x2345678901bcdef12345678901bcdef12345678901bcdef12345678901bcdef1',
      from: '0x8ba1f109551bd432803012645hopa312213fa55',
      to: '0x123d35Cc6634C0532925a3b8D400B1b3DC24fa55',
      value: '0.1',
      gasUsed: '45000',
      timestamp: '2025-01-27T10:25:00Z',
      riskScore: 3.2,
      flagged: false
    },
    {
      hash: '0x3456789012cdef123456789012cdef123456789012cdef123456789012cdef12',
      from: '0x123d35Cc6634C0532925a3b8D400B1b3DC24fa55',
      to: '0x456d35Cc6634C0532925a3b8D400B1b3DC24fa55',
      value: '10.0',
      gasUsed: '65000',
      timestamp: '2025-01-27T10:20:00Z',
      riskScore: 6.7,
      flagged: true,
      reason: 'Large transaction amount'
    }
  ];

  const activityData = [
    { time: '00:00', transactions: 45, riskScore: 2.1 },
    { time: '04:00', transactions: 32, riskScore: 3.4 },
    { time: '08:00', transactions: 78, riskScore: 4.2 },
    { time: '12:00', transactions: 156, riskScore: 5.8 },
    { time: '16:00', transactions: 234, riskScore: 7.1 },
    { time: '20:00', transactions: 189, riskScore: 6.3 },
  ];

  const handleAnalysis = async () => {
    if (!searchAddress) {
      toast.error('Please enter an address to analyze');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setAnalysisComplete(true);
      setIsAnalyzing(false);
      toast.success('Analysis completed successfully!');
    }, 2000);
  };

  const getRiskColor = (score: number) => {
    if (score >= 7) return 'text-red-400';
    if (score >= 5) return 'text-orange-400';
    if (score >= 3) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getRiskBadge = (score: number) => {
    if (score >= 7) return 'bg-red-900 text-red-400';
    if (score >= 5) return 'bg-orange-900 text-orange-400';
    if (score >= 3) return 'bg-yellow-900 text-yellow-400';
    return 'bg-green-900 text-green-400';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">On-Chain Analysis</h1>
          <p className="text-gray-400 mt-1">Real-time blockchain transaction monitoring and risk assessment</p>
        </div>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl p-6 border border-gray-700"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Address Search */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Address/Transaction Hash
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                placeholder="0x... or transaction hash"
                className="w-full px-4 py-3 pl-12 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            </div>
          </div>

          {/* Network Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Network
            </label>
            <select
              value={selectedNetwork}
              onChange={(e) => setSelectedNetwork(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ethereum">Ethereum</option>
              <option value="bsc">Binance Smart Chain</option>
              <option value="polygon">Polygon</option>
              <option value="arbitrum">Arbitrum</option>
            </select>
          </div>

          {/* Time Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Time Range
            </label>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAnalysis}
            disabled={isAnalyzing}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw size={20} className="animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Search size={20} />
                <span>Analyze</span>
              </>
            )}
          </motion.button>
          
          <button className="flex items-center space-x-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 font-medium">
            <Filter size={20} />
            <span>Advanced Filters</span>
          </button>
        </div>
      </motion.div>

      {/* Real-time Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800 rounded-xl p-6 border border-gray-700"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Transaction Activity & Risk Trends</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Activity size={16} />
            <span>Live monitoring</span>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" stroke="#9CA3AF" />
            <YAxis yAxisId="left" stroke="#9CA3AF" />
            <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F3F4F6'
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="transactions"
              stroke="#3B82F6"
              strokeWidth={2}
              name="Transactions"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="riskScore"
              stroke="#EF4444"
              strokeWidth={2}
              name="Risk Score"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Analysis Results */}
      {analysisComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Transactions</p>
                  <p className="text-2xl font-bold text-white">1,234</p>
                </div>
                <Activity className="text-blue-500" size={24} />
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Flagged</p>
                  <p className="text-2xl font-bold text-red-400">23</p>
                </div>
                <AlertTriangle className="text-red-500" size={24} />
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Avg Risk Score</p>
                  <p className="text-2xl font-bold text-orange-400">5.8</p>
                </div>
                <TrendingUp className="text-orange-500" size={24} />
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Volume</p>
                  <p className="text-2xl font-bold text-green-400">156.7 ETH</p>
                </div>
                <Eye className="text-green-500" size={24} />
              </div>
            </div>
          </div>

          {/* Transaction List */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-300">Hash</th>
                    <th className="text-left py-3 px-4 text-gray-300">From/To</th>
                    <th className="text-left py-3 px-4 text-gray-300">Value</th>
                    <th className="text-left py-3 px-4 text-gray-300">Risk Score</th>
                    <th className="text-left py-3 px-4 text-gray-300">Status</th>
                    <th className="text-left py-3 px-4 text-gray-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTransactions.map((tx, index) => (
                    <motion.tr
                      key={tx.hash}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-700/50 hover:bg-gray-700/50"
                    >
                      <td className="py-4 px-4">
                        <span className="text-blue-400 font-mono text-sm">
                          {tx.hash.substring(0, 12)}...
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <div className="text-gray-300 font-mono">
                            {tx.from.substring(0, 8)}...
                          </div>
                          <div className="text-gray-500">→ {tx.to.substring(0, 8)}...</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-white font-medium">{tx.value} ETH</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`font-bold ${getRiskColor(tx.riskScore)}`}>
                          {tx.riskScore.toFixed(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {tx.flagged ? (
                          <div>
                            <span className={`px-2 py-1 rounded text-xs ${getRiskBadge(tx.riskScore)}`}>
                              Flagged
                            </span>
                            {tx.reason && (
                              <div className="text-xs text-gray-400 mt-1">{tx.reason}</div>
                            )}
                          </div>
                        ) : (
                          <span className="px-2 py-1 rounded text-xs bg-green-900 text-green-400">
                            Clear
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <button className="text-blue-400 hover:text-blue-300">
                          <ExternalLink size={16} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default OnChainAnalysis;