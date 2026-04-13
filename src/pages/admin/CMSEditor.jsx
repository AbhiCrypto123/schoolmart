// src/pages/admin/CMSEditor.jsx
import { useEffect, useState } from 'react';
import { getAllPages, getPage, updateBlock, addBlock, deleteBlock, uploadFile } from '../../services/api';
import { clearCMSCache } from '../../hooks/useCMSBlock';
import { 
  ChevronDown, ChevronRight, Trash2, Plus, Eye, EyeOff, Save, GripVertical, 
  Image as ImageIcon, Link2, Type, List, ToggleLeft, Upload, Layers, Palette, Video,
  Globe, FileText, Lock, MessageSquare, Box, Package
} from 'lucide-react';
import ProductManager from './ProductManager';
import ImageUpload from '../../components/admin/ImageUpload';
import MediaUpload from '../../components/admin/MediaUpload';
import FileUpload from '../../components/admin/FileUpload';

// ── Reusable Field Components ────────────────────────────────────────────────
const Field = ({ label, children, hint }) => (
  <div className="space-y-1">
    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
    {children}
    {hint && <p className="text-[10px] text-gray-400 font-bold">{hint}</p>}
  </div>
);

const ColorInput = ({ label, value, onChange }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{label}</label>
    <div className="flex gap-2">
      <input type="color" value={value || '#000000'} onChange={e => onChange(e.target.value)}
        className="h-10 w-16 p-1 bg-white border rounded-lg cursor-pointer" />
      <input type="text" value={value || ''} onChange={e => onChange(e.target.value)}
        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs font-mono uppercase" placeholder="#HEX" />
    </div>
  </div>
);

const TextInput = ({ value, onChange, placeholder }) => (
  <input type="text" value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder}
    className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm" />
);

const TextArea = ({ value, onChange, rows = 3, placeholder }) => (
  <textarea value={value || ''} onChange={e => onChange(e.target.value)} rows={rows} placeholder={placeholder}
    className="w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 outline-none resize-y transition-all shadow-sm" />
);

const SectionTitle = ({ children }) => (
  <h4 className="text-[11px] font-black text-indigo-400 uppercase tracking-widest mt-8 mb-4 flex items-center gap-2">
    <div className="h-px bg-indigo-50 flex-1"></div> {children} <div className="h-px bg-indigo-50 flex-1"></div>
  </h4>
);

