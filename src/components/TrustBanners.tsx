import React from 'react';
import { ShieldCheck, CheckCircle, Store, MessageCircle, Phone } from 'lucide-react';

export const TrustBanners: React.FC = () => {
  return (
    <section className="py-12 px-4 lg:px-8 bg-[#f1f5f9]">
      <div className="max-w-[80rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card Mercado Livre */}
        <div className="bg-white p-7 sm:p-8 rounded-2xl shadow-xs flex flex-col justify-between relative overflow-hidden border border-gray-100">
          <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-[#fab800]/10 pointer-events-none blur-2xl"></div>

          <div className="flex flex-col gap-3 relative z-10">
            <div className="flex items-center gap-2 text-[#c98800] font-bold">
              <ShieldCheck className="w-6 h-6 text-[#fab800]" />
              <span className="font-barlow text-lg uppercase tracking-wider">
                MercadoLíder Platinum
              </span>
            </div>

            <h3 className="font-barlow text-2xl sm:text-3xl font-bold uppercase text-[#031438] leading-tight">
              Compre com total segurança na Loja Oficial Mercado Livre
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed">
              Tenha a proteção do Programa Compra Garantida: receba exatamente o item do catálogo ou
              seu dinheiro de volta. Frete com rastreio prioritário Mercado Envios e parcelamento em
              até 12x sem juros.
            </p>

            <div className="flex items-center gap-4 pt-1 font-mono text-xs text-gray-500 flex-wrap">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#00a34a]" />
                +10.000 Vendas Concluídas
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#00a34a]" />
                Despacho em 24h
              </span>
            </div>
          </div>

          <div className="pt-6 relative z-10">
            <a
              href="https://www.mercadolivre.com.br/pagina/becamecomercial1765"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#fab800] hover:bg-[#f5a600] text-[#031438] font-bold text-xs uppercase px-6 py-3 rounded-lg shadow-sm transition-colors tracking-wider"
            >
              <Store className="w-4 h-4" />
              Acessar Loja Oficial Mercado Livre
            </a>
          </div>
        </div>

        {/* Card Fale Conosco WhatsApp */}
        <div className="bg-gradient-to-br from-[#031438] via-[#051c4d] to-[#08225e] text-white p-7 sm:p-8 rounded-2xl shadow-xs flex flex-col justify-between relative overflow-hidden border border-white/10">
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-[#1e3a8a]/30 pointer-events-none blur-2xl"></div>

          <div className="flex flex-col gap-3 relative z-10">
            <div className="flex items-center gap-2 text-[#25D366] font-bold">
              <MessageCircle className="w-6 h-6" />
              <span className="font-barlow text-lg uppercase tracking-wider">
                Atendimento Técnico &amp; Suporte
              </span>
            </div>

            <h3 className="font-barlow text-2xl sm:text-3xl font-bold uppercase text-white leading-tight">
              Dúvida na compatibilidade do chassi ou ano de fabricação?
            </h3>

            <p className="text-sm text-[#ededf4] leading-relaxed">
              Fale direto com a bancada da Marinho Acessórios. Envie fotos da peça quebrada ou o
              documento do seu carro para confirmarmos o encaixe exato antes de fechar o pedido.
            </p>

            <div className="flex items-center gap-4 pt-1 font-mono text-xs text-[#dbe1ff] flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                Resposta rápida
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#fab800]" />
                Cascavel-PR: (45) 99927-7822
              </span>
            </div>
          </div>

          <div className="pt-6 relative z-10">
            <a
              href="https://api.whatsapp.com/send?phone=5545999277822&text=Ol%C3%A1%2C%20tenho%20uma%20d%C3%BAvida%20t%C3%A9cnica%20sobre%20compatibilidade%20de%20pe%C3%A7as."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fa855] text-white font-bold text-xs uppercase px-6 py-3 rounded-lg shadow-sm transition-colors tracking-wider"
            >
              <MessageCircle className="w-4 h-4" />
              Fale conosco no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

