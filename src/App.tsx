import React from 'react';
import Header from './components/Header';
import SimulatorContainer from './components/SimulatorContainer';
import { CampaignProvider } from './context/CampaignContext';

function App() {
  return (
    <CampaignProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <SimulatorContainer />
        </main>
      </div>
    </CampaignProvider>
  );
}

export default App;