import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CampaignState, CampaignMetrics, Keyword, Product } from '../types';
import { defaultProducts } from '../data/products';
import { defaultKeywords } from '../data/keywords';

interface CampaignContextType {
  campaignState: CampaignState;
  campaignMetrics: CampaignMetrics;
  updateBudget: (value: number) => void;
  updateMargin: (value: number) => void;
  updateWebsiteConversionRate: (value: number) => void;
  updateAppointmentClosingRate: (value: number) => void;
  updateSelectedProductPrice: (value: number) => void;
  selectProduct: (productId: string) => void;
  selectKeyword: (keywordId: string) => void;
  addKeyword: (keyword: Omit<Keyword, 'id' | 'isSelected'>) => void;
  removeKeyword: (keywordId: string) => void;
  addProduct: (product: Omit<Product, 'id' | 'isSelected'>) => void;
  removeProduct: (productId: string) => void;
  updateKeyword: (keywordId: string, data: Partial<Keyword>) => void;
  updateProduct: (productId: string, data: Partial<Product>) => void;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

interface CampaignProviderProps {
  children: ReactNode;
}

export const CampaignProvider: React.FC<CampaignProviderProps> = ({ children }) => {
  const [campaignState, setCampaignState] = useState<CampaignState>({
    budget: 5000,
    products: defaultProducts,
    keywords: defaultKeywords,
    websiteConversionRate: 0.02, // 2%
    appointmentClosingRate: 0.02, // 2%
    margin: 0.10, // 10%
    selectedProductId: defaultProducts[0].id,
    selectedKeywordId: defaultKeywords[0].id,
  });

  const [campaignMetrics, setCampaignMetrics] = useState<CampaignMetrics>({
    impressions: 0,
    clicks: 0,
    costPerClick: 0,
    totalCost: 0,
    websiteVisits: 0,
    appointments: 0,
    sales: 0,
    revenue: 0,
    profit: 0,
    roi: 0,
  });

  useEffect(() => {
    calculateMetrics();
  }, [campaignState]);

  const calculateMetrics = () => {
    const selectedProduct = campaignState.products.find(
      (p) => p.id === campaignState.selectedProductId
    );
    const selectedKeyword = campaignState.keywords.find(
      (k) => k.id === campaignState.selectedKeywordId
    );

    if (!selectedProduct || !selectedKeyword) {
      return;
    }

    const costPerClick = selectedKeyword.cpc;
    const clicks = Math.floor(campaignState.budget / costPerClick);
    const impressions = Math.floor(clicks / selectedKeyword.ctr);
    const websiteVisits = clicks;
    const appointments = Math.floor(websiteVisits * campaignState.websiteConversionRate);
    // Arrondir les ventes au centième près
    const sales = Number((appointments * campaignState.appointmentClosingRate).toFixed(2));
    const revenue = sales * selectedProduct.price;
    const totalCost = clicks * costPerClick;
    const profit = revenue * campaignState.margin - totalCost;
    const roi = totalCost > 0 ? profit / totalCost : 0;

    setCampaignMetrics({
      impressions,
      clicks,
      costPerClick,
      totalCost,
      websiteVisits,
      appointments,
      sales,
      revenue,
      profit,
      roi,
    });
  };

  const updateBudget = (value: number) => {
    setCampaignState((prev) => ({ ...prev, budget: value }));
  };

  const updateMargin = (value: number) => {
    setCampaignState((prev) => ({ ...prev, margin: value }));
  };

  const updateWebsiteConversionRate = (value: number) => {
    setCampaignState((prev) => ({ ...prev, websiteConversionRate: value }));
  };

  const updateAppointmentClosingRate = (value: number) => {
    setCampaignState((prev) => ({ ...prev, appointmentClosingRate: value }));
  };

  const updateSelectedProductPrice = (value: number) => {
    setCampaignState((prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p.id === prev.selectedProductId ? { ...p, price: value } : p
      ),
    }));
  };

  const selectProduct = (productId: string) => {
    setCampaignState((prev) => ({ ...prev, selectedProductId: productId }));
  };

  const selectKeyword = (keywordId: string) => {
    setCampaignState((prev) => ({ ...prev, selectedKeywordId: keywordId }));
  };

  const addKeyword = (keyword: Omit<Keyword, 'id' | 'isSelected'>) => {
    const newKeyword: Keyword = {
      ...keyword,
      id: `keyword-${Date.now()}`,
      isSelected: false,
    };
    
    setCampaignState((prev) => ({
      ...prev,
      keywords: [...prev.keywords, newKeyword],
    }));
  };

  const removeKeyword = (keywordId: string) => {
    setCampaignState((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k.id !== keywordId),
      selectedKeywordId: 
        prev.selectedKeywordId === keywordId
          ? (prev.keywords[0]?.id || null)
          : prev.selectedKeywordId,
    }));
  };

  const addProduct = (product: Omit<Product, 'id' | 'isSelected'>) => {
    const newProduct: Product = {
      ...product,
      id: `product-${Date.now()}`,
      isSelected: false,
    };
    
    setCampaignState((prev) => ({
      ...prev,
      products: [...prev.products, newProduct],
    }));
  };

  const removeProduct = (productId: string) => {
    setCampaignState((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== productId),
      selectedProductId: 
        prev.selectedProductId === productId
          ? (prev.products[0]?.id || null)
          : prev.selectedProductId,
    }));
  };

  const updateKeyword = (keywordId: string, data: Partial<Keyword>) => {
    setCampaignState((prev) => ({
      ...prev,
      keywords: prev.keywords.map((k) =>
        k.id === keywordId ? { ...k, ...data } : k
      ),
    }));
  };

  const updateProduct = (productId: string, data: Partial<Product>) => {
    setCampaignState((prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p.id === productId ? { ...p, ...data } : p
      ),
    }));
  };

  const value = {
    campaignState,
    campaignMetrics,
    updateBudget,
    updateMargin,
    updateWebsiteConversionRate,
    updateAppointmentClosingRate,
    updateSelectedProductPrice,
    selectProduct,
    selectKeyword,
    addKeyword,
    removeKeyword,
    addProduct,
    removeProduct,
    updateKeyword,
    updateProduct,
  };

  return <CampaignContext.Provider value={value}>{children}</CampaignContext.Provider>;
};

export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};