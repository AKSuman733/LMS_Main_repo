import React from 'react';

const ReceiptTemplate = React.forwardRef(({ payment, user }, ref) => {
  if (!payment) return null;

  const d = new Date(payment.date);
  const formattedDate = d.toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <div 
      ref={ref} 
      className="receipt-print-container"
      style={{
        padding: '40px',
        background: '#fff',
        color: '#1e293b',
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        width: '800px',
        boxSizing: 'border-box',
        margin: '0 auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #e2e8f0', paddingBottom: '20px', marginBottom: '30px' }}>
        <div>
          <img src="/logo.png" alt="UptoSkills Logo" style={{ height: '48px', objectFit: 'contain', marginBottom: '10px' }} />
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#0f172a' }}>Payment Receipt</h1>
        </div>
        <div style={{ textAlign: 'right', color: '#64748b', fontSize: '14px' }}>
          <p style={{ margin: '0 0 4px 0' }}><strong>UptoSkills Online Learning</strong></p>
          <p style={{ margin: '0 0 4px 0' }}>support@uptoskills.com</p>
          <p style={{ margin: 0 }}>www.uptoskills.com</p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div>
          <p style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Billed To</p>
          <p style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#0f172a' }}>{user?.name || payment.userName || 'Student'}</p>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>{user?.email || ''}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Receipt Details</p>
          <p style={{ fontSize: '14px', margin: '0 0 4px 0' }}><strong>Date:</strong> {formattedDate}</p>
          <p style={{ fontSize: '14px', margin: 0 }}><strong>Transaction ID:</strong> {payment.id}</p>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f1f5f9' }}>
            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', color: '#475569', borderBottom: '2px solid #cbd5e1' }}>Description</th>
            <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '14px', color: '#475569', borderBottom: '2px solid #cbd5e1' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', fontSize: '16px', color: '#0f172a' }}>
              <strong style={{ display: 'block', marginBottom: '4px' }}>Course Enrollment</strong>
              <span style={{ color: '#64748b', fontSize: '14px' }}>{payment.courseName}</span>
            </td>
            <td style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', fontSize: '16px', fontWeight: 'bold', textAlign: 'right', color: '#0f172a' }}>
              ₹{payment.amount.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
        <div style={{ width: '300px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b' }}>Subtotal</span>
            <span style={{ fontWeight: '500' }}>₹{payment.amount.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '2px solid #cbd5e1' }}>
            <span style={{ color: '#64748b' }}>Tax</span>
            <span style={{ fontWeight: '500' }}>₹0.00</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', fontSize: '20px', fontWeight: 'bold', color: '#0f172a' }}>
            <span>Total Paid</span>
            <span>₹{payment.amount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', color: '#64748b', fontSize: '14px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
        <p style={{ margin: '0 0 8px 0' }}>This is a computer-generated receipt and requires no signature.</p>
        <p style={{ margin: 0, fontWeight: 'bold', color: '#10b981' }}>{payment.status === 'done' ? 'PAID IN FULL' : 'PENDING'}</p>
      </div>
    </div>
  );
});

ReceiptTemplate.displayName = 'ReceiptTemplate';

export default ReceiptTemplate;
