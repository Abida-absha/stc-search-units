// Format currency in Danish Kroner
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('da-DK', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount) + ' kr.';
};

// Format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateFormat('da-DK').format(date);
};

// Calculate days since date
export const daysSince = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

// Get freshness display (Updated X days ago)
export const getFreshnessDisplay = (lastUpdated) => {
  const days = daysSince(lastUpdated);

  if (days === 0) {
    return 'Updated today';
  } else if (days === 1) {
    return 'Updated 1 day ago';
  } else {
    return `Updated ${days} days ago`;
  }
};

// Get confidence indicator
export const getConfidenceIndicator = (confidence) => {
  switch (confidence) {
    case 'verified':
      return { icon: 'CheckCircle2', label: 'Verified', color: 'text-green-600', bgColor: 'bg-green-50' };
    case 'estimated':
      return { icon: 'AlertTriangle', label: 'Estimated', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
    default:
      return { icon: 'HelpCircle', label: 'Unknown', color: 'text-gray-600', bgColor: 'bg-gray-50' };
  }
};

// Get tier info
export const getTierInfo = (tier) => {
  switch (tier) {
    case 'standard':
      return { label: 'Standard', color: 'tier-standard', icon: 'Box' };
    case 'lean':
      return { label: 'Lean', color: 'tier-lean', icon: 'Flame' };
    case 'custom':
      return { label: 'Custom', color: 'tier-custom', icon: 'Settings' };
    default:
      return { label: tier, color: 'bg-gray-100 text-gray-700', icon: 'Box' };
  }
};

// Get category info
export const getCategoryInfo = (category) => {
  const categoryMap = {
    toiletinstallation: { label: 'Toilet Installation', icon: 'Bath' },
    vaskinstallation: { label: 'Sink Installation', icon: 'Droplet' },
    bruserinstallation: { label: 'Shower Installation', icon: 'ShowerHead' },
    badekarinstallation: { label: 'Bathtub Installation', icon: 'Bath' },
    varmesystemer: { label: 'Heating Systems', icon: 'Flame' },
    ventilation: { label: 'Ventilation', icon: 'Wind' },
    aflob: { label: 'Drainage', icon: 'Wrench' },
    vandforsyning: { label: 'Water Supply', icon: 'Droplets' }
  };

  return categoryMap[category] || { label: category, icon: 'Box' };
};

// Calculate total cost from materials and labor
export const calculateTotalCost = (materials, labor) => {
  const materialsCost = materials.reduce((sum, m) => sum + (m.costPrice * m.quantity), 0);
  const laborCost = labor.reduce((sum, l) => sum + l.totalCost, 0);
  return materialsCost + laborCost;
};

// Recalculate unit pricing when quantities change
export const recalculateUnitPricing = (materials, labor) => {
  const materialsCost = materials.reduce((sum, m) => sum + (m.costPrice * m.quantity), 0);
  const laborCost = labor.reduce((sum, l) => sum + l.totalCost, 0);
  const totalCost = materialsCost + laborCost;

  const materialsPercent = totalCost > 0 ? (materialsCost / totalCost) * 100 : 0;
  const laborPercent = totalCost > 0 ? (laborCost / totalCost) * 100 : 0;

  return {
    totalCost,
    materialsCost,
    laborCost,
    materialsPercent: Math.round(materialsPercent * 10) / 10,
    laborPercent: Math.round(laborPercent * 10) / 10
  };
};

// Detect changes between original and modified unit
export const detectUnitChanges = (originalUnit, modifiedUnit) => {
  const changes = [];

  // Check material quantity changes
  originalUnit.materials.forEach((origMat, index) => {
    const modMat = modifiedUnit.materials[index];
    if (modMat && modMat.quantity !== origMat.quantity) {
      changes.push({
        type: 'quantity_changed',
        item: origMat.name,
        from: origMat.quantity,
        to: modMat.quantity
      });
    }
  });

  // Check for removed materials
  if (modifiedUnit.materials.length < originalUnit.materials.length) {
    const removedCount = originalUnit.materials.length - modifiedUnit.materials.length;
    changes.push({
      type: 'removed',
      count: removedCount
    });
  }

  // Check for added materials
  if (modifiedUnit.materials.length > originalUnit.materials.length) {
    const addedCount = modifiedUnit.materials.length - originalUnit.materials.length;
    changes.push({
      type: 'added',
      count: addedCount
    });
  }

  return changes;
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Generate unique ID
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
