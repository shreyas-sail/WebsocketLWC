trigger CaseTrigger on Case (before insert) {
    /*if(Trigger.isBefore && Trigger.isInsert){
        return;
        List<Case> caseList = [Select  AccountId, Account.Name,SuppliedName From Case WHERE ID IN :trigger.newMap.keySet()];
        //st<Account> acList = [Select Name,Id From Account Where ID In:accIds];
        Map<String,List<String>> accountNametoId = new Map<String,List<String>>();
        for(Case c : caseList){
            if(!accountNametoId.containsKey(c.Account.Name)){
                accountNametoId.put(c.Account.Name,new List<String>{c.AccountId});    
            }else{
                accountNametoId.get(c.Account.Name).add(c.AccountId);
            }
        }
        List<Case> listToUpdate = new List<Case>();
        for(Case cs: trigger.new){
            if(accountNametoId.containsKey(cs.SuppliedName)){
                cs.AccountId = accountNametoId.get(cs.SuppliedName)[0];
            }
        }
        
    }*/
    
}