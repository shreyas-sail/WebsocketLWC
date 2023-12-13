trigger TriggerCase on Case (after update) {
    if(Trigger.isAfter){
        if(Trigger.isUpdate){
            MainClass.updateAccountAndTask(trigger.new,trigger.oldMap);
        }
    }
}