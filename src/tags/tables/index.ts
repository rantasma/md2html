import {open,close} from './detect'
import {row} from './row'

export const table=(text:string)=>{
		var data=open(text)

		var align=data.align
		text=data.text
		text=close(text)
		text=row(text,align)
		return text
}
