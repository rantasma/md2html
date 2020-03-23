import {getPreRangesByIndex,isInsidePre} from './isInsidePre'

export const linkVariables =(text:string)=>{
	// var patt=new RegExp('\\[(.+)\\]:\s(.+)','mg')
	var patt=new RegExp('\\[(.*)\\]: (.*)','g')
	var variables:any={}
	var ranges:any = getPreRangesByIndex(text);

	var text = text.replace(patt,(match,p1,p2,offset,original)=>{
		variables[p1]=p2
		if (!isInsidePre(ranges,offset)) {
			console.log('aaaavar');
			return ''
		}
		return match
	})
	return {text,variables}
}
