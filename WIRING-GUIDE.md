# Component Wiring Guide 🔌

## Quick Start: How to Wire Any Component

### 1. Import the Hook
```tsx
import { useOrderData } from '../../hooks/useOrderData';
```

### 2. Use the Hook
```tsx
const { loading, saving, handleInputChange, handleSave, getValue } = useOrderData();
```

### 3. Add Loading State
```tsx
if (loading) {
  return (
    <section className="flex-1 bg-gray-900 overflow-y-auto flex items-center justify-center">
      <div className="text-gray-400">
        <i className="fa fa-spinner fa-spin text-4xl"></i>
        <p className="mt-4">Loading...</p>
      </div>
    </section>
  );
}
```

### 4. Add Save Button
```tsx
<button 
  type="button"
  onClick={handleSave}
  disabled={saving}
  className="bg-green-600 border border-green-500 rounded px-3 py-2 text-white text-sm hover:bg-green-700 disabled:bg-gray-600 disabled:border-gray-500"
>
  <i className={`fa ${saving ? 'fa-spinner fa-spin' : 'fa-save'} mr-2`}></i>
  {saving ? 'Saving...' : 'Save'}
</button>
```

### 5. Wire Each Input Field
```tsx
<input
  type="text"
  className="..." 
  data-schema-key="cdf.section.field_name"
  value={getValue('cdf.section.field_name')}
  onChange={handleInputChange}
/>
```

## Schema Path Reference

### CDF Data (Closing Disclosure Fields)
All CDF fields start with `cdf.` prefix:

#### Section A - Origination Charges
- `cdf.origination_charges.line_01.description`
- `cdf.origination_charges.line_01.borrower_amount`
- `cdf.origination_charges.line_01.seller_amount`
- (repeat for line_02 through line_08)

#### Section B - Services Cannot Shop
- `cdf.services_cannot_shop.line_01.description`
- `cdf.services_cannot_shop.line_01.borrower_amount`
- (repeat for line_02 through line_13)

#### Section C - Services Can Shop  
- `cdf.services_can_shop.line_01.description`
- `cdf.services_can_shop.line_01.borrower_amount`
- (repeat for line_02 through line_14)

#### Section E - Taxes & Gov Fees
- `cdf.taxes_and_government_fees.line_01.description`
- `cdf.taxes_and_government_fees.line_01.borrower_amount`
- (repeat for line_02 through line_08)

#### Section F - Prepaids
- `cdf.prepaids.line_01.description`
- `cdf.prepaids.line_01.borrower_amount`
- (repeat for line_02 through line_16)

#### Section G - Initial Escrow
- `cdf.initial_escrow_payment.line_01.description`
- `cdf.initial_escrow_payment.line_01.borrower_amount`
- (repeat for line_02 through line_09)

#### Section H - Other
- `cdf.other.line_01.description`
- `cdf.other.line_01.borrower_amount`
- (repeat for line_02 through line_07)

### Contacts Data
All contacts fields start with `contactsData.` prefix:

#### Borrowers (Array of 4)
- `contactsData.borrowers[0].name.first`
- `contactsData.borrowers[0].name.middle`
- `contactsData.borrowers[0].name.last`
- `contactsData.borrowers[0].email`
- `contactsData.borrowers[0].phone`
- (repeat for [1], [2], [3])

#### Sellers (Array of 4)
- `contactsData.sellers[0].name.first`
- `contactsData.sellers[0].name.last`
- `contactsData.sellers[0].email`
- (repeat for [1], [2], [3])

#### Lenders
- `contactsData.lenders[0].name`
- `contactsData.lenders[0].email`
- `contactsData.lenders[0].phone`

### Properties Data
- `propertiesData.subject_property.address.street`
- `propertiesData.subject_property.address.city`
- `propertiesData.subject_property.address.state`
- `propertiesData.subject_property.address.zip`
- `propertiesData.subject_property.apn`
- `propertiesData.subject_property.county`

### Payoffs Data (Array of 4)
- `payoffsData[0].lender_name`
- `payoffsData[0].loan_number`
- `payoffsData[0].payoff_amount`
- (repeat for [1], [2], [3])

## Components Status

### ✅ Wired (5/44)
1. BasicInfo - Partially wired
2. LoanTerms - Partially wired  
3. OriginationCharges - FULLY WIRED ✅
4. Contacts - Partially wired
5. useOrderData hook created

### 🔧 Need Wiring (39/44)
Priority order for MVP:

**High Priority (Wire Next)**
1. DidNotShopFor (Section B)
2. DidShopFor (Section C)
3. TaxesAndGovFees (Section E)
4. Prepaids (Section F)
5. InitialEscrow (Section G)
6. Other (Section H)
7. Properties
8. Loan
9. Payoffs

**Medium Priority**
10. BorrowerCredits
11. BorrowerDebits
12. SellerCredits
13. SellerDebits
14. LenderCredits
15. ClosingDisclosure
16. Documents
17. Tasks

**Lower Priority**
18. ApTable
19. BorrowerProceeds
20. Cpl
21. Commitment
22. Communication
23. EnvelopesShipping
24. FinalPolicy
25. LoanCalculations
26. LoanDisclosures
27. Notes
28. PolicyInfoRates
29. Recording
30. SellerProceeds
31. Settlement
32. TitleInsurance
33. OtherContacts (remaining contact types)

## Quick Copy Templates

### Text Input
```tsx
<input
  type="text"
  className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:bg-gray-600"
  data-schema-key="PATH_HERE"
  value={getValue('PATH_HERE')}
  onChange={handleInputChange}
/>
```

### Number Input
```tsx
<input
  type="number"
  className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:bg-gray-600"
  data-schema-key="PATH_HERE"
  value={getValue('PATH_HERE')}
  onChange={handleInputChange}
/>
```

### Select
```tsx
<select
  className="w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:bg-gray-600"
  data-schema-key="PATH_HERE"
  value={getValue('PATH_HERE')}
  onChange={handleInputChange}
>
  <option value="">Select...</option>
  <option value="option1">Option 1</option>
</select>
```

### Checkbox
```tsx
<input
  type="checkbox"
  className="mr-2"
  data-schema-key="PATH_HERE"
  checked={getValue('PATH_HERE') === true}
  onChange={handleInputChange}
/>
```

## Testing Your Wired Component

1. Start the dev server: `npm run dev`
2. Navigate to an order: http://localhost:5173/orders/[order-id]/[component-name]
3. Enter data in fields
4. Click Save button
5. Refresh page - data should persist
6. Check browser console for errors

## Common Issues & Fixes

### "getValue is not a function"
- Make sure you imported and used the useOrderData hook

### Fields not saving
- Check data-schema-key matches the value in getValue()
- Ensure onChange={handleInputChange} is present
- Verify the schema path exists in the TypeScript schema

### Save button not working
- Make sure onClick={handleSave} is connected
- Check browser console for API errors

## Next Steps After Wiring

1. Test save/load functionality
2. Add field validation where needed
3. Implement calculations that depend on the fields
4. Add any special UI interactions

---

**Remember**: Use the template at `/frontend/src/components/orders/_ComponentTemplate.tsx` as a starting point!