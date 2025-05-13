
import { useEffect } from 'react';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';

const Blog = () => {
  useEffect(() => {
    // Update the page title
    document.title = 'Blog | Trinity Tecnologias';
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "O futuro do desenvolvimento web em 2025",
      excerpt: "Descubra as tendências que estão moldando o futuro do desenvolvimento web e como se preparar para elas.",
      date: "10 de Maio, 2025",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=640&auto=format&fit=crop",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, eget ultricies nisl nisl eget ultricies. Donec euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, eget ultricies nisl nisl eget ultricies."
    },
    {
      id: 2,
      title: "Como a IA está transformando o desenvolvimento de software",
      excerpt: "Explore como a inteligência artificial está revolucionando a maneira como desenvolvemos software.",
      date: "28 de Abril, 2025",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=640&auto=format&fit=crop",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, eget ultricies nisl nisl eget ultricies. Donec euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, eget ultricies nisl nisl eget ultricies."
    },
    {
      id: 3,
      title: "Dicas para otimizar a performance de aplicações React",
      excerpt: "Aprenda técnicas práticas para melhorar significativamente a performance de suas aplicações React.",
      date: "15 de Abril, 2025",
      image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=640&auto=format&fit=crop",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, eget ultricies nisl nisl eget ultricies. Donec euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, eget ultricies nisl nisl eget ultricies."
    },
    {
      id: 4,
      title: "Segurança em aplicações web: práticas essenciais",
      excerpt: "Conheça as principais práticas para manter suas aplicações web seguras contra ameaças cibernéticas.",
      date: "2 de Abril, 2025",
      image: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=640&auto=format&fit=crop",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, eget ultricies nisl nisl eget ultricies. Donec euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, eget ultricies nisl nisl eget ultricies."
    },
    {
      id: 5,
      title: "Design Systems: por que sua empresa precisa de um",
      excerpt: "Entenda como um sistema de design pode melhorar a consistência e eficiência do seu produto digital.",
      date: "20 de Março, 2025",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=640&auto=format&fit=crop",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, eget ultricies nisl nisl eget ultricies. Donec euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, eget ultricies nisl nisl eget ultricies."
    },
    {
      id: 6,
      title: "A importância de testes automatizados no desenvolvimento moderno",
      excerpt: "Descubra como os testes automatizados podem aumentar a qualidade e confiabilidade do seu código.",
      date: "5 de Março, 2025",
      image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=640&auto=format&fit=crop",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, eget ultricies nisl nisl eget ultricies. Donec euismod, nisl eget ultricies ultricies, nunc nisl ultricies nunc, eget ultricies nisl nisl eget ultricies."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-16">
            Acompanhe nossos artigos sobre tecnologia, inovação e desenvolvimento de software.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col h-full border border-gray-100"
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
        </div>
      </div>
    </div>
  );
};

export default Blog;
