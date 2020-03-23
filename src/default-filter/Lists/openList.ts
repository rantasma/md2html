export const openList=(text:string,type:string,liPatt:string,altLiPatt:string)=>{

	var splitData= text.split('\n')
	var newText=''

	var listIsOpen=false
	var levels=0;
	var isPreCode=false
	var openLists=0


	var patt= new RegExp(`^(${liPatt})`)
	var embedPatt= new RegExp(`^(\\t+|\\s+)+(${liPatt})`)

	var preCodePatt=new RegExp('<pre>')
	var closePatt= new RegExp('^$')

	for (let i = 0; i < splitData.length; i++) {

		var line = splitData[i];

		if (preCodePatt.test(splitData[i]) && !isPreCode && !listIsOpen) {

			isPreCode=true

		}else if (!isPreCode && patt.test(line) && !listIsOpen  ) {

			listIsOpen=true
			levels++
			openLists++;
			line=line.replace(patt,(match,p1,p2)=>{
				return `<${type}>\n${p1}`
			})

		}else if(listIsOpen && embedPatt.test(line) && !isPreCode ) {

			var currentLevel=getLevel(line)

			if (currentLevel>levels) {
				openLists++;
				levels=currentLevel

				line=line.replace(embedPatt,(match,p1,p2)=>{

					return `<${type}>\n${p1}${p2}`
				})
			}

		}else if(closePatt.test(line) && listIsOpen ){

			listIsOpen=false
			levels=0

			var closeTags=''
			for (let ulIndex = 0; ulIndex < openLists; ulIndex++) {
				closeTags+=`</${type}>`
			}

			line=closeTags
			openLists=0

		}else if( isPreCode && /<\/pre>/.test(line)){

			isPreCode=false

		}else if(listIsOpen && /<.?pre>/.test(line) ){
			line=''
		}

		newText+=line+'\n'
	}

	return newText
}

var getLevel=(line:string)=>{
	var patt= new RegExp('^\\t*\\s*')

	return patt.exec(line)?patt.exec(line)[0].length+1 : 0
}
