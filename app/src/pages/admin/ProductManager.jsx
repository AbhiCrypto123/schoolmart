// src/pages/admin/ProductManager.jsx — Premium redesign
import { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct, getAllPages } from '../../services/api';
import { Package, Plus, Search, Filter, Edit3, Trash2, Star, Tag, Layers, ChevronDown } from 'lucide-react';
import ImageUpload from '../../components/admin/ImageUpload';

export default function ProductManager({ fixedPage, liveCategories }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [pagesData, setPagesData] = useState([]);

  const load = () => {
    getProducts().then(setProducts).finally(() => setLoading(false));
    getAllPages().then(setPagesData).catch(() => {});
  };
  useEffect(() => { load(); }, []);

  // Auto-build list of pages and subcategories for the dropdowns
  const assignablePages = pagesData
    // We only care about the 9 catalogue pages for assigning cards
    .filter(p => ['furniture', 'architecture', 'digital', 'sports', 'libraries', 'labs', 'mathematics', 'science', 'design'].includes(p.pageSlug))
    .map(p => {
       // Pull subcategories directly defined in the CMS block
       let blockCats = p.blocks?.find(b => b.blockType === 'sidebar_categories')?.data?.categories || [];
       
       // If this IS the fixedPage we are editing in CMSEditor, use the LIVE unsaved categories
       if (liveCategories && (fixedPage === p.pageTitle || fixedPage === p.pageSlug)) {
         blockCats = liveCategories;
       }

       // Intelligently scan all existing products assigned to this page to see what subcategories actually exist
       const productCats = products.filter(prod => prod.category === p.pageTitle).map(prod => prod.subcategory).filter(Boolean);
       
       return {
         title: p.pageTitle,
         categories: [...new Set([...blockCats, ...productCats])] // Combine and deduplicate
       };
    });


  const handleSave = async (e) => {
    e.preventDefault();
    if (editing._id) await updateProduct(editing._id, editing);
    else await createProduct(editing);
    setEditing(null);
    load();
  };

  const remove = async (id) => {
    if (!confirm('Are you sure you want to delete this card?')) return;
    await deleteProduct(id);
    load();
  };

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
  const filtered = products.filter(p => {
    if (fixedPage && p.category !== fixedPage) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    
    // Case-insensitive subcategory or category filter
    if (filterCat) {
      if (!fixedPage && p.category !== filterCat) return false;
      if (fixedPage && (p.subcategory || '').toUpperCase() !== filterCat.toUpperCase()) return false;
    }
    return true;
  });

  // If fixedPage is setting, the filter dropdown should show subcategories, not root categories
  const dropdownOptions = fixedPage 
    ? [...new Set(products.filter(p => p.category === fixedPage).map(p => p.subcategory).filter(Boolean))]
    : categories;

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full" /></div>;

  if (editing) return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden max-w-3xl mx-auto">
      <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-gray-800">{editing._id ? 'Edit Card' : 'New Card'}</h2>
          <p className="text-xs text-gray-400 font-medium">{editing._id ? 'Update card details' : 'Add a new card to an inner page'}</p>
        </div>
        <button onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-600 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">Cancel</button>
      </div>

      <form onSubmit={handleSave} className="p-6 space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-2 space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Card Name *</label>
            <input required value={editing.name || ''} onChange={e => setEditing({ ...editing, name: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. STEM Hub Setup" />
          </div>
          {!fixedPage && (
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Assigned Page *</label>
              <div className="relative">
                <select required value={editing.category || ''} onChange={e => setEditing({ ...editing, category: e.target.value, subcategory: '' })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none font-bold text-gray-700">
                  <option value="">Select Page...</option>
                  {assignablePages.map(p => <option key={p.title} value={p.title}>{p.title}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-3 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
          )}
          <div className={fixedPage ? "col-span-2 space-y-1" : "space-y-1"}>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sidebar Category / Tab *</label>
            <div className="relative">
              <select required value={editing.subcategory || ''} onChange={e => setEditing({ ...editing, subcategory: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none font-bold text-gray-700" disabled={!fixedPage && !editing.category}>
                <option value="">Select Tab...</option>
                {assignablePages.find(p => p.title === (fixedPage || editing.category))?.categories?.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-3 text-gray-400 pointer-events-none" size={16} />
            </div>
            {fixedPage && (
              <p className="text-[9px] text-gray-400 mt-1">
                * If you need a new subcategory tab, add it to the <b>"Category Sidebar Tabs"</b> block above first.
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Description (Execution Strategy text)</label>
          <textarea value={editing.description || ''} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={3} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y" placeholder="Short description..." />
        </div>

        {/* STATS */}
        <div className="space-y-2 pt-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Card Metrics (Top Right Stats)</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
             {[0, 1, 2].map(i => (
                <div key={i} className="space-y-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
                   <p className="text-[9px] font-bold text-gray-400 uppercase">Stat {i+1}</p>
                   <input 
                     value={editing.stats?.[i]?.label || ''} 
                     onChange={e => {
                        const newStats = [...(editing.stats || [{},{},{}])];
                        newStats[i] = { ...newStats[i], label: e.target.value };
                        setEditing({ ...editing, stats: newStats });
                     }}
                     className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-500" placeholder="Label (e.g. IMPACT)" 
                   />
                   <input 
                     value={editing.stats?.[i]?.value || ''} 
                     onChange={e => {
                        const newStats = [...(editing.stats || [{},{},{}])];
                        newStats[i] = { ...newStats[i], value: e.target.value };
                        setEditing({ ...editing, stats: newStats });
                     }}
                     className="w-full px-3 py-2 text-xs font-bold border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-500" placeholder="Value (e.g. 98%)" 
                   />
                </div>
             ))}
          </div>
        </div>

        {/* RESOURCES */}
        <div className="space-y-2 pt-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Downloadable Resources (Bottom Right PDF Links)</label>
          <div className="space-y-2">
             {[0, 1, 2].map(i => (
                <div key={i} className="flex flex-col md:flex-row gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
                   <input 
                     value={editing.resources?.[i]?.name || ''} 
                     onChange={e => {
                        const newRes = [...(editing.resources || [{},{},{}])];
                        newRes[i] = { ...newRes[i], name: e.target.value };
                        setEditing({ ...editing, resources: newRes });
                     }}
                     className="flex-[2] px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-500" placeholder="File Name (e.g. Technical Specs)" 
                   />
                   <input 
                     value={editing.resources?.[i]?.size || ''} 
                     onChange={e => {
                        const newRes = [...(editing.resources || [{},{},{}])];
                        newRes[i] = { ...newRes[i], size: e.target.value };
                        setEditing({ ...editing, resources: newRes });
                     }}
                     className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-500" placeholder="Size (e.g. 2.4 MB)" 
                   />
                   <input 
                     value={editing.resources?.[i]?.url || ''} 
                     onChange={e => {
                        const newRes = [...(editing.resources || [{},{},{}])];
                        newRes[i] = { ...newRes[i], url: e.target.value };
                        setEditing({ ...editing, resources: newRes });
                     }}
                     className="flex-[2] px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-500" placeholder="URL (e.g. /files/spec.pdf)" 
                   />
                </div>
             ))}
          </div>
        </div>

        <ImageUpload 
          label="Card Image" 
          value={editing.images?.[0] || ''} 
          onChange={url => setEditing({ ...editing, images: [url] })} 
        />

        <div className="flex gap-6 pt-2">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" checked={editing.isFeatured || false} onChange={e => setEditing({ ...editing, isFeatured: e.target.checked })} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
            <span className="text-sm font-bold text-gray-700 flex items-center gap-1"><Star size={14} className="text-orange-400 fill-orange-400" /> Featured Card</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" checked={editing.isNewProduct || false} onChange={e => setEditing({ ...editing, isNewProduct: e.target.checked })} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
            <span className="text-sm font-bold text-gray-700 flex items-center gap-1"><Tag size={14} className="text-green-500" /> Mark as New</span>
          </label>
        </div>

        <div className="pt-5 border-t border-gray-100 flex justify-end">
          <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
            Save Card
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className={fixedPage ? "space-y-6" : "space-y-6"}>
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden md:w-96">
          <div className="pl-4 flex items-center text-gray-400"><Search size={16} /></div>
          <input
            type="text" placeholder={`Search ${fixedPage || 'all'} cards...`}
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-transparent px-3 py-2.5 text-sm focus:outline-none font-medium"
          />
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
              className="appearance-none pl-10 pr-10 py-2.5 bg-white border border-gray-100 shadow-sm rounded-2xl text-sm font-bold text-gray-700 outline-none cursor-pointer"
            >
              <option value="">{fixedPage ? 'All Subcategories' : 'All Categories'}</option>
              {dropdownOptions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <Filter size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm-blue pointer-events-none" />
            <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <button onClick={() => setEditing(fixedPage ? { category: fixedPage } : {})} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 whitespace-nowrap">
            <Plus size={16} /> <span className="hidden sm:inline">Add Card</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <Package className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <h3 className="text-lg font-black text-gray-900 mb-1">No cards found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search or add a new card.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filtered.map(p => (
            <div key={p._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group overflow-hidden flex flex-col">
              {/* Image Area */}
              <div className="aspect-square bg-gray-50 p-6 relative flex items-center justify-center">
                {p.images?.[0] ? (
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" onError={e => e.target.src='https://via.placeholder.com/300?text=No+Image'} />
                ) : (
                  <Package size={40} className="text-gray-200" />
                )}
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {p.isFeatured && <span className="bg-white/90 backdrop-blur text-orange-600 p-1.5 rounded-full shadow-sm" title="Featured"><Star size={12} className="fill-orange-500" /></span>}
                  {p.isNewProduct && <span className="bg-white/90 backdrop-blur text-green-600 font-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">NEW</span>}
                </div>
                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                  <button onClick={() => setEditing(p)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 hover:scale-110 hover:bg-blue-50 transition-all shadow-lg" title="Edit">
                    <Edit3 size={18} />
                  </button>
                  <button onClick={() => remove(p._id)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 hover:scale-110 hover:bg-red-50 transition-all shadow-lg" title="Delete">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Data Area */}
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  {!fixedPage ? (
                    <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">
                      <Layers size={10} /> {p.category}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                      <Tag size={10} /> {p.subcategory}
                    </span>
                  )}
                  {!fixedPage && p.subcategory && <span className="text-[10px] text-gray-400 font-semibold truncate">{p.subcategory}</span>}
                </div>
                <h3 className="font-bold text-sm text-gray-800 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">{p.name}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
