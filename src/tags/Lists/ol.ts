import {open,close} from './detect'

export const ol=(text:string)=>{
	var type='ol'
	text=open(text,type);
	text=close(text,type);
	return text
}
