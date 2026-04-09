// src/pages/admin/UserManager.jsx — Full user CRUD with search, filter, edit, delete, export
import { useEffect, useState } from 'react';
import { getUsers, updateUser, deleteUser, getUsersExportUrl } from '../../services/api';
import { Search, Download, Trash2, Shield, User as UserIcon, ChevronLeft, ChevronRight, Eye, Mail, Phone, MapPin, School, Calendar } from 'lucide-react';

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 20 };
      if (search) params.search = search;
      if (roleFilter) params.role = roleFilter;
      const data = await getUsers(params);
      setUsers(data.users);
      setTotal(data.total);
      setPages(data.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [page, roleFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this user permanently?')) return;
    try {
      await deleteUser(id);
      load();
      if (selectedUser?._id === id) setSelectedUser(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRoleToggle = async (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!confirm(`Change role to ${newRole}?`)) return;
    try {
      await updateUser(id, { role: newRole });
      load();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleExport = () => {
    const token = localStorage.getItem('token');
    window.open(`${getUsersExportUrl()}?token=${token}`, '_blank');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-black text-gray-900">👥 User Management</h2>
          <p className="text-sm text-gray-400 mt-1">{total} registered users</p>
        </div>
        <button onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 shadow-lg shadow-green-500/20">
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3 mb-6">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, email, or school..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 outline-none" />
        </form>
        <select value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setPage(1); }}
          className="px-4 py-2 border border-gray-200 rounded-xl text-sm bg-white">
          <option value="">All Roles</option>
          <option value="user">Users</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      <div className="flex gap-6">
        {/* Users Table */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" /></div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left px-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">User</th>
                      <th className="text-left px-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">School</th>
                      <th className="text-left px-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
                      <th className="text-left px-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                      <th className="text-left px-4 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Joined</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {users.map(u => (
                      <tr key={u._id} className={`hover:bg-blue-50/30 cursor-pointer transition-colors ${selectedUser?._id === u._id ? 'bg-blue-50/50' : ''}`}
                        onClick={() => setSelectedUser(u)}>
                        <td className="px-4 py-3">
                          <p className="font-bold text-gray-800">{u.name}</p>
                          <p className="text-xs text-gray-400">{u.email}</p>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{u.schoolName || '—'}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${u.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${u.isVerified ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                            {u.isVerified ? 'Verified' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-xs">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                            <button onClick={() => handleRoleToggle(u._id, u.role)} className="p-1.5 text-gray-400 hover:text-purple-600 rounded-lg hover:bg-purple-50" title="Toggle role">
                              <Shield size={14} />
                            </button>
                            <button onClick={() => handleDelete(u._id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50" title="Delete">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400">Page {page} of {pages} ({total} total)</p>
                  <div className="flex gap-1">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                      className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-30"><ChevronLeft size={14} /></button>
                    <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}
                      className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-30"><ChevronRight size={14} /></button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* User Detail Panel */}
        {selectedUser && (
          <div className="w-80 bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4 shrink-0 sticky top-24 self-start">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-lg font-black">{selectedUser.name?.charAt(0)}</span>
              </div>
              <h3 className="font-black text-gray-800">{selectedUser.name}</h3>
              <p className="text-xs text-gray-400">{selectedUser.email}</p>
            </div>

            <div className="space-y-3 pt-3 border-t border-gray-100">
              {selectedUser.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={14} className="text-gray-400" />
                  <span className="text-gray-600">{selectedUser.phone}</span>
                </div>
              )}
              {selectedUser.schoolName && (
                <div className="flex items-center gap-2 text-sm">
                  <School size={14} className="text-gray-400" />
                  <span className="text-gray-600">{selectedUser.schoolName}</span>
                </div>
              )}
              {(selectedUser.city || selectedUser.state) && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={14} className="text-gray-400" />
                  <span className="text-gray-600">{[selectedUser.city, selectedUser.state].filter(Boolean).join(', ')}</span>
                </div>
              )}
              {selectedUser.designation && (
                <div className="flex items-center gap-2 text-sm">
                  <UserIcon size={14} className="text-gray-400" />
                  <span className="text-gray-600">{selectedUser.designation}</span>
                </div>
              )}
              {selectedUser.schoolType && (
                <div className="text-sm text-gray-500">
                  <span className="font-bold text-gray-400 text-[10px] uppercase">Board:</span> {selectedUser.schoolType}
                </div>
              )}
              {selectedUser.studentStrength && (
                <div className="text-sm text-gray-500">
                  <span className="font-bold text-gray-400 text-[10px] uppercase">Strength:</span> {selectedUser.studentStrength}
                </div>
              )}
              {selectedUser.selectedServices?.length > 0 && (
                <div>
                  <p className="font-bold text-gray-400 text-[10px] uppercase mb-1">Services</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedUser.selectedServices.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold">{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {selectedUser.createdAt && (
                <div className="flex items-center gap-2 text-sm pt-2 border-t border-gray-100">
                  <Calendar size={14} className="text-gray-400" />
                  <span className="text-gray-500 text-xs">Joined {new Date(selectedUser.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
