import {IgnoreRanges} from '../ignoreRanges/index'

export const codeBlock=(text:string,ignoreRanges:IgnoreRanges)=>{
	text=codeBlock_a(text)
	// text=codeBlock_b(text)

	ignoreRanges.update(text)

	// console.log(text.length);

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
	const closePatt=new RegExp('^[^\\s{4,}\\t+]','g');
	var newText=''


	for (let i = 0; i < splitData.length; i++) {
		var line = splitData[i];
		if (openPatt.test(line) && !codeBlockIsOpen) {
			line='<pre>\n '+line
			codeBlockIsOpen=true
		}else if(closePatt.test(line) && codeBlockIsOpen){
			line.replace('\n','')
			line='</pre>\n\n'+line
			codeBlockIsOpen=false
		}else if(codeBlockIsOpen){
			line=' '+line
		}
		newText+=line+'\n'
	}
	return newText
}
