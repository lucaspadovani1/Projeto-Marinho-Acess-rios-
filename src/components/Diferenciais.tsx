import React from 'react';

export const Diferenciais: React.FC = () => {
  const items = [
    {
      icon: 'directions_car',
      title: 'Peças para Clássicos',
      description:
        'Linha completa de acabamentos originais, frisos, borrachas e lanternas de época.',
    },
    {
      icon: 'support_agent',
      title: 'Atendimento Especializado',
      description:
        'Equipe técnica que entende o código de chassis, ano/modelo e particularidades de cada projeto.',
    },
    {
      icon: 'local_shipping',
      title: 'Envio para Todo Brasil',
      description:
        'Embalagens industriais reforçadas para grades, faróis e componentes frágeis.',
    },
    {
      icon: 'verified_user',
      title: 'Compra 100% Segura',
      description:
        'Loja Oficial Mercado Livre com reputação MercadoLíder Platinum e garantia formal.',
    },
  ];

  return (
    <section className="bg-white py-8 px-4 lg:px-8 border-b border-gray-100 shadow-xs">
      <div className="max-w-[80rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div key={index} className="flex items-start gap-3.5 p-2">
              <div className="w-12 h-12 rounded-xl bg-[#eaeff5] flex items-center justify-center text-[#08225e] shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[26px]">{item.icon}</span>
              </div>
              <div>
                <h3 className="font-barlow text-lg font-bold uppercase tracking-wide text-[#031438]">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
