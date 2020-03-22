import {openList} from './openList'

export const list=(text:string,type:string,lipatt:any)=>{
	text=openList(text,type,lipatt);

	lipatt= new RegExp(`^\\t*\\s*${lipatt}`,'')
	var ulPatt=new RegExp(`^<${type}>$`)
	var endList=new RegExp('^$')

	var splitData=text.split('\n')
	var newText=''

	var onList=false
	var currentListOpen=0

	for (let i = 0; i < splitData.length; i++) {
		var line = splitData[i];


		if (ulPatt.test(line) && onList==false) {

			onList=true
			currentListOpen++

		}else if(endList.test(line) && onList){

			var closeTags=''

			for (let ulIndex = 0; ulIndex < currentListOpen; ulIndex++) {

				closeTags+=`</${type}>\n`
			}
			line=closeTags
			onList=false
			currentListOpen=0

		}else if(onList && lipatt.test(line)){

			line=line.replace(lipatt,'<li>$1</li>')
			console.log(line,'li');

		}else if(onList){

			currentListOpen+=ulPatt.test(line) ? 1 : 0
		}
		newText+=line+'\n'
	}

	return newText
}
