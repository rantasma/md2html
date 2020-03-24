import {Range,RangeSection,RangeMethod} from './interfaces'

export class IgnoreRanges {

	private rangeMetodths:Array<RangeMethod>
	private ranges:Array<RangeSection>

	constructor(public text:string) {
		this.rangeMetodths=new Array()
	}

	getRanges(){
		this.rangeMetodths.forEach(method=>{
			this.ranges.push(method.filter(this.text,this.ranges))
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

	update(indexPosition:number,offsetLength:number){

		this.ranges.forEach(section =>{
			var ranges=section.ranges

			ranges.forEach(range=>{

				for (const key in range) {

					if (range.hasOwnProperty(key)) {

						var value:number = range[key];

						if (value > indexPosition) {

							value+=offsetLength
						}
					}
				}
			})
		})
	}

	analizeBySection(range:RangeSection,matchPosition:number,matchLength:number){

		var ranges=range.ranges

		for (let u = 0; u < ranges.length; u++) {
			const range = ranges[u];

			if (matchPosition > range.from && matchPosition+matchLength < range.to) {
					return false;
		    }else{
					return true;
					break
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
