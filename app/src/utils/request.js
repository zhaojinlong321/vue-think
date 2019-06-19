import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'


const service=axios.create({
	baseURL:"/admin/api" ,
	timeout:5000
})
service.interceptors.request.use(
	config=>{
		if(store.getters.token){
			config.headers['token'] = getToken()
		}
		return config
	},
	error=>{
		return Promise.reject(err)
	}
)
service.interceptors.response.use(
	response=>{
		const res=response.data;
		// if the custom code is not 20000, it is judged as an error.
		if(res.code!==20000){
			Message({
				message: res.message || 'error',
		        type: 'error',
		        duration: 5 * 1000
			})
			if(res.code === 50008 || res.code === 50012 || res.code === 50014){
				MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
		          confirmButtonText: 'Re-Login',
		          cancelButtonText: 'Cancel',
		          type: 'warning'
		        }).then(() => {
		          store.dispatch('resetToken').then(() => {
		            location.reload()
		          })
		        })
			}
			return Promise.reject(res.message || 'error')
		}else{
			return res;
		}
	},
	error=>{
		console.log('err' + error) // for debug
	    Message({
	      message: error.message,
	      type: 'error',
	      duration: 5 * 1000
	    })
	    return Promise.reject(error)
	}
)
export default service