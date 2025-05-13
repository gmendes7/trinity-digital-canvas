
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { ArrowLeft } from 'lucide-react';

// This would typically come from an API or CMS
const blogPosts = [
  {
    id: 1,
    title: "O futuro do desenvolvimento web em 2025",
    excerpt: "Descubra as tendências que estão moldando o futuro do desenvolvimento web e como se preparar para elas.",
    date: "10 de Maio, 2025",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
    content: `
      <p>O desenvolvimento web está em constante evolução, e acompanhar as tendências é essencial para se manter relevante no mercado. Neste artigo, vamos explorar as principais tendências que estão moldando o futuro do desenvolvimento web em 2025.</p>
      
      <h2>1. Inteligência Artificial e Machine Learning</h2>
      <p>A integração de IA e Machine Learning no desenvolvimento web está se tornando cada vez mais comum. Desde chatbots inteligentes até sistemas de recomendação personalizados, essas tecnologias estão transformando a maneira como interagimos com as aplicações web.</p>
      
      <h2>2. Progressive Web Apps (PWAs)</h2>
      <p>As PWAs continuam ganhando popularidade, oferecendo experiências semelhantes a aplicativos nativos diretamente do navegador. Com recursos offline, notificações push e tempos de carregamento rápidos, as PWAs são uma excelente opção para empresas que desejam oferecer uma experiência de usuário superior.</p>
      
      <h2>3. Jamstack e Arquiteturas Headless</h2>
      <p>A abordagem Jamstack (JavaScript, APIs e Markup) está revolucionando o desenvolvimento web, oferecendo melhor performance, segurança e escalabilidade. Combinada com arquiteturas headless, essa abordagem permite maior flexibilidade no desenvolvimento de interfaces de usuário.</p>
    `
  },
  {
    id: 2,
    title: "Como a IA está transformando o desenvolvimento de software",
    excerpt: "Explore como a inteligência artificial está revolucionando a maneira como desenvolvemos software.",
    date: "28 de Abril, 2025",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1200&auto=format&fit=crop",
    content: `
      <p>A inteligência artificial está transformando diversas indústrias, e o desenvolvimento de software não é exceção. Neste artigo, vamos explorar como a IA está mudando a maneira como desenvolvemos software.</p>
      
      <h2>1. Codificação Assistida por IA</h2>
      <p>Ferramentas de codificação assistida por IA, como GitHub Copilot e Tabnine, estão se tornando cada vez mais sofisticadas, permitindo que os desenvolvedores escrevam código mais rapidamente e com menos erros.</p>
      
      <h2>2. Testes Automatizados</h2>
      <p>A IA está revolucionando os testes de software, permitindo a criação e execução de testes mais inteligentes e eficientes, identificando bugs e problemas de desempenho que poderiam passar despercebidos em abordagens tradicionais.</p>
      
      <h2>3. Manutenção Preditiva</h2>
      <p>Sistemas de IA podem analisar padrões e identificar potenciais problemas antes que eles ocorram, permitindo uma manutenção preditiva e reduzindo o tempo de inatividade das aplicações.</p>
    `
  },
  {
    id: 3,
    title: "Dicas para otimizar a performance de aplicações React",
    excerpt: "Aprenda técnicas práticas para melhorar significativamente a performance de suas aplicações React.",
    date: "15 de Abril, 2025",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=1200&auto=format&fit=crop",
    content: `
      <p>O React é uma das bibliotecas mais populares para desenvolvimento de interfaces de usuário, mas criar aplicações React performáticas pode ser um desafio. Neste artigo, vamos compartilhar algumas dicas para otimizar o desempenho das suas aplicações React.</p>
      
      <h2>1. Use memo, useMemo e useCallback</h2>
      <p>Esses hooks do React podem ajudar a evitar renderizações desnecessárias, memorizando componentes, valores e funções.</p>
      
      <h2>2. Implementação de Code Splitting</h2>
      <p>O code splitting permite dividir seu código em chunks menores, carregando apenas o necessário para cada rota ou componente, melhorando significativamente os tempos de carregamento inicial.</p>
      
      <h2>3. Otimização de Imagens</h2>
      <p>Utilizar formatos modernos como WebP, implementar lazy loading e dimensionar corretamente as imagens pode melhorar drasticamente o desempenho da sua aplicação.</p>
    `
  }
];

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(post => post.id === Number(id));

  useEffect(() => {
    // Update the page title if post exists
    if (post) {
      document.title = `${post.title} | Trinity Tecnologias`;
    } else {
      document.title = 'Artigo não encontrado | Trinity Tecnologias';
    }
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-32 pb-16 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Artigo não encontrado</h1>
            <p className="mb-8">O artigo que você está procurando não existe ou foi removido.</p>
            <Link 
              to="/blog" 
              className="inline-block bg-black text-white px-8 py-4 rounded-md font-medium hover:bg-gray-800 transition-colors"
            >
              Voltar para o Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-32 pb-16 px-6">
        <article className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="h-64 md:h-96 overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:p-10">
            <Link 
              to="/blog" 
              className="flex items-center gap-2 text-gray-600 hover:text-black mb-6 transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Voltar para o Blog</span>
            </Link>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-500 mb-8">{post.date}</p>
            
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