// ── Block-Specific Form Renderers ───────────────────────────────────────────
const BlockForms = {

  topbar: ({ data = {}, set }) => (
    <div className="space-y-6">
      <SectionTitle>Top Bar & Navigation DNA</SectionTitle>
      <div className="grid grid-cols-2 gap-4">
         <ColorInput label="Hub Background" value={data?.bgColor} onChange={v => set('bgColor', v)} />
         <ColorInput label="Nav Text Identity" value={data?.textColor} onChange={v => set('textColor', v)} />
      </div>
      <SectionTitle>Social Media Routing Hub</SectionTitle>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Facebook Link"><TextInput value={data?.socials?.facebook} onChange={v => set('socials', { ...(data?.socials || {}), facebook: v })} /></Field>
        <Field label="Twitter/X Link"><TextInput value={data?.socials?.twitter} onChange={v => set('socials', { ...(data?.socials || {}), twitter: v })} /></Field>
        <Field label="Instagram Link"><TextInput value={data?.socials?.instagram} onChange={v => set('socials', { ...(data?.socials || {}), instagram: v })} /></Field>
        <Field label="LinkedIn Link"><TextInput value={data?.socials?.linkedin} onChange={v => set('socials', { ...(data?.socials || {}), linkedin: v })} /></Field>
      </div>
    </div>
  ),

  ticker: ({ data = {}, set }) => (
    <div className="space-y-4">
      <SectionTitle>Live Announcement Ticker</SectionTitle>
      <Field label="Announcement Label"><TextInput value={data?.label} onChange={v => set('label', v)} placeholder="LATEST UPDATES" /></Field>
      <Field label="Announcement Items" hint="One per line - will scroll on site">
        <TextArea value={(data?.items || []).join('\n')} onChange={v => set('items', v.split('\n'))} rows={6} placeholder="New Campus Launching in Mumbai\nBulk Discounts Available Now" />
      </Field>
    </div>
  ),

  discussion_forum: ({ data = {}, set }) => (
    <div className="space-y-4">
      <SectionTitle>Discussion Forum Connector</SectionTitle>
      <Field label="Gateway Route (URL)"><TextInput value={data?.url} onChange={v => set('url', v)} placeholder="/forum" /></Field>
      <div className="p-4 bg-indigo-50/30 rounded-2xl border border-indigo-100 flex items-center gap-3">
         <Globe className="text-indigo-400" size={16} />
         <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Maps the Forum button to your strategic community hub.</p>
      </div>
    </div>
  ),

  hero: ({ data = {}, set }) => (
    <div className="space-y-6">
      <SectionTitle>Text Content & DNA</SectionTitle>
      <div className="grid grid-cols-2 gap-4">
         <Field label="Hero Background"><ColorInput value={data?.bgColor} onChange={v => set('bgColor', v)} /></Field>
         <Field label="Text Identity"><ColorInput value={data?.textColor} onChange={v => set('textColor', v)} /></Field>
      </div>
      <Field label="Badge"><TextInput value={data?.badge} onChange={v => set('badge', v)} /></Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Headline 1"><TextInput value={data?.headline1} onChange={v => set('headline1', v)} /></Field>
        <Field label="Headline 2"><TextInput value={data?.headline2} onChange={v => set('headline2', v)} /></Field>
      </div>
      
      <SectionTitle>Dynamic Media Core</SectionTitle>
      <div className="flex gap-2">
        {['slideshow', 'image', 'video'].map(mode => (
          <button key={mode} onClick={() => set('mediaType', mode)}
            className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${data?.mediaType === mode || (!data?.mediaType && mode === 'slideshow') ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl' : 'bg-white text-gray-400 border-gray-100 hover:border-indigo-200'}`}>
            {mode === 'video' ? <Video size={14} className="inline mr-2" /> : mode === 'image' ? <ImageIcon size={14} className="inline mr-2" /> : <Layers size={14} className="inline mr-2" />}
            {mode}
          </button>
        ))}
      </div>
      <MediaUpload label="Master Media Source" value={data?.mediaUrl} onChange={v => set('mediaUrl', v)} />

      <SectionTitle>Global Actions</SectionTitle>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4 border-r border-gray-50 pr-4">
           <Field label="Button 1 Label"><TextInput value={data?.cta1?.label} onChange={v => set('cta1', { ...(data?.cta1 || {}), label: v })} /></Field>
           <Field label="Button 1 Path"><TextInput value={data?.cta1?.path} onChange={v => set('cta1', { ...(data?.cta1 || {}), path: v })} /></Field>
        </div>
        <div className="space-y-4">
           <Field label="Button 2 Label"><TextInput value={data?.cta2?.label} onChange={v => set('cta2', { ...(data?.cta2 || {}), label: v })} /></Field>
           <Field label="Button 2 Path"><TextInput value={data?.cta2?.path} onChange={v => set('cta2', { ...(data?.cta2 || {}), path: v })} /></Field>
        </div>
      </div>
    </div>
  ),

  inner_page_hero: ({ data = {}, set }) => (
    <div className="space-y-6">
      <SectionTitle>Inner Hero Intelligence</SectionTitle>
      <div className="grid grid-cols-2 gap-4">
         <Field label="Category Badge"><TextInput value={data?.badge} onChange={v => set('badge', v)} placeholder="Performance 2025" /></Field>
         <Field label="Subtitle Statement"><TextArea value={data?.subtitle} onChange={v => set('subtitle', v)} rows={2} placeholder="Engineering high-performance..." /></Field>
      </div>
      <Field label="Master Headline (HTML allowed)"><TextArea value={data?.titleHtml} onChange={v => set('titleHtml', v)} rows={3} placeholder='Built <br/> <span class="text-sm-blue">for</span> <br/> Champions.' /></Field>
      
      <SectionTitle>Background Media Core</SectionTitle>
      <div className="flex gap-2">
        {['image', 'video'].map(mode => (
          <button key={mode} onClick={() => set('mediaType', mode)}
            className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${data?.mediaType === mode || (!data?.mediaType && mode === 'image') ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl' : 'bg-white text-gray-400 border-gray-100 hover:border-indigo-200'}`}>
            {mode === 'video' ? <Video size={14} className="inline mr-2" /> : <ImageIcon size={14} className="inline mr-2" />}
            {mode}
          </button>
        ))}
      </div>
      <MediaUpload label="Primary Video/Image Upload" value={data?.mediaUrl} onChange={v => set('mediaUrl', v)} />
      <ImageUpload label="Fallback Fast-Load Image (SEO/Mobile)" value={data?.img} onChange={v => set('img', v)} />
    </div>
  ),

  manufacturing_hero: ({ data = {}, set }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-6 gap-4">
         <div className="col-span-4">
           <Field label="Hero Command Title (HTML)"><TextInput value={data?.titleHtml} onChange={v => set('titleHtml', v)} /></Field>
         </div>
         <div className="col-span-2">
           <Field label="Operational Badge"><TextInput value={data?.badge} onChange={v => set('badge', v)} /></Field>
         </div>
      </div>
      <Field label="Manufacturing Description"><TextArea value={data?.description} onChange={v => set('description', v)} rows={3} /></Field>
      
      <SectionTitle>Dual Image Workflow</SectionTitle>
      <div className="grid grid-cols-2 gap-6">
         <ImageUpload 
           label="Primary Facility Shot" 
           value={data?.images?.[0]} 
           onChange={v => { const arr = [...(data?.images || [])]; arr[0] = v; set('images', arr); }} 
         />
         <ImageUpload 
           label="Secondary Action Detail" 
           value={data?.images?.[1]} 
           onChange={v => { const arr = [...(data?.images || [])]; arr[1] = v; set('images', arr); }} 
         />
      </div>

      <SectionTitle>Scale Benchmark Metrics</SectionTitle>
      <div className="grid grid-cols-2 gap-4">
         <Field label="Statistic Value"><TextInput value={data?.partnerStat} onChange={v => set('partnerStat', v)} placeholder="4K+" /></Field>
         <Field label="Statistic Label"><TextInput value={data?.partnerLabel} onChange={v => set('partnerLabel', v)} placeholder="Partner Schools" /></Field>
      </div>
    </div>
  ),

  action_strip: ({ data = {}, set }) => (
    <div className="space-y-6">
      <SectionTitle>Global Action Strip</SectionTitle>
      <ColorInput label="Strip Background Identity" value={data?.bgColor} onChange={v => set('bgColor', v)} />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Primary Title"><TextInput value={data?.title} onChange={v => set('title', v)} placeholder="The 2025 Lookbook." /></Field>
        <Field label="Sub-title DNA"><TextInput value={data?.subtitle} onChange={v => set('subtitle', v)} placeholder="MASTER CATALOGUE" /></Field>
      </div>
      <Field label="Action / Download Route"><TextInput value={data?.downloadPath} onChange={v => set('downloadPath', v)} placeholder="/catalogues" /></Field>
    </div>
  ),

  sidebar_categories: ({ data = {}, set }) => (
    <div className="space-y-6 bg-gray-50/50 p-8 rounded-3xl border border-gray-100 shadow-sm">
      <SectionTitle>Sidebar Category Matrix</SectionTitle>
      <Field label="Category Names (One per line)" hint="These construct the left-hand navigation filter matrix.">
        <TextArea 
          value={(data?.categories || []).join('\n')} 
          onChange={v => set('categories', v.split('\n').map(s => s.trim()).filter(Boolean))} 
          rows={6} 
          placeholder="Desks\nSeating\nLab Furniture\nStorage" 
        />
      </Field>
    </div>
  ),

  action_stack: ({ data = {}, set }) => (
    <div className="space-y-6">
      <SectionTitle>Action Card Stack</SectionTitle>
      <div className="space-y-4">
        {(data.cards || []).map((c, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative group">
            <button onClick={() => set('cards', data.cards.filter((_, j) => j !== i))} className="absolute top-4 right-4 text-red-300 hover:text-red-500"><Trash2 size={16}/></button>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <ColorInput label="Card DNA Color" value={c.bgColor} onChange={v => { const t = [...data.cards]; t[i] = { ...t[i], bgColor: v }; set('cards', t); }} />
              <Field label="Redirection Route"><TextInput value={c.link} onChange={v => { const t = [...data.cards]; t[i] = { ...t[i], link: v }; set('cards', t); }} /></Field>
            </div>
            <Field label="Card Display Label (HTML allowed)"><TextArea value={c.title} onChange={v => { const t = [...data.cards]; t[i] = { ...t[i], title: v }; set('cards', t); }} rows={2} /></Field>
          </div>
        ))}
      </div>
      <button onClick={() => set('cards', [...(data.cards || []), { title: '', bgColor: '#FFFFFF', link: '/' }])}
        className="w-full py-4 rounded-xl border-2 border-dashed border-gray-100 text-gray-400 font-bold uppercase text-[9px] tracking-widest">+ Add Stack Node</button>
    </div>
  ),

  info_split_grid: ({ data = {}, set }) => (
    <div className="space-y-6">
      <SectionTitle>Info Split Grid Structure</SectionTitle>
      <Field label="Core Heading (HTML)"><TextInput value={data?.heading} onChange={v => set('heading', v)} /></Field>
      <Field label="Descriptive Passage"><TextArea value={data?.description} onChange={v => set('description', v)} rows={3} /></Field>
      <div className="grid grid-cols-2 gap-4 mb-4">
         <Field label="Button / CTA Label"><TextInput value={data?.ctaLabel} onChange={v => set('ctaLabel', v)} /></Field>
         <Field label="Button Target Route"><TextInput value={data?.ctaPath} onChange={v => set('ctaPath', v)} /></Field>
      </div>
      <ImageUpload label="Grid Split Imagery" value={data?.image} onChange={v => set('image', v)} />
      
      <SectionTitle>Feature Points List</SectionTitle>
      <Field label="Points (One per line)" hint="These map to the grid blocks with checkmarks.">
        <TextArea 
          value={(data?.points || []).map(p => typeof p === 'string' ? p : p.text).join('\n')} 
          onChange={v => set('points', v.split('\n').map(s => s.trim()).filter(Boolean))} 
          rows={4} 
        />
      </Field>
    </div>
  ),

  solutions: ({ data = {}, set }) => (
    <div className="space-y-6">
      <SectionTitle>Solution Matrix</SectionTitle>
      <Field label="Master Heading"><TextInput value={data?.heading} onChange={v => set('heading', v)} /></Field>
      <div className="space-y-4">
        {(data.items || []).map((item, i) => (
          <div key={i} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 relative group">
            <button onClick={() => set('items', data.items.filter((_, j) => j !== i))} className="absolute top-4 right-4 text-red-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
            <div className="grid grid-cols-2 gap-4 mb-4">
               <Field label="Card Title"><TextInput value={item.title} onChange={v => { const t = [...data.items]; t[i] = { ...t[i], title: v }; set('items', t); }} /></Field>
               <Field label="Target Route"><TextInput value={item.path} onChange={v => { const t = [...data.items]; t[i] = { ...t[i], path: v }; set('items', t); }} /></Field>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
               <Field label="Badge Text"><TextInput value={item.badge?.label} onChange={v => { const t = [...data.items]; t[i] = { ...t[i], badge: { ...t[i].badge, label: v } }; set('items', t); }} /></Field>
               <ColorInput label="Badge Color" value={item.badge?.color} onChange={v => { const t = [...data.items]; t[i] = { ...t[i], badge: { ...t[i].badge, color: v } }; set('items', t); }} />
            </div>
            <Field label="Institutional Description"><TextArea value={item.description} onChange={v => { const t = [...data.items]; t[i] = { ...t[i], description: v }; set('items', t); }} rows={2} /></Field>
            <ImageUpload label="Card Image" value={item.img} onChange={v => { const t = [...data.items]; t[i] = { ...t[i], img: v }; set('items', t); }} />
          </div>
        ))}
      </div>
      <button onClick={() => set('items', [...(data.items || []), { title: '', description: '', path: '/', img: '', badge: { label: '', color: '#3B82F6' } }])}
        className="w-full py-4 rounded-2xl border-2 border-dashed border-indigo-100 text-indigo-400 font-black uppercase text-[10px] tracking-widest hover:border-indigo-300 hover:bg-indigo-50 transition-all">+ Add Solution Card</button>
    </div>
  ),

  resource_tile: ({ data = {}, set }) => (
    <div className="space-y-8">
      <SectionTitle>Resource Master Mirror</SectionTitle>
      <div className="bg-indigo-50/50 p-8 rounded-3xl border border-indigo-100 space-y-6">
        <h5 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2"><ImageIcon size={14}/> Home Page Preview (Tile)</h5>
        <Field label="Tile Title"><TextInput value={data.title} onChange={v => set('title', v)} /></Field>
        <Field label="Preview Summary"><TextArea value={data.description} onChange={v => set('description', v)} rows={2} /></Field>
        <ImageUpload label="Tile Cover Image" value={data.img} onChange={v => set('img', v)} />
        <Field label="Dynamic Slug (Identity)"><TextInput value={data.slug} onChange={v => set('slug', v)} placeholder="library-trends-2025" /></Field>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2"><FileText size={14}/> Inner Resource Content</h5>
        <Field label="Technical Headline"><TextInput value={data.inner?.headline} onChange={v => set('inner', { ...data.inner, headline: v })} /></Field>
        <Field label="Full Post Content (HTML/Markdown support)"><TextArea value={data.inner?.content} onChange={v => set('inner', { ...data.inner, content: v })} rows={8} /></Field>
        <div className="grid grid-cols-2 gap-4">
           <Field label="Downloadable Source (PDF)"><TextInput value={data.inner?.fileUrl} onChange={v => set('inner', { ...data.inner, fileUrl: v })} /></Field>
           <Field label="Consultation Label"><TextInput value={data.inner?.btnLabel} onChange={v => set('inner', { ...data.inner, btnLabel: v })} /></Field>
        </div>
      </div>
    </div>
  ),

  ready_to_scale: ({ data = {}, set }) => (
    <div className="space-y-6 bg-gray-50/50 p-8 rounded-3xl border border-gray-100">
      <SectionTitle>Strategic Growth Box</SectionTitle>
      <div className="grid grid-cols-2 gap-4">
         <ColorInput label="Box DNA (Background)" value={data.bgColor} onChange={v => set('bgColor', v)} />
         <ColorInput label="Text DNA" value={data.textColor} onChange={v => set('textColor', v)} />
      </div>
      <Field label="Core Headline"><TextInput value={data.title} onChange={v => set('title', v)} /></Field>
      <Field label="Strategic Sub-headline"><TextArea value={data.subtitle} onChange={v => set('subtitle', v)} rows={3} /></Field>
      <div className="grid grid-cols-2 gap-4">
         <Field label="Action Button Label"><TextInput value={data.btnLabel} onChange={v => set('btnLabel', v)} /></Field>
         <Field label="Target Identity (Path)"><TextInput value={data.btnPath} onChange={v => set('btnPath', v)} /></Field>
      </div>
    </div>
  ),

  free_consultation: ({ data = {}, set }) => (
    <div className="space-y-4 p-8 bg-blue-50/20 rounded-3xl border border-blue-50">
      <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2"><Lock size={14}/> Consultation Hook</h4>
      <div className="grid grid-cols-2 gap-4">
        <ColorInput label="Box Color" value={data.bgColor} onChange={v => set('bgColor', v)} />
        <Field label="Header Message"><TextInput value={data.title} onChange={v => set('title', v)} /></Field>
      </div>
      <Field label="Label DNA"><TextInput value={data.label} onChange={v => set('label', v)} /></Field>
      <Field label="Consultation Route"><TextInput value={data.path} onChange={v => set('path', v)} /></Field>
    </div>
  ),

  school_partners: ({ data = {}, set }) => (
    <div className="space-y-6">
      <SectionTitle>Institutional Relationships</SectionTitle>
      <Field label="Section Header"><TextInput value={data.heading} onChange={v => set('heading', v)} /></Field>
      <Field label="Partner Rostrum (comma separated names)">
        <TextArea value={(data.partners || []).join(', ')} onChange={v => set('partners', v.split(',').map(s => s.trim()))} rows={4} />
      </Field>
      <Field label="Relationship Matrix Link"><TextInput value={data.path} onChange={v => set('path', v)} /></Field>
    </div>
  ),

  quote_page_fields: ({ data = {}, set }) => (
    <div className="space-y-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
      <SectionTitle>Institutional Quote Verifier</SectionTitle>
      <Field label="Quote Submit Button"><TextInput value={data.submitLabel} onChange={v => set('submitLabel', v)} /></Field>
      <div className="grid grid-cols-2 gap-6 pt-4">
        <Field label="Lead Name Holder"><TextInput value={data.labels?.name} onChange={v => set('labels', { ...data.labels, name: v })} /></Field>
        <Field label="Institution Holder"><TextInput value={data.labels?.school} onChange={v => set('labels', { ...data.labels, school: v })} /></Field>
        <Field label="Jurisdiction PIN"><TextInput value={data.labels?.pincode} onChange={v => set('labels', { ...data.labels, pincode: v })} /></Field>
        <Field label="Hotline Holder"><TextInput value={data.labels?.phone} onChange={v => set('labels', { ...data.labels, phone: v })} /></Field>
      </div>
    </div>
  ),

  sidebar_banners: ({ data = {}, set }) => (
    <div className="space-y-6">
      <SectionTitle>Sidebar Banner Stack</SectionTitle>
      <div className="space-y-4">
        {(data.banners || []).map((b, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative group">
            <button onClick={() => set('banners', data.banners.filter((_, j) => j !== i))} className="absolute top-4 right-4 text-red-300 hover:text-red-500"><Trash2 size={16}/></button>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Field label="Title Label"><TextInput value={b.label} onChange={v => { const t = [...data.banners]; t[i] = { ...t[i], label: v }; set('banners', t); }} /></Field>
              <ColorInput label="Banner DNA" value={b.color} onChange={v => { const t = [...data.banners]; t[i] = { ...t[i], color: v }; set('banners', t); }} />
            </div>
            <Field label="Institutional Sub-label"><TextInput value={b.sublabel} onChange={v => { const t = [...data.banners]; t[i] = { ...t[i], sublabel: v }; set('banners', t); }} /></Field>
            <Field label="Target Route"><TextInput value={b.path} onChange={v => { const t = [...data.banners]; t[i] = { ...t[i], path: v }; set('banners', t); }} /></Field>
          </div>
        ))}
      </div>
      <button onClick={() => set('banners', [...(data.banners || []), { label: '', sublabel: '', color: '#0057A8', path: '/' }])}
        className="w-full py-4 rounded-xl border-2 border-dashed border-gray-100 text-gray-400 font-bold uppercase text-[9px] tracking-widest hover:border-gray-200">+ Add Banner Card</button>
    </div>
  ),

  product_carousel: ({ data = {}, set }) => (
    <div className="space-y-6">
        <SectionTitle>Product Carousel Intelligence</SectionTitle>
        {(data.items || []).map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative space-y-4">
                <button onClick={() => set('items', data.items.filter((_, j) => j !== i))} className="absolute top-4 right-4 text-red-300"><Trash2 size={16}/></button>
                <div className="grid grid-cols-2 gap-4">
                    <Field label="Product Identity"><TextInput value={item.title} onChange={v => { const s = [...data.items]; s[i] = { ...s[i], title: v }; set('items', s); }} /></Field>
                    <Field label="Pricing Point"><TextInput value={item.price} onChange={v => { const s = [...data.items]; s[i] = { ...s[i], price: v }; set('items', s); }} /></Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Field label="Detail Matrix Route"><TextInput value={item.path} onChange={v => { const s = [...data.items]; s[i] = { ...s[i], path: v }; set('items', s); }} /></Field>
                    <Field label="Cart Identity Link"><TextInput value={item.cartLink} onChange={v => { const s = [...data.items]; s[i] = { ...s[i], cartLink: v }; set('items', s); }} /></Field>
                </div>
                <ImageUpload label="Product Visual" value={item.img} onChange={v => { const s = [...data.items]; s[i] = { ...s[i], img: v }; set('items', s); }} />
            </div>
        ))}
        <button onClick={() => set('items', [...(data.items || []), { title: '', price: '', img: '', path: '#', cartLink: '#' }])}
            className="w-full py-6 rounded-3xl border-2 border-dashed border-gray-100 text-[10px] font-black uppercase tracking-widest">+ Inject Product Tile</button>
    </div>
  ),

  tiles: ({ data = {}, set }) => (
    <div className="space-y-6">
      <SectionTitle>Institutional Grid Matrix (Masonry)</SectionTitle>
      <div className="space-y-4">
        {(data.tiles || []).map((t, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative group">
            <button onClick={() => set('tiles', data.tiles.filter((_, j) => j !== i))} className="absolute top-4 right-4 text-red-300 hover:text-red-500"><Trash2 size={16}/></button>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Field label="Tile Heading"><TextInput value={t.title} onChange={v => { const x = [...data.tiles]; x[i] = { ...x[i], title: v }; set('tiles', x); }} /></Field>
              <Field label="Target Path"><TextInput value={t.path} onChange={v => { const x = [...data.tiles]; x[i] = { ...x[i], path: v }; set('tiles', x); }} /></Field>
            </div>
            <Field label="Brief Subtitle"><TextInput value={t.subtitle} onChange={v => { const x = [...data.tiles]; x[i] = { ...x[i], subtitle: v }; set('tiles', x); }} /></Field>
            <ImageUpload label="Tile Cover Visual" value={t.img} onChange={v => { const x = [...data.tiles]; x[i] = { ...x[i], img: v }; set('tiles', x); }} />
          </div>
        ))}
      </div>
      <button onClick={() => set('tiles', [...(data.tiles || []), { title: '', subtitle: '', path: '/', img: '' }])}
        className="w-full py-6 rounded-3xl border-2 border-dashed border-gray-100 text-[10px] font-black uppercase tracking-widest">+ Append Grid Node</button>
    </div>
  ),

  cta_whatsapp: ({ data = {}, set }) => (
    <div className="space-y-4 p-8 bg-green-50/20 rounded-3xl border border-green-100">
      <SectionTitle>WhatsApp Direct Strategy</SectionTitle>
      <div className="grid grid-cols-2 gap-4">
         <Field label="WhatsApp Group ID/Link"><TextInput value={data.whatsappUrl} onChange={v => set('whatsappUrl', v)} placeholder="https://chat.whatsapp.com/..." /></Field>
         <Field label="Button Command"><TextInput value={data.btnLabel} onChange={v => set('btnLabel', v)} placeholder="Join Discussion" /></Field>
      </div>
      <div className="p-4 bg-green-50 flex items-center gap-3 rounded-2xl">
         <MessageSquare className="text-green-600" size={20} />
         <p className="text-[10px] text-green-700 font-bold uppercase tracking-widest">Connects institutional leads directly to your moderated community thread.</p>
      </div>
    </div>
  )
};

