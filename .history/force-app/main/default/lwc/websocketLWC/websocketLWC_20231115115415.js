import { LightningElement,wire } from 'lwc';
import APISECRET from '@salesforce/label/c.Paytm_API_Secret';
import APIKEY from '@salesforce/label/c.Paytm_API_Key';
import { CurrentPageReference } from 'lightning/navigation';
import getAccessToken from '@salesforce/apex/PaytmMoneyAPiController.getAccessToken';




export default class WebsocketLWC extends LightningElement {
    apiSecret = APISECRET;
    apiKey  = APIKEY;
    url = 'wss://developer-ws.paytmmoney.com/broadcast/user/v1/data?x_jwt_token=';
    webSocket;// = new WebSocket(this.url);
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
        const response = await getAccessToken({apiKey:this.apiKey ,apiSecret:this.apiSecret, requestToken:this.requestToken});
        console.log(response);
        const accessTokenObject = JSON.parse(response);
        this.webSocket = new WebSocket(this.url+accessTokenObject.public_access_token);


        this.webSocket.onopen    = () =>{
          console.log("CONNECTED");
          this.sendMessage("Hello world");
        }
        this.webSocket.onmessage = (event)=> {
          //console.log(event.data);
          let blobFile = event.data;
          const readerStream = blobFile.stream();
          console.log(readerStream);
          const reader = readerStream.getReader();

          reader.read().then(function processText({ done, value }) {
            // Result objects contain two properties:
            // done  - true if the stream has already given you all its data.
            // value - some data. Always undefined when done is true.
            if (done) {
              console.log("Stream complete");
              para.textContent = value;
              return;
            }
          });

          // blobFile.stream().then((dataInText)=>{
          //   console.log(dataInText);
          //   const stream = new ReadableStream(dataInText);
          //   console.log(stream);

            
          // }).catch(()=>{

          // })

          console.log('Message receieved');
        }
        this.showLoader = true;
          // this.postData.request_token = this.requestToken;
          // const response = await fetch(this.accessTokenEndpoint, {
          //     method: "POST", // *GET, POST, PUT, DELETE, etc.
          //     mode: "cors",
          //     headers: {
          //         'Accept': 'application/json',
          //       "Content-Type": "application/json",
          //       'charset': 'utf-8'
          //       // 'Content-Type': 'application/x-www-form-urlencoded',
          //     },
          //     body: JSON.stringify({
          //         "api_key" :this.apiKey,
          //         "api_secret_key" : this.apiSecret,
          //         "request_token": this.requestToken
          //      })  // body data type must match "Content-Type" header
          //   });
          // const httpResponsePromise = await response.json();
          // console.log(httpResponsePromise);
      }

      
      // this.handleClick();
  }
    handleChange(e){
        this.input = e.target.value;
    }
    sendMessage(message)
    {
        console.log("SENT: " + message);
      this.webSocket.send(message);
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
            
            this.webSocket.send(JSON.stringify(preferences));
    }


    handleAutenticate(){
        window.location.replace("https://login.paytmmoney.com/merchant-login?apiKey="+this.apiKey);
    }
}