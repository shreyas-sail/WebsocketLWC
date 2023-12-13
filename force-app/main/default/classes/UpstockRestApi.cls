public class UpstockRestApi {
	public final static String BASE_URL = 'https://api-v2.upstox.com/';
    public final static String AUTH_URL = 'login/authorization/dialog';
    public final static String AUTH_TOKEN = 'https://api-v2.upstox.com/login/authorization/token';
    public static String CLIENT_ID = '3dcfb57d-162c-490c-b36f-acecf64c92e1';
    public static String CLIENT_SECRET = 'xgw3fs35gs';
    public static String Redirect_Uri = 'https://curious-shark-4iwd56-dev-ed.trailblaze.my.site.com/upstock/s/'; 
    
    @AuraEnabled
    public static String getAccessToken(String code){
        HttpRequest request = new HttpRequest();
        Http http = new Http();
        HTTPResponse response = new HTTPResponse();
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json');
        request.setHeader('Content-Type', 'application/x-www-form-urlencoded');
        String currentEndpointParams = '?code='+code+'&client_id='+CLIENT_ID+'&client_secret='+CLIENT_SECRET+'&redirect_uri='+Redirect_Uri+'&grant_type=authorization_code';
        request.setEndpoint(AUTH_TOKEN+currentEndpointParams);
        System.debug('>> '+AUTH_TOKEN+currentEndpointParams);
        response = http.send(request);
        System.debug('Body '+ response.getBody());
        System.debug('header '+ response.getStatus()+'>> '+response.getBodyAsBlob() ) ;
        
        return response.getBody();
    }
    
    //private Map<String,String> getAuthTokenBody(){
        
    //}
}