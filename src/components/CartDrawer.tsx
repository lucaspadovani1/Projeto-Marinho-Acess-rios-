import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, Store, MessageCircle, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [cep, setCep] = useState('');
  const [shippingCalculated, setShippingCalculated] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  const handleCalculateShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.length >= 8) {
      // Simulate fast shipping logic
      if (cep.startsWith('85')) {
        // Cascavel / Região Oeste PR
        setShippingCost(18.0);
      } else if (cep.startsWith('8')) {
        // Paraná / Sul
        setShippingCost(28.0);
      } else {
        // Sudeste / Brasil
        setShippingCost(36.0);
      }
      setShippingCalculated(true);
    }
  };

  const handleCheckoutWhatsApp = () => {
    const itemsList = items
      .map((i) => `• ${i.quantity}x ${i.product.name} (SKU: ${i.product.sku}) - R$ ${(i.product.price * i.quantity).toFixed(2)}`)
      .join('\n');

    const msg = encodeURIComponent(
      `Olá, Marinho Acessórios! Gostaria de fechar meu pedido de peças para restauração:\n\n${itemsList}\n\nSubtotal: R$ ${subtotal.toFixed(2)}${shippingCalculated ? `\nFrete Estimado (CEP ${cep}): R$ ${shippingCost.toFixed(2)}` : ''}\nTotal: R$ ${total.toFixed(2)}\n\nPoderiam me enviar os dados para pagamento (Pix) e confirmação de envio?`
    );

    window.open(`https://api.whatsapp.com/send?phone=5545999277822&text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#000d36]/70 backdrop-blur-xs">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#031438] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#fab800]" />
            <h3 className="font-barlow text-xl uppercase font-bold tracking-wide">
              Carrinho de Compras ({items.length})
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-gray-500 my-auto">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-3" />
              <p className="font-barlow text-xl font-bold uppercase text-[#000d36]">
                Seu carrinho está vazio
              </p>
              <p className="text-xs text-gray-400 mt-1 max-w-xs">
                Navegue pelo nosso catálogo de clássicos e adicione as peças necessárias para o seu projeto.
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center pb-2 border-b border-gray-100 text-xs text-gray-500">
                <span>Peças Selecionadas</span>
                <button
                  onClick={onClearCart}
                  className="text-red-600 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Esvaziar
                </button>
              </div>

              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-3 p-2.5 rounded-xl border border-gray-100 bg-[#f8f9fb]"
                >
                  <div className="w-16 h-16 bg-white rounded-lg p-1 shrink-0 border border-gray-200 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/assets/products/foto-em-breve.svg';
                      }}
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
                      <span className="text-[10px] text-gray-400 font-mono">
                        SKU: {product.sku}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded px-1.5 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="text-gray-500 hover:text-black p-0.5"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold font-mono px-1">{quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="text-gray-500 hover:text-black p-0.5"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-barlow text-base font-bold text-[#000d36]">
                          R$ {(product.price * quantity).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(product.id)}
                    className="text-gray-300 hover:text-red-600 self-start p-1"
                    title="Remover item"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Simulação de Frete */}
              <div className="mt-2 p-3 bg-[#ededf4] rounded-xl text-xs">
                <span className="font-semibold text-gray-700 flex items-center gap-1.5 mb-1.5">
                  <Truck className="w-4 h-4 text-[#000d36]" />
                  Calcular Frete Especializado
                </span>
                <form onSubmit={handleCalculateShipping} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Digite seu CEP (ex: 85812-010)"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    className="flex-1 h-8 px-2 bg-white rounded border border-gray-300 text-xs font-mono"
                    maxLength={9}
                  />
                  <button
                    type="submit"
                    className="bg-[#000d36] text-white px-3 py-1 rounded text-xs font-bold hover:bg-[#0e2257]"
                  >
                    Calcular
                  </button>
                </form>

                {shippingCalculated && (
                  <div className="mt-2 text-[11px] text-[#005322] font-semibold flex items-center justify-between">
                    <span>Envio Protegido (Mercado Envios):</span>
                    <span>R$ {shippingCost.toFixed(2).replace('.', ',')}</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer / Totals & Actions */}
        {items.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-white flex flex-col gap-3">
            <div className="flex flex-col gap-1 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal:</span>
                <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              {shippingCalculated && (
                <div className="flex justify-between text-gray-500">
                  <span>Frete estimado:</span>
                  <span>R$ {shippingCost.toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#000d36] pt-1 border-t border-gray-100">
                <span>Total:</span>
                <span className="font-barlow text-2xl">
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleCheckoutWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#1fa855] text-white font-bold text-xs uppercase py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Finalizar Pedido via WhatsApp
              </button>

              <a
                href="https://www.mercadolivre.com.br/pagina/becamecomercial1765"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#fab800] hover:bg-[#f5a600] text-[#031438] font-bold text-xs uppercase py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Store className="w-4 h-4" />
                Comprar pelo Mercado Livre
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
