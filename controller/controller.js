import { query } from "../database/db.js";

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Query untuk menemukan user berdasarkan email dan password
        const rows = await query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password]);

        // Jika username dan password cocok, kirim respon sukses
        if (rows.length > 0) {
            res.json({ success: true, message: 'Login successful!' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
