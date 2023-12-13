import { LightningElement } from 'lwc';

export default class WebsocketLWC extends LightningElement {
    url = 'wss://socketsbay.com/wss/v2/1/demo/';
    ws = new WebSocket(url);

    connectedCallback(){
        websocket.onopen    = () =>{
            writeLog("CONNECTED");
            sendMessage("Hello world");
        }
    }

    sendMessage(message)
    {
      writeLog("SENT: " + message);
      websocket.send(message);
    }
}