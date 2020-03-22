export const blockquote=(text:string)=>{
	var newText=''

	var splitData=text.split('\n')
	var tagIsOpen=false

	var openPatt=new RegExp('^>(\\s.+)','gm')
	var closePatt=new RegExp('^$','m')

	for (let i = 0; i < splitData.length; i++) {
		var line = splitData[i];

		if(openPatt.test(line)&&!tagIsOpen){

			line= `\n<bloquequote>\n${line.replace(/^>\s/,'')}`
			tagIsOpen=true

		}else if( line=='' && tagIsOpen){

			line= `\n</bloquequote>`
			tagIsOpen=false

		}else if(tagIsOpen && line != ''){

			line=line.replace(/^>\s*/,'')
		}

			newText+=line+'\n'
	}

	return newText

}
