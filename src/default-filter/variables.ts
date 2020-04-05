import {IgnoreRanges} from '../ignoreRanges/index'

export const variables =(text:string,ignoreRanges:IgnoreRanges)=>{

	var patt=new RegExp('\\[(.*)\\]: (.*)','g')

	ignoreRanges.update(text)

	var text = text.replace(patt,(match,p1,p2,offset,original)=>{

		var ignores=ignoreRanges.analizeAll(offset,match.length)

		if (ignores.length <= 0) {

			return ''
		}else{

			return match
		}

	})
	ignoreRanges.update(text)
	return text
}
