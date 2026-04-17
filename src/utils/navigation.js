export const handleProductClick = (product, navigate, forceExternal = false) => {
  // 1. If an explicit external link is provided, use it
  if (product.ctaLink && (product.ctaLink.startsWith('http') || product.ctaLink.startsWith('www'))) {
    let url = product.ctaLink;
    if (url.startsWith('www')) url = `https://${url}`;
    window.open(url, '_blank');
    return;
  }

  // 2. If it's an internal path
  if (product.ctaLink && product.ctaLink.startsWith('/')) {
    navigate(product.ctaLink);
    return;
  }

  // 3. Fallback logic
  if (forceExternal) {
    const searchName = product.name || product.title || "";
    window.open(`https://schoolmart.store/search?q=${encodeURIComponent(searchName)}`, '_blank');
  } else {
    navigate(`/product/${product.slug}`);
  }
};
