import React from 'react';
import {
    Home,
    Map,
    MessageSquare,
    BarChart2,
    Layout as DashboardIcon,
    Filter,
    Users,
    Settings,
    ChevronDown,
    Target
} from 'lucide-react';

const Sidebar = () => {
    return (
        <div style={{
            width: 'var(--sidebar-width)',
            height: '100vh',
            backgroundColor: 'var(--primary-dark)',
            color: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            padding: '1.25rem',
            position: 'fixed',
            left: 0,
            top: 0
        }}>
            <div className="brand" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '2rem',
                color: 'white',
                fontSize: '1.25rem',
                fontWeight: 700
            }}>
                <div style={{
                    width: '32px',
                    height: '32px',
                    background: 'var(--accent)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Target size={20} color="white" />
                </div>
                tability
                <Settings size={18} style={{ marginLeft: 'auto', opacity: 0.5 }} />
            </div>

            <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '0.75rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem',
                cursor: 'pointer'
            }}>
                <div style={{ width: 24, height: 24, background: 'var(--success)', borderRadius: 4 }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'white' }}>Squarepoint.io</span>
                <ChevronDown size={16} style={{ marginLeft: 'auto', opacity: 0.5 }} />
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <SidebarItem icon={<Home size={18} />} label="My Focus" />

                <Section label="WORK" />
                <SidebarItem icon={<Map size={18} />} label="Plans" />
                <SidebarItem icon={<Map size={18} />} label="Strategy map" />
                <SidebarItem icon={<MessageSquare size={18} />} label="Standup" />

                <Section label="REPORTS" />
                <SidebarItem icon={<BarChart2 size={18} />} label="Insights" />
                <SidebarItem icon={<DashboardIcon size={18} />} label="Dashboards" active />
                <SidebarItem icon={<Filter size={18} />} label="Filters" />

                <Section label="ORG" />
                <SidebarItem icon={<Users size={18} />} label="People" />
                <SidebarItem icon={<Users size={18} />} label="Teams" />
            </nav>
        </div>
    );
};

const Section = ({ label }: { label: string }) => (
    <div style={{
        fontSize: '0.7rem',
        fontWeight: 700,
        color: 'rgba(255, 255, 255, 0.4)',
        marginTop: '1.5rem',
        marginBottom: '0.5rem',
        letterSpacing: '0.05em'
    }}>
        {label}
    </div>
);

const SidebarItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.6rem 0.75rem',
        borderRadius: '8px',
        fontSize: '0.9rem',
        cursor: 'pointer',
        backgroundColor: active ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        color: active ? 'white' : 'inherit',
        transition: 'all 0.2s'
    }} className="sidebar-item">
        {icon}
        <span>{label}</span>
    </div>
);

export default Sidebar;