// ── Page Icon & Color Mapping ───────────────────────────────────────────────
const PAGE_META = {
  products: { icon: Package, color: 'bg-emerald-600', iconColor: 'text-emerald-600', title: 'Product Manager' },
  home: { icon: Globe, color: 'bg-blue-500', iconColor: 'text-blue-500' },
  furniture: { icon: Layers, color: 'bg-orange-500', iconColor: 'text-orange-500' },
  'school-building-design': { icon: Box, color: 'bg-purple-500', iconColor: 'text-purple-500' },
  digital: { icon: Video, color: 'bg-cyan-500', iconColor: 'text-cyan-500' },
  sports: { icon: Globe, color: 'bg-red-500', iconColor: 'text-red-500' },
  libraries: { icon: FileText, color: 'bg-emerald-500', iconColor: 'text-emerald-500' },
  environments: { icon: Layers, color: 'bg-green-500', iconColor: 'text-green-500' },
  aboutus: { icon: Lock, color: 'bg-indigo-500', iconColor: 'text-indigo-500' },
  'contact-us': { icon: Globe, color: 'bg-pink-500', iconColor: 'text-pink-500' },
  mathematics: { icon: Type, color: 'bg-blue-600', iconColor: 'text-blue-600' },
  science: { icon: Video, color: 'bg-indigo-600', iconColor: 'text-indigo-600' },
  labs: { icon: Layers, color: 'bg-teal-500', iconColor: 'text-teal-500' },
  design: { icon: Palette, color: 'bg-rose-500', iconColor: 'text-rose-500' },
  manufacturing: { icon: Box, color: 'bg-gray-600', iconColor: 'text-gray-600' },
  corporate: { icon: Globe, color: 'bg-slate-700', iconColor: 'text-slate-700' },
  catalogues: { icon: List, color: 'bg-amber-500', iconColor: 'text-amber-500' },
  guides: { icon: FileText, color: 'bg-blue-400', iconColor: 'text-blue-400' },
  'school-sale': { icon: Globe, color: 'bg-orange-600', iconColor: 'text-orange-600' },
  partnerships: { icon: Globe, color: 'bg-yellow-500', iconColor: 'text-yellow-500' },
  'setup-guide': { icon: FileText, color: 'bg-cyan-600', iconColor: 'text-cyan-600' },
};

