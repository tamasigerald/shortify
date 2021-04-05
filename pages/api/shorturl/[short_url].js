import connectDB from '../../../middleware/mongo';
import Url from '../../../models/Url';

export default async (req, res) => {

    const { method, query } = req;

    await connectDB();

    const urlID = query.short_url;

    switch (method) {
        case 'GET':
            try {
                await Url.findOne({short: urlID}, (err, found) => {
                    const url = `${found.original}`;
                    res.redirect(301, url);
                })
            } catch (error) {
                res.status(400).json({ error: 'invalid url'})
            }
            break;
        default:
            res.status(400).json({ error: 'invalid url'})
            break;
    }

    
}