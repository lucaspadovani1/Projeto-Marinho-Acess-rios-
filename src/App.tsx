import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Diferenciais } from './components/Diferenciais';
import { VehicleSelector } from './components/VehicleSelector';
import { CatalogSection } from './components/CatalogSection';
import { TrustBanners } from './components/TrustBanners';
import { InstagramAndLocation } from './components/InstagramAndLocation';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { InfoModals } from './components/InfoModals';
import { INITIAL_PRODUCTS } from './data/products';
import { Product, CartItem, FilterState } from './types';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('marinho_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('marinho_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('marinho_favorites', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('marinho_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Filters State
  const initialFilterState: FilterState = {
    search: '',
    vehicleType: [],
    brand: [],
    vehicle: null,
    category: [],
    yearMin: 1959,
    yearMax: 2013,
    position: null,
    availability: [],
    sortBy: 'relevantes',
  };

  const [filterState, setFilterState] = useState<FilterState>(initialFilterState);

  // Modals & Drawers
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [activeInfoModal, setActiveInfoModal] = useState<'sobre' | 'contato' | 'conta' | null>(null);
  const [activeNavTab, setActiveNavTab] = useState('inicio');

  // Favorites Handlers
  const handleToggleFavorite = (product: Product) => {
    setFavorites((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    if (!product.inStock || product.price <= 0) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Filter Updates
  const handleUpdateFilter = (updates: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilterState(initialFilterState);
  };

  // Quick Fitment from Hero
  const handleApplyFitment = (brand: string, model: string, yearValue: string) => {
    const brandMap: Record<string, 'Chevrolet' | 'Volkswagen' | 'Ford' | 'Fiat'> = {
      chevrolet: 'Chevrolet',
      vw: 'Volkswagen',
      ford: 'Ford',
      fiat: 'Fiat',
    };

    const targetBrand = brandMap[brand];
    let yMin = 1950;
    let yMax = 2020;

    if (yearValue && yearValue !== 'todos') {
      const parts = yearValue.split('-');
      if (parts.length === 2) {
        yMin = parseInt(parts[0], 10) || 1950;
        yMax = parseInt(parts[1], 10) || 2020;
      }
    }

    setFilterState((prev) => ({
      ...prev,
      brand: targetBrand ? [targetBrand] : [],
      vehicle: model || null,
      yearMin: yMin,
      yearMax: yMax,
    }));

    // Scroll to catalog
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Quick Vehicle Filter from VehicleSelector
  const handleSelectVehicle = (vehicleName: string) => {
    setFilterState((prev) => ({
      ...prev,
      vehicle: prev.vehicle === vehicleName ? null : vehicleName,
    }));
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Navigation Tab Selection
  const handleSelectNavTab = (tabId: string) => {
    setActiveNavTab(tabId);
    if (tabId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tabId === 'catalogo' || tabId === 'categorias') {
      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'veiculos') {
      document.getElementById('veiculos')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'localizacao') {
      document.getElementById('localizacao')?.scrollIntoView({ behavior: 'smooth' });
    } else if (tabId === 'sobre') {
      setActiveInfoModal('sobre');
    } else if (tabId === 'contato') {
      setActiveInfoModal('contato');
    }
  };

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f8fafd] text-[#0f172a] flex flex-col font-inter">
      {/* 1. Header Fixo com Busca, Links e Indicadores */}
      <Header
        searchTerm={filterState.search}
        onSearchChange={(search) => handleUpdateFilter({ search })}
        favoritesCount={favorites.length}
        cartCount={totalCartCount}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        activeNavTab={activeNavTab}
        onSelectNavTab={handleSelectNavTab}
        onOpenAccount={() => setActiveInfoModal('conta')}
      />

      {/* Main Content Area (padding-top to clear fixed header) */}
      <main className="w-full pt-28 sm:pt-36 flex-1 flex flex-col">
        {/* 2. Hero Section com Busca por Clássico (Fitment Direct) */}
        <Hero
          onApplyFitment={handleApplyFitment}
          onExploreCatalog={() =>
            document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
          }
        />

        {/* 3. Faixa de Diferenciais Técnicos */}
        <Diferenciais />

        {/* 4. Encontre pelo seu Veículo */}
        <VehicleSelector
          selectedVehicle={filterState.vehicle}
          onSelectVehicle={handleSelectVehicle}
        />

        {/* 5. Catálogo Principal com Filtros Laterais e Grid Técnico */}
        <CatalogSection
          products={products}
          filterState={filterState}
          onUpdateFilter={handleUpdateFilter}
          onResetFilters={handleResetFilters}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onOpenDetails={(p) => setSelectedProductForDetail(p)}
          onAddToCart={handleAddToCart}
        />

        {/* 6. Banners de Segurança Mercado Livre & Fale Conosco WhatsApp */}
        <TrustBanners />

        {/* 7. Instagram da Comunidade & Loja Física em Cascavel - PR */}
        <InstagramAndLocation />
      </main>

      {/* 8. Rodapé Técnico Completo */}
      <Footer onSelectNavTab={handleSelectNavTab} />

      {/* Floating Action WhatsApp Button */}
      <a
        href="https://api.whatsapp.com/send?phone=554530372929&text=Ol%C3%A1%2C%20estou%20no%20site%20da%20Marinho%20Acess%C3%B3rios%20e%20gostaria%20de%20consultar%20uma%20pe%C3%A7a."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] hover:bg-[#1fa855] text-white px-4 py-3 rounded-full shadow-2xl transition-all transform hover:scale-105 group border-2 border-white"
        title="Fale conosco no WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5" />
        <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline-block">
          Fale conosco
        </span>
      </a>

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        isFavorite={
          selectedProductForDetail ? favorites.includes(selectedProductForDetail.id) : false
        }
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favoriteProducts}
        onRemoveFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
        onOpenDetails={(p) => setSelectedProductForDetail(p)}
      />

      <InfoModals
        type={activeInfoModal}
        onClose={() => setActiveInfoModal(null)}
      />
    </div>
  );
}
