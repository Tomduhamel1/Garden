/**
 * Line Compaction Utility
 * 
 * Handles compacting line-based data structures in the Closing Disclosure
 * by removing empty lines and re-indexing remaining lines sequentially.
 * 
 * Used for sections like:
 * - origination_charges.line_01, line_02, etc.
 * - taxes_and_government_fees.line_01, line_02, etc.
 * - services_borrower_did_shop_for.line_01, line_02, etc.
 * - Other line-based charge sections
 */

interface LineItem {
  description?: string;
  payee_name?: string;
  borrower_amount?: number | string;
  seller_amount?: number | string;
  paid_by_others?: number | string;
  paid_by_borrower?: number | string;
  paid_by_seller?: number | string;
  paid_before_closing?: number | string;
  before_borrower_amount?: number | string;
  before_seller_amount?: number | string;
  paid_by_others_amount?: number | string;
  is_optional?: boolean;
  not_required?: boolean;
  [key: string]: any; // Allow for other fields
}

/**
 * Checks if a line item is considered empty
 */
export const isEmptyLineItem = (item: LineItem): boolean => {
  if (!item) return true;
  
  // A line is considered empty if description and payee_name are both empty/undefined
  // and all amount fields are 0 or empty
  const hasDescription = item.description && item.description.trim() !== '';
  const hasPayeeName = item.payee_name && item.payee_name.trim() !== '';
  
  // Check if any amount fields have non-zero values
  const amountFields = [
    'borrower_amount', 'seller_amount', 'paid_by_others', 
    'paid_by_borrower', 'paid_by_seller', 'paid_before_closing',
    'before_borrower_amount', 'before_seller_amount', 'paid_by_others_amount'
  ];
  
  const hasAmounts = amountFields.some(field => {
    const value = item[field];
    return value && (typeof value === 'number' ? value !== 0 : parseFloat(value) !== 0);
  });
  
  return !hasDescription && !hasPayeeName && !hasAmounts;
};

/**
 * Compacts a section of line items by removing empty lines and re-indexing
 */
export const compactLineItems = (section: Record<string, LineItem>, maxLines: number = 17): Record<string, LineItem> => {
  const result: Record<string, LineItem> = {};
  
  // Extract line items and their indices
  const lineItems: { index: number; key: string; item: LineItem }[] = [];
  
  Object.entries(section).forEach(([key, item]) => {
    const match = key.match(/line_(\d+)/);
    if (match) {
      const index = parseInt(match[1], 10);
      lineItems.push({ index, key, item });
    } else {
      // Preserve non-line fields as-is
      result[key] = item;
    }
  });
  
  // Sort by original index
  lineItems.sort((a, b) => a.index - b.index);
  
  // Filter out empty line items
  const nonEmptyItems = lineItems.filter(({ item }) => !isEmptyLineItem(item));
  
  // Re-index remaining items starting from line_01
  nonEmptyItems.forEach(({ item }, newIndex) => {
    const newKey = `line_${String(newIndex + 1).padStart(2, '0')}`;
    result[newKey] = item;
  });
  
  // Fill remaining slots with empty line items up to maxLines
  for (let i = nonEmptyItems.length; i < maxLines; i++) {
    const lineKey = `line_${String(i + 1).padStart(2, '0')}`;
    result[lineKey] = {
      description: '',
      payee_name: '',
      borrower_amount: 0,
      seller_amount: 0,
      paid_by_others: 0,
      paid_by_borrower: 0,
      paid_by_seller: 0,
      paid_before_closing: 0,
      before_borrower_amount: 0,
      before_seller_amount: 0,
      paid_by_others_amount: 0,
      is_optional: false,
      not_required: false
    };
  }
  
  return result;
};

/**
 * Compacts multiple sections in CDF data
 */
export const compactCDFSections = (cdfData: any): any => {
  const compactedData = { ...cdfData };
  
  // Define sections that use line-based structure and their max lines
  const lineSections = {
    origination_charges: 8,
    services_borrower_did_shop_for: 8,
    services_borrower_did_not_shop_for: 8,
    taxes_and_government_fees: 4,
    other_charges: 8,
    prepaid_item_information: 5,
    escrow_information: 8,
    borrower_credit_information: 17,
    borrower_debit_information: 15,
    seller_credit_information: 5,
    seller_debit_information: 9
  };
  
  // Compact each section that exists in the data
  Object.entries(lineSections).forEach(([sectionName, maxLines]) => {
    if (compactedData[sectionName]) {
      console.log(`Compacting ${sectionName} (max ${maxLines} lines)`);
      compactedData[sectionName] = compactLineItems(compactedData[sectionName], maxLines);
    }
  });
  
  return compactedData;
};

/**
 * Counts non-empty lines in a section
 */
export const countNonEmptyLines = (section: Record<string, LineItem>): number => {
  let count = 0;
  
  Object.entries(section).forEach(([key, item]) => {
    if (key.match(/line_\d+/) && !isEmptyLineItem(item)) {
      count++;
    }
  });
  
  return count;
};

/**
 * Gets the next available line key in a section
 */
export const getNextAvailableLineKey = (section: Record<string, LineItem>, maxLines: number = 17): string | null => {
  for (let i = 1; i <= maxLines; i++) {
    const lineKey = `line_${String(i).padStart(2, '0')}`;
    if (!section[lineKey] || isEmptyLineItem(section[lineKey])) {
      return lineKey;
    }
  }
  return null; // All lines are full
};

/**
 * Removes a specific line and compacts the section
 */
export const removeLineAndCompact = (
  section: Record<string, LineItem>, 
  lineKeyToRemove: string,
  maxLines: number = 17
): Record<string, LineItem> => {
  const updatedSection = { ...section };
  
  // Remove the specified line
  if (updatedSection[lineKeyToRemove]) {
    delete updatedSection[lineKeyToRemove];
  }
  
  // Compact the remaining lines
  return compactLineItems(updatedSection, maxLines);
};

/**
 * Validation function to ensure line compaction was successful
 */
export const validateCompactedLines = (section: Record<string, LineItem>): boolean => {
  const lineKeys = Object.keys(section).filter(key => key.match(/line_\d+/));
  const sortedKeys = lineKeys.sort();
  
  let foundEmpty = false;
  
  for (const key of sortedKeys) {
    const isEmpty = isEmptyLineItem(section[key]);
    
    if (foundEmpty && !isEmpty) {
      // Found a non-empty line after an empty line - compaction failed
      console.error(`Compaction validation failed: non-empty line ${key} found after empty lines`);
      return false;
    }
    
    if (isEmpty) {
      foundEmpty = true;
    }
  }
  
  return true;
};