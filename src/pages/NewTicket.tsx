import { Layout } from '@/components/Layout';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { catalog, awsAccounts, adGroups, psets } from '@/data/mockData';
import { ArrowLeft, ArrowRight, Check, AlertTriangle, Info, AlertOctagon, Clock, Shield } from 'lucide-react';

const spring = { type: 'spring' as const, duration: 0.4, bounce: 0 };

const steps = [
  { label: 'Contexto', number: 1 },
  { label: 'Escopo Técnico', number: 2 },
  { label: 'Segurança', number: 3 },
  { label: 'Aprovação', number: 4 },
  { label: 'Revisão', number: 5 },
];

function FormField({ label, required, help, children, error }: { label: string; required?: boolean; help?: string; children: React.ReactNode; error?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium flex items-center gap-1">
        {label}
        {required && <span className="text-destructive">*</span>}
        {help && (
          <span className="group relative">
            <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-foreground text-primary-foreground text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 max-w-xs text-center">
              {help}
            </span>
          </span>
        )}
      </label>
      {children}
      {error && <p className="text-xs text-destructive flex items-center gap-1"><AlertTriangle className="w-3 h-3" />{error}</p>}
    </div>
  );
}

function InputField({ placeholder, value, type = 'text' }: { placeholder?: string; value?: string; type?: string }) {
  return <input type={type} placeholder={placeholder} defaultValue={value || ''} className="input-field w-full" />;
}

