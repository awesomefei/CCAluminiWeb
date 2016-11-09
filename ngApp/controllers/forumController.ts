namespace ccalummiwebsite.Controllers {

    export class ForumController {
        public message = 'Top Questions';
        public tags;
        public questions;
        public question;
        public questionId;

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
        getQuestion(id){
            this.questionId = id;
            this.forumService.getQuestionOnService(this.questionId);

        }
        vote(id){
            this.question=this.forumService.getQuestionOnService(id);
            console.log(this.question);
            console.log(this.question.question);
            this.question.voteCount++;
            this.forumService.editQuestionOnService(this.question);
        }

    }
    export class AnswerController{
        public message = 'hellof from AnswerController';
        public question;
        public answer={};
        public questionId;

        constructor(
            private forumService:ccalummiwebsite.Services.ForumService,
            private tagService:ccalummiwebsite.Services.TagService,
            private $stateParams: ng.ui.IStateParamsService,

        ){
            this.questionId=$stateParams['id'];
            this.getQuestion();

        }
        saveAnswer(){
            this.forumService.saveAnswerOnService(this.questionId, this.answer)
            .then(()=>{
                this.getQuestion();
            })
            .then(() =>{
                this.answer='';
            })
        }
        getQuestion(){
            this.question = this.forumService.getQuestionOnService(this.$stateParams['id'])

        }
    }
    export class TaggedQuestionController{
        public message = 'hello from TaggedQuestionController';
        public tags;
        public tag;
        public questions;
        public question;
        public tagItem;
        public err = 'something wrong with showTagItem';
        constructor(
            private forumService:ccalummiwebsite.Services.ForumService,
            private tagService:ccalummiwebsite.Services.TagService,
            private $stateParams: ng.ui.IStateParamsService,
        ){
             this.getRelatedQuestions();
             this.getTags();
            //  this.showTagItem();
        }
        getRelatedQuestions(){

            this.tagService.getTagOnService(this.$stateParams['id']).then((data)=>{
                this.tag = data;
                this.questions = data.questions;
            });
        }
        // showTagItem(){
        //     for(let i = 0; i < this.questions.length();i++){
        //         for(let j = 0; j < this.tags.length; j++)
        //         if(this.tag.questions[i] == this.tags[j]._id){
        //             this.tagItem = this.tags[j].item;
        //             return this.tagItem;
        //         }
        //     }
        //     return this.err;
        //
        // }
        getTags(){
            this.tags = this.tagService.getTagsOnService();
        }

    }



    export class AskController{
        public message ='hello from AskQuestion Controller';
        public tags;
        public question;

        constructor(
            private tagId,

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
