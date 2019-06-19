import router from './router'
import store from './store'
import {getToken} from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

const whiteList = ['/login']
router.beforeEach(async(to, from, next)=>{
	document.title = getPageTitle(to.meta.title)
	const hasToken=getToken();
	console.log(hasToken)
	if(hasToken){
		if(to.path==="/login"){
			next({ path: '/' })
		}else{
			const hasRoles=store.roles && store.roles.length > 0
			if(hasRoles){
				next()
			}else{
				try{
					const { roles } = await store.dispatch('getInfo')
					next()
				}catch(error){
					await store.dispatch('resetToken')
			        Message.error(error || 'Has Error')
			        next(`/login`)
				}
			}
		}
		
	}else{
		if(whiteList.indexOf(to.path) !== -1){
			next()
		}else{
			next('/login')
		}
		
	}
})
router.afterEach(() => {
  // finish progress bar
})