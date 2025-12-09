// Mock data for 15 VVS units with realistic Danish data

export const mockUnits = [
  {
    id: "unit-001",
    name: "Wall-Mounted Toilet Installation",
    description: "Complete wall-mounted toilet installation including all materials and labor",
    tier: "standard",
    category: "toiletinstallation",
    categoryIcon: "🚽",
    tags: ["toilet", "wc", "bathroom", "sanitary", "wall-mounted"],

    pricing: {
      totalCost: 7650,
      materialsCost: 4850,
      laborCost: 2800,
      materialsPercent: 63.4,
      laborPercent: 36.6
    },

    freshness: "fresh",
    lastUpdated: "2025-12-06",

    usageStats: {
      timesUsed: 12
    },

    materials: [
      {
        id: "mat-001-1",
        name: "Wall-mounted toilet (Geberit Aquaclean)",
        quantity: 1,
        unit: "stk",
        costPrice: 3500,
        listPrice: 4117.65,
        total: 3500,
        supplier: {
          name: "Skovgaard",
          color: "blue"
        },
        articleNo: "GEB-12345",
        confidence: "verified",
        discounts: [
          {
            type: "Aftalerabat (15%)",
            description: "Skovgaard standard aftale",
            amount: -617.65
          }
        ]
      },
      {
        id: "mat-001-2",
        name: "Concealed cistern frame",
        quantity: 1,
        unit: "stk",
        costPrice: 1200,
        listPrice: 1411.76,
        total: 1200,
        supplier: {
          name: "Skovgaard",
          color: "blue"
        },
        articleNo: "GEB-23456",
        confidence: "verified",
        discounts: [
          {
            type: "Aftalerabat (15%)",
            description: "Skovgaard standard aftale",
            amount: -211.76
          }
        ]
      },
      {
        id: "mat-001-3",
        name: "Misc. pipes and fittings",
        quantity: 1,
        unit: "set",
        costPrice: 150,
        listPrice: 166.67,
        total: 150,
        supplier: {
          name: "VVS Grossisten",
          color: "purple"
        },
        articleNo: "-",
        confidence: "verified",
        discounts: [
          {
            type: "Aftalerabat (10%)",
            description: "VVS Grossisten aftale",
            amount: -16.67
          }
        ]
      }
    ],

    labor: [
      {
        id: "lab-001-1",
        task: "Installation of wall-mounted toilet",
        akkordTime: 4.5,
        unit: "hour",
        hourlyRate: 620,
        totalCost: 2800,
        reference: {
          source: "Tekniq Denmark Q4 2024 lønkatalog",
          url: "https://tekniq.dk",
          breakdown: {
            baseWage: 180,
            pension: 45,
            holiday: 40,
            otherBenefits: 20.71
          }
        }
      }
    ]
  },

  {
    id: "unit-002",
    name: "Kitchen Sink Installation",
    description: "Complete kitchen sink installation with modern tap and waste system",
    tier: "standard",
    category: "vaskinstallation",
    categoryIcon: "🚰",
    tags: ["sink", "kitchen", "tap", "waste"],

    pricing: {
      totalCost: 5060,
      materialsCost: 3200,
      laborCost: 1860,
      materialsPercent: 63.2,
      laborPercent: 36.8
    },

    freshness: "fresh",
    lastUpdated: "2025-12-05",

    usageStats: {
      timesUsed: 8
    },

    materials: [
      {
        id: "mat-002-1",
        name: "Stainless steel kitchen sink (Blanco)",
        quantity: 1,
        unit: "stk",
        costPrice: 1800,
        listPrice: 2142.86,
        total: 1800,
        supplier: {
          name: "Skovgaard",
          color: "blue"
        },
        articleNo: "BLA-45678",
        confidence: "verified",
        discounts: []
      },
      {
        id: "mat-002-2",
        name: "Kitchen tap with pull-out spray",
        quantity: 1,
        unit: "stk",
        costPrice: 1200,
        listPrice: 1411.76,
        total: 1200,
        supplier: {
          name: "Danfoss",
          color: "red"
        },
        articleNo: "DAN-78901",
        confidence: "verified",
        discounts: []
      },
      {
        id: "mat-002-3",
        name: "Waste system and connections",
        quantity: 1,
        unit: "set",
        costPrice: 200,
        listPrice: 233.33,
        total: 200,
        supplier: {
          name: "VVS Grossisten",
          color: "purple"
        },
        articleNo: "-",
        confidence: "verified",
        discounts: []
      }
    ],

    labor: [
      {
        id: "lab-002-1",
        task: "Installation of kitchen sink and tap",
        akkordTime: 3.0,
        unit: "hour",
        hourlyRate: 620,
        totalCost: 1860,
        reference: {
          source: "Tekniq Denmark Q4 2024 lønkatalog",
          url: "https://tekniq.dk",
          breakdown: {
            baseWage: 180,
            pension: 45,
            holiday: 40,
            otherBenefits: 20.71
          }
        }
      }
    ]
  },

  {
    id: "unit-003",
    name: "Radiator Installation (600x1200mm)",
    description: "Panel radiator installation with thermostatic valve",
    tier: "lean",
    category: "varmesystemer",
    categoryIcon: "🔥",
    tags: ["radiator", "heating", "panel", "thermostatic"],

    pricing: {
      totalCost: 3500,
      materialsCost: 2100,
      laborCost: 1400,
      materialsPercent: 60.0,
      laborPercent: 40.0
    },

    freshness: "fresh",
    lastUpdated: "2025-12-07",

    usageStats: {
      timesUsed: 15
    },

    materials: [
      {
        id: "mat-003-1",
        name: "Panel radiator 600x1200mm",
        quantity: 1,
        unit: "stk",
        costPrice: 1800,
        listPrice: 2000,
        total: 1800,
        supplier: {
          name: "Danfoss",
          color: "red"
        },
        articleNo: "DAN-RAD-612",
        confidence: "verified",
        discounts: []
      },
      {
        id: "mat-003-2",
        name: "Thermostatic valve",
        quantity: 1,
        unit: "stk",
        costPrice: 300,
        listPrice: 353.33,
        total: 300,
        supplier: {
          name: "Danfoss",
          color: "red"
        },
        articleNo: "DAN-VALVE-01",
        confidence: "verified",
        discounts: []
      }
    ],

    labor: [
      {
        id: "lab-003-1",
        task: "Installation of radiator with valve",
        akkordTime: 2.25,
        unit: "hour",
        hourlyRate: 620,
        totalCost: 1400,
        reference: {
          source: "Tekniq Denmark Q4 2024 lønkatalog",
          url: "https://tekniq.dk",
          breakdown: {
            baseWage: 180,
            pension: 45,
            holiday: 40,
            otherBenefits: 20.71
          }
        }
      }
    ]
  },

  {
    id: "unit-004",
    name: "Floor-Standing Toilet Installation",
    description: "Standard floor-standing toilet installation with soft-close seat",
    tier: "standard",
    category: "toiletinstallation",
    categoryIcon: "🚽",
    tags: ["toilet", "floor-standing", "standard", "bathroom"],

    pricing: {
      totalCost: 4200,
      materialsCost: 2400,
      laborCost: 1800,
      materialsPercent: 57.1,
      laborPercent: 42.9
    },

    freshness: "aging",
    lastUpdated: "2025-11-20",

    usageStats: {
      timesUsed: 24
    },

    materials: [
      {
        id: "mat-004-1",
        name: "Floor-standing toilet with cistern",
        quantity: 1,
        unit: "stk",
        costPrice: 1900,
        listPrice: 2235.29,
        total: 1900,
        supplier: {
          name: "Skovgaard",
          color: "blue"
        },
        articleNo: "SKO-TOILET-01",
        confidence: "verified",
        discounts: []
      },
      {
        id: "mat-004-2",
        name: "Soft-close toilet seat",
        quantity: 1,
        unit: "stk",
        costPrice: 350,
        listPrice: 411.76,
        total: 350,
        supplier: {
          name: "Skovgaard",
          color: "blue"
        },
        articleNo: "SKO-SEAT-01",
        confidence: "verified",
        discounts: []
      },
      {
        id: "mat-004-3",
        name: "Connection kit",
        quantity: 1,
        unit: "set",
        costPrice: 150,
        listPrice: 176.47,
        total: 150,
        supplier: {
          name: "VVS Grossisten",
          color: "purple"
        },
        articleNo: "-",
        confidence: "verified",
        discounts: []
      }
    ],

    labor: [
      {
        id: "lab-004-1",
        task: "Installation of floor-standing toilet",
        akkordTime: 2.9,
        unit: "hour",
        hourlyRate: 620,
        totalCost: 1800,
        reference: {
          source: "Tekniq Denmark Q4 2024 lønkatalog",
          url: "https://tekniq.dk",
          breakdown: {
            baseWage: 180,
            pension: 45,
            holiday: 40,
            otherBenefits: 20.71
          }
        }
      }
    ]
  },

  {
    id: "unit-005",
    name: "Shower Installation - Premium",
    description: "Premium rain shower installation med stor regnbruser",
    tier: "custom",
    category: "bruserinstallation",
    categoryIcon: "🚿",
    tags: ["shower", "rain", "premium", "bathroom", "bruser"],

    pricing: {
      totalCost: 9200,
      materialsCost: 6400,
      laborCost: 2800,
      materialsPercent: 69.6,
      laborPercent: 30.4
    },

    freshness: "fresh",
    lastUpdated: "2025-12-08",

    usageStats: {
      timesUsed: 3
    },

    materials: [
      {
        id: "mat-005-1",
        name: "Rain shower head 300mm",
        quantity: 1,
        unit: "stk",
        costPrice: 2800,
        listPrice: 3294.12,
        total: 2800,
        supplier: {
          name: "Skovgaard",
          color: "blue"
        },
        articleNo: "SKO-RAIN-300",
        confidence: "verified",
        discounts: []
      },
      {
        id: "mat-005-2",
        name: "Thermostatic mixer valve",
        quantity: 1,
        unit: "stk",
        costPrice: 2400,
        listPrice: 2823.53,
        total: 2400,
        supplier: {
          name: "Danfoss",
          color: "red"
        },
        articleNo: "DAN-THERM-01",
        confidence: "verified",
        discounts: []
      },
      {
        id: "mat-005-3",
        name: "Wall bracket and hose",
        quantity: 1,
        unit: "set",
        costPrice: 1200,
        listPrice: 1411.76,
        total: 1200,
        supplier: {
          name: "VVS Grossisten",
          color: "purple"
        },
        articleNo: "VVS-BRACKET-01",
        confidence: "verified",
        discounts: []
      }
    ],

    labor: [
      {
        id: "lab-005-1",
        task: "Installation of premium shower system",
        akkordTime: 4.5,
        unit: "hour",
        hourlyRate: 620,
        totalCost: 2800,
        reference: {
          source: "Tekniq Denmark Q4 2024 lønkatalog",
          url: "https://tekniq.dk",
          breakdown: {
            baseWage: 180,
            pension: 45,
            holiday: 40,
            otherBenefits: 20.71
          }
        }
      }
    ]
  },

  {
    id: "unit-006",
    name: "Bathtub Installation",
    description: "Standard bathtub installation with mixer tap",
    tier: "standard",
    category: "badekarinstallation",
    categoryIcon: "🛁",
    tags: ["bathtub", "bath", "mixer", "bathroom", "badekar"],

    pricing: {
      totalCost: 8500,
      materialsCost: 5600,
      laborCost: 2900,
      materialsPercent: 65.9,
      laborPercent: 34.1
    },

    freshness: "fresh",
    lastUpdated: "2025-12-04",

    usageStats: {
      timesUsed: 6
    },

    materials: [
      {
        id: "mat-006-1",
        name: "Acrylic bathtub 170x75cm",
        quantity: 1,
        unit: "stk",
        costPrice: 3800,
        listPrice: 4470.59,
        total: 3800,
        supplier: {
          name: "Skovgaard",
          color: "blue"
        },
        articleNo: "SKO-TUB-170",
        confidence: "verified",
        discounts: []
      },
      {
        id: "mat-006-2",
        name: "Bath mixer tap with shower",
        quantity: 1,
        unit: "stk",
        costPrice: 1600,
        listPrice: 1882.35,
        total: 1600,
        supplier: {
          name: "Danfoss",
          color: "red"
        },
        articleNo: "DAN-MIXER-02",
        confidence: "verified",
        discounts: []
      },
      {
        id: "mat-006-3",
        name: "Waste and overflow kit",
        quantity: 1,
        unit: "set",
        costPrice: 200,
        listPrice: 235.29,
        total: 200,
        supplier: {
          name: "VVS Grossisten",
          color: "purple"
        },
        articleNo: "VVS-WASTE-01",
        confidence: "verified",
        discounts: []
      }
    ],

    labor: [
      {
        id: "lab-006-1",
        task: "Installation of bathtub with connections",
        akkordTime: 4.7,
        unit: "hour",
        hourlyRate: 620,
        totalCost: 2900,
        reference: {
          source: "Tekniq Denmark Q4 2024 lønkatalog",
          url: "https://tekniq.dk",
          breakdown: {
            baseWage: 180,
            pension: 45,
            holiday: 40,
            otherBenefits: 20.71
          }
        }
      }
    ]
  },

  {
    id: "unit-007",
    name: "Bathroom Sink with Cabinet",
    description: "Bathroom sink installation with vanity cabinet",
    tier: "standard",
    category: "vaskinstallation",
    categoryIcon: "🚰",
    tags: ["sink", "bathroom", "cabinet", "vanity", "vask"],

    pricing: {
      totalCost: 6800,
      materialsCost: 4500,
      laborCost: 2300,
      materialsPercent: 66.2,
      laborPercent: 33.8
    },

    freshness: "fresh",
    lastUpdated: "2025-12-06",

    usageStats: {
      timesUsed: 10
    },

    materials: [
      {
        id: "mat-007-1",
        name: "Bathroom vanity cabinet 80cm",
        quantity: 1,
        unit: "stk",
        costPrice: 2800,
        listPrice: 3294.12,
        total: 2800,
        supplier: {
          name: "Skovgaard",
          color: "blue"
        },
        articleNo: "SKO-VAN-80",
        confidence: "verified",
        discounts: []
      },
      {
        id: "mat-007-2",
        name: "Ceramic basin",
        quantity: 1,
        unit: "stk",
        costPrice: 1200,
        listPrice: 1411.76,
        total: 1200,
        supplier: {
          name: "Skovgaard",
          color: "blue"
        },
        articleNo: "SKO-BASIN-01",
        confidence: "verified",
        discounts: []
      },
      {
        id: "mat-007-3",
        name: "Basin mixer tap",
        quantity: 1,
        unit: "stk",
        costPrice: 500,
        listPrice: 588.24,
        total: 500,
        supplier: {
          name: "Danfoss",
          color: "red"
        },
        articleNo: "DAN-TAP-01",
        confidence: "verified",
        discounts: []
      }
    ],

    labor: [
      {
        id: "lab-007-1",
        task: "Installation of vanity cabinet and sink",
        akkordTime: 3.7,
        unit: "hour",
        hourlyRate: 620,
        totalCost: 2300,
        reference: {
          source: "Tekniq Denmark Q4 2024 lønkatalog",
          url: "https://tekniq.dk",
          breakdown: {
            baseWage: 180,
            pension: 45,
            holiday: 40,
            otherBenefits: 20.71
          }
        }
      }
    ]
  },

  {
    id: "unit-008",
    name: "Underfloor Heating System",
    description: "Electric underfloor heating system for bathroom",
    tier: "lean",
    category: "varmesystemer",
    categoryIcon: "🔥",
    tags: ["heating", "underfloor", "electric", "gulvvarme"],

    pricing: {
      totalCost: 4800,
      materialsCost: 2900,
      laborCost: 1900,
      materialsPercent: 60.4,
      laborPercent: 39.6
    },

    freshness: "fresh",
    lastUpdated: "2025-12-07",

    usageStats: {
      timesUsed: 7
    },

    materials: [
      {
        id: "mat-008-1",
        name: "Heating mat 5m² (150W/m²)",
        quantity: 1,
        unit: "stk",
        costPrice: 2200,
        listPrice: 2588.24,
        total: 2200,
        supplier: {
          name: "Danfoss",
          color: "red"
        },
        articleNo: "DAN-HEAT-5M",
        confidence: "verified",
        discounts: []
      },
      {
        id: "mat-008-2",
        name: "Thermostat with timer",
        quantity: 1,
        unit: "stk",
        costPrice: 700,
        listPrice: 823.53,
        total: 700,
        supplier: {
          name: "Danfoss",
          color: "red"
        },
        articleNo: "DAN-THERMO-01",
        confidence: "verified",
        discounts: []
      }
    ],

    labor: [
      {
        id: "lab-008-1",
        task: "Installation of underfloor heating",
        akkordTime: 3.1,
        unit: "hour",
        hourlyRate: 620,
        totalCost: 1900,
        reference: {
          source: "Tekniq Denmark Q4 2024 lønkatalog",
          url: "https://tekniq.dk",
          breakdown: {
            baseWage: 180,
            pension: 45,
            holiday: 40,
            otherBenefits: 20.71
          }
        }
      }
    ]
  },

  {
    id: "unit-009",
    name: "Radiator Installation (400x800mm)",
    description: "Compact panel radiator for small room",
    tier: "lean",
    category: "varmesystemer",
    categoryIcon: "🔥",
    tags: ["radiator", "heating", "compact", "small"],

    pricing: {
      totalCost: 2800,
      materialsCost: 1600,
      laborCost: 1200,
      materialsPercent: 57.1,
      laborPercent: 42.9
    },

    freshness: "fresh",
    lastUpdated: "2025-12-06",

    usageStats: {
      timesUsed: 18
    },

    materials: [
      {
        id: "mat-009-1",
        name: "Panel radiator 400x800mm",
        quantity: 1,
        unit: "stk",
        costPrice: 1300,
        listPrice: 1529.41,
        total: 1300,
        supplier: {
          name: "Danfoss",
          color: "red"
        },
        articleNo: "DAN-RAD-408",
        confidence: "verified",
        discounts: []
      },
      {
        id: "mat-009-2",
        name: "Basic valve set",
        quantity: 1,
        unit: "set",
        costPrice: 300,
        listPrice: 352.94,
        total: 300,
        supplier: {
          name: "VVS Grossisten",
          color: "purple"
        },
        articleNo: "VVS-VALVE-SET",
        confidence: "verified",
        discounts: []
      }
    ],

    labor: [
      {
        id: "lab-009-1",
        task: "Installation of compact radiator",
        akkordTime: 1.9,
        unit: "hour",
        hourlyRate: 620,
        totalCost: 1200,
        reference: {
          source: "Tekniq Denmark Q4 2024 lønkatalog",
          url: "https://tekniq.dk",
          breakdown: {
            baseWage: 180,
            pension: 45,
            holiday: 40,
            otherBenefits: 20.71
          }
        }
      }
    ]
  },

  {
    id: "unit-010",
    name: "Complete Bathroom Package",
    description: "Full bathroom renovation package with all fixtures",
    tier: "standard",
    category: "toiletinstallation",
    categoryIcon: "🚽",
    tags: ["bathroom", "complete", "package", "renovation", "komplet"],

    pricing: {
      totalCost: 32500,
      materialsCost: 21000,
      laborCost: 11500,
      materialsPercent: 64.6,
      laborPercent: 35.4
    },

    freshness: "fresh",
    lastUpdated: "2025-12-05",

    usageStats: {
      timesUsed: 4
    },

    materials: [
      {
        id: "mat-010-1",
        name: "Floor-standing toilet with cistern",
        quantity: 1,
        unit: "stk",
        costPrice: 2100,
        listPrice: 2470.59,
        total: 2100,
        supplier: {
          name: "Skovgaard",
          color: "blue"
        },
        articleNo: "SKO-TOILET-PKG",
        confidence: "verified",
        discounts: []
      },
      {
        id: "mat-010-2",
        name: "Shower cabin 90x90cm",
        quantity: 1,
        unit: "stk",
        costPrice: 8500,
        listPrice: 10000,
        total: 8500,
        supplier: {
          name: "Skovgaard",
          color: "blue"
        },
        articleNo: "SKO-SHOWER-90",
        confidence: "verified",
        discounts: []
      },
      {
        id: "mat-010-3",
        name: "Vanity unit with basin 80cm",
        quantity: 1,
        unit: "stk",
        costPrice: 3800,
        listPrice: 4470.59,
        total: 3800,
        supplier: {
          name: "Skovgaard",
          color: "blue"
        },
        articleNo: "SKO-VANITY-PKG",
        confidence: "verified",
        discounts: []
      },
      {
        id: "mat-010-4",
        name: "Tiles and adhesive",
        quantity: 1,
        unit: "set",
        costPrice: 6600,
        listPrice: 7764.71,
        total: 6600,
        supplier: {
          name: "Leverandørservice",
          color: "green"
        },
        articleNo: "LEV-TILE-SET",
        confidence: "estimated",
        discounts: []
      }
    ],

    labor: [
      {
        id: "lab-010-1",
        task: "Complete bathroom installation",
        akkordTime: 18.5,
        unit: "hour",
        hourlyRate: 620,
        totalCost: 11500,
        reference: {
          source: "Tekniq Denmark Q4 2024 lønkatalog",
          url: "https://tekniq.dk",
          breakdown: {
            baseWage: 180,
            pension: 45,
            holiday: 40,
            otherBenefits: 20.71
          }
        }
      }
    ]
  },

  {
    id: "unit-011",
    name: "Kitchen Sink Installation Deluxe",
    description: "Premium kitchen sink with designer tap and waste disposal",
    tier: "standard",
    category: "vaskinstallation",
    categoryIcon: "🚰",
    tags: ["kitchen", "sink", "premium", "designer", "deluxe"],

    pricing: {
      totalCost: 8900,
      materialsCost: 6500,
      laborCost: 2400,
      materialsPercent: 73.0,
      laborPercent: 27.0
    },

    freshness: "aging",
    lastUpdated: "2025-11-25",

    usageStats: {
      timesUsed: 5
    },

    materials: [
      {
        id: "mat-011-1",
        name: "Premium granite sink",
        quantity: 1,
        unit: "stk",
        costPrice: 4200,
        listPrice: 4941.18,
        total: 4200,
        supplier: {
          name: "Skovgaard",
          color: "blue"
        },
        articleNo: "SKO-GRAN-SINK",
        confidence: "verified",
        discounts: []
      },
      {
        id: "mat-011-2",
        name: "Designer tap with LED light",
        quantity: 1,
        unit: "stk",
        costPrice: 2000,
        listPrice: 2352.94,
        total: 2000,
        supplier: {
          name: "Danfoss",
          color: "red"
        },
        articleNo: "DAN-DESIGN-TAP",
        confidence: "verified",
        discounts: []
      },
      {
        id: "mat-011-3",
        name: "Waste disposal unit",
        quantity: 1,
        unit: "stk",
        costPrice: 300,
        listPrice: 352.94,
        total: 300,
        supplier: {
          name: "VVS Grossisten",
          color: "purple"
        },
        articleNo: "VVS-DISPOSAL",
        confidence: "verified",
        discounts: []
      }
    ],

    labor: [
      {
        id: "lab-011-1",
        task: "Installation of deluxe kitchen sink system",
        akkordTime: 3.9,
        unit: "hour",
        hourlyRate: 620,
        totalCost: 2400,
        reference: {
          source: "Tekniq Denmark Q4 2024 lønkatalog",
          url: "https://tekniq.dk",
          breakdown: {
            baseWage: 180,
            pension: 45,
            holiday: 40,
            otherBenefits: 20.71
          }
        }
      }
    ]
  },

  {
    id: "unit-012",
    name: "Toilet with Bidet Function",
    description: "Modern toilet with integrated bidet function",
    tier: "standard",
    category: "toiletinstallation",
    categoryIcon: "🚽",
    tags: ["toilet", "bidet", "modern", "hygiene"],

    pricing: {
      totalCost: 12500,
      materialsCost: 9800,
      laborCost: 2700,
      materialsPercent: 78.4,
      laborPercent: 21.6
    },

    freshness: "fresh",
    lastUpdated: "2025-12-08",

    usageStats: {
      timesUsed: 2
    },

    materials: [
      {
        id: "mat-012-1",
        name: "Smart toilet with bidet (Geberit AquaClean)",
        quantity: 1,
        unit: "stk",
        costPrice: 9500,
        listPrice: 11176.47,
        total: 9500,
        supplier: {
          name: "Skovgaard",
          color: "blue"
        },
        articleNo: "GEB-AQUA-BIDET",
        confidence: "verified",
        discounts: []
      },
      {
        id: "mat-012-2",
        name: "Connection kit with electric outlet",
        quantity: 1,
        unit: "set",
        costPrice: 300,
        listPrice: 352.94,
        total: 300,
        supplier: {
          name: "VVS Grossisten",
          color: "purple"
        },
        articleNo: "VVS-ELEC-KIT",
        confidence: "verified",
        discounts: []
      }
    ],

    labor: [
      {
        id: "lab-012-1",
        task: "Installation of smart toilet with bidet",
        akkordTime: 4.4,
        unit: "hour",
        hourlyRate: 620,
        totalCost: 2700,
        reference: {
          source: "Tekniq Denmark Q4 2024 lønkatalog",
          url: "https://tekniq.dk",
          breakdown: {
            baseWage: 180,
            pension: 45,
            holiday: 40,
            otherBenefits: 20.71
          }
        }
      }
    ]
  },

  {
    id: "unit-013",
    name: "Walk-in Shower Installation",
    description: "Modern walk-in shower with glass partition",
    tier: "lean",
    category: "bruserinstallation",
    categoryIcon: "🚿",
    tags: ["shower", "walk-in", "glass", "modern", "bruser"],

    pricing: {
      totalCost: 6200,
      materialsCost: 4100,
      laborCost: 2100,
      materialsPercent: 66.1,
      laborPercent: 33.9
    },

    freshness: "fresh",
    lastUpdated: "2025-12-06",

    usageStats: {
      timesUsed: 9
    },

    materials: [
      {
        id: "mat-013-1",
        name: "Glass partition 90x200cm",
        quantity: 1,
        unit: "stk",
        costPrice: 2800,
        listPrice: 3294.12,
        total: 2800,
        supplier: {
          name: "Skovgaard",
          color: "blue"
        },
        articleNo: "SKO-GLASS-90",
        confidence: "verified",
        discounts: []
      },
      {
        id: "mat-013-2",
        name: "Shower mixer valve",
        quantity: 1,
        unit: "stk",
        costPrice: 1000,
        listPrice: 1176.47,
        total: 1000,
        supplier: {
          name: "Danfoss",
          color: "red"
        },
        articleNo: "DAN-MIXER-WALK",
        confidence: "verified",
        discounts: []
      },
      {
        id: "mat-013-3",
        name: "Floor drain and waterproofing",
        quantity: 1,
        unit: "set",
        costPrice: 300,
        listPrice: 352.94,
        total: 300,
        supplier: {
          name: "VVS Grossisten",
          color: "purple"
        },
        articleNo: "VVS-DRAIN-SET",
        confidence: "verified",
        discounts: []
      }
    ],

    labor: [
      {
        id: "lab-013-1",
        task: "Installation of walk-in shower",
        akkordTime: 3.4,
        unit: "hour",
        hourlyRate: 620,
        totalCost: 2100,
        reference: {
          source: "Tekniq Denmark Q4 2024 lønkatalog",
          url: "https://tekniq.dk",
          breakdown: {
            baseWage: 180,
            pension: 45,
            holiday: 40,
            otherBenefits: 20.71
          }
        }
      }
    ]
  },

  {
    id: "unit-014",
    name: "Heating System - Full House",
    description: "Complete heating system for residential property",
    tier: "lean",
    category: "varmesystemer",
    categoryIcon: "🔥",
    tags: ["heating", "house", "complete", "system", "varme"],

    pricing: {
      totalCost: 45000,
      materialsCost: 28000,
      laborCost: 17000,
      materialsPercent: 62.2,
      laborPercent: 37.8
    },

    freshness: "aging",
    lastUpdated: "2025-11-15",

    usageStats: {
      timesUsed: 3
    },

    materials: [
      {
        id: "mat-014-1",
        name: "Boiler unit (Danfoss 24kW)",
        quantity: 1,
        unit: "stk",
        costPrice: 18000,
        listPrice: 21176.47,
        total: 18000,
        supplier: {
          name: "Danfoss",
          color: "red"
        },
        articleNo: "DAN-BOILER-24",
        confidence: "verified",
        discounts: []
      },
      {
        id: "mat-014-2",
        name: "Radiators (various sizes)",
        quantity: 8,
        unit: "stk",
        costPrice: 8000,
        listPrice: 9411.76,
        total: 8000,
        supplier: {
          name: "Danfoss",
          color: "red"
        },
        articleNo: "DAN-RAD-MULTI",
        confidence: "estimated",
        discounts: []
      },
      {
        id: "mat-014-3",
        name: "Pipes, fittings and insulation",
        quantity: 1,
        unit: "set",
        costPrice: 2000,
        listPrice: 2352.94,
        total: 2000,
        supplier: {
          name: "VVS Grossisten",
          color: "purple"
        },
        articleNo: "VVS-PIPE-KIT",
        confidence: "estimated",
        discounts: []
      }
    ],

    labor: [
      {
        id: "lab-014-1",
        task: "Complete heating system installation",
        akkordTime: 27.4,
        unit: "hour",
        hourlyRate: 620,
        totalCost: 17000,
        reference: {
          source: "Tekniq Denmark Q4 2024 lønkatalog",
          url: "https://tekniq.dk",
          breakdown: {
            baseWage: 180,
            pension: 45,
            holiday: 40,
            otherBenefits: 20.71
          }
        }
      }
    ]
  },

  {
    id: "unit-015",
    name: "Custom Toilet with Special Plumbing",
    description: "Custom toilet installation with special plumbing requirements",
    tier: "custom",
    category: "toiletinstallation",
    categoryIcon: "🚽",
    tags: ["toilet", "custom", "special", "plumbing"],

    pricing: {
      totalCost: 11200,
      materialsCost: 7400,
      laborCost: 3800,
      materialsPercent: 66.1,
      laborPercent: 33.9
    },

    freshness: "fresh",
    lastUpdated: "2025-12-07",

    usageStats: {
      timesUsed: 1
    },

    materials: [
      {
        id: "mat-015-1",
        name: "Custom wall-mounted toilet",
        quantity: 1,
        unit: "stk",
        costPrice: 4200,
        listPrice: 4941.18,
        total: 4200,
        supplier: {
          name: "Skovgaard",
          color: "blue"
        },
        articleNo: "SKO-CUSTOM-01",
        confidence: "verified",
        discounts: []
      },
      {
        id: "mat-015-2",
        name: "Special frame and fixings",
        quantity: 1,
        unit: "set",
        costPrice: 2400,
        listPrice: 2823.53,
        total: 2400,
        supplier: {
          name: "Leverandørservice",
          color: "green"
        },
        articleNo: "LEV-FRAME-SPEC",
        confidence: "estimated",
        discounts: []
      },
      {
        id: "mat-015-3",
        name: "Custom plumbing kit",
        quantity: 1,
        unit: "set",
        costPrice: 800,
        listPrice: 941.18,
        total: 800,
        supplier: {
          name: "VVS Grossisten",
          color: "purple"
        },
        articleNo: "VVS-CUSTOM-PLUMB",
        confidence: "estimated",
        discounts: []
      }
    ],

    labor: [
      {
        id: "lab-015-1",
        task: "Custom toilet installation with special plumbing",
        akkordTime: 6.1,
        unit: "hour",
        hourlyRate: 620,
        totalCost: 3800,
        reference: {
          source: "Tekniq Denmark Q4 2024 lønkatalog",
          url: "https://tekniq.dk",
          breakdown: {
            baseWage: 180,
            pension: 45,
            holiday: 40,
            otherBenefits: 20.71
          }
        }
      }
    ]
  }
];

export const getUnitById = (id) => {
  return mockUnits.find(unit => unit.id === id);
};

export const getUnitsByTier = (tier) => {
  return mockUnits.filter(unit => unit.tier === tier);
};

export const getUnitsByCategory = (category) => {
  return mockUnits.filter(unit => unit.category === category);
};
