import { LightningElement } from 'lwc';

export default class WebsocketLWC extends LightningElement {
    url = 'wss://developer-ws.paytmmoney.com/broadcast/user/v1/data?x_jwt_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJtZXJjaGFudCIsImlzcyI6InBheXRtbW9uZXkiLCJpZCI6NjM5NDk5LCJleHAiOjE2OTk5MDAxOTl9.-b-YAGWCq6l3XLGsPouLHtqvnGXvTA_Vf9l4BHh3e-k';
    ws = new WebSocket(this.url);
    input='';
    connectedCallback(){
        this.ws.onopen    = () =>{
            console.log("CONNECTED");
            this.sendMessage("Hello world");
        }
        this.ws.onmessage = (event)=> {
            console.log(event.data);
            console.log('Message receieved');
          }
        // this.handleClick();
    }
    handleChange(e){
        this.input = e.target.value;
    }
    sendMessage(message)
    {
        console.log("SENT: " + message);
      this.ws.send(message);
    }

    onMessage(evt)
    {
      console.log(evt);
      console.log('Message receieved');
    }

    handleClick(){
        var preferences = 
            [
              {
                "actionType": "ADD",
                "modeType": "FULL",
                "scripType": "INDEX",
                "exchangeType": "NSE",
                "scripId": "13"
              },
              {
                "actionType": "ADD",
                "modeType": "LTP",
                "scripType": "EQUITY",
                "exchangeType": "BSE",
                "scripId": "523144"
              }
            ]; 
            
            this.ws.send(JSON.stringify(preferences));
    }


    handleAutenticate(){
        
    }
}