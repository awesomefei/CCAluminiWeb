namespace ccalummiwebsite {

    angular.module('ccalummiwebsite', ['ui.router', 'ngResource', 'ui.bootstrap', 'yaru22.angular-timeago','angular-filepicker']).config((
        filepickerProvider,
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider,
        $httpProvider: ng.IHttpProvider
    ) => {
        filepickerProvider.setKey('AKajIDUelSihS59ufHbW1z');
        // Define routes
        $stateProvider
            .state('account', {
                url: '/account',
                templateUrl: '/ngApp/views/account/account.html',
                controller: ccalummiwebsite.Controllers.AccountController,
                controllerAs: 'vm'
            })
            .state('forum', {
                url: '/forum',
                templateUrl: '/ngApp/views/forum/forum.html',
                controller: ccalummiwebsite.Controllers.ForumController,
                controllerAs: 'vm'
            })
            .state('question',{
                url: '/question/:id',
                templateUrl: '/ngApp/views/forum/question.html',
                controller: ccalummiwebsite.Controllers.ForumController,
                controllerAs: 'vm'
            })
            .state('answer',{
                url: '/answer/:id',
                templateUrl: '/ngApp/views/forum/answer.html',
                controller: ccalummiwebsite.Controllers.AnswerController,
                controllerAs: 'vm'
            })
            .state('taggedQuestion',{
                url: '/taggedQuestion/:id',
                templateUrl: '/ngApp/views/forum/taggedQuestion.html',
                controller: ccalummiwebsite.Controllers.TaggedQuestionController,
                controllerAs: 'vm'
            })
            .state('chat', {
                url: '/chat',
                templateUrl: '/ngApp/views/chat.html',
                controller: ccalummiwebsite.Controllers.AccountCheckinController,
                controllerAs: 'vm'
                })
                .state('doublechat', {
                    url: '/doublechat',
                    templateUrl: '/ngApp/views/doubleChat.html',
                    controller: ccalummiwebsite.Controllers.AccountCheckinController,
                    controllerAs: 'vm'
<<<<<<< HEAD
                })
=======
                    })
            .state('ask', {
                url: '/ask',
                templateUrl: '/ngApp/views/forum/ask.html',
                controller: ccalummiwebsite.Controllers.AskController,
                controllerAs: 'vm'
            })
            .state('ask.step1',{
                templateUrl: '/ngApp/views/forum/ask.step1.html',
                controller: ccalummiwebsite.Controllers.AskController,
                controllerAs: 'vm',
            })
            .state('ask.step2',{
                url: '/ask.step2/:id',
                templateUrl: '/ngApp/views/forum/ask.step2.html',
                controller: ccalummiwebsite.Controllers.Step2Controller,
                controllerAs: 'vm',
            })
            .state('ask.step3',{
                templateUrl: '/ngApp/views/forum/ask.step3.html',
                controller: ccalummiwebsite.Controllers.AskController,
                controllerAs: 'vm',
            })
>>>>>>> ProfileInfo
            .state('account.timeline', {
                // url: '/account/about',
                templateUrl: '/ngApp/views/account/account.timeline.html',
                controller: ccalummiwebsite.Controllers.AccountController,
                controllerAs: 'vm',

            })
            .state('account.frineds', {
                // url: '/account/about',
                templateUrl: '/ngApp/views/account/account.friends.html',
                controller: ccalummiwebsite.Controllers.FriendsController,
                controllerAs: 'vm',

            })
            .state('account.friends', {
                // url: '/account/about',
                templateUrl: '/ngApp/views/account/account.friends.html',
                controller: ccalummiwebsite.Controllers.FriendsController,
                controllerAs: 'vm',

            })
            .state('account.about', {
                templateUrl: '/ngApp/views/account/account.about.html',
                controller: ccalummiwebsite.Controllers.AccountAboutController,
                controllerAs: 'vm',

            })
            .state('account.photo', {
                templateUrl: '/ngApp/views/account/account.photo.html',
                controller: ccalummiwebsite.Controllers.AccountPhotoController,
                controllerAs: 'vm',

            })
            .state('account.checkin', {
                templateUrl: '/ngApp/views/account/account.checkin.html',
                controller: ccalummiwebsite.Controllers.AccountCheckinController,
                controllerAs: 'vm',

            })
            .state('account.about.detailEdit', {
                templateUrl: '/ngApp/views/about/about.detailEdit.html',
                controller: ccalummiwebsite.Controllers.AccountAboutDetailEditController,
                controllerAs: 'vm',

            })
            .state('account.about.editworkandeducation', {
                templateUrl: '/ngApp/views/about/about.editworkandeducation.html',
                controller: ccalummiwebsite.Controllers.EditworkandeducationController,
                controllerAs: 'vm',

            })
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
                controller: ccalummiwebsite.Controllers.ActivityController,
                controllerAs: 'vm'
            })

            .state('login', {
                url: '/login',
                templateUrl: '/ngApp/views/login.html',
                controller: ccalummiwebsite.Controllers.LoginController,
                controllerAs: 'vm'
            })
            .state('inbox', {
                url: '/inbox',
                templateUrl: '/ngApp/views/inbox.html',
                controller: ccalummiwebsite.Controllers.MessageController,
                controllerAs: 'vm'
            })
            .state('message', {
                url: '/message/:id',
                templateUrl: '/ngApp/views/messageDetails.html',
                controller: ccalummiwebsite.Controllers.MessageDetailsController,
                controllerAs: 'vm'
            })
            .state('user', {
                url: '/user/:id',
                templateUrl: '/ngApp/views/user/user.html',
                controller: ccalummiwebsite.Controllers.UserController,
                controllerAs: 'vm'
            })
            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);

        $httpProvider.interceptors.push("BearerAuthInterceptor")
    });
    angular.module('ccalummiwebsite').factory('BearerAuthInterceptor',
   ($window:ng.IWindowService, $q:ng.IQService)=>{
       return {
           request: function(config){
               config.headers = config.headers || {};

               if($window.localStorage.getItem('token')){
                   config.headers.Authorization = 'Bearer ' + $window.localStorage.getItem('token');
               }
               return config || $q.when(config);
           },
           response: function(response){
               if(response.status === 401) {

               }
               return response || $q.when(response);
           }
       }
   });


}
