export const row=(text:string,align)=>{
	var patt=new RegExp('^\\|(.*)\\|\\s*$','gm')
	align=align.split('|').slice(1,-1)
	var tableLength=align.length

	var text=text.replace(patt,(match,p1,offset,original)=>{
		var result='<tr>\n'
		var data=p1.split('|')
			.filter( substr =>{
				return substr.trim() != ''
			})
			.map( substr => {
		    	return substr.trim()
			});

		data.forEach( (substr,index) => {
			var alignSide=handleAlign(align[index])
		    result+=`<td align="${alignSide}">${substr}</td>\n`
		});
		if (data.length < align.length) {
			for (let i = 0; i < align.length - data.length; i++) {
				var alignSide=handleAlign(align[data.length+i])
		    	result+=`<td align="${alignSide}"></td>\n`
			}
		}
		result+='</tr>'
		return result
	})
	return text
}

function handleAlign(align){
	switch (true) {
		case align[0]==":" && align.slice(-1)[0]==":":
			return 'center'
			break;
		case align[0]==":":
			return 'left'
			break;
		case align.slice(-1)[0]==":":
			return 'right'
			break;

		default:
			return ""
			break;
	}
}
