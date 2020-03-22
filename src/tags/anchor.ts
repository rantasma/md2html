export const anchors=(text:string,links:any)=>{
	var varPatt=new RegExp('\\[(.*)\\]\\[(.*)\\]')

	text=text.replace(varPatt,(match,p1,p2,offset,original)=>{
		return links[p2]?`<a href="${links[p2]}">${p1}</a>`:match;
	})

	var patt=new RegExp('\\[(.*)\\]\\((.*)\\)','g')

	text=text.replace(patt,`<a href="$2">$1</a>`)

	return text
}
