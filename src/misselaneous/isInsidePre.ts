export const isInsidePre=(ranges,lineIndex)=>{

	for (let i = 0; i < ranges.length; i++) {

		const range = ranges[i];

	    if (lineIndex > range.from && lineIndex < range.to) {
	    	return true
	    }

	}
}

export const  getPreRangesByIndex=(text)=>{

	var openpatt=new RegExp('<pre>','gm')
	var closepatt=new RegExp('</pre>','gm')

	var openIndexes=[]
	var closeIndexes=[]

	text.replace(openpatt,(match,offset)=>{
		openIndexes.push(offset)
	})

	text.replace(closepatt,(match,offset)=>{
		closeIndexes.push(offset)
	})
	var ranges=[]
	openIndexes.forEach((openI,index)=>{
		ranges.push({
			from:openI,
			to:closeIndexes[index]
		})
	})


	return ranges

}
export const  getPreRangesByLineIndex=(text)=>{
	var ranges=[]
	var splitData=text.split('\n')

	var range:any={}

	var openRange=false
	for (let i = 0; i < splitData.length; i++) {
		const line = splitData[i];
		if (!openRange&&line.indexOf('<pre>') >= 0) {
			openRange=true
			range.from=i
		}else if(openRange && line.indexOf('</pre>') >= 0){
			openRange=false
			range.to=i

			ranges.push({...range})
			range={}
		}

	}
	console.log('var');
	return ranges
}
