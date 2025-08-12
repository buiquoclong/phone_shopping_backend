const db = require('../db/db');
const bcrypt = require('bcrypt');
const {generatePassword, generateVerifyToken} = require('../utils/generateUtils');
const sendMail = require('../services/emailService');

// GET all accounts
exports.getAllAccount = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM accounts');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET account by id
exports.getAccountById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM accounts WHERE account_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Account not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create account
exports.createAccount = async (req, res) => {
  const { full_name, email, password, phone, role_id } = req.body;

  if (!full_name || !email || !password || !role_id) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  
  try {
    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO accounts (full_name, email, password, phone, role_id)
       VALUES (?, ?, ?, ?, ?)`,
      [full_name, email, hashedPassword, phone || null, role_id]
    );

    res.status(201).json({
      account_id: result.insertId,
      full_name,
      email,
      phone,
      role_id
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Email already exists.' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};

// PUT update account
exports.updateAccount = async (req, res) => {
  const { full_name, email, phone, role_id } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE accounts 
       SET full_name = ?, email = ?, phone = ?, role_id = ? 
       WHERE account_id = ?`,
      [full_name, email, phone || null, role_id, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.json({ message: 'Account updated successfully' });

  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Email already exists.' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
};


// DELETE account
exports.deleteAccount = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM accounts WHERE account_id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Account not found' });
    res.json({ message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// PUT change password
exports.changePassword = async (req, res) => {
  const accountId = req.params.id;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: 'Missing old or new password.' });
  }

  try {
    // 1. Lấy thông tin tài khoản từ DB
    const [rows] = await db.query('SELECT password FROM accounts WHERE account_id = ?', [accountId]);
    const account = rows[0];

    if (!account) {
      return res.status(404).json({ error: 'Account not found.' });
    }

    // 2. So sánh mật khẩu cũ
    const isMatch = await bcrypt.compare(oldPassword, account.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Old password is incorrect.' });
    }

    // 3. Mã hóa mật khẩu mới và cập nhật
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE accounts SET password = ? WHERE account_id = ?', [hashedNewPassword, accountId]);

    res.json({ message: 'Password updated successfully.' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// PUT reset Password
exports.resetPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM accounts WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Email không tồn tại' });
        }

        const newPassword = generatePassword(8);
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await db.query('UPDATE accounts SET password = ? WHERE email = ?', [hashedPassword, email]);

        await sendMail(
            email,
            'Your Password Has Been Reset',
            'forget.html',
            { password: newPassword } // biến thay thế trong template
        );

        res.json({ message: 'Mật khẩu mới đã được gửi đến email của bạn' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Có lỗi xảy ra', error: error.message });
    }
};
