export const H:Function=(text:string)=>{
	var patt=new RegExp('^(#+)\\s(.+)\\n','gm');
	return text.replace(patt,(match:any,p1:string, p2:string, offset:number, original:string)=>{

		var hType=p1.length
		var id=p2.replace(/[\.*\s*]/g,'-').toLowerCase()

		return `<h${hType} id="${id}">${p2}</h${hType}>\n`
	})
}
