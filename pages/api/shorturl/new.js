import dns from 'dns';
import { nanoid } from 'nanoid';

import connectDB from '../../../middleware/mongo';
import Url from '../../../models/Url';

export default async (req, res) => {
    
    const { method, body } = req;

    await connectDB();

    switch(method) {
        case 'POST':
            try {
                let url = body.url;

                const regex = /^https?:\/\//;
                if (regex.test(url)) {
                    url = url.replace(regex, '');
                }

                dns.lookup(url, async err => {
                    if (err || url === '') {
                        res.status(400).json({
                            error: 'invalid url'
                        });
                    } 
                    else {
                        
                        try {
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
                            res.status(400).json({ success: false, error: error });
                            console.log(error);
                        }
                    }
                })
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