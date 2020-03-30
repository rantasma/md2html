import {IgnoreRanges} from '../ignoreRanges/index'

export const codeBlock_b=(text:string,ignoreRanges:IgnoreRanges)=>{

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

	ignoreRanges.update(text)

	return newText
}
