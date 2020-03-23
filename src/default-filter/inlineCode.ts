export const inlineCode=(text:string)=>{
	var patt= new RegExp('`(.*)`')

	text=text.replace(patt,'<code>$1</code>')
	return text
}
