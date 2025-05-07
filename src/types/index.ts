export interface Keyword {
  id: string;
  name: string;
  cpc: number; // Cost per click in EUR
  ctr: number; // Click-through rate as decimal (0-1)
  monthlyVolume: number; // Monthly search volume
  competitors: string[]; // List of competitor domains
  isSelected: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number; // Price in EUR
  isSelected: boolean;
}

export interface CampaignState {
  budget: number;
  products: Product[];
  keywords: Keyword[];
  websiteConversionRate: number;
  appointmentClosingRate: number;
  margin: number;
  selectedProductId: string | null;
  selectedKeywordId: string | null;
}

export interface CampaignMetrics {
  impressions: number;
  clicks: number;
  costPerClick: number;
  totalCost: number;
  websiteVisits: number;
  appointments: number;
  sales: number;
  revenue: number;
  profit: number;
  roi: number;
}

export interface FunnelStep {
  id: string;
  label: string;
  value: number;
  percentage: number;
  icon: React.ComponentType;
  color: string;
}