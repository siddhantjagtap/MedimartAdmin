// import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';
// import invoiceData from './invoiceData.json';

// function Invoice() {

//   const componentRef = useRef();
//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });
// const [orderDetails, setOrderDetails] = useState(null);
// const APIURL = import.meta.env.VITE_MEDIMART_URL;

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const response = await fetch(`${APIURL}/getorderdetails/`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const data = await response.json();
//         setOrderDetails(data[0]); // Assuming the API returns an array with one object
//       } catch (error) {
//         console.error('Error fetching order details:', error);
//       }
//     };

//     fetchOrderDetails();
//   }, []);

//   const downloadPDF = async () => {
//     const input = document.getElementById('invoiceContent');
//     const canvas = await html2canvas(input, { scale: 2 });
//     const imgData = canvas.toDataURL('image/png', 1.0);
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save('invoice.pdf');
//   };

//   const {
//     fullName,
//     address,
//     city,
//     state,
//     pincode,
//     email,
//     contactNo,
//     amount,
//     orderDate,
//     paymentStatus,
//     cartItems,
//   } = orderDetails;

//   return (
//     <div className=" font-sans m-5 p-5 border border-black w-min h-full">
//       <div ref={componentRef} id="invoiceContent">
//         <header className="text-center">
//           <h1 className="w-[60rem] m-[1rem] text-4xl mb-[1rem] font-bold text-indigo-900 text-left">
//             {company.name}
//           </h1>
//           <p className="w-[45rem] m-[1rem] text-left text-xl font-bold bg-gray-100  h-[2rem]">
//             {company.description}
//           </p>
  
//           <div className="flex m-[1rem]">
//             <div className="w-[13rem] mr-[19rem]">
//               <p className="m-0">{company.address}</p>
//             </div>
  
//             <div className="w-[13rem] m-[1rem] mr-[3rem]">
//               <p className="m-0">
//                 Tel: {company.contact.tel} <br />
//                 Web: {company.contact.web}
//                 <br />
//                 Email: {company.contact.email}
//               </p>
//             </div>
//             <img
//               src="/src/assets/nexible.gif"
//               alt="invoice logo"
//               className="w-[13rem] h-[2rem]"
//             />
//           </div>
//         </header>
  
//         <section className="w-[57rem] border-t-2 border-black ">
//           <div className="flex m-[1rem]">
//             <p className="w-[30rem]  font-bold">GSTIN: {company.GSTIN}</p>
//             <h2 className="w-[20rem] font-bold text-2xl">TAX INVOICE</h2>
//             <h2 className="w-[20rem]">ORIGINAL FOR RECIPIENT</h2>
//           </div>
  
//           <div className="w-[60rem] pt-2 mt-2">
//             <div className="flex justify-between">
//               <div className="w-[20rem] p-4">
//               <h3 className="text-2xl font-bold">Order Details</h3>
//           <p>
//             <strong>Full Name:</strong> {fullName}
//           </p>
//           <p>
//             <strong>Address:</strong> {address}, {city}, {state} - {pincode}
//           </p>
//           <p>
//             <strong>Email:</strong> {email}
//           </p>
//           <p>
//             <strong>Contact No:</strong> {contactNo}
//           </p>
//           <p>
//             <strong>Order Date:</strong> {orderDate}
//           </p>
//           <p>
//             <strong>Payment Status:</strong> {paymentStatus}
//           </p>
//           <p>
//             <strong>Amount:</strong> ₹{amount}
//           </p>
//         </div>

//         <div className="w-[60rem]">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr>
//                 <th className="border border-black p-1">Product Name</th>
//                 <th className="border border-black p-1">Price</th>
//                 <th className="border border-black p-1">Quantity</th>
//                 <th className="border border-black p-1">Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => (
//                 <tr key={item._id}>
//                   <td className="border border-black p-1">{item.Name}</td>
//                   <td className="border border-black p-1">₹{item.Price}</td>
//                   <td className="border border-black p-1">{item.quantity}</td>
//                   <td className="border border-black p-1">₹{item.Price * item.quantity}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
// </section>
//     <section className="w-[60rem] m-[1rem] border-t border-black pt-2 mt-2 flex justify-between">
//           <div>
//             <h3 className="font-bold text-xl">Bank Details</h3>
//             <p>
//               <strong>Bank Name:</strong> {bankDetails.bankName}
//             </p>
//             <p>
//               <strong>Branch Name:</strong> {bankDetails.branchName}
//             </p>
//             <p>
//               <strong>Bank Account Number:</strong> {bankDetails.accountNumber}
//             </p>
//             <p>
//               <strong>Bank Branch IFSC:</strong> {bankDetails.branchIFSC}
//             </p>
//           </div>

//           <div className="flex items-center">
//             <div>
//               <p>
//                 <strong>Taxable Amount:</strong> {totalAmount.taxableAmount}
//               </p>
//               <p>
//                 <strong>Add: IGST:</strong> {totalAmount.IGST}
//               </p>
//               <p>
//                 <strong>Total Tax:</strong> {totalAmount.IGST}
//               </p>
//               <p>
//                 <strong>Total Amount After Tax:</strong> ₹{' '}
//                 {totalAmount.totalAmountAfterTax}
//               </p>
//               <p>
//                 <strong>GST Payable on Reverse Charge:</strong> N.A.
//               </p>
//             </div>
//           </div>
//         </section>

//         <section className="w-[60rem] h-[20rem] m-[1rem] border-t border-black pt-2 mt-2">
//           <p>
//             <strong>Terms and Conditions:</strong>
//           </p>
//           <ol>
//             {termsAndConditions.map((condition, index) => (
//               <li key={index}>{condition}</li>
//             ))}
//           </ol>
//         </section>
//         </div>
//         <button onClick={handlePrint} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Print Invoice</button>
//         <button onClick={downloadPDF} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Download Invoice</button>
//      </div>
// );
// }

// export default Invoice;



