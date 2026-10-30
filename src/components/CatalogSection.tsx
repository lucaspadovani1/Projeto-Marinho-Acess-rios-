import React, { useState } from 'react';
import { Product, FilterState } from '../types';
import { Heart, ShoppingBag, Eye, Store, Filter, RotateCcw, ChevronLeft, ChevronRight, X, MessageCircle } from 'lucide-react';

interface CatalogSectionProps {
  products: Product[];
  filterState: FilterState;
  onUpdateFilter: (updates: Partial<FilterState>) => void;
  onResetFilters: () => void;
  favorites: string[];
  onToggleFavorite: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  products,
  filterState,
  onUpdateFilter,
  onResetFilters,
  favorites,
  onOpenDetails,
  onAddToCart,
  onToggleFavorite,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Active filter chips calculation
  const activeChips: { key: string; label: string; onRemove: () => void }[] = [];

  if (filterState.search) {
    activeChips.push({
      key: 'search',
      label: `Busca: "${filterState.search}"`,
      onRemove: () => onUpdateFilter({ search: '' }),
    });
  }

  if (filterState.vehicle) {
    activeChips.push({
      key: 'vehicle',
      label: filterState.vehicle,
      onRemove: () => onUpdateFilter({ vehicle: null }),
    });
  }

  filterState.brand.forEach((b) => {
    activeChips.push({
      key: `brand-${b}`,
      label: b,
      onRemove: () =>
        onUpdateFilter({
          brand: filterState.brand.filter((item) => item !== b),
        }),
    });
  });

  filterState.category.forEach((c) => {
    activeChips.push({
      key: `cat-${c}`,
      label: c,
      onRemove: () =>
        onUpdateFilter({
          category: filterState.category.filter((item) => item !== c),
        }),
    });
  });

  if (filterState.position) {
    activeChips.push({
      key: 'position',
      label: `Posição: ${filterState.position}`,
      onRemove: () => onUpdateFilter({ position: null }),
    });
  }

