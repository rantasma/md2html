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

	update(offset:number,length:number){

	}

	analize(matchPosition:number,matchLength:number){
		var test=[]

		for (let i = 0; i < this.ranges.length; i++) {
			const ranges = this.ranges[i].ranges;

			var ignore:any={name:this.ranges[i].name}

			for (let u = 0; u < ranges.length; u++) {
				const range = ranges[u];

				if (matchPosition > range.from && matchPosition+matchLength < range.to) {
						ignore.ignore=false;
			    }else{
						ignore.ignore=true;
						break
				}
			}
			test.push(ignore)
		}
		return test
	}
}
