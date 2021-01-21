import {DB} from "./database";

export const bootstrap = async () =>{
    try{
        await DB.init()
    }
    catch (e) {
        console.log(e)
    }
}