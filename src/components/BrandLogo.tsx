import React, { useState } from 'react';
import logoTransparent from '../assets/images/marinho_logo_original_transparent.png';
import logoTransparent2x from '../assets/images/marinho_logo_original_transparent@2x.png';
import logoMatched from '../assets/images/marinho_logo_original_matched.png';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'header' | 'matched';
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'header',
  size = 'md',
}) => {
  const [hasError, setHasError] = useState(false);

  // Height configurations for seamless header and footer proportions
  const heightClass =
    size === 'sm' ? 'h-8 md:h-9' : size === 'lg' ? 'h-12 md:h-14' : 'h-9 md:h-11';

  // Original logo with modified background color compatible with the site:
  // - Transparent with anti-aliasing against the site's #031438 background
  // - Or solid matched background if specified
  const primarySrc = variant === 'matched' ? logoMatched : logoTransparent;

  if (hasError) {
    return (
      <div className={`inline-flex items-center gap-2 select-none ${className}`}>
        <span className="font-barlow text-2xl font-bold tracking-tight text-white uppercase">
          Marinho <span className="text-[#fab800]">Acessórios</span>
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={primarySrc}
        srcSet={variant === 'matched' ? undefined : `${logoTransparent} 1x, ${logoTransparent2x} 2x`}
        alt="Marinho Acessórios - Peças para Clássicos"
        className={`${heightClass} w-auto object-contain drop-shadow-sm select-none`}
        onError={() => setHasError(true)}
        loading="eager"
        decoding="async"
      />
    </div>
  );
};
