import {RangeMethod,RangeSection} from '../ignoreRanges/interfaces'

export const codeBlock:RangeMethod={
	name:'codeblock',
	filter:function(text:string,ranges:Array<RangeSection>):RangeSection{

		var result:RangeSection={
			name:'codeblock',
			ranges:[]
		}
		var patt=new RegExp('<.*pre.*>','gm')

		var openIndexes=[]
		var closeIndexes=[]

		text.replace(patt,( match:string, offset:number ) => {
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
