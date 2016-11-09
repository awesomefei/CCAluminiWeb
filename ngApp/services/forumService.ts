namespace ccalummiwebsite.Services {
    export class ForumService{
        public forumResource;

        constructor(
            private $resource: ng.resource.IResourceService,
        ){
            this.forumResource=$resource('api/questions/:id', null, {
                saveAnswer:{
                    method:'POST',
                    url:'/api/questions/addAnswer/:questionId'
                },
                saveTag:{
                    method:'POST',
                    url:'/api/tags/addquestion/:tagId'
                },
                editQuestion:{
                    method:'PUT',
                    url:'/api/questions/'
                }
            })
        }
        saveAnswerOnService(questionId, answer){
            return this.forumResource.saveAnswer({questionId:questionId}, answer).$promise;
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
            return this.forumResource.get({id:id});
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
        getTagOnService(tagId){
            return this.tagResource.get({id:tagId}).$promise;
        }
    }


    angular.module('ccalummiwebsite').service('forumService', ForumService);
    angular.module('ccalummiwebsite').service('tagService', TagService);

}
