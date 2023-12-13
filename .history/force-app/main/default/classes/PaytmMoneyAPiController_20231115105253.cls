public class PaytmMoneyAPiController {

    @testVisible private static final String PAYTM_GETCODE_ENDPOINT = 'callout:Paytm_Money/accounts/v2/gettoken';

    public PaytmMoneyAPiController() {

    }

    @AuraEnabled
    public static void getAccessToken( String requestToken){
        try {
            HttpRequest httpReq = new HttpRequest();
            httpReq.setHeader('Content-Type','application/json');
            httpReq.setMethod('POST');
            httpReq.setBody(body);
            httpReq.setEndpoint(PAYTM_GETCODE_ENDPOINT);
            HttpResponse response =new Http().send(httpReq);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}//Map<String,String>