import { supabase } from './supabase';
import type {
  SmartContract as SmartContractType,
  AuditResult as AuditResultType,
  DashboardStats as DashboardStatsType,
  RiskAlert as RiskAlertType,
} from '../types';

type UpsertSmartContractInput = {
  address: string;
  name: string;
  network: string;
  audit_status?: SmartContractType['audit_status'];
  risk_score?: number;
  vulnerabilities_count?: number;
};

type NewAuditResultInput = {
  vulnerability_type: string;
  severity: AuditResultType['severity'];
  description: string;
  recommendation: string;
  line_number?: number;
};

async function getCurrentUserId(): Promise<string | null> {
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

export async function upsertSmartContract(
  input: UpsertSmartContractInput
): Promise<SmartContractType | null> {
  const userId = await getCurrentUserId();
  if (!userId) return null;

  const row = {
    address: input.address,
    name: input.name,
    network: input.network,
    audit_status: input.audit_status ?? 'pending',
    risk_score: input.risk_score ?? 0,
    vulnerabilities_count: input.vulnerabilities_count ?? 0,
    user_id: userId,
  };

  const { data, error } = await supabase
    .from('smart_contracts')
    .upsert(row, { onConflict: 'user_id,network,address' })
    .select('*')
    .single();

  if (error) {
    console.error('upsertSmartContract error', error);
    return null;
  }
  return (data as unknown) as SmartContractType;
}

export async function insertAuditResults(
  contractId: string,
  results: NewAuditResultInput[]
): Promise<AuditResultType[] | null> {
  if (results.length === 0) return [];
  const rows = results.map((r) => ({ ...r, contract_id: contractId }));
  const { data, error } = await supabase
    .from('audit_results')
    .insert(rows)
    .select('*');
  if (error) {
    console.error('insertAuditResults error', error);
    return null;
  }
  return (data as unknown) as AuditResultType[];
}

export async function upsertSmartContractWithAuditResults(params: {
  contract: UpsertSmartContractInput;
  results: NewAuditResultInput[];
}): Promise<{ contract: SmartContractType | null; results: AuditResultType[] | null }> {
  const contract = await upsertSmartContract(params.contract);
  if (!contract) return { contract: null, results: null };
  const results = await insertAuditResults(contract.id, params.results);
  return { contract, results };
}

export async function fetchDashboardStats(): Promise<DashboardStatsType> {
  // total_contracts_audited
  const completed = await supabase
    .from('smart_contracts')
    .select('id', { count: 'exact', head: true })
    .eq('audit_status', 'completed');
  const total_contracts_audited = completed.count ?? 0;

  // active_audits (pending or in_progress)
  const active = await supabase
    .from('smart_contracts')
    .select('id', { count: 'exact', head: true })
    .or('audit_status.eq.pending,audit_status.eq.in_progress');
  const active_audits = active.count ?? 0;

  // critical_vulnerabilities
  const critical = await supabase
    .from('audit_results')
    .select('id', { count: 'exact', head: true })
    .eq('severity', 'critical');
  const critical_vulnerabilities = critical.count ?? 0;

  // transactions_analyzed
  const tx = await supabase
    .from('on_chain_transactions')
    .select('id', { count: 'exact', head: true });
  const transactions_analyzed = tx.count ?? 0;

  // risk_alerts (unresolved)
  const alerts = await supabase
    .from('risk_alerts')
    .select('id', { count: 'exact', head: true })
    .eq('resolved', false);
  const risk_alerts = alerts.count ?? 0;

  // avg_risk_score
  const { data: riskRows, error: riskErr } = await supabase
    .from('smart_contracts')
    .select('risk_score');
  const scores: number[] = (riskRows ?? []).map((r: { risk_score: number | string | null }) => Number(r.risk_score ?? 0));
  const avg_risk_score = !riskErr && scores.length > 0
    ? scores.reduce((sum, v) => sum + v, 0) / scores.length
    : 0;

  return {
    total_contracts_audited,
    active_audits,
    critical_vulnerabilities,
    transactions_analyzed,
    risk_alerts,
    avg_risk_score: Number(avg_risk_score.toFixed(1)),
  };
}

// Risk Alerts CRUD
export type NewRiskAlertInput = {
  type: RiskAlertType['type'];
  severity: RiskAlertType['severity'];
  title: string;
  description: string;
  target_address: string;
  resolved?: boolean;
};

export async function fetchRiskAlerts(): Promise<RiskAlertType[]> {
  const { data, error } = await supabase
    .from('risk_alerts')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('fetchRiskAlerts error', error);
    return [];
  }
  return (data as unknown) as RiskAlertType[];
}

export async function createRiskAlert(input: NewRiskAlertInput): Promise<RiskAlertType | null> {
  const { data, error } = await supabase
    .from('risk_alerts')
    .insert({
      type: input.type,
      severity: input.severity,
      title: input.title,
      description: input.description,
      target_address: input.target_address,
      resolved: input.resolved ?? false,
    })
    .select('*')
    .single();
  if (error) {
    console.error('createRiskAlert error', error);
    return null;
  }
  return (data as unknown) as RiskAlertType;
}

export async function updateRiskAlertResolved(id: string, resolved: boolean): Promise<boolean> {
  const { error } = await supabase
    .from('risk_alerts')
    .update({ resolved })
    .eq('id', id);
  if (error) {
    console.error('updateRiskAlertResolved error', error);
    return false;
  }
  return true;
}

export async function deleteRiskAlert(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('risk_alerts')
    .delete()
    .eq('id', id);
  if (error) {
    console.error('deleteRiskAlert error', error);
    return false;
  }
  return true;
}


