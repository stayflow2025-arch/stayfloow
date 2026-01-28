
"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';

export type Locale = 'fr' | 'en' | 'ar' | 'es';

const localeDetails: Record<Locale, { name: string; flag: string; dir: 'ltr' | 'rtl' }> = {
    fr: { name: 'Français', flag: '🇫🇷', dir: 'ltr' },
    en: { name: 'English', flag: '🇬🇧', dir: 'ltr' },
    ar: { name: 'العربية', flag: '🇩🇿', dir: 'rtl' },
    es: { name: 'Español', flag: '🇪🇸', dir: 'ltr' },
};

// This is a simplified translation function for the prototype.
// In a real app, you would use a library like next-international.
const translations: Record<string, Record<Locale, string>> = {
    // Header
    "accommodations": { fr: "Hébergements", en: "Accommodations", ar: "أماكن الإقامة", es: "Alojamientos" },
    "car_rental": { fr: "Location de Voiture", en: "Car Rental", ar: "تأجير السيارات", es: "Alquiler de Coches" },
    "tours": { fr: "Circuits et Activités", en: "Tours & Activities", ar: "الجولات والأنشطة", es: "Tours y Actividades" },
    "become_partner": { fr: "Devenir Partenaire", en: "Become a Partner", ar: "كن شريكا", es: "Ser Socio" },
    "login": { fr: "Se Connecter", en: "Log In", ar: "تسجيل الدخول", es: "Iniciar Sesión" },
    "signup": { fr: "S'inscrire", en: "Sign Up", ar: "التسجيل", es: "Registrarse" },
    "open_menu": { fr: "Ouvrir le menu", en: "Open menu", ar: "افتح القائمة", es: "Abrir menú" },

    // Footer
    "footer_tagline": { fr: "Découvrez des séjours et des véhicules uniques en Algérie.", en: "Discover unique stays and vehicles in Algeria.", ar: "اكتشف إقامات ومركبات فريدة في الجزائر.", es: "Descubra estancias y vehículos únicos en Argelia." },
    "navigation": { fr: "Navigation", en: "Navigation", ar: "التنقل", es: "Navegación" },
    "company": { fr: "Entreprise", en: "Company", ar: "الشركة", es: "Empresa" },
    "about": { fr: "À propos", en: "About", ar: "معلومات عنا", es: "Sobre nosotros" },
    "contact": { fr: "Contact", en: "Contact", ar: "اتصل", es: "Contacto" },
    "legal": { fr: "Légal", en: "Legal", ar: "قانوني", es: "Legal" },
    "terms": { fr: "Conditions d'utilisation", en: "Terms of use", ar: "شروط الاستخدام", es: "Condiciones de uso" },
    "privacy": { fr: "Politique de confidentialité", en: "Privacy policy", ar: "سياسة الخصوصية", es: "Política de privacidad" },
    "rights_reserved": { fr: "Tous droits réservés.", en: "All rights reserved.", ar: "كل الحقوق محفوظة.", es: "Todos los derechos reservados." },
    "partner_cta_title": { fr: "Devenez Partenaire StayFloow", en: "Become a StayFloow Partner", ar: "كن شريكًا في StayFloow", es: "Conviértase en socio de StayFloow" },
    "partner_cta_desc": { fr: "Vous avez une propriété, un véhicule, un circuit ou une activité à proposer ? Rejoignez notre communauté et commencez à gagner un revenu supplémentaire.", en: "Do you have a property, a vehicle, a tour or an activity to offer? Join our community and start earning extra income.", ar: "هل لديك عقار أو مركبة أو جولة أو نشاط لتقدمه؟ انضم إلى مجتمعنا وابدأ في كسب دخل إضافي.", es: "¿Tiene una propiedad, un vehículo, un tour o una actividad que ofrecer? Únase a nuestra comunidad y comience a ganar ingresos adicionales." },
    "start": { fr: "Démarrer", en: "Get Started", ar: "ابدأ", es: "Empezar" },
    "add_property": { fr: "Inscrire une Propriété", en: "List a Property", ar: "إضافة عقار", es: "Añadir una propiedad" },
    "add_vehicle": { fr: "Inscrire un Véhicule", en: "List a Vehicle", ar: "إضافة مركبة", es: "Añadir un vehículo" },
    "add_tour": { fr: "Inscrire un Circuit / Activité", en: "List a Tour / Activity", ar: "إضافة جولة / نشاط", es: "Añadir un tour / actividad" },

    // Home page
    "home_hero_title": { fr: "Votre Porte d'Entrée en Algérie", en: "Your Gateway to Algeria", ar: "بوابتك إلى الجزائر", es: "Su puerta de entrada a Argelia" },
    "home_hero_subtitle": { fr: "Découvrez des séjours uniques et authentiques à travers le pays.", en: "Discover unique and authentic stays across the country.", ar: "اكتشف إقامات فريدة وأصيلة في جميع أنحاء البلاد.", es: "Descubra estancias únicas y auténticas en todo el país." },
    "featured_stays": { fr: "Séjours Recommandés", en: "Featured Stays", ar: "إقامات مميزة", es: "Estancias destacadas" },
    "view_all_accommodations": { fr: "Voir Tous les Hébergements", en: "View All Accommodations", ar: "عرض كل أماكن الإقامة", es: "Ver todos los alojamientos" },
    "recently_viewed": { fr: "Récemment consultés", en: "Recently Viewed", ar: "تمت مشاهدتها مؤخرًا", es: "Visto recientemente" },
    "inspired_by_visit": { fr: "Inspiré de votre dernière visite", en: "Inspired by Your Last Visit", ar: "مستوحى من زيارتك الأخيرة", es: "Inspirado por su última visita" },

    // Search Form
    "where_to": { fr: "Où allez-vous ?", en: "Where are you going?", ar: "أين تذهب؟", es: "¿A dónde vas?" },
    "all_destinations": { fr: "Toutes les destinations", en: "All destinations", ar: "كل الوجهات", es: "Todos los destinos" },
    "choose_dates": { fr: "Choisissez vos dates", en: "Choose your dates", ar: "اختر تواريخك", es: "Elige tus fechas" },
    "travelers": { fr: "voyageurs", en: "travelers", ar: "مسافرون", es: "viajeros" },
    "traveler": { fr: "voyageur", en: "traveler", ar: "مسافر", es: "viajero" },
    "babies": { fr: "bébés", en: "babies", ar: "رضع", es: "bebés" },
    "baby": { fr: "bébé", en: "baby", ar: "رضيع", es: "bebé" },
    "search": { fr: "Rechercher", en: "Search", ar: "بحث", es: "Buscar" },
    "select_travelers": { fr: "Sélectionnez le nombre de voyageurs", en: "Select the number of travelers", ar: "حدد عدد المسافرين", es: "Seleccione el número de viajeros" },
    "adults": { fr: "Adultes", en: "Adults", ar: "البالغون", es: "Adultos" },
    "adults_desc": { fr: "13 ans et plus", en: "Age 13 or above", ar: "13 سنة فما فوق", es: "13 años o más" },
    "children": { fr: "Enfants", en: "Children", ar: "الأطفال", es: "Niños" },
    "children_desc": { fr: "De 2 à 12 ans", en: "Ages 2–12", ar: "من 2 إلى 12 سنة", es: "De 2 a 12 años" },
    "infants": { fr: "Bébés", en: "Infants", ar: "الرضع", es: "Bebés" },
    "infants_desc": { fr: "Moins de 2 ans", en: "Under 2", ar: "أقل من سنتين", es: "Menos de 2 años" },

    // About page
    "about_title": { fr: "À propos de StayFloow", en: "About StayFloow", ar: "عن StayFloow", es: "Sobre StayFloow" },
    "about_subtitle": { fr: "Votre porte d'entrée pour des séjours authentiques en Algérie.", en: "Your gateway to authentic stays in Algeria.", ar: "بوابتك إلى إقامات أصيلة في الجزائر.", es: "Su puerta de entrada a estancias auténticas en Argelia." },
    "about_p1": { fr: "<strong>StayFloow</strong> est né d'une passion pour le voyage et d'un amour profond pour l'Algérie. Notre mission est de dévoiler la richesse et la diversité de l'hospitalité algérienne en connectant les voyageurs du monde entier avec des hôtes locaux.", en: "<strong>StayFloow</strong> was born from a passion for travel and a deep love for Algeria. Our mission is to unveil the richness and diversity of Algerian hospitality by connecting travelers from around the world with local hosts.", ar: "وُلدت <strong>StayFloow</strong> من شغف بالسفر وحب عميق للجزائر. مهمتنا هي الكشف عن ثراء وتنوع الضيافة الجزائرية من خلال ربط المسافرين من جميع أنحاء العالم بالمضيفين المحليين.", es: "<strong>StayFloow</strong> nació de la pasión por los viajes y un profundo amor por Argelia. Nuestra misión es dar a conocer la riqueza y diversidad de la hospitalidad argelina conectando a viajeros de todo el mundo con anfitriones locales." },
    "about_p2": { fr: "Nous croyons que le voyage est plus qu'une simple visite. C'est une opportunité d'immersion, de découverte culturelle et de création de liens humains. Que vous cherchiez un appartement moderne avec vue sur la Méditerranée à Alger, une villa avec piscine à Oran, une maison traditionnelle dans les montagnes de Kabylie ou une retraite paisible dans le Sahara, notre plateforme vous offre un accès à des hébergements uniques et vérifiés.", en: "We believe that travel is more than just a visit. It's an opportunity for immersion, cultural discovery, and creating human connections. Whether you're looking for a modern apartment with a Mediterranean view in Algiers, a villa with a pool in Oran, a traditional house in the Kabylie mountains, or a peaceful retreat in the Sahara, our platform gives you access to unique and verified accommodations.", ar: "نحن نؤمن بأن السفر هو أكثر من مجرد زيارة. إنها فرصة للانغماس والاكتشاف الثقافي وخلق روابط إنسانية. سواء كنت تبحث عن شقة حديثة تطل على البحر الأبيض المتوسط في الجزائر العاصمة ، أو فيلا مع مسبح في وهران ، أو منزل تقليدي في جبال القبائل ، أو ملاذ هادئ في الصحراء ، فإن منصتنا تتيح لك الوصول إلى أماكن إقامة فريدة ومُتحقق منها.", es: "Creemos que viajar es más que una simple visita. Es una oportunidad de inmersión, descubrimiento cultural y creación de lazos humanos. Ya sea que esté buscando un apartamento moderno con vista al Mediterráneo en Argel, una villa con piscina en Orán, una casa tradicional en las montañas de Cabilia o un retiro tranquilo en el Sahara, nuestra plataforma le da acceso a alojamientos únicos y verificados." },
    "about_p3": { fr: "Pour nos partenaires-hôtes, nous offrons une plateforme simple et sécurisée pour partager leur espace, générer un revenu supplémentaire et faire découvrir leur culture. Nous nous engageons à construire une communauté basée sur la confiance, le respect et la passion du partage.", en: "For our host partners, we offer a simple and secure platform to share their space, generate additional income, and introduce their culture. We are committed to building a community based on trust, respect, and the passion for sharing.", ar: "لشركائنا المضيفين ، نقدم منصة بسيطة وآمنة لمشاركة مساحتهم وتحقيق دخل إضافي وتقديم ثقافتهم. نحن ملتزمون ببناء مجتمع قائم على الثقة والاحترام وشغف المشاركة.", es: "Para nuestros socios anfitriones, ofrecemos una plataforma simple y segura para compartir su espacio, generar ingresos adicionales y dar a conocer su cultura. Estamos comprometidos a construir una comunidad basada en la confianza, el respeto y la pasión por compartir." },
    "about_p4": { fr: "Rejoignez-nous dans cette aventure et découvrez la véritable essence de l'Algérie, un séjour à la fois.", en: "Join us in this adventure and discover the true essence of Algeria, one stay at a time.", ar: "انضم إلينا في هذه المغامرة واكتشف الجوهر الحقيقي للجزائر ، إقامة واحدة في كل مرة.", es: "Únase a nosotros en esta aventura y descubra la verdadera esencia de Argelia, una estancia a la vez." },

    // Contact page
    "contact_us": { fr: "Contactez-nous", en: "Contact Us", ar: "اتصل بنا", es: "Contáctenos" },
    "contact_desc": { fr: "Une question, une suggestion ou un problème ? Remplissez le formulaire ou utilisez nos coordonnées.", en: "A question, a suggestion, or a problem? Fill out the form or use our contact details.", ar: "سؤال، اقتراح أو مشكلة؟ املأ النموذج أو استخدم معلومات الاتصال الخاصة بنا.", es: "Una pregunta, una sugerencia o un problema? Rellene el formulario o utilice nuestros datos de contacto." },
    "send_message": { fr: "Envoyer un message", en: "Send a message", ar: "إرسال رسالة", es: "Enviar un mensaje" },
    "your_name": { fr: "Votre nom", en: "Your name", ar: "اسمك", es: "Tu nombre" },
    "your_email": { fr: "Votre email", en: "Your email", ar: "بريدك الإلكتروني", es: "Tu correo electrónico" },
    "subject": { fr: "Sujet", en: "Subject", ar: "الموضوع", es: "Asunto" },
    "your_message": { fr: "Votre message", en: "Your message", ar: "رسالتك", es: "Tu mensaje" },
    "submit": { fr: "Envoyer", en: "Send", ar: "إرسال", es: "Enviar" },
    "message_sent_title": { fr: "Message envoyé !", en: "Message sent!", ar: "تم إرسال الرسالة!", es: "¡Mensaje enviado!" },
    "message_sent_desc": { fr: "Merci de nous avoir contactés. Notre équipe vous répondra dans les 24 heures.", en: "Thank you for contacting us. Our team will get back to you within 24 hours.", ar: "شكرا لتواصلك معنا. سيرد عليك فريقنا في غضون 24 ساعة.", es: "Gracias por contactarnos. Nuestro equipo se pondrá en contacto con usted en un plazo de 24 horas." },
};


interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  getLocaleDetails: (loc?: Locale) => { name: string; flag: string; dir: 'ltr' | 'rtl' };
  availableLocales: Locale[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>('fr');

  useEffect(() => {
    // This effect runs only on the client, after hydration.
    // It's safe to update the DOM here.
    document.documentElement.lang = locale;
    document.documentElement.dir = localeDetails[locale].dir;
  }, [locale]);

  const t = useCallback((key: string): string => {
    return translations[key]?.[locale] || key;
  }, [locale]);

  const getLocaleDetails = (loc?: Locale) => {
    return localeDetails[loc || locale];
  }

  const value = {
    locale,
    setLocale,
    t,
    getLocaleDetails,
    availableLocales: Object.keys(localeDetails) as Locale[],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
