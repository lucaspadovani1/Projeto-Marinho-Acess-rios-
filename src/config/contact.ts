export const CONTACT_CONFIG = {
  phone: '45999277822',
  phoneFormatted: '(45) 99927-7822',
  phoneDisplayShort: '(45) 99927-7822',
  whatsappRaw: '5545999277822',
  whatsappFormatted: '(45) 99927-7822',
  whatsappFull: '+55 (45) 99927-7822',
  whatsappUrl: 'https://api.whatsapp.com/send?phone=5545999277822',
  getWhatsappUrl: (text?: string) => {
    const base = 'https://api.whatsapp.com/send?phone=5545999277822';
    if (!text) return base;
    return `${base}&text=${encodeURIComponent(text)}`;
  },
};
