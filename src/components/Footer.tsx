import React from 'react';
import { Store, MapPin, Phone, Clock, MessageCircle, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onSelectNavTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectNavTab }) => {
  return (
    <footer className="w-full bg-[#020d26] text-white mt-16 border-t border-white/10">
      <div className="max-w-[80rem] mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Coluna 1: Logo & Manifesto */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => onSelectNavTab('inicio')}
              className="text-left cursor-pointer"
            >
              <BrandLogo size="md" variant="header" />
            </button>

            <p className="text-xs text-[#ededf4]/80 leading-relaxed mt-1">
              Referência nacional na restauração e preservação de clássicos da indústria automotiva
              brasileira: Chevette, Opala, Caravan, Gol Quadrado, Fusca e Corcel.
            </p>

            <div className="flex items-center gap-2 text-[#fab800] mt-2 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Loja Oficial &amp; Certificada</span>
            </div>
          </div>

          {/* Coluna 2: Navegação Técnica */}
          <div className="flex flex-col gap-3">
            <h3 className="font-barlow text-lg text-white uppercase tracking-wider font-bold">
              Navegação Técnica
            </h3>
            <ul className="flex flex-col gap-2 text-xs text-[#ededf4]/80">
              <li>
                <button
                  onClick={() => onSelectNavTab('inicio')}
                  className="hover:text-[#fab800] transition-colors cursor-pointer text-left"
                >
                  Página Inicial
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectNavTab('catalogo')}
                  className="hover:text-[#fab800] transition-colors cursor-pointer text-left"
                >
                  Catálogo Completo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectNavTab('veiculos')}
                  className="hover:text-[#fab800] transition-colors cursor-pointer text-left"
                >
                  Linha por Veículo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectNavTab('catalogo')}
                  className="hover:text-[#fab800] transition-colors cursor-pointer text-left"
                >
                  Categorias de Peças
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectNavTab('sobre')}
                  className="hover:text-[#fab800] transition-colors cursor-pointer text-left"
                >
                  Sobre a Empresa
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Atendimento & Loja Física */}
          <div className="flex flex-col gap-3">
            <h3 className="font-barlow text-lg text-white uppercase tracking-wider font-bold">
              Atendimento &amp; Loja Física
            </h3>
            <div className="flex flex-col gap-2.5 text-xs text-[#ededf4]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#fab800] shrink-0 mt-0.5" />
                <span>
                  Rua Erechim, 390 - Centro
                  <br />
                  Cascavel - PR | CEP: 85812-010
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#fab800] shrink-0" />
                <a href="tel:45999277822" className="hover:underline">
                  (45) 99927-7822
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href="https://api.whatsapp.com/send?phone=5545999277822"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  WhatsApp: +55 (45) 99927-7822
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#fab800] shrink-0" />
                <span>Seg a Sex: 08:00 - 18:00 | Sáb: 08:00 - 12:00</span>
              </div>
            </div>
          </div>

          {/* Coluna 4: Segurança & Garantia */}
          <div className="flex flex-col gap-3">
            <h3 className="font-barlow text-lg text-white uppercase tracking-wider font-bold">
              Segurança &amp; Garantia
            </h3>
            <p className="text-xs text-[#ededf4]/80 leading-relaxed">
              Compre online com garantia de compatibilidade técnica. Enviamos para todo o Brasil via
              Mercado Envios e Transportadoras Especializadas.
            </p>
            <div className="flex flex-col gap-2 mt-1">
              <a
                href="https://www.mercadolivre.com.br/pagina/becamecomercial1765"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#fab800] text-[#031438] font-bold text-xs uppercase py-2.5 px-4 rounded-lg hover:bg-[#f5a600] transition-colors"
              >
                <Store className="w-4 h-4" />
                Mercado Livre Oficial
              </a>
              <span className="font-mono text-[10px] text-[#dbe1ff]/70 text-center">
                CNPJ: Empresa Registrada em Cascavel - PR
              </span>
            </div>
          </div>
        </div>

        {/* Rodapé Inferior */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#ededf4]/60">
          <p>© 2025 Marinho Acessórios. Todos os direitos reservados. Especialistas em Clássicos Automotivos.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onSelectNavTab('sobre')}
              className="hover:text-[#fab800] transition-colors"
            >
              Termos &amp; Condições
            </button>
            <button
              onClick={() => onSelectNavTab('sobre')}
              className="hover:text-[#fab800] transition-colors"
            >
              Privacidade
            </button>
            <button
              onClick={() => onSelectNavTab('contato')}
              className="hover:text-[#fab800] transition-colors"
            >
              Trocas e Devoluções
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
