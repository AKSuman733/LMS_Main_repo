const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('../config/db');

exports.getPaymentsReport = async (req, res) => {
  try {
    // Only allow admins
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const paymentIntents = await stripe.paymentIntents.list({
      limit: 100,
    });

    // Fetch all users and courses to map names for older payments
    const usersResult = await db.query('SELECT id, name FROM users');
    const coursesResult = await db.query('SELECT id, title FROM courses');
    
    const usersMap = {};
    usersResult.rows.forEach(u => usersMap[u.id] = u.name);
    
    const coursesMap = {};
    coursesResult.rows.forEach(c => coursesMap[c.id] = c.title);

    const report = paymentIntents.data.map(intent => {
      // Amount is in paise, convert back to rupees
      const amountInRupees = intent.amount / 100;
      
      const courseId = intent.metadata?.course_id || null;
      const userId = intent.metadata?.user_id || null;
      
      const mappedUserName = userId ? usersMap[userId] : null;
      const mappedCourseName = courseId ? coursesMap[courseId] : null;
      
      return {
        id: intent.id,
        amount: amountInRupees,
        status: intent.status === 'succeeded' ? 'done' : intent.status,
        date: new Date(intent.created * 1000).toISOString(),
        userName: intent.metadata?.user_name || mappedUserName || 'Unknown User',
        courseName: intent.metadata?.course_title || mappedCourseName || 'Unknown Course',
        courseId: courseId,
        userId: userId,
      };
    });

    res.status(200).json(report);
  } catch (error) {
    console.error('Error fetching stripe payments:', error);
    res.status(500).json({ error: 'Error fetching payment report' });
  }
};

exports.getMyPayments = async (req, res) => {
  try {
    // Search for intents where metadata['user_id'] equals the current user's ID
    const paymentIntents = await stripe.paymentIntents.search({
      query: `metadata['user_id']:'${req.user.id}'`,
      limit: 100,
    });

    // We only need courses map for missing course titles
    const coursesResult = await db.query('SELECT id, title FROM courses');
    const coursesMap = {};
    coursesResult.rows.forEach(c => coursesMap[c.id] = c.title);

    const report = paymentIntents.data.map(intent => {
      const amountInRupees = intent.amount / 100;
      const courseId = intent.metadata?.course_id || null;
      const mappedCourseName = courseId ? coursesMap[courseId] : null;
      
      return {
        id: intent.id,
        amount: amountInRupees,
        status: intent.status === 'succeeded' ? 'done' : intent.status,
        date: new Date(intent.created * 1000).toISOString(),
        courseName: intent.metadata?.course_title || mappedCourseName || 'Unknown Course',
        courseId: courseId,
        receiptUrl: intent.latest_charge || null, // Keeping this in case we fetch charges later, but we use our own UI
      };
    });

    res.status(200).json(report);
  } catch (error) {
    console.error('Error fetching my payments:', error);
    res.status(500).json({ error: 'Error fetching payment history' });
  }
};
