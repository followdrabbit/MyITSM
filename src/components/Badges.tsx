import { CategoryType } from '@/data/mockData';

export function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; dot?: string }> = {
    'Em Preenchimento': { bg: 'bg-muted', text: 'text-muted-foreground' },
    'Aguardando Aprovação': { bg: 'bg-warning/10', text: 'text-warning', dot: 'bg-warning' },
    'Aprovado': { bg: 'bg-info/10', text: 'text-info' },
    'Em Execução': { bg: 'bg-info/10', text: 'text-info', dot: 'bg-info' },
    'Concluído': { bg: 'bg-success/10', text: 'text-success' },
    'Rejeitado': { bg: 'bg-destructive/10', text: 'text-destructive' },
    'Cancelado': { bg: 'bg-muted', text: 'text-muted-foreground' },
  };
  const c = config[status] || config['Em Preenchimento'];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${c.bg} ${c.text}`}>
      {c.dot && <span className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse-dot`} />}
      {status}
    </span>
  );
}

export function CriticalityBadge({ criticality }: { criticality: string }) {
  const config: Record<string, { bg: string; text: string }> = {
    'Baixa': { bg: 'bg-success/10', text: 'text-success' },
    'Média': { bg: 'bg-warning/10', text: 'text-warning' },
    'Alta': { bg: 'bg-aws/10', text: 'text-aws' },
    'Crítica': { bg: 'bg-destructive/10', text: 'text-destructive' },
  };
  const c = config[criticality] || config['Média'];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${c.bg} ${c.text}`}>
      {criticality}
    </span>
  );
}

export function EnvironmentBadge({ env }: { env: string }) {
  const config: Record<string, { bg: string; text: string }> = {
    'Produção': { bg: 'bg-destructive/10', text: 'text-destructive' },
    'Homologação': { bg: 'bg-warning/10', text: 'text-warning' },
    'Desenvolvimento': { bg: 'bg-success/10', text: 'text-success' },
  };
  const c = config[env] || config['Desenvolvimento'];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${c.bg} ${c.text}`}>
      {env}
    </span>
  );
}

const typeConfig: Record<CategoryType, { bg: string; text: string; label: string; border?: string }> = {
  'standard': { bg: 'bg-muted', text: 'text-muted-foreground', label: 'Padrão' },
  'audit': { bg: 'bg-info/10', text: 'text-info', label: 'Auditoria', border: 'ring-1 ring-info/20' },
  'breaking-glass': { bg: 'bg-destructive/10', text: 'text-destructive', label: 'Emergencial', border: 'ring-1 ring-destructive/20' },
};

export function TypeBadge({ type }: { type: CategoryType }) {
  const config = typeConfig[type];
  if (type === 'standard') return null;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${config.bg} ${config.text} ${config.border || ''}`}>
      {config.label}
    </span>
  );
}

export function PostReviewBadge({ status }: { status?: 'Pendente' | 'Em Análise' | 'Concluída' }) {
  if (!status) return null;
  const config: Record<string, { bg: string; text: string }> = {
    'Pendente': { bg: 'bg-warning/10', text: 'text-warning' },
    'Em Análise': { bg: 'bg-info/10', text: 'text-info' },
    'Concluída': { bg: 'bg-success/10', text: 'text-success' },
  };
  const c = config[status] || config['Pendente'];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${c.bg} ${c.text}`}>
      Revisão: {status}
    </span>
  );
}
