#!/usr/bin/env node

// Test script to add $899 recording fee to an order

const axios = require('axios');

const API_BASE = 'http://localhost:3002/api';
const ORDER_ID = 'b09b0775-9318-454a-ada9-77f0c2147e18';

async function testRecordingFee() {
  try {
    // First, login to get a token
    console.log('1. Logging in...');
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: 'test@test.com',
      password: 'test123'
    });
    
    const token = loginResponse.data.token;
    console.log('✓ Logged in successfully');
    
    // Set auth header for subsequent requests
    const authHeaders = {
      headers: { Authorization: `Bearer ${token}` }
    };
    
    // Get the current order
    console.log('\n2. Fetching current order...');
    const orderResponse = await axios.get(`${API_BASE}/orders/${ORDER_ID}`, authHeaders);
    const order = orderResponse.data;
    console.log('✓ Order fetched successfully');
    
    // Update the order with the recording fee
    console.log('\n3. Adding $899 recording fee...');
    if (!order.cdfData) order.cdfData = {};
    if (!order.cdfData.taxes_and_government_fees) {
      order.cdfData.taxes_and_government_fees = {};
    }
    
    order.cdfData.taxes_and_government_fees.line_01 = {
      description: 'Recording fees',
      payee_name: '',
      paid_by_borrower: '899',
      paid_before_closing: '',
      paid_by_seller: '',
      paid_before_closing_seller: '',
      paid_by_others: ''
    };
    
    // Save the updated order
    await axios.put(`${API_BASE}/orders/${ORDER_ID}`, order, authHeaders);
    console.log('✓ Recording fee added successfully!');
    
    // Verify the data was saved
    console.log('\n4. Verifying saved data...');
    const verifyResponse = await axios.get(`${API_BASE}/orders/${ORDER_ID}`, authHeaders);
    const savedFee = verifyResponse.data.cdfData?.taxes_and_government_fees?.line_01?.paid_by_borrower;
    
    if (savedFee === '899') {
      console.log('✅ SUCCESS: Recording fee of $899 is saved correctly!');
      console.log('\nNext steps:');
      console.log('1. Go to http://localhost:5173/orders/' + ORDER_ID + '/closing-disclosure');
      console.log('2. Look for Section E (Taxes and Government Fees)');
      console.log('3. You should see the $899 recording fee displayed there');
    } else {
      console.log('❌ ERROR: Recording fee not saved correctly. Got:', savedFee);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testRecordingFee();