/*
* Dependencias
*/
	var gulp         = require('gulp'),
			sass         = require( 'gulp-sass' ),
			scss         = require('gulp-scss'),
		  postcss      = require( 'gulp-postcss' ),
			autoprefixer = require('gulp-autoprefixer'),
			mqpacker     = require( 'css-mqpacker' ),
		  concat       = require('gulp-concat'),
			uglify       = require('gulp-uglify'),
			normalize    = require('node-normalize-scss').includePaths,
			gutil        = require( 'gulp-util' ),
			plumber      = require( 'gulp-plumber' ),
    	livereload   = require('gulp-livereload');
			// task         = 	[
		 //                  	'watch',
		 //              		];


	gutil.log(
	    gutil.colors.green('.')
	    + '\n' +
	    gutil.colors.green('=========================================')
	    + '\n' +
	    gutil.colors.white(' Bienvenido  Muvbe ')
	    + '\n' +
	    gutil.colors.green('=========================================')
  );

	gutil.log(gutil.colors.yellow('Compilando Muvbe'), gutil.colors.yellow('------>'));

/*
*Tareas de postcss
*/
function processors() {
    var processors = [
        autoprefixer,
        mqpacker,
        // csswring
    ];
    return gulp.src('./css/*.css')
        // .pipe( postcss(processors) )
        .pipe( gulp.dest('./css') );
};
/*
* Tareas de Sass
*/

gulp.task('site', function() {
  return gulp.src('sass/style.scss')
      .pipe(sass())
      .pipe(autoprefixer('last 10 version'))
      //.pipe(sourcemaps.write('.'))
      //.pipe(sass({outputStyle: 'compressed'}))
      .pipe(gulp.dest('css'))
});



gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('sass/*.scss', ['default']);


  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['css/**']).on('change', livereload.changed);


});


/*
* Snippet de errores
*/

var gulp_src = gulp.src;
gulp.src = function() {
  return gulp_src.apply(gulp, arguments)
      .pipe( plumber( function(error) {
      // Output an error message
      gutil.log( gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
      // emit the end event, to properly end the task
      this.emit('end');
    })
  );
};


/*
*  task default
*/


gulp.task('default',  function () {

	gulp.start('site')

	// gulp.watch(['./sass/*.scss'], task, processors());

    gutil.log(
	    gutil.colors.green('.')
	    + '\n' +
	    gutil.colors.green('=========================================')
	    + '\n' +
	    gutil.colors.white(' Verificando cambios en tus archivos sass')
	    + '\n' +
	    gutil.colors.green('=========================================')
  	);
});