function SelectField({ options, placeholder }: { options: string[]; placeholder?: string }) {
  return (
    <select className="input-field w-full">
      <option value="">{placeholder || 'Selecione...'}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function TextArea({ placeholder, rows = 3 }: { placeholder?: string; rows?: number }) {
  return <textarea placeholder={placeholder} rows={rows} className="input-field w-full resize-none" />;
}

export default function NewTicket() {
  const { categoryId, requestTypeId } = useParams();
  const navigate = useNavigate();
  const category = catalog.find(c => c.id === categoryId);
  const requestType = category?.requestTypes.find(rt => rt.id === requestTypeId);
  const [currentStep, setCurrentStep] = useState(1);

  if (!category) return <Layout><p>Categoria não encontrada.</p></Layout>;

  const isBreakingGlass = category.type === 'breaking-glass';
  const isAudit = category.type === 'audit';

  const handleSubmit = () => navigate(`/tickets/AWS-REQ-84721`);

  return (
    <Layout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link to={`/catalog/${categoryId}`} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </Link>
          <div>
            <h1>Nova Solicitação</h1>
            <p className="text-sm text-muted-foreground">{category.name}{requestType ? ` · ${requestType.name}` : ''}</p>
          </div>
        </div>

        {/* Emergency banner */}
        {isBreakingGlass && (
          <div className="bg-destructive/5 border-2 border-destructive/20 rounded-xl p-4 flex items-start gap-3">
            <AlertOctagon className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-destructive">Acesso Emergencial — Breaking Glass</p>
              <p className="text-xs text-muted-foreground mt-0.5">Requer incidente registrado, justificativa, aprovação reforçada e revisão pós-uso obrigatória.</p>
            </div>
          </div>
        )}

        {/* Stepper */}
        <div className="bg-card rounded-xl p-4 card-shadow">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold tabular-nums transition-colors ${
                    step.number < currentStep ? 'bg-success text-primary-foreground' :
                    step.number === currentStep ? (isBreakingGlass ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground') :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {step.number < currentStep ? <Check className="w-4 h-4" /> : step.number}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${step.number === currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-3 rounded-full transition-colors ${step.number < currentStep ? 'bg-success' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={spring}
            className="bg-card rounded-xl p-6 card-shadow"
          >
            {/* Step 1: Context */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <h2>Contexto da Solicitação</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <FormField label="Título da Solicitação" required>
                      <InputField placeholder={isBreakingGlass ? 'Ex: Acesso emergencial admin para incidente P1 em produção' : isAudit ? 'Ex: Auditoria de permissões administrativas em contas produtivas' : 'Ex: Criação de Role para Lambda de integração com S3'} />
                    </FormField>
                  </div>
                  <FormField label="Categoria" required>
                    <InputField value={category.name} />
                  </FormField>
                  <FormField label="Tipo de Solicitação" required>
                    <SelectField options={category.requestTypes.map(rt => rt.name)} placeholder="Selecione o tipo..." />
                  </FormField>
                  <FormField label="Solicitante" required>
                    <InputField value="Ana Souza" />
                  </FormField>
                  <FormField label="E-mail" required>
                    <InputField value="ana.souza@corp.com" type="email" />
                  </FormField>
                  <FormField label="Área / Time" required>
                    <SelectField options={['Engenharia de Dados', 'SRE / Observabilidade', 'DevOps', 'Segurança', 'Arquitetura Cloud', 'Infraestrutura Cloud', 'GRC / Compliance']} />
                  </FormField>
                  <FormField label="Gestor Responsável" required>
                    <SelectField options={['Carlos Silva', 'Juliana Costa', 'Fernanda Lima', 'Roberto Nascimento', 'Ricardo Almeida']} />
                  </FormField>
                  <FormField label="Sistema / Projeto" required>
                    <InputField placeholder="Ex: Payment Gateway v3" />
                  </FormField>
                  <FormField label="Ambiente" required>
                    <SelectField options={['Desenvolvimento', 'Homologação', 'Produção']} />
                  </FormField>
                  <FormField label="Criticidade" required>
                    <SelectField options={isBreakingGlass ? ['Alta', 'Crítica'] : ['Baixa', 'Média', 'Alta', 'Crítica']} />
                  </FormField>
                  {isBreakingGlass && (
                    <FormField label="Incidente Relacionado" required help="Número do incidente registrado">
                      <InputField placeholder="INC-2024-XXXX" />
                    </FormField>
                  )}
                  <div className="md:col-span-2">
                    <FormField label={isBreakingGlass ? 'Justificativa Emergencial' : 'Justificativa de Negócio'} required help={isBreakingGlass ? 'Descreva o incidente e por que o acesso padrão não atende' : 'Descreva por que esta solicitação é necessária'}>
                      <TextArea placeholder={isBreakingGlass ? 'Descreva o incidente, impacto e por que o acesso emergencial é necessário...' : 'Descreva a justificativa de negócio...'} rows={4} />
                    </FormField>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Technical Scope */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <h2>Escopo Técnico</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Conta AWS" required>
                    <SelectField options={awsAccounts.map(a => `${a.id} (${a.name})`)} placeholder="Selecione a conta..." />
                  </FormField>
                  <FormField label="Account ID" required>
                    <InputField placeholder="123456789012" />
                  </FormField>

                  {/* Profile-specific fields */}
                  {categoryId === 'aws-profiles' && (
                    <>
                      <FormField label="Grupo AD" required help="Grupo do Active Directory a ser vinculado">
                        <SelectField options={adGroups} />
                      </FormField>
                      <FormField label="PSET Associado" required>
                        <SelectField options={psets} />
                      </FormField>
                      <FormField label="Tipo de Acesso" required>
                        <SelectField options={['Leitura', 'Operador', 'Administrador Restrito', 'Administrador', 'Customizado']} />
                      </FormField>
                      <FormField label="Usuários Iniciais Previstos">
                        <InputField placeholder="Ex: 5" type="number" />
                      </FormField>
                    </>
                  )}

                  {/* PSET-specific fields */}
                  {categoryId === 'aws-psets' && (
                    <>
                      <FormField label="Nome do PSET" required help="Formato: PSET-Finalidade-Escopo">
                        <InputField placeholder="PSET-ReadOnly-Observability" />
                      </FormField>
                      <FormField label="Policy Gerenciada" required>
                        <InputField placeholder="ReadOnlyAccess, CloudWatchReadOnlyAccess" />
                      </FormField>
                      <FormField label="Grupo AD Vinculado" required>
                        <SelectField options={adGroups} />
                      </FormField>
                      <FormField label="Sessão Máxima">
                        <SelectField options={['1 hora', '4 horas', '8 horas', '12 horas']} />
                      </FormField>
                    </>
                  )}

                  {/* Role-specific fields */}
                  {categoryId === 'aws-roles' && (
                    <>
                      <FormField label="Nome da Role" required help="Formato: servico-finalidade-role">
                        <InputField placeholder="lambda-s3-integration-role" />
                      </FormField>
                      <FormField label="Trusted Entity" required>
                        <SelectField options={['AWS Service', 'AWS Account', 'Federated', 'Web Identity']} />
                      </FormField>
                      <FormField label="Principal Confiável" required help="ARN ou identificador">
                        <InputField placeholder="arn:aws:iam::123456789012:root" />
                      </FormField>
                      <FormField label="Cross-Account?">
                        <SelectField options={['Não', 'Sim']} />
                      </FormField>
                      <div className="md:col-span-2">
                        <FormField label="Policies a Anexar" help="Nomes ou ARNs das policies">
                          <InputField placeholder="AmazonS3ReadOnlyAccess, AmazonDynamoDBReadOnlyAccess" />
                        </FormField>
                      </div>
                    </>
                  )}

                  {/* Account-specific fields */}
                  {categoryId === 'aws-accounts' && (
                    <>
                      <FormField label="Nome da Conta" required help="Formato: env-projeto">
                        <InputField placeholder="prd-payment-gateway" />
                      </FormField>
                      <FormField label="E-mail da Conta" required help="Deve ser único na organização">
                        <InputField placeholder="aws-prd-payment@corp.com" type="email" />
                      </FormField>
                      <FormField label="Business Unit" required>
                        <SelectField options={['Pagamentos', 'Data & Analytics', 'Infraestrutura', 'Segurança']} />
                      </FormField>
                      <FormField label="Classificação de Dados" required>
                        <SelectField options={['Público', 'Interno', 'Confidencial', 'Restrito']} />
                      </FormField>
                      <FormField label="Região Principal" required>
                        <SelectField options={['us-east-1', 'sa-east-1', 'eu-west-1']} />
                      </FormField>
                      <FormField label="Owner Técnico" required>
                        <InputField placeholder="ricardo.almeida@corp.com" />
                      </FormField>
                    </>
                  )}

                  {/* Audit-specific fields */}
                  {isAudit && (
                    <>
                      <div className="md:col-span-2">
                        <FormField label="Escopo da Auditoria" required help="Selecione os domínios a serem auditados">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                            {['Recursos em uso', 'Permissões de usuários', 'Grupos e perfis', 'Roles e policies', 'Acessos privilegiados', 'Aderência a baseline'].map(item => (
                              <label key={item} className="flex items-center gap-2 text-sm cursor-pointer px-3 py-2 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                                <input type="checkbox" className="w-4 h-4 rounded border-border accent-primary" />
                                {item}
                              </label>
                            ))}
                          </div>
                        </FormField>
                      </div>
                      <FormField label="Período de Referência">
                        <SelectField options={['Últimos 30 dias', 'Últimos 90 dias', 'Últimos 6 meses', 'Último ano']} />
                      </FormField>
                      <FormField label="Saída Esperada" required>
                        <SelectField options={['Relatório executivo', 'Relatório técnico', 'Inventário de recursos', 'Matriz de permissões', 'Planilha consolidada']} />
                      </FormField>
                    </>
                  )}

                  {/* Breaking Glass scope */}
                  {isBreakingGlass && (
                    <>
                      <FormField label="Tipo de Acesso" required>
                        <SelectField options={['Leitura', 'Operador', 'Administrador restrito', 'Administrador']} />
                      </FormField>
                      <FormField label="Recurso Alvo" required>
                        <InputField placeholder="Ex: KMS Key, Lambda, RDS..." />
                      </FormField>
                      <FormField label="Identidade que Receberá Acesso" required>
                        <InputField placeholder="ana.souza@corp.com" />
                      </FormField>
                      <FormField label="Duração Máxima" required>
                        <SelectField options={['30 minutos', '1 hora', '2 horas', '4 horas', '8 horas']} />
                      </FormField>
                      <div className="md:col-span-2">
                        <FormField label="Ações Pretendidas" required help="Liste as ações que serão realizadas">
                          <TextArea placeholder="1. Verificar policy KMS, 2. Ajustar deny rule..." />
                        </FormField>
                      </div>
                    </>
                  )}

                  <div className="md:col-span-2">
                    <FormField label="Observações Técnicas">
                      <TextArea placeholder="Informações técnicas adicionais relevantes..." />
                    </FormField>
                  </div>
                </div>

                {/* Production warning */}
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-warning">Ambiente de Produção</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Solicitações em produção exigem aprovação adicional de Segurança Cloud e, quando aplicável, Permission Boundary obrigatória.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Security */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <h2>Segurança e Controle</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <FormField label="Justificativa de Menor Privilégio" required help="Explique como esta solicitação segue o princípio do menor privilégio">
                      <TextArea placeholder="Descreva como as permissões solicitadas são as mínimas necessárias..." rows={3} />
                    </FormField>
                  </div>
                  <FormField label="Necessidade" required>
                    <SelectField options={isBreakingGlass ? ['Temporária'] : ['Permanente', 'Temporária']} />
                  </FormField>
                  <FormField label="Prazo de Validade" help={isBreakingGlass ? 'Obrigatório para acesso emergencial' : 'Obrigatório se temporário'}>
                    <InputField type="date" />
                  </FormField>
                  <FormField label="Classificação de Risco" required>
                    <SelectField options={isBreakingGlass ? ['Alto', 'Crítico'] : ['Baixo', 'Médio', 'Alto', 'Crítico']} />
                  </FormField>
                  <FormField label="Impacto em Produção">
                    <SelectField options={['Nenhum', 'Baixo', 'Moderado', 'Alto', 'Crítico']} />
                  </FormField>

                  {isBreakingGlass && (
                    <>
                      <FormField label="Revogação Automática" required>
                        <SelectField options={['Sim — automática no prazo', 'Não — revogação manual']} />
                      </FormField>
                      <FormField label="Registro de Sessão" required>
                        <SelectField options={['Sim', 'Não']} />
                      </FormField>
                      <FormField label="Responsável pela Revisão Posterior" required>
                        <InputField placeholder="roberto.nascimento@corp.com" />
                      </FormField>
                    </>
                  )}

                  <div className="md:col-span-2">
                    <FormField label="Evidência ou Documento de Suporte">
                      <div className={`border-2 border-dashed rounded-xl p-6 text-center ${isBreakingGlass ? 'border-destructive/20 bg-destructive/5' : 'border-border'}`}>
                        <p className="text-sm text-muted-foreground">{isBreakingGlass ? 'Anexe evidência do incidente' : 'Arraste arquivos ou clique para selecionar'}</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF, JSON, PNG, XLSX até 10MB</p>
                      </div>
                    </FormField>
                  </div>
                </div>

                {isBreakingGlass && (
                  <div className="bg-destructive/5 border-2 border-destructive/20 rounded-lg p-4 flex items-start gap-3">
                    <Shield className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-destructive">Trilha de Auditoria Obrigatória</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Todo acesso emergencial é registrado, monitorado e revisado após o uso. Desvios de finalidade serão escalonados.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Approval */}
            {currentStep === 4 && (
              <div className="space-y-5">
                <h2>Aprovação e Conformidade</h2>
                <div className="bg-info/5 border border-info/10 rounded-xl p-4">
                  <h3 className="mb-3 flex items-center gap-2">
                    <Check className="w-4 h-4 text-info" /> {isBreakingGlass ? 'Cadeia de Aprovação Emergencial' : 'Aprovações Requeridas'}
                  </h3>
                  <div className="space-y-2">
                    {category.approvals.map((a, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold tabular-nums ${isBreakingGlass ? 'bg-destructive/10 text-destructive' : 'bg-info/10 text-info'}`}>{i + 1}</span>
                        <span>{a}</span>
                        <span className="ml-auto text-xs text-muted-foreground">Pendente</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField label="Validação Prévia">
                    <div className="space-y-2">
                      {category.validations.slice(0, 4).map((v, i) => (
                        <label key={i} className="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 rounded border-border accent-primary" defaultChecked />
                          {v}
                        </label>
                      ))}
                    </div>
                  </FormField>
                  <FormField label="Pendências Identificadas">
                    <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                      Nenhuma pendência identificada até o momento.
                    </div>
                  </FormField>
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <div className="space-y-5">
                <h2>{isBreakingGlass ? 'Revisão Final — Breaking Glass' : 'Revisão Final'}</h2>

                {isBreakingGlass && (
                  <div className="bg-destructive/5 border-2 border-destructive/20 rounded-xl p-4 flex items-start gap-3">
                    <AlertOctagon className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-destructive">Confirme todos os dados antes de enviar</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Este acesso será auditado e revisado obrigatoriamente após o uso.</p>
                    </div>
                  </div>
                )}

                {[
                  { title: 'Contexto', items: [
                    ['Categoria', category.name],
                    ['Tipo', requestType?.name || '—'],
                    ['Solicitante', 'Ana Souza'],
                    ['Ambiente', 'Produção'],
                    ['Criticidade', isBreakingGlass ? 'Crítica' : 'Alta'],
                    ...(isBreakingGlass ? [['Incidente', 'INC-2024-XXXX']] : []),
                  ]},
                  { title: 'Escopo Técnico', items: [
                    ['Conta AWS', '123456789012 (prd-payment-gateway)'],
                    ...(isBreakingGlass ? [['Tipo de Acesso', 'Administrador'], ['Duração', '2 horas'], ['Revogação', 'Automática']] : []),
                    ...(isAudit ? [['Escopo', 'Permissões de usuários, Acessos privilegiados'], ['Período', 'Últimos 90 dias']] : []),
                  ]},
                  { title: 'Segurança', items: [
                    ['Risco', isBreakingGlass ? 'Crítico' : 'Alto'],
                    ['Menor Privilégio', isBreakingGlass ? 'Exceção emergencial' : 'Justificado'],
                    ...(isBreakingGlass ? [['Revisão Pós-Uso', 'Obrigatória'], ['Trilha de Auditoria', 'Ativa']] : []),
                  ]},
                ].map((section, si) => (
                  <div key={si} className="rounded-xl border border-border p-4">
                    <h3 className="mb-3">{section.title}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {section.items.map(([label, value], i) => (
                        <div key={i} className="flex justify-between text-sm py-1">
                          <span className="text-muted-foreground">{label}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="rounded-xl border border-border p-4">
                  <h3 className="mb-3">Aprovações Requeridas</h3>
                  {category.approvals.map((a, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm py-1.5">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isBreakingGlass ? 'bg-destructive/10 text-destructive' : 'bg-info/10 text-info'}`}>{i + 1}</span>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>

                <div className={`rounded-xl border${isBreakingGlass ? '-2 border-destructive/20' : ' border-border'} p-4`}>
                  <h3 className="mb-3">{isBreakingGlass ? 'Checklist — Breaking Glass' : 'Checklist de Conformidade'}</h3>
                  <div className="space-y-2">
                    {(isBreakingGlass ? [
                      { ok: true, text: 'Justificativa emergencial preenchida' },
                      { ok: true, text: 'Incidente associado registrado' },
                      { ok: true, text: 'Duração máxima definida' },
                      { ok: true, text: 'Revogação automática configurada' },
                      { ok: true, text: 'Responsável pela revisão definido' },
                      { ok: false, text: 'Ambiente de produção — aprovação reforçada ativada' },
                    ] : [
                      { ok: true, text: 'Justificativa de negócio preenchida' },
                      { ok: true, text: 'Escopo técnico definido' },
                      { ok: true, text: 'Menor privilégio justificado' },
                      { ok: true, text: 'Conta AWS selecionada' },
                      { ok: false, text: 'Aprovação pendente — será encaminhada após envio' },
                    ]).map((item, i) => (
                      <div key={i} className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg ${item.ok ? 'bg-success/5 border border-success/10' : isBreakingGlass ? 'bg-destructive/5 border border-destructive/10' : 'bg-warning/5 border border-warning/10'}`}>
                        {item.ok ? <Check className="w-4 h-4 text-success" /> : isBreakingGlass ? <AlertOctagon className="w-4 h-4 text-destructive" /> : <AlertTriangle className="w-4 h-4 text-warning" />}
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm font-medium hover:bg-muted/80 transition-colors flex items-center gap-2"
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4" /> Anterior
          </button>
          {currentStep < 5 ? (
            <button
              onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-opacity flex items-center gap-2 ${isBreakingGlass ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'}`}
            >
              Próximo <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-opacity ${isBreakingGlass ? 'bg-destructive text-destructive-foreground' : 'bg-primary text-primary-foreground'}`}
            >
              {isBreakingGlass ? 'Solicitar Acesso Emergencial' : isAudit ? 'Solicitar Auditoria' : 'Enviar Solicitação'}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
