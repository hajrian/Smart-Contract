import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Bell, 
  CheckCircle, 
  Clock, 
  Filter,
  Eye,
  X,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface RiskAlert {
  id: string;
  type: 'contract' | 'transaction' | 'address' | 'network';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  targetAddress: string;
  timestamp: string;
  resolved: boolean;
  evidence?: string[];
  recommendation?: string;
}

const RiskAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<RiskAlert[]>([
    {
      id: '1',
      type: 'contract',
      severity: 'critical',
      title: 'Reentrancy Attack Detected',
      description: 'Multiple recursive calls detected in smart contract execution',
      targetAddress: '0x742d35Cc6634C0532925a3b8D400B1b3DC24fa55',
      timestamp: '2025-01-27T10:30:00Z',
      resolved: false,
      evidence: [
        'External call before state change',
        'No reentrancy guard implemented',
        'Potential for fund drainage'
      ],
      recommendation: 'Immediately pause contract operations and implement reentrancy protection'
    },
    {
      id: '2',
      type: 'transaction',
      severity: 'high',
      title: 'Suspicious Large Transfer',
      description: 'Unusual high-value transaction detected from flagged address',
      targetAddress: '0x8ba1f109551bd432803012645hopa312213fa55',
      timestamp: '2025-01-27T10:15:00Z',
      resolved: false,
      evidence: [
        'Transfer amount: 500 ETH',
        'Source address flagged as high-risk',
        'Transaction timing suspicious'
      ],
      recommendation: 'Monitor receiving address and investigate transaction source'
    },
    {
      id: '3',
      type: 'address',
      severity: 'medium',
      title: 'MEV Bot Activity',
      description: 'Potential MEV (Maximum Extractable Value) bot operations detected',
      targetAddress: '0x123d35Cc6634C0532925a3b8D400B1b3DC24fa55',
      timestamp: '2025-01-27T09:45:00Z',
      resolved: true,
      evidence: [
        'Rapid transaction execution',
        'Arbitrage patterns detected',
        'Front-running behavior'
      ],
      recommendation: 'Standard MEV activity - monitor for unusual patterns'
    },
    {
      id: '4',
      type: 'network',
      severity: 'low',
      title: 'Increased Gas Price Volatility',
      description: 'Network congestion causing unusual gas price fluctuations',
      targetAddress: 'Network Wide',
      timestamp: '2025-01-27T09:00:00Z',
      resolved: false,
      evidence: [
        'Gas price variance: 300%',
        'Transaction backlog increasing',
        'Block utilization at 98%'
      ],
      recommendation: 'Consider delaying non-urgent transactions'
    }
  ]);

  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [showResolved, setShowResolved] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-900/20 border-red-800';
      case 'high': return 'text-orange-400 bg-orange-900/20 border-orange-800';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-800';
      case 'low': return 'text-green-400 bg-green-900/20 border-green-800';
      default: return 'text-gray-400 bg-gray-800 border-gray-700';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle size={20} className="text-red-400" />;
      case 'high': return <AlertTriangle size={20} className="text-orange-400" />;
      case 'medium': return <Clock size={20} className="text-yellow-400" />;
      case 'low': return <Bell size={20} className="text-green-400" />;
      default: return <AlertTriangle size={20} className="text-gray-400" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'contract': return '📄';
      case 'transaction': return '💸';
      case 'address': return '🏠';
      case 'network': return '🌐';
      default: return '⚠️';
    }
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
    toast.success('Alert marked as resolved');
  };

  const handleDeleteAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    toast.success('Alert deleted');
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filterSeverity !== 'all' && alert.severity !== filterSeverity) return false;
    if (filterType !== 'all' && alert.type !== filterType) return false;
    if (!showResolved && alert.resolved) return false;
    return true;
  });

  const unreadCount = alerts.filter(alert => !alert.resolved).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Risk Alerts</h1>
          <p className="text-gray-400 mt-1">
            Real-time security alerts and risk notifications
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-red-600 text-white text-xs rounded-full">
                {unreadCount} new
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl p-6 border border-gray-700"
      >
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <span className="text-gray-300 font-medium">Filters:</span>
          </div>
          
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="contract">Smart Contract</option>
            <option value="transaction">Transaction</option>
            <option value="address">Address</option>
            <option value="network">Network</option>
          </select>
          
          <label className="flex items-center space-x-2 text-gray-300">
            <input
              type="checkbox"
              checked={showResolved}
              onChange={(e) => setShowResolved(e.target.checked)}
              className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
            />
            <span>Show resolved</span>
          </label>
        </div>
      </motion.div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800 rounded-xl p-8 border border-gray-700 text-center"
          >
            <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No Alerts Found</h3>
            <p className="text-gray-400">All systems are operating normally</p>
          </motion.div>
        ) : (
          filteredAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl p-6 border ${getSeverityColor(alert.severity)} ${
                alert.resolved ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getSeverityIcon(alert.severity)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getTypeIcon(alert.type)}</span>
                      <h3 className="text-lg font-semibold text-white">{alert.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">
                        {new Date(alert.timestamp).toLocaleString()}
                      </span>
                      {alert.resolved && (
                        <CheckCircle size={20} className="text-green-400" />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-3">{alert.description}</p>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-sm text-gray-400">Target:</span>
                    <span className="text-sm font-mono text-blue-400">{alert.targetAddress}</span>
                    <button className="text-blue-400 hover:text-blue-300">
                      <ExternalLink size={16} />
                    </button>
                  </div>
                  
                  {alert.evidence && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Evidence:</h4>
                      <ul className="space-y-1">
                        {alert.evidence.map((item, i) => (
                          <li key={i} className="text-sm text-gray-400 flex items-center">
                            <span className="w-2 h-2 bg-red-400 rounded-full mr-2 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {alert.recommendation && (
                    <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                      <h4 className="text-sm font-medium text-blue-400 mb-2">Recommendation:</h4>
                      <p className="text-sm text-gray-300">{alert.recommendation}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3">
                    {!alert.resolved && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleResolveAlert(alert.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        <CheckCircle size={16} />
                        <span>Mark Resolved</span>
                      </motion.button>
                    )}
                    
                    <button
                      onClick={() => handleDeleteAlert(alert.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      <X size={16} />
                      <span>Delete</span>
                    </button>
                    
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
                      <Eye size={16} />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default RiskAlerts;