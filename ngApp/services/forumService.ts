namespace ccalummiwebsite.Services {
    export class ForumService{
        public forumResource;

        constructor(
            private $resource: ng.resource.IResourceService,
        ){
            this.forumResource=$resource('api/questions/:id', null, {
                // saveQuestion:{
                //     method:'PUT',
                //     url:'/api/questions'
                // },
                saveTag:{
                    method:'POST',
                    url:'/api/tags/addquestion/:tagId'
                },
                editQuestion:{
                    method:'PUT',
                    url:'/api/questions'
                }
            })
        }
        saveQuestionOnService(question){
            return this.forumResource.save(question).$promise;
        }
        getQuestionsOnService(){
            return this.forumResource.query();
        }
        editQuestionOnService(question){
            return this.forumResource.editQuestion(question);
        }
        getQuestionOnService(id){
            return this.forumResource.get({id:id}).$promise;
        }

    }
    export class TagService{
        public tagResource;
        constructor(
            private $resource: ng.resource.IResourceService,
        ){
            this.tagResource=$resource('/api/tags/:id')
        }
        getTagsOnService(){
            return this.tagResource.query();
        }
    }


    angular.module('ccalummiwebsite').service('forumService', ForumService);
    angular.module('ccalummiwebsite').service('tagService', TagService);

}
