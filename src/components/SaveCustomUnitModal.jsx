import { useState } from 'react';
import { X } from 'lucide-react';
import { formatCurrency, detectUnitChanges, generateId } from '../utils/helpers';

const SaveCustomUnitModal = ({ originalUnit, modifiedUnit, isOpen, onClose, onSave }) => {
  const [unitName, setUnitName] = useState(`Custom ${originalUnit.name}`);
  const [description, setDescription] = useState(modifiedUnit.description);

  const changes = detectUnitChanges(originalUnit, modifiedUnit);

  const handleSave = () => {
    const customUnit = {
      ...modifiedUnit,
      id: generateId(),
      name: unitName,
      description: description,
      tier: 'custom',
      lastUpdated: new Date().toISOString().split('T')[0],
      freshness: 'fresh',
      usageStats: {
        timesUsed: 0
      }
    };

    onSave(customUnit);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-80 z-[60]" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-[70] p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Save as Custom Unit</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            <p className="text-gray-600">
              You've modified this unit. Save it for future use as a custom unit.
            </p>

            {/* Unit Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Unit Name *
              </label>
              <input
                type="text"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter custom unit name"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Describe your modifications..."
              />
            </div>

            {/* Changes Summary */}
            {changes.length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Changes from original:
                </label>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <ul className="space-y-2 text-sm">
                    {changes.map((change, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="text-blue-600">•</span>
                        {change.type === 'quantity_changed' && (
                          <span>
                            Quantity changed: <strong>{change.item}</strong> ({change.from} → {change.to})
                          </span>
                        )}
                        {change.type === 'removed' && (
                          <span>Removed: {change.count} component(s)</span>
                        )}
                        {change.type === 'added' && (
                          <span>Added: {change.count} component(s)</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Total Cost */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Total Cost:</span>
                <span className="text-2xl font-bold text-primary">
                  {formatCurrency(modifiedUnit.pricing.totalCost)}
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Materials: {formatCurrency(modifiedUnit.pricing.materialsCost)} •
                Labor: {formatCurrency(modifiedUnit.pricing.laborCost)}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-4 p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!unitName.trim()}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Custom Unit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaveCustomUnitModal;
