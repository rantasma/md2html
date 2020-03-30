import {IgnoreRanges} from '../ignoreRanges/index'

export const codeBlock_a=(text:string,ignoreRanges:IgnoreRanges)=>{
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
		}else if(codeBlockIsOpen && closePatt.test(line)){

			line=line.replace(openPatt,'</pre>$1')
			codeBlockIsOpen=false

		}else if(codeBlockIsOpen){
			line=line.replace(/</g,'&lt;')
			line=line.replace(/>/g,'&gt;')
			line=line.replace(/\\`/g,'`')
			line=' '+line
		}
		newText+=line+'\n'
	}

	return newText
	ignoreRanges.update(text)

	return text
}
