import {RangeMethod,RangeSection} from '../ignoreRanges/interfaces'

export const list:RangeMethod={
	name:'list',
	filter:function(text:string,ranges:Array<RangeSection>):RangeSection{

		var result:RangeSection={
			name:'lists',
			ranges:[]
		}

		var openIndexes:any=[]
		var closeIndexes:any=[]

		var patt=new RegExp('<(.*)[uo]l.*>')
		text.replace(patt,(match,p1,offset)=>{
			if (match.indexOf('</') >= 0) {
				closeIndexes.push(offset)
			}else{
				openIndexes.push(offset)
			}
			return match
		})

		openIndexes.forEach((openI,index)=>{
			result.ranges.push({
				from:openI,
				to:closeIndexes[index]
			})
		})

		return result
	}
}
