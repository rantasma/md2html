export const paragraph=(text:string)=>{
	var splitData=text.split('\n')
	var newText=''
	var tagIsOpen=false

	for (let i = 0; i < splitData.length; i++) {

		const line = splitData[i];

		if (!new RegExp('^[<\\s\\t]').test(line) ) {

			if(!tagIsOpen && line !== ''){

				newText+=`\n\n<p>${line}`
				tagIsOpen=true

			}else if(tagIsOpen && line == ''){

				newText+=`</p>\n`
				tagIsOpen=false
			}
			else{
				newText+='\n'+line
			}
		}else{
			newText+='\n'+line
		}
	}
	return newText
}
