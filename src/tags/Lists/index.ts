import {ul} from './ul'
import {ol} from './ol'

export const list=(text:string)=>{
	text=ul(text)
	text=ol(text)

	return text
}
