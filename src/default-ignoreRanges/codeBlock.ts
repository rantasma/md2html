import {RangeMethod,RangeSection} from '../ignoreRanges/interfaces'

export const codeBlock:RangeMethod={
	name:'codeblock',
	filter:function(text:string,ranges:Array<RangeSection>):RangeSection{

		var result:RangeSection={
			name:'codeblock',
			ranges:[]
		}

		var openpatt=new RegExp('<pre.*>','gm')
		var closepatt=new RegExp('</pre>','gm')

		var openIndexes=[]
		var closeIndexes=[]
		text.replace(openpatt,( match:string, offset:number ) => {
			openIndexes.push(offset)
		})

		text.replace(closepatt,( match:string, offset:number ) => {
			closeIndexes.push(offset)
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
