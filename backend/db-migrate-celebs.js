const db = require('./src/config/db');
(async () => {
  try {
    console.log('Starting DB migration...');
    await db.query('ALTER TABLE celebrities ADD COLUMN IF NOT EXISTS role VARCHAR(255);');
    await db.query('ALTER TABLE celebrities ADD COLUMN IF NOT EXISTS quote TEXT;');
    await db.query('ALTER TABLE celebrities ADD COLUMN IF NOT EXISTS topic VARCHAR(255);');
    await db.query('ALTER TABLE celebrities ADD COLUMN IF NOT EXISTS description TEXT;');
    await db.query('ALTER TABLE celebrities ADD COLUMN IF NOT EXISTS badge VARCHAR(100);');
    await db.query('ALTER TABLE celebrities ADD COLUMN IF NOT EXISTS color VARCHAR(100);');
    await db.query('ALTER TABLE celebrities ADD COLUMN IF NOT EXISTS stats JSONB;');
    console.log('Updated celebrities table.');

    // Seed data
    const celebs = [
      {
        name: 'Shahrukh Khan',
        image_url: '/srk_avatar.jpg',
        role: 'King Khan Style Lectures',
        quote: '"Learn technical structures with premium, high-energy charisma!"',
        topic: 'Java & Foundations',
        description: 'Unlock Java and core object-oriented structures with the legendary charisma of King Khan. This exclusive masterclass merges professional engineering principles with absolute style, making complex code memorable and engaging.',
        stats: JSON.stringify({ lessons: 10, rating: '4.9', students: '12K+' }),
        badge: 'Bestseller',
        color: 'linear-gradient(135deg, #f59e0b, #d97706)'
      },
      {
        name: 'Salman Khan',
        image_url: '/salman_avatar.jpg',
        role: 'Bhaijaan Style Masterclass',
        quote: '"Crush complex algorithms with absolute power and simple logic!"',
        topic: 'Data Structures (DSA)',
        description: 'Tackle the absolute toughest backend concepts. Salman Khan brings the power of action-style instruction, breaking down complex data structures and algorithmic complexity into muscle-memory logic that anyone can master.',
        stats: JSON.stringify({ lessons: 10, rating: '4.8', students: '9.4K+' }),
        badge: 'Trending',
        color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
      },
      {
        name: 'Amir Khan',
        image_url: '/amir_avatar.jpg',
        role: 'Mr. Perfectionist Learning',
        quote: '"No shortcuts. Master variables, classes, and logic with ultimate perfection."',
        topic: 'Python Programming',
        description: 'For those who strive for pure mastery. Amir Khan brings his signature detail-oriented, flawless execution style to Python, teaching syntax, logic models, and scripting with meticulous attention to absolute excellence.',
        stats: JSON.stringify({ lessons: 10, rating: '5.0', students: '8.1K+' }),
        badge: 'High Rated',
        color: 'linear-gradient(135deg, #10b981, #047857)'
      },
      {
        name: 'Amitabh Bachan',
        image_url: '/amitabh_avatar.jpg',
        role: 'Big B Legendary Guidance',
        quote: '"Build persistent foundations and rule the modern software universe!"',
        topic: 'C & Systems Engineering',
        description: 'Begin your legacy under the guidance of the ultimate icon. Amitabh Bachchan shares system engineering and core C-language logic with a majestic, commanding methodology, cementing your absolute fundamentals.',
        stats: JSON.stringify({ lessons: 10, rating: '4.9', students: '15K+' }),
        badge: 'Legendary',
        color: 'linear-gradient(135deg, #8b5cf6, #6d28d9)'
      }
    ];

    for (let c of celebs) {
      // Check if exists
      const exists = await db.query('SELECT id FROM celebrities WHERE name = $1', [c.name]);
      if (exists.rows.length === 0) {
        await db.query(`
          INSERT INTO celebrities (name, image_url, role, quote, topic, description, stats, badge, color)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `, [c.name, c.image_url, c.role, c.quote, c.topic, c.description, c.stats, c.badge, c.color]);
      }
    }
    console.log('Seeded celebrities.');

  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    process.exit();
  }
})();
