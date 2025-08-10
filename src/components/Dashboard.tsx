import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Activity,
  Eye,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { DashboardStats } from '../types';
import { fetchDashboardStats } from '../lib/db';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    total_contracts_audited: 156,
    active_audits: 8,
    critical_vulnerabilities: 12,
    transactions_analyzed: 45230,
    risk_alerts: 23,
    avg_risk_score: 3.2
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const fresh = await fetchDashboardStats();
        if (mounted && fresh) setStats(fresh);
      } catch (err) {
        // no-op; keep default mock if error
      }
    })();
    return () => { mounted = false; };
  }, []);

  const riskTrendData = [
    { date: 'Jan', score: 2.8 },
    { date: 'Feb', score: 3.1 },
    { date: 'Mar', score: 2.9 },
    { date: 'Apr', score: 3.3 },
    { date: 'May', score: 3.0 },
    { date: 'Jun', score: 3.2 },
  ];

  const vulnerabilityData = [
    { name: 'Low', value: 45, color: '#10B981' },
    { name: 'Medium', value: 32, color: '#F59E0B' },
    { name: 'High', value: 18, color: '#F97316' },
    { name: 'Critical', value: 12, color: '#EF4444' },
  ];

  const auditActivityData = [
    { name: 'Mon', audits: 12 },
    { name: 'Tue', audits: 19 },
    { name: 'Wed', audits: 15 },
    { name: 'Thu', audits: 22 },
    { name: 'Fri', audits: 18 },
    { name: 'Sat', audits: 8 },
    { name: 'Sun', audits: 6 },
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Reentrancy Vulnerability Detected',
      contract: '0x742d35Cc6634C0532925a3b8D400B1b3DC24fa55',
      time: '2 mins ago'
    },
    {
      id: 2,
      type: 'high',
      title: 'Unusual Transaction Pattern',
      contract: '0x8ba1f109551bd432803012645hopla312213fa55',
      time: '15 mins ago'
    },
    {
      id: 3,
      type: 'medium',
      title: 'Deprecated Function Usage',
      contract: '0x123d35Cc6634C0532925a3b8D400B1b3DC24fa55',
      time: '1 hour ago'
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Security Dashboard</h1>
          <p className="text-gray-400 mt-1">Monitor blockchain security and risk metrics</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Clock size={16} />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Contracts Audited</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.total_contracts_audited}</p>
              <div className="flex items-center mt-2 text-green-400 text-sm">
                <TrendingUp size={16} className="mr-1" />
                <span>+12% this month</span>
              </div>
            </div>
            <div className="p-3 bg-blue-600 rounded-lg">
              <Shield size={24} className="text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Audits</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.active_audits}</p>
              <div className="flex items-center mt-2 text-blue-400 text-sm">
                <Activity size={16} className="mr-1" />
                <span>In progress</span>
              </div>
            </div>
            <div className="p-3 bg-orange-600 rounded-lg">
              <Clock size={24} className="text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Critical Vulnerabilities</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.critical_vulnerabilities}</p>
              <div className="flex items-center mt-2 text-red-400 text-sm">
                <AlertTriangle size={16} className="mr-1" />
                <span>Requires attention</span>
              </div>
            </div>
            <div className="p-3 bg-red-600 rounded-lg">
              <AlertTriangle size={24} className="text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Transactions Analyzed</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.transactions_analyzed.toLocaleString()}</p>
              <div className="flex items-center mt-2 text-green-400 text-sm">
                <Eye size={16} className="mr-1" />
                <span>+2.3K today</span>
              </div>
            </div>
            <div className="p-3 bg-green-600 rounded-lg">
              <Activity size={24} className="text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Trend Chart */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Risk Score Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={riskTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Vulnerability Distribution */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Vulnerability Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={vulnerabilityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {vulnerabilityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Audit Activity */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
          className="lg:col-span-2 bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Weekly Audit Activity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={auditActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }}
              />
              <Bar dataKey="audits" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Alerts */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Recent Alerts</h3>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  alert.type === 'critical' ? 'bg-red-900 text-red-400' :
                  alert.type === 'high' ? 'bg-orange-900 text-orange-400' :
                  'bg-yellow-900 text-yellow-400'
                }`}>
                  <AlertTriangle size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm">{alert.title}</p>
                  <p className="text-gray-400 text-xs truncate">{alert.contract}</p>
                  <p className="text-gray-500 text-xs">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;