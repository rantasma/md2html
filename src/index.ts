import {text} from './mdText'
import {Tag} from './tags/index'
import {linkVariables} from './misselaneous/linkVariables'

export const md2html=(text:string)=>{

	var data=linkVariables(text)

	var t=data.text;
	var variables=data.variables

	t=Tag.hr(t)
	t=Tag.list(t)
	t=Tag.table(t)
	t=Tag.codeBlock(t)
	t=Tag.blockquote(t)
	t=Tag.H(t)
	t=Tag.images(t,variables)
	t=Tag.paragraph(t)
	t=Tag.inlineCode(t)
	t=Tag.emphasis(t)
	t=Tag.anchors(t,variables)

	return t
}

var t=md2html(text)

console.log(t);
window.onload=()=>document.querySelector('body').innerHTML+=t
