console.log('\'Allo \'Allo!');

// Set up the page routing
var app = angular.module('app', [
	'ngRoute',
	'ngAnimate',
  'ngSanitize'
]);

app.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {

		$routeProvider. 
		when('/home', {
			templateUrl: 'home.html',
			controller: 'HomeController'
		}).  
		when('/about', {
			templateUrl: 'about.html',
			controller: 'AboutController'
		}).
		when('/work', {  
			templateUrl: 'work.html',
			controller: 'WorkController'
		}).
		when('/contact', {
			templateUrl: 'contact.html',
			controller: 'ContactController'
		}).				
		otherwise({ 
			redirectTo : '/home' 
		});	
  
		$locationProvider.html5Mode(false);

	}
]);

// Header nav stuff

app.controller('HeaderController', [ '$scope', '$location', function($scope, $location) {
    $scope.isActive = function(route) {
        return route === $location.path();
    }
}]);

// end Header nav stuff

app.directive('isActiveNav', [ '$location', function($location) {
return {
 restrict: 'A',
 link: function(scope, element) {
   scope.location = $location;
   scope.$watch('location.path()', function(currentPath) {
     if('/#' + currentPath === element[0].attributes['href'].value) {
       element.parent().addClass('active');
     } else {
       element.parent().removeClass('active');
     }
   });
 }
 };
}]);

// set up scope for each page
app.controller('HomeController', ['$scope', '$interval', '$timeout', function($scope, $interval, $timeout) {
  $scope.pageClass = 'page-home';
  $('html').css("-webkit-animation-play-state", "running");
  $('h1.logo .symbol').css("-webkit-animation-play-state", "running");
  var heroText = $('h2.herotext'),
      subText = $('h2.subtext'),
      heroImg = $('.heroImg'),
  // Array of names
  firstNames = ['COOL', 'CRAZY', 'CAT'],
  secondNames = ['DUDE', 'DAMN', 'DOG'],
  firstNameCurrent = 1,
  secondNameCurrent = 1,
  // Array of images
  heroImages = ['1.jpg', '2.jpg', '3.jpg'],
  heroImageCurrent = 1;


  $(heroText).removeClass('hidden').addClass('fadeIn animated rotated');
  $(subText).removeClass('hidden').addClass('fadeIn animated rotated');
  // $scope.nameOne = _.sample(firstNames);
  // $scope.nameTwo = _.sample(secondNames);

  $scope.heroImage = heroImages[0];
  $scope.nameOne = firstNames[0];
  $scope.nameTwo = secondNames[0];

  // Create an interval and change the names
  var intervalPromise,
      delayMoveIn,
      delayMoveOut;
      TweenMax.to(".heroImg img", 8, {top:"-95px", left:"-95px", delay: 0.2, ease:Linear.easeOut});

  imgChange = $interval(function() {
    return delayFlipOut();

    function delayFlipOut() {
      $timeout(function() {

        TweenMax.to(".heroImg", 1, {rotationY:"0deg",rotationX:"360deg",opacity:"1", ease:Power1.easeOut});
        TweenMax.to(".heroImg img", 0, {top:"0px",left:"0px", delay: 0.5, ease:Power1.easeOut});
        
        // Change image up 1 array, add a delay so it happens as the image flips
        $timeout(function() {
          $scope.heroImage = heroImages[heroImageCurrent];
          heroImageCurrent = (heroImageCurrent + 1) % heroImages.length;
        }, 500);

        return delayFlipIn();
      }, 1000);
    }; 

    function delayFlipIn() {
      $timeout(function() {

        TweenMax.to(".heroImg", 0, {rotationY:"0deg",rotationX:"0deg",opacity:"1", delay: 0, ease:Power1.easeIn});
        TweenMax.to(".heroImg img", 8, {top:"-95px", left:"-95px", delay: 0.5, ease:Linear.easeNone});

      }, 1000);
    }; 


  }, 8000);

  textChange = $interval(function() {


    return delayMoveOut();

    function delayMoveOut() {
      $timeout(function() {
        $(heroText).find('span.nameOne')
        .removeClass('animated heroInDown')
        .addClass('animated heroOutUp');
        
        $(heroText).find('span.nameTwo')
        .removeClass('animated heroInUp')
        .addClass('animated heroOutDown');
        return delayMoveIn();
      }, 1000);
    }; 

    function delayMoveIn() {
      $timeout(function() {

        // $scope.nameOne = _.sample(firstNames);
        // $scope.nameTwo = _.sample(secondNames);

        $scope.nameOne = firstNames[firstNameCurrent];
        $scope.nameTwo = secondNames[secondNameCurrent];
        firstNameCurrent = (firstNameCurrent + 1) % firstNames.length;
        secondNameCurrent = (secondNameCurrent + 1) % secondNames.length;

        $(heroText).find('span.nameOne')
        .removeClass('animated heroOutUp')
        .addClass('animated heroInDown');
        
        $(heroText).find('span.nameTwo')
        .removeClass('animated heroOutDown')
        .addClass('animated heroInUp');
      }, 1000);
    }; 

  }, 5000);


  // Cancel the array on scope change
  $scope.$on('$destroy', function() {
    if(textChange)
      $interval.cancel(textChange);
  });

  // Create particle explosion
window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
};

var canvas = document.getElementById('particles');
var ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

var settings = {

    'basic': {
        'emission_rate': 50,
        'min_life': 12,
        'life_range': 18,
        'min_angle': 0,
        'angle_range': 360,
        'min_speed': 70,
        'speed_range': 15,
        'min_size': 0.5,
        'size_range': 1.5,
        'colour': '#ffffff'
    }
};

var Particle = function(x, y, angle, speed, life, size) {

    /* the particle's position */

    this.pos = {
        x: x || 0,
        y: y || 0
    };

    /* set specified or default values */

    this.speed = speed || 5;

    this.life = life || 1;

    this.size = size || 2;

    this.lived = 0;

    /* the particle's velocity */

    var radians = angle * Math.PI / 180;

    this.vel = {

        x: Math.cos(radians) * speed,
        y: -Math.sin(radians) * speed
    };
};

var Emitter = function(x, y, settings) {

    /* the emitter's position */

    this.pos = {

        x: x,
        y: y
    };

    /* set specified values */

    this.settings = settings;

    /* How often the emitter needs to create a particle in milliseconds */

    this.emission_delay = 1000 / settings.emission_rate;

    /* we'll get to these later */

    this.last_update = 0;

    this.last_emission = 0;

    /* the emitter's particle objects */

    this.particles = [];
};

Emitter.prototype.update = function() {

    /* set the last_update variable to now if it's the first update */

    if (!this.last_update) {

        this.last_update = Date.now();

        return;
    }

    /* get the current time */

    var time = Date.now();

    /* work out the milliseconds since the last update */

    var dt = time - this.last_update;

    /* add them to the milliseconds since the last particle emission */

    this.last_emission += dt;

    /* set last_update to now */

    this.last_update = time;

    /* check if we need to emit a new particle */

    if (this.last_emission > this.emission_delay) {

        /* find out how many particles we need to emit */

        var i = Math.floor(this.last_emission / this.emission_delay);

        /* subtract the appropriate amount of milliseconds from last_emission */

        this.last_emission -= i * this.emission_delay;

        while (i--) {

            /* calculate the particle's properties based on the emitter's settings */

            this.particles.push(
                new Particle(
                    0,
                    0,
                    this.settings.min_angle + Math.random() * this.settings.angle_range,
                    this.settings.min_speed + Math.random() * this.settings.speed_range,
                    this.settings.min_life + Math.random() * this.settings.life_range,
                    this.settings.min_size + Math.random() * this.settings.size_range
                )
            );
        }
    }

    /* convert dt to seconds */

    dt /= 1000;

    /* loop through the existing particles */

    var i = this.particles.length;

    while (i--) {

        var particle = this.particles[i];

        /* skip if the particle is dead */

        if (particle.dead) {
            
            /* remove the particle from the array */
            this.particles.splice(i, 1);
            
            continue;   
        }

        /* add the seconds passed to the particle's life */

        particle.lived += dt;

        /* check if the particle should be dead */

        if (particle.lived >= particle.life) {

            particle.dead = true;

            continue;
        }

        /* calculate the particle's new position based on the seconds passed */

        particle.pos.x += particle.vel.x * dt;
        particle.pos.y += particle.vel.y * dt;

        /* draw the particle */

        ctx.fillStyle = this.settings.colour;

        var x = this.pos.x + particle.pos.x;
        var y = this.pos.y + particle.pos.y;

        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    }
};

var emitter = new Emitter(canvas.width / 2, canvas.height / 2, settings.basic);

function loop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    emitter.update();

    requestAnimFrame(loop);
}

loop();

}]); 

app.controller('AboutController', ['$scope', function($scope) {
	$scope.pageClass = 'page-about';
  $('html').css("-webkit-animation-play-state", "running");
  $('h1.logo .symbol').css("-webkit-animation-play-state", "running");
}]); 

app.controller('WorkController', ['$scope', '$http', function($scope, $http) {
    $('html').css("-webkit-animation-play-state", "paused");
    $('h1.logo .symbol').css("-webkit-animation-play-state", "paused");

    $http.get('scripts/workfeed.json').
    // $http.get('https://cdn.contentful.com/spaces/playground/entries/nyancat?access_token=1d067d61111a2a1a06fdfc26e841e8a32de88d484277c4300a763b4c040c2316').
      success(function(data, status, headers, config) {
        $scope.work = data;
      }).
      error(function(data, status, headers, config) {
        // log error
    }); 

    $('body').on('mouseenter', 'li', function() {
      console.log('mouseenter');
      $(this).find('p').stop().removeClass('hidden fadeOutRight').addClass('animated fadeInRight');
      // $(this).find('p').removeClass('hidden ');
      // $('html').css("-webkit-animation-play-state", "paused");
    })
    .on('mouseleave', 'li', function() {
      console.log('mouseleave');
      $(this).find('p').stop().removeClass('fadeInRight').addClass('animated fadeOutRight');
      // $(this).find('p').addClass('hidden');
      // $('html').css("-webkit-animation-play-state", "running");
    });



}]);

app.controller('ContactController', ['$scope', function($scope) {
	$scope.pageClass = 'page-contact'; 
  $('html').css("-webkit-animation-play-state", "running");
  $('h1.logo .symbol').css("-webkit-animation-play-state", "running");
}]); 

// Randomly generate triangles for the background
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    canvasWidth = canvas.width = 800,
    canvasHeight = canvas.height = 800, 
    // canvasWidth = canvas.width = window.innerWidth,
    // canvasHeight = canvas.height = window.innerHeight,
    cellWidth = 40,
    cellHeight = 40, 
    columns = Math.ceil(canvasWidth / cellWidth),
    rows = Math.ceil(canvasHeight / cellHeight),
    rand = function(min, max){
          return Math.floor( (Math.random() * (max - min + 1) ) + min); 
    },
    iCol, iRow; 

// Canvas triangles
var renderTriangles = function(){
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  for(iCol = 0; iCol < columns; iCol++){
    for(iRow = 0; iRow < rows; iRow++){       
      var pattern = rand(0, 3);
      var lightness = rand(1, 1.2);       
      context.beginPath();      
      if(pattern === 0){
        context.moveTo(iCol * cellWidth, iRow * cellHeight);      
        context.lineTo(iCol * cellWidth + cellWidth, iRow * cellHeight);
        context.lineTo(iCol * cellWidth, iRow * cellHeight + cellHeight);
      } else if(pattern === 1){ 
        context.moveTo(iCol * cellWidth + cellWidth, iRow * cellHeight);      
        context.lineTo(iCol * cellWidth + cellWidth, iRow * cellHeight + cellHeight);
        context.lineTo(iCol * cellWidth, iRow * cellHeight);
      } else if(pattern === 2){
        context.moveTo(iCol * cellWidth + cellWidth, iRow * cellHeight + cellHeight);      
        context.lineTo(iCol * cellWidth, iRow * cellHeight + cellHeight);
        context.lineTo(iCol * cellWidth + cellWidth, iRow * cellHeight);
      } else {
        context.moveTo(iCol * cellWidth, iRow * cellHeight + cellHeight);      
        context.lineTo(iCol * cellWidth, iRow * cellHeight);
        context.lineTo(iCol * cellWidth + cellWidth, iRow * cellHeight + cellHeight); 
      }
      context.fillStyle = 'rgba(255, 255, 255, 0.'+lightness+')';
      context.closePath();
      context.fill(); 
    };
  };
  
  // Generate triangles, save as an image and place as background image for body
  var trianglesImg = canvas.toDataURL("image/png");
  $('body').css('background-image', 'url("'+ trianglesImg +'")');
};


renderTriangles();  

// Animate gradient

var colors = new Array(
  [17,255,189],
  [85,98,112],
  [255,107,107],
  [255,209,148],
  [24,80,195],
  [255,128,0]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{
var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "#"+((r1 << 16) | (g1 << 8) | b1).toString(16);

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "#"+((r2 << 16) | (g2 << 8) | b2).toString(16);

 $('html, .symbol').css({
    background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
  
  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}

// setInterval(updateGradient,10);

// Global scripts
$('header').removeClass('hidden').addClass('fadeInDown animated');
