import React, { useState } from 'react';
import {
  Bell,
  Search,
  Share2,
  User,
  Clock,
  Target,
  CheckCircle2,
  TrendingUp,
  ChevronRight,
  Lock,
  PlayCircle,
  HelpCircle,
  MoreHorizontal
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import Sidebar from './components/Sidebar';
import type { Stats, OKR } from './types';

const chartData = [
  { name: '4 Oct', value: 30 },
  { name: '27 Oct', value: 80 },
  { name: '19 Nov', value: 150 },
  { name: '12 Dec', value: 300 },
];

const areaData = [
  { name: '1 Apr', v: 2, c: 5 },
  { name: '24 Apr', v: 8, c: 4 },
  { name: '17 May', v: 18, c: 12 },
  { name: '9 Jun', v: 12, c: 15 },
];

const mockStats: Stats = {
  daysLeft: 42,
  overallProgress: 59,
  tasksCompleted: '5/18',
  netConfidence: 40
};

const mockOKRs: OKR[] = [
  {
    id: '1',
    title: 'Increase Sales Growth',
    progress: 68,
    status: 'on-track',
    owner: 'Alex',
    type: 'objective',
    children: [
      {
        id: '1.1',
        title: 'Increase Quarterly Sales Revenue from $1 million to $1.3 million',
        progress: 25,
        status: 'on-track',
        owner: 'Alex',
        type: 'key-result'
      },
      {
        id: '1.2',
        title: 'Improve customer retention rate from 70% to 85%',
        progress: 4,
        status: 'at-risk',
        owner: 'Sam',
        type: 'key-result',
        children: [
          {
            id: '1.2.1',
            title: 'Turn customers into true fans',
            progress: 45,
            status: 'on-track',
            owner: 'Sam',
            type: 'initiative'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Boost product quality',
    progress: 40,
    status: 'behind',
    owner: 'Jordan',
    type: 'objective'
  }
];

function App() {
  const [view, setView] = useState<'list' | 'dashboard'>('list');

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{
        marginLeft: 'var(--sidebar-width)',
        flex: 1,
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto 0 var(--sidebar-width)'
      }}>
        {/* Header */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span role="img" aria-label="market">🌻</span> Marketing OKRs
            </div>
            <Lock size={18} style={{ opacity: 0.4 }} />
            <PlayCircle size={18} style={{ opacity: 0.4 }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Search size={20} style={{ opacity: 0.4 }} />
            <Share2 size={20} style={{ opacity: 0.4 }} />
            <Bell size={20} style={{ opacity: 0.4 }} />
            <div style={{
              width: 32,
              height: 32,
              background: '#e5e7eb',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <User size={20} color="#9ca3af" />
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          borderBottom: '1px solid var(--border)',
          marginBottom: '2rem',
          fontSize: '0.9rem',
          color: 'var(--text-muted)'
        }}>
          {['Overview', 'Tasks', 'Cascade', 'Notes', 'Retrospectives'].map((tab) => (
            <div
              key={tab}
              onClick={() => setView(tab === 'Overview' ? 'list' : view)}
              style={{
                padding: '0.5rem 0',
                color: (tab === 'Overview' && view === 'list') ? 'var(--text-main)' : 'inherit',
                borderBottom: (tab === 'Overview' && view === 'list') ? '2px solid var(--text-main)' : 'none',
                fontWeight: (tab === 'Overview' && view === 'list') ? 600 : 400,
                cursor: 'pointer'
              }}
            >
              {tab}
            </div>
          ))}
          <div
            onClick={() => setView('dashboard')}
            style={{
              padding: '0.5rem 0',
              color: view === 'dashboard' ? 'var(--text-main)' : 'inherit',
              borderBottom: view === 'dashboard' ? '2px solid var(--text-main)' : 'none',
              fontWeight: view === 'dashboard' ? 600 : 400,
              cursor: 'pointer'
            }}
          >
            Analytics
          </div>
        </div>

        {view === 'list' ? (
          <>
            {/* Overview Stats */}
            <section className="card" style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>OVERVIEW</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                <StatItem icon={<Clock color="#6366f1" />} value={mockStats.daysLeft} label="Days left" />
                <StatItem icon={<TrendingUp color="#10b981" />} value={`${mockStats.overallProgress}%`} label="Overall progress" />
                <StatItem icon={<CheckCircle2 color="#3b82f6" />} value={mockStats.tasksCompleted} label="Tasks completed" />
                <StatItem icon={<Target color="#f59e0b" />} value={mockStats.netConfidence} label="Net confidence" />
              </div>
            </section>

            {/* OKR List */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {mockOKRs.map(okr => (
                <OKRItem key={okr.id} okr={okr} />
              ))}
            </section>
          </>
        ) : (
          <DashboardView />
        )}
      </main>
    </div>
  );
}

const DashboardView = () => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1rem' }}>Progress Over Time</h3>
        <HelpCircle size={16} style={{ opacity: 0.4 }} />
      </div>
      <div style={{ height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="var(--accent)" strokeWidth={3} dot={{ r: 4, fill: 'var(--accent)' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1rem' }}>Confidence Trends</h3>
        <HelpCircle size={16} style={{ opacity: 0.4 }} />
      </div>
      <div style={{ height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={areaData}>
            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey="v" stackId="1" stroke="#10b981" fill="#d1fae5" />
            <Area type="monotone" dataKey="c" stackId="1" stroke="#f59e0b" fill="#fef3c7" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="card" style={{ gridColumn: 'span 2' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1rem' }}>Recent Check-ins</h3>
        <MoreHorizontal size={16} style={{ opacity: 0.4 }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[1, 2].map(i => (
          <div key={i} style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
            <div style={{ width: 40, height: 40, background: '#e5e7eb', borderRadius: '50%' }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600 }}>Clara Collins</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>2 hours ago</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                We're back on track with our lead target after a slow start. New, high-performing affiliates have boosted our lead volume...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const StatItem = ({ icon, value, label }: { icon: React.ReactNode, value: any, label: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderRight: '1px solid var(--border)', paddingRight: '1rem' }}>
    <div style={{
      width: 48,
      height: 48,
      borderRadius: '50%',
      background: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid var(--border)'
    }}>
      {icon}
    </div>
    <div>
      <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{value}</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{label}</div>
    </div>
  </div>
);

const OKRItem = ({ okr, depth = 0 }: { okr: OKR, depth?: number }) => {
  const isObjective = okr.type === 'objective';

  return (
    <div style={{ marginLeft: depth * 24 }}>
      <div className="card" style={{
        padding: '1rem',
        marginBottom: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        borderLeft: isObjective ? `4px solid ${okr.status === 'at-risk' ? 'var(--danger)' : 'var(--success)'}` : '1px solid var(--border)'
      }}>
        <div style={{ opacity: 0.4 }}><ChevronRight size={18} /></div>
        <div style={{
          width: 20,
          height: 20,
          borderRadius: 4,
          background: okr.status === 'at-risk' ? 'var(--danger)' : 'var(--success)'
        }} />
        <div style={{ flex: 1, fontWeight: isObjective ? 600 : 400 }}>{okr.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: 24,
            height: 24,
            background: '#e5e7eb',
            borderRadius: '50%',
            fontSize: '0.7rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {okr.owner[0]}
          </div>
          <div style={{
            color: okr.status === 'at-risk' ? 'var(--danger)' : 'var(--success)',
            fontWeight: 700,
            fontSize: '0.8rem',
            width: 40
          }}>
            +{okr.progress}%
          </div>
          <div style={{ width: 80, height: 6, background: '#f1f5f9', borderRadius: 10 }}>
            <div style={{
              width: `${okr.progress}%`,
              height: '100%',
              background: okr.status === 'at-risk' ? 'var(--danger)' : 'var(--success)',
              borderRadius: 10
            }} />
          </div>
        </div>
      </div>
      {okr.children?.map(child => (
        <OKRItem key={child.id} okr={child} depth={depth + 1} />
      ))}
    </div>
  );
};

export default App;
