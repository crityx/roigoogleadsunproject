import React from 'react';
import KeywordManager from './KeywordManager';
import FunnelVisualizer from './FunnelVisualizer';
import ParameterSliders from './ParameterSliders';
import ROICalculator from './ROICalculator';

const SimulatorContainer: React.FC = () => {
  return (
    <div className="space-y-6">
      <KeywordManager />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[600px]">
        <div className="md:col-span-1">
          <ParameterSliders />
        </div>
        <div className="md:col-span-3">
          <div className="card h-full">
            <h2 className="text-xl font-semibold mb-4">Parcours Client et Performances</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100%-2rem)]">
              <FunnelVisualizer />
              <ROICalculator />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulatorContainer;