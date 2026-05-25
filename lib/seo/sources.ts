import type { Source } from '@/components/seo/types';

export const SOURCE_REGISTRY: Record<string, Source> = {
  'energy-star-room-ac': {
    id: 'energy-star-room-ac',
    title: 'Room Air Conditioner Sizing Guide',
    publisher: 'ENERGY STAR (US EPA / DOE)',
    year: '2023',
    url: 'https://www.energystar.gov/products/room_air_conditioners',
  },
  'doe-central-ac': {
    id: 'doe-central-ac',
    title: 'Central Air Conditioning',
    publisher: 'US Department of Energy — Energy Saver',
    year: '2023',
    url: 'https://www.energy.gov/energysaver/central-air-conditioning',
  },
  'doe-sizing': {
    id: 'doe-sizing',
    title: 'Sizing a New Air Conditioner',
    publisher: 'US Department of Energy — Energy Saver',
    year: '2023',
  },
  'acca-manual-j-8': {
    id: 'acca-manual-j-8',
    title: 'Manual J 8th Edition: Residential Load Calculation',
    publisher: 'Air Conditioning Contractors of America (ACCA)',
    year: '2016',
  },
  'acca-manual-s': {
    id: 'acca-manual-s',
    title: 'Manual S: Residential Equipment Selection',
    publisher: 'Air Conditioning Contractors of America (ACCA)',
    year: '2014',
  },
  'acca-manual-d': {
    id: 'acca-manual-d',
    title: 'Manual D: Residential Duct Systems',
    publisher: 'Air Conditioning Contractors of America (ACCA)',
    year: '2016',
  },
  'ashrae-169': {
    id: 'ashrae-169',
    title: 'ASHRAE Standard 169-2020: Climatic Data for Building Design Standards',
    publisher: 'American Society of Heating, Refrigerating and Air-Conditioning Engineers',
    year: '2020',
  },
  'ashrae-fundamentals': {
    id: 'ashrae-fundamentals',
    title: 'ASHRAE Handbook — Fundamentals',
    publisher: 'American Society of Heating, Refrigerating and Air-Conditioning Engineers',
    year: '2021',
  },
  'iecc-2021': {
    id: 'iecc-2021',
    title: 'International Energy Conservation Code 2021',
    publisher: 'International Code Council',
    year: '2021',
  },
  'us-census-acs-housing': {
    id: 'us-census-acs-housing',
    title: 'American Community Survey: Selected Housing Characteristics',
    publisher: 'US Census Bureau',
    year: '2022',
  },
  'ahri-210-240': {
    id: 'ahri-210-240',
    title: 'AHRI Standard 210/240-2023: Performance Rating of Unitary Air-Conditioning and Air-Source Heat Pump Equipment',
    publisher: 'Air-Conditioning, Heating, and Refrigeration Institute',
    year: '2023',
  },
  'doe-seer2-rule': {
    id: 'doe-seer2-rule',
    title: 'Energy Conservation Standards for Central Air Conditioners (SEER2/HSPF2)',
    publisher: 'US Department of Energy — Office of Energy Efficiency',
    year: '2023',
  },
  'neep-ccashp': {
    id: 'neep-ccashp',
    title: 'Cold Climate Air-Source Heat Pump (CCASHP) Specification and Product List',
    publisher: 'Northeast Energy Efficiency Partnerships (NEEP)',
    year: '2024',
    url: 'https://ashp.neep.org/',
  },
  'energy-star-attic-rvalue': {
    id: 'energy-star-attic-rvalue',
    title: 'Recommended Home Insulation R-Values',
    publisher: 'ENERGY STAR (US EPA / DOE)',
    year: '2023',
  },
  'doe-insulation': {
    id: 'doe-insulation',
    title: 'Insulation Materials',
    publisher: 'US Department of Energy — Energy Saver',
    year: '2023',
    url: 'https://www.energy.gov/energysaver/insulation-materials',
  },
};

export function getSources(ids: readonly string[]): Source[] {
  return ids
    .map((id) => SOURCE_REGISTRY[id])
    .filter((s): s is Source => Boolean(s));
}
