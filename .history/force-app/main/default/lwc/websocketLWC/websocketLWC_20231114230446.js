import { LightningElement,wire } from 'lwc';
import APISECRET from '@salesforce/label/c.Paytm_API_Secret';
import APIKEY from '@salesforce/label/c.Paytm_API_Key';
import { CurrentPageReference } from 'lightning/navigation';


export default class WebsocketLWC extends LightningElement {
    apiSecret = APISECRET;
    apiKey  = APIKEY;
    url = 'wss://developer-ws.paytmmoney.com/broadcast/user/v1/data?x_jwt_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJtZXJjaGFudCIsImlzcyI6InBheXRtbW9uZXkiLCJpZCI6NjM5NDk5LCJleHAiOjE2OTk5MDAxOTl9.-b-YAGWCq6l3XLGsPouLHtqvnGXvTA_Vf9l4BHh3e-k';
    ws = new WebSocket(this.url);
    input='';
    requestToken ;
    showLoader = false;

    accessTokenEndpoint = "https://developer.paytmmoney.com/accounts/v2/gettoken";

    postData = {
        "api_key" :this.apiKey,
        "api_secret_key" : this.apiSecret
    }

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
       if (currentPageReference) {
          this.requestToken = currentPageReference.state?.requestToken;
       }
    }

    async connectedCallback(){
        if(this.requestToken){

            console.log(this.requestToken);
            this.showLoader = true;
            this.postData.requestToken = this.requestToken;
            const response = await fetch(this.accessTokenEndpoint, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "no-cors",
                headers: {
                  "Content-Type": "application/json",
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: this.postData // body data type must match "Content-Type" header
              });
            // const httpResponsePromise = await response.json();
            console.log(response.json());
        }

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
        window.location.replace("https://login.paytmmoney.com/merchant-login?apiKey="+this.apiKey);
    }
}