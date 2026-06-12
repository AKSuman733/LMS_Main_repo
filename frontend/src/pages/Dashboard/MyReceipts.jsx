import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { IndianRupee, FileText, Calendar, CheckCircle, Download, Eye, X } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import ReceiptTemplate from '../../components/common/ReceiptTemplate';
import ReceiptPDF from '../../components/common/ReceiptPDF';
import { pdf } from '@react-pdf/renderer';

const MyReceipts = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // For receipt printing modal
  const [selectedPayment, setSelectedPayment] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const receiptRef = useRef();

  useEffect(() => {
    fetchMyPayments();
  }, []);

  const fetchMyPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/reports/my-payments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPayments(response.data);
    } catch (err) {
      console.error('Error fetching payments:', err);
      setError('Failed to fetch your payment history.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async (row) => {
    try {
      const doc = <ReceiptPDF payment={row} user={user} />;
      const asPdf = pdf([]); // Create instance
      asPdf.updateContainer(doc);
      const blob = await asPdf.toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Receipt_${row.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error generating PDF:', err);
    }
  };

  const columns = [
    {
      key: 'courseName',
      label: 'Course Name',
      sortable: true,
      filterable: true,
      render: (row, highlight) => (
        <div className="font-semibold text-white">{highlight(row.courseName)}</div>
      )
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      render: (row) => {
        const d = new Date(row.date);
        return (
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar size={14} />
            {d.toLocaleDateString()}
          </div>
        );
      }
    },
    {
      key: 'amount',
      label: 'Amount Paid',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-1 font-bold text-white">
          <IndianRupee size={14} />{row.amount}
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row) => (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold status-badge status-active">
          <CheckCircle size={14} />
          <span className="capitalize">{row.status}</span>
        </span>
      )
    }
  ];

  const rowActions = [
    {
      label: 'Preview',
      icon: <Eye size={16} />,
      onClick: (row) => setSelectedPayment(row)
    },
    {
      label: 'Download PDF',
      icon: <Download size={16} />,
      onClick: (row) => handleDownloadPDF(row)
    }
  ];

  return (
    <div className="receipts-page no-print">
      <div className="admin-header-row mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Receipts</h1>
          <p className="text-gray-500">View and download receipts for your enrolled courses.</p>
        </div>
      </div>

      <div className="admin-table-container card glass overflow-hidden" style={{ padding: 0 }}>
        <DataTable 
          data={payments}
          columns={columns}
          rowActions={rowActions}
          searchPlaceholder="Search by course name..."
          isLoading={loading}
          error={error}
          errorConfig={{
            title: "Unable to Load Receipts",
            message: error,
            onRetry: fetchMyPayments,
            supportLink: "#"
          }}
          emptyConfig={{
            icon: <FileText size={32} />,
            title: "No Receipts Found",
            message: "You haven't made any payments yet.",
            actionText: "Explore Courses",
            onAction: () => window.location.href = '/student/explore'
          }}
        />
      </div>

      {/* Receipt Modal (Preview) */}
      {selectedPayment && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)' }}>
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col print-modal-content">
            
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10 no-print rounded-t-2xl">
              <h2 className="text-xl font-bold text-gray-800">Preview Receipt</h2>
              <div className="flex gap-3">
                <button 
                  onClick={() => handleDownloadPDF(selectedPayment)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors"
                >
                  <Download size={18} /> Download PDF
                </button>
                <button 
                  onClick={() => setSelectedPayment(null)}
                  className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 bg-gray-50 flex-1 overflow-auto receipt-print-wrapper">
              <ReceiptTemplate payment={selectedPayment} user={user} ref={receiptRef} />
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default MyReceipts;
