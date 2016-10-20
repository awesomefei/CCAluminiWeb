namespace ccalummiwebsite.Controllers {
    export class MessageController {
        public messages;

        constructor(private messageService: ccalummiwebsite.Services.MessageService,
                    private $uibModal:ng.ui.bootstrap.IModalService){
        }

        getMessageDetails(id){

        }
    }

    export class MessageDetailsController {
        public message;

        constructor(private messageService: ccalummiwebsite.Services.MessageService){

        }

        // getMessage(){
        //     this.message = this.messageService.getMessage();
        // }
    }
}
