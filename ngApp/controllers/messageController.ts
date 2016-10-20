namespace ccalummiwebsite.Controllers {
    export class MessageController {
        public messages;

        constructor(private messageService: ccalummiwebsite.Services.MessageService,
                    private $state:ng.ui.IStateService){
                        this.getMessages();
        }

        getMessages(){
            this.messages = this.messageService.getMessages();
        }
        getMessageDetails(id){
            console.log(id);
            this.$state.go('message', {id:id});
        }
    }

    export class MessageDetailsController {
        public message;
        private messId;

        constructor(private messageService: ccalummiwebsite.Services.MessageService,
                    private $stateParams:ng.ui.IStateParamsService){
                        let messId = this.$stateParams['id']
                        this.getMessage(messId);
        }

        getMessage(messId){
            this.message = this.messageService.getMessage(messId);
            console.log(messId);
        }
    }
}
