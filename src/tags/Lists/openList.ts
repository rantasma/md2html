export const openList=(text:string,type:string,liPatt:string)=>{
	var splitData= text.split('\n')
	var newText=''

	var listIsOpen=false
	var levels=0;

	var embedPatt= new RegExp(`^(\\t+|\\s+)(${liPatt})`)
	var patt= new RegExp(`^(${liPatt})`)
	var closePatt= new RegExp('^$')
	for (let i = 0; i < splitData.length; i++) {
		var line = splitData[i];

		if (patt.test(line) && !listIsOpen) {
			listIsOpen=true
			levels++
			line=line.replace(patt,(match,p1)=>{
				return `<${type}>\n${p1}`
			})
		}else if(listIsOpen && embedPatt.test(line)){
			var currentLevel=getLevel(line)
			if (currentLevel>levels) {
				levels=currentLevel
				line=line.replace(embedPatt,(match,p1,p2)=>{
					return `<${type}>\n${p2}`
				})
			}
		}else if(closePatt.test(line)){
			listIsOpen=false
			levels=0
		}

		newText+=line+'\n'
	}

	return newText
}

var getLevel=(line:string)=>{
	var patt= new RegExp('^\\t*\\s*')

	return patt.exec(line)?patt.exec(line)[0].length+1 : 0
}
