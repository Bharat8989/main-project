"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "hi" | "mr"

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    marketplace: "Marketplace",
    howItWorks: "How It Works",
    about: "About",
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",
    dashboard: "Dashboard",
    profile: "Profile",

    // Hero Section
    heroTitle: "Connect Farmers & Buyers Directly",
    heroSubtitle:
      "Fresh produce from farm to your table. Support local farmers while getting the best quality products.",
    startSelling: "Start Selling",
    startBuying: "Start Buying",

    // Features
    directConnection: "Direct Connection",
    directConnectionDesc: "Connect directly with farmers and buyers without middlemen",
    freshProduce: "Fresh Produce",
    freshProduceDesc: "Get the freshest produce straight from the farm",
    easyOrdering: "Easy Ordering",
    easyOrderingDesc: "Simple and secure ordering process",

    // How It Works
    howItWorksTitle: "How It Works",
    howItWorksSubtitle: "Simple steps to connect farmers and buyers",
    step1Title: "Sign Up",
    step1Desc: "Create your account as a farmer or buyer",
    step2Title: "List Products",
    step2Desc: "Farmers can list their fresh produce",
    step3Title: "Browse & Order",
    step3Desc: "Buyers can browse and place orders",
    step4Title: "Chat & Connect",
    step4Desc: "Communicate directly through our chat system",

    // Auth
    createAccount: "Create Account",
    signupDescription: "Join our community of farmers and buyers",
    loginDescription: "Welcome back! Please sign in to your account",
    accountType: "Account Type",
    farmer: "Farmer/Seller",
    buyer: "Buyer",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone",
    location: "Location",
    password: "Password",
    confirmPassword: "Confirm Password",
    alreadyHaveAccount: "Already have an account?",
    dontHaveAccount: "Don't have an account?",
    creating: "Creating...",
    loggingIn: "Logging in...",

    // Dashboard
    welcome: "Welcome",
    farmerDashboardDesc: "Manage your products and orders",
    buyerDashboardDesc: "Discover fresh products from local farmers",
    totalProducts: "Total Products",
    totalOrders: "Total Orders",
    totalRevenue: "Total Revenue",
    totalSpent: "Total Spent",
    pendingOrders: "Pending Orders",
    favoriteProducts: "Favorite Products",
    activeChats: "Active Chats",
    myProducts: "My Products",
    manageYourProducts: "Manage your products and inventory",
    recentOrders: "Recent Orders",
    recentProducts: "Recent Products",
    manageYourOrders: "View and manage your recent orders",
    discoverFreshProducts: "Discover fresh products from local farmers",
    trackYourOrders: "Track your recent orders",
    noProductsYet: "No products yet",
    addFirstProduct: "Add Your First Product",
    noOrdersYet: "No orders yet",

    // Products
    addProduct: "Add Product",
    featuredProducts: "Featured Products",
    featured: "Featured",
    available: "available",
    addToCart: "Add to Cart",
    adding: "Adding...",
    edit: "Edit",
    delete: "Delete",
    productName: "Product Name",
    productDescription: "Product Description",
    price: "Price",
    unit: "Unit",
    quantity: "Quantity",
    category: "Category",
    selectCategory: "Select Category",
    productImages: "Product Images",
    uploadImages: "Click to upload images",
    cancel: "Cancel",
    addProductDescription: "Add a new product to your inventory",
    productAdded: "Product added successfully!",
    addProductError: "Failed to add product",

    // Marketplace
    marketplaceDescription: "Discover fresh produce directly from local farmers",
    searchProducts: "Search products, farmers, or locations...",
    showingResults: "Showing {count} products",
    noProductsFound: "No products found",
    tryDifferentSearch: "Try adjusting your search or filters",
    allCategories: "All Categories",
    categories: "Categories",
    sortBy: "Sort By",
    priceRange: "Price Range",
    comingSoon: "Coming Soon",
    newest: "Newest First",
    oldest: "Oldest First",
    priceLowToHigh: "Price: Low to High",
    priceHighToLow: "Price: High to Low",
    alphabetical: "Alphabetical",

    // Categories
    vegetables: "Vegetables",
    fruits: "Fruits",
    grains: "Grains",
    dairy: "Dairy",
    herbs: "Herbs",
    spices: "Spices",
    other: "Other",

    // Footer
    footerDescription: "Connecting farmers and buyers for fresh, quality produce",
    quickLinks: "Quick Links",
    forFarmers: "For Farmers",
    contactUs: "Contact Us",
    sellerGuide: "Seller Guide",
    pricing: "Pricing",
    contact: "Contact",
    allRightsReserved: "All rights reserved.",

    // Messages
    success: "Success",
    error: "Error",
    accountCreated: "Account created successfully!",
    loginSuccess: "Login successful!",
    signupError: "Failed to create account",
    loginError: "Failed to login",
    passwordMismatch: "Passwords do not match",
    loginRequired: "Please login to continue",
    addedToCart: "Product added to cart",
    addToCartError: "Failed to add product to cart",
  },
  hi: {
    // Navigation
    marketplace: "बाज़ार",
    howItWorks: "यह कैसे काम करता है",
    about: "हमारे बारे में",
    login: "लॉगिन",
    signup: "साइन अप",
    logout: "लॉगआउट",
    dashboard: "डैशबोर्ड",
    profile: "प्रोफ़ाइल",

    // Hero Section
    heroTitle: "किसानों और खरीदारों को सीधे जोड़ें",
    heroSubtitle: "खेत से आपकी मेज़ तक ताज़ी उपज। बेहतरीन गुणवत्ता के उत्पाद पाते हुए स्थानीय किसानों का समर्थन करें।",
    startSelling: "बेचना शुरू करें",
    startBuying: "खरीदना शुरू करें",

    // Features
    directConnection: "सीधा संपर्क",
    directConnectionDesc: "बिचौलियों के बिना किसानों और खरीदारों से सीधे जुड़ें",
    freshProduce: "ताज़ी उपज",
    freshProduceDesc: "खेत से सीधे सबसे ताज़ी उपज प्राप्त करें",
    easyOrdering: "आसान ऑर्डरिंग",
    easyOrderingDesc: "सरल और सुरक्षित ऑर्डरिंग प्रक्रिया",

    // Auth
    createAccount: "खाता बनाएं",
    signupDescription: "किसानों और खरीदारों के हमारे समुदाय में शामिल हों",
    loginDescription: "वापस स्वागत है! कृपया अपने खाते में साइन इन करें",
    accountType: "खाता प्रकार",
    farmer: "किसान/विक्रेता",
    buyer: "खरीदार",
    fullName: "पूरा नाम",
    email: "ईमेल",
    phone: "फ़ोन",
    location: "स्थान",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",

    // Products
    addProduct: "उत्पाद जोड़ें",
    featuredProducts: "विशेष उत्पाद",
    featured: "विशेष",
    available: "उपलब्ध",
    addToCart: "कार्ट में जोड़ें",
    adding: "जोड़ा जा रहा है...",

    // Categories
    vegetables: "सब्जियां",
    fruits: "फल",
    grains: "अनाज",
    dairy: "डेयरी",
    herbs: "जड़ी-बूटियां",
    spices: "मसाले",
    other: "अन्य",

    // Messages
    success: "सफलता",
    error: "त्रुटि",
    accountCreated: "खाता सफलतापूर्वक बनाया गया!",
    loginSuccess: "लॉगिन सफल!",
    addedToCart: "उत्पाद कार्ट में जोड़ा गया",
  },
  mr: {
    // Navigation
    marketplace: "बाजारपेठ",
    howItWorks: "हे कसे काम करते",
    about: "आमच्याबद्दल",
    login: "लॉगिन",
    signup: "साइन अप",
    logout: "लॉगआउट",
    dashboard: "डॅशबोर्ड",
    profile: "प्रोफाइल",

    // Hero Section
    heroTitle: "शेतकरी आणि खरेदीदारांना थेट जोडा",
    heroSubtitle: "शेतातून तुमच्या टेबलापर्यंत ताजी उत्पादने। उत्कृष्ट गुणवत्तेची उत्पादने मिळवताना स्थानिक शेतकऱ्यांना पाठिंबा द्या.",
    startSelling: "विक्री सुरू करा",
    startBuying: "खरेदी सुरू करा",

    // Features
    directConnection: "थेट संपर्क",
    directConnectionDesc: "मध्यस्थांशिवाय शेतकरी आणि खरेदीदारांशी थेट जुडा",
    freshProduce: "ताजी उत्पादने",
    freshProduceDesc: "शेतातून थेट सर्वात ताजी उत्पादने मिळवा",
    easyOrdering: "सोपी ऑर्डरिंग",
    easyOrderingDesc: "सोपी आणि सुरक्षित ऑर्डरिंग प्रक्रिया",

    // Auth
    createAccount: "खाते तयार करा",
    signupDescription: "शेतकरी आणि खरेदीदारांच्या आमच्या समुदायात सामील व्हा",
    loginDescription: "परत स्वागत आहे! कृपया तुमच्या खात्यात साइन इन करा",
    accountType: "खाते प्रकार",
    farmer: "शेतकरी/विक्रेता",
    buyer: "खरेदीदार",
    fullName: "पूर्ण नाव",
    email: "ईमेल",
    phone: "फोन",
    location: "स्थान",
    password: "पासवर्ड",
    confirmPassword: "पासवर्डची पुष्टी करा",

    // Products
    addProduct: "उत्पादन जोडा",
    featuredProducts: "वैशिष्ट्यीकृत उत्पादने",
    featured: "वैशिष्ट्यीकृत",
    available: "उपलब्ध",
    addToCart: "कार्टमध्ये जोडा",
    adding: "जोडत आहे...",

    // Categories
    vegetables: "भाज्या",
    fruits: "फळे",
    grains: "धान्य",
    dairy: "दुग्धजन्य",
    herbs: "औषधी वनस्पती",
    spices: "मसाले",
    other: "इतर",

    // Messages
    success: "यश",
    error: "त्रुटी",
    accountCreated: "खाते यशस्वीरित्या तयार केले!",
    loginSuccess: "लॉगिन यशस्वी!",
    addedToCart: "उत्पादन कार्टमध्ये जोडले",
  },
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "hi", "mr"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    if (isClient) {
      localStorage.setItem("language", lang)
    }
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}

export { I18nContext }
