export const codeBlock=(text:string)=>{

	var splitData=text.split('\n')
	var codeBlockIsOpen=false;

	const openPatt=new RegExp('^`{3}','m');
	const closePatt=new RegExp('^`{3}');
	var newText=''


	for (let i = 0; i < splitData.length; i++) {
		var line = splitData[i];
		if (openPatt.test(line) && !codeBlockIsOpen) {

			line='<pre>'
			codeBlockIsOpen=true
		}else if(closePatt.test(line)){

			line='</pre>'
			codeBlockIsOpen=false

		}else if(codeBlockIsOpen){
			line=' '+line
		}
		newText+=line+'\n'
	}
	return newText
}
