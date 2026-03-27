// src/pages/admin/AdminDashboard.jsx — Premium redesign
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getQuotes, getContacts, getProducts, getAllPages } from '../../services/api';
import { FileText, Package, MessageSquare, Mail, ArrowRight, Clock, CheckCircle, AlertCircle, Layers } from 'lucide-react';

const STATUS_COLORS = {
  new: 'bg-emerald-100 text-emerald-700',
  'in-progress': 'bg-amber-100 text-amber-700',
  resolved: 'bg-gray-100 text-gray-500',
  read: 'bg-blue-100 text-blue-700',
  replied: 'bg-gray-100 text-gray-500',
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({ quotes: 0, contacts: 0, products: 0, pages: 0, newQuotes: 0, newContacts: 0 });
  const [recentQuotes, setRecentQuotes] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getQuotes(), getContacts(), getProducts(), getAllPages()])
      .then(([q, c, p, pgs]) => {
        setStats({
          quotes: q.length, contacts: c.length, products: p.length, pages: pgs.length,
          newQuotes: q.filter(x => x.status === 'new').length,
          newContacts: c.filter(x => x.status === 'new').length,
        });
        setRecentQuotes(q.slice(0, 4));
        setRecentContacts(c.slice(0, 4));
        setPages(pgs.slice(0, 8));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center py-32">
      <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full" />
    </div>
  );

  const statCards = [
    { label: 'CMS Pages', value: stats.pages, sub: 'All editable', icon: FileText, color: 'from-blue-500 to-blue-700', path: '/admin/cms' },
    { label: 'New Quotes', value: stats.newQuotes, sub: `${stats.quotes} total`, icon: MessageSquare, color: 'from-emerald-500 to-emerald-700', path: '/admin/quotes', alert: stats.newQuotes > 0 },
    { label: 'New Messages', value: stats.newContacts, sub: `${stats.contacts} total`, icon: Mail, color: 'from-purple-500 to-purple-700', path: '/admin/contacts', alert: stats.newContacts > 0 },
  ];

  const PAGE_ICONS = {
    home: '🏠', furniture: '🪑', architecture: '🏗️', digital: '💻', sports: '🏅',
    libraries: '📚', environments: '🌿', aboutus: 'ℹ️', 'contact-us': '📞',
    mathematics: '📐', science: '🔬', labs: '🧪', design: '🎨',
    manufacturing: '🏭', corporate: '🏢', catalogues: '📁', guides: '📖',
  };

  return (
    <div className="space-y-8">

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(card => {
          const Icon = card.icon;
          return (
            <Link key={card.label} to={card.path}
              className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all group overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br ${card.color} opacity-5 -mr-8 -mt-8 group-hover:opacity-10 transition-opacity`} />
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3 shadow-lg`}>
                <Icon size={18} className="text-white" />
              </div>
              <p className="text-3xl font-black text-gray-800">{card.value}</p>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-0.5">{card.label}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{card.sub}</p>
              {card.alert && card.value > 0 && (
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Quick Edit Pages */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="font-black text-gray-800 text-base">Edit Website Pages</h2>
            <p className="text-xs text-gray-400 mt-0.5">Click any page to edit its content blocks</p>
          </div>
          <Link to="/admin/cms" className="flex items-center gap-1.5 text-blue-600 text-xs font-bold hover:underline">
            All Pages <ArrowRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0 divide-x divide-y divide-gray-100">
          {pages.map(p => (
            <Link key={p.pageSlug} to={`/admin/cms?page=${p.pageSlug}`}
              className="flex items-center gap-3 p-4 hover:bg-blue-50 transition-colors group"
            >
              <span className="text-2xl">{PAGE_ICONS[p.pageSlug] || '📄'}</span>
              <div>
                <p className="text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors">{p.pageTitle}</p>
                <p className="text-[10px] text-gray-400">/{p.pageSlug}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Quotes */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-emerald-500" />
              <h3 className="font-black text-gray-700 text-sm">Recent Quotes</h3>
            </div>
            <Link to="/admin/quotes" className="text-blue-600 text-xs font-bold hover:underline">View All →</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentQuotes.length === 0 && <p className="px-6 py-8 text-sm text-gray-400 text-center">No quotes yet</p>}
            {recentQuotes.map(q => (
              <div key={q._id} className="px-6 py-3.5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-bold text-sm text-gray-800 truncate">{q.schoolName}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    <Clock size={10} /> {new Date(q.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    {q.pinCode && <span>· 📍 {q.pinCode}</span>}
                  </p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase whitespace-nowrap ${STATUS_COLORS[q.status] || 'bg-gray-100 text-gray-500'}`}>
                  {q.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-purple-500" />
              <h3 className="font-black text-gray-700 text-sm">Recent Messages</h3>
            </div>
            <Link to="/admin/contacts" className="text-blue-600 text-xs font-bold hover:underline">View All →</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentContacts.length === 0 && <p className="px-6 py-8 text-sm text-gray-400 text-center">No messages yet</p>}
            {recentContacts.map(c => (
              <div key={c._id} className="px-6 py-3.5 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-bold text-sm text-gray-800 truncate">{c.name}</p>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{c.email}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase whitespace-nowrap ${STATUS_COLORS[c.status] || 'bg-gray-100 text-gray-500'}`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
