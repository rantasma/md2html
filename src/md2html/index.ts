
import {Filter} from './interfaces'

import {IgnoreRanges as Ranges} from './../ignoreRanges/index'

import {DefaultFilters} from './../default-filter/index'
import {defaultIgnoreMethods} from './../default-ignoreRanges/index'
// import {linkVariables} from './misselaneous/linkVariables'


export class Md2Html {
	private filters:Array<Filter>
	private variables:Array<string>
	private ranges:Ranges
	private htmlText:string;

	constructor(public text:string) {
		this.ranges=new Ranges(text)
		this.ranges.addMulti(defaultIgnoreMethods)

		this.filters=[...DefaultFilters]
	}

	toHtml():string{

		this.htmlText=this.text

		for (let i = 0; i < this.filters.length; i++) {

			this.filters.forEach(filter=>{

				if (filter.priority == i) {
					try{

						this.htmlText=filter.filter(this.htmlText,this.ranges,this.variables)

					}catch(e){

						console.error('it was a problem at filter ', filter.name)
						console.error(e)
					}

				}else if(filter.priority-1 > this.filters.length){

					console.error(`the filter ${filter.name} has a way higher priority number. it has to be between 0 - ${this.filters.length-1}`)
				}
			})
		}
		return this.htmlText
	}

	getHtml(){
		return this.htmlText
	}

	addFilter(filter:Filter):void{
		filter.priority=filter.priority || this.filters.length
		this.filters.push(filter)
	}

	removeFilter(filterName:string):void{
		this.filters=this.filters.filter(filter=>{
			return filterName != filter.name
		})
	}
}



// class Md2html {
// 	static Tag=Tag
//
// 	constructor() {}
//
// 	static getHtml(text:string){
// 		var data=linkVariables(text)
//
// 		var t=data.text;
// 		var variables=data.variables
//
// 		Md2html.Tag.forEach((func,index)=>{
// 			try{
// 				t=func(t,variables)
// 			}catch(e){
// 				console.error('Md2html error: somethis is not working between filter '+ (isNaN(index-1)?0:index-1) +' and '+index);
// 				if (this.Tag.length > 11) {
// 					console.error('be shure you are returning a multiline text in your custome filter')
// 				}
// 		})
//
// 		return t
// 	}
// 	static add(filter:Function,priority:number){
// 		if (!priority) {
// 			this.Tag.push(filter)
// 		}else{
//
// 			var copy=[...this.Tag].slice(0,priority-1)
// 			copy.push(filter)
// 			this.Tag=[
// 				...copy,
// 				...this.Tag.slice(priority-1)
// 			]
// 		}
//
// 	}
// }
