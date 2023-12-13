public class LinkedInController {
    public static final String CLIENTSECERT = '6oRMfVCcWRO2iYjo';
    public static final String CLIENTID = '86h8g8ekqgiycl';
    public static final String RETURNURI = 'https://curious-shark-4iwd56-dev-ed.trailblaze.preview.salesforce-experience.com/?app=commeditor';
    public static final String LINKEDLN_AUTHURL = 'https://www.linkedin.com/oauth/v2/authorization?';
    public static final String LINKED_SCOPE = 'r_liteprofile%20r_emailaddress';
    public static final String accessToken_Endpoint = 'https://www.linkedin.com/oauth/v2/accessToken?';
    



    @AuraEnabled
    public static String doAuth(){
        try {
            String requestoAuthURL = LINKEDLN_AUTHURL + 'response_type=code&client_id='+CLIENTID+'&redirect_uri='+RETURNURI+'&state=12345567dggd&scope='+LINKED_SCOPE;
            // PageReference p = new PageReference(requestoAuthURL);
            // return p;
            return requestoAuthURL;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static LinkedIn__c getAccessToken(String authCode,String redirectURL){
        Http http = new Http();
        HttpRequest httpReq = new HttpRequest();
        HttpResponse httpRes = new HttpResponse();
        String requestTokenBody = 'grant_type=authorization_code'+'&code='+authCode+'&client_id='+CLIENTID+'&client_secret='+CLIENTSECERT+'&redirect_uri='+redirectURL;
        System.debug(requestTokenBody);
        
        System.debug('#### authCodeFromURL '+authCode);
        System.debug('#### requestTokenBody '+requestTokenBody);
        httpReq.setMethod('POST');
        httpReq.setEndpoint(accessToken_Endpoint);
        httpReq.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        httpReq.setBody(requestTokenBody);
        LinkedIn__c linkedlnInfo = new LinkedIn__c();
        try{
            httpRes = http.send(httpReq);
            System.debug('Status Code '+httpRes.getStatusCode());
            System.debug('Body Code '+httpRes.getBody());
            if(httpRes.getStatusCode() == 200){
                Map<String,object> TokenInfo = (Map<String,object>)JSON.deserializeUntyped(httpRes.getBody());
                System.debug('Token Info '+TokenInfo);
                linkedlnInfo.AccessToken__c =  String.valueOf(TokenInfo.get('access_token'));
                linkedlnInfo.ExpireSecond__c =  Double.valueOf(TokenInfo.get('expires_in'));

                insert linkedlnInfo;
            }
        }catch(Exception e){
            System.debug(e);
        }
        return linkedlnInfo;
        }
}