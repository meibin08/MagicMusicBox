/*
* @authors :Bin Mei
* @date    :2017-06-20
* @description：sass编译配置文件
*/


var gulp = require('gulp')
var path = require('path')
var autoprefixer = require('gulp-autoprefixer')
var sass = require('gulp-sass')
var combiner = require('stream-combiner2')
var rename = require("gulp-rename")
var minifycss = require('gulp-minify-css')

gulp.task('sass', function () {
	
	var combined = combiner.obj([

		//监听sass目录下的全部scss, 也可以更改为只监听某一个scss文件
		gulp.src(['./sass/**/*.{wxss,scss}']), 
			sass().on('error', sass.logError),

			 //自动处理前缀
			autoprefixer([
				'iOS >= 8',
				'Android >= 4.1'
			]),

			//文件压缩，可选择性开启 默认不会开启
			//minifycss(), 

			//文件重命名，及输出到不同的目录
			rename(function (path) { 
				var item = path.basename;
				var name = 'index';

				if(item == 'app'){//根目录，

					item ='';
					name='app';

				}else{

					//以pages为输入点，但不包含pages目录，多层级目录请以 '_'或'-'为分割区分目录；
					//如 pages下的 home/list/say ; 则sass目录下的文件名为 home-list-say.scss ;
					item = 'pages/'+(item.replace(/(-|_)/g,'/'));

				};

				path.dirname = "/"+item;
				path.basename = name;
				path.extname = ".wxss";
				
		}),

			//所有文件输出出口从project为根节点
		gulp.dest('./project') 
	]);
});

gulp.task('watch', function () {
	 gulp.watch('./sass/**/*.scss',['sass']);
});


