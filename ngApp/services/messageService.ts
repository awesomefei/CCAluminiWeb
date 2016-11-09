namespace ccalummiwebsite.Services {
    export class MessageService {
        public messageResource;

        constructor(private $resource:ng.resource.IResourceService){
            this.messageResource = $resource('api/messages/:id', null, {
                saveMessage: {
                    method: "POST",
                    url: "/api/messages/:recieverId"
                },
                saveComment: {
                    method: 'POST',
                    url: '/api/messages/saveComment/:id'
                }
            })
        }

        getMessages(){
            return this.messageResource.query();
        }

        getMessage(id){
            return this.messageResource.get({id: id})
        }

        saveMessage(id, message){
            return this.messageResource.saveMessage({recieverId: id}, message).$promise
        }

        saveComment(id, comment){
            return this.messageResource.saveComment({id: id}, comment).$promise
        }

    }
    angular.module('ccalummiwebsite').service('messageService', MessageService);
}
