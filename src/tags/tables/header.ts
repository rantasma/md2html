export const header=(h:Array<string>)=>{
	var header=	h.filter(substr=>{
		return substr.trim() != ''
	})
	.map(substr => {
	    return substr.trim()
	});

	var thsRow='<thead>\n<tr>\n'
	header.forEach(substr => {
	    thsRow+=`<th>${substr}</th>\n`
	});
	thsRow+='</tr>\n</thead>\n<tbody>\n'

	return thsRow
}
