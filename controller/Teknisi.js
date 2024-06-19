import { query } from "../config/db.js"


// tampilkan semua data teknisi
export const getTeknisi = async (req, res) => {
    try {
        const qTeknisi = await query("SELECT * FROM teknisi");
        
        // Map through each teknisi to convert image to base64
        const teknisiWithBase64 = qTeknisi.map(teknisi => {
            if (teknisi.imgteknisi) {
                // Convert Buffer image to base64 string
                const base64String = teknisi.imgteknisi.toString('base64');
                // Return teknisi data with base64 image string
                return { ...teknisi, imgteknisi: base64String };
            } else {
                return teknisi;
            }
        });

        return res.status(200).json({ data: teknisiWithBase64 });
    } catch (error) {
        console.log("teknisi tidak tampil", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

// Find technician by ID
export const detTeknisi = async (req, res) => {
    const teknisiId = parseInt(req.params.id, 10);

    try {
        const findTeknisi = `
            SELECT * FROM teknisi WHERE Id_teknisi = ?
        `;
        const dataTeknisi = await query(findTeknisi, [teknisiId]);

        if (dataTeknisi && dataTeknisi.length > 0) {
            // Convert image buffer to base64 string if it exists
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
  