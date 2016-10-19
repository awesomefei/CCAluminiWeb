namespace ccalummiwebsite.Services {
    export class MessageService {
        public messageResource;

        constructor(private $resource:ng.resource.IResourceService){
            this.messageResource = $resource('api/messages/:id')
        }

        getMessages(){
            return this.messageResource.query();
        }

        getMessage(id){
            return this.messageResource.get({id: id})
        }
    }
    angular.module('ccalummiwebsite').service('messageService', MessageService);
}
