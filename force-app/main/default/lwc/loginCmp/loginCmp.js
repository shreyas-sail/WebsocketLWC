import { LightningElement,wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from "lightning/navigation";
import getAccessToken from "@salesforce/apex/UpstockRestApi.getAccessToken";

export default class LoginCmp extends NavigationMixin(LightningElement) {
		client_id = '3dcfb57d-162c-490c-b36f-acecf64c92e1';
		redirectUrl = 'https://curious-shark-4iwd56-dev-ed.trailblaze.my.site.com/upstock/s/';
		state='RnJpIERlYyAxNiAyMDIyIDE1OjU4OjUxIEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKQ%3D%3D';
		AUTH_URL = `https://api-v2.upstox.com/login/authorization/dialog?response_type=code&client_id=${this.client_id}&redirect_uri=${this.redirectUrl}`;
		code = ''
		@wire(CurrentPageReference)
  	getStateParameters(currentPageReference) {
    if (currentPageReference) {
      this.code = currentPageReference.state.code;
    }
  }
		get showLoginButton(){
				return this.code === '' || this.code === undefined;
		}
		connectedCallback(){
				if(!this.showLoginButton){
						getAccessToken({code:this.code})
								.then((result)=>{
										console.log('Access Token >> '+result);
						})
				}
		}
		handleClick(){
				this[NavigationMixin.Navigate]({
        type: "standard__webPage",
        attributes: {
          url: this.AUTH_URL
        }
      })
		}
}