import {Range,RangeSection,RangeMethod} from './interfaces'

export class IgnoreRanges {

	private rangeMetodths:Array<RangeMethod>
	private ranges:Array<RangeSection>

	constructor() {
		this.rangeMetodths=new Array()
		this.ranges=new Array()
	}
	getRanges(){
		return this.ranges
	}
	setRanges(text:string){
		this.rangeMetodths.forEach(method=>{
			this.ranges.push(method.filter(text,this.ranges))
		})
	}

	add(ignoreMethod:RangeMethod){
			this.rangeMetodths.push(ignoreMethod)
	}

	addMulti(ignoreMethods:Array<RangeMethod>){
			this.rangeMetodths=[...this.rangeMetodths,...ignoreMethods]
	}

	removeMulti([...methodNames]){
		this.rangeMetodths=this.rangeMetodths.filter((method:RangeMethod)=>{
			return methodNames.indexOf(method.name) >= 0
		})
	}

	removeRange([...rangeNames]){
		this.ranges=this.ranges.filter((rangeSection:RangeSection)=>{
			return rangeNames.indexOf(rangeSection.name) >= 0
		})
	}

	update(text:string){
		this.ranges=new Array()
		this.setRanges(text)
	}

	analizeBySection(range:RangeSection,matchPosition:number,matchLength:number){

		var ranges=range.ranges

		for (let u = 0; u < ranges.length; u++) {
			const range = ranges[u];

			if (matchPosition > range.from && matchPosition+matchLength < range.to) {
					return true;
		    }
		}
	}

	analizeBySectionName(sectionName:string,matchPosition:number,matchLength:number){
		const range = [...this.ranges].filter(method=>{
			return method.name == sectionName
		})[0]

		return this.analizeBySection(range,matchPosition,matchLength)
	}

	analizeAll(matchPosition:number,matchLength:number){
		var test=[]

		for (let i = 0; i < this.ranges.length; i++) {

			var range=this.ranges[i]

			if(this.analizeBySection(range,matchPosition,matchLength)){
				test.push({
					name:range.name,
					ignore:true
				})
			}
		}
		return test
	}

}
