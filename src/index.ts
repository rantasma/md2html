import {text} from './mdText'
import {Tag} from './tags/index'

export const md2html=(text:string)=>{

	var t=text;

	t=Tag.hr(t)
	t=Tag.list(t)
	t=Tag.table(t)
	t=Tag.codeBlock(t)
	t=Tag.blockquote(t)
	t=Tag.H(t)
	t=Tag.images(t)
	t=Tag.paragraph(t)
	t=Tag.inlineCode(t)
	t=Tag.emphasis(t)
	t=Tag.anchors(t)

	return t
}

var t=md2html(text)

console.log(t);
window.onload=()=>document.querySelector('body').innerHTML+=t
