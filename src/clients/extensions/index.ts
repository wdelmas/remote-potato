import { Debugger } from "../../communication/Debugger";

export interface HelloWorld {
    name: string
}

const helloWorld: HelloWorld = {
    name: 'hello world'
}

Debugger.log(helloWorld.name)