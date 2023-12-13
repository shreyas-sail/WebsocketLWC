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
          if(blobFile)
            this.processByteMessage(event);


          // const readerStream = blobFile.stream();
          // console.log(readerStream);
          // const reader = readerStream.getReader();

          // reader.read().then( processText({ done, value }) {
          //   // Result objects contain two properties:
          //   // done  - true if the stream has already given you all its data.
          //   // value - some data. Always undefined when done is true.
          //   if (done) {
          //     console.log("Stream complete");
          //     para.textContent = value;
          //     return;
          //   }
          // });

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



    processByteMessage(message) {
			const arrayBufferPromise = message.data.arrayBuffer();
			arrayBufferPromise.then((data) => {
				var l = data.byteLength;
				var dvu = new DataView(data);
				let position = 0;
				while (position != l) {
					var type = dvu.getInt8(position);
					position = position + 1;
					console.log("Mode Type: " + type);
					switch (type) {
						case 64:
							console.log("IndexLtpPacket");
							this.processIndexLtpPacket(dvu);
							break;
						case 65:
							console.log("IndexQuotePacket");
							this.processIndexQuotePacket(dvu);
							break;
						case 66:
							console.log("IndexFullPacket");
							this.processIndexFullPacket(dvu);
							break;
						case 61:
							console.log("LtpPacket");
							this.processLtpPacket(dvu);
							break;
						case 62:
							console.log("QuotePacket");
							this.processQuotePacket(dvu);
							break;
						case 63:
							console.log("FullPacket");
							this.processFullPacket(dvu);
							break;
						default:
							console.log("Default");
							break;
					}
				}
		
				 processLtpPacket(dvu) {
					console.log("last_trade_price: " + dvu.getFloat32(position, true));
					console.log("last_trade_time: " + dvu.getInt32(position + 4, true));
					console.log("security id: " + dvu.getInt32(position + 8, true));
					console.log("traded: " + dvu.getInt8(position + 12, true));
					console.log("Mode: " + dvu.getInt8(position + 13, true));
					console.log("changeAbsolute: " + dvu.getFloat32(position + 14, true));
					console.log("changePercent: " + dvu.getFloat32(position + 18, true));
					position += 22;
				}
		
				 processIndexLtpPacket(dvu) {
					console.log("last_trade_price: " + dvu.getFloat32(position, true));
					console.log("last_update_time: " + dvu.getInt32(position + 4, true));
					console.log("security id: " + dvu.getInt32(position + 8, true));
					console.log("traded: " + dvu.getInt8(position + 12, true));
					console.log("Mode: " + dvu.getInt8(position + 13, true));
					console.log("changeAbsolute: " + dvu.getFloat32(position + 14, true));
					console.log("changePercent: " + dvu.getFloat32(position + 18, true));
					position += 22;
				}
		
				 processQuotePacket(dvu) {
					console.log("last_traded_price: " + dvu.getFloat32(position, true));
					console.log("Last_trade_time: " + dvu.getInt32(position + 4, true));
					console.log("security id: " + dvu.getInt32(position + 8, true));
					console.log("traded: " + dvu.getInt8(position + 12, true));
					console.log("Mode: " + dvu.getInt8(position + 13, true));
					console.log("last_traded_quantity " + dvu.getInt32(position + 14, true));
					console.log("average_traded_price: " + dvu.getFloat32(position + 18, true));
					console.log("volume: " + dvu.getInt32(position + 22, true));
					console.log("total_buy_quantity: " + dvu.getInt32(position + 26, true));
					console.log("total_sell_quantity: " + dvu.getInt32(position + 30, true));
					console.log("open: " + dvu.getFloat32(position + 34, true));
					console.log("close: " + dvu.getFloat32(position + 38, true));
					console.log("high: " + dvu.getFloat32(position + 42, true));
					console.log("low: " + dvu.getFloat32(position + 46, true));
					console.log("change_percent: " + dvu.getFloat32(position + 50, true));
					console.log("change_absolute: " + dvu.getFloat32(position + 54, true));
					console.log("52_week_high: " + dvu.getFloat32(position + 58, true));
					console.log("52_week_low: " + dvu.getFloat32(position + 62, true));
					position += 66;
				}
		
				 processIndexQuotePacket(dvu) {
					console.log("last_trade_price: " + dvu.getFloat32(position, true));
					console.log("security id: " + dvu.getInt32(position + 4, true));
					console.log("traded: " + dvu.getInt8(position + 8, true));
					console.log("Mode: " + dvu.getInt8(position + 9, true));
					console.log("open " + dvu.getFloat32(position + 10, true));
					console.log("close: " + dvu.getFloat32(position + 14, true));
					console.log("high: " + dvu.getFloat32(position + 18, true));
					console.log("low: " + dvu.getFloat32(position + 22, true));
					console.log("change_percent: " + dvu.getFloat32(position + 26, true));
					console.log("change_absolute: " + dvu.getFloat32(position + 30, true));
					console.log("52_week_high: " + dvu.getFloat32(position + 34, true));
					console.log("52_week_low: " + dvu.getFloat32(position + 38, true));
					position += 42;
				}
		
				 processFullPacket(dvu) {
					depthPosition = position;
					for (let i = 0; i < 5; i++) {
						console.log("DEPTH PACKET  #" + (i + 1));
						console.log("buy_quantity: " + dvu.getInt32(depthPosition, true));
						console.log("sell_quantity: " + dvu.getInt32(depthPosition + 4, true));
		
						console.log("buy_order: " + dvu.getInt16(depthPosition + 8, true));
						console.log("sell_order: " + dvu.getInt16(depthPosition + 10, true));
		
						console.log("buy_price: " + dvu.getFloat32(depthPosition + 12, true));
						console.log("sell_price: " + dvu.getFloat32(depthPosition + 16, true));
						console.log("\n");
						depthPosition += 20;
					}
		
					position += 100;
		
					console.log("last_traded_price: " + dvu.getFloat32(position, true));
					console.log("last_trade_time: " + dvu.getInt32(position + 4, true));
					console.log("security id: " + dvu.getInt32(position + 8, true));
					console.log("traded: " + dvu.getInt8(position + 12, true));
					console.log("Mode: " + dvu.getInt8(position + 13, true));
					console.log("last_traded_quantity " + dvu.getInt32(position + 14, true));
					console.log("average_traded_price: " + dvu.getFloat32(position + 18, true));
					console.log("volume: " + dvu.getInt32(position + 22, true));
					console.log("total_buy_quantity: " + dvu.getInt32(position + 26, true));
					console.log("total_sell_quantity: " + dvu.getInt32(position + 30, true));
					console.log("open: " + dvu.getFloat32(position + 34, true));
					console.log("close: " + dvu.getFloat32(position + 38, true));
					console.log("high: " + dvu.getFloat32(position + 42, true));
					console.log("low: " + dvu.getFloat32(position + 46, true));
					console.log("change_percent: " + dvu.getFloat32(position + 50, true));
					console.log("change_absolute: " + dvu.getFloat32(position + 54, true));
					console.log("52_week_high: " + dvu.getFloat32(position + 58, true));
					console.log("52_week_low: " + dvu.getFloat32(position + 62, true));
					console.log("oi: " + dvu.getInt32(position + 66, true));
					console.log("change_oi: " + dvu.getInt32(position + 70, true));
					position += 74;
				}
		
				 processIndexFullPacket(dvu) {
					console.log("last_trade_price: " + dvu.getFloat32(position, true));
					console.log("security id: " + dvu.getInt32(position + 4, true));
					console.log("traded: " + dvu.getInt8(position + 8, true));
					console.log("Mode: " + dvu.getInt8(position + 9, true));
					console.log("open " + dvu.getFloat32(position + 10, true));
					console.log("close: " + dvu.getFloat32(position + 14, true));
					console.log("high: " + dvu.getFloat32(position + 18, true));
					console.log("low: " + dvu.getFloat32(position + 22, true));
					console.log("change_percent: " + dvu.getFloat32(position + 26, true));
					console.log("change_absolute: " + dvu.getFloat32(position + 30, true));
					console.log("last_update_time: " + dvu.getInt32(position + 34, true));
					position += 38;
				}
			});
		}
}