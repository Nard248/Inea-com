import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  HiLocationMarker,
  HiPhone,
  HiMail,
  HiClock,
  HiPaperAirplane,
} from 'react-icons/hi';
import {
  FaTelegram,
  FaWhatsapp,
  FaViber,
} from 'react-icons/fa';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const services = [
    { value: 'tax', label: t('services.tax.title') },
    { value: 'bookkeeping', label: t('services.bookkeeping.title') },
    { value: 'audit', label: t('services.audit.title') },
    { value: 'payroll', label: t('services.payroll.title') },
    { value: 'registration', label: t('services.registration.title') },
    { value: 'consulting', label: t('services.consulting.title') },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: '',
    });

    // Reset status after 5 seconds
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  const contactInfo = [
    {
      icon: HiLocationMarker,
      label: t('contact.info.address'),
      value: t('contact.info.addressValue'),
      href: 'https://maps.google.com/?q=Yerevan,Armenia',
    },
    {
      icon: HiPhone,
      label: t('contact.info.phone'),
      value: '+374 10 123 456',
      href: 'tel:+37410123456',
    },
    {
      icon: HiMail,
      label: t('contact.info.email'),
      value: 'info@inea.am',
      href: 'mailto:info@inea.am',
    },
    {
      icon: HiClock,
      label: t('contact.info.hours'),
      value: t('contact.info.hoursValue'),
    },
  ];

  const quickContacts = [
    { icon: FaTelegram, href: 'https://t.me/inea_am', label: 'Telegram', color: 'hover:bg-blue-500' },
    { icon: FaWhatsapp, href: 'https://wa.me/37410123456', label: 'WhatsApp', color: 'hover:bg-green-500' },
    { icon: FaViber, href: 'viber://chat?number=+37410123456', label: 'Viber', color: 'hover:bg-purple-500' },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gray-50 lg:py-32" id="contact">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl" />

      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold rounded-full text-primary-700 bg-primary-100">
            Contact Us
          </span>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-subtitle">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 bg-white shadow-xl rounded-2xl"
            >
              <div className="grid gap-6 md:grid-cols-2">
                {/* Name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    {t('contact.form.name')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    {t('contact.form.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    {t('contact.form.phone')} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="+374 XX XXX XXX"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    {t('contact.form.company')}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Your Company LLC"
                  />
                </div>

                {/* Service */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    {t('contact.form.service')} *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">{t('contact.form.selectService')}</option>
                    {services.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    {t('contact.form.message')} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="input-field resize-none"
                    placeholder="Tell us about your needs..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center w-full mt-6 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="w-5 h-5 mr-2 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {t('contact.form.sending')}
                  </>
                ) : (
                  <>
                    <HiPaperAirplane className="w-5 h-5 mr-2" />
                    {t('contact.form.submit')}
                  </>
                )}
              </motion.button>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 mt-4 text-green-700 rounded-lg bg-green-50"
                >
                  {t('contact.form.success')}
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 lg:col-span-2"
          >
            {/* Contact Details */}
            <div className="p-6 bg-white shadow-lg rounded-2xl">
              <h3 className="mb-6 text-lg font-bold text-gray-900">
                Contact Information
              </h3>
              <div className="space-y-5">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg bg-primary-50">
                      <item.icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-gray-900 transition-colors hover:text-primary-600"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium text-gray-900">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="p-6 bg-white shadow-lg rounded-2xl">
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                Quick Contact
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Prefer messaging? Reach us directly on:
              </p>
              <div className="flex gap-3">
                {quickContacts.map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center w-12 h-12 text-gray-600 transition-all rounded-xl bg-gray-100 ${contact.color} hover:text-white`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={contact.label}
                  >
                    <contact.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="overflow-hidden bg-white shadow-lg rounded-2xl">
              <div className="relative h-48 bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97579.67842762799!2d44.4357065!3d40.1791857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abce8b3ad95ad%3A0xb47db4cba4c7bf0b!2sYerevan%2C%20Armenia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="INEA Location"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
