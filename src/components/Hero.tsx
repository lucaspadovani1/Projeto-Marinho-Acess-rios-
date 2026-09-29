import React, { useState } from 'react';
import { BRAND_MODELS_MAP } from '../data/products';

interface HeroProps {
  onApplyFitment: (brand: string, model: string, yearValue: string) => void;
  onExploreCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onApplyFitment, onExploreCatalog }) => {
  const [selectedBrand, setSelectedBrand] = useState('chevrolet');
  const [selectedModel, setSelectedModel] = useState('Chevette');
  const [selectedYear, setSelectedYear] = useState('1987-1993');

  const currentModels = BRAND_MODELS_MAP[selectedBrand] || [];
  const currentModelObj = currentModels.find((m) => m.value === selectedModel) || currentModels[0];
  const currentYears = currentModelObj ? currentModelObj.years : [];

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    const models = BRAND_MODELS_MAP[brand] || [];
    if (models.length > 0) {
      setSelectedModel(models[0].value);
      setSelectedYear(models[0].years[0].value);
    }
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    const found = currentModels.find((m) => m.value === model);
    if (found && found.years.length > 0) {
      setSelectedYear(found.years[0].value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFitment(selectedBrand, selectedModel, selectedYear);
  };

  return (
    <section className="relative bg-gradient-to-br from-[#031438] via-[#051c4d] to-[#08225e] text-white py-12 lg:py-16 px-4 lg:px-8 overflow-hidden shadow-md">
      <div className="absolute -right-20 -top-24 w-96 h-96 rounded-full bg-[#1e3a8a]/20 pointer-events-none blur-3xl"></div>
      <div className="absolute -left-20 -bottom-24 w-80 h-80 rounded-full bg-[#fab800]/10 pointer-events-none blur-3xl"></div>

      <div className="max-w-[80rem] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Coluna da Esquerda: Textos & CTAs (7 Colunas) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h1 className="font-barlow text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-wide leading-tight text-white">
              Peças que mantêm a{' '}
              <span className="text-[#fab800]">história rodando.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#ededf4] max-w-2xl leading-relaxed opacity-95">
              Peças, acessórios e acabamentos técnicos para clássicos nacionais. Consultoria de
              restauro pontual, envio protegido e homologação com Mercado Livre Oficial.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreCatalog}
                className="bg-[#fab800] hover:bg-[#f5a600] text-[#031438] font-bold text-sm px-6 py-3 rounded-lg flex items-center gap-2 shadow-md transition-all transform active:scale-95 cursor-pointer uppercase tracking-wider"
              >
                <span className="material-symbols-outlined text-[20px]">manage_search</span>
                Encontrar minha peça
              </button>

              <a
                href="https://api.whatsapp.com/send?phone=554530372929&text=Ol%C3%A1%2C%20gostaria%20de%20consultar%20uma%20pe%C3%A7a%20para%20meu%20cl%C3%A1ssico."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#020d26] hover:bg-[#031438] text-white font-semibold text-sm px-5 py-3 rounded-lg flex items-center gap-2 shadow-sm transition-colors border border-white/15"
              >
                <span className="material-symbols-outlined text-[20px] text-[#25D366]">chat</span>
                WhatsApp (45) 3037-2929
              </a>
            </div>
          </div>

          {/* Coluna da Direita: Card Busca por Clássico (5 Colunas) */}
          <div className="lg:col-span-5">
            <div className="bg-white text-[#0f172a] p-6 sm:p-7 rounded-xl shadow-2xl border border-gray-100">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#fab800] text-[24px]">garage</span>
                  <span className="font-barlow text-xl uppercase text-[#031438] font-bold tracking-wide">
                    Busca por Clássico
                  </span>
                </div>
                <span className="font-mono text-[10px] text-gray-500 bg-[#f1f5f9] px-2 py-0.5 rounded font-semibold border border-gray-200">
                  FITMENT DIRECT
                </span>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 pt-1">
                {/* 1. Marca / Fabricante */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-gray-600 uppercase font-semibold">
                    1. Marca / Fabricante
                  </label>
                  <div className="relative">
                    <select
                      value={selectedBrand}
                      onChange={(e) => handleBrandChange(e.target.value)}
                      className="w-full h-10 px-3 pr-8 bg-[#eaeff5] text-[#0f172a] text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fab800] cursor-pointer appearance-none font-medium"
                    >
                      <option value="chevrolet">Chevrolet (GM)</option>
                      <option value="vw">Volkswagen (VW)</option>
                      <option value="ford">Ford</option>
                      <option value="fiat">Fiat</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-2.5 text-gray-500 pointer-events-none text-[20px]">
                      expand_more
                    </span>
                  </div>
                </div>

                {/* 2. Modelo do Veículo */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-gray-600 uppercase font-semibold">
                    2. Modelo do Veículo
                  </label>
                  <div className="relative">
                    <select
                      value={selectedModel}
                      onChange={(e) => handleModelChange(e.target.value)}
                      className="w-full h-10 px-3 pr-8 bg-[#eaeff5] text-[#0f172a] text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fab800] cursor-pointer appearance-none font-medium"
                    >
                      {currentModels.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-2.5 text-gray-500 pointer-events-none text-[20px]">
                      expand_more
                    </span>
                  </div>
                </div>

                {/* 3. Ano de Fabricação */}
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-gray-600 uppercase font-semibold">
                    3. Ano de Fabricação
                  </label>
                  <div className="relative">
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full h-10 px-3 pr-8 bg-[#eaeff5] text-[#0f172a] text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fab800] cursor-pointer appearance-none font-medium"
                    >
                      {currentYears.map((y) => (
                        <option key={y.value} value={y.value}>
                          {y.label}
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-2.5 text-gray-500 pointer-events-none text-[20px]">
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Botão de Submissão */}
                <button
                  type="submit"
                  className="w-full mt-2 bg-[#fab800] hover:bg-[#f5a600] text-[#031438] font-bold text-sm py-3 rounded-lg flex items-center justify-center gap-2 shadow-md transition-colors uppercase tracking-wider cursor-pointer active:scale-98"
                >
                  <span className="material-symbols-outlined text-[20px]">tune</span>
                  Filtrar Peças Compatíveis
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
