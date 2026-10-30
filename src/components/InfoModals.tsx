import React from 'react';
import { X, Store, Award, Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

interface InfoModalProps {
  type: 'sobre' | 'contato' | 'conta' | null;
  onClose: () => void;
}

export const InfoModals: React.FC<InfoModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000d36]/75 backdrop-blur-xs animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#031438] text-white border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="font-barlow text-xl uppercase font-bold tracking-wide text-[#fab800]">
              {type === 'sobre' && 'Sobre a Marinho Acessórios'}
              {type === 'contato' && 'Canais de Atendimento & Contato'}
              {type === 'conta' && 'Minha Conta & Pedidos'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto text-sm text-[#1a1b21] flex flex-col gap-4">
          {type === 'sobre' && (
            <div className="flex flex-col gap-4 leading-relaxed">
              <div className="flex items-center gap-3 p-3 bg-[#ededf4] rounded-xl">
                <Store className="w-8 h-8 text-[#000d36]" />
                <div>
                  <h4 className="font-barlow text-lg uppercase font-bold text-[#000d36]">
                    Tradição e Paixão por Clássicos Automotivos
                  </h4>
                  <p className="text-xs text-gray-500">
                    Sediada em Cascavel - Paraná, atendendo entusiastas em todo o Brasil.
                  </p>
                </div>
              </div>

              <p>
                A <strong>Marinho Acessórios</strong> nasceu da paixão genuína por veículos que
                marcaram época nas ruas e pistas do Brasil. Especializada na linha de acabamentos
                originais para{' '}
                <strong>Chevette, Opala, Caravan, Gol Quadrado, Fusca, Corcel</strong> e outros
                ícones nacionais.
              </p>

              <p>
                Nosso compromisso não é apenas vender uma peça, mas garantir que o seu projeto de
                restauro mantenha o alinhamento, a tonalidade de época e o encaixe perfeito. Todos os
                nossos lotes passam por conferência dimensional antes de entrar no catálogo.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-2">
                  <Award className="w-4 h-4 text-[#ffb61d] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#000d36]">MercadoLíder Platinum</strong>
                    <span>+10.000 clientes atendidos com nota máxima de satisfação.</span>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#000d36]">Embalagem Reforçada</strong>
                    <span>Madeiramento e amortecimento especial para faróis e frisos frágeis.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {type === 'contato' && (
            <div className="flex flex-col gap-4">
              <p className="text-xs text-gray-600">
                Fale com nossa equipe técnica de atendimento. Estamos prontos para conferir números de
                chassis, fotos e medidas da sua peça.
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href="https://api.whatsapp.com/send?phone=5545999277822"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#25D366]" />
                  <div>
                    <strong className="block text-[#002109]">Plantão WhatsApp Oficial</strong>
                    <span className="text-xs text-gray-600">(45) 99927-7822 — Resposta rápida</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <MapPin className="w-5 h-5 text-[#ffb61d]" />
                  <div>
                    <strong className="block text-[#000d36]">Balcão Físico em Cascavel</strong>
                    <span className="text-xs text-gray-600">
                      Rua Erechim, 390 - Centro / Região do Lago 1 | Cascavel - PR
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <strong className="block text-[#000d36]">Horário de Atendimento</strong>
                    <span className="text-xs text-gray-600">
                      Segunda a Sexta: 08:00 às 18:00 | Sábado: 08:00 às 12:00
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <strong className="block text-[#000d36]">E-mail Corporativo</strong>
                    <span className="text-xs text-gray-600">contato@marinhoacessorios.com.br</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {type === 'conta' && (
            <div className="flex flex-col gap-4 text-center py-4">
              <Store className="w-12 h-12 text-[#000d36] mx-auto" />
              <h4 className="font-barlow text-xl uppercase font-bold text-[#000d36]">
                Acompanhamento de Pedidos &amp; Loja Oficial
              </h4>
              <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
                Nossos pedidos são processados com rastreio prioritário via Mercado Envios ou
                diretamente em nosso balcão. Para consultar o código de rastreamento do seu pacote ou
                fazer uma cotação com CNPJ de oficina, use os botões abaixo:
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href="https://www.mercadolivre.com.br/pagina/becamecomercial1765"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#fab800] hover:bg-[#f5a600] text-[#031438] font-bold text-xs uppercase px-5 py-3 rounded-xl shadow-xs"
                >
                  Minhas Compras no Mercado Livre
                </a>

                <a
                  href="https://api.whatsapp.com/send?phone=5545999277822&text=Ol%C3%A1%2C%20gostaria%20de%20consultar%20o%20rastreio%20do%20meu%20pedido."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#000d36] hover:bg-[#0e2257] text-white font-semibold text-xs uppercase px-5 py-3 rounded-xl shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-4 h-4 text-[#25D366]" />
                  Consultar Rastreio via WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
