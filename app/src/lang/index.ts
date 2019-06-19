import Vue from "vue"
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import en from './en'
import zh from './zh'
import elementZh from 'element-ui/lib/locale/lang/zh-CN'
import elementEn from 'element-ui/lib/locale/lang/en'
Vue.use(VueI18n)
const messages={
	en:{
		...en,
		elementEn
	},
	zh:{
		...zh,
		...elementZh
	}
}
export function getLanguage(){
	const chooseLanguage = Cookies.get('language');
	if(chooseLanguage)return chooseLanguage;
	const language = (navigator.language || navigator.browserLanguage).toLowerCase()
	const locales=Object.keys(messages);
	for(const locale of locales){
		if (language.indexOf(locale) > -1) {
	      return locale
	    }
	}
	return "en";
}

const i18n = new VueI18n({
	locale: getLanguage(),
  	messages
})
export default i18n