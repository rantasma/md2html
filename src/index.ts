import {Tag} from './tags/index'
import {linkVariables} from './misselaneous/linkVariables'


class Md2html {
	static Tag=Tag

	constructor() {}

	static getHtml(text:string){
		var data=linkVariables(text)

		var t=data.text;
		var variables=data.variables

		Md2html.Tag.forEach((func,index)=>{
			try{
				t=func(t,variables)
			}catch(e){
				console.error('Md2html error: somethis is not working between filter '+ (isNaN(index-1)?0:index-1) +' and '+index);
				if (this.Tag.length > 11) {
					console.error('be shure you are returning a multiline text in your custome filter')
				}
		})

		return t
	}
	static add(filter:Function,priority:number){
		if (!priority) {
			this.Tag.push(filter)
		}else{

			var copy=[...this.Tag].slice(0,priority-1)
			copy.push(filter)
			this.Tag=[
				...copy,
				...this.Tag.slice(priority-1)
			]
		}

	}
}


window.Md2html=Md2html
