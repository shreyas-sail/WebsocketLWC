public class AccessModTest {
	protected String s = 'Priavte Str';
    
    public AccessModTest(){
		System.debug(s);
    }
    
    
    public class WrapperClass{
        String c ='Inner Class var';
        
        WrapperClass(){
            System.debug(c);
            //System.debug(s);
        }
    }
}