import {IgnoreRanges} from '../ignoreRanges/index'
import {Variables} from '../variables/index'

export const anchors=(text:string,ignoreRanges:IgnoreRanges,variables:Variables)=>{

	ignoreRanges.update(text);

	var varPatt=new RegExp('\\[(.*)\\]\\[(.*)\\]','g')
	var patt=new RegExp('\\[(.*)\\]\\((.*)\\)','g')

		text=text.replace(varPatt,(match,p1,p2,offset,original)=>{
			if (ignoreRanges.analizeAll(offset,match.length).length <= 0) {
				var variable=variables.getVariables()[p2]
				return variable?`<a href="${variable}">${p1}</a>`:match;
			}
			return match
		})

		text=text.replace(patt,(match,p1,p2,offset,original)=>{
			if (ignoreRanges.analizeAll(offset,match.length).length <= 0) {
				return `<a href="${p2}">${p1}</a>`;
			}
			return match
		})

	ignoreRanges.update(text);

	return text
}
