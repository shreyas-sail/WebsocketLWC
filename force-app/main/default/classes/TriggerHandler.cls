public class TriggerHandler {
    public static void updateAccountStatus(List<Opportunity> oppList,Map<Id,Opportunity> oldOppMap){
        
		Set<Id> parentAccId = new Set<Id>();       
        for(Opportunity op:oppList){
            if(oldOppMap != null){ // After Update we get the parent Account for all change Opps
                Opportunity oldOp = oldOppMap.get(op.Id);
                if(op.AccountId != oldOp.AccountId){
                    parentAccId.add(op.AccountId);
                    parentAccId.add(oldOp.AccountId);
                }
                if(op.StageName != oldOp.StageName && op.StageName == 'Closed Won'){
                    parentAccId.add(op.AccountId);
                }
            }else if(op.StageName == 'Closed Won'){ // After Insert we get the parent Account
                parentAccId.add(op.AccountId);
            }
        }
        
        
        if(!parentAccId.isEmpty()){
            // get the list of Accounts
            Map<Id,Account> accMap = new Map<Id,Account>([Select Id,(Select Id from Opportunities Where StageName = 'Closed Won') From Account Where Id =:parentAccId]);
            // create map of Acc Id and oppList
            List<AggregateResult> oppAgg = [Select Count(Id)totalOp,AccountId From Opportunity Where AccountId IN:parentAccId  Group by AccountId];
            List<Account> accToUpdate = new List<Account>();
            for(AggregateResult result:oppAgg){
                Id accId = (Id) result.get('AccountId');
                Integer totalOps = (Integer) result.get('totalOp');
                System.debug('accId '+accId);
                System.debug('Actual Opps ' +accMap.get(accId).Opportunities.size());
                System.debug(totalOps);
                if(accMap.get(accId).Opportunities.size() == totalOps){
                    accToUpdate.add(accMap.get(accId));
                }
            }
            if(!accToUpdate.isEmpty()){
                for(Account a:accToUpdate)
                    a.Name = 'All Opps Closed Yes Yes';
				update accToUpdate;
            }
        }
        
    }
}