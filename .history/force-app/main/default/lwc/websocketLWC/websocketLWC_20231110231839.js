import { LightningElement } from 'lwc';

export default class WebsocketLWC extends LightningElement {
    url = 'wss://socketsbay.com/wss/v2/1/demo/';
    ws = new WebSocket(this.url);

    connectedCallback(){
        this.ws.onopen    = () =>{
            console.log("CONNECTED");
            this.sendMessage("Hello world");
        }
    }

    sendMessage(message)
    {
        console.log("SENT: " + message);
      this.ws.send(message);
    }
    
    this.ws.onMessage = ()=> this.onMessage();

    onMessage(evt)
    {
      console.log(evt);
      console.log('Message receieved');
    }
}