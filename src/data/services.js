import {
  HiDocumentText,
  HiCurrencyDollar,
  HiUserGroup,
  HiCash,
  HiLightBulb,
  HiClipboardCheck,
  HiDocumentSearch,
  HiChartBar,
} from 'react-icons/hi';

/**
 * Service definitions for INEA
 * Each service has:
 * - id: unique identifier (used in routes and i18n keys)
 * - icon: React Icon component
 * - color: Tailwind gradient classes
 * - bgColor: Background color for icon container
 * - iconColor: Icon color class
 * - image: Unsplash image URL
 * - featured: Whether to show in homepage carousel
 */
export const services = [
  {
    id: 'accounting',
    icon: HiDocumentText,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=80',
    featured: true,
    order: 1,
  },
  {
    id: 'tax',
    icon: HiCurrencyDollar,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    image: 'https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?w=800&auto=format&fit=crop&q=80',
    featured: true,
    order: 2,
  },
  {
    id: 'hr',
    icon: HiUserGroup,
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop&q=80',
    featured: false,
    order: 3,
  },
  {
    id: 'payroll',
    icon: HiCash,
    color: 'from-orange-500 to-amber-600',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
    image: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&auto=format&fit=crop&q=80',
    featured: true,
    order: 4,
  },
  {
    id: 'financial',
    icon: HiLightBulb,
    color: 'from-teal-500 to-cyan-600',
    bgColor: 'bg-teal-50',
    iconColor: 'text-teal-600',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    featured: true,
    order: 5,
  },
  {
    id: 'audit',
    icon: HiClipboardCheck,
    color: 'from-red-500 to-rose-600',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop&q=80',
    featured: false,
    order: 6,
  },
  {
    id: 'review',
    icon: HiDocumentSearch,
    color: 'from-indigo-500 to-purple-600',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    image: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=800&auto=format&fit=crop&q=80',
    featured: false,
    order: 7,
  },
  {
    id: 'reporting',
    icon: HiChartBar,
    color: 'from-amber-500 to-yellow-600',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    featured: false,
    order: 8,
  },
];

/**
 * Get all services sorted by order
 */
export const getAllServices = () => {
  return [...services].sort((a, b) => a.order - b.order);
};

/**
 * Get featured services for homepage carousel
 */
export const getFeaturedServices = () => {
  return services.filter(service => service.featured).sort((a, b) => a.order - b.order);
};

/**
 * Get a single service by ID
 */
export const getServiceById = (id) => {
  return services.find(service => service.id === id);
};

/**
 * Get related services (excluding current service)
 */
export const getRelatedServices = (currentId, limit = 3) => {
  return services
    .filter(service => service.id !== currentId)
    .sort((a, b) => a.order - b.order)
    .slice(0, limit);
};

export default services;
