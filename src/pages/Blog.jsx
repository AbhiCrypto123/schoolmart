import React from 'react';
import { useCMSPage } from '../hooks/useCMSBlock';

const DEFAULT_POSTS = [
  { date: 'OCT 24, 2023', title: 'The Impact of NEP 2020 on School Infrastructure', excerpt: 'How modular workspaces are revolutionizing Indian classrooms.' },
  { date: 'SEP 12, 2023', title: 'Modernizing Science Labs for Secondary Schools', excerpt: 'A guide to building future-ready laboratories that inspire discovery.' },
];

const Blog = () => {
    const { blocks } = useCMSPage('blog');
    const hero = blocks?.page_hero || {};
    const postsCMS = blocks?.blog_posts?.items;
    const posts = postsCMS?.length ? postsCMS : DEFAULT_POSTS;

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-20">
                <h1 className="text-6xl lg:text-8xl font-black text-gray-900 uppercase tracking-tighter mb-4"
                    dangerouslySetInnerHTML={{ __html: hero.titleHtml || 'Institutional <span class="text-sm-blue">Insights</span>' }} />
                {hero.subtitle && <p className="text-xl text-gray-400 mb-12">{hero.subtitle}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                    {posts.map((post, idx) => (
                        <div key={idx} className="group cursor-pointer">
                            {post.img ? (
                                <img src={post.img} alt={post.title} className="w-full aspect-[16/9] rounded-[32px] mb-6 object-cover group-hover:scale-[1.02] transition-transform duration-700" />
                            ) : (
                                <div className="aspect-[16/9] bg-gray-100 rounded-[32px] mb-6 overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-100 group-hover:scale-105 transition-transform duration-700" />
                                </div>
                            )}
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-sm-blue mb-3">{post.date}</div>
                            <h2 className="text-2xl font-black uppercase tracking-tight group-hover:text-sm-blue transition-colors mb-4 leading-tight">{post.title}</h2>
                            <p className="text-gray-500 font-medium leading-relaxed">{post.excerpt}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Blog;
