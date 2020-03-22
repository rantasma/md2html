import {open,close} from './detect'
export const ul=(text:string)=>{
	var type='ul'
	text=open(text,type);
	text=close(text,type);

	var pattUl=new RegExp('\n[-\\*]\\s(.*)','g')
	text=text.replace(pattUl,'\n<li>$1</li>')

	return text
}
