
import { initSockets } from "./modules/sockets";
import { message, PLAYER_ENTER_FULLSCREEN } from "../../../communication/actions";
import { initMessageEventListener, onInstalledListener } from "./modules/browser";

initSockets()
initMessageEventListener()
onInstalledListener();




