export const images=(text:string)=>{
	var patt=new RegExp('!\\[(.*)\\]\\((.*)\\)','g')
	console.log(patt.exec(text));
	return text.replace(patt,`<img src="$2" alt="$1">`)
}
