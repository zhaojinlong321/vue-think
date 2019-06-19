import router from './router'
import store from './store'
import {getToken} from '@/utils/auth'

router.beforeEach(async(to, from, next)=>{
	const hasToken=getToken();

	if(hasToken){
		
		if(to.path==="/login"){
			next({ path: '/' })
		}else{
			
			next()  
		}
		
	}else{
		if(to.path!=="/login"){
			next({path:'/login'})
		}else{
			next()
		}
		
	}
})
router.afterEach(() => {
  // finish progress bar
})