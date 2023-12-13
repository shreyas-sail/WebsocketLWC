public class PaytmMoneyAPiController {
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