// src/pages/admin/ContactsInbox.jsx — Premium redesign
import { useState, useEffect } from 'react';
import { getContacts, updateContactStatus } from '../../services/api';
import { Mail, Phone, Calendar, ChevronDown, CheckCircle, RotateCcw } from 'lucide-react';

const STATUS_OPTS = ['new', 'read', 'replied'];
const STATUS_STYLES = {
  new: 'bg-purple-100 text-purple-700',
  read: 'bg-blue-100 text-blue-700',
  replied: 'bg-emerald-100 text-emerald-700',
};

export default function ContactsInbox() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const load = () => getContacts().then(setContacts).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const changeStatus = async (id, status) => {
    await updateContactStatus(id, status);
    setContacts(c => c.map(x => x._id === id ? { ...x, status } : x));
  };

  const filtered = filter === 'all' ? contacts : contacts.filter(c => c.status === filter);
  const counts = STATUS_OPTS.reduce((acc, s) => ({ ...acc, [s]: contacts.filter(c => c.status === s).length }), {});

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
            {s === 'all' && <span className="ml-1 text-gray-400">{contacts.length}</span>}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16 text-center">
          <Mail size={32} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 font-semibold">No messages in this category</p>
        </div>
      )}
      <div className="grid gap-4">
        {filtered.map(c => (
          <div key={c._id} className={`bg-white rounded-2xl border shadow-sm p-5 flex flex-col sm:flex-row gap-5 transition-all ${c.status === 'new' ? 'border-purple-200 shadow-purple-500/5' : 'border-gray-100'}`}>
            {/* Avatar block */}
            <div className="shrink-0 flex sm:flex-col items-center sm:w-32 gap-3 text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-black shrink-0 ${c.status === 'new' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}>
                {c.name.charAt(0).toUpperCase()}
              </div>
              <div className="sm:w-full min-w-0 text-left sm:text-center">
                <p className="font-bold text-sm text-gray-800 truncate" title={c.name}>{c.name}</p>
                <a href={`mailto:${c.email}`} className="text-xs text-blue-500 hover:underline truncate block" title={c.email}>{c.email}</a>
                {c.phone && <a href={`tel:${c.phone}`} className="text-[10px] text-gray-400 hover:text-gray-800 flex items-center justify-start sm:justify-center gap-1 mt-1"><Phone size={10} /> {c.phone}</a>}
              </div>
            </div>

            {/* Bubble & Actions */}
            <div className="flex-1 flex flex-col gap-3 min-w-0">
              <div className="bg-gray-50/80 rounded-2xl rounded-tl-none sm:rounded-tl-2xl border border-gray-100 p-4">
                <p className="text-sm font-bold text-gray-800 mb-1">{c.subject}</p>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{c.message}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 mt-4">
                  <Calendar size={12} />
                  {new Date(c.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              <div className="flex items-center gap-2 justify-end">
                {c.status === 'new' && (
                  <button onClick={() => changeStatus(c._id, 'read')} className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-xs font-bold transition-colors">
                    Mark as Read
                  </button>
                )}
                {c.status !== 'replied' && (
                  <button onClick={() => changeStatus(c._id, 'replied')} className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5">
                    <CheckCircle size={14} /> Mark Replied
                  </button>
                )}
                {c.status === 'replied' && (
                  <button onClick={() => changeStatus(c._id, 'read')} className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5">
                    <RotateCcw size={14} /> Unmark Replied
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
