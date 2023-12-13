import { LightningElement,wire } from 'lwc';
import doAuth from '@salesforce/apex/LinkedInController.doAuth';
import getToken from '@salesforce/apex/LinkedInController.getAccessToken';
import { NavigationMixin,CurrentPageReference} from 'lightning/navigation';

export default class LinkedInCmp extends NavigationMixin(LightningElement) {
    currentPageReference = null;
    authCode = null;
    urlStateParameters = null;
    pageUrl = 'https://curious-shark-4iwd56-dev-ed.trailblaze.preview.salesforce-experience.com/?app=commeditor';
    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
      if (currentPageReference) {
        this.urlStateParameters = currentPageReference.state;
        this.setParametersBasedOnUrl();
        console.log('window.location.href '+window.location.href);
      }
    }
    setParametersBasedOnUrl() {
      this.authCode = this.urlStateParameters.code;
      console.log(this.authCode);
    }

    handleAuthClick(){
        doAuth()
            .then((result) => {
                console.log(result);
                this[NavigationMixin.Navigate]({
                    "type": "standard__webPage",
                    "attributes": {
                        "url": result
                    }
                });
            })
            .catch(()=> console.log("Error"))
    }

    getAccessToken(){
        let url = window.location.href;
        if(!this.authCode){
            alert('Get Authorized');
            return;
        }
        getToken({ authCode:this.authCode,redirectURL:url})
            .then((result) => {
                console.log(JSON.stringify(JSON.parse(result)))
            })
            .catch(()=> console.log("Error"))
    }
}