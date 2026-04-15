// src/hooks/useCMSBlock.js
// Custom hook that fetches a specific block from a CMS page
import { useState, useEffect } from 'react';
import { getPage } from '../services/api';

const cache = {};      // { [slug]: { data, version, ts } }
let cacheVersion = 0;
const listeners = new Set();
const CACHE_TTL_MS = 60_000; // 60 s — always re-fetch after 1 minute

// ── Cross-tab invalidation via BroadcastChannel ─────────────────────────────
const bc = typeof BroadcastChannel !== 'undefined'
  ? new BroadcastChannel('cms-cache-v1')
  : null;

if (bc) {
  bc.onmessage = ({ data: msg }) => {
    if (msg?.type === 'clear') {
      cacheVersion++;
      if (msg.slug) {
        delete cache[msg.slug];
      } else {
        Object.keys(cache).forEach(k => delete cache[k]);
      }
      listeners.forEach(l => l(cacheVersion));
    }
  };
}

// Call this after any admin save to force a fresh fetch on next page visit
export function clearCMSCache(slug) {
  cacheVersion++;
  if (slug) {
    delete cache[slug];
  } else {
    Object.keys(cache).forEach(k => delete cache[k]);
  }
  listeners.forEach(l => l(cacheVersion));
  // Broadcast to ALL other open tabs/windows
  bc?.postMessage({ type: 'clear', slug: slug || null });
}

export function useCMSPage(slug) {
  const [blocks, setBlocks] = useState(cache[slug]?.data || null);
  const [loading, setLoading] = useState(!cache[slug]);
  const [ver, setVer] = useState(cacheVersion);

  useEffect(() => {
    const unsub = (newVer) => setVer(newVer);
    listeners.add(unsub);

    const entry = cache[slug];
    const isFresh = entry
      && entry.version === ver
      && (Date.now() - entry.ts) < CACHE_TTL_MS;

    if (isFresh) {
      setBlocks(entry.data);
      setLoading(false);
    } else {
      setLoading(true);
      getPage(slug)
        .then(page => {
          const indexed = {};
          (page.blocks || []).forEach(b => {
            if (b.isVisible !== false) {
              indexed[b.key] = b.data;
              if (b.type && b.type !== b.key) {
                indexed[b.type] = b.data;
              }
            }
          });
          cache[slug] = { data: indexed, version: cacheVersion, ts: Date.now() };
          setBlocks(indexed);
        })
        .catch(() => setBlocks({}))
        .finally(() => setLoading(false));
    }

    return () => {
      listeners.delete(unsub);
    };
  }, [slug, ver]);

  return { blocks, loading };
}

export function useCMSBlock(slug, blockType, fallback = {}) {
  const { blocks, loading } = useCMSPage(slug);
  const data = blocks?.[blockType];
  return { data: data ?? fallback, loading };
}

export function useFormConfig(slug) {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('../services/api').then(api => {
      api.getFormConfig(slug)
        .then(res => setConfig(res))
        .catch(() => setConfig(null))
        .finally(() => setLoading(false));
    });
  }, [slug]);

  return { config, loading };
}
