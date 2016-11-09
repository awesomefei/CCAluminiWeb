namespace ccalummiwebsite.Controllers {
    export class MessageController {
        public messages;

        constructor(private messageService: ccalummiwebsite.Services.MessageService,
                    private $state:ng.ui.IStateService,
                    private $uibModal:ng.ui.bootstrap.IModalService){
                        this.getMessages();
        }

        getMessages(){
            this.messages = this.messageService.getMessages();
        }
        getMessageDetails(id){
            console.log(id);
            this.$state.go('message', {id:id});
        }

        createMessage(){
            this.$uibModal.open({
                templateUrl: 'ngApp/views/createMessage.html',
                controller: ccalummiwebsite.Controllers.CreateMessageController,
                controllerAs: 'vm',
                size: 'md'
            });
        }
    }

    export class MessageDetailsController {
        public message;
        private messId;
        public comment;

        constructor(private messageService: ccalummiwebsite.Services.MessageService,
                    private $stateParams:ng.ui.IStateParamsService){
                        let messId = this.$stateParams['id']
                        this.getMessage(messId);
        }

        getMessage(messId){
            this.message = this.messageService.getMessage(messId);
            console.log(messId);
        }

        saveComment(messId){
            this.comment = this.messageService.saveComment(messId, this.comment)
            .then(()=>{
                console.log('Comment was saved');
                this.getMessage(messId)
            }).catch(()=>{
                console.log('Comment was not succesfuly saved')
            })
        }
    }

    export class CreateMessageController {
        public message;
        public users;
        public formMode;
        public userInfo;

        constructor(private messageService: ccalummiwebsite.Services.MessageService,
                    private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
                    private userService: ccalummiwebsite.Services.UserService){
                        this.getUsers();
                        this.formMode = false;
        }

        toggleformMode(){
            this.formMode = !this.formMode
        }

        getUserId(){
            console.log(this.userInfo)
        }

        getUsers(){
            this.users = this.userService.getUsersOnService()
        }

        saveMessage(){
            this.messageService.saveMessage(this.userInfo._id, this.message).then(()=>{
                this.$uibModalInstance.close();
            }).catch(()=>{
                console.log('Error in saving message')
            })
        }
    }
}
