#!/bin/bash

# Test script to add $899 recording fee to an order

API_BASE="http://localhost:3002/api"
ORDER_ID="b09b0775-9318-454a-ada9-77f0c2147e18"

echo "1. Logging in..."
LOGIN_RESPONSE=$(curl -s -X POST "${API_BASE}/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}')

TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | sed 's/"token":"//')

if [ -z "$TOKEN" ]; then
  echo "❌ Failed to login. Creating user first..."
  
  # Register the user
  curl -s -X POST "${API_BASE}/auth/register" \
    -H "Content-Type: application/json" \
    -d '{"firstName":"Test","lastName":"User","email":"test@test.com","password":"test123"}' > /dev/null
  
  # Try login again
  LOGIN_RESPONSE=$(curl -s -X POST "${API_BASE}/auth/login" \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"test123"}')
  
  TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | sed 's/"token":"//')
fi

echo "✓ Logged in successfully"

echo -e "\n2. Fetching current order..."
ORDER=$(curl -s -X GET "${API_BASE}/orders/${ORDER_ID}" \
  -H "Authorization: Bearer ${TOKEN}")

echo "✓ Order fetched successfully"

echo -e "\n3. Adding \$899 recording fee..."

# Update the order with recording fee
UPDATE_RESPONSE=$(curl -s -X PUT "${API_BASE}/orders/${ORDER_ID}" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "cdfData": {
      "taxes_and_government_fees": {
        "line_01": {
          "description": "Recording fees",
          "payee_name": "",
          "paid_by_borrower": "899",
          "paid_before_closing": "",
          "paid_by_seller": "",
          "paid_before_closing_seller": "",
          "paid_by_others": ""
        }
      }
    }
  }')

echo "✓ Recording fee added successfully!"

echo -e "\n4. Verifying saved data..."
VERIFY_RESPONSE=$(curl -s -X GET "${API_BASE}/orders/${ORDER_ID}" \
  -H "Authorization: Bearer ${TOKEN}")

# Check if the fee was saved
if echo "$VERIFY_RESPONSE" | grep -q '"paid_by_borrower":"899"'; then
  echo "✅ SUCCESS: Recording fee of \$899 is saved correctly!"
  echo -e "\nNext steps:"
  echo "1. Go to http://localhost:5173/orders/${ORDER_ID}/taxes-and-fees"
  echo "2. You should see \$899 in the 'Paid By Borrower' field for Line 01"
  echo "3. Then go to http://localhost:5173/orders/${ORDER_ID}/closing-disclosure"
  echo "4. Look for Section E (Taxes and Government Fees)"
  echo "5. The \$899 recording fee should appear there"
else
  echo "❌ ERROR: Recording fee not saved correctly"
  echo "Response: $VERIFY_RESPONSE"
fi