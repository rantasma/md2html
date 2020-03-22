export const linkVariables =(text:string)=>{
	// var patt=new RegExp('\\[(.+)\\]:\s(.+)','mg')
	var patt=new RegExp('\\[(.*)\\]: (.*)','g')
	var variables={}

	var text = text.replace(patt,(match,p1,p2,offset,original)=>{
		variables[p1]=p2
		return ''
	})
	return {text,variables}
}
