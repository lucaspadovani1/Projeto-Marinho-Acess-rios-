import React from 'react';
import { Camera, ArrowRight, Store, MapPin, Phone, Clock, Navigation, Heart, CheckCircle2 } from 'lucide-react';

export const InstagramAndLocation: React.FC = () => {
  const instagramPosts = [
    {
      image: '/assets/aistudio/frente-loja.png',
      title: 'Fachada da nossa loja em Cascavel - PR com Chevettes de clientes e amigos!',
      tag: '#MarinhoAcessorios #CascavelPR #Chevettes',
    },
    {
      image: '/assets/aistudio/chevettao.png',
      title: 'Chevette DL Street/Arrancada montado com nossos acessórios e acabamentos.',
      tag: '#ChevetteDL #Arrancada #ClassicosGM',
    },
    {
      image: '/assets/aistudio/carrao2.png',
      title: 'Karmann Ghia e Fusca clássicos em exposição com acabamento impecável.',
      tag: '#KarmannGhia #Aircooled #EncontroDeAntigos',
    },
    {
      image: '/assets/aistudio/chevette-corsa.png',
      title: 'Chevette DL verde clássico e Corsa reunidos na comunidade de apaixonados.',
      tag: '#Chevette #Corsa #GMClube #Restauração',
    },
  ];

  return (
    <section id="localizacao" className="py-12 px-4 lg:px-8 bg-[#f9f9ff]">
      <div className="max-w-[80rem] mx-auto flex flex-col gap-12">
        {/* Feed Instagram */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-[#7e5700]">
                <Camera className="w-4 h-4" />
                <span className="text-[11px] font-mono uppercase font-bold tracking-wider">
                  Comunidade &amp; Projetos Reais
                </span>
              </div>
              <h2 className="font-barlow text-3xl sm:text-4xl font-bold uppercase text-[#000d36] tracking-wide">
                Acompanhe @marinhoacessorios no Instagram
              </h2>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#000d36] hover:text-[#7e5700] flex items-center gap-1"
            >
              Seguir perfil oficial <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {instagramPosts.map((post, index) => (
              <a
                key={index}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square bg-[#ededf4] rounded-xl overflow-hidden shadow-xs border border-gray-100 block"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (!target.src.includes('carrao2.png')) {
                      target.src = '/assets/aistudio/carrao2.png';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-[#000d36]/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center text-white">
                  <Heart className="w-7 h-7 text-[#ffb61d] fill-current mb-2" />
                  <span className="text-xs font-medium leading-snug line-clamp-2">
                    {post.title}
                  </span>
                  <span className="text-[10px] font-mono text-[#ffb61d] mt-1">
                    {post.tag}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Localização Física em Cascavel - PR */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Informações da Loja Física (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-[#7e5700]">
                  <Store className="w-4 h-4" />
                  <span className="text-[11px] font-mono uppercase font-bold tracking-wider">
                    Balcão Físico &amp; Atendimento Presencial
                  </span>
                </div>
                <h3 className="font-barlow text-2xl sm:text-3xl font-bold uppercase text-[#000d36] tracking-wide mt-1">
                  Nossa Loja em Cascavel - PR
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Conheça nosso balcão e estoque físico em Cascavel. Venha conferir os acabamentos
                de perto, testar encaixes e consultar peças de restauração com nossa equipe especializada.
              </p>

              <div className="flex flex-col gap-2.5 text-xs text-[#1a1b21]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#ffb61d] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#000d36]">Endereço:</strong>
                    <br />
                    Rua Erechim, 390 - Centro / Região do Lago 1<br />
                    Cascavel - PR | CEP: 85812-010
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#ffb61d] shrink-0" />
                  <div>
                    <strong className="text-[#000d36]">Telefone:</strong> (45) 3037-2929
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#ffb61d] shrink-0" />
                  <div>
                    <strong className="text-[#000d36]">Horários:</strong> Seg a Sex das 08h às
                    18h | Sáb das 08h às 12h
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Rua+Erechim+390+Cascavel+PR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#000d36] hover:bg-[#0e2257] text-white font-semibold text-xs py-3 px-5 rounded-lg shadow-sm transition-colors"
                >
                  <Navigation className="w-4 h-4 text-[#ffb61d]" />
                  Traçar Rota no Google Maps
                </a>
              </div>
            </div>

            {/* Fachada Real & Informações da Loja (7 cols) */}
            <div className="lg:col-span-7">
              <div className="w-full h-80 rounded-xl overflow-hidden shadow-md bg-[#000d36] relative border border-gray-200 group">
                <img
                  src="/assets/aistudio/frente-loja.png"
                  alt="Fachada Marinho Acessórios Cascavel PR"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000d36]/90 via-[#000d36]/30 to-transparent flex flex-col justify-end p-5">
                  <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center justify-between gap-4 max-w-md border border-white/40">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#000d36] flex items-center justify-center text-[#ffb61d] shrink-0 shadow-sm">
                        <Store className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-barlow text-base text-[#000d36] uppercase font-bold leading-tight">
                          Marinho Acessórios
                        </h4>
                        <p className="text-[11px] text-gray-600">R. Erechim, 390 - Cascavel, Paraná</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-[#00a34a] font-bold shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Loja Física</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

