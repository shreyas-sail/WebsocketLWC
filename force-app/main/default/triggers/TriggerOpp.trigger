trigger TriggerOpp on Opportunity (after insert,after update) {
    if(Trigger.isUpdate)
		TriggerHandler.updateAccountStatus(trigger.new,trigger.oldMap);
    if(Trigger.isInsert)
		TriggerHandler.updateAccountStatus(trigger.new,null);
    
}