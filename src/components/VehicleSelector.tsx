import React from 'react';
import { VEHICLE_LIST } from '../data/products';

interface VehicleSelectorProps {
  selectedVehicle: string | null;
  onSelectVehicle: (vehicleName: string) => void;
}

export const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  selectedVehicle,
  onSelectVehicle,
}) => {
  return (
    <section id="veiculos" className="py-12 px-4 lg:px-8 bg-[#f1f5f9] border-b border-gray-200">
      <div className="max-w-[80rem] mx-auto flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
          <div>
            <span className="text-[11px] font-mono text-[#c98800] uppercase tracking-widest font-bold">
              Navegação Rápida
            </span>
            <h2 className="font-barlow text-3xl sm:text-4xl font-bold uppercase text-[#031438] tracking-wide">
              Encontre pelo seu veículo
            </h2>
          </div>
          <p className="text-xs text-gray-500">
            Selecione o chassi para carregar instantaneamente as peças compatíveis
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2.5">
          {VEHICLE_LIST.map((vehicle) => {
            const isSelected = selectedVehicle === vehicle.name;
            return (
              <button
                key={vehicle.name}
                onClick={() => onSelectVehicle(vehicle.name)}
                className={`flex flex-col items-center p-3 rounded-xl shadow-xs transition-all text-center group cursor-pointer border ${
                  isSelected
                    ? 'bg-[#031438] text-white border-[#fab800] ring-2 ring-[#fab800]/50'
                    : 'bg-white hover:bg-gray-50 text-[#0f172a] border-gray-100 hover:shadow-md'
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all mb-2 p-1.5 ${
                    isSelected
                      ? 'bg-white/15 ring-2 ring-[#fab800]'
                      : 'bg-[#eaeff5] group-hover:bg-[#f8fafd] group-hover:shadow-inner'
                  }`}
                >
                  <img
                    src={vehicle.image}
                    alt={vehicle.label || vehicle.name}
                    className="w-13 h-13 object-contain group-hover:scale-110 transition-transform duration-200"
                    loading="lazy"
                  />
                </div>
                <span
                  className={`font-barlow text-base font-bold uppercase tracking-wide truncate max-w-full ${
                    isSelected ? 'text-[#fab800]' : 'text-[#031438]'
                  }`}
                >
                  {vehicle.label || vehicle.name}
                </span>
                <span
                  className={`font-mono text-[10px] mt-0.5 ${
                    isSelected ? 'text-gray-300' : 'text-gray-500'
                  }`}
                >
                  {vehicle.years}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
