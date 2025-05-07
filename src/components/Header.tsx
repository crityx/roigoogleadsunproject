import React from 'react';
import { BarChart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center">
          <BarChart className="h-8 w-8" />
          <div className="ml-3">
            <h1 className="text-2xl font-semibold">Sunproject Simulateur de Campagne Google Ads</h1>
            <p className="text-blue-100 text-sm">Visualisez et optimisez votre retour sur investissement</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;