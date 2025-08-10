export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface SmartContract {
  id: string;
  address: string;
  name: string;
  network: string;
  audit_status: 'pending' | 'in_progress' | 'completed' | 'failed';
  risk_score: number;
  vulnerabilities_count: number;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface AuditResult {
  id: string;
  contract_id: string;
  vulnerability_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  recommendation: string;
  line_number?: number;
  created_at: string;
}

export interface OnChainTransaction {
  id: string;
  hash: string;
  from_address: string;
  to_address: string;
  value: string;
  gas_used: string;
  gas_price: string;
  block_number: number;
  timestamp: string;
  risk_score: number;
  flagged_reason?: string;
  network: string;
  user_id: string;
}

export interface RiskAlert {
  id: string;
  type: 'contract' | 'transaction' | 'address';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  target_address: string;
  created_at: string;
  resolved: boolean;
  user_id: string;
}

export interface DashboardStats {
  total_contracts_audited: number;
  active_audits: number;
  critical_vulnerabilities: number;
  transactions_analyzed: number;
  risk_alerts: number;
  avg_risk_score: number;
}