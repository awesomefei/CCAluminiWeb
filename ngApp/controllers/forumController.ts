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

        export class AskController{
            public message ='hello from AskQuestion Controller';
            public tags;
            public question;
            public questionId;
            public tag;


            constructor(
                private tagService:ccalummiwebsite.Services.TagService,
                private forumService:ccalummiwebsite.Services.ForumService,
                private $state:ng.ui.IStateService,

            ){
                this.getTags();
                this.$state.go('ask.step1')

            }
            getTags(){
                console.log(this.questionId)
                 this.tagService.getTagsOnService()
                 .then((data) =>{
                     this.tags = data;
                 })
            }
            saveTag(){
                this.forumService.saveTagOnService(this.questionId, this.tag);
            }
            saveQuestion(){
                console.log('!!!!!!!!!');
                this.forumService.saveQuestionOnService(this.question)
                .then(()=>{
                    
                })
                .then(() =>{
                    this.$state.go("ask.step2");
                })
                .catch(() =>{
                    alert('something went wrong in saveQuestion');
                })
            }
        }
    export class Step2Controller{
        public message ='hello from AskQuestion Controller';
        public tags;
        public questionId;
        public tag;


        constructor(
            private tagService:ccalummiwebsite.Services.TagService,
            private forumService:ccalummiwebsite.Services.ForumService,

        ){
            this.getTags();

        }
        getTags(){
             this.tagService.getTagsOnService()
             .then((data) =>{
                 this.tags = data;
             })
        }
        saveTag(){
            this.forumService.saveTagOnService(this.questionId, this.tag);
        }

    }

    export class TaggedQuestionController{
        public message = 'hello from TaggedQuestionController';
        public tags;
        public tag;
        public questions;
        public question;
        constructor(
            private forumService:ccalummiwebsite.Services.ForumService,
            private tagService:ccalummiwebsite.Services.TagService,
            private $stateParams: ng.ui.IStateParamsService,
        ){
             this.getRelatedQuestions();
              this.getTags();
        }
        getRelatedQuestions(){

            this.tagService.getTagOnService(this.$stateParams['id'])
            .then((data)=>{
                this.tag = data;
                this.questions = data.questions;
            //     this.showTagItem();
             });
        }
        getTags(){
             this.tagService.getTagsOnService()
             .then((data) =>{
                  this.tags=data;
             });
        }
        // showTagItem(){
        //     //this.getTags();
        //      this.tagService.getTagsOnService()
        //      .then((data) =>{
        //          this.tags = data;
        //          console.log(this.tags.length);
        //      })
        //      .then(() =>{
        //          for(let i = 0; i < this.questions.length;i++){
        //              let tagArr=[];
        //             //  console.log('!!');
        //             //  console.log('!!!!!!!'+this.questions[0]._id);
        //             //  console.log(this.questions[1].tags[1]);
        //              for(let j = 0; j < this.tags.length; j++){
        //                 //  console.log('@@@@@@@@@@@@@@@'+this.tags.length);
        //                  let questionTagLen = this.questions[i].tags.length-1;
        //                 //  console.log('!!!!');
        //                 //  console.log(questionTagLen);
        //                 //  console.log('!!!!'+this.questions[i].tags[questionTagLen])
        //                  while(questionTagLen >= 0){
        //                      if(this.questions[i].tags[questionTagLen] == this.tags[j]._id){
        //                         //  console.log(this.tags[j].item);
        //                          tagArr.push(this.tags[j].item);
        //                      }
        //                      questionTagLen--;
        //                  }
        //              }
        //             this.arr=tagArr;
        //             console.log(this.arr);
        //           }
        //      })
        //
        //   }

      }




}