const getPageMeta = (slug) => PAGE_META[slug] || { icon: FileText, color: 'bg-indigo-500', iconColor: 'text-indigo-500' };

// ── Main Controller Component ────────────────────────────────────────────────
export default function CMSEditor() {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [activeBlockId, setActiveBlockId] = useState(null);

  useEffect(() => {
    getAllPages()
      .then(setPages)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const selectPage = (slug) => {
    setPageLoading(true);
    setSelectedPage(slug);
    getPage(slug)
      .then(p => {
        setContent(p.blocks || []);
        if (p.blocks?.length) setActiveBlockId(p.blocks[0].id);
      })
      .catch(console.error)
      .finally(() => setPageLoading(false));
  };

  const handleUpdate = async (blockId, data) => {
    try {
      await updateBlock(blockId, data);
      clearCMSCache();
      setContent(content.map(b => b.id === blockId ? { ...b, data, isDirty: false } : b));
    } catch (e) {
      alert("Logic Update Failed: " + e.message);
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full shadow-indigo-500/20 shadow-2xl" /></div>;

  return (
    <div className="bg-gray-50/50 min-h-screen">
      {/* Institutional Command Console */}
      <div className="p-10 max-w-7xl mx-auto min-w-0 min-h-screen">
        {!selectedPage ? (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
             <div className="space-y-2">
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Command Hub</h2>
                <p className="text-sm text-gray-400 font-medium">Select a module to initialize total administrative sovereignty.</p>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                {/* Special Product Manager Injector */}
                <button 
                  onClick={() => selectPage('products')}
                  className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-emerald-100 transition-all duration-500 text-left flex flex-col h-full"
                >
                  <div className={`w-16 h-16 rounded-3xl bg-emerald-600 bg-opacity-10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                    <Package className="text-emerald-600" size={32} />
                  </div>
                  <div className="mt-auto">
                    <h4 className="text-lg font-black text-gray-900 uppercase tracking-tighter mb-1 leading-tight group-hover:text-emerald-600 transition-colors uppercase">
                      Product Data & Bulk Upload
                    </h4>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">/products</p>
                  </div>
                </button>

                {pages.map((p) => {
                  const meta = getPageMeta(p.slug);
                  const Icon = meta.icon;
                  return (
                    <button 
                      key={p.slug}
                      onClick={() => selectPage(p.slug)}
                      className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all duration-500 text-left flex flex-col h-full"
                    >
                      <div className={`w-16 h-16 rounded-3xl ${meta.color} bg-opacity-10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                        <Icon className={meta.iconColor} size={32} />
                      </div>
                      <div className="mt-auto">
                        <h4 className="text-lg font-black text-gray-900 uppercase tracking-tighter mb-1 leading-tight group-hover:text-indigo-600 transition-colors uppercase">
                          {p.title || p.name || p.slug}
                        </h4>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">/{p.slug}</p>
                      </div>
                    </button>
                  );
                })}
             </div>
          </div>
        ) : selectedPage === 'products' ? (
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-500 space-y-12">
             <div className="flex items-center justify-between bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => { setSelectedPage(null); setActiveBlockId(null); setPageLoading(false); }}
                    className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all group"
                  >
                    <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={24} />
                  </button>
                  <div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">PRODUCT COMMAND CENTER</h2>
                    <p className="text-[10px] font-black text-emerald-400 mt-2 uppercase tracking-[0.2em] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50"></span>
                      INVENTORY LIVE SYNC ACTIVE
                    </p>
                  </div>
                </div>
             </div>
             
             {/* Product Manager rendering */}
             <ProductManager />
             
          </div>
        ) : pageLoading ? (
          <div className="flex h-96 items-center justify-center"><div className="animate-spin w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full" /></div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-500 space-y-12">
            {/* Header / Nav */}
            <div className="flex items-center justify-between bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setSelectedPage(null)}
                  className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all group"
                >
                  <ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={24} />
                </button>
                <div>
                  <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">{selectedPage} COMMAND CENTER</h2>
                  <p className="text-[10px] font-black text-indigo-400 mt-2 uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50"></span>
                    OPERATIONAL STATUS: LIVE SYNC ACTIVE
                  </p>
                </div>
              </div>
              <button 
                className="px-8 py-4 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-600/20 hover:scale-105 transition-all flex items-center gap-3"
                onClick={() => window.open(selectedPage === 'home' ? '/' : `/${selectedPage}`, '_blank')}
              >
                 <Eye size={16} /> Preview LIVE
              </button>
            </div>

            <div className="flex gap-12 items-start">
               {/* Fixed Block Navigator (Sub-Categories) */}
               <div className="w-72 sticky top-10 space-y-4 shrink-0">
                  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                     <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Page Modules</h4>
                     <div className="space-y-2">
                        {content.map((block, idx) => (
                          <button 
                            key={`nav-${block.id}`}
                            onClick={() => document.getElementById(`block-${block.id}`).scrollIntoView({ behavior: 'smooth', block: 'center' })}
                            className="w-full text-left px-4 py-3 rounded-xl hover:bg-indigo-50 group transition-all flex items-center gap-3"
                          >
                             <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center text-[10px] font-black text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">{idx + 1}</div>
                             <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest truncate group-hover:text-indigo-900">{block.key || block.type}</span>
                          </button>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Block Editors */}
               <div className="flex-1 space-y-10 min-w-0">
                  {content.map((block, idx) => {
                    const Form = BlockForms[block.type];
                    const isValidForm = typeof Form === 'function';
                    return (
                      <div id={`block-${block.id}`} key={block.id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] overflow-hidden transition-all hover:shadow-[0_48px_96px_-32px_rgba(67,56,202,0.1)] group scroll-mt-20">
                         <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/10">
                            <div className="flex items-center gap-6">
                               <div className="bg-indigo-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-600/30 ring-4 ring-indigo-50">{idx + 1}</div>
                               <div>
                                 <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">{block.key || block.type}</h3>
                                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">MODULE ARCHETYPE: {block.type}</p>
                               </div>
                            </div>
                         </div>
                         <div className="p-10 bg-white">
                            {isValidForm ? (
                              <Form data={block.data} set={(field, val) => {
                                const newData = { ...block.data };
                                const keys = field.split('.');
                                let obj = newData;
                                for(let i=0; i<keys.length-1; i++) {
                                  if(!obj[keys[i]]) obj[keys[i]] = {};
                                  obj = obj[keys[i]];
                                }
                                obj[keys[keys.length-1]] = val;
                                setContent(content.map(b => b.id === block.id ? { ...b, data: newData, isDirty: true } : b));
                              }} />
                            ) : (
                               <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
                                 <p className="text-gray-300 italic font-medium text-sm font-black uppercase tracking-widest">Advanced Block Template Unlocked</p>
                                 <pre className="text-[10px] text-gray-400 mt-4 text-left p-6 bg-gray-50 rounded-xl overflow-x-auto mx-10">{JSON.stringify(block.data, null, 2)}</pre>
                               </div>
                            )}

                            <div className="mt-10 pt-10 border-t border-gray-50 flex items-center justify-between">
                               <div className="flex items-center gap-4">
                                 {block.isDirty && (
                                   <span className="flex items-center gap-2 text-[10px] font-black text-amber-500 uppercase tracking-widest animate-pulse">
                                     <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> Unsaved Modifications
                                   </span>
                                 )}
                               </div>
                               <div className="flex items-center gap-3">
                                 <button 
                                   onClick={() => handleUpdate(block.id, block.data)}
                                   disabled={!block.isDirty}
                                   className={`flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                                     block.isDirty 
                                     ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 hover:scale-105 active:scale-95' 
                                     : 'bg-gray-50 text-gray-300 cursor-not-allowed opacity-50'
                                   }`}>
                                   <Save size={14} />
                                   {block.isDirty ? 'Publish Changes' : 'All Changes Synced'}
                                 </button>
                               </div>
                            </div>
                         </div>
                      </div>
                    );
                  })}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
