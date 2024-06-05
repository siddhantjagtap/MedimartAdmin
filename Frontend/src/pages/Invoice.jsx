import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import invoiceData from './invoiceData.json';

function Invoice() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const downloadPDF = async () => {
    const input = document.getElementById('invoiceContent');
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('invoice.pdf');
  };

  const {
    company,
    invoiceDetails,
    customer,
    products,
    totalAmount,
    bankDetails,
    termsAndConditions,
  } = invoiceData;


  return (
    <div className=" font-sans m-5 p-5 border border-black w-min h-full">
      <div ref={componentRef} id="invoiceContent">
        <header className="text-center">
          <h1 className="w-[60rem] m-[1rem] text-4xl mb-[1rem] font-bold text-indigo-900 text-left">
            {company.name}
          </h1>
          <p className="w-[45rem] m-[1rem] text-left text-xl font-bold bg-gray-100  h-[2rem]">
            {company.description}
          </p>
  
          <div className="flex m-[1rem]">
            <div className="w-[13rem] mr-[19rem]">
              <p className="m-0">{company.address}</p>
            </div>
  
            <div className="w-[13rem] m-[1rem] mr-[3rem]">
              <p className="m-0">
                Tel: {company.contact.tel} <br />
                Web: {company.contact.web}
                <br />
                Email: {company.contact.email}
              </p>
            </div>
            <img
              src="/src/assets/nexible.gif"
              alt="invoice logo"
              className="w-[13rem] h-[2rem]"
            />
          </div>
        </header>
  
        <section className="w-[57rem] border-t-2 border-black ">
          <div className="flex m-[1rem]">
            <p className="w-[30rem]  font-bold">GSTIN: {company.GSTIN}</p>
            <h2 className="w-[20rem] font-bold text-2xl">TAX INVOICE</h2>
            <h2 className="w-[20rem]">ORIGINAL FOR RECIPIENT</h2>
          </div>
  
          <div className="w-[60rem] pt-2 mt-2">
            <div className="flex justify-between">
              <div className="w-[20rem] p-4">
                <h3 className="text-2xl font-bold">Customer Detail</h3>
                <p>
                  <strong>M/S:</strong>
                  {customer.name}
                </p>
                <p>
                  <strong>Address:</strong>
                  {customer.address}
                </p>
                <p>
                  <strong>PHONE:</strong> {customer.phone}
                </p>
                <p>
                  <strong>GSTIN:</strong> {customer.GSTIN}
                </p>
                <p>
                  <strong>Place of Supply:</strong> {customer.placeOfSupply}{' '}
                </p>
              </div>
              <div className="ml-4 p-8 w-[23rem]">
                <p>
                  <strong>Invoice No:</strong> {invoiceDetails.invoiceNo}
                </p>
                <p>
                  <strong>Challan No:</strong> {invoiceDetails.challanNo}
                </p>
                <p>
                  <strong>P.O. No:</strong> {invoiceDetails.PONo}
                </p>
                <p>
                  <strong>DELIVERY DATE:</strong> {invoiceDetails.deliveryDate}
                </p>
                <p>
                  <strong>L.R. No:</strong> {invoiceDetails.LRNo}
                </p>
                <p>
                  <strong>E-Way No:</strong> {invoiceDetails.ewayNo}
                </p>
              </div>
              <div className="ml-4 p-8 w-[23rem]">
                <p>
                  <strong>Invoice Date:</strong> {invoiceDetails.invoiceDate}
                </p>
                <p>
                  <strong>Challan Date:</strong> {invoiceDetails.challanDate}
                </p>
                <p>
                  <strong>Reverse Charge:</strong>{' '}
                  {invoiceDetails.reverseCharge}
                </p>
                <p>
                  <strong>Due Date:</strong>
                  {invoiceDetails.dueDate}
                </p>
              </div>
            </div>
          </div>
        </section>
  
        <table className="w-[60rem] m-[1rem] border-collapse mt-2">
          <thead>
            <tr>
              <th className="border border-black p-1">Sr. No.</th>
              <th className="border border-black p-1">Name of Product / Service</th>
              <th className="border border-black p-1">HSN / SAC</th>
              <th className="border border-black p-1">Qty</th>
              <th className="border border-black p-1">Rate</th>
              <th className="border border-black p-1">Taxable Value</th>
              <th className="border border-black p-1">IGST %</th>
              <th className="border border-black p-1">IGST Amount</th>
              <th className="border border-black p-1">Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td className="border border-black p-1">{product.srNo}</td>
                <td className="border border-black p-1">{product.name}</td>
                <td className="border border-black p-1">{product.HSN}</td>
                <td className="border border-black p-1">{product.qty}</td>
                <td className="border border-black p-1">{product.rate}</td>
                <td className="border border-black p-1">
                  {product.taxableValue}
                </td>
                <td className="border border-black p-1">
                  {product.IGSTPercentage}
                </td>
                <td className="border border-black p-1">
                  {product.IGSTAmount}
                </td>
                <td className="border border-black p-1">{product.total}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="5" className="border border-black p-1 text-right font-bold">
                Total
              </td>
              <td className="border border-black p-1">
                {totalAmount.taxableAmount}
              </td>
              <td className="border border-black p-1"></td>
              <td className="border border-black p-1">{totalAmount.IGST}</td>
              <td className="border border-black p-1">
                {totalAmount.totalAmountAfterTax}
              </td>
            </tr>
          </tbody>
        </table>

    <section className="w-[60rem] m-[1rem] border-t border-black pt-2 mt-2 flex justify-between">
          <div>
            <h3 className="font-bold text-xl">Bank Details</h3>
            <p>
              <strong>Bank Name:</strong> {bankDetails.bankName}
            </p>
            <p>
              <strong>Branch Name:</strong> {bankDetails.branchName}
            </p>
            <p>
              <strong>Bank Account Number:</strong> {bankDetails.accountNumber}
            </p>
            <p>
              <strong>Bank Branch IFSC:</strong> {bankDetails.branchIFSC}
            </p>
          </div>

          <div className="flex items-center">
            <div>
              <p>
                <strong>Taxable Amount:</strong> {totalAmount.taxableAmount}
              </p>
              <p>
                <strong>Add: IGST:</strong> {totalAmount.IGST}
              </p>
              <p>
                <strong>Total Tax:</strong> {totalAmount.IGST}
              </p>
              <p>
                <strong>Total Amount After Tax:</strong> ₹{' '}
                {totalAmount.totalAmountAfterTax}
              </p>
              <p>
                <strong>GST Payable on Reverse Charge:</strong> N.A.
              </p>
            </div>
          </div>
        </section>

        <section className="w-[60rem] h-[20rem] m-[1rem] border-t border-black pt-2 mt-2">
          <p>
            <strong>Terms and Conditions:</strong>
          </p>
          <ol>
            {termsAndConditions.map((condition, index) => (
              <li key={index}>{condition}</li>
            ))}
          </ol>
        </section>
        </div>
        <button onClick={handlePrint} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Print Invoice</button>
        <button onClick={downloadPDF} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Download Invoice</button>
     </div>
);
}

export default Invoice;



