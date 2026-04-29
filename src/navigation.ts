import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'About', href: getPermalink('/#about') },
    { text: 'Services', href: getPermalink('/#services') },
    { text: 'Why Choose Us', href: getPermalink('/#why-us') },
    { text: 'Service Area', href: getPermalink('/#service-area') },
    { text: 'Testimonials', href: getPermalink('/#testimonials') },
    { text: 'Contact', href: getPermalink('/#contact') },
  ],
  actions: [{ text: 'Call Now: 940-222-2308', href: 'tel:940-222-2308' }],
};

export const footerData = {
  links: [
    {
      title: 'Quick Links',
      links: [
        { text: 'About', href: '#about' },
        { text: 'Services', href: '#services' },
        { text: 'Service Area', href: '#service-area' },
        { text: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { text: '940-222-2308', href: 'tel:940-222-2308' },
        { text: 'Drew@highnoonpoolcare.com', href: 'mailto:Drew@highnoonpoolcare.com' },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'https://www.facebook.com/highnoonpoolcare' },
  ],
  footNote: '© 2026 High Noon Pool Care. All rights reserved.',
};
