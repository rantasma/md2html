export const variables =(text:string)=>{
	var patt=new RegExp('\\[(.*)\\]: (.*)','g')

	var text = text.replace(patt,(match,p1,p2,offset,original)=>{
		return ''
	})
	return text
}