  // Filter application
  const filteredProducts = products.filter((prod) => {
    // Search
    if (filterState.search) {
      const term = filterState.search.toLowerCase();
      const match =
        prod.name.toLowerCase().includes(term) ||
        prod.vehicleLine.toLowerCase().includes(term) ||
        prod.sku.toLowerCase().includes(term) ||
        prod.vehicle.toLowerCase().includes(term) ||
        (prod.oemCode && prod.oemCode.toLowerCase().includes(term));
      if (!match) return false;
    }

    // Vehicle
    if (filterState.vehicle && prod.vehicle !== filterState.vehicle) {
      return false;
    }

    // Brand
    if (filterState.brand.length > 0 && !filterState.brand.includes(prod.brand)) {
      return false;
    }

    // Vehicle Type
    if (filterState.vehicleType.length > 0 && !filterState.vehicleType.includes(prod.vehicleType)) {
      return false;
    }

    // Category
    if (filterState.category.length > 0 && !filterState.category.includes(prod.category)) {
      return false;
    }

    // Position
    if (filterState.position && prod.position !== filterState.position) {
      return false;
    }

    // Years
    if (prod.yearMax < filterState.yearMin || prod.yearMin > filterState.yearMax) {
      return false;
    }

    // Availability
    if (filterState.availability.length > 0 && !filterState.availability.includes(prod.stockType)) {
      return false;
    }

    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filterState.sortBy) {
      case 'menor-preco':
        return a.price - b.price;
      case 'maior-preco':
        return b.price - a.price;
      case 'alfabetica':
        return a.name.localeCompare(b.name);
      case 'procurados':
        return a.badge === 'Mais Procurado' ? -1 : 1;
      case 'recentes':
        return b.yearMax - a.yearMax;
      case 'relevantes':
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const categoriesList = [
    'Lanternas & Iluminação',
    'Grades & Frontais',
    'Emblemas de Época',
    'Frisos & Acabamentos',
    'Borrachas & Canaletas',
    'Maçanetas & Fechaduras',
    'Manoplas & Câmbio',
    'Retrovisores',
    'Forros & Interior',
  ];

  return (
    <section id="catalogo" className="py-12 px-4 lg:px-8 bg-[#f9f9ff]">
      <div className="max-w-[80rem] mx-auto flex flex-col gap-6">
        {/* Cabeçalho do Catálogo */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <h2 className="font-barlow text-3xl sm:text-4xl font-bold uppercase text-[#000d36] tracking-wide">
                Encontre a peça certa para o seu clássico
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Pesquise por veículo, modelo, ano ou tipo de componente de restauro.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-gray-500 bg-[#e8e7ef] px-2.5 py-1 rounded font-semibold">
                ESTOQUE ATIVO
              </span>
              <span className="font-barlow text-lg text-[#000d36] font-bold">
                {paginatedProducts.length} de {filteredProducts.length} peças listadas
              </span>
            </div>
          </div>

          {/* Barra de Status e Chips Ativos */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-xl shadow-xs border border-gray-100">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="flex items-center gap-1.5 bg-[#031438] text-white font-semibold text-xs px-3.5 py-2 rounded-lg shadow-sm hover:bg-[#08225e] transition-colors cursor-pointer"
              >
                <Filter className="w-4 h-4" />
                <span>FILTROS</span>
                <span className="w-5 h-5 bg-[#fab800] text-[#031438] rounded-full text-[11px] font-bold flex items-center justify-center ml-0.5">
                  {activeChips.length}
                </span>
              </button>

              {/* Chips de Filtros Ativos */}
              <div className="flex flex-wrap items-center gap-1.5">
                {activeChips.length === 0 ? (
                  <span className="text-xs text-gray-400 font-mono italic">
                    Nenhum filtro restritivo aplicado
                  </span>
                ) : (
                  <>
                    {activeChips.map((chip) => (
                      <span
                        key={chip.key}
                        className="inline-flex items-center gap-1 bg-[#eaeff5] text-[#031438] font-mono text-xs px-2.5 py-1 rounded-md"
                      >
                        {chip.label}
                        <button
                          onClick={chip.onRemove}
                          className="hover:text-red-600 text-sm leading-none ml-0.5"
                          title="Remover filtro"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                    <button
                      onClick={onResetFilters}
                      className="font-mono text-xs text-[#c98800] hover:underline font-semibold ml-1 cursor-pointer"
                    >
                      Limpar todos
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Seletor de Ordenação */}
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500 uppercase font-semibold hidden sm:inline-block">
                Ordenar por:
              </label>
              <div className="relative">
                <select
                  value={filterState.sortBy}
                  onChange={(e) =>
                    onUpdateFilter({
                      sortBy: e.target.value as FilterState['sortBy'],
                    })
                  }
                  className="h-9 px-3 pr-8 bg-[#eaeff5] text-[#0f172a] text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fab800] cursor-pointer font-medium appearance-none"
                >
                  <option value="relevantes">Mais relevantes</option>
                  <option value="procurados">Mais procurados</option>
                  <option value="recentes">Mais recentes</option>
                  <option value="menor-preco">Menor preço</option>
                  <option value="maior-preco">Maior preço</option>
                  <option value="alfabetica">Nome A-Z</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-2 text-gray-500 pointer-events-none text-[18px]">
                  sort
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content: Sidebar de Filtros + Grid de Peças */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* SIDEBAR DE FILTROS TÉCNICOS */}
          {isSidebarOpen && (
            <aside className="lg:col-span-3 bg-white p-4 rounded-xl shadow-xs border border-gray-100 flex flex-col gap-4 sticky top-40 transition-all">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="font-barlow text-lg uppercase text-[#000d36] font-bold">
                  Filtros Técnicos
                </span>
                <button
                  onClick={onResetFilters}
                  className="text-xs text-[#7e5700] hover:underline font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Redefinir
                </button>
              </div>

              {/* Tipo de Veículo */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs uppercase text-gray-500 font-bold">
                  Tipo de Veículo
                </span>
                <div className="flex flex-col gap-1 text-xs text-[#1a1b21]">
                  {(['Carros', 'Utilitários / Pickups'] as const).map((t) => (
                    <label
                      key={t}
                      className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-gray-50"
                    >
                      <span className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filterState.vehicleType.includes(t)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              onUpdateFilter({
                                vehicleType: [...filterState.vehicleType, t],
                              });
                            } else {
                              onUpdateFilter({
                                vehicleType: filterState.vehicleType.filter((item) => item !== t),
                              });
                            }
                          }}
                          className="accent-[#000d36] w-4 h-4 rounded"
                        />
                        {t}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Marca */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs uppercase text-gray-500 font-bold">
                  Marca
                </span>
                <div className="flex flex-col gap-1 text-xs text-[#1a1b21]">
                  {(['Chevrolet', 'Volkswagen', 'Ford', 'Fiat'] as const).map((b) => (
                    <label
                      key={b}
                      className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-gray-50"
                    >
                      <span className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filterState.brand.includes(b)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              onUpdateFilter({
                                brand: [...filterState.brand, b],
                              });
                            } else {
                              onUpdateFilter({
                                brand: filterState.brand.filter((item) => item !== b),
                              });
                            }
                          }}
                          className="accent-[#000d36] w-4 h-4 rounded"
                        />
                        {b}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Modelos em Destaque */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs uppercase text-gray-500 font-bold">
                  Modelos em Destaque
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'Chevette', val: 'Chevette' },
                    { label: 'Opala', val: 'Opala' },
                    { label: 'Gol Quad.', val: 'Gol Quadrado' },
                    { label: 'Fusca', val: 'Fusca' },
                    { label: 'Saveiro', val: 'Saveiro' },
                    { label: 'Corcel', val: 'Corcel' },
                    { label: 'Celta/Corsa', val: 'Celta / Corsa' },
                    { label: 'D10', val: 'D10' },
                    { label: 'Strada', val: 'Strada' },
                  ].map((m) => {
                    const isSelected = filterState.vehicle === m.val;
                    return (
                      <button
                        key={m.val}
                        onClick={() =>
                          onUpdateFilter({
                            vehicle: isSelected ? null : m.val,
                          })
                        }
                        className={`text-xs font-mono px-2.5 py-1 rounded transition-colors ${
                          isSelected
                            ? 'bg-[#000d36] text-[#ffb61d] font-bold'
                            : 'bg-[#ededf4] hover:bg-[#e8e7ef] text-[#000d36]'
                        }`}
                      >
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Faixa de Ano */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs uppercase text-gray-500 font-bold">
                  Faixa de Ano
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500">De</span>
                    <input
                      type="number"
                      min={1950}
                      max={2020}
                      value={filterState.yearMin}
                      onChange={(e) =>
                        onUpdateFilter({ yearMin: Number(e.target.value) || 1950 })
                      }
                      className="h-8 px-2 bg-[#ededf4] text-xs font-mono rounded border border-gray-200"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500">Até</span>
                    <input
                      type="number"
                      min={1950}
                      max={2020}
                      value={filterState.yearMax}
                      onChange={(e) =>
                        onUpdateFilter({ yearMax: Number(e.target.value) || 2020 })
                      }
                      className="h-8 px-2 bg-[#ededf4] text-xs font-mono rounded border border-gray-200"
                    />
                  </div>
                </div>
              </div>

              {/* Tipo de Peça */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs uppercase text-gray-500 font-bold">
                  Tipo de Peça
                </span>
                <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-1 text-xs text-[#1a1b21]">
                  {categoriesList.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer p-0.5">
                      <input
                        type="checkbox"
                        checked={filterState.category.includes(cat)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            onUpdateFilter({
                              category: [...filterState.category, cat],
                            });
                          } else {
                            onUpdateFilter({
                              category: filterState.category.filter((item) => item !== cat),
                            });
                          }
                        }}
                        className="accent-[#000d36] w-4 h-4 rounded"
                      />
                      <span className="truncate">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Posição do Componente */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs uppercase text-gray-500 font-bold">
                  Posição do Componente
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() =>
                      onUpdateFilter({
                        position: filterState.position === 'Exterior' ? null : 'Exterior',
                      })
                    }
                    className={`px-2 py-1.5 rounded text-xs font-semibold transition-colors ${
                      filterState.position === 'Exterior'
                        ? 'bg-[#000d36] text-white'
                        : 'bg-[#ededf4] text-[#1a1b21] hover:bg-[#e8e7ef]'
                    }`}
                  >
                    Exterior
                  </button>
                  <button
                    onClick={() =>
                      onUpdateFilter({
                        position: filterState.position === 'Interior' ? null : 'Interior',
                      })
                    }
                    className={`px-2 py-1.5 rounded text-xs font-semibold transition-colors ${
                      filterState.position === 'Interior'
                        ? 'bg-[#000d36] text-white'
                        : 'bg-[#ededf4] text-[#1a1b21] hover:bg-[#e8e7ef]'
                    }`}
                  >
                    Interior
                  </button>
                </div>
              </div>

              {/* Disponibilidade */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs uppercase text-gray-500 font-bold">
                  Disponibilidade
                </span>
                <div className="flex flex-col gap-1 text-xs text-[#1a1b21]">
                  {(['Em Estoque', 'Últimas Unidades', 'Sob Encomenda', 'Sem Estoque'] as const).map((avail) => (
                    <label key={avail} className="flex items-center gap-2 cursor-pointer p-0.5">
                      <input
                        type="checkbox"
                        checked={filterState.availability.includes(avail)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            onUpdateFilter({
                              availability: [...filterState.availability, avail],
                            });
                          } else {
                            onUpdateFilter({
                              availability: filterState.availability.filter((item) => item !== avail),
                            });
                          }
                        }}
                        className="accent-[#000d36] w-4 h-4 rounded"
                      />
                      <span>{avail}</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>
          )}

          {/* GRID DE PRODUTOS REAIS */}
          <main className={isSidebarOpen ? 'lg:col-span-9' : 'lg:col-span-12'}>
            {paginatedProducts.length === 0 ? (
              <div className="bg-white p-12 rounded-xl text-center shadow-xs border border-gray-100 flex flex-col items-center justify-center gap-3">
                <span className="material-symbols-outlined text-5xl text-gray-300">
                  search_off
                </span>
                <h3 className="font-barlow text-2xl font-bold uppercase text-[#031438]">
                  Nenhuma peça encontrada com estes filtros
                </h3>
                <p className="text-sm text-gray-500 max-w-md">
                  Tente alterar os anos selecionados, desmarcar a categoria ou pesquisar por outro termo.
                </p>
                <button
                  onClick={onResetFilters}
                  className="mt-2 bg-[#fab800] text-[#031438] font-bold text-xs uppercase px-5 py-2.5 rounded-lg shadow-sm hover:bg-[#f5a600] transition-colors cursor-pointer"
                >
                  Limpar todos os filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedProducts.map((prod) => {
                  const isFav = favorites.includes(prod.id);
                  return (
                    <div
                      key={prod.id}
                      className="bg-white rounded-xl p-3.5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group relative border border-gray-100"
                    >
                      {/* Image Area */}
                      <div className="relative w-full aspect-4/3 bg-[#eaeff5] rounded-lg overflow-hidden flex items-center justify-center p-2 mb-2">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            if (!target.src.includes('foto-em-breve.svg')) {
                              target.src = '/assets/products/foto-em-breve.svg';
                            }
                          }}
                        />
                        <span className="absolute top-2 left-2 bg-[#031438] text-[#fab800] font-mono text-[10px] uppercase px-2 py-0.5 rounded font-bold shadow-xs">
                          {prod.badge}
                        </span>
                        <button
                          onClick={() => onToggleFavorite(prod)}
                          className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-sm transition-colors cursor-pointer ${
                            isFav ? 'text-[#ba1a1a]' : 'text-gray-400 hover:text-[#ba1a1a]'
                          }`}
                          title="Favoritar"
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      {/* Info Area */}
                      <div className="flex flex-col gap-1 mb-2">
                        <div className="flex items-center justify-between">
                          <span className="font-barlow text-xs uppercase tracking-wide text-[#031438] font-bold truncate pr-1">
                            {prod.vehicleLine}
                          </span>
                          <span
                            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold shrink-0 ${
                              !prod.inStock || prod.stockType === 'Sem Estoque'
                                ? 'bg-red-50 text-red-700 border border-red-200'
                                : 'bg-[#66ff8e]/30 text-[#002109]'
                            }`}
                          >
                            {!prod.inStock ? 'Sem Estoque' : prod.stockType}
                          </span>
                        </div>

                        <h3
                          onClick={() => onOpenDetails(prod)}
                          className="text-sm font-semibold text-[#0f172a] line-clamp-2 leading-snug cursor-pointer hover:text-[#08225e]"
                          title={prod.name}
                        >
                          {prod.name}
                        </h3>

                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          <span className="font-mono text-[10px] text-gray-500 bg-[#eaeff5] px-1.5 py-0.5 rounded">
                            SKU: {prod.sku}
                          </span>
                          <span className="font-mono text-[10px] text-gray-500 bg-[#eaeff5] px-1.5 py-0.5 rounded truncate max-w-[140px]">
                            {prod.category}
                          </span>
                        </div>
                      </div>

                      {/* Price & Action Area */}
                      <div className="pt-2 mt-auto flex flex-col gap-2 border-t border-gray-100">
                        <div className="flex items-baseline justify-between">
                          <div className="flex flex-col">
                            {prod.inStock && prod.price > 0 ? (
                              <>
                                <span className="font-mono text-[10px] text-gray-400">
                                  À vista no Pix ou ML
                                </span>
                                <span className="font-barlow text-2xl font-bold text-[#031438]">
                                  R$ {prod.price.toFixed(2).replace('.', ',')}
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="font-mono text-[10px] text-gray-400">
                                  Disponibilidade
                                </span>
                                <span className="font-barlow text-xl font-bold text-gray-500">
                                  Sob Consulta
                                </span>
                              </>
                            )}
                          </div>
                          {prod.inStock && prod.price > 0 ? (
                            <span className="text-[11px] text-gray-500">
                              {prod.installments}x de R${' '}
                              {prod.installmentValue.toFixed(2).replace('.', ',')}
                            </span>
                          ) : (
                            <span className="text-[10px] text-amber-700 font-mono bg-amber-50 px-1.5 py-0.5 rounded">
                              Sem estoque
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-1.5 pt-1">
                          <button
                            onClick={() => onOpenDetails(prod)}
                            className="bg-[#eaeff5] hover:bg-[#e2e8f0] text-[#031438] font-semibold text-xs py-2 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" /> Detalhes
                          </button>

                          <a
                            href={prod.mlUrl || "https://www.mercadolivre.com.br/pagina/becamecomercial1765"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#fab800] hover:bg-[#f5a600] text-[#031438] font-bold text-xs py-2 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-xs"
                            title={`Ver anúncio no Mercado Livre`}
                          >
                            <Store className="w-3.5 h-3.5" /> Mercado Livre
                          </a>
                        </div>

                        {/* Quick Cart Action */}
                        <button
                          onClick={() => onAddToCart(prod)}
                          className="w-full text-center text-[11px] font-semibold text-[#08225e] hover:underline flex items-center justify-center gap-1 py-1 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          Adicionar ao carrinho da loja
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between p-3 bg-white rounded-xl shadow-xs border border-gray-100">
                <span className="text-xs text-gray-500">
                  Página {currentPage} de {totalPages} ({sortedProducts.length} itens)
                </span>
                <div className="flex items-center gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="w-8 h-8 rounded bg-[#ededf4] hover:bg-[#e8e7ef] disabled:opacity-40 flex items-center justify-center text-[#000d36] text-xs font-semibold cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded text-xs font-semibold cursor-pointer ${
                        currentPage === i + 1
                          ? 'bg-[#000d36] text-white'
                          : 'bg-[#ededf4] hover:bg-[#e8e7ef] text-[#000d36]'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="w-8 h-8 rounded bg-[#ededf4] hover:bg-[#e8e7ef] disabled:opacity-40 flex items-center justify-center text-[#000d36] text-xs font-semibold cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* BANNER WHATSAPP: "NÃO ACHOU O QUE PROCURA?" */}
        <div className="mt-8 bg-gradient-to-r from-[#000d36] via-[#04163d] to-[#000d36] rounded-2xl p-6 sm:p-8 text-white shadow-md border border-[#fab800]/30 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="absolute -left-16 -bottom-16 w-52 h-52 rounded-full bg-[#fab800]/10 pointer-events-none blur-3xl"></div>
          <div className="absolute -right-16 -top-16 w-52 h-52 rounded-full bg-[#25D366]/15 pointer-events-none blur-3xl"></div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 z-10 max-w-2xl">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center shrink-0">
              <MessageCircle className="w-8 h-8 text-[#25D366]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-xs text-[#fab800] uppercase font-bold tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                ATENDIMENTO TÉCNICO ESPECIALIZADO
              </span>
              <h3 className="font-barlow text-2xl sm:text-3xl font-bold uppercase text-white leading-tight">
                Não achou a peça que você procura?
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Nosso estoque físico conta com <strong className="text-white">+15.000 itens</strong> para restauração e reposição de carros antigos. Mande uma foto ou a descrição da peça que localizamos para você!
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-3 text-xs font-mono text-gray-400 mt-1 flex-wrap">
                <span>Cascavel - PR</span>
                <span>•</span>
                <span>Atendimento imediato</span>
                <span>•</span>
                <span className="text-[#fab800] font-semibold">(45) 99927-7822</span>
              </div>
            </div>
          </div>

          <div className="z-10 w-full sm:w-auto shrink-0 flex flex-col items-center sm:items-end gap-2">
            <a
              href="https://api.whatsapp.com/send?phone=5545999277822&text=Ol%C3%A1%2C%20equipe%20Marinho%20Acess%C3%B3rios!%20Procurei%20no%20site%20mas%20n%C3%A3o%20encontrei%20a%20pe%C3%A7a%20que%20preciso.%20Voc%C3%AAs%20poderiam%20me%20ajudar%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1fa855] text-white font-bold text-sm uppercase px-8 py-4 rounded-xl shadow-xl transition-all transform hover:scale-[1.02] tracking-wider cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Chamar no WhatsApp</span>
            </a>
            <span className="text-[11px] text-gray-400 font-mono">
              (45) 99927-7822 • Resposta rápida de segunda a sábado
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
