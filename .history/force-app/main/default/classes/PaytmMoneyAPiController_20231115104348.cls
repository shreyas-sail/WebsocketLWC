public class PaytmMoneyAPiController {
    public PaytmMoneyAPiController() {

    }

    @AuraEnabled
    public static Map<String,String> getAccessToken(){
        try {
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}