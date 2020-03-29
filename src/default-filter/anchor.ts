import {getPreRangesByIndex,isInsidePre} from './../misselaneous/isInsidePre'

export const anchors=(text:string,links:any)=>{

	var ranges = getPreRangesByIndex(text);
	console.log(ranges);
	var varPatt=new RegExp('\\[(.*)\\]\\[(.*)\\]','g')
	var patt=new RegExp('\\[(.*)\\]\\((.*)\\)','g')

		text=text.replace(varPatt,(match,p1,p2,offset,original)=>{
			if (!isInsidePre(ranges,offset)) {
				return links[p2]?`<a href="${links[p2]}">${p1}</a>`:match;
			}
			return match
		})

		text=text.replace(patt,(match,p1,p2,offset,original)=>{
			if (!isInsidePre(ranges,offset)) {
				return `<a href="${p2}">${p1}</a>`;
			}
			return match
		})

	return text
}
