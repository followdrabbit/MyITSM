import { Layout } from '@/components/Layout';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { catalog } from '@/data/mockData';
import { CriticalityBadge, TypeBadge } from '@/components/Badges';
import { ArrowLeft, ArrowRight, Clock, FileCheck, ShieldCheck, BookOpen, CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const spring = { type: 'spring' as const, duration: 0.4, bounce: 0 };

function getIcon(name: string) {
  const Icon = (LucideIcons as any)[name];
  return Icon || LucideIcons.FileText;
}

export default function CategoryDetail() {
  const { categoryId } = useParams();
  const category = catalog.find(c => c.id === categoryId);

  if (!category) return <Layout><p>Categoria não encontrada.</p></Layout>;

  const isBreakingGlass = category.type === 'breaking-glass';
  const isAudit = category.type === 'audit';

  return (
    <Layout>
      <div className="space-y-6 max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link to="/catalog" className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1>{category.name}</h1>
              <CriticalityBadge criticality={category.criticality} />
              <TypeBadge type={category.type} />
            </div>
            <p className="text-muted-foreground text-sm mt-0.5">{category.description}</p>
          </div>
        </div>

        {/* Emergency banner */}
        {isBreakingGlass && (
          <div className="bg-destructive/5 border-2 border-destructive/20 rounded-xl p-4 flex items-start gap-3">
            <AlertOctagon className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-destructive">Processo Excepcional e Sensível</p>
              <p className="text-xs text-muted-foreground mt-0.5">Acesso emergencial requer incidente registrado, justificativa, aprovação reforçada, temporalidade definida e revisão obrigatória pós-uso. Todo acesso será auditado.</p>
            </div>
          </div>
        )}

        {/* Request Types */}
        <div>
          <h2 className="mb-3">Tipos de Solicitação</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category.requestTypes.map((rt, i) => {
              const Icon = getIcon(rt.icon);
              return (
                <motion.div
                  key={rt.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring, delay: i * 0.04 }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    to={`/catalog/${categoryId}/new/${rt.id}`}
                    className={`block bg-card rounded-xl p-5 card-shadow hover:card-shadow-hover transition-all ${isBreakingGlass ? 'ring-1 ring-destructive/10' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isBreakingGlass ? 'bg-destructive/10' : isAudit ? 'bg-info/10' : 'bg-aws/10'}`}>
                        <Icon className={`w-5 h-5 ${isBreakingGlass ? 'text-destructive' : isAudit ? 'text-info' : 'text-aws'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold">{rt.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{rt.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Info sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded-xl p-5 card-shadow">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-info" />
              <h3>Quando Usar</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{category.whenToUse}</p>
          </div>
          <div className="bg-card rounded-xl p-5 card-shadow">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-warning" />
              <h3>SLA Estimado</h3>
            </div>
            <p className="text-2xl font-bold tabular-nums">{category.sla}</p>
            <p className="text-xs text-muted-foreground mt-1">Após todas as aprovações concluídas</p>
          </div>
        </div>

        <div className="bg-card rounded-xl p-5 card-shadow">
          <div className="flex items-center gap-2 mb-3">
            <FileCheck className="w-5 h-5 text-foreground" />
            <h3>Pré-requisitos</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {category.prerequisites.map((p, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl p-5 card-shadow">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <h3>Validações Automáticas</h3>
          </div>
          <div className="space-y-2">
            {category.validations.map((v, i) => (
              <div key={i} className="flex items-center gap-2 text-sm px-3 py-2 bg-warning/5 rounded-lg border border-warning/10">
                <ShieldCheck className="w-4 h-4 text-warning shrink-0" />
                {v}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl p-5 card-shadow">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-5 h-5 text-info" />
            <h3>Aprovações Requeridas</h3>
          </div>
          <div className="space-y-2">
            {category.approvals.map((a, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-info/10 text-info flex items-center justify-center text-xs font-bold tabular-nums">{i + 1}</span>
                {a}
              </div>
            ))}
          </div>
        </div>

        {/* Examples */}
        <div className="bg-card rounded-xl p-5 card-shadow">
          <h3 className="mb-3">Exemplos de Solicitações</h3>
          <div className="space-y-2">
            {category.relatedExamples.map((ex, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                {ex}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
