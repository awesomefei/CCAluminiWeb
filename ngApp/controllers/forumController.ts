namespace ccalummiwebsite.Controllers {

    export class ForumController {
        public message = 'Top Questions';
        public tags;
        public questions;
        public question;
        public questionId;
        public selectedTag;

        constructor(
            private forumService:ccalummiwebsite.Services.ForumService,
            private tagService:ccalummiwebsite.Services.TagService,

        ){
            this.getQuestions();
            this.getTags();
        }
        getSelectedTagQuestions(tag){
            this.selectedTag=tag;
        }
        getQuestions(){
            this.questions=this.forumService.getQuestionsOnService();
        }
        getTags(){
            this.tags = this.tagService.getTagsOnService();
        }
        getQuestion(id){
            console.log('!!!!!!!!!!!!!!!!!!!!! id ' + id);

            this.questionId = id;
            this.forumService.getQuestionOnService(this.questionId);
            console.log('!!!!!!!!!!!!!!!!!!!!! this.questionId ' + this.questionId);

        }
        vote(id){
            this.question=this.forumService.getQuestionOnService(id);
            console.log(this.question);
            console.log(this.question.voteCount);
            this.question.voteCount++;
            console.log('!!!!!!!!!!!!!!!!!!!!!'+this.question.voteCount);
            this.forumService.editQuestionOnService(this.question);
        }

    }
    export class TaggedQuestionController{
        public message = 'hello from TaggedQuestionController';
        public tags;
        public questions;
        public question;
        constructor(
            private forumService:ccalummiwebsite.Services.ForumService,
            private tagService:ccalummiwebsite.Services.TagService,

        ){
            this.getQuestions();
            this.getTags();
        }
        getQuestions(){
            this.questions=this.forumService.getQuestionsOnService();
        }
        getTags(){
            this.tags = this.tagService.getTagsOnService();
        }

    }



    export class AskController{
        public message ='hello from AskQuestion Controller';
        public tags;
        public question;

        constructor(
            private tagService:ccalummiwebsite.Services.TagService,
            private forumService:ccalummiwebsite.Services.ForumService,
            private $state,

        ){
            this.getTags();
        }


        getTags(){
            this.tags = this.tagService.getTagsOnService();
        }
        saveQuestion(){
            this.forumService.saveQuestionOnService(this.question)
            .then(() =>{
                this.$state.go("forum");
            })
            .catch(() =>{
                alert('something went wrong in editDrink');
            })
        }
    }

}
