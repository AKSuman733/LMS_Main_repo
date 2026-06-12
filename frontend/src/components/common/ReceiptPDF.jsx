import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    color: '#1e293b',
    backgroundColor: '#ffffff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#e2e8f0',
    borderBottomStyle: 'solid',
    paddingBottom: 20,
    marginBottom: 30
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8
  },
  title: {
    fontSize: 20,
    color: '#64748b',
  },
  companyDetails: {
    textAlign: 'right',
    fontSize: 10,
    color: '#64748b',
    lineHeight: 1.5
  },
  billingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40
  },
  billingColumn: {
    flexDirection: 'column'
  },
  billingLabel: {
    fontSize: 10,
    color: '#64748b',
    textTransform: 'uppercase',
    marginBottom: 4
  },
  billingName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4
  },
  billingText: {
    fontSize: 12,
    color: '#64748b'
  },
  table: {
    width: '100%',
    marginBottom: 40
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderBottomWidth: 2,
    borderBottomColor: '#cbd5e1',
    padding: 12
  },
  tableHeaderCell: {
    fontSize: 12,
    color: '#475569',
    flex: 1
  },
  tableHeaderCellRight: {
    fontSize: 12,
    color: '#475569',
    textAlign: 'right',
    width: 100
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    padding: 16
  },
  tableCellDesc: {
    flex: 1
  },
  tableCellItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4
  },
  tableCellItemSub: {
    fontSize: 12,
    color: '#64748b'
  },
  tableCellAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0f172a',
    textAlign: 'right',
    width: 100
  },
  totalsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 40
  },
  totalsBox: {
    width: 250
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  totalRowFinal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#cbd5e1',
  },
  totalLabel: {
    fontSize: 12,
    color: '#64748b'
  },
  totalValue: {
    fontSize: 12,
    color: '#0f172a'
  },
  totalLabelFinal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a'
  },
  totalValueFinal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a'
  },
  footer: {
    textAlign: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  footerText: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 6
  },
  footerStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#10b981'
  }
});

const ReceiptPDF = ({ payment, user }) => {
  if (!payment) return null;

  const d = new Date(payment.date);
  const formattedDate = d.toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        <View style={styles.header}>
          <View>
            <Text style={styles.logoText}>UptoSkills</Text>
            <Text style={styles.title}>Payment Receipt</Text>
          </View>
          <View style={styles.companyDetails}>
            <Text>UptoSkills Online Learning</Text>
            <Text>support@uptoskills.com</Text>
            <Text>www.uptoskills.com</Text>
          </View>
        </View>

        <View style={styles.billingSection}>
          <View style={styles.billingColumn}>
            <Text style={styles.billingLabel}>Billed To</Text>
            <Text style={styles.billingName}>{user?.name || payment.userName || 'Student'}</Text>
            <Text style={styles.billingText}>{user?.email || ''}</Text>
          </View>
          <View style={[styles.billingColumn, { alignItems: 'flex-end' }]}>
            <Text style={styles.billingLabel}>Receipt Details</Text>
            <Text style={styles.billingText}>Date: {formattedDate}</Text>
            <Text style={styles.billingText}>Transaction ID: {payment.id}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Description</Text>
            <Text style={styles.tableHeaderCellRight}>Amount</Text>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCellDesc}>
              <Text style={styles.tableCellItemTitle}>Course Enrollment</Text>
              <Text style={styles.tableCellItemSub}>{payment.courseName}</Text>
            </View>
            <Text style={styles.tableCellAmount}>INR {payment.amount.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.totalsContainer}>
          <View style={styles.totalsBox}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>INR {payment.amount.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tax</Text>
              <Text style={styles.totalValue}>INR 0.00</Text>
            </View>
            <View style={styles.totalRowFinal}>
              <Text style={styles.totalLabelFinal}>Total Paid</Text>
              <Text style={styles.totalValueFinal}>INR {payment.amount.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>This is a computer-generated receipt and requires no signature.</Text>
          <Text style={styles.footerStatus}>{payment.status === 'done' ? 'PAID IN FULL' : 'PENDING'}</Text>
        </View>

      </Page>
    </Document>
  );
};

export default ReceiptPDF;
