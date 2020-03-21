import {open,close} from './detect'
export const ul=(text:string)=>{
	var type='ul'
	text=open(text,type);
	text=close(text,type);
	return text
}
