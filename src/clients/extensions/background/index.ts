
import { initSockets } from "./modules/sockets";
import { message, PLAYER_ENTER_FULLSCREEN } from "../../../communication/actions";
import { initMessageEventListener, onInstalledListener, onTabChangeListener } from "./modules/browser";

initSockets()
initMessageEventListener()
onInstalledListener();
onTabChangeListener();




