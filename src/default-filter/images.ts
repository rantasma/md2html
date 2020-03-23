export const images=(text:string,links:any)=>{

	var varPatt=new RegExp('!\\[(.*)\\]\\[(.*)\\]')

	text=text.replace(varPatt,(match,p1,p2,offset,original)=>{
		return links[p2]?`<img src="${links[p2]}" alt="${p1}">`:match;
	})

	var patt=new RegExp('!\\[(.*)\\]\\((.*)\\)','g')
	return text.replace(patt,`<img src="$2" alt="$1">`)
}
