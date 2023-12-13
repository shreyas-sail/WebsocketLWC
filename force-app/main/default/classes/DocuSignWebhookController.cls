@RestResource(urlMapping='/api/Webhook/signed/*')
global class DocuSignWebhookController {

    @HttpPost
    global static void handleNotification(){
        try{
            RestRequest request = RestContext.request;
            RestResponse response = RestContext.response;
            //Account a = new Account(Name='Webhook'+String.valueOf(Math.random()));
            //insert a;
            JSONParser parser = JSON.createParser(String.valueOf(request));
            System.debug('parser>>>>> '+request.params);
            System.debug('parser '+parser.getText());
            
            Map<String,String> paramteres = request.params;
            for(String s:paramteres.keySet())
            	System.debug('JSON2Apex*** '+s + 'Value>> '+paramteres.get(s));
            WhatsApp_Notification__c whatObject = new WhatsApp_Notification__c ();
            whatObject.Sender_Number__c  =  paramteres.get('From').substringAfter(':');
            whatObject.Message__c  =  paramteres.get('Body');
            System.debug('Image>>> '+paramteres.get('Subresource_Uris'));
            insert whatObject;
            
            System.debug('request '+request);
            System.debug('response '+response);
            response.statusCode = 200;
            response.responseBody = Blob.valueOf('Success'); 
            
        }catch(Exception e){
            System.debug('Message '+e);
        }
    }
}