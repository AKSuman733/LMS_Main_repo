import { useState, useEffect } from 'react';
import axios from 'axios';
import { IndianRupee, CreditCard, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import DataTable from '../../components/common/DataTable';

const Reports = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/reports/payments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPayments(response.data);
    } catch (err) {
      console.error('Error fetching payments:', err);
      setError('Failed to fetch payment reports.');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: 'userName',
      label: 'User Name',
      sortable: true,
      filterable: true,
      render: (row, highlight) => (
        <div className="font-semibold text-white">{highlight(row.userName)}</div>
      )
    },
    {
      key: 'courseName',
      label: 'Course Name',
      sortable: true,
      filterable: true,
      render: (row, highlight) => (
        <div className="text-gray-300">{highlight(row.courseName)}</div>
      )
    },
    {
      key: 'amount',
      label: 'Amount (₹)',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-1 font-bold text-white">
          <IndianRupee size={14} />{row.amount}
        </div>
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
            {d.toLocaleDateString()} {d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        );
      }
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      filterable: true,
      render: (row) => {
        let badgeClass = 'status-badge ';
        let icon = null;
        
        if (row.status === 'done' || row.status === 'succeeded') {
          badgeClass += 'status-active'; // Assuming status-active maps to green
          icon = <CheckCircle size={14} />;
        } else if (row.status === 'requires_payment_method' || row.status === 'incomplete') {
          badgeClass += 'status-pending'; // Mapping to yellow/orange
          icon = <Clock size={14} />;
        } else {
          badgeClass += 'status-inactive'; // Mapping to red
          icon = <XCircle size={14} />;
        }

        return (
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${badgeClass}`}>
            {icon}
            <span className="capitalize">{row.status === 'requires_payment_method' ? 'Failed / Pending' : row.status}</span>
          </span>
        );
      }
    }
  ];

  return (
    <div className="reports-page">
      <div className="admin-header-row mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Payment Reports</h1>
          <p className="text-gray-500">View recent transactions and payment statuses from Stripe</p>
        </div>
      </div>

      <div className="admin-table-container card glass overflow-hidden" style={{ padding: 0 }}>
        <DataTable 
          data={payments}
          columns={columns}
          searchPlaceholder="Search by user or course name..."
          isLoading={loading}
          error={error}
          errorConfig={{
            title: "Unable to Load Reports",
            message: error,
            onRetry: fetchPayments,
            supportLink: "#"
          }}
          emptyConfig={{
            icon: <CreditCard size={32} />,
            title: "No Payments Found",
            message: "There are no payment records available yet.",
            actionText: "Refresh",
            onAction: fetchPayments
          }}
        />
      </div>
    </div>
  );
};

export default Reports;
