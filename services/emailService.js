require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

/**
 * Hàm đọc template HTML và thay thế biến
 * @param {string} templateName - Tên file template (VD: resetPassword.html)
 * @param {object} variables - Các biến để thay thế trong template
 */
function loadTemplate(templateName, variables = {}) {
    const templatePath = path.join(__dirname, '..', 'templates', templateName);
    let template = fs.readFileSync(templatePath, 'utf-8');

    // Thay {{variable}} bằng giá trị thật
    for (let key in variables) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        template = template.replace(regex, variables[key]);
    }

    return template;
}

/**
 * Gửi email
 * @param {string} to - Email người nhận
 * @param {string} subject - Tiêu đề email
 * @param {string} templateName - Tên file template HTML
 * @param {object} variables - Biến để thay thế trong template
 * @param {string} [text] - Nội dung text fallback
 */
async function sendMail(to, subject, templateName, variables) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const html = loadTemplate(templateName, variables);

        let info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            html
        });

        console.log('✅ Email sent:', info.messageId);
    } catch (error) {
        console.error('❌ Lỗi khi gửi email:', error);
        throw error;
    }
}

module.exports = sendMail;
