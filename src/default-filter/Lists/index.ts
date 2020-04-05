import {IgnoreRanges} from '../../ignoreRanges/index'

export const list=(text:string,ignoreRanges:IgnoreRanges)=>{

	ignoreRanges.update(text);
	text=listBase(text,ignoreRanges,'[-\\*]','ul')
	ignoreRanges.update(text);
	text=listBase(text,ignoreRanges,'\\d+[\\.\\)]','ol')

	return text
}


const listBase=(text:string,ignoreRanges:IgnoreRanges,patt:string,type:string)=>{


	var splitData=text.split('\n')
	var newText=''

	var open=false
	var posIndex=0
	var openLevels=0

	var openPatt=new RegExp('^'+patt+'\\s+.*')
	var liPatt=new RegExp('^(\\t*)'+patt+'\\s+(.*)')

	splitData.forEach((line,index)=>{
		var prevLine=splitData[index-1]
		var lineLength=line.length

		if (
			!open &&
			openPatt.test(line)
			&& ignoreRanges.analizeAll(posIndex,line.length)
		) {

			open=true

			line=line.replace(liPatt,'<li>$2</li>')

			line=`\n<${type}>\n`+line
			openLevels++

		}else if(open && liPatt.test(line)){

			line=line.replace(liPatt,(match,p1,p2,offset)=>{

				if (p1.length >= openLevels) {
					openLevels++
					return `<${type}>\n<li>${p2}</li>`
				}else{

					return `<li>${p2}</li>`
				}
			})

		}else if(open && /^[\s\w]*$/.test(line)){
			line=''
			for (let i = 0; i < openLevels; i++) {

				line+=`</${type}>\n`
			}
			open=false
			openLevels=0
		}

		posIndex+=lineLength
		newText+=line+'\n'
	})

	return newText

}
