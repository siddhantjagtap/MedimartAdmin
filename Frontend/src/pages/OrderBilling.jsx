import React, { useState } from 'react';
import SideMenu from '../Components/SideMenu';
import Navbar from '../Components/Navbar';
function OrderBilling() {
  const [invoiceData, setInvoiceData] = useState({
    orderId: '123456',
    customerName: 'John Doe',
    totalAmount: 100,
    items: [
      { description: 'Product 1', quantity: 2, price: 25 },
      { description: 'Product 2', quantity: 1, price: 50 },
      // Add more items as needed
    ]
  });
  const [showInvoice, setShowInvoice] = useState(false);

  const toggleInvoice = () => {
    setShowInvoice(!showInvoice);
  };

  

  const downloadInvoice = () => {
    const invoiceContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f0f0f0;
          }
          .invoice {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .invoice-header {
            text-align: center;
            margin-bottom: 20px;
          }
          .invoice-body {
            margin-bottom: 20px;
          }
          .invoice-table {
            width: 100%;
            border-collapse: collapse;
          }
          .invoice-table th,
          .invoice-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          .invoice-total {
            font-weight: bold;
            text-align: right;
          }
        </style>
      </head>
      <body>
        <div class="invoice">
          <div class="invoice-header">
            <h2>Invoice</h2>
          </div>
          <div class="invoice-body">
            <p><strong>Order ID:</strong> ${invoiceData.orderId}</p>
            <p><strong>Customer:</strong> ${invoiceData.customerName}</p>
            <table class="invoice-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${invoiceData.items.map(item => `
                  <tr>
                    <td>${item.description}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.price}</td>
                    <td>$${item.quantity * item.price}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div class="invoice-total">
            <p><strong>Total Amount:</strong> $${invoiceData.totalAmount}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Creating a Blob with the HTML content
    const blob = new Blob([invoiceContent], { type: 'text/html' });

    // Creating a virtual link and triggering download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'invoice.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex">
    <SideMenu />
    <div className="flex-grow">
    <Navbar />
    <div>
      <p>Order Billing</p>
      <button onClick={toggleInvoice}>
        {showInvoice ? 'Hide Invoice' : 'Show Invoice'}
      </button>
      {showInvoice && (
        <div>
          <div>
            <h2>Invoice</h2>
            <p><strong>Order ID:</strong> {invoiceData.orderId}</p>
            <p><strong>Customer:</strong> {invoiceData.customerName}</p>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                    <td>${item.quantity * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p><strong>Total Amount:</strong> ${invoiceData.totalAmount}</p>
          </div>
          <button onClick={downloadInvoice}>Download Invoice</button>
        </div>
      )}
    </div>
    </div>
    </div>
  );
}

export default OrderBilling;
