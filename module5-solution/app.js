(function() {
  'use strict';

  angular.module('restaurant', ['ngRoute'])
  .controller('MenuController', MenuController)
  .controller('SignUpController', SignUpController)
  .controller('MyInfoController', MyInfoController)
  .service('MenuService', MenuService)
  .config(Config);

  Config.$inject = ['$routeProvider'];
  function Config($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'templates/home.template.html'
    })
    .when('/sign-up', {
      templateUrl: 'templates/sign-up.template.html',
      controller: 'SignUpController',
      controllerAs: 'signUpCtrl'
    })
    .when('/my-info', {
      templateUrl: 'templates/my-info.template.html',
      controller: 'MyInfoController',
      controllerAs: 'myInfoCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
  }

  MenuController.$inject = ['MenuService'];
  function MenuController(MenuService) {
    var menuCtrl = this;
    menuCtrl.goToSignUp = function() {
      MenuService.setMenuItem(null);
    };
    menuCtrl.goToMyInfo = function() {
      MenuService.getMenuItem().then(function(menuItem) {
        if (menuItem) {
          MenuService.setMenuItem(menuItem);
        } else {
          MenuService.setMenuItem(null);
        }
      });
    };
  }

  SignUpController.$inject = ['MenuService'];
  function SignUpController(MenuService) {
    var signUpCtrl = this;
    signUpCtrl.favoriteMenuItem = '';
    signUpCtrl.submit = function() {
      MenuService.getMenuItemByShortName(signUpCtrl.favoriteMenuItem)
      .then(function(menuItem) {
        if (menuItem) {
          MenuService.setUserInfo(signUpCtrl.firstName, signUpCtrl.lastName, signUpCtrl.email, signUpCtrl.phone, menuItem);
          signUpCtrl.message = 'Your information has been saved.';
          signUpCtrl.firstName = '';
          signUpCtrl.lastName = '';
          signUpCtrl.email = '';
          signUpCtrl.phone = '';
          signUpCtrl.favoriteMenuItem = '';
          signUpCtrl.signUpForm.$setPristine();
          signUpCtrl.signUpForm.$setUntouched();
        } else {
          signUpCtrl.favoriteMenuItemError = 'No such menu number exists.';
        }
      });
    };
  }

  MyInfoController.$inject = ['MenuService'];
  function MyInfoController(MenuService) {
    var myInfoCtrl = this;
    var menuItem = MenuService.getMenuItemSync();
    if (menuItem) {
      myInfoCtrl.firstName = MenuService.getUserInfo().firstName;
      myInfoCtrl.lastName = MenuService.getUserInfo().lastName;
      myInfoCtrl.email = MenuService.getUserInfo().email;
      myInfoCtrl.phone = MenuService.getUserInfo().
