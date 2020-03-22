import {Tag} from './tags/index'
import {linkVariables} from './misselaneous/linkVariables'

export const md2html=(text:string)=>{

	var data=linkVariables(text)

	var t=data.text;
	var variables=data.variables

	Tag.forEach(func=>{
		t=func(t,variables)
	})

	return t
}

window.md2html=md2html
