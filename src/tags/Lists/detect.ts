export const open=(text:string,type)=>{
	var open;
	if (type == 'ul') {
		open=new RegExp('(\n[-\\*]\\s.*\n[-\\*])','g')
	}else if(type == 'ol'){
		open=new RegExp('(\n\\d+[\\.\\)]\\s.*\n\\d+[\\.\\)])','g')
	}

	text=text.replace(open,`\n<${type}>\n$1`)

	return text
}
export const close=(text,type)=>{
	var types;
	if (type == 'ul') {
		types={
			a:new RegExp('(\n[-\\*]\\s.*\n\n)','g'),
			b:new RegExp('(\n[-\\*]\\s.*\n)\n','g')
		}
	}else if (type == 'ol') {
		types={
			a:new RegExp('(\n\\d+[\\.\\)]\\s.*\n$)','g'),
			b:new RegExp('(\n\\d[\\.\\)]\\s.*\n)\n','g')
		}
	}

	var close_a=types.a.exec(text)
	var close_b=types.b.exec(text)

	var close= close_a ? 'a' : close_b ? 'b' : null
	var closeIndex=close_a||close_b;

	// closeIndex=closeIndex.length
	text=text.replace(types[close],`$1\n</${type}>\n\n`)

	return text
}
