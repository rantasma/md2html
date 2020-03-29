
import {Filter} from './interfaces'

import {IgnoreRanges as Ranges} from './../ignoreRanges/index'

import {DefaultFilters} from './../default-filter/index'
import {defaultIgnoreMethods} from './../default-ignoreRanges/index'
import {Variables} from './../variables/index'


export class Md2Html {
	private htmlText:string;
	private filters:Array<Filter>

	private variables:Variables
	private ranges:Ranges

	constructor(public text:string) {

		this.ranges=new Ranges()
		this.ranges.addMulti(defaultIgnoreMethods)

		this.variables=new Variables()

		this.filters=[...DefaultFilters]
	}

	toHtml():string{

		this.htmlText=this.text

		this.variables.getVariablesFromText(this.htmlText)

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
		console.log(this.ranges.getRanges());
		return this.htmlText
	}

	getHtml(){

		return this.htmlText
	}

	addFilter(filter:Filter):boolean{

		filter.priority=filter.priority == undefined ? this.filters.length :filter.priority

		if(!this.validateNewPriority(filter.priority)){
			return false
		}

		this.updateFilterPriority(filter.priority)
		this.filters.push(filter)
		this.sortFilters()

		return true
	}

	removeFilter(filterName:string):void{

		this.filters=this.filters.filter(filter=>{

			return filterName != filter.name
		})
	}

	changePriority(filterName:string,newPriority:number):boolean{

		if(!this.validateNewPriority(newPriority)){
			return false
		}
		var targetIndex=null
		var targetFilter=[...this.filters].filter((filter,i)=>{
			if (filter.name==filterName) {
				targetIndex=1
				return  true
			}
		})[0]


		if (targetFilter.priority > newPriority) {

			this.updateFilterPriority(newPriority,targetFilter.priority,true)

		}else{

			this.updateFilterPriority(targetFilter.priority,newPriority,false)
		}

		this.filters.map(filter=>{

			if (filter.name==filterName) {
				filter.priority=newPriority
			}
			return filter
		})

		this.sortFilters()

		return true
	}

	private sortFilters(){
		this.filters.sort((a,b)=>{
			return a.priority-b.priority
		})
	}

	private updateFilterPriority(
		from:number=0, to:number=this.filters.length-1, direction:boolean  = true
	):void{

		direction = typeof direction == 'boolean' && direction ? 1 : -1

		this.filters.map(filter=>{
			var priority=filter.priority

			if (priority >= from && priority <= to) {
				filter.priority+= (1*direction)
			}

			return filter
		})
	}

	private validateNewPriority(newPriority:number):boolean{

		if (newPriority < 0 || newPriority > this.filters.length) {

			console.error(`change priority ${newPriority} is not valid. is has to be a number between 0 - ${this.filters.length}`)
			return false

		}else{

			return true
		}
	}
}
