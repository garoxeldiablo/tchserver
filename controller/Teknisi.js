// import { query } from "../config/db.js"


// export const getTeknisi = async (req, res) => {
//     try {
//         const qTeknisi = await query("SELECT * FROM teknisi");
        
//         const teknisiWithBase64 = qTeknisi.map(teknisi => {
//             if (teknisi.imgteknisi) {
//                 const base64String = teknisi.imgteknisi.toString('base64');
//                 return { ...teknisi, imgteknisi: base64String };
//             } else {
//                 return teknisi;
//             }
//         });

//         return res.status(200).json({ data: teknisiWithBase64 });
//     } catch (error) {
//         console.log("teknisi tidak tampil", error);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// }

// export const detTeknisi = async (req, res) => {
//     const teknisiId = parseInt(req.params.id, 10);

//     try {
//         const findTeknisi = `
//             SELECT * FROM teknisi WHERE Id_teknisi = ?
//         `;
//         const dataTeknisi = await query(findTeknisi, [teknisiId]);

//         if (dataTeknisi && dataTeknisi.length > 0) {
//             const teknisiWithBase64 = dataTeknisi.map(teknisi => {
//                 if (teknisi.imgteknisi) {
//                     teknisi.imgteknisi = teknisi.imgteknisi.toString('base64');
//                 }
//                 return teknisi;
//             });
//             res.status(200).json(teknisiWithBase64[0]);
//         } else {
//             res.status(404).send('Teknisi tidak ditemukan');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).send('Terjadi kesalahan server');
//     }
// };

// commjs
const { query } = require("../config/db.js");

const getTeknisi = async (req, res) => {
    try {
        const qTeknisi = await query("SELECT * FROM teknisi");

        if (!qTeknisi) {
            return res.status(404).json({ error: "No teknisi found" });
        }

        const teknisiWithBase64 = qTeknisi.map(teknisi => {
            if (teknisi.imgteknisi) {
                const base64String = teknisi.imgteknisi.toString('base64');
                return { ...teknisi, imgteknisi: base64String };
            } else {
                return teknisi;
            }
        });

        return res.status(200).json({ data: teknisiWithBase64 });
    } catch (error) {
        console.error("Error fetching teknisi:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const detTeknisi = async (req, res) => {
    const teknisiId = parseInt(req.params.id, 10);

    try {
        const findTeknisi = `
            SELECT * FROM teknisi WHERE Id_teknisi = ?
        `;
        const dataTeknisi = await query(findTeknisi, [teknisiId]);

        if (dataTeknisi && dataTeknisi.length > 0) {
            const teknisiWithBase64 = dataTeknisi.map(teknisi => {
                if (teknisi.imgteknisi) {
                    teknisi.imgteknisi = teknisi.imgteknisi.toString('base64');
                }
                return teknisi;
            });
            res.status(200).json(teknisiWithBase64[0]);
        } else {
            res.status(404).send('Teknisi tidak ditemukan');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Terjadi kesalahan server');
    }
};

module.exports = {
    getTeknisi,
    detTeknisi
};

  