/*
* Dependencias
*/
	var gulp         = require('gulp'),
			sass         = require( 'gulp-sass' ),
		  // postcss      = require( 'gulp-postcss' ),
			autoprefixer = require('gulp-autoprefixer'),
			mqpacker     = require( 'css-mqpacker' ),
		  concat       = require('gulp-concat'),
			uglify       = require('gulp-uglify'),
			normalize = require('node-normalize-scss').includePaths,
			gutil        = require( 'gulp-util' ),
			plumber      = require( 'gulp-plumber' ),
			task         = [
		                  'sass',
		              ];

/*
*  Utilidades de arranque  de arraque
*/

	// var err = new gutil.PluginError('test', {
	// 							  message: 'something broke'
	// 							}),
	// var err = new gutil.PluginError({
	// 							  plugin: 'test',
	// 							  message: 'something broke'
	// 							}),
	// var err = new gutil.PluginError('test', 'something broke'),
	// var err = new gutil.PluginError('test', 'something broke', {showStack: true}),
	// var existingError = new Error('OMG')
	// var err = new gutil.PluginError('test', existingError, {showStack: true});
	gutil.log(
	    gutil.colors.green('.')
	    + '\n' +
	    gutil.colors.green('=========================================')
	    + '\n' +
	    gutil.colors.red(' Bienvenido  Muvbe ')
	    + '\n' +
	    gutil.colors.green('=========================================')
  );

	gutil.log(gutil.colors.green('Compilando Muvbe'), gutil.colors.red('------>'));

/*
*Tareas de postcss
*/
function processors() {
    var processors = [
        autoprefixer,
        mqpacker,
        // csswring
    ];
    return gulp.src('./stylesheets/*.css')
        // .pipe( postcss(processors) )
        .pipe( gulp.dest('./stylesheets') );
};
/*
* Tareas de Sass
*/

gulp.task( 'sass', function(){
  return gulp.src('./sass/style.sass')
    .pipe(sass({
        // indentedSyntax: true,
        errLogToConsole: true,
        sourceMap: 'sass',
        includePaths: [].concat(normalize),

      })
      .on('error', sass.logError))

    .pipe( gulp.dest('./stylesheets'));

});

gulp.task( 'sass:watch' , function () {
  gulp.watch('./sass/style.sass', ['sass']);
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
gulp.task('default', task,  function () {

	gulp.watch(['./sass/*.sass'], task, processors());

    gutil.log(
	    gutil.colors.green('.')
	    + '\n' +
	    gutil.colors.green('=========================================')
	    + '\n' +
	    gutil.colors.red(' Verificando cambios en tus archivos sass')
	    + '\n' +
	    gutil.colors.green('=========================================')
  	);
});