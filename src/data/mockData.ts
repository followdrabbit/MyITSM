// ============ CATALOG STRUCTURE ============
export type CategoryType = 'standard' | 'audit' | 'breaking-glass';

export interface RequestType {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface MacroCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: CategoryType;
  criticality: 'Baixa' | 'Média' | 'Alta' | 'Crítica';
  sla: string;
  requestTypes: RequestType[];
  prerequisites: string[];
  documents: string[];
  validations: string[];
  approvals: string[];
  whenToUse: string;
  relatedExamples: string[];
}

export const catalog: MacroCategory[] = [
  // 1. Contas AWS
  {
    id: 'aws-accounts',
    name: 'Contas AWS',
    description: 'Provisionamento, configuração e onboarding de novas contas AWS na organização corporativa.',
    icon: 'Building2',
    type: 'standard',
    criticality: 'Crítica',
    sla: '5 dias úteis',
    requestTypes: [
      { id: 'account-create', name: 'Criação de conta AWS', description: 'Nova conta dentro da AWS Organization com baseline corporativa.', icon: 'Plus' },
      { id: 'account-config', name: 'Ajuste de configuração de conta', description: 'Alteração de parâmetros iniciais, guardrails ou configurações de rede.', icon: 'Settings' },
      { id: 'account-baseline', name: 'Inclusão de baseline', description: 'Aplicação de baseline corporativa em conta existente.', icon: 'ShieldCheck' },
      { id: 'account-access', name: 'Provisionamento de acessos padrão', description: 'Criação de acessos iniciais para equipe técnica da nova conta.', icon: 'Users' },
    ],
    prerequisites: ['Aprovação executiva', 'Centro de custo definido', 'Owner técnico designado'],
    documents: ['Business case', 'Classificação de dados', 'Plano de compliance'],
    validations: ['E-mail único na organização', 'Nome padronizado (env-projeto)', 'Owner técnico e executivo definidos', 'Baseline obrigatória', 'Centro de custo válido'],
    approvals: ['Gestor solicitante', 'Arquiteto Cloud', 'Segurança Cloud', 'Governança Cloud'],
    whenToUse: 'Quando um novo projeto, sistema ou workload precisar de isolamento em conta AWS dedicada dentro da organização.',
    relatedExamples: ['Conta produtiva para sistema de pagamentos (PCI-DSS)', 'Conta sandbox para equipe de dados'],
  },
  // 2. Perfis e Grupos Corporativos
  {
    id: 'aws-profiles',
    name: 'Perfis e Grupos Corporativos',
    description: 'Criação e gestão de perfis corporativos integrando Active Directory, AWS Identity Center, PSETs e contas alvo.',
    icon: 'Users',
    type: 'standard',
    criticality: 'Alta',
    sla: '72 horas úteis',
    requestTypes: [
      { id: 'profile-create', name: 'Criação de perfil corporativo', description: 'Novo perfil integrando grupo AD, PSET e contas AWS.', icon: 'UserPlus' },
      { id: 'profile-link-ad', name: 'Vinculação de grupo AD a perfil AWS', description: 'Associar grupo do Active Directory a um perfil existente.', icon: 'Link' },
      { id: 'profile-adjust', name: 'Ajuste de perfil existente', description: 'Alterar escopo, contas ou permissões de um perfil ativo.', icon: 'Edit' },
      { id: 'profile-add-accounts', name: 'Inclusão de contas em perfil', description: 'Adicionar novas contas AWS ao escopo de um perfil existente.', icon: 'FolderPlus' },
      { id: 'profile-review', name: 'Revisão de perfil corporativo', description: 'Revisão periódica de aderência e menor privilégio do perfil.', icon: 'Eye' },
    ],
    prerequisites: ['PSET existente ou em criação simultânea', 'Grupo AD definido', 'Conta(s) AWS definidas'],
    documents: ['Justificativa de negócio', 'Matriz de acesso pretendida'],
    validations: ['Grupo AD obrigatório', 'PSET vinculado obrigatório', 'Ao menos uma conta AWS', 'Produção exige aprovação adicional', 'Princípio do menor privilégio'],
    approvals: ['Gestor solicitante', 'Segurança Cloud', 'IAM Admin'],
    whenToUse: 'Quando precisar criar ou ajustar um perfil completo de acesso envolvendo grupo AD, PSET e contas AWS.',
    relatedExamples: ['Perfil corporativo para equipe de SRE com leitura em todas as contas produtivas', 'Perfil de administrador restrito para time de DevOps'],
  },
  // 3. PSET / Permission Set
  {
    id: 'aws-psets',
    name: 'PSET / Permission Set',
    description: 'Criação, alteração e gestão de Permission Sets no AWS IAM Identity Center.',
    icon: 'KeyRound',
    type: 'standard',
    criticality: 'Alta',
    sla: '48 horas úteis',
    requestTypes: [
      { id: 'pset-create', name: 'Criação de PSET', description: 'Novo Permission Set com policies gerenciadas ou customizadas.', icon: 'Plus' },
      { id: 'pset-alter', name: 'Alteração de PSET', description: 'Ajuste de policies, boundary ou sessão de um PSET existente.', icon: 'Edit' },
      { id: 'pset-associate', name: 'Associação de PSET a conta', description: 'Vincular um PSET existente a uma nova conta AWS.', icon: 'Link' },
      { id: 'pset-review', name: 'Revisão de PSET', description: 'Revisão periódica de aderência ao menor privilégio.', icon: 'Eye' },
      { id: 'pset-temp', name: 'PSET temporário', description: 'Permission Set com prazo de validade definido.', icon: 'Clock' },
    ],
    prerequisites: ['Identity Center configurado', 'Grupo AD identificado'],
    documents: ['Justificativa técnica', 'Lista de policies pretendidas'],
    validations: ['Ao menos uma policy obrigatória', 'Permission boundary em produção', 'Grupo AD vinculado obrigatório', 'Session duration definida'],
    approvals: ['Gestor solicitante', 'Segurança Cloud', 'IAM Admin'],
    whenToUse: 'Para criar perfis de permissão padronizados atribuídos via AWS IAM Identity Center.',
    relatedExamples: ['PSET ReadOnly para time de observabilidade', 'PSET PowerUser para equipe de DevOps'],
  },
  // 4. Roles e Acessos Técnicos
  {
    id: 'aws-roles',
    name: 'Roles e Acessos Técnicos',
    description: 'Criação e gestão de IAM Roles para serviços, cross-account, federação e workloads técnicas.',
    icon: 'ShieldCheck',
    type: 'standard',
    criticality: 'Alta',
    sla: '48 horas úteis',
    requestTypes: [
      { id: 'role-create', name: 'Criação de role', description: 'Nova IAM Role para serviço, aplicação ou workload.', icon: 'Plus' },
      { id: 'role-alter', name: 'Alteração de role', description: 'Ajuste de policies, trust ou boundary de role existente.', icon: 'Edit' },
      { id: 'role-cross', name: 'Cross-account role', description: 'Role para acesso entre contas AWS da organização.', icon: 'ArrowLeftRight' },
      { id: 'role-service', name: 'Role para serviço AWS', description: 'Role assumida por serviço AWS (Lambda, ECS, EC2, etc).', icon: 'Cpu' },
      { id: 'role-review', name: 'Revisão de permissões de role', description: 'Revisão periódica de policies e trust de roles existentes.', icon: 'Eye' },
    ],
    prerequisites: ['Conta AWS ativa', 'Trusted entity definida'],
    documents: ['Justificativa de menor privilégio', 'JSON de policy customizada (se aplicável)'],
    validations: ['Nome padronizado obrigatório', 'Account ID obrigatório', 'Trusted entity obrigatória', 'Permission boundary em produção', 'Cross-account exige conta origem e destino', 'Policy JSON válido'],
    approvals: ['Gestor solicitante', 'Segurança Cloud', 'IAM Admin'],
    whenToUse: 'Quando um serviço, aplicação ou entidade precisar assumir permissões específicas via IAM Role.',
    relatedExamples: ['Role para Lambda de integração com S3', 'Role cross-account para pipeline CI/CD'],
  },
  // 5. Auditoria e Revisão
  {
    id: 'aws-audit',
    name: 'Auditoria e Revisão',
    description: 'Solicitações de auditoria, inventário, revisão de acessos e conformidade em ambientes AWS.',
    icon: 'ClipboardCheck',
    type: 'audit',
    criticality: 'Alta',
    sla: '5–7 dias úteis',
    requestTypes: [
      { id: 'audit-resources', name: 'Levantamento de recursos em uso', description: 'Inventário de EC2, S3, RDS, Lambda, KMS e demais recursos ativos.', icon: 'Search' },
      { id: 'audit-permissions', name: 'Auditoria de permissões de usuários', description: 'Revisão de grupos AD, PSETs e roles associados a identidades.', icon: 'UserCheck' },
      { id: 'audit-profiles', name: 'Auditoria de grupos, perfis e PSETs', description: 'Revisão de aderência e menor privilégio de perfis corporativos.', icon: 'Users' },
      { id: 'audit-roles', name: 'Auditoria de roles e policies', description: 'Análise de roles, trust policies e policy statements.', icon: 'ShieldCheck' },
      { id: 'audit-privileged', name: 'Auditoria de acessos privilegiados', description: 'Revisão de identidades com AdministratorAccess ou equivalente.', icon: 'ShieldAlert' },
      { id: 'audit-baseline', name: 'Auditoria de aderência a baseline', description: 'Verificação de conformidade com baseline corporativa.', icon: 'CheckSquare' },
    ],
    prerequisites: ['Conta(s) AWS alvo definidas', 'Escopo de análise claro'],
    documents: ['Escopo da auditoria', 'Justificativa e base regulatória'],
    validations: ['Ao menos um escopo obrigatório', 'Justificativa obrigatória', 'Conta AWS obrigatória', 'Escopo amplo requer aprovação extra'],
    approvals: ['Gestor solicitante', 'Cloud Audit Specialist', 'Segurança Cloud'],
    whenToUse: 'Para solicitar levantamentos, inventários e revisões de conformidade em contas e recursos AWS.',
    relatedExamples: ['Inventário de recursos em conta produtiva', 'Auditoria de permissões administrativas semestrais'],
  },
  // 6. Acesso Emergencial
  {
    id: 'aws-emergency',
    name: 'Acesso Emergencial',
    description: 'Solicitações de acesso temporário, excepcional e altamente controlado para resolução de incidentes críticos.',
    icon: 'AlertOctagon',
    type: 'breaking-glass',
    criticality: 'Crítica',
    sla: '30 min – 1 hora',
    requestTypes: [
      { id: 'bg-admin', name: 'Breaking glass administrativo', description: 'Acesso administrativo emergencial com duração máxima e auditoria completa.', icon: 'AlertOctagon' },
      { id: 'bg-readonly', name: 'Breaking glass de leitura', description: 'Acesso de leitura emergencial para investigação de incidentes.', icon: 'Eye' },
      { id: 'bg-elevation', name: 'Elevação temporária de privilégio', description: 'Concessão temporária de privilégio elevado para operadores.', icon: 'ArrowUpCircle' },
      { id: 'bg-review', name: 'Revisão pós-uso de breaking glass', description: 'Revisão obrigatória das ações realizadas durante acesso emergencial.', icon: 'ClipboardCheck' },
    ],
    prerequisites: ['Incidente registrado e ativo', 'Justificativa emergencial', 'Aprovação de segurança'],
    documents: ['Evidência do incidente', 'Plano de ação', 'Justificativa emergencial'],
    validations: ['Incidente obrigatório', 'Justificativa obrigatória', 'Conta AWS obrigatória', 'Duração máxima obrigatória', 'Revogação automática obrigatória', 'Revisão pós-uso obrigatória'],
    approvals: ['Gestor solicitante', 'Segurança Cloud', 'Incident Response', 'CISO'],
    whenToUse: 'Em caso de incidente crítico que exija atuação imediata fora dos fluxos padrão de acesso.',
    relatedExamples: ['Acesso emergencial admin para troubleshooting em produção', 'Leitura emergencial de CloudTrail para análise de incidente'],
  },
];

