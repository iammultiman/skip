export interface Skip {
  id: number
  size: number
  bag_capacity: number
  hire_period_days: number
  transport_cost: number | null
  per_tonne_cost: number | null
  price_before_vat: number
  vat: number
  postcode: string
  area: string
  forbidden: boolean
  created_at: string
  updated_at: string
  allowed_on_road: boolean
  allows_heavy_waste: boolean
  description: string
  ideal_for: string[]
  image_path?: string // Optional path to custom skip image
}

export const skipData: Skip[] = [
  {
    id: 17933,
    size: 4,
    bag_capacity: 45,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 278,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:52.813",
    allowed_on_road: true,
    allows_heavy_waste: true,
    description: "Perfect for small home projects",
    ideal_for: ["Bathroom renovation", "Small garden clearance", "Kitchen cupboard clear-out"],
  },
  {
    id: 17934,
    size: 6,
    bag_capacity: 65,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 305,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:52.992",
    allowed_on_road: true,
    allows_heavy_waste: true,
    description: "Ideal for medium home clearances",
    ideal_for: ["Bedroom renovation", "Garage clear-out", "Small extension work"],
  },
  {
    id: 17935,
    size: 8,
    bag_capacity: 80,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 375,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.171",
    allowed_on_road: true,
    allows_heavy_waste: true,
    description: "Great for larger renovations",
    ideal_for: ["Full room renovation", "Loft conversion", "Large garden project"],
  },
  {
    id: 17936,
    size: 10,
    bag_capacity: 100,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 400,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.339",
    allowed_on_road: false,
    allows_heavy_waste: false,
    description: "Perfect for house renovations",
    ideal_for: ["Multiple room renovation", "House clearance", "Large construction project"],
  },
  {
    id: 17937,
    size: 12,
    bag_capacity: 120,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 439,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.516",
    allowed_on_road: false,
    allows_heavy_waste: false,
    description: "Ideal for major home projects",
    ideal_for: ["Whole house renovation", "Commercial fit-out", "Large landscaping"],
  },
  {
    id: 17938,
    size: 14,
    bag_capacity: 145,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 470,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.69",
    allowed_on_road: false,
    allows_heavy_waste: false,
    description: "Perfect for large construction work",
    ideal_for: ["Major construction", "Commercial renovation", "Large demolition"],
  },
]

export function calculateTotalPrice(skip: Skip): number {
  return Math.round(skip.price_before_vat * (1 + skip.vat / 100))
}
