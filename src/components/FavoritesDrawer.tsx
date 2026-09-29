import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Eye } from 'lucide-react';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Product[];
  onRemoveFavorite: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenDetails: (product: Product) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onAddToCart,
  onOpenDetails,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#000d36]/70 backdrop-blur-xs">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#031438] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#ba1a1a] fill-current" />
            <h3 className="font-barlow text-xl uppercase font-bold tracking-wide">
              Meus Favoritos ({favorites.length})
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {favorites.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-gray-500 my-auto">
              <Heart className="w-16 h-16 text-gray-300 mb-3" />
              <p className="font-barlow text-xl font-bold uppercase text-[#000d36]">
                Nenhuma peça favoritada
              </p>
              <p className="text-xs text-gray-400 mt-1 max-w-xs">
                Clique no coração dos produtos para salvá-los e acompanhar o estoque para o seu restauro.
              </p>
            </div>
          ) : (
            favorites.map((product) => (
              <div
                key={product.id}
                className="flex gap-3 p-3 rounded-xl border border-gray-100 bg-[#f8f9fb]"
              >
                <div className="w-16 h-16 bg-white rounded-lg p-1 shrink-0 border border-gray-200 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[9px] text-[#0e2257] font-bold block truncate">
                      {product.vehicleLine}
                    </span>
                    <h4 className="text-xs font-semibold text-[#1a1b21] line-clamp-1">
                      {product.name}
                    </h4>
                    <span className="font-barlow text-base font-bold text-[#000d36]">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="bg-[#ffb61d] hover:bg-[#ffba35] text-[#000d36] font-bold text-[10px] uppercase px-2.5 py-1.5 rounded flex items-center gap-1 shadow-xs"
                    >
                      <ShoppingBag className="w-3 h-3" /> Carrinho
                    </button>
                    <button
                      onClick={() => {
                        onOpenDetails(product);
                        onClose();
                      }}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-[10px] font-semibold px-2 py-1.5 rounded flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" /> Ver
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveFavorite(product)}
                  className="text-gray-300 hover:text-red-600 self-start p-1"
                  title="Remover dos favoritos"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <button
            onClick={onClose}
            className="w-full bg-[#000d36] text-white text-xs font-bold uppercase py-2.5 rounded-lg hover:bg-[#0e2257]"
          >
            Continuar Navegando
          </button>
        </div>
      </div>
    </div>
  );
};
