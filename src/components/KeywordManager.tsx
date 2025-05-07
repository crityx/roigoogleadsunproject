import React, { useState } from 'react';
import { Tag, Plus, Trash2, Edit2, Search, ArrowUpDown, Filter, Globe } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';
import { Keyword } from '../types';

interface FilterRange {
  min: number;
  max: number;
}

const KeywordManager: React.FC = () => {
  const { campaignState, selectKeyword, addKeyword, removeKeyword, updateKeyword } = useCampaign();
  const [newKeywordName, setNewKeywordName] = useState('');
  const [newKeywordCPC, setNewKeywordCPC] = useState(2.0);
  const [newKeywordCTR, setNewKeywordCTR] = useState(0.02);
  const [newKeywordVolume, setNewKeywordVolume] = useState(1000);
  const [newKeywordCompetitors, setNewKeywordCompetitors] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editCPC, setEditCPC] = useState(0);
  const [editCTR, setEditCTR] = useState(0);
  const [editVolume, setEditVolume] = useState(0);
  const [editCompetitors, setEditCompetitors] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'volume' | 'cpc' | 'ctr'>('volume');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filtres par plage
  const [volumeRange, setVolumeRange] = useState<FilterRange>({ min: 0, max: 100000 });
  const [cpcRange, setCpcRange] = useState<FilterRange>({ min: 0, max: 15 });
  const [ctrRange, setCtrRange] = useState<FilterRange>({ min: 0, max: 0.04 });

  const handleAddKeyword = () => {
    if (newKeywordName.trim() && newKeywordCPC > 0 && newKeywordCTR > 0 && newKeywordVolume > 0) {
      addKeyword({
        name: newKeywordName,
        cpc: newKeywordCPC,
        ctr: newKeywordCTR,
        monthlyVolume: newKeywordVolume,
        competitors: newKeywordCompetitors,
      });
      setNewKeywordName('');
      setNewKeywordCPC(2.0);
      setNewKeywordCTR(0.02);
      setNewKeywordVolume(1000);
      setNewKeywordCompetitors([]);
      setIsAdding(false);
    }
  };

  const startEditing = (keyword: Keyword) => {
    setEditingId(keyword.id);
    setEditName(keyword.name);
    setEditCPC(keyword.cpc);
    setEditCTR(keyword.ctr);
    setEditVolume(keyword.monthlyVolume);
    setEditCompetitors(keyword.competitors || []);
  };

  const saveEdit = () => {
    if (editingId && editName.trim() && editCPC > 0 && editCTR > 0 && editVolume > 0) {
      updateKeyword(editingId, {
        name: editName,
        cpc: editCPC,
        ctr: editCTR,
        monthlyVolume: editVolume,
        competitors: editCompetitors,
      });
      setEditingId(null);
    }
  };

  const handleSort = (criteria: 'volume' | 'cpc' | 'ctr') => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('desc');
    }
  };

  const filteredAndSortedKeywords = [...campaignState.keywords]
    .filter(keyword => {
      const matchesSearch = keyword.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesVolume = keyword.monthlyVolume >= volumeRange.min && keyword.monthlyVolume <= volumeRange.max;
      const matchesCPC = keyword.cpc >= cpcRange.min && keyword.cpc <= cpcRange.max;
      const matchesCTR = keyword.ctr >= ctrRange.min && keyword.ctr <= ctrRange.max;
      
      return matchesSearch && matchesVolume && matchesCPC && matchesCTR;
    })
    .sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      switch (sortBy) {
        case 'volume':
          return (a.monthlyVolume - b.monthlyVolume) * multiplier;
        case 'cpc':
          return (a.cpc - b.cpc) * multiplier;
        case 'ctr':
          return (a.ctr - b.ctr) * multiplier;
        default:
          return 0;
      }
    });

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Selectionner un mot-clé</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="btn btn-secondary text-sm flex items-center"
        >
          {isAdding ? 'Annuler' : <><Plus size={16} className="mr-1" /> Ajouter</>}
        </button>
      </div>

      {isAdding && (
        <div className="bg-blue-50 p-4 rounded-md mb-4">
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Mot-clé</label>
            <input
              type="text"
              value={newKeywordName}
              onChange={(e) => setNewKeywordName(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Mot-clé"
            />
          </div>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div>
              <label className="block text-sm font-medium mb-1">CPC (€)</label>
              <input
                type="number"
                value={newKeywordCPC}
                onChange={(e) => setNewKeywordCPC(Number(e.target.value))}
                className="w-full p-2 border rounded-md"
                min="0.1"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CTR (%)</label>
              <input
                type="number"
                value={newKeywordCTR * 100}
                onChange={(e) => setNewKeywordCTR(Number(e.target.value) / 100)}
                className="w-full p-2 border rounded-md"
                min="0.1"
                max="100"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Volume/mois</label>
              <input
                type="number"
                value={newKeywordVolume}
                onChange={(e) => setNewKeywordVolume(Number(e.target.value))}
                className="w-full p-2 border rounded-md"
                min="1"
                step="100"
              />
            </div>
          </div>
          <button onClick={handleAddKeyword} className="btn btn-primary">
            Ajouter ce mot-clé
          </button>
        </div>
      )}

      <div className="mb-4 space-y-2">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Rechercher un mot-clé..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-8 border rounded-md"
            />
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn ${showFilters ? 'btn-primary' : 'btn-secondary'} flex items-center gap-1`}
          >
            <Filter size={16} />
            Filtres
          </button>
        </div>

        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Volume mensuel</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    value={volumeRange.min}
                    onChange={(e) => setVolumeRange({ ...volumeRange, min: Number(e.target.value) })}
                    className="w-full p-2 border rounded-md"
                    min="0"
                    step="100"
                  />
                  <span>à</span>
                  <input
                    type="number"
                    value={volumeRange.max}
                    onChange={(e) => setVolumeRange({ ...volumeRange, max: Number(e.target.value) })}
                    className="w-full p-2 border rounded-md"
                    min="0"
                    step="100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">CPC (€)</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    value={cpcRange.min}
                    onChange={(e) => setCpcRange({ ...cpcRange, min: Number(e.target.value) })}
                    className="w-full p-2 border rounded-md"
                    min="0"
                    step="0.1"
                  />
                  <span>à</span>
                  <input
                    type="number"
                    value={cpcRange.max}
                    onChange={(e) => setCpcRange({ ...cpcRange, max: Number(e.target.value) })}
                    className="w-full p-2 border rounded-md"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">CTR (%)</label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  value={ctrRange.min * 100}
                  onChange={(e) => setCtrRange({ ...ctrRange, min: Number(e.target.value) / 100 })}
                  className="w-full p-2 border rounded-md"
                  min="0"
                  max="100"
                  step="0.1"
                />
                <span>à</span>
                <input
                  type="number"
                  value={ctrRange.max * 100}
                  onChange={(e) => setCtrRange({ ...ctrRange, max: Number(e.target.value) / 100 })}
                  className="w-full p-2 border rounded-md"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-3 flex space-x-2">
        <button
          onClick={() => handleSort('volume')}
          className={`px-3 py-1.5 rounded-md text-sm flex items-center ${
            sortBy === 'volume' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
          }`}
        >
          Volume
          <ArrowUpDown size={14} className="ml-1" />
        </button>
        <button
          onClick={() => handleSort('cpc')}
          className={`px-3 py-1.5 rounded-md text-sm flex items-center ${
            sortBy === 'cpc' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
          }`}
        >
          CPC
          <ArrowUpDown size={14} className="ml-1" />
        </button>
        <button
          onClick={() => handleSort('ctr')}
          className={`px-3 py-1.5 rounded-md text-sm flex items-center ${
            sortBy === 'ctr' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
          }`}
        >
          CTR
          <ArrowUpDown size={14} className="ml-1" />
        </button>
      </div>

      <div className="h-[400px] overflow-y-auto pr-2">
        <div className="space-y-2">
          {filteredAndSortedKeywords.map((keyword) => (
            <div
              key={keyword.id}
              className={`p-3 rounded-md border transition-all ${
                campaignState.selectedKeywordId === keyword.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {editingId === keyword.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full p-2 border rounded-md text-sm"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs mb-1">CPC (€)</label>
                      <input
                        type="number"
                        value={editCPC}
                        onChange={(e) => setEditCPC(Number(e.target.value))}
                        className="w-full p-2 border rounded-md text-sm"
                        min="0.1"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1">CTR (%)</label>
                      <input
                        type="number"
                        value={editCTR * 100}
                        onChange={(e) => setEditCTR(Number(e.target.value) / 100)}
                        className="w-full p-2 border rounded-md text-sm"
                        min="0.1"
                        max="100"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1">Volume/mois</label>
                      <input
                        type="number"
                        value={editVolume}
                        onChange={(e) => setEditVolume(Number(e.target.value))}
                        className="w-full p-2 border rounded-md text-sm"
                        min="1"
                        step="100"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={saveEdit} className="btn btn-primary text-xs py-1">
                      Enregistrer
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="btn btn-secondary text-xs py-1"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => selectKeyword(keyword.id)}
                  >
                    <div className="flex items-center">
                      <Tag size={16} className="mr-2 text-blue-500" />
                      <span className="font-medium">{keyword.name}</span>
                    </div>
                    <div className="grid grid-cols-3 text-gray-600 text-sm mt-1">
                      <span>CPC: {keyword.cpc.toFixed(2)} €</span>
                      <span>CTR: {(keyword.ctr * 100).toFixed(1)}%</span>
                      <div className="flex items-center">
                        <Search size={14} className="mr-1 text-gray-500" />
                        <span>{keyword.monthlyVolume.toLocaleString()}/mois</span>
                      </div>
                    </div>
                    {keyword.competitors && keyword.competitors.length > 0 && (
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Globe size={14} className="mr-1" />
                        <div className="flex flex-wrap gap-1">
                          {keyword.competitors.map((competitor, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 px-2 py-0.5 rounded-full text-xs"
                            >
                              {competitor}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditing(keyword);
                      }}
                      className="p-1 text-gray-500 hover:text-blue-500 rounded-md hover:bg-gray-100"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeKeyword(keyword.id);
                      }}
                      className="p-1 text-gray-500 hover:text-red-500 rounded-md hover:bg-gray-100"
                      disabled={campaignState.keywords.length <= 1}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeywordManager;
