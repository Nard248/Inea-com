import {
  HiCube,
  HiShoppingCart,
  HiDesktopComputer,
  HiOfficeBuilding,
  HiTruck,
  HiGlobe,
  HiAcademicCap,
  HiHeart,
} from 'react-icons/hi';

/**
 * Industry definitions for INEA
 * Each industry represents a business sector INEA provides specialized accounting services for
 * - id: unique identifier (used in routes and i18n keys)
 * - icon: React Icon component
 * - color: Tailwind gradient classes
 * - bgColor: Background color for icon container
 * - iconColor: Icon color class
 * - image: Unsplash image URL representing the industry
 */
export const industries = [
  {
    id: 'manufacturing',
    icon: HiCube,
    color: 'from-slate-600 to-slate-800',
    bgColor: 'bg-slate-50',
    iconColor: 'text-slate-600',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80',
    order: 1,
  },
  {
    id: 'trade',
    icon: HiShoppingCart,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&auto=format&fit=crop&q=80',
    order: 2,
  },
  {
    id: 'it',
    icon: HiDesktopComputer,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=80',
    order: 3,
  },
  {
    id: 'construction',
    icon: HiOfficeBuilding,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80',
    order: 4,
  },
  {
    id: 'logistics',
    icon: HiTruck,
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
    order: 5,
  },
  {
    id: 'tourism',
    icon: HiGlobe,
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-50',
    iconColor: 'text-rose-600',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80',
    order: 6,
  },
  {
    id: 'education',
    icon: HiAcademicCap,
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80',
    order: 7,
  },
  {
    id: 'healthcare',
    icon: HiHeart,
    color: 'from-red-500 to-rose-600',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80',
    order: 8,
  },
];

/**
 * Get all industries sorted by order
 */
export const getAllIndustries = () => {
  return [...industries].sort((a, b) => a.order - b.order);
};

/**
 * Get a single industry by ID
 */
export const getIndustryById = (id) => {
  return industries.find(industry => industry.id === id);
};

export default industries;
