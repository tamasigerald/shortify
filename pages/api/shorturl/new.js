import dns from 'dns';
import { nanoid } from 'nanoid';
import urlExists from 'url-exists-deep';
import enableCors from '../../../middleware/cors';

import connectDB from '../../../middleware/mongo';
import Url from '../../../models/Url';

const cors = Cors({
    methods: ['GET', 'POST']
});

export default async (req, res) => {
    
    const { method, body } = req;

    await connectDB();
    await enableCors(req, res, cors);

    switch(method) {
        case 'POST':
            try {
                let url = body.url;

                const checkUrl = await urlExists(url);
                if (checkUrl === false) {
                    throw error
                }
                await Url.findOne({original: url}, async (err, found) => {
                    if (found) {
                        res.status(201).json({ original_url: found.original, short_url: found.short });
                    }
                    else {
                        const urlID = nanoid(8); 
                        const newUrl = await Url.create({
                            original: url,
                            short: urlID
                        });
                        res.status(201).json({ original_url: newUrl.original, short_url: newUrl.short });
                    }
                });
            } catch (error) {
                res.status(400).json({
                    error: 'invalid url'
                });
            }
            break;
        default:
            res.status(400).json({ error: 'Something went wrong!'})
    }
}