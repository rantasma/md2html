import {list as listConvertion} from './listConvertion'

export const list=(text:string)=>{
	try{
		text=listConvertion(text,'ul','[-\\*]\\s(.*)')
		text=listConvertion(text,'ol','\\d+[\\.\\)]\\s(.*)')

		return text
	}catch{
		return text
	}
}
