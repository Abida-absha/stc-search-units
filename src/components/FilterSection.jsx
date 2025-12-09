import { ChevronDown } from 'lucide-react';

const FilterSection = ({ filters, toggleFilterValue, clearFilters, hasActiveFilters }) => {
  const tiers = [
    { value: 'standard', label: 'Standard' },
    { value: 'lean', label: 'Lean' },
    { value: 'custom', label: 'Custom' }
  ];

  const categories = [
    { value: 'toiletinstallation', label: 'Toilet Installation' },
    { value: 'badekarinstallation', label: 'Bathtub Installation' },
    { value: 'bruserinstallation', label: 'Shower Installation' },
    { value: 'vaskinstallation', label: 'Sink Installation' },
    { value: 'varmesystemer', label: 'Heating Systems' },
    { value: 'ventilation', label: 'Ventilation' },
    { value: 'aflob', label: 'Drainage' },
    { value: 'vandforsyning', label: 'Water Supply' }
  ];

  const suppliers = [
    'Skovgaard',
    'Leverandørservice',
    'AO Ishøj',
    'VVS Grossisten',
    'Danfoss'
  ];

  return (
    <div className="space-y-6">
      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <button
            onClick={clearFilters}
            className="text-sm text-primary hover:text-primary-hover font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Tier Filter - Dropdown */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Tier</label>
        <div className="relative">
          <select
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white pr-10"
            value={filters.tiers[0] || ''}
            onChange={(e) => {
              if (e.target.value) {
                toggleFilterValue('tiers', e.target.value);
              }
            }}
          >
            <option value="">All Tiers</option>
            {tiers.map(tier => (
              <option key={tier.value} value={tier.value}>
                {tier.icon} {tier.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Category Filter - Dropdown */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
        <div className="relative">
          <select
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white pr-10"
            value={filters.categories[0] || ''}
            onChange={(e) => {
              if (e.target.value) {
                toggleFilterValue('categories', e.target.value);
              }
            }}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.icon} {category.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Supplier Filter - Dropdown */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Supplier</label>
        <div className="relative">
          <select
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white pr-10"
            value={filters.suppliers[0] || ''}
            onChange={(e) => {
              if (e.target.value) {
                toggleFilterValue('suppliers', e.target.value);
              }
            }}
          >
            <option value="">All Suppliers</option>
            {suppliers.map(supplier => (
              <option key={supplier} value={supplier}>
                {supplier}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Price Range: {filters.priceRange[0].toLocaleString()} - {filters.priceRange[1].toLocaleString()} kr.
        </label>
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={filters.priceRange[0]}
            onChange={(e) => {
              const newMin = parseInt(e.target.value) || 0;
              toggleFilterValue('priceRange', [newMin, filters.priceRange[1]]);
            }}
            className="w-32 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Min"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            value={filters.priceRange[1]}
            onChange={(e) => {
              const newMax = parseInt(e.target.value) || 50000;
              toggleFilterValue('priceRange', [filters.priceRange[0], newMax]);
            }}
            className="w-32 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Max"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
