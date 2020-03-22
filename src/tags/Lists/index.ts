import {list as listConvertion} from './listConvertion'

export const list=(text:string)=>{
	try{
		var ttext=listConvertion(text,'ul','[-\\*]\\s(.*)')
		ttext=listConvertion(text,'ol','\\d[\\.\\)]\\s(.*)')

		return text
	}catch{
		return text
	}
}
