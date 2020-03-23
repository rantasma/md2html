export const codeBlock=(text:string)=>{
	text=codeBlock_a(text)
	text=codeBlock_b(text)
	return text
}

const codeBlock_a=(text:string)=>{

	var splitData=text.split('\n')
	var codeBlockIsOpen=false;

	const openPatt=new RegExp('^`{3}(.*)','m');
	const closePatt=new RegExp('^`{3}(.*)','m');
	var newText=''


	for (let i = 0; i < splitData.length; i++) {
		var line = splitData[i];
		if (openPatt.test(line) && !codeBlockIsOpen) {

			line=line.replace(openPatt,'<pre>$1')
			codeBlockIsOpen=true
		}else if(closePatt.test(line)){

			line=line.replace(openPatt,'</pre>$1')
			codeBlockIsOpen=false

		}else if(codeBlockIsOpen){
			line=' '+line
		}
		newText+=line+'\n'
	}
	return newText

}

const codeBlock_b=(text:string)=>{

	var splitData=text.split('\n')
	var codeBlockIsOpen=false;

	const openPatt=new RegExp('^(\\t|\\s{4})(.+)','m');
	const closePatt=new RegExp('^$','g');
	var newText=''


	for (let i = 0; i < splitData.length; i++) {
		var line = splitData[i];
		if (openPatt.test(line) && !codeBlockIsOpen) {
			line='<pre>\n '+line
			codeBlockIsOpen=true
		}else if(closePatt.test(line) && codeBlockIsOpen){
			line="</pre>\n"
			codeBlockIsOpen=false
		}else if(codeBlockIsOpen){
			line=' '+line
		}
		newText+=line+'\n'
	}
	return newText
}
