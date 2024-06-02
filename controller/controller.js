import { query } from "../database/db.js";

// authentication
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Query untuk menemukan user berdasarkan email dan password
        const userAuth = await query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password]);

        // Jika username dan password cocok, kirim respon sukses
        if (userAuth) {
            res.json({ success: true, message: 'Login successful!', userAuth });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// user
// export const user = async (req.res) => {
//     const users = req.body;

//     try {
//         // tampilkan
//     }
// }
