import { Star, Package, Zap, Clock } from 'lucide-react';
import { formatCurrency, getTierInfo, getFreshnessDisplay, getConfidenceIndicator } from '../utils/helpers';
import IconRenderer from './IconRenderer';

const UnitCard = ({ unit, onClick, isFavorite, onToggleFavorite, showUsageStats = true }) => {
  const tierInfo = getTierInfo(unit.tier);
  const freshnessDisplay = getFreshnessDisplay(unit.lastUpdated);

  // Get overall confidence (check if any material is estimated)
  const hasEstimated = unit.materials.some(m => m.confidence === 'estimated');
  const confidence = hasEstimated ? 'estimated' : 'verified';
  const confidenceInfo = getConfidenceIndicator(confidence);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(unit.id);
  };

  return (
    <div
      className="card cursor-pointer hover:border-primary transition-all"
      onClick={onClick}
    >
      {/* Header with tier, confidence, and favorite */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`tier-badge ${tierInfo.color} flex items-center gap-1`}>
            <IconRenderer iconName={tierInfo.icon} className="w-3.5 h-3.5" />
            {tierInfo.label}
          </span>
          <span className={`text-xs ${confidenceInfo.color} flex items-center gap-1`}>
            <IconRenderer iconName={confidenceInfo.icon} className="w-3.5 h-3.5" />
            {confidenceInfo.label}
          </span>
        </div>
        <button
          onClick={handleFavoriteClick}
          className="p-1 hover:scale-110 transition-transform"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star
            className={`w-5 h-5 ${
              isFavorite
                ? 'fill-yellow-500 text-yellow-500'
                : 'text-gray-400 hover:text-yellow-500'
            } transition-colors`}
          />
        </button>
      </div>

      {/* Title and Description */}
      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
        {unit.name}
      </h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {unit.description}
      </p>

      {/* Icons: Materials, Labor, Last Updated */}
      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
        <div className="flex items-center gap-1" title={`${unit.materials.length} materials`}>
          <Package className="w-4 h-4" />
          <span>{unit.materials.length}</span>
        </div>
        <div className="flex items-center gap-1" title={`${unit.labor.length} labor item(s)`}>
          <Zap className="w-4 h-4" />
          <span>{unit.labor.length}</span>
        </div>
        <div className="flex items-center gap-1" title={freshnessDisplay}>
          <Clock className="w-4 h-4" />
          <span className="text-xs">{freshnessDisplay}</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-500 mb-1">Total Cost</div>
          <div className="text-xl font-bold text-primary">
            {formatCurrency(unit.pricing.totalCost)}
          </div>
        </div>
        {showUsageStats && (
          <div className="text-xs text-gray-500">
            Used {unit.usageStats.timesUsed} times
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitCard;
