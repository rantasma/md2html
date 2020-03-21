export const emphasis=(text:string)=>{

	var bold_a=text.replace(/\*{2}(.*)\*{2}/g,' <b>$1</b> ')
	var bold_b=bold_a.replace(/_{2}(.*)_{2}/g,' <b>$1</b> ')

	text=bold_b


	var italica_a=text.replace(/[^\*]\*(.*)\*[^\*]/g,' <em>$1</em> ')
	var italica_b=italica_a.replace(/[^_]_(.*)_/g,' <em>$1</em> ')

	text=italica_b

	var scratch=text.replace(/~{2}(.*)~{2}/g,'<del>$1</del>')
	text=scratch

	return text
}
