export const emphasis=(text:string)=>{

	var bold_a=text.replace(/(<p>.*)\*{2}(\S.*\S)\*{2}/g,'$1 <b>$2</b> ')
	var bold_b=bold_a.replace(/(<p>.*)_{2}(\S.*\S)_{2}/g,' $1 <b>$2</b> ')

	text=bold_b


	var italica_a=text.replace(/(<p>.*)[^\*]\*(\S.*\S)\*[^\*]/g,' $1 <em>$2</em> ')
	var italica_b=italica_a.replace(/(<p>.*)[^_]_(\S.*\S)_/g,' $1 <em>$2</em> ')

	text=italica_b

	var scratch=text.replace(/(<p>.*)~{2}(\S.*\S)~{2}/g,'$1 <del>$2</del>')
	text=scratch

	return text
}


// const emphasisP=()=>{
// 	var splitData=text.split('\n')
// 	var pPatt=new RegExp('(<p>.*)')
// 	for (let i = 0; i < splitData.length; i++) {
// 		const line = splitData[i];
//
// 		if () {
//
// 		}
//
// 	}
// }
