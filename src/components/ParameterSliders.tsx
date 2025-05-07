import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import { DollarSign, Percent, Package } from 'lucide-react';

const ParameterSliders: React.FC = () => {
  const {
    campaignState,
    updateBudget,
    updateMargin,
    updateWebsiteConversionRate,
    updateAppointmentClosingRate,
    updateSelectedProductPrice,
  } = useCampaign();

  const selectedProduct = campaignState.products.find(
    (p) => p.id === campaignState.selectedProductId
  );

  return (
    <div className="card h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Paramètres</h2>

      <div className="space-y-4 flex-grow flex flex-col justify-center">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Prix du produit</label>
            <div className="flex items-center bg-indigo-100 rounded-full px-2 py-1">
              <Package size={14} className="text-indigo-700 mr-1" />
              <input
                type="number"
                value={selectedProduct?.price || 0}
                onChange={(e) => updateSelectedProductPrice(Number(e.target.value))}
                className="w-24 bg-transparent text-indigo-700 text-sm font-medium text-right focus:outline-none"
                step="0.01"
                min="1000"
                max="10000"
              />
              <span className="text-indigo-700 text-sm font-medium ml-1">€</span>
            </div>
          </div>
          <div className="slider-container">
            <input
              type="range"
              min="1000"
              max="10000"
              step="0.01"
              value={selectedProduct?.price || 0}
              onChange={(e) => updateSelectedProductPrice(Number(e.target.value))}
              className="w-full"
            />
            <div className="slider-label" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Budget ads</label>
            <div className="flex items-center bg-blue-100 rounded-full px-2 py-1">
              <DollarSign size={14} className="text-blue-700" />
              <input
                type="number"
                value={campaignState.budget}
                onChange={(e) => updateBudget(Number(e.target.value))}
                className="w-24 bg-transparent text-blue-700 text-sm font-medium text-right focus:outline-none"
                step="0.01"
                min="1000"
                max="20000"
              />
              <span className="text-blue-700 text-sm font-medium ml-1">€</span>
            </div>
          </div>
          <div className="slider-container">
            <input
              type="range"
              min="1000"
              max="20000"
              step="0.01"
              value={campaignState.budget}
              onChange={(e) => updateBudget(Number(e.target.value))}
              className="w-full"
            />
            <div className="slider-label" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Marge</label>
            <div className="flex items-center bg-green-100 rounded-full px-2 py-1">
              <input
                type="number"
                value={(campaignState.margin * 100).toFixed(2)}
                onChange={(e) => updateMargin(Number(e.target.value) / 100)}
                className="w-20 bg-transparent text-green-700 text-sm font-medium text-right focus:outline-none"
                step="0.01"
                min="5"
                max="50"
              />
              <Percent size={14} className="text-green-700 ml-1" />
            </div>
          </div>
          <div className="slider-container">
            <input
              type="range"
              min="0.05"
              max="0.50"
              step="0.0001"
              value={campaignState.margin}
              onChange={(e) => updateMargin(Number(e.target.value))}
            />
            <div className="slider-label" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Taux de conversion site (rdv calendly)</label>
            <div className="flex items-center bg-orange-100 rounded-full px-2 py-1">
              <input
                type="number"
                value={(campaignState.websiteConversionRate * 100).toFixed(2)}
                onChange={(e) => updateWebsiteConversionRate(Number(e.target.value) / 100)}
                className="w-20 bg-transparent text-orange-700 text-sm font-medium text-right focus:outline-none"
                step="0.01"
                min="1"
                max="15"
              />
              <Percent size={14} className="text-orange-700 ml-1" />
            </div>
          </div>
          <div className="slider-container">
            <input
              type="range"
              min="0.01"
              max="0.15"
              step="0.0001"
              value={campaignState.websiteConversionRate}
              onChange={(e) => updateWebsiteConversionRate(Number(e.target.value))}
            />
            <div className="slider-label" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium">Taux de closing des RDV</label>
            <div className="flex items-center bg-purple-100 rounded-full px-2 py-1">
              <input
                type="number"
                value={(campaignState.appointmentClosingRate * 100).toFixed(2)}
                onChange={(e) => updateAppointmentClosingRate(Number(e.target.value) / 100)}
                className="w-20 bg-transparent text-purple-700 text-sm font-medium text-right focus:outline-none"
                step="0.01"
                min="0"
                max="80"
              />
              <Percent size={14} className="text-purple-700 ml-1" />
            </div>
          </div>
          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="0.80"
              step="0.0001"
              value={campaignState.appointmentClosingRate}
              onChange={(e) => updateAppointmentClosingRate(Number(e.target.value))}
            />
            <div className="slider-label" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParameterSliders;
