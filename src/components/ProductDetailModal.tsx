import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Store, ShieldCheck, Check, Truck, HelpCircle } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}) => {
  if (!product) return null;

  const whatsappMessage = encodeURIComponent(
    `Olá, equipe Marinho Acessórios! Tenho interesse na peça: ${product.name} (SKU: ${product.sku}). Poderiam me confirmar a compatibilidade para o meu carro?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#000d36]/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#031438] text-white">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#fab800] font-semibold uppercase tracking-wider">
              FICHA TÉCNICA DO COMPONENTE
            </span>
            <span className="text-white/40">|</span>
            <span className="text-xs text-white/80 font-mono">SKU: {product.sku}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Image & Badges (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="relative w-full aspect-4/3 bg-[#f1f5f9] rounded-xl overflow-hidden flex items-center justify-center p-4 border border-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (!target.src.includes('foto-em-breve.svg')) {
                    target.src = '/assets/products/foto-em-breve.svg';
                  }
                }}
              />
              <span className="absolute top-3 left-3 bg-[#031438] text-[#fab800] font-mono text-[10px] uppercase px-2.5 py-1 rounded font-bold shadow-sm">
                {product.badge}
              </span>
              <button
                onClick={() => onToggleFavorite(product)}
                className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition-colors cursor-pointer ${
                  isFavorite ? 'text-[#ba1a1a]' : 'text-gray-400 hover:text-[#ba1a1a]'
                }`}
                title="Favoritar"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="bg-[#f8fafd] p-3.5 rounded-xl border border-gray-200/80 flex flex-col gap-2 text-xs text-gray-600">
              <div className="flex items-center gap-2 text-[#031438] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#fab800]" />
                <span>Garantia de Compatibilidade Técnica</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Confirmamos o código do chassi e medidas antes do envio. Caso não dê encaixe perfeito, você recebe 100% do seu dinheiro de volta.
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] text-gray-500">
                <Truck className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Envio rápido via Mercado Envios ou Retirada em Cascavel - PR</span>
              </div>
            </div>
          </div>

          {/* Right Column: Information, Pricing, Specs (7 cols) */}
          <div className="md:col-span-7 flex flex-col gap-4">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-barlow text-sm uppercase tracking-wide text-[#08225e] font-bold">
                  {product.vehicleLine}
                </span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                    !product.inStock || product.stockType === 'Sem Estoque'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-[#66ff8e]/30 text-[#002109]'
                  }`}
                >
                  {!product.inStock ? 'Sem Estoque' : product.stockType}
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#0f172a] leading-snug">
                {product.name}
              </h2>
              {product.oemCode && (
                <div className="mt-1 inline-block font-mono text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  Código Original: <strong className="text-gray-700">{product.oemCode}</strong>
                </div>
              )}
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-[#f1f5f9] border border-gray-200/60 flex items-baseline justify-between">
              {product.inStock && product.price > 0 ? (
                <>
                  <div>
                    <span className="text-xs text-gray-500 block">Preço à vista no Pix ou ML</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-barlow text-3xl font-bold text-[#031438]">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-600 block">
                      Em até <strong>{product.installments}x</strong> de
                    </span>
                    <span className="font-barlow text-lg font-bold text-[#c98800]">
                      R$ {product.installmentValue.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </>
              ) : (
                <div className="w-full">
                  <span className="text-xs text-amber-700 font-semibold block uppercase tracking-wide">
                    Item sem valor / aguardando reposição
                  </span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="font-barlow text-2xl font-bold text-gray-500">
                      Sob Consulta
                    </span>
                    <span className="text-xs text-gray-500 font-mono">
                      Consulte nossa equipe
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.inStock && product.price > 0 ? (
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="bg-[#fab800] hover:bg-[#f5a600] text-[#031438] font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer text-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Adicionar ao Carrinho
                </button>
              ) : (
                <a
                  href={`https://api.whatsapp.com/send?phone=554530372929&text=${encodeURIComponent(
                    `Olá, equipe Marinho! Gostaria de consultar a cotação/previsão para a peça sem estoque: ${product.name} (SKU: ${product.sku})`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-100 hover:bg-amber-200 text-[#031438] font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all text-sm border border-amber-300"
                >
                  <HelpCircle className="w-4 h-4 text-amber-700" />
                  Consultar Disponibilidade
                </a>
              )}

              <a
                href={product.mlUrl || "https://www.mercadolivre.com.br/pagina/becamecomercial1765"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#031438] hover:bg-[#08225e] text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors text-sm"
              >
                <Store className="w-4 h-4 text-[#fab800]" />
                Ver no Mercado Livre
              </a>
            </div>

            {/* Direct WhatsApp Specialist Question */}
            <a
              href={`https://api.whatsapp.com/send?phone=554530372929&text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#005322] font-semibold py-2 px-3 rounded-lg border border-[#25D366]/30 flex items-center justify-center gap-2 text-xs transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-[#25D366]" />
              Dúvida técnica de aplicação? Pergunte no WhatsApp da Loja
            </a>

            {/* Description */}
            <div className="pt-1">
              <h4 className="text-xs font-bold uppercase text-gray-700 tracking-wider mb-1.5">
                Descrição &amp; Detalhes de Restauro
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications Table */}
            <div className="pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold uppercase text-gray-700 tracking-wider mb-2">
                Especificações Técnicas
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-gray-50 p-2 rounded">
                  <span className="text-gray-400 block text-[10px] uppercase">Material</span>
                  <span className="font-medium text-gray-800">{product.specs.material}</span>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <span className="text-gray-400 block text-[10px] uppercase">Padrão / Origem</span>
                  <span className="font-medium text-gray-800">{product.specs.origem}</span>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <span className="text-gray-400 block text-[10px] uppercase">Condição</span>
                  <span className="font-medium text-gray-800">{product.specs.condicao}</span>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <span className="text-gray-400 block text-[10px] uppercase">Garantia</span>
                  <span className="font-medium text-gray-800">{product.specs.garantia}</span>
                </div>
                <div className="col-span-2 bg-gray-50 p-2 rounded">
                  <span className="text-gray-400 block text-[10px] uppercase">Conteúdo da Embalagem</span>
                  <span className="font-medium text-gray-800">{product.specs.incluso}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
