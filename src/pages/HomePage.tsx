import { useState, useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ShopGallerySection } from '../components/home/ShopGallerySection';
import { BrandHighlights } from '../components/home/BrandHighlights';
import { QuickPartFinder } from '../components/home/QuickPartFinder';
import { PopularPartsGrid } from '../components/home/PopularPartsGrid';
import { CategorySection } from '../components/home/CategorySection';
import { StoreInfoSection } from '../components/home/StoreInfoSection';
import { SEO } from '../components/common/SEO';
import { fetchFeaturedProducts, fetchCategories, fetchBrands } from '../api/products';
import { ProductListItem, Category, Brand, BusinessSettings } from '../types';

export function HomePage({ settings }: { settings?: BusinessSettings | null }) {
  const [featuredProducts, setFeaturedProducts] = useState<ProductListItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [feat, cats, brs] = await Promise.all([
          fetchFeaturedProducts(8),
          fetchCategories(),
          fetchBrands()
        ]);
        setFeaturedProducts(feat);
        setCategories(cats);
        setBrands(brs);
      } catch (err) {
        console.error("Failed to load homepage data:", err);
      }
    }
    loadData();
  }, []);

  return (
    <>
      <SEO
        title="Sri Jayavarman Electricals | PSG & CRI Pumps, Motors & Spare Parts Thoothukudi"
        description="PSG & CRI pump spare parts, impellers, shafts, bearings and motor repairs on Thevarpuram Road, Thoothukudi. Call 94425 35457."
        canonicalUrl="https://srijayavarmanelectricals.com/"
      />

      {/* Real Shop Photo Background Carousel Hero */}
      <HeroSection settings={settings} />

      {/* Dedicated Real Storefront & Shelves Gallery */}
      <ShopGallerySection />

      {/* Brands Handled */}
      <BrandHighlights brands={brands} />

      {/* Reference ID 1-50 Quick Lookup */}
      <QuickPartFinder />

      {/* Spare Parts Sold (Non-Ecommerce: No price, No stock quantity) */}
      <PopularPartsGrid products={featuredProducts} whatsappNumber={settings?.whatsapp_number} />

      {/* 4 Functional Classification Groups */}
      <CategorySection categories={categories} />

      {/* Physical Storefront & Real Map Location */}
      <StoreInfoSection settings={settings} />
    </>
  );
}
