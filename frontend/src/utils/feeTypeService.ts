// UCD Fee Type Service - Handles fee type search and compliance
import feeData from '../data/ucdFeeTypes.json';

// TypeScript interface for fee types
export interface FeeType {
  key: string;
  label: string;
  section?: string;
  common?: boolean;
}

export interface UCDCompliantFee {
  display_description: string;
  fee_type: string;
  fee_type_other_description?: string;
  ucd_compliant: boolean;
}

// Search fee types by query
export const searchFeeTypes = (query: string): FeeType[] => {
  if (!query || query.trim() === '') {
    return [];
  }
  
  const lowercaseQuery = query.toLowerCase().trim();
  
  // Filter fee types that match the query
  const results = feeData.feeTypes.filter(fee => 
    fee.label.toLowerCase().includes(lowercaseQuery) ||
    fee.key.toLowerCase().includes(lowercaseQuery)
  );
  
  // Sort by relevance (exact matches first, then common fees)
  return results.sort((a, b) => {
    const aExact = a.label.toLowerCase() === lowercaseQuery;
    const bExact = b.label.toLowerCase() === lowercaseQuery;
    
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;
    
    if (a.common && !b.common) return -1;
    if (!a.common && b.common) return 1;
    
    return 0;
  }).slice(0, 10); // Limit to 10 results
};

// Get common fee types for quick access
export const getCommonFeeTypes = (): FeeType[] => {
  return feeData.feeTypes.filter(fee => fee.common === true);
};

// Create UCD-compliant fee structure
export const createUCDCompliantFee = (
  userInput: string,
  selectedFeeType?: FeeType
): UCDCompliantFee => {
  if (selectedFeeType && selectedFeeType.key !== 'Other') {
    // User selected a predefined fee type
    return {
      display_description: selectedFeeType.label,
      fee_type: selectedFeeType.key,
      ucd_compliant: true
    };
  } else {
    // Custom fee - falls back to "Other" type
    return {
      display_description: userInput,
      fee_type: 'Other',
      fee_type_other_description: userInput,
      ucd_compliant: true
    };
  }
};