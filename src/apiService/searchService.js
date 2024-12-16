import * as request from '~/utils/request.js'

export const sesarch = async (payload = {}) =>{
    try{
        const res = await request.post('product', {
            body: payload
        });
        return res.data;
    } catch(error)  
    {
        console.log(error)
    }
} 