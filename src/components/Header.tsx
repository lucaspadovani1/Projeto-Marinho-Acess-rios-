import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Store, Phone, MapPin, X, Menu } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  favoritesCount: number;
  cartCount: number;
  onOpenFavorites: () => void;
  onOpenCart: () => void;
  activeNavTab: string;
  onSelectNavTab: (tab: string) => void;
  onOpenAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  favoritesCount,
  cartCount,
  onOpenFavorites,
  onOpenCart,
  activeNavTab,
  onSelectNavTab,
  onOpenAccount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'inicio', label: 'Início' },
    { id: 'catalogo', label: 'Peças & Catálogo' },
    { id: 'veiculos', label: 'Veículos Clássicos' },
    { id: 'categorias', label: 'Categorias' },
    { id: 'sobre', label: 'Sobre a Marinho' },
    { id: 'contato', label: 'Contato' },
    { id: 'localizacao', label: 'Localização' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#031438] text-white shadow-lg border-b border-white/10">
      {/* 1. Barra Superior Institucional */}
      <div className="w-full bg-[#020d26] py-1.5 px-4 lg:px-8 border-b border-white/5 text-xs">
        <div className="max-w-[80rem] mx-auto flex items-center justify-between text-[#dbe1ff]/90">
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="tel:45999277822"
              className="flex items-center gap-1.5 hover:text-[#fab800] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#fab800]" />
              <span className="font-medium">(45) 99927-7822</span>
            </a>
            <span className="hidden sm:inline-block opacity-40">|</span>
            <span className="hidden sm:flex items-center gap-1.5 opacity-80">
              <MapPin className="w-3.5 h-3.5 text-[#fab800]" />
              <span>R. Erechim, 390 - Cascavel, PR</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              className="flex items-center gap-1.5 text-[#fab800] hover:underline font-semibold"
              href="https://www.mercadolivre.com.br/pagina/becamecomercial1765"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Loja Oficial Mercado Livre</span>
            </a>
            <span className="hidden md:inline-block opacity-40">|</span>
            <span className="hidden md:inline-block text-[11px] font-mono opacity-80">
              @marinhoacessorios
            </span>
          </div>
        </div>
      </div>

      {/* 2. Barra Principal (Logo Oficial, Busca, Ações) */}
      <div className="h-20 max-w-[80rem] mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo Oficial Marinho Acessórios - Único e fiel ao anexo */}
        <div className="flex items-center shrink-0">
          <button
            onClick={() => onSelectNavTab('inicio')}
            className="flex items-center text-left group transition-transform active:scale-98 cursor-pointer"
            title="Marinho Acessórios - Página Inicial"
          >
            <BrandLogo size="md" variant="header" />
          </button>
        </div>

        {/* Input de Busca Dinâmico */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative w-full flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Busque por peça, veículo, modelo, ano ou código..."
              className="w-full h-11 pl-11 pr-10 bg-white text-[#0f172a] rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fab800] text-sm shadow-sm transition-all"
            />
            <Search className="w-5 h-5 absolute left-3.5 text-gray-400 pointer-events-none" />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-gray-400 hover:text-gray-700 p-0.5"
                title="Limpar busca"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Ações: Mercado Livre, Favoritos, Carrinho, Conta, Menu Mobile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            className="hidden lg:flex items-center gap-1.5 bg-[#fab800] text-[#031438] font-bold text-xs px-3.5 py-2 rounded-lg shadow-sm hover:bg-[#f5a600] transition-colors"
            href="https://www.mercadolivre.com.br/pagina/becamecomercial1765"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Store className="w-4 h-4" />
            <span>Mercado Livre</span>
          </a>

          {/* Favoritos */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2 rounded-lg hover:bg-white/10 transition-colors text-white flex flex-col items-center justify-center cursor-pointer"
            title="Meus Favoritos"
          >
            <Heart className="w-5 h-5" />
            {favoritesCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#ba1a1a] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Carrinho de Compras */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-lg hover:bg-white/10 transition-colors text-white flex flex-col items-center justify-center cursor-pointer"
            title="Carrinho de Compras"
          >
            <ShoppingBag className="w-5 h-5 text-[#fab800]" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#fab800] text-[#031438] rounded-full text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Atendimento / Conta */}
          <button
            onClick={onOpenAccount}
            className="w-8 h-8 rounded-full bg-[#020d26] hover:bg-[#fab800] hover:text-[#031438] transition-colors flex items-center justify-center text-white cursor-pointer"
            title="Atendimento & Conta"
          >
            <span className="material-symbols-outlined text-[19px]">person</span>
          </button>

          {/* Botão Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Busca no Mobile */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative w-full flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar peça, ano ou modelo..."
            className="w-full h-10 pl-10 pr-9 bg-white text-[#0f172a] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#fab800]"
          />
          <Search className="w-4 h-4 absolute left-3 text-gray-400 pointer-events-none" />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 text-gray-400 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Submenu de Navegação Técnica */}
      <div className="w-full bg-[#020d26] border-t border-white/5">
        <div className="max-w-[80rem] mx-auto px-4 lg:px-8">
          <nav className="hidden md:flex items-center gap-6 overflow-x-auto py-2 text-sm scrollbar-none">
            {navLinks.map((link) => {
              const isActive = activeNavTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onSelectNavTab(link.id)}
                  className={`whitespace-nowrap py-1 transition-all text-sm font-medium cursor-pointer ${
                    isActive
                      ? 'text-[#fab800] font-bold border-b-2 border-[#fab800]'
                      : 'text-white/85 hover:text-[#fab800]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#031438] border-t border-white/10 px-4 py-3 flex flex-col gap-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onSelectNavTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2 px-3 rounded text-sm ${
                activeNavTab === link.id
                  ? 'bg-white/10 text-[#fab800] font-bold'
                  : 'text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://api.whatsapp.com/send?phone=5545999277822"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 bg-[#25D366] text-white py-2 px-3 rounded text-center text-sm font-bold flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Plantão WhatsApp (45) 99927-7822
          </a>
        </div>
      )}
    </header>
  );
};

