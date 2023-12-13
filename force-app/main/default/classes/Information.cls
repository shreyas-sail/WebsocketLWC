@RestResource(urlMapping = '/v1/Info/')
Global class Information {
	@httpGet
    global static String getUserInformation(){
        return userInfo.getUserId();
    }
}