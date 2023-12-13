public class MainClass {
    public static void updateAccountAndTask(List<Case> caseList,Map<Id,Case> oldMap){
        Map<Id,String> parentAccId = new Map<Id,String>();
        Set<Id> caseIds = new Set<Id>();
        List<Account> acToUpdate = new List<Account>();
        if(!caseList.isEmpty()){
            for(Case cs:caseList){
                if(oldMap != null && !oldMap.isEmpty()){
                    Case oldCase = oldMap.get(cs.Id);
                    if(cs.AccountId != oldCase.AccountId){
                        parentAccId.put(cs.AccountId,String.valueOf(cs.CaseNumber) + String.valueOf( cs.Status));
                        parentAccId.put(oldCase.AccountId,'No Case Related Yet');
                    }
                    if(cs.Status != oldCase.Status){
                        parentAccId.put(cs.AccountId,String.valueOf(cs.CaseNumber) +'-->'+ String.valueOf( cs.Status));
                        caseIds.add(cs.Id);
                    }
                }
            }
        }
        
        if(!parentAccId.isEmpty()){
            List<Account> acList = [Select Id,Description FROM Account Where Id IN: parentAccId.keySet()];
            if(!acList.IsEmpty()){
                for(Account ac:acList){
                    ac.Description = parentAccId.get(ac.Id);
                    acToUpdate.add(ac);
                }
            }
            
            if(!acToUpdate.isEmpty()){
                try{
                    update acToUpdate;
                }catch(Exception ex){
                    System.debug('Error '+ex.getMessage());                }
            }
        } 
        
        //if(!caseIds.IsEmpty()){
          //  List<Task> ts = [Select Id, Status from Task Where ]
        //}
    }
}