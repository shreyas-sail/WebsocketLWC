public class YellowMarker extends Marker {
    public override void write() {
        System.debug('Writing some text using the yellow marker.');
    } 
    
    public override Double discount() {
        return .05;
    }
    
    public static void overloadingMethod(String n){
        System.debug(n);
    } 
    
    public static void overloadingMethod(String n,String c){
        System.debug(n);
        System.debug(c);
    } 
}