// ============ TICKETS ============
export type TicketStatus = 'Em Preenchimento' | 'Aguardando Aprovação' | 'Aprovado' | 'Em Execução' | 'Concluído' | 'Rejeitado' | 'Cancelado';
export type Criticality = 'Baixa' | 'Média' | 'Alta' | 'Crítica';
export type Environment = 'Desenvolvimento' | 'Homologação' | 'Produção';

export interface Ticket {
  id: string;
  title: string;
  categoryId: string;
  categoryName: string;
  requestTypeId: string;
  requestTypeName: string;
  type: CategoryType;
  requester: string;
  requesterEmail: string;
  team: string;
  manager: string;
  environment: Environment;
  criticality: Criticality;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  sla: string;
  description: string;
  justification: string;
  project: string;
  costCenter: string;
  system: string;
  accountId?: string;
  accountName?: string;
  incidentId?: string;
  breakingGlassDuration?: string;
  postReviewStatus?: 'Pendente' | 'Em Análise' | 'Concluída';
}

export const tickets: Ticket[] = [
  // STANDARD
  {
    id: 'AWS-REQ-84721', title: 'Criação de Role para Lambda de integração com S3', categoryId: 'aws-roles', categoryName: 'Roles e Acessos Técnicos', requestTypeId: 'role-create', requestTypeName: 'Criação de role', type: 'standard',
    requester: 'Ana Souza', requesterEmail: 'ana.souza@corp.com', team: 'Engenharia de Dados', manager: 'Carlos Silva', environment: 'Produção', criticality: 'Alta', status: 'Aguardando Aprovação',
    createdAt: '2024-01-15T10:30:00', updatedAt: '2024-01-15T14:22:00', sla: '48 horas úteis',
    description: 'Role necessária para função Lambda que processa arquivos de integração no bucket S3 de produção.', justification: 'Pipeline de dados crítica para reconciliação financeira diária.',
    project: 'Data Pipeline v2', costCenter: 'CC-4521', system: 'Sistema de Reconciliação', accountId: '123456789012', accountName: 'prd-payment-gateway',
  },
  {
    id: 'AWS-REQ-84722', title: 'PSET ReadOnly para time de observabilidade', categoryId: 'aws-psets', categoryName: 'PSET / Permission Set', requestTypeId: 'pset-create', requestTypeName: 'Criação de PSET', type: 'standard',
    requester: 'Bruno Mendes', requesterEmail: 'bruno.mendes@corp.com', team: 'SRE / Observabilidade', manager: 'Juliana Costa', environment: 'Produção', criticality: 'Média', status: 'Em Execução',
    createdAt: '2024-01-14T09:15:00', updatedAt: '2024-01-15T11:00:00', sla: '48 horas úteis',
    description: 'Permission Set de leitura para equipe de SRE monitorar recursos em contas de produção.', justification: 'Time de SRE precisa visibilidade em todas as contas para troubleshooting.',
    project: 'Observability Platform', costCenter: 'CC-3201', system: 'Grafana / CloudWatch',
  },
  {
    id: 'AWS-REQ-84723', title: 'Perfil corporativo para equipe de SRE com AD e PSET', categoryId: 'aws-profiles', categoryName: 'Perfis e Grupos Corporativos', requestTypeId: 'profile-create', requestTypeName: 'Criação de perfil corporativo', type: 'standard',
    requester: 'Juliana Costa', requesterEmail: 'juliana.costa@corp.com', team: 'SRE / Observabilidade', manager: 'Ricardo Almeida', environment: 'Produção', criticality: 'Alta', status: 'Aguardando Aprovação',
    createdAt: '2024-01-13T16:45:00', updatedAt: '2024-01-14T08:30:00', sla: '72 horas úteis',
    description: 'Perfil completo integrando grupo AD, PSET e contas AWS para equipe de SRE.', justification: 'Padronização de acessos da equipe de SRE em múltiplas contas.',
    project: 'IAM Governance', costCenter: 'CC-3201', system: 'AWS Identity Center',
  },
  {
    id: 'AWS-REQ-84724', title: 'Nova conta de produção para sistema de pagamentos', categoryId: 'aws-accounts', categoryName: 'Contas AWS', requestTypeId: 'account-create', requestTypeName: 'Criação de conta AWS', type: 'standard',
    requester: 'Ricardo Almeida', requesterEmail: 'ricardo.almeida@corp.com', team: 'Arquitetura Cloud', manager: 'Fernanda Lima', environment: 'Produção', criticality: 'Crítica', status: 'Aprovado',
    createdAt: '2024-01-12T11:00:00', updatedAt: '2024-01-14T16:00:00', sla: '5 dias úteis',
    description: 'Conta AWS dedicada para o novo sistema de pagamentos com isolamento completo.', justification: 'Requisito regulatório PCI-DSS exige isolamento de workloads de pagamento.',
    project: 'Payment Gateway v3', costCenter: 'CC-1001', system: 'Payment Gateway',
  },
  {
    id: 'AWS-REQ-84725', title: 'Associação de PSET SecurityAudit a contas produtivas', categoryId: 'aws-psets', categoryName: 'PSET / Permission Set', requestTypeId: 'pset-associate', requestTypeName: 'Associação de PSET a conta', type: 'standard',
    requester: 'Patrícia Gomes', requesterEmail: 'patricia.gomes@corp.com', team: 'GRC', manager: 'Fernanda Lima', environment: 'Produção', criticality: 'Média', status: 'Concluído',
    createdAt: '2024-01-11T08:00:00', updatedAt: '2024-01-12T10:00:00', sla: '48 horas úteis',
    description: 'Vincular PSET SecurityAudit a 3 contas produtivas para time de compliance.', justification: 'Time de GRC precisa acesso de auditoria padronizado.',
    project: 'SOX Compliance 2024', costCenter: 'CC-6001', system: 'AWS IAM Identity Center',
  },
  {
    id: 'AWS-REQ-84726', title: 'Role cross-account para pipeline CI/CD', categoryId: 'aws-roles', categoryName: 'Roles e Acessos Técnicos', requestTypeId: 'role-cross', requestTypeName: 'Cross-account role', type: 'standard',
    requester: 'Felipe Torres', requesterEmail: 'felipe.torres@corp.com', team: 'DevOps', manager: 'Carlos Silva', environment: 'Homologação', criticality: 'Média', status: 'Em Preenchimento',
    createdAt: '2024-01-15T13:00:00', updatedAt: '2024-01-15T13:00:00', sla: '48 horas úteis',
    description: 'Role cross-account para pipeline CI/CD acessar conta de homologação a partir da conta de shared-services.', justification: 'Automação de deploy entre contas via CodePipeline.',
    project: 'Platform Engineering', costCenter: 'CC-3001', system: 'AWS CodePipeline', accountId: '567890123456', accountName: 'prd-shared-services',
  },
  {
    id: 'AWS-REQ-84727', title: 'Ajuste de perfil corporativo — inclusão de conta de dados', categoryId: 'aws-profiles', categoryName: 'Perfis e Grupos Corporativos', requestTypeId: 'profile-add-accounts', requestTypeName: 'Inclusão de contas em perfil', type: 'standard',
    requester: 'Diego Martins', requesterEmail: 'diego.martins@corp.com', team: 'Engenharia de Dados', manager: 'Juliana Costa', environment: 'Produção', criticality: 'Alta', status: 'Rejeitado',
    createdAt: '2024-01-09T11:30:00', updatedAt: '2024-01-10T16:45:00', sla: '72 horas úteis',
    description: 'Adicionar conta prd-data-lake ao perfil corporativo de engenharia de dados.', justification: 'Equipe precisa acessar novo data lake para conformidade LGPD.',
    project: 'Data Privacy', costCenter: 'CC-6001', system: 'AWS Identity Center',
  },
  {
    id: 'AWS-REQ-84728', title: 'Role para serviço ECS — processamento de eventos', categoryId: 'aws-roles', categoryName: 'Roles e Acessos Técnicos', requestTypeId: 'role-service', requestTypeName: 'Role para serviço AWS', type: 'standard',
    requester: 'Lucas Ferreira', requesterEmail: 'lucas.ferreira@corp.com', team: 'Desenvolvimento', manager: 'Ana Souza', environment: 'Desenvolvimento', criticality: 'Média', status: 'Concluído',
    createdAt: '2024-01-10T10:00:00', updatedAt: '2024-01-11T15:00:00', sla: '48 horas úteis',
    description: 'Role para task ECS que processa eventos do SQS e grava no DynamoDB.', justification: 'Serviço de processamento de eventos precisa de permissões para SQS e DynamoDB.',
    project: 'Event Processing', costCenter: 'CC-4001', system: 'ECS / SQS / DynamoDB',
  },

  // AUDIT
  {
    id: 'AWS-AUD-90001', title: 'Levantamento de recursos em conta prd-payment-gateway', categoryId: 'aws-audit', categoryName: 'Auditoria e Revisão', requestTypeId: 'audit-resources', requestTypeName: 'Levantamento de recursos em uso', type: 'audit',
    requester: 'Roberto Nascimento', requesterEmail: 'roberto.nascimento@corp.com', team: 'SecOps', manager: 'Fernanda Lima', environment: 'Produção', criticality: 'Média', status: 'Em Execução',
    createdAt: '2024-01-16T08:00:00', updatedAt: '2024-01-17T10:00:00', sla: '5 dias úteis',
    description: 'Inventário completo de recursos ativos na conta 123456789012 incluindo EC2, S3, RDS, Lambda, IAM Roles, KMS e Security Groups.',
    justification: 'Auditoria trimestral de conformidade exigida por PCI-DSS.', project: 'Audit Q1-2024', costCenter: 'CC-6001', system: 'AWS Config / CloudTrail', accountId: '123456789012', accountName: 'prd-payment-gateway',
  },
  {
    id: 'AWS-AUD-90002', title: 'Auditoria de permissões administrativas em contas produtivas', categoryId: 'aws-audit', categoryName: 'Auditoria e Revisão', requestTypeId: 'audit-privileged', requestTypeName: 'Auditoria de acessos privilegiados', type: 'audit',
    requester: 'Patrícia Gomes', requesterEmail: 'patricia.gomes@corp.com', team: 'GRC', manager: 'Fernanda Lima', environment: 'Produção', criticality: 'Alta', status: 'Aguardando Aprovação',
    createdAt: '2024-01-17T09:00:00', updatedAt: '2024-01-17T14:00:00', sla: '7 dias úteis',
    description: 'Revisão de identidades com AdministratorAccess, roles com trust amplo e PSETs com permissões elevadas.',
    justification: 'Revisão semestral de acessos privilegiados conforme política de governança.', project: 'Access Review H1-2024', costCenter: 'CC-6001', system: 'AWS IAM / Identity Center',
  },
  {
    id: 'AWS-AUD-90003', title: 'Auditoria de perfis corporativos e PSETs', categoryId: 'aws-audit', categoryName: 'Auditoria e Revisão', requestTypeId: 'audit-profiles', requestTypeName: 'Auditoria de grupos, perfis e PSETs', type: 'audit',
    requester: 'Marcos Ribeiro', requesterEmail: 'marcos.ribeiro@corp.com', team: 'IAM', manager: 'Roberto Nascimento', environment: 'Produção', criticality: 'Alta', status: 'Concluído',
    createdAt: '2024-01-10T14:00:00', updatedAt: '2024-01-16T16:00:00', sla: '7 dias úteis',
    description: 'Revisão completa de perfis corporativos, grupos AD e PSETs vinculados com foco em aderência ao menor privilégio.',
    justification: 'Auditoria anual de governança de acessos exigida por compliance.', project: 'IAM Governance Review', costCenter: 'CC-6001', system: 'AWS Identity Center',
  },

  // BREAKING GLASS
  {
    id: 'AWS-BG-95001', title: 'Acesso emergencial admin — incidente em pipeline de pagamentos', categoryId: 'aws-emergency', categoryName: 'Acesso Emergencial', requestTypeId: 'bg-admin', requestTypeName: 'Breaking glass administrativo', type: 'breaking-glass',
    requester: 'Ana Souza', requesterEmail: 'ana.souza@corp.com', team: 'Engenharia de Dados', manager: 'Carlos Silva', environment: 'Produção', criticality: 'Crítica', status: 'Concluído',
    createdAt: '2024-01-14T02:15:00', updatedAt: '2024-01-14T06:30:00', sla: '1 hora',
    description: 'Acesso administrativo emergencial para resolver incidente crítico que paralisou processamento de transações.',
    justification: 'Incidente P1 — Falha no pipeline de pagamentos. Transações paradas desde 02:00.',
    project: 'Payment Gateway v3', costCenter: 'CC-1001', system: 'Payment Gateway', accountId: '123456789012', accountName: 'prd-payment-gateway',
    incidentId: 'INC-2024-0142', breakingGlassDuration: '2 horas', postReviewStatus: 'Concluída',
  },
  {
    id: 'AWS-BG-95002', title: 'Elevação temporária para ajuste em política KMS', categoryId: 'aws-emergency', categoryName: 'Acesso Emergencial', requestTypeId: 'bg-elevation', requestTypeName: 'Elevação temporária de privilégio', type: 'breaking-glass',
    requester: 'Diego Martins', requesterEmail: 'diego.martins@corp.com', team: 'Segurança', manager: 'Juliana Costa', environment: 'Produção', criticality: 'Crítica', status: 'Concluído',
    createdAt: '2024-01-12T22:00:00', updatedAt: '2024-01-13T01:00:00', sla: '1 hora',
    description: 'Elevação temporária para corrigir política KMS que bloqueou criptografia de dados em bucket S3 crítico.',
    justification: 'Incidente P2 — Deny explícito em KMS bloqueou escrita em bucket de dados financeiros.',
    project: 'Data Privacy', costCenter: 'CC-6001', system: 'AWS KMS', accountId: '234567890123', accountName: 'prd-data-lake',
    incidentId: 'INC-2024-0135', breakingGlassDuration: '1 hora', postReviewStatus: 'Concluída',
  },
  {
    id: 'AWS-BG-95003', title: 'Leitura emergencial de CloudTrail — análise de incidente', categoryId: 'aws-emergency', categoryName: 'Acesso Emergencial', requestTypeId: 'bg-readonly', requestTypeName: 'Breaking glass de leitura', type: 'breaking-glass',
    requester: 'Roberto Nascimento', requesterEmail: 'roberto.nascimento@corp.com', team: 'SecOps', manager: 'Fernanda Lima', environment: 'Produção', criticality: 'Alta', status: 'Aguardando Aprovação',
    createdAt: '2024-01-19T03:45:00', updatedAt: '2024-01-19T04:00:00', sla: '30 minutos',
    description: 'Acesso de leitura emergencial ao CloudTrail e CloudWatch Logs para investigação de atividade suspeita.',
    justification: 'Alerta de segurança — Atividade anômala detectada em conta de produção.',
    project: 'Security Operations', costCenter: 'CC-6001', system: 'CloudTrail / CloudWatch', accountId: '678901234567', accountName: 'prd-security-logging',
    incidentId: 'INC-2024-0201', breakingGlassDuration: '4 horas', postReviewStatus: 'Pendente',
  },
];

