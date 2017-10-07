import * as React from "react";
import Remote from "./remote/index";

export default (socket: any) => {
    return <Remote socket={socket} />
} 