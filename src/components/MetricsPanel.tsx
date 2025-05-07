import React from 'react';
import { LineChart as LineChartIcon, DollarSign, Percent, MousePointer, Users, ShoppingBag } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, BarChart, Bar, Legend
} from 'recharts';

const MetricsPanel: React.FC = () => {
  const { campaignState, campaignMetrics } = useCampaign();
  
  // Créer les données pour le graphique de l'entonnoir
  const funnelChartData = [
    { name: 'Impressions', value: campaignMetrics.impressions },
    { name: 'Clics', value: campaignMetrics.clicks },
    { name: 'RDV', value: campaignMetrics.appointments },
    { name: 'Ventes', value: campaignMetrics.sales }
  ];
  
  // Données financières pour le graphique en barres
  const financialData = [
    { name: 'Coût', value: campaignMetrics.totalCost },
    { name: 'Revenu', value: campaignMetrics.revenue },
    { name: 'Profit', value: campaignMetrics.profit }
  ];
  
  // Format des nombres pour l'affichage
  const formatCurrency = (value: number) => `${value.toLocaleString()} €`;
  const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;
  
  // Obtenir le produit et le mot-clé sélectionnés
  const selectedProduct = campaignState.products.find(
    (p) => p.id === campaignState.selectedProductId
  );
  
  const selectedKeyword = campaignState.keywords.find(
    (k) => k.id === campaignState.selectedKeywordId
  );
  
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Analyse des Métriques</h2>
        <div className="flex items-center text-gray-500">
          <LineChartIcon size={18} className="mr-2" />
          <span className="text-sm">Résumé de Campagne</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KPI Cards */}
        <div>
          <h3 className="text-lg font-medium mb-3">Indicateurs Clés</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center text-blue-700 mb-1">
                <MousePointer size={16} className="mr-1" />
                <span className="text-xs font-medium">Coût par Clic</span>
              </div>
              <p className="text-lg font-semibold">{formatCurrency(campaignMetrics.costPerClick)}</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-3">
              <div className="flex items-center text-green-700 mb-1">
                <Users size={16} className="mr-1" />
                <span className="text-xs font-medium">Taux de Conversion</span>
              </div>
              <p className="text-lg font-semibold">{formatPercent(campaignState.websiteConversionRate)}</p>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-3">
              <div className="flex items-center text-orange-700 mb-1">
                <ShoppingBag size={16} className="mr-1" />
                <span className="text-xs font-medium">Coût par Acquisition</span>
              </div>
              <p className="text-lg font-semibold">
                {campaignMetrics.sales > 0
                  ? formatCurrency(campaignMetrics.totalCost / campaignMetrics.sales)
                  : 'N/A'}
              </p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="flex items-center text-purple-700 mb-1">
                <Percent size={16} className="mr-1" />
                <span className="text-xs font-medium">ROI</span>
              </div>
              <p className="text-lg font-semibold">
                {formatPercent(campaignMetrics.roi)}
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Configuration Actuelle</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div>
                  <p className="text-gray-500">Produit:</p>
                  <p className="font-medium">{selectedProduct?.name}</p>
                </div>
                <div>
                  <p className="text-gray-500">Prix:</p>
                  <p className="font-medium">{formatCurrency(selectedProduct?.price || 0)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Mot-clé:</p>
                  <p className="font-medium">{selectedKeyword?.name}</p>
                </div>
                <div>
                  <p className="text-gray-500">Budget:</p>
                  <p className="font-medium">{formatCurrency(campaignState.budget)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Marge:</p>
                  <p className="font-medium">{formatPercent(campaignState.margin)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Taux de closing:</p>
                  <p className="font-medium">{formatPercent(campaignState.appointmentClosingRate)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Charts */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Progression de l'Entonnoir</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={funnelChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => value.toLocaleString()} />
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" name="Nombre" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Finances</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;