// ============ AWS ACCOUNTS ============
export const awsAccounts = [
  { id: '123456789012', name: 'prd-payment-gateway', env: 'Produção' as Environment },
  { id: '234567890123', name: 'prd-data-lake', env: 'Produção' as Environment },
  { id: '345678901234', name: 'hml-payment-gateway', env: 'Homologação' as Environment },
  { id: '456789012345', name: 'dev-sandbox-eng', env: 'Desenvolvimento' as Environment },
  { id: '567890123456', name: 'prd-shared-services', env: 'Produção' as Environment },
  { id: '678901234567', name: 'prd-security-logging', env: 'Produção' as Environment },
  { id: '789012345678', name: 'hml-data-analytics', env: 'Homologação' as Environment },
  { id: '890123456789', name: 'dev-ml-experiments', env: 'Desenvolvimento' as Environment },
];

export const adGroups = [
  'GRP-AWS-SRE-ReadOnly',
  'GRP-AWS-DevOps-PowerUser',
  'GRP-AWS-DataEng-Admin',
  'GRP-AWS-Security-Audit',
  'GRP-AWS-FinOps-Reader',
  'GRP-AWS-Platform-Admin',
  'GRP-AWS-Compliance-Viewer',
];

export const psets = [
  'PSET-ReadOnly-Global',
  'PSET-PowerUser-Dev',
  'PSET-Admin-Restricted',
  'PSET-SecurityAudit',
  'PSET-DataEngineer',
  'PSET-NetworkAdmin',
  'PSET-BillingViewer',
];

export const approvers = [
  { name: 'Carlos Silva', role: 'Gestor', team: 'Engenharia' },
  { name: 'Juliana Costa', role: 'Gestor', team: 'SRE' },
  { name: 'Fernanda Lima', role: 'Diretora', team: 'Tecnologia' },
  { name: 'Roberto Nascimento', role: 'Segurança Cloud', team: 'SecOps' },
  { name: 'Marcos Ribeiro', role: 'IAM Admin', team: 'IAM' },
  { name: 'Patrícia Gomes', role: 'Compliance', team: 'GRC' },
  { name: 'Ricardo Almeida', role: 'Arquiteto Cloud', team: 'Arquitetura' },
  { name: 'Eduardo Santos', role: 'Cloud Audit Specialist', team: 'Auditoria' },
  { name: 'Lúcia Mendes', role: 'Identity Governance', team: 'IAM Governance' },
  { name: 'André Costa', role: 'Incident Response', team: 'CSIRT' },
];
