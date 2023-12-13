@RestResource(urlMapping='/api/Webhook/message/*')
global class TwillioNotificationController {

    @HttpPost
    global static void handleWhatAppNotification(){
        try{
            RestRequest request = RestContext.request;
            RestResponse response = RestContext.response;
            JSONParser parser = JSON.createParser(String.valueOf(request));
            
            Map<String,String> paramteres = request.params;
            
            // Create record for the Custom Object
            WhatsApp_Notification__c whatObject = new WhatsApp_Notification__c ();
            whatObject.Sender_Number__c  =  paramteres.get('From').substringAfter(':');
            whatObject.Message__c  =  paramteres.get('Body');
            insert whatObject;
            response.statusCode = 200;
            response.responseBody = Blob.valueOf('Success'); 
            
        }catch(Exception e){
            System.debug('Message '+e);
        }
    }
}