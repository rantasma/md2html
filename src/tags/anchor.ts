export const anchors=(text:string)=>{
	var patt=new RegExp('\\[(.*)\\]\\((.*)\\)','g')

	text=text.replace(patt,`<a href="$2">$1</a>`)

	return text
}
