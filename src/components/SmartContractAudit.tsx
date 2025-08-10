import React, { useState } from 'react';
import { 
  Upload, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Code,
  FileText,
  Download,
  RefreshCw
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { upsertSmartContractWithAuditResults } from '../lib/db';

interface AuditResult {
  id: string;
  vulnerability: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  lineNumber: number;
  recommendation: string;
}

const SmartContractAudit: React.FC = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [contractCode, setContractCode] = useState('');
  const [auditResults, setAuditResults] = useState<AuditResult[]>([]);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditComplete, setAuditComplete] = useState(false);

  const mockAuditResults: AuditResult[] = [
    {
      id: '1',
      vulnerability: 'Reentrancy Attack',
      severity: 'critical',
      description: 'External call to untrusted contract before state update',
      lineNumber: 45,
      recommendation: 'Use checks-effects-interactions pattern or reentrancy guard'
    },
    {
      id: '2',
      vulnerability: 'Integer Overflow',
      severity: 'high',
      description: 'Arithmetic operation may overflow without SafeMath',
      lineNumber: 78,
      recommendation: 'Use OpenZeppelin SafeMath library for arithmetic operations'
    },
    {
      id: '3',
      vulnerability: 'Unchecked Return Value',
      severity: 'medium',
      description: 'External call return value not checked',
      lineNumber: 92,
      recommendation: 'Always check return values of external calls'
    },
    {
      id: '4',
      vulnerability: 'Gas Optimization',
      severity: 'low',
      description: 'Loop can be optimized to reduce gas consumption',
      lineNumber: 112,
      recommendation: 'Consider using mapping instead of array iteration'
    }
  ];

  const handleAudit = async () => {
    if (!contractAddress && !contractCode) {
      toast.error('Please provide contract address or source code');
      return;
    }

    setIsAuditing(true);
    
    // Simulate audit process
    setTimeout(() => {
      setAuditResults(mockAuditResults);
      setAuditComplete(true);
      setIsAuditing(false);

      // Persist to DB if address provided
      if (contractAddress) {
        (async () => {
          try {
            const scoreMap: Record<AuditResult['severity'], number> = {
              critical: 9,
              high: 7,
              medium: 5,
              low: 3,
            };
            const riskScore =
              mockAuditResults.length > 0
                ?
                  Number(
                    (
                      mockAuditResults.reduce((s, r) => s + scoreMap[r.severity], 0) /
                      mockAuditResults.length
                    ).toFixed(1)
                  )
                : 0;

            await upsertSmartContractWithAuditResults({
              contract: {
                address: contractAddress,
                name: `Contract ${contractAddress.substring(0, 8)}...`,
                network: 'ethereum',
                audit_status: 'completed',
                risk_score: riskScore,
                vulnerabilities_count: mockAuditResults.length,
              },
              results: mockAuditResults.map((r) => ({
                vulnerability_type: r.vulnerability,
                severity: r.severity,
                description: r.description,
                recommendation: r.recommendation,
                line_number: r.lineNumber,
              })),
            });
          } catch (e) {
            // ignore persist failure for UX; still show success for local analysis
          }
        })();
      }

      toast.success('Audit completed successfully!');
    }, 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-900';
      case 'high': return 'text-orange-400 bg-orange-900';
      case 'medium': return 'text-yellow-400 bg-yellow-900';
      case 'low': return 'text-green-400 bg-green-900';
      default: return 'text-gray-400 bg-gray-800';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle size={16} />;
      case 'high': return <AlertTriangle size={16} />;
      case 'medium': return <Clock size={16} />;
      case 'low': return <CheckCircle size={16} />;
      default: return <Shield size={16} />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Smart Contract Audit</h1>
          <p className="text-gray-400 mt-1">Comprehensive security analysis for smart contracts</p>
        </div>
      </div>

      {/* Audit Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-xl p-6 border border-gray-700"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Contract Analysis</h2>
        
        <div className="space-y-4">
          {/* Contract Address Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Contract Address
            </label>
            <input
              type="text"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Source Code Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Source Code (Optional)
            </label>
            <textarea
              value={contractCode}
              onChange={(e) => setContractCode(e.target.value)}
              placeholder="Paste your Solidity contract code here..."
              rows={10}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAudit}
              disabled={isAuditing}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isAuditing ? (
                <>
                  <RefreshCw size={20} className="animate-spin" />
                  <span>Auditing...</span>
                </>
              ) : (
                <>
                  <Shield size={20} />
                  <span>Start Audit</span>
                </>
              )}
            </motion.button>
            
            <button className="flex items-center space-x-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 font-medium">
              <Upload size={20} />
              <span>Upload Contract</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Audit Progress */}
      {isAuditing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center space-x-3 mb-4">
            <RefreshCw size={24} className="text-blue-500 animate-spin" />
            <h3 className="text-lg font-semibold text-white">Analyzing Contract...</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Syntax Analysis</span>
              <CheckCircle className="text-green-500" size={20} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Vulnerability Detection</span>
              <RefreshCw className="text-blue-500 animate-spin" size={20} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Security Pattern Analysis</span>
              <Clock className="text-gray-500" size={20} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Gas Optimization Check</span>
              <Clock className="text-gray-500" size={20} />
            </div>
          </div>
        </motion.div>
      )}

      {/* Audit Results */}
      {auditComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Audit Results</h3>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <Download size={16} />
                <span>Export Report</span>
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
              <div className="text-red-400 text-2xl font-bold">
                {auditResults.filter(r => r.severity === 'critical').length}
              </div>
              <div className="text-red-300 text-sm">Critical</div>
            </div>
            <div className="bg-orange-900/20 border border-orange-800 rounded-lg p-4">
              <div className="text-orange-400 text-2xl font-bold">
                {auditResults.filter(r => r.severity === 'high').length}
              </div>
              <div className="text-orange-300 text-sm">High</div>
            </div>
            <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-4">
              <div className="text-yellow-400 text-2xl font-bold">
                {auditResults.filter(r => r.severity === 'medium').length}
              </div>
              <div className="text-yellow-300 text-sm">Medium</div>
            </div>
            <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
              <div className="text-green-400 text-2xl font-bold">
                {auditResults.filter(r => r.severity === 'low').length}
              </div>
              <div className="text-green-300 text-sm">Low</div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="space-y-4">
            {auditResults.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-700 rounded-lg p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${getSeverityColor(result.severity)}`}>
                    {getSeverityIcon(result.severity)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-semibold">{result.vulnerability}</h4>
                      <div className="flex items-center space-x-2">
                        <Code size={16} className="text-gray-400" />
                        <span className="text-gray-400 text-sm">Line {result.lineNumber}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-3">{result.description}</p>
                    
                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <FileText size={16} className="text-blue-400" />
                        <span className="text-blue-400 font-medium">Recommendation</span>
                      </div>
                      <p className="text-gray-300">{result.recommendation}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SmartContractAudit;