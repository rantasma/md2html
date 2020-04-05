export const H:Function=(text:string)=>{
	var patt_a=new RegExp('^(#+)\\s(.+)\\n','gm');

	text=text.replace(patt_a,(match:any,p1:string, p2:string, offset:number, original:string)=>{

		var hType=p1.length
		var id=p2.replace(/[\.*\s*]/g,'-').toLowerCase()

		return `<h${hType} id="${id}">${p2}</h${hType}>\n`
	})

	var patt_b=new RegExp('^(.+)\n(={3,}|-{3,})','gm');

	text= text.replace(patt_b,(match:any,p1:string,p2:string,offset:number, original:string)=>{

		var htype=p2[0]=='='?'h1':p2[0]=='-'? 'h2' : 'p'

		var id=p1.replace(/[\.*\s*]/g,'-').toLowerCase()

		return `<${htype} id="${id}">${p1}</${htype}>\n`
	})

	return text
}
