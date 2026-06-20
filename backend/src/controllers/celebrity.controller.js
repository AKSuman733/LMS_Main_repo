const db = require('../config/db');
const notificationUtil = require('../utils/notification.util');

exports.getAllCelebrities = async (req, res) => {
  const { status } = req.query; // active, archive, deleted

  let statusCondition = "1=1";
  if (status === 'deleted') {
    statusCondition += " AND is_deleted = TRUE";
  } else if (status === 'archive') {
    statusCondition += " AND is_archived = TRUE AND (is_deleted = FALSE OR is_deleted IS NULL)";
  } else {
    // default active
    statusCondition += " AND (is_archived = FALSE OR is_archived IS NULL) AND (is_deleted = FALSE OR is_deleted IS NULL)";
  }

  try {
    const query = `
      SELECT id, name, bio, image_url, role, quote, topic, description, badge, color, stats, created_at, is_archived, is_deleted
      FROM celebrities
      WHERE ${statusCondition}
      ORDER BY created_at DESC
    `;
    const result = await db.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching celebrities:', error);
    res.status(500).json({ error: 'Error fetching celebrities' });
  }
};

exports.createCelebrity = async (req, res) => {
  const { name, bio, image_url, role, quote, topic, description, badge, color, stats } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  try {
    const query = `
      INSERT INTO celebrities (name, bio, image_url, role, quote, topic, description, badge, color, stats)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;
    const result = await db.query(query, [name, bio, image_url, role, quote, topic, description, badge, color, stats ? JSON.stringify(stats) : null]);
    
    await notificationUtil.notifyAllAdmins('Celebrity Added', `A new celebrity/expert "${name}" has been added.`, 'info');
    
    res.status(201).json({ message: 'Celebrity created successfully', celebrity: result.rows[0] });
  } catch (error) {
    console.error('Error creating celebrity:', error);
    res.status(500).json({ error: 'Error creating celebrity' });
  }
};

exports.updateCelebrity = async (req, res) => {
  const { id } = req.params;
  const { name, bio, image_url, role, quote, topic, description, badge, color, stats } = req.body;
  
  try {
    const query = `
      UPDATE celebrities 
      SET name = COALESCE($1, name), 
          bio = COALESCE($2, bio), 
          image_url = COALESCE($3, image_url),
          role = COALESCE($4, role),
          quote = COALESCE($5, quote),
          topic = COALESCE($6, topic),
          description = COALESCE($7, description),
          badge = COALESCE($8, badge),
          color = COALESCE($9, color),
          stats = COALESCE($10, stats)
      WHERE id = $11
      RETURNING *
    `;
    const result = await db.query(query, [name, bio, image_url, role, quote, topic, description, badge, color, stats ? JSON.stringify(stats) : null, id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Celebrity not found' });
    res.status(200).json({ message: 'Celebrity updated successfully', celebrity: result.rows[0] });
  } catch (error) {
    console.error('Error updating celebrity:', error);
    res.status(500).json({ error: 'Error updating celebrity' });
  }
};

exports.archiveCelebrity = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('UPDATE celebrities SET is_archived = TRUE WHERE id = $1', [id]);
    res.status(200).json({ message: 'Celebrity archived successfully' });
  } catch (error) {
    console.error('Error archiving celebrity:', error);
    res.status(500).json({ error: 'Error archiving celebrity' });
  }
};

exports.bulkArchiveCelebrities = async (req, res) => {
  const { ids } = req.body;
  try {
    await db.query('UPDATE celebrities SET is_archived = TRUE WHERE id = ANY($1::int[])', [ids]);
    res.status(200).json({ message: 'Celebrities archived successfully' });
  } catch (error) {
    console.error('Error archiving celebrities:', error);
    res.status(500).json({ error: 'Error archiving celebrities' });
  }
};

exports.restoreCelebrity = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('UPDATE celebrities SET is_archived = FALSE, is_deleted = FALSE WHERE id = $1', [id]);
    res.status(200).json({ message: 'Celebrity restored successfully' });
  } catch (error) {
    console.error('Error restoring celebrity:', error);
    res.status(500).json({ error: 'Error restoring celebrity' });
  }
};

exports.bulkRestoreCelebrities = async (req, res) => {
  const { ids } = req.body;
  try {
    await db.query('UPDATE celebrities SET is_archived = FALSE, is_deleted = FALSE WHERE id = ANY($1::int[])', [ids]);
    res.status(200).json({ message: 'Celebrities restored successfully' });
  } catch (error) {
    console.error('Error restoring celebrities:', error);
    res.status(500).json({ error: 'Error restoring celebrities' });
  }
};

exports.deleteCelebrity = async (req, res) => {
  const { id } = req.params;
  const hardDelete = req.query.hard === 'true';
  try {
    if (hardDelete) {
      await db.query('DELETE FROM celebrities WHERE id = $1', [id]);
    } else {
      await db.query('UPDATE celebrities SET is_deleted = TRUE WHERE id = $1', [id]);
    }
    res.status(200).json({ message: 'Celebrity deleted successfully' });
  } catch (error) {
    console.error('Error deleting celebrity:', error);
    res.status(500).json({ error: 'Error deleting celebrity' });
  }
};

exports.bulkDeleteCelebrities = async (req, res) => {
  const { ids } = req.body;
  const hardDelete = req.query.hard === 'true';
  try {
    if (hardDelete) {
      await db.query('DELETE FROM celebrities WHERE id = ANY($1::int[])', [ids]);
    } else {
      await db.query('UPDATE celebrities SET is_deleted = TRUE WHERE id = ANY($1::int[])', [ids]);
    }
    res.status(200).json({ message: 'Celebrities deleted successfully' });
  } catch (error) {
    console.error('Error deleting celebrities:', error);
    res.status(500).json({ error: 'Error deleting celebrities' });
  }
};
