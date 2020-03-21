import {ul} from './ul'
import {ol} from './ol'

export const list=(text:string)=>{
	text=ul(text)
	text=ol(text)

	var pattUl=new RegExp('\n-\\s(.*)','g')
	var pattOl=new RegExp('\n\\d+\\.\\s(.*)','g')

	text=text.replace(pattUl,'\n<li>$1</li>')
	text=text.replace(pattOl,'\n<li>$1</li>')

	return text
}
