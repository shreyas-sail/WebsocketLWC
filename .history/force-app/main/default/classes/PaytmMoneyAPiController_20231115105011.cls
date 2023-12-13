public class PaytmMoneyAPiController {

    @testVisible private static final String PAYTM_GETCODE_ENDPOINT = 'callout:Paytm_Money/accounts/v2/gettoken';

    public PaytmMoneyAPiController() {

    }

    @AuraEnabled
    public static void getAccessToken( String requestToken){
        try {
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}//Map<String,String>