import {IgnoreRanges} from '../ignoreRanges/index'

export const emphasis=(text:string,ignoreRanges:IgnoreRanges)=>{
	ignoreRanges.update(text)

	//bold
	text=emphasisBase(text,ignoreRanges,
		'(.*)\\*{2}(\\S.*\\S)\\*{2}(.*)',
		'b'
	)
	ignoreRanges.update(text)

	text=emphasisBase(text,ignoreRanges,
		'(.*)_{2}(\\S.*\\S)_{2}(.*)',
		'b'
	)
	ignoreRanges.update(text)

	//italica
	text=emphasisBase(text,ignoreRanges,
		'(.*[^\\*])\\*(\\S.*\\S)\\*([^\\*].*)',
		'em'
	)
	ignoreRanges.update(text)

	text=emphasisBase(text,ignoreRanges,
		'(.*[^_])_(\\S.*\\S)_([^_].*)',
		'em'
	)
	ignoreRanges.update(text)

	text=emphasisBase(text,ignoreRanges,
		'(.*)~{2}(\\S.*\\S)~{2}(.*)',
		'del'
	)
	ignoreRanges.update(text)


	return text
}

var emphasisBase=(text:string,ignoreRanges:IgnoreRanges,patt:string,type:string)=>{

	var pattern = new RegExp(patt,'g')

	return text.replace(pattern,(match,p1,p2,p3,offset)=>{
		if (ignoreRanges.analizeAll(offset,match.length).length <= 0) {
			return `${p1} <${type}>${p2}</${type}> ${p3}`
		}else{
			return match
		}
	})
}
