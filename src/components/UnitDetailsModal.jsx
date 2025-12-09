import React, { useState } from 'react';
import { X, ArrowLeft, Star, Plus, Minus, ChevronDown, ChevronUp, Save, Clock, Package, Zap, Info, CheckCircle2, AlertTriangle } from 'lucide-react';
import { formatCurrency, getTierInfo, getFreshnessDisplay, getConfidenceIndicator, recalculateUnitPricing } from '../utils/helpers';
import SaveCustomUnitModal from './SaveCustomUnitModal';
import IconRenderer from './IconRenderer';

const UnitDetailsModal = ({
  unit: initialUnit,
  isOpen,
  onClose,
  onAddToEstimate,
  isFavorite,
  toggleFavorite,
  addFavorite
}) => {
  const [modifiedUnit, setModifiedUnit] = useState(initialUnit);
  const [expandedDiscounts, setExpandedDiscounts] = useState({});
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isMaterialsExpanded, setIsMaterialsExpanded] = useState(true);
  const [isLaborExpanded, setIsLaborExpanded] = useState(true);

  const tierInfo = getTierInfo(modifiedUnit.tier);
  const freshnessDisplay = getFreshnessDisplay(modifiedUnit.lastUpdated);

  // Get overall confidence (check if any material is estimated)
  const hasEstimated = modifiedUnit.materials.some(m => m.confidence === 'estimated');
  const confidence = hasEstimated ? 'estimated' : 'verified';
  const confidenceInfo = getConfidenceIndicator(confidence);

  const hasModifications = JSON.stringify(initialUnit) !== JSON.stringify(modifiedUnit);

  const handleQuantityChange = (materialId, delta) => {
    setModifiedUnit(prev => {
      const updatedMaterials = prev.materials.map(mat => {
        if (mat.id === materialId) {
          const newQuantity = Math.max(0, mat.quantity + delta);
          return {
            ...mat,
            quantity: newQuantity,
            total: mat.costPrice * newQuantity
          };
        }
        return mat;
      });

      const updatedPricing = recalculateUnitPricing(updatedMaterials, prev.labor);

      return {
        ...prev,
        materials: updatedMaterials,
        pricing: updatedPricing
      };
    });
  };

  const toggleDiscount = (materialId) => {
    setExpandedDiscounts(prev => ({
      ...prev,
      [materialId]: !prev[materialId]
    }));
  };

  const handleAddToEstimate = () => {
    onAddToEstimate(modifiedUnit);
  };

  const handleSaveAsCustom = () => {
    setIsSaveModalOpen(true);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-y-0 right-0 w-full max-w-5xl bg-white shadow-2xl z-50 overflow-y-auto animate-slide-in-right">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className={`tier-badge ${tierInfo.color} flex items-center gap-1`}>
                  <IconRenderer iconName={tierInfo.icon} className="w-4 h-4" />
                  {tierInfo.label}
                </span>
                <span className={`text-sm ${confidenceInfo.color} flex items-center gap-1`}>
                  <IconRenderer iconName={confidenceInfo.icon} className="w-4 h-4" />
                  {confidenceInfo.label}
                </span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {freshnessDisplay}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{modifiedUnit.name}</h2>
              <p className="text-gray-600 mb-4">{modifiedUnit.description}</p>
              <div className="flex flex-wrap gap-2">
                {modifiedUnit.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => toggleFavorite(modifiedUnit.id)}
              className="p-2 hover:scale-110 transition-transform"
            >
              <Star
                className={`w-6 h-6 ${
                  isFavorite
                    ? 'fill-yellow-500 text-yellow-500'
                    : 'text-gray-400 hover:text-yellow-500'
                } transition-colors`}
              />
            </button>
          </div>
        </div>

        {/* Content - Accordion Sections */}
        <div className="p-6 space-y-6">
          {/* Materials Section */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setIsMaterialsExpanded(!isMaterialsExpanded)}
              className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">
                  Materials ({modifiedUnit.materials.length} items)
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-primary">
                  {formatCurrency(modifiedUnit.pricing.materialsCost)}
                </span>
                {isMaterialsExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </button>

            {isMaterialsExpanded && (
            <div className="p-6 space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-sm text-gray-600">
                      <th className="pb-3 font-semibold">Material</th>
                      <th className="pb-3 font-semibold text-center">Qty</th>
                      <th className="pb-3 font-semibold">Unit</th>
                      <th className="pb-3 font-semibold text-right">Cost Price</th>
                      <th className="pb-3 font-semibold text-right">Total</th>
                      <th className="pb-3 font-semibold">Supplier</th>
                      <th className="pb-3 font-semibold text-center">Confidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modifiedUnit.materials.map((material) => (
                      <React.Fragment key={material.id}>
                        <tr className="border-b border-gray-100">
                          <td className="py-4">
                            <div className="font-medium text-gray-900">{material.name}</div>
                            {material.articleNo !== '-' && (
                              <div className="text-xs text-gray-500">Art. {material.articleNo}</div>
                            )}
                          </td>
                          <td className="py-4">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => handleQuantityChange(material.id, -1)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                disabled={material.quantity === 0}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-medium">{material.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(material.id, 1)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                          <td className="py-4 text-gray-600">{material.unit}</td>
                          <td className="py-4 text-right">
                            <div className="font-semibold text-primary">
                              {formatCurrency(material.costPrice)}
                            </div>
                            {material.listPrice > material.costPrice && (
                              <div className="text-xs text-gray-400 line-through">
                                {formatCurrency(material.listPrice)}
                              </div>
                            )}
                          </td>
                          <td className="py-4 text-right font-semibold">
                            {formatCurrency(material.total)}
                          </td>
                          <td className="py-4">
                            <span className={`inline-flex items-center gap-1 text-sm`}>
                              <span
                                className={`w-2 h-2 rounded-full bg-${material.supplier.color}-500`}
                              />
                              {material.supplier.name}
                            </span>
                          </td>
                          <td className="py-4 text-center">
                            {material.confidence === 'verified' && (
                              <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                            )}
                            {material.confidence === 'estimated' && (
                              <AlertTriangle className="w-4 h-4 text-yellow-500 mx-auto" />
                            )}
                          </td>
                        </tr>
                        {material.discounts && material.discounts.length > 0 && (
                          <tr>
                            <td colSpan="7" className="py-2">
                              <button
                                onClick={() => toggleDiscount(material.id)}
                                className="text-sm text-primary hover:text-primary-hover flex items-center gap-1"
                              >
                                {expandedDiscounts[material.id] ? (
                                  <>
                                    <ChevronUp className="w-4 h-4" />
                                    Hide discounts
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="w-4 h-4" />
                                    Show discounts
                                  </>
                                )}
                              </button>
                              {expandedDiscounts[material.id] && (
                                <div className="mt-2 ml-4 p-4 bg-gray-50 rounded-lg space-y-2">
                                  <div className="text-sm">
                                    <div className="flex justify-between mb-1">
                                      <span className="text-gray-600">List Price</span>
                                      <span className="font-medium">{formatCurrency(material.listPrice)}</span>
                                    </div>
                                    {material.discounts.map((discount, idx) => (
                                      <div key={idx} className="flex justify-between mb-1">
                                        <span className="text-gray-600">
                                          {discount.type}
                                          <span className="text-xs text-gray-500 block">{discount.description}</span>
                                        </span>
                                        <span className="text-green-600">{formatCurrency(discount.amount)}</span>
                                      </div>
                                    ))}
                                    <div className="flex justify-between pt-2 border-t border-gray-200">
                                      <span className="font-semibold">Cost Price</span>
                                      <span className="font-bold text-primary">{formatCurrency(material.costPrice)}</span>
                                    </div>
                                  </div>
                                  <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                                    <Copy className="w-3 h-3" />
                                    Customize
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            )}
          </div>

          {/* Labor Section */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setIsLaborExpanded(!isLaborExpanded)}
              className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">
                  Labor ({modifiedUnit.labor.length} {modifiedUnit.labor.length === 1 ? 'task' : 'tasks'})
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-primary">
                  {formatCurrency(modifiedUnit.pricing.laborCost)}
                </span>
                {isLaborExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </button>

            {isLaborExpanded && (
            <div className="p-6 space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-sm text-gray-600">
                      <th className="pb-3 font-semibold">Task</th>
                      <th className="pb-3 font-semibold text-right">Akkord Time</th>
                      <th className="pb-3 font-semibold text-right">Hourly Rate</th>
                      <th className="pb-3 font-semibold text-right">Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modifiedUnit.labor.map((laborItem) => (
                      <React.Fragment key={laborItem.id}>
                        <tr className="border-b border-gray-100">
                          <td className="py-4 font-medium text-gray-900">{laborItem.task}</td>
                          <td className="py-4 text-right">
                            {laborItem.akkordTime.toFixed(1)} {laborItem.unit}
                          </td>
                          <td className="py-4 text-right">{formatCurrency(laborItem.hourlyRate)}</td>
                          <td className="py-4 text-right font-bold text-primary">
                            {formatCurrency(laborItem.totalCost)}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="4" className="py-2">
                            <div className="text-xs text-gray-500 ml-4 flex items-center gap-2">
                              <Info className="w-3.5 h-3.5" />
                              <span>Based on{' '}
                              <a
                                href={laborItem.reference.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                {laborItem.reference.source}
                              </a>
                              </span>
                            </div>
                            <div className="ml-4 mt-2 p-3 bg-blue-50 rounded text-xs space-y-1">
                              <div className="font-semibold text-gray-700 mb-2">Calculation:</div>
                              <div>{laborItem.akkordTime} timer × {laborItem.hourlyRate} kr/time = {formatCurrency(laborItem.totalCost)}</div>
                              <details className="mt-2">
                                <summary className="cursor-pointer text-primary hover:underline">
                                  Wage breakdown
                                </summary>
                                <div className="mt-2 space-y-1 text-gray-600">
                                  <div>Base Wage: {laborItem.reference.breakdown.baseWage} kr/time</div>
                                  <div>Pension: {laborItem.reference.breakdown.pension} kr/time</div>
                                  <div>Holiday Allowance: {laborItem.reference.breakdown.holiday} kr/time</div>
                                  <div>Other Benefits: {laborItem.reference.breakdown.otherBenefits} kr/time</div>
                                </div>
                              </details>
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            )}
          </div>

          {/* Cost Summary */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Cost Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Materials ({modifiedUnit.pricing.materialsPercent.toFixed(1)}% of total)
                </span>
                <span className="font-semibold">{formatCurrency(modifiedUnit.pricing.materialsCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Labor ({modifiedUnit.pricing.laborPercent.toFixed(1)}% of total)
                </span>
                <span className="font-semibold">{formatCurrency(modifiedUnit.pricing.laborCost)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-200">
                <span className="text-lg font-bold text-gray-900">Total Cost</span>
                <span className="text-2xl font-bold text-primary">
                  {formatCurrency(modifiedUnit.pricing.totalCost)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex items-center gap-4">
          <button
            onClick={handleSaveAsCustom}
            disabled={!hasModifications}
            className="btn-secondary flex items-center gap-2 flex-1"
          >
            <Save className="w-5 h-5" />
            Save as My Unit
          </button>
          <button
            onClick={handleAddToEstimate}
            className="btn-primary flex items-center gap-2 flex-1"
          >
            <Plus className="w-5 h-5" />
            {hasModifications ? 'Add Modified Unit' : 'Add to Estimate'}
          </button>
        </div>
      </div>

      {/* Save Custom Unit Modal */}
      {isSaveModalOpen && (
        <SaveCustomUnitModal
          originalUnit={initialUnit}
          modifiedUnit={modifiedUnit}
          isOpen={isSaveModalOpen}
          onClose={() => setIsSaveModalOpen(false)}
          onSave={(customUnit) => {
            addFavorite(customUnit.id);
            setIsSaveModalOpen(false);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default UnitDetailsModal;
