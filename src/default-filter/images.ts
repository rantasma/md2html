import {IgnoreRanges} from '../ignoreRanges/index'
import {Variables} from '../variables/index'

export const images=(text:string,ignoreRanges:IgnoreRanges,variables:Variables)=>{

	ignoreRanges.update(text);


	text=imgWithVars(text,ignoreRanges,variables)

	ignoreRanges.update(text);

	return text
}


function imgWithVars(text:string,ignore:IgnoreRanges,vars:Variables){
	var varPatt=new RegExp('!\\[(.*)\\]\\((.*)\\)(\\d*)','g')

	text=text.replace(varPatt,(match,p1,p2,p3,offset,original)=>{
	// 	console.log(match);
		if (ignore.analizeAll(offset,match.length).length <= 0) {

			var variable=vars.getVariables()[p2]
	 		return variable ?
				`<img src="${variable}" alt="${p1}" style="max-width:${p3}px">` :
				`<img src="${p2}" alt="${p1}" style="max-width:${p3}px">`
		}else{
			return match
		}
	})
	return text
}
