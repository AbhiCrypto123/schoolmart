import React from 'react';

const CMSMedia = ({ mediaType, mediaUrl, fallbackImg, className = "w-full h-full object-cover" }) => {
  const url = mediaUrl || fallbackImg;

  if (!url) return null;

  if (mediaType === 'video') {
    return (
      <video
        src={url}
        autoPlay
        loop
        muted
        playsInline
        className={className}
      />
    );
  }

  return (
    <img
      src={url}
      className={className}
      alt="Media Content"
      onError={(e) => {
        if (fallbackImg && e.target.src !== fallbackImg) {
          e.target.src = fallbackImg;
        }
      }}
    />
  );
};

export default CMSMedia;
