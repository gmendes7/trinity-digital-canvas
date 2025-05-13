
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "O futuro do desenvolvimento web em 2025",
      excerpt: "Descubra as tendências que estão moldando o futuro do desenvolvimento web e como se preparar para elas.",
      date: "10 de Maio, 2025",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=640&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Como a IA está transformando o desenvolvimento de software",
      excerpt: "Explore como a inteligência artificial está revolucionando a maneira como desenvolvemos software.",
      date: "28 de Abril, 2025",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=640&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Dicas para otimizar a performance de aplicações React",
      excerpt: "Aprenda técnicas práticas para melhorar significativamente a performance de suas aplicações React.",
      date: "15 de Abril, 2025",
      image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=640&auto=format&fit=crop"
    }
  ];

  return (
    <section id="blog" className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Blog</h2>
          <div className="w-20 h-1 bg-black mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Acompanhe nossos artigos sobre tecnologia, inovação e desenvolvimento de software.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className={cn(
                "bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow",
                "flex flex-col h-full border border-gray-100"
              )}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-sm text-gray-500 mb-2">{post.date}</span>
                <h3 className="text-xl font-bold mb-3 hover:text-gray-700">{post.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{post.excerpt}</p>
                <Link 
                  to={`/blog/${post.id}`} 
                  className="text-black font-medium hover:underline self-start mt-auto"
                >
                  Ler mais
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/blog" 
            className="inline-block bg-black text-white px-8 py-4 rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            Ver todos os artigos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
