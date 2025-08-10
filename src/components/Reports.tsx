import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp,
  Shield,
  AlertTriangle,
  BarChart3,
  Filter,
  Eye
} from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Report {
  id: string;
  title: string;
  type: 'audit' | 'analysis' | 'summary';
  date: string;
  status: 'completed' | 'pending' | 'draft';
  size: string;
  contracts: number;
  vulnerabilities: number;
}

const Reports: React.FC = () => {
  const [reports] = useState<Report[]>([
    {
      id: '1',
      title: 'Q1 2025 Security Audit Summary',
      type: 'summary',
      date: '2025-01-25',
      status: 'completed',
      size: '2.4 MB',
      contracts: 45,
      vulnerabilities: 23
    },
    {
      id: '2',
      title: 'DeFi Protocol Audit Report',
      type: 'audit',
      date: '2025-01-22',
      status: 'completed',
      size: '1.8 MB',
      contracts: 12,
      vulnerabilities: 8
    },
    {
      id: '3',
      title: 'On-Chain Analysis - January 2025',
      type: 'analysis',
      date: '2025-01-20',
      status: 'completed',
      size: '3.1 MB',
      contracts: 78,
      vulnerabilities: 34
    },
    {
      id: '4',
      title: 'Weekly Security Report',
      type: 'summary',
      date: '2025-01-18',
      status: 'pending',
      size: '1.2 MB',
      contracts: 23,
      vulnerabilities: 12
    }
  ]);

  const monthlyData = [
    { month: 'Sep', audits: 32, vulnerabilities: 18 },
    { month: 'Oct', audits: 45, vulnerabilities: 23 },
    { month: 'Nov', audits: 38, vulnerabilities: 15 },
    { month: 'Dec', audits: 52, vulnerabilities: 28 },
    { month: 'Jan', audits: 67, vulnerabilities: 34 }
  ];

  const severityData = [
    { name: 'Critical', value: 12, color: '#EF4444' },
    { name: 'High', value: 23, color: '#F97316' },
    { name: 'Medium', value: 45, color: '#F59E0B' },
    { name: 'Low', value: 67, color: '#10B981' }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'audit': return <Shield size={20} className="text-blue-400" />;
      case 'analysis': return <BarChart3 size={20} className="text-green-400" />;
      case 'summary': return <FileText size={20} className="text-purple-400" />;
      default: return <FileText size={20} className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-900 text-green-400';
      case 'pending': return 'bg-yellow-900 text-yellow-400';
      case 'draft': return 'bg-gray-700 text-gray-400';
      default: return 'bg-gray-700 text-gray-400';
    }
  };

  const generateReport = () => {
    // Simulate report generation
    setTimeout(() => {
      const blob = new Blob(['Sample Report Content'], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'security-report.pdf';
      a.click();
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Reports & Analytics</h1>
          <p className="text-gray-400 mt-1">Comprehensive security reports and insights</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={generateReport}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          <Download size={20} />
          <span>Generate Report</span>
        </motion.button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Reports</p>
              <p className="text-3xl font-bold text-white">156</p>
              <div className="flex items-center mt-2 text-green-400 text-sm">
                <TrendingUp size={16} className="mr-1" />
                <span>+12 this month</span>
              </div>
            </div>
            <div className="p-3 bg-blue-600 rounded-lg">
              <FileText size={24} className="text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Audits Completed</p>
              <p className="text-3xl font-bold text-white">89</p>
              <div className="flex items-center mt-2 text-blue-400 text-sm">
                <Shield size={16} className="mr-1" />
                <span>This quarter</span>
              </div>
            </div>
            <div className="p-3 bg-green-600 rounded-lg">
              <Shield size={24} className="text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Vulnerabilities Found</p>
              <p className="text-3xl font-bold text-white">147</p>
              <div className="flex items-center mt-2 text-red-400 text-sm">
                <AlertTriangle size={16} className="mr-1" />
                <span>23 critical</span>
              </div>
            </div>
            <div className="p-3 bg-red-600 rounded-lg">
              <AlertTriangle size={24} className="text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg Resolution Time</p>
              <p className="text-3xl font-bold text-white">2.4</p>
              <div className="flex items-center mt-2 text-green-400 text-sm">
                <Calendar size={16} className="mr-1" />
                <span>days</span>
              </div>
            </div>
            <div className="p-3 bg-purple-600 rounded-lg">
              <Calendar size={24} className="text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Monthly Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }}
              />
              <Bar dataKey="audits" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Audits" />
              <Bar dataKey="vulnerabilities" fill="#EF4444" radius={[4, 4, 0, 0]} name="Vulnerabilities" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Severity Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Vulnerability Severity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={severityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {severityData.map((entry, index) => (
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

      {/* Reports List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gray-800 rounded-xl p-6 border border-gray-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Recent Reports</h3>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600">
              <Filter size={16} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-600 rounded-lg">
                  {getTypeIcon(report.type)}
                </div>
                
                <div>
                  <h4 className="text-white font-medium">{report.title}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-gray-400 text-sm">
                      {new Date(report.date).toLocaleDateString()}
                    </span>
                    <span className="text-gray-400 text-sm">{report.size}</span>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-right text-sm">
                  <div className="text-gray-400">Contracts: <span className="text-white">{report.contracts}</span></div>
                  <div className="text-gray-400">Issues: <span className="text-white">{report.vulnerabilities}</span></div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-400 hover:text-white"
                  >
                    <Eye size={18} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-400 hover:text-white"
                  >
                    <Download size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Reports;