// src/pages/admin/QuotesInbox.jsx — Premium redesign
import { useState, useEffect } from 'react';
import { getQuotes, updateQuoteStatus } from '../../services/api';
import { MessageSquare, Phone, MapPin, Clock, Tag, ChevronDown } from 'lucide-react';

const STATUS_OPTS = ['new', 'in-progress', 'resolved'];
const STATUS_STYLES = {
  new: 'bg-emerald-100 text-emerald-700',
  'in-progress': 'bg-amber-100 text-amber-700',
  resolved: 'bg-gray-100 text-gray-500',
};

export default function QuotesInbox() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const load = () => getQuotes().then(setQuotes).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const changeStatus = async (id, status) => {
    await updateQuoteStatus(id, status);
    setQuotes(q => q.map(x => x.id === id ? { ...x, status } : x));
  };

  const filtered = filter === 'all' ? quotes : quotes.filter(q => q.status === filter);
  const counts = STATUS_OPTS.reduce((acc, s) => ({ ...acc, [s]: quotes.filter(q => q.status === s).length }), {});

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full" /></div>;

  return (
    <div className="space-y-5">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-1.5 w-fit">
        {['all', ...STATUS_OPTS].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${filter === s ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            {s} {s !== 'all' && counts[s] > 0 && <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${filter === s ? 'bg-white/20' : STATUS_STYLES[s]}`}>{counts[s]}</span>}
            {s === 'all' && <span className="ml-1 text-gray-400">{quotes.length}</span>}
          </button>
        ))}
      </div>

      {/* Quotes grid */}
      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16 text-center">
          <MessageSquare size={32} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 font-semibold">No quotes in this category</p>
        </div>
      )}
      <div className="grid gap-4">
        {filtered.map(q => (
          <div key={q.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex-1 space-y-2 min-w-0">
              <div className="flex items-start gap-3 flex-wrap">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shrink-0">
                  <MessageSquare size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-black text-gray-800 text-base">{q.schoolName}</p>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    {q.pinCode && <span className="flex items-center gap-1 text-xs text-gray-500"><MapPin size={11} /> PIN {q.pinCode}</span>}
                    {q.phone && <span className="flex items-center gap-1 text-xs text-gray-500"><Phone size={11} /> {q.phone}</span>}
                    <span className="flex items-center gap-1 text-xs text-gray-400"><Clock size={11} /> {new Date(q.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
              {q.message && <p className="text-sm text-gray-600 bg-gray-50 rounded-xl p-3 leading-relaxed">{q.message}</p>}
            </div>
            {/* Status selector */}
            <div className="shrink-0 relative">
              <select value={q.status} onChange={e => changeStatus(q.id, e.target.value)}
                className={`appearance-none pl-3 pr-8 py-2 rounded-xl text-xs font-black uppercase tracking-wider border-0 outline-none cursor-pointer ${STATUS_STYLES[q.status]}`}
              >
                {STATUS_OPTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

