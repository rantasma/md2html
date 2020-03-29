export const hr=(text:string)=>{
	var a=text.replace(/\n{2,}={4,}\n/g,'\n\n<hr/>\n')
	var b=a.replace(/\n{2,}-{4,}\n/g,'\n\n<hr/>\n')
	return b
}
