import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { catalog } from '@/data/mockData';
import { CriticalityBadge, TypeBadge } from '@/components/Badges';
import { Settings, FileText, CheckSquare, ShieldCheck, Users, Edit, ToggleRight, Plus, ClipboardCheck, AlertOctagon, Clock, BookOpen } from 'lucide-react';

const spring = { type: 'spring' as const, duration: 0.4, bounce: 0 };

const adminSections = [
  { id: 'categories', label: 'Categorias', icon: FileText, count: catalog.length },
  { id: 'fields', label: 'Campos', icon: Edit, count: 96 },
  { id: 'validations', label: 'Validações', icon: CheckSquare, count: 48 },
  { id: 'approvals', label: 'Aprovações', icon: Users, count: 24 },
  { id: 'slas', label: 'SLAs', icon: Clock, count: 6 },
  { id: 'help', label: 'Mensagens de Ajuda', icon: BookOpen, count: 32 },
  { id: 'audit-config', label: 'Auditoria', icon: ClipboardCheck, count: 6 },
  { id: 'bg-config', label: 'Breaking Glass', icon: AlertOctagon, count: 5 },
];

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState('categories');

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Settings className="w-6 h-6 text-muted-foreground" />
          <div>
            <h1>Administração</h1>
            <p className="text-muted-foreground mt-0.5">Gerenciamento do catálogo AWS e configurações de governança.</p>
          </div>
        </div>

        {/* Section cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {adminSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`relative p-4 rounded-xl text-left transition-all card-shadow hover:card-shadow-hover ${
                activeSection === section.id ? 'bg-primary text-primary-foreground' : 'bg-card'
              }`}
            >
              <section.icon className="w-5 h-5 mb-2" />
              <p className="text-xs font-semibold">{section.label}</p>
              <p className={`text-lg font-bold tabular-nums ${activeSection === section.id ? '' : 'text-foreground'}`}>{section.count}</p>
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="bg-card rounded-xl card-shadow overflow-hidden"
        >
          {activeSection === 'categories' && (
            <>
              <div className="p-5 border-b border-border flex items-center justify-between">
                <h2>Catálogo AWS</h2>
                <button className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" /> Nova Categoria
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider border-b border-border">
                      <th className="px-5 py-3">Categoria</th>
                      <th className="px-5 py-3">Tipo</th>
                      <th className="px-5 py-3">Criticidade</th>
                      <th className="px-5 py-3">Solicitações</th>
                      <th className="px-5 py-3">SLA</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catalog.map((cat) => (
                      <tr key={cat.id} className={`border-b border-border last:border-0 hover:bg-muted/50 transition-colors ${cat.type === 'breaking-glass' ? 'bg-destructive/[0.02]' : ''}`}>
                        <td className="px-5 py-3">
                          <p className="text-sm font-medium">{cat.name}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[200px]">{cat.description}</p>
                        </td>
                        <td className="px-5 py-3"><TypeBadge type={cat.type} /></td>
                        <td className="px-5 py-3"><CriticalityBadge criticality={cat.criticality} /></td>
                        <td className="px-5 py-3 text-sm tabular-nums">{cat.requestTypes.length}</td>
                        <td className="px-5 py-3 text-sm text-muted-foreground">{cat.sla}</td>
                        <td className="px-5 py-3">
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-success">
                            <ToggleRight className="w-3.5 h-3.5" /> Ativo
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <button className="px-2 py-1 text-xs rounded bg-muted text-muted-foreground hover:bg-muted/80">Editar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeSection === 'audit-config' && (
            <div className="p-6 space-y-4">
              <h2>Configurações de Auditoria</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: 'Checklists de Auditoria', desc: 'Itens obrigatórios para cada tipo de auditoria AWS.', count: 6 },
                  { title: 'Regras de Validação', desc: 'Validações automáticas de escopo e justificativa.', count: 12 },
                  { title: 'Formatos de Saída', desc: 'Relatório executivo, técnico, inventário, matriz.', count: 5 },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl border border-info/20 p-5 bg-info/[0.02]">
                    <ClipboardCheck className="w-5 h-5 text-info mb-2" />
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    <p className="text-lg font-bold tabular-nums mt-2">{item.count}</p>
                    <button className="mt-3 px-3 py-1.5 text-xs rounded bg-muted text-muted-foreground">Configurar</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'bg-config' && (
            <div className="p-6 space-y-4">
              <h2>Configurações de Breaking Glass</h2>
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3 mb-2 flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-destructive" />
                <p className="text-xs text-muted-foreground">Alterações nestas configurações requerem aprovação de CISO.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Duração Máxima', desc: 'Limites de duração por tipo de acesso.', icon: Clock, count: 4 },
                  { title: 'Cadeia de Aprovação', desc: 'Aprovação emergencial e escalação.', icon: ShieldCheck, count: 4 },
                  { title: 'Checklist Pós-Revisão', desc: 'Itens obrigatórios de revisão pós-uso.', icon: CheckSquare, count: 6 },
                  { title: 'Alertas Visuais', desc: 'Banners e mensagens de alerta.', icon: AlertOctagon, count: 5 },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl border border-destructive/20 p-5 bg-destructive/[0.02]">
                    <item.icon className="w-5 h-5 text-destructive mb-2" />
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                    <p className="text-lg font-bold tabular-nums mt-2">{item.count}</p>
                    <button className="mt-3 px-3 py-1.5 text-xs rounded bg-muted text-muted-foreground">Configurar</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!['categories', 'audit-config', 'bg-config'].includes(activeSection) && (
            <div className="p-6">
              <h2 className="mb-3">{adminSections.find(s => s.id === activeSection)?.label}</h2>
              <div className="bg-muted/50 rounded-xl p-8 text-center">
                <p className="text-sm text-muted-foreground">Módulo de gerenciamento de {adminSections.find(s => s.id === activeSection)?.label.toLowerCase()}.</p>
                <p className="text-xs text-muted-foreground mt-1">Interface administrativa para configuração de regras e workflows AWS.</p>
                <button className="mt-4 px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground font-medium">
                  Acessar Configurações
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
