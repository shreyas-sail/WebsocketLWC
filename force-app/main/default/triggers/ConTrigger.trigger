trigger ConTrigger on Contact (after insert,after delete) {
    Map<Id,Set<Id>> acMap = new Map<Id,Set<Id>>();
    Boolean isAdd = true;
    if(Trigger.isInsert){
       isAdd = true;
    	for(Contact c:trigger.new){
            if(!acMap.containsKey(c.AccountId)){
                acMap.put(c.AccountId,new Set<Id>{c.Id});
            }else{
                Set<Id> cList = acMap.get(c.AccountId);
                cList.add(c.Id);
                acMap.put(c.AccountId,cList);
            }
        
    }
    }    
    if(Trigger.isDelete){
        isAdd = false;
        for(Contact c:trigger.old){
            if(!acMap.containsKey(c.AccountId)){
                acMap.put(c.AccountId,new Set<Id>{c.Id});
            }else{
                Set<Id> cList = acMap.get(c.AccountId);
                cList.add(c.Id);
                acMap.put(c.AccountId,cList);
            }
        
    	}
    }
    
    if(Trigger.isUpdate){
        Map<Id,Contact> oldMap = Trigger.oldMap; 
        for(Contact c:trigger.new){
            if(c.AccountId != oldMap.get(c.Id).AccountId){
                
            }
        }
    }
    
    List<Account> acList = [Select Id,con_number__c From Account Where Id IN:acMap.keySet()];
    for(Account a:acList){
        if(isAdd)
         a.con_number__c = a.con_number__c == null?acMap.get(a.Id).size():a.con_number__c+acMap.get(a.Id).size();
        if(!isAdd )
         a.con_number__c = a.con_number__c == null?0:a.con_number__c-acMap.get(a.Id).size();
    }
       
    
    update acList;
}