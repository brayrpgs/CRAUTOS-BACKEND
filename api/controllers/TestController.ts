import { Controller, Get, Response, Route } from "tsoa";

@Route("test")
export class TestController extends Controller {
    
    @Get()
    @Response(200)
    public async get() : Promise<string>{
        return "hola mundo tsoa"
    }
}