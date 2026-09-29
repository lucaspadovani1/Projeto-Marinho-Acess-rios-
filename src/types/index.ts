export interface Product {
  id: string;
  name: string;
  vehicleLine: string; // e.g. "CHEVROLET · CHEVETTE 1987–1993"
  vehicle: string; // "Chevette", "Opala", "Gol Quadrado", "Fusca", "Saveiro", "Corcel", "Celta / Corsa", "D10"
  brand: 'Chevrolet' | 'Volkswagen' | 'Ford' | 'Fiat';
  vehicleType: 'Carros' | 'Motos' | 'Utilitários / Pickups';
  years: string; // "1987 a 1993"
  yearMin: number;
  yearMax: number;
  price: number;
  installments: number;
  installmentValue: number;
  sku: string;
  oemCode?: string;
  category:
    | 'Lanternas & Iluminação'
    | 'Grades & Frontais'
    | 'Emblemas de Época'
    | 'Frisos & Acabamentos'
    | 'Borrachas & Canaletas'
    | 'Maçanetas & Fechaduras'
    | 'Manoplas & Câmbio'
    | 'Retrovisores'
    | 'Forros & Interior';
  position: 'Exterior' | 'Interior';
  badge: string; // "Original Padrão", "Mais Procurado", "Kit Restauro", "Linha VW", etc.
  badgeType: 'primary' | 'secondary' | 'accent' | 'warning';
  image: string;
  inStock: boolean;
  stockType: 'Em Estoque' | 'Últimas Unidades' | 'Sob Encomenda';
  specs: {
    material: string;
    origem: string;
    lado?: string;
    condicao: string;
    garantia: string;
    incluso: string;
  };
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  search: string;
  vehicleType: string[];
  brand: string[];
  vehicle: string | null;
  category: string[];
  yearMin: number;
  yearMax: number;
  position: string | null;
  availability: string[];
  sortBy: 'relevantes' | 'procurados' | 'recentes' | 'menor-preco' | 'maior-preco' | 'alfabetica';
}
