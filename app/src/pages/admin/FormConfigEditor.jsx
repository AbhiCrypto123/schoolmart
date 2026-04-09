// src/pages/admin/FormConfigEditor.jsx — Dynamic Registration/Login form field management
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFormConfig, updateFormConfig } from '../../services/api';
import { Plus, Trash2, Save, GripVertical, ChevronDown, ChevronUp, Eye, EyeOff, AlertCircle } from 'lucide-react';

const FIELD_TYPES = ['text', 'email', 'tel', 'password', 'select', 'textarea', 'radio', 'checkbox', 'number'];

export default function FormConfigEditor() {
  const { slug } = useParams();
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('fields');

  useEffect(() => {
    setLoading(true);
    getFormConfig(slug)
      .then(c => setConfig(c))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  const save = async () => {
    setSaving(true);
    try {
      await updateFormConfig(slug, {
        fields: config.fields,
        services: config.services,
        settings: config.settings,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (index, key, value) => {
    setConfig(prev => {
      const fields = [...prev.fields];
      fields[index] = { ...fields[index], [key]: value };
      return { ...prev, fields };
    });
  };

  const addField = () => {
    setConfig(prev => ({
      ...prev,
      fields: [...prev.fields, {
        name: `field_${Date.now()}`,
        label: 'New Field',
        type: 'text',
        placeholder: '',
        required: false,
        order: prev.fields.length,
        isActive: true,
        gridCols: 1,
        options: [],
      }]
    }));
  };

  const removeField = (index) => {
    if (!confirm('Remove this field?')) return;
    setConfig(prev => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index)
    }));
  };

  const moveField = (index, direction) => {
    setConfig(prev => {
      const fields = [...prev.fields];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= fields.length) return prev;
      [fields[index], fields[newIndex]] = [fields[newIndex], fields[index]];
      fields.forEach((f, i) => f.order = i);
      return { ...prev, fields };
    });
  };

  const addService = () => {
    setConfig(prev => ({
      ...prev,
      services: [...(prev.services || []), { name: 'New Service', isActive: true, order: (prev.services || []).length }]
    }));
  };

  const removeService = (index) => {
    setConfig(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const updateService = (index, key, value) => {
    setConfig(prev => {
      const services = [...prev.services];
      services[index] = { ...services[index], [key]: value };
      return { ...prev, services };
    });
  };

  const updateSettings = (key, value) => {
    setConfig(prev => ({
      ...prev,
      settings: { ...prev.settings, [key]: value }
    }));
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full" /></div>;
  if (!config) return <div className="text-center py-20 text-red-500">Form config not found</div>;

  const isLogin = slug === 'login';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-black text-gray-900">{isLogin ? '🔐 Login' : '📝 Registration'} Form Configuration</h2>
          <p className="text-sm text-gray-400 mt-1">Manage form fields, labels, services, and settings. Changes reflect dynamically on the {slug} page.</p>
        </div>
        <button onClick={save} disabled={saving}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-wider transition-all shadow-lg ${saved ? 'bg-green-500 text-white shadow-green-500/30' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/30'}`}>
          <Save size={16} />
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save All Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl w-fit">
        {['fields', ...(isLogin ? [] : ['services']), 'settings'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all ${activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Fields Tab */}
      {activeTab === 'fields' && (
        <div className="space-y-3">
          {config.fields.sort((a, b) => a.order - b.order).map((field, i) => (
            <div key={field._id || i} className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-all ${!field.isActive ? 'opacity-50' : ''}`}>
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <GripVertical size={14} className="text-gray-300 cursor-grab" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Field #{i + 1}</span>
                    {field.required && <span className="text-red-500 text-[10px] font-black flex items-center gap-0.5"><AlertCircle size={10} /> REQUIRED</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => moveField(i, 'up')} disabled={i === 0} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"><ChevronUp size={14} /></button>
                    <button onClick={() => moveField(i, 'down')} disabled={i === config.fields.length - 1} className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"><ChevronDown size={14} /></button>
                    <button onClick={() => updateField(i, 'isActive', !field.isActive)} className={`p-1.5 rounded-lg text-xs ${field.isActive ? 'text-blue-500 bg-blue-50' : 'text-gray-400 bg-gray-50'}`}>
                      {field.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                    <button onClick={() => removeField(i)} className="p-1.5 rounded-lg text-red-400 bg-red-50 hover:bg-red-100"><Trash2 size={14} /></button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Field Name (key)</label>
                    <input type="text" value={field.name} onChange={e => updateField(i, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono bg-gray-50" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Label (shown to user)</label>
                    <input type="text" value={field.label} onChange={e => updateField(i, 'label', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Type</label>
                    <select value={field.type} onChange={e => updateField(i, 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white">
                      {FIELD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Placeholder</label>
                    <input type="text" value={field.placeholder || ''} onChange={e => updateField(i, 'placeholder', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-3 pt-3 border-t border-gray-100">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={field.required} onChange={e => updateField(i, 'required', e.target.checked)}
                      className="w-4 h-4 text-red-500 rounded border-gray-300" />
                    <span className="text-xs font-bold text-gray-500">Required <span className="text-red-500">*</span></span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-500">
                    Width:
                    <select value={field.gridCols || 1} onChange={e => updateField(i, 'gridCols', parseInt(e.target.value))}
                      className="px-2 py-1 border border-gray-200 rounded text-xs">
                      <option value={1}>Half</option>
                      <option value={2}>Full Width</option>
                    </select>
                  </label>
                </div>

                {(field.type === 'select' || field.type === 'radio') && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <label className="text-[10px] font-bold text-gray-500 uppercase mb-1 block">Options (one per line)</label>
                    <textarea
                      value={(field.options || []).join('\n')}
                      onChange={e => updateField(i, 'options', e.target.value.split('\n'))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono"
                      placeholder="Option 1&#10;Option 2&#10;Option 3"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          <button onClick={addField}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 font-bold text-sm hover:border-blue-400 hover:text-blue-500 transition-colors">
            <Plus size={16} /> Add New Field
          </button>
        </div>
      )}

      {/* Services Tab */}
      {activeTab === 'services' && !isLogin && (
        <div className="space-y-3">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
            <p className="text-sm text-blue-600 font-medium">These services appear as checkboxes on the registration form. Users can select which services they're interested in.</p>
          </div>
          {(config.services || []).map((svc, i) => (
            <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
              <GripVertical size={14} className="text-gray-300" />
              <input type="text" value={svc.name} onChange={e => updateService(i, 'name', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm" />
              <button onClick={() => updateService(i, 'isActive', !svc.isActive)}
                className={`p-2 rounded-lg text-xs font-bold ${svc.isActive ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-50'}`}>
                {svc.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
              </button>
              <button onClick={() => removeService(i)} className="p-2 text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
            </div>
          ))}
          <button onClick={addService}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 font-bold text-sm hover:border-blue-400 hover:text-blue-500 transition-colors">
            <Plus size={16} /> Add Service
          </button>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Form Heading</label>
            <input type="text" value={config.settings?.heading || ''} onChange={e => updateSettings('heading', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Description Text</label>
            <textarea value={config.settings?.description || ''} onChange={e => updateSettings('description', e.target.value)}
              rows={3} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Submit Button Label</label>
            <input type="text" value={config.settings?.submitLabel || ''} onChange={e => updateSettings('submitLabel', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
          </div>
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Services Section Heading</label>
              <input type="text" value={config.settings?.servicesHeading || ''} onChange={e => updateSettings('servicesHeading', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
            </div>
          )}
          <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={config.settings?.otpEnabled !== false} onChange={e => updateSettings('otpEnabled', e.target.checked)}
                className="w-4 h-4 rounded border-gray-300" />
              <span className="text-sm font-medium text-gray-600">OTP Verification Enabled</span>
            </label>
            {isLogin && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={config.settings?.forgotPasswordEnabled !== false} onChange={e => updateSettings('forgotPasswordEnabled', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300" />
                <span className="text-sm font-medium text-gray-600">"Forgot Password" Link Enabled</span>
              </label>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
