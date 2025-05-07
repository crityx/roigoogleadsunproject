import React, { useEffect, useState } from 'react';
import { Eye, MousePointer, Calendar, ShoppingCart } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';
import { FunnelStep } from '../types';

const FunnelVisualizer: React.FC = () => {
  const { campaignMetrics } = useCampaign();
  const [steps, setSteps] = useState<FunnelStep[]>([]);
  
  useEffect(() => {
    const totalImpressions = campaignMetrics.impressions || 1;
    const totalClicks = campaignMetrics.clicks || 1;
    const totalAppointments = campaignMetrics.appointments || 1;
    
    const clickRate = (campaignMetrics.clicks / totalImpressions) * 100;
    const appointmentRate = (campaignMetrics.appointments / totalClicks) * 100;
    const salesRate = (campaignMetrics.sales / totalAppointments) * 100;
    
    const newSteps: FunnelStep[] = [
      {
        id: 'impressions',
        label: 'Impressions',
        value: campaignMetrics.impressions,
        percentage: 100,
        icon: Eye,
        color: 'blue',
      },
      {
        id: 'clicks',
        label: `Clics (${clickRate.toFixed(1)}% des impressions)`,
        value: campaignMetrics.clicks,
        percentage: (campaignMetrics.clicks / totalImpressions) * 100,
        icon: MousePointer,
        color: 'green',
      },
      {
        id: 'appointments',
        label: `Rendez-vous (${appointmentRate.toFixed(1)}% des clics)`,
        value: campaignMetrics.appointments,
        percentage: (campaignMetrics.appointments / totalImpressions) * 100,
        icon: Calendar,
        color: 'orange',
      },
      {
        id: 'sales',
        label: `Ventes (${salesRate.toFixed(1)}% des RDV)`,
        value: campaignMetrics.sales,
        percentage: (campaignMetrics.sales / totalImpressions) * 100,
        icon: ShoppingCart,
        color: 'purple',
      },
    ];
    
    setSteps(newSteps);
  }, [campaignMetrics]);

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-medium mb-6 text-center">Entonnoir de Conversion</h3>
      
      <div className="flex-grow grid grid-cols-1 gap-4">
        {steps.map((step) => (
          <div key={step.id} className={`bg-${step.color}-50 rounded-xl p-4 flex flex-col items-center`}>
            <div className="flex items-center gap-2 mb-1">
              <step.icon className={`h-5 w-5 text-${step.color}-700`} />
              <p className={`text-${step.color}-700 text-base`}>{step.label}</p>
            </div>
            <div className="flex items-baseline gap-3">
              <p className="text-2xl font-semibold">
                {step.value.toLocaleString()}
              </p>
              <p className={`text-${step.color}-700`}>
                ({step.percentage.toFixed(1)}% du total)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FunnelVisualizer;