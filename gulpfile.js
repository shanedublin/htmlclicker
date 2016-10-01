'use-strict';


var gulp = require('gulp');
var inject = require('gulp-inject');
//var angularFilesort = require('gulp-angular-filesort')
var browserSync = require('browser-sync').create();
var mainBowerFiles = require('main-bower-files');
var del = require('del');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var nodemon = require('nodemon');
var replace = require('gulp-replace');
var config = require('./src/server/config/config.js');




function logError(error){
	  console.log(error.toString());
	  this.emit('end');
}

var mainBowerOverrides = {
		  overrides:{
		  }
	  	};
function logger(msg){
	  console.log(msg);
}


gulp.task('default',['start']);



gulp.task('browser-sync',function(){
	browserSync.init({
		server:{
			baseDir:config.publicFolder
		},		
		port: 3004,
		ui: {
			port: 3005
		}
		
	});
	
	gulp.watch("src/public/**",['dev']);
});

gulp.task('index-inject',function build(){
	gulp.src(config.index)
	.pipe(inject(gulp.src(mainBowerFiles(),{read:false}),{name: 'bower'}))
	.pipe(inject(gulp.src('./src/public/**/*.js') , {relative:true}))
	.pipe(inject(gulp.src('./src/public/**/*.css'), {relative:true}))	
  	.on('error',logError)
	.pipe(gulp.dest(config.buildFolder));
})



gulp.task('bower-dist', function(){
  return gulp.src(mainBowerFiles(mainBowerOverrides),{base:'bower_components'})
  .pipe(gulp.dest(config.buildFolder+'/bower_components'));
});


gulp.task('src-dist',function(){
  return gulp.src([config.sourceFolder+'/**','!'+config.index])
  .pipe(gulp.dest(config.buildFolder));
});


gulp.task('js-hint',function(){
  return gulp.src('src/**/*.js')
  .pipe(jshint({esversion: 6}))
  .pipe(jshint.reporter(logger));
});

gulp.task('clean',function clean(){
	return del(['!build/public','build/public/**']);
});



gulp.task('config-prod', function () {
	  return gulp.src('src/public/config/config.service.js')
	  .pipe(replace('gulpGoodness', 'location.origin'))
	    .pipe(gulp.dest(config.buildFolder+'/config/'));
	});

gulp.task('config-dev', function () {
	return gulp.src('src/public/config/config.service.js')
	  .pipe(replace('gulpGoodness', "'http://localhost:3000'"))
	    .pipe(gulp.dest(config.buildFolder+'/config/'));
	});

gulp.task('dev',dev);

function dev(callback){
	console.log('Running Dev Build');
	runSequence('clean','js-hint','index-inject','src-dist','config-dev','bower-dist',browserSync.reload);
	if(callback !== null && callback !== undefined){
		callback();		
	}
	
}

gulp.task('prod',function(){
	return runSequence('clean','js-hint','index-inject','src-dist','config-prod','bower-dist');
});


gulp.task('start',['browser-sync'],function(){	
			dev(browserSync.reload);
	nodemon({
		script:'src/server/app.js',
		ext: 'js html css',
		delay: 1000,
		port: 3003,
		ignore : [
		          'bower_components/',
		          'node_modules/',
		          'build/',
		          'src/public/'
		          ],
		env: {'NODE_ENV': 'developement'}
			
	}).on('restart',function(){
		//dev(browserSync.reload);
	})
	.on('start',function(){		
		//browserSync.reload();
	});
});