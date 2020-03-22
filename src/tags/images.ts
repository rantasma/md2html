export const images=(text:string)=>{
	var patt=new RegExp('!\\[(.*)\\]\\((.*)\\)','g')
	return text.replace(patt,`<img src="$2" alt="$1">`)
}
