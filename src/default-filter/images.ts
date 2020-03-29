import {IgnoreRanges} from '../ignoreRanges/index'
import {Variables} from '../variables/index'

export const images=(text:string,ignoreRanges:IgnoreRanges,variables:Variables)=>{

	ignoreRanges.update(text);

	text=imgWithVars(text,ignoreRanges,variables)

	ignoreRanges.update(text);

	text=imgSimple(text,ignoreRanges)

	ignoreRanges.update(text);

	return text
}

function imgSimple(text:string,ignore:IgnoreRanges){

	var patt=new RegExp('!\\[(.*)\\]\\((.*)\\)','g')
	return text.replace(patt,`<img src="$2" alt="$1">`)
}

function imgWithVars(text:string,ignore:IgnoreRanges,vars:Variables){
	var varPatt=new RegExp('!\\[(.*)\\]\\[(.*)\\]')

	text=text.replace(varPatt,(match,p1,p2,offset,original)=>{
		if (ignore.analizeAll(offset,match.length).length <= 0) {

			var variable=vars.getVariables()[p2]
			return variable?`<img src="${variable}" alt="${p1}">`:match;
		}
	})
	return text
}
