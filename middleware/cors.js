import Cors from 'cors';

const cors = Cors({
    methods: ['GET', 'POST'],
    origin: "https://www.freecodecamp.org/"
});

export default function enableCors(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req,res, (result) => {
        if (result instanceof Error) {
            return reject(result);
        }
        return resolve(result);
        })
    })
}