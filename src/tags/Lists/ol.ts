import {open,close} from './detect'

export const ol=(text:string)=>{
	var type='ol'
	text=open(text,type);
	text=close(text,type);

	var pattOl=new RegExp('\n\\d+[\\.\\)]\\s(.*)','g')
	text=text.replace(pattOl,'\n<li>$1</li>')

	return text
}
