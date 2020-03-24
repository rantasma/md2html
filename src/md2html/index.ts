
import {Filter} from './interfaces'

import {IgnoreRanges as Ranges} from './../ignoreRanges/index'

import {DefaultFilters} from './../default-filter/index'
import {defaultIgnoreMethods} from './../default-ignoreRanges/index'
import {Variables} from './../variables/index'
// import {linkVariables} from './misselaneous/linkVariables'


export class Md2Html {
	private htmlText:string;
	private filters:Array<Filter>

	private variables:Variables
	private ranges:Ranges

	constructor(public text:string) {

		this.ranges=new Ranges(text)
		this.ranges.addMulti(defaultIgnoreMethods)

		this.variables=new Variables()

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

		if(!this.validateNewPriority(filter.priority)){
			return false
		}

		this.updateFilterPriority(filter.priority)
		this.filters.push(filter)
	}

	removeFilter(filterName:string):void{

		this.filters=this.filters.filter(filter=>{

			return filterName != filter.name
		})
	}

	changePriority(filterName:string,newPriority:number){

		if(!this.validateNewPriority(newPriority)){
			return false
		}

		var targetFilter=this.filters[filterName]

		if (targetFilter.priority > newPriority) {

			this.updateFilterPriority(newPriority,targetFilter.priority)

		}else{

			this.updateFilterPriority(targetFilter.priority,newPriority,false)
		}

		this.filters[filterName].priority=newPriority
	}

	updateFilterPriority(from:number=0,to:number=this.filters.length,direction:boolean=true){

		for (let i = from; i <= to; i++) {

			const filter = this.filters[i];

			if (direction) {

				filter.priority++
			}else{

				filter.priority--
			}
		}
	}

	validateNewPriority(newPriority:number){

		if (newPriority < 0 || newPriority > this.filters.length) {

			console.error(`change priority ${newPriority} is not valid. is has to be a number between 0 - ${this.filters.length}`)
			return false

		}else{

			return true
		}
	}
}
