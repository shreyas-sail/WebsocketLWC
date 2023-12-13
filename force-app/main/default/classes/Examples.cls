public class Examples {
	private static String pvS = 'String private';
    public static String puS = 'String Public';
    public Integer i = 0;
    
    public  void accessVariables(){
        String temp = pvS ;
        String temp2 = puS;
        System.debug('pv ' + pvS + ' pu '+ puS);
        i+=1;
        callMethod();
    }
    
    void callMethod(){
        i+=1;
        System.debug('i>>> ' +i);
    }  
}