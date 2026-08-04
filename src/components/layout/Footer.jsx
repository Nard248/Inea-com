import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  HiLocationMarker,
  HiPhone,
  HiMail,
  HiClock,
  HiHeart,
} from 'react-icons/hi';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
  FaWhatsapp,
} from 'react-icons/fa';
import { contactInfo } from '../../data/contact';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/calculators', label: t('nav.calculators') },
    { to: '/pricing', label: t('nav.pricing') },
    { to: '/blog', label: t('nav.blog') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const services = [
    t('services.accounting.title'),
    t('services.tax.title'),
    t('services.hr.title'),
    t('services.payroll.title'),
    t('services.financial.title'),
    t('services.audit.title'),
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: contactInfo.social.facebook, label: 'Facebook' },
    { icon: FaInstagram, href: contactInfo.social.instagram, label: 'Instagram' },
    { icon: FaLinkedinIn, href: contactInfo.social.linkedin, label: 'LinkedIn' },
    { icon: FaTelegram, href: contactInfo.social.telegram, label: 'Telegram' },
    { icon: FaWhatsapp, href: contactInfo.social.whatsapp, label: 'WhatsApp' },
  ];

  return (
    <footer className="relative pt-20 pb-10 overflow-hidden bg-gray-900">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />
      </div>

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid gap-10 mb-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <div className="inline-block p-2 bg-white rounded-lg">
                <img src={`${import.meta.env.BASE_URL}Logo.png`} alt="INEA" className="w-auto h-10" />
              </div>
            </Link>
            <p className="mb-6 text-gray-400 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 text-gray-400 transition-all rounded-lg bg-gray-800/50 hover:bg-primary-600 hover:text-white"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-sm font-semibold tracking-wider text-white uppercase">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 transition-colors hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-6 text-sm font-semibold tracking-wider text-white uppercase">
              {t('footer.services')}
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to="/services"
                    className="text-gray-400 transition-colors hover:text-primary-400"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-6 text-sm font-semibold tracking-wider text-white uppercase">
              {t('contact.title')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <HiLocationMarker className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary-500" />
                <span className="text-gray-400">{t('contact.info.addressValue')}</span>
              </li>
              <li className="flex items-start gap-3">
                <HiPhone className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary-500" />
                <span className="flex flex-col">
                  {contactInfo.phones.map((phone) => (
                    <a
                      key={phone.href}
                      href={phone.href}
                      className="text-gray-400 transition-colors hover:text-primary-400 whitespace-nowrap"
                    >
                      {phone.display}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <HiMail className="w-5 h-5 flex-shrink-0 text-primary-500" />
                <a href={contactInfo.emailHref} className="text-gray-400 transition-colors hover:text-primary-400">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <HiClock className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary-500" />
                <span className="text-gray-400">{t('contact.info.hoursValue')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} {t('footer.brand')}. {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link to="/privacy" className="transition-colors hover:text-primary-400">
                {t('footer.privacy')}
              </Link>
              <Link to="/terms" className="transition-colors hover:text-primary-400">
                {t('footer.terms')}
              </Link>
            </div>
            <p className="flex items-center text-sm text-gray-500">
              {t('footer.madeWith')}{' '}
              <HiHeart className="w-4 h-4 mx-1 text-red-500" />{' '}
              {t('footer.inArmenia')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
