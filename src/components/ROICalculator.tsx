import React from 'react';
import { ArrowUpRight, ArrowDownRight, Users, ShoppingCart } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

const ROICalculator: React.FC = () => {
  const { campaignMetrics } = useCampaign();
  
  const getRoiColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    return 'text-red-600';
  };
  
  const getBackgroundColor = (value: number) => {
    if (value > 0) return 'bg-green-50';
    return 'bg-red-50';
  };
  
  const RoiIcon = ({ value }: { value: number }) => {
    if (value > 0) {
      return <ArrowUpRight className="h-4 w-4 text-green-600" />;
    }
    return <ArrowDownRight className="h-4 w-4 text-red-600" />;
  };
  
  const formatRoi = (roi: number) => {
    return `${(roi * 100).toFixed(0)}%`;
  };
  
  const costPerLead = campaignMetrics.appointments > 0 
    ? campaignMetrics.totalCost / campaignMetrics.appointments 
    : 0;

  const costPerAcquisition = campaignMetrics.sales > 0 
    ? campaignMetrics.totalCost / campaignMetrics.sales 
    : 0;

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-medium mb-6 text-center">Retour sur Investissement</h3>
      
      <div className="flex-grow grid grid-cols-2 gap-4">
        <div className="bg-yellow-50 rounded-xl p-4 flex flex-col items-center justify-center">
          <p className="text-yellow-700 text-base mb-1">Coût total</p>
          <p className="text-2xl font-semibold text-yellow-700">
            {campaignMetrics.totalCost.toLocaleString()} €
          </p>
        </div>
        
        <div className="bg-yellow-50 rounded-xl p-4 flex flex-col items-center justify-center">
          <p className="text-yellow-700 text-base mb-1">CA</p>
          <p className="text-2xl font-semibold text-yellow-700">
            {campaignMetrics.revenue.toLocaleString()} €
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-5 w-5 text-gray-700" />
            <p className="text-gray-700 text-base">Coût par lead</p>
          </div>
          <p className="text-2xl font-semibold text-gray-700">
            {costPerLead.toLocaleString()} €
          </p>
          <p className="text-sm text-gray-600 mt-1">
            ({campaignMetrics.totalCost.toLocaleString()}€ / {campaignMetrics.appointments} RDV)
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-1">
            <ShoppingCart className="h-5 w-5 text-gray-700" />
            <p className="text-gray-700 text-base">Coût par acquisition</p>
          </div>
          <p className="text-2xl font-semibold text-gray-700">
            {costPerAcquisition.toLocaleString()} €
          </p>
          <p className="text-sm text-gray-600 mt-1">
            ({campaignMetrics.totalCost.toLocaleString()}€ / {campaignMetrics.sales} ventes)
          </p>
        </div>
        
        <div className={`rounded-xl p-4 flex flex-col items-center justify-center ${getBackgroundColor(campaignMetrics.profit)}`}>
          <div className="flex items-center gap-2 mb-1">
            <RoiIcon value={campaignMetrics.profit} />
            <p className={`text-base ${getRoiColor(campaignMetrics.profit)}`}>Profit</p>
          </div>
          <p className={`text-2xl font-semibold ${getRoiColor(campaignMetrics.profit)}`}>
            {campaignMetrics.profit.toLocaleString()} €
          </p>
        </div>
        
        <div className={`rounded-xl p-4 flex flex-col items-center justify-center ${getBackgroundColor(campaignMetrics.roi)}`}>
          <div className="flex items-center gap-2 mb-1">
            <RoiIcon value={campaignMetrics.roi} />
            <p className={`text-base ${getRoiColor(campaignMetrics.roi)}`}>ROI</p>
          </div>
          <p className={`text-2xl font-semibold ${getRoiColor(campaignMetrics.roi)}`}>
            {formatRoi(campaignMetrics.roi)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;