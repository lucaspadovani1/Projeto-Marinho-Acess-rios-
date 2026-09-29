import React from 'react';
import { Camera, ArrowRight, Store, MapPin, Phone, Clock, Navigation, Heart, CheckCircle2 } from 'lucide-react';

export const InstagramAndLocation: React.FC = () => {
  const instagramPosts = [
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgPsP-c6E963PtBkq2uvk79NetmdKDvztOZAyyM5LadUP9N_q0vFjON5i8_vvKqCHMk5BtiUAxkLr_kbYrhSV4-sGqTeiukMSfAnEgHWBvT0U6RwT4nYWfspa-w-YR2ExtPLz8pD2clg59eIqc_aNDnVwEoJfp_Q45HSvoxHFdSJ6qQnt8dxmiE18GsnyqptNWPQRMFTJ_liuXkFyvemJScPILNi1r5rT4EwwGtravUk8LhEjLGJI',
      title: 'Projeto Chevette SL Tubarão finalizado com sucesso!',
      tag: '#ChevetteTubarão #Restauração',
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5cBtAylDJ7SgkjfB2OMh1Zbd3kFvvpSygR2JmvKeTkHZCuLwJLdn-E964-0xCgH_q7rN9V68bbC4XDJ98-XBrG2SydmP7MuHkw8rUz2sQMr3BEBvCvJ3h5_oYOpCC_iMdrBtE8CV9Ld_Koo6GjfzPoy_3PukOsFZ20Ib8QrxC6P7wGzIZGRkaBeiFBRnlKjKatEXoPASoCWowOKz4g0N5shCLh7dLQFdki1N5jc-5gLv7xt8TnqU',
      title: 'Novo lote de borrachas e canaletas originais no estoque.',
      tag: '#EstoqueAtivo #ProntaEntrega',
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyz38XyYtZF2yyzoEpI9kofRQxeFkq9PZ3VgefENicz2tU1sIE2wqkp7B-2m--tlB5kgudr1Yv8cJR1xh_UfFKH6p0_L_eyeGu_McNF2v16M77tPlZ7dOPnaFsySWVQuyJh9RYwikZjs6MQMAyQ4E41quEZAUrrKOGiYG_W7qSSwAYTvMlCY2jqvt-RP9VM9xieWYvvltXLkCY_jC6-C2jK__SP4766XfTjWQXIXrV2sWQTCeu1O8',
      title: 'Linha Quadrada VW: frisos e emblemas 100% instalados.',
      tag: '#GolGTS #GolGTI #Quadrados',
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKn7abZLcSLgrMMw4bUbxV-bmXWWQH3xaAQthCjtAra-auM4SXf3rawjUJa-Uv-bCgXFd36MB-Zva7v6Fz6rKjsinhwTLXetl6mwb3zNSxX3JdQe0sCy8c-Dbk0S-b8LsXxVm0ZcgUwqfhXyz5aM-XWRGiQVqmznkipbdLeP62GxBEC9qXTt2p58fVvRf_Oh9GYFl7XgJeM9rFA4Riy7GmLC9ITyMEzs0WZzXduk-kHUih917nlYo',
      title: 'Emblemas de Opala para envio prioritário a Curitiba-PR.',
      tag: '#OpalaComodoro #Diplomata',
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
                  Comunidade &amp; Projetos
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
                Venha tomar um café conosco, conferir os acabamentos no balcão e testar peças de
                restauração com nossa equipe técnica de pista.
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

            {/* Mapa Estilizado (7 cols) */}
            <div className="lg:col-span-7">
              <div className="w-full h-80 rounded-xl overflow-hidden shadow-inner bg-[#ededf4] relative border border-gray-200">
                {/* Visual Map Backdrop */}
                <div className="absolute inset-0 bg-[radial-gradient(#0e2257_1px,transparent_1px)] [background-size:16px_16px] opacity-15"></div>

                <div className="absolute inset-0 flex items-center justify-center p-4 bg-[#e8e7ef]/60 backdrop-blur-[2px]">
                  <div className="bg-white p-5 rounded-xl shadow-xl flex items-center gap-4 max-w-sm border border-gray-200">
                    <div className="w-12 h-12 rounded-full bg-[#000d36] flex items-center justify-center text-[#ffb61d] shrink-0 shadow-md">
                      <Store className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-barlow text-xl text-[#000d36] uppercase font-bold">
                        Marinho Acessórios
                      </h4>
                      <p className="text-xs text-gray-500">R. Erechim, 390 - Cascavel, Paraná</p>
                      <div className="flex items-center gap-1 text-[11px] text-[#00a34a] font-semibold mt-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Estacionamento Próprio no Local
                      </div>
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
