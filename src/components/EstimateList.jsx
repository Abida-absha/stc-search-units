import { Plus, Save, Trash2, Edit3, Package, Mail, Calendar, RefreshCw, Circle, Hash } from 'lucide-react';
import { formatCurrency, getTierInfo } from '../utils/helpers';
import IconRenderer from './IconRenderer';

const EstimateList = ({ addedUnits, onRemoveUnit, onOpenSearch }) => {
  const totalMaterials = addedUnits.reduce((sum, unit) => sum + unit.pricing.materialsCost, 0);
  const totalLabor = addedUnits.reduce((sum, unit) => sum + unit.pricing.laborCost, 0);
  const grandTotal = totalMaterials + totalLabor;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Page Title and Actions */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Current Estimation</h2>
          <button className="btn-secondary flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Estimate
          </button>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Project Name"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            defaultValue="New Estimate"
          />
        </div>
      </div>

      {/* Main Layout: Chapters and Totals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chapters Section (Left - 2 columns) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Chapter 1: Main Installation</h2>

            {/* Empty State */}
            {addedUnits.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No units added yet</h3>
                <p className="text-gray-500 mb-6">Start by adding units from the library</p>
                <button
                  onClick={onOpenSearch}
                  className="btn-primary flex items-center gap-2 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  Add Items/Components
                </button>
              </div>
            )}

            {/* Added Units */}
            {addedUnits.length > 0 && (
              <div className="space-y-4">
                {addedUnits.map((unit) => {
                  const tierInfo = getTierInfo(unit.tier);
                  return (
                    <div
                      key={unit.addedId}
                      className="card flex items-start justify-between"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`tier-badge ${tierInfo.color} flex items-center gap-1`}>
                            <IconRenderer iconName={tierInfo.icon} className="w-3.5 h-3.5" />
                            {tierInfo.label}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{unit.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{unit.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{unit.materials.length} materials</span>
                          <span>•</span>
                          <span>{unit.labor.length} labor</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-xl font-bold text-primary">
                          {formatCurrency(unit.pricing.totalCost)}
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onRemoveUnit(unit.addedId)}
                            className="p-2 text-red-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Add More Button */}
                <button
                  onClick={onOpenSearch}
                  className="btn-primary flex items-center gap-2 w-full justify-center"
                >
                  <Plus className="w-5 h-5" />
                  Add Items/Components
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Totals Section (Right - 1 column) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Totals</h2>

            <div className="space-y-4 mb-6">
              <div>
                <div className="text-sm text-gray-600 mb-1">MATERIALS</div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalMaterials)}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-1">LABOR</div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalLabor)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  incl. hours
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">SUBTOTAL (EXCL. VAT)</span>
                <span className="font-semibold">{formatCurrency(grandTotal)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">VAT (25%)</span>
                <span className="font-semibold">{formatCurrency(grandTotal * 0.25)}</span>
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-600 mb-1">TOTAL (INCL. VAT)</div>
              <div className="text-3xl font-bold text-primary">
                {formatCurrency(grandTotal * 1.25)}
              </div>
            </div>

            <div className="space-y-2">
              <button className="btn-primary w-full">
                Mark as Complete
              </button>
              <button className="btn-secondary w-full">
                Generate PDF
              </button>
              <button className="btn-secondary w-full">
                Send to Customer
              </button>
              <button className="btn-secondary w-full">
                Export to Excel
              </button>
            </div>

            {/* Project Details */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Project Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Hash className="w-4 h-4" />
                  <span>Quote #: 2025-0001</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>No email</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Created: 12/08/2025</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <RefreshCw className="w-4 h-4" />
                  <span>Updated: 12/08/2025 14:51</span>
                </div>
                <div className="flex items-center gap-2">
                  <Circle className="w-4 h-4" />
                  <span className="text-gray-700 font-medium">Status: DRAFT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimateList;
