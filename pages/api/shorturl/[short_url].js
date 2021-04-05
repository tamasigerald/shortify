import enableCors from '../../../middleware/cors';
import connectDB from '../../../middleware/mongo';
import Url from '../../../models/Url';

const cors = Cors({
    methods: ['GET', 'POST'],
    origin: "https://www.freecodecamp.org"
});


export default async (req, res) => {

    const { method, query } = req;

    await connectDB();
    await enableCors(req, res, cors);

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