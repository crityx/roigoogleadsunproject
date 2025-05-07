import React, { useState } from 'react';
import { Package, Plus, Trash2, Edit2 } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

const ProductSelector: React.FC = () => {
  const { campaignState, selectProduct, addProduct, removeProduct, updateProduct } = useCampaign();
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState(2000);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState(0);

  const handleAddProduct = () => {
    if (newProductName.trim() && newProductPrice > 0) {
      addProduct({
        name: newProductName,
        price: newProductPrice,
      });
      setNewProductName('');
      setNewProductPrice(2000);
      setIsAdding(false);
    }
  };

  const startEditing = (product: { id: string; name: string; price: number }) => {
    setEditingId(product.id);
    setEditName(product.name);
    setEditPrice(product.price);
  };

  const saveEdit = () => {
    if (editingId && editName.trim() && editPrice > 0) {
      updateProduct(editingId, {
        name: editName,
        price: editPrice,
      });
      setEditingId(null);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Produits</h2>
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
            <label className="block text-sm font-medium mb-1">Nom du produit</label>
            <input
              type="text"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Nom du produit"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Prix (€)</label>
            <input
              type="number"
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(Number(e.target.value))}
              className="w-full p-2 border rounded-md"
              min="1"
              step="100"
            />
          </div>
          <button onClick={handleAddProduct} className="btn btn-primary">
            Ajouter ce produit
          </button>
        </div>
      )}

      <div className="space-y-2">
        {campaignState.products.map((product) => (
          <div
            key={product.id}
            className={`p-3 rounded-md border transition-all ${
              campaignState.selectedProductId === product.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            {editingId === product.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-2 border rounded-md text-sm"
                />
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(Number(e.target.value))}
                  className="w-full p-2 border rounded-md text-sm"
                  min="1"
                  step="100"
                />
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
                  onClick={() => selectProduct(product.id)}
                >
                  <div className="flex items-center">
                    <Package size={16} className="mr-2 text-blue-500" />
                    <span className="font-medium">{product.name}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{product.price.toLocaleString()} €</p>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(product);
                    }}
                    className="p-1 text-gray-500 hover:text-blue-500 rounded-md hover:bg-gray-100"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeProduct(product.id);
                    }}
                    className="p-1 text-gray-500 hover:text-red-500 rounded-md hover:bg-gray-100"
                    disabled={campaignState.products.length <= 1}
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
  );
};

export default ProductSelector;