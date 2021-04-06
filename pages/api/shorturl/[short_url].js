import connectDB from '../../../middleware/mongo';
import Url from '../../../models/Url';
import Cors from 'cors';


const cors = Cors({
    methods: ['GET', 'POST'],
    origin: '*'
});

function enableCors(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req,res, (result) => {
        if (result instanceof Error) {
            return reject(result);
        }
        return resolve(result);
        })
    })
}


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