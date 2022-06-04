import { NextApiRequest, NextApiResponse } from 'next';

export default function getUsers( request: NextApiRequest, response: NextApiResponse ){
    const users = [
        {id: 1, name: 'Diego'},
        {id: 2, name: 'Alexandre'},
        {id: 3, name: 'Nicole'},
    ]

    return response.json(users)
}