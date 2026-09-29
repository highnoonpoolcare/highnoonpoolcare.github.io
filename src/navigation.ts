import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'About', href: getPermalink('/#about') },
    {
      text: 'Services',
      links: [
        { text: 'All Services', href: getPermalink('/services') },
        { text: 'Weekly Pool Service', href: getPermalink('/services/weekly-pool-service') },
        { text: 'Pool Cleaning', href: getPermalink('/services/pool-cleaning') },
        { text: 'Chemical Balancing', href: getPermalink('/services/chemical-balancing') },
        { text: 'Filter Cleaning', href: getPermalink('/services/filter-cleaning') },
        { text: 'Green-to-Clean Recovery', href: getPermalink('/services/green-to-clean') },
        { text: 'One-Time Service', href: getPermalink('/services/one-time-pool-service') },
      ],
    },
    {
      text: 'Service Areas',
      links: [
        { text: 'Corinth', href: getPermalink('/pool-service/corinth-tx') },
        { text: 'Denton', href: getPermalink('/pool-service/denton-tx') },
        { text: 'Lewisville', href: getPermalink('/pool-service/lewisville-tx') },
        { text: 'Highland Village', href: getPermalink('/pool-service/highland-village-tx') },
        { text: 'Lake Dallas', href: getPermalink('/pool-service/lake-dallas-tx') },
        { text: 'All Areas', href: getPermalink('/#service-area') },
      ],
    },
    { text: 'Pool Care Tips', href: getBlogPermalink() },
    { text: 'Contact', href: getPermalink('/#contact') },
  ],
  actions: [{ text: 'Call Now: 940-222-2308', href: 'tel:940-222-2308' }],
};

export const footerData = {
  links: [
    {
      title: 'Services',
      links: [
        { text: 'Weekly Pool Service', href: getPermalink('/services/weekly-pool-service') },
        { text: 'Pool Cleaning', href: getPermalink('/services/pool-cleaning') },
        { text: 'Chemical Balancing', href: getPermalink('/services/chemical-balancing') },
        { text: 'Filter Cleaning', href: getPermalink('/services/filter-cleaning') },
        { text: 'Green-to-Clean Recovery', href: getPermalink('/services/green-to-clean') },
        { text: 'One-Time Service', href: getPermalink('/services/one-time-pool-service') },
      ],
    },
    {
      title: 'Service Areas',
      links: [
        { text: 'Pool Service in Corinth', href: getPermalink('/pool-service/corinth-tx') },
        { text: 'Pool Service in Denton', href: getPermalink('/pool-service/denton-tx') },
        { text: 'Pool Service in Lewisville', href: getPermalink('/pool-service/lewisville-tx') },
        { text: 'Pool Service in Highland Village', href: getPermalink('/pool-service/highland-village-tx') },
        { text: 'Pool Service in Lake Dallas', href: getPermalink('/pool-service/lake-dallas-tx') },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: getPermalink('/#about') },
        { text: 'Pool Care Tips', href: getBlogPermalink() },
        { text: 'Contact', href: getPermalink('/#contact') },
      ],
    },
    {
      title: 'Contact',
      links: [
        { text: '940-222-2308', href: 'tel:940-222-2308' },
        { text: 'info@highnoonpoolcare.com', href: 'mailto:info@highnoonpoolcare.com' },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'https://www.facebook.com/highnoonpoolcare' },
  ],
  footNote: '© 2026 High Noon Pool Care. All rights reserved.',
};
