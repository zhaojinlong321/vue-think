const path = require('path')
function resolve(dir) {
 return path.join(__dirname, '.', dir)
}

module.exports = {
  	lintOnSave: false,
	chainWebpack: config => {
		config.module
		  .rule('svg')
		  .uses.clear()
		config.module
		  .rule('svg1')
		  .test(/\.svg$/)
		  .use('svg-sprite')
		    .loader('svg-sprite-loader')
		    .options({
		      symbolId: 'icon-[name]'
		    })
		    .end()
		  .include
		    .add(resolve('src/icons'))
		    .end()
	},
	devServer: {
	    proxy: {
	      '/admin': {
	        target: 'http://localhost:8081/', //对应自己的接口
	        changeOrigin: true,
	        ws: true,
	        pathRewrite: {
	          '^/admin': ''
	        }
	      }
	    }
	} 
}
