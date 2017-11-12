
import { initSockets } from "./modules/sockets";
import { message, PLAYER_ENTER_FULLSCREEN } from "../../../communication/actions";
import { initMessageEventListener, onInstalledListener, onUpdatedListener } from "./modules/browser";

initSockets()
initMessageEventListener()
onInstalledListener();
onUpdatedListener();




