import { LightningElement } from 'lwc';

export default class WebsocketLWC extends LightningElement {
    url = 'wss://socketsbay.com/wss/v2/1/demo/';
    ws = new WebSocket(this.url);

    connectedCallback(){
        ws.onopen    = () =>{
            console.log("CONNECTED");
            this.sendMessage("Hello world");
        }
    }

    sendMessage(message)
    {
      writeLog("SENT: " + message);
      ws.send(message);
    }
}