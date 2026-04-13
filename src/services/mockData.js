// src/services/mockData.js
export const mockPages = {
  home: {
    slug: 'home',
    title: 'Welcome to SchoolMart',
    blocks: [
      { id: 'b1', type: 'hero', content: { title: 'Premium School Solutions', subtitle: 'Innovative furniture and tools for modern education.' } },
      { id: 'b2', type: 'text', content: { body: 'We provide end-to-end solutions for schools, from furniture to digital infrastructure.' } }
    ]
  },
  aboutus: {
    slug: 'aboutus',
    title: 'About Us',
    blocks: [
      { id: 'a1', type: 'text', content: { body: 'SchoolMart has been serving educational institutions for over 10 years.' } }
    ]
  },
  corporate: {
    slug: 'corporate',
    title: 'Corporate Information',
    blocks: [
      { id: 'c1', type: 'text', content: { body: 'Our corporate mission is to empower the next generation.' } }
    ]
  }
};

export const mockProducts = [
  { id: 1, name: 'Ergonomic Desk', category: 'furniture', price: 1500, description: 'High-quality ergonomic desk for students.', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: 'Science Kit', category: 'science', price: 500, description: 'Basic chemistry set for middle school.', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800' },
  { id: 3, name: 'Interactive Whiteboard', category: 'digital', price: 12000, description: '75-inch touch-sensitive smart board.', image: 'https://images.unsplash.com/photo-1544650030-3c99ac2b20b1?auto=format&fit=crop&q=80&w=800' }
];

export const mockSettings = {
  footer: {
    copyright: '© 2026 SchoolMart. All rights reserved.',
    links: [
      { name: 'Terms of Service', url: '/terms' },
      { name: 'Privacy Policy', url: '/privacy' }
    ]
  },
  branding: {
    logo: '/logo.png',
    primaryColor: '#003366'
  }
};
