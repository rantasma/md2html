import {header} from './header'

export const open=(text)=>{
	var patt=new RegExp('(\n\\|(.*)\\|\n)((\n|-|\\|)\\s*\\W*-{3,}\\W*\\s*\\|)\n','g')

	var align;

	text=text.replace(patt,(match,p1,p2,p3,original)=>{
		var result='<table>\n'

		var h=header(
			match
			.split('\n')[1]
			.split('|')
		)
		result+=h

		align=match.split('\n')[2]

		return result
	})

	return {align,text}
}


export const close=(text:string)=>{
	var patt=new RegExp('(\\|.*\\|)\n{2}','g')
	text=text.replace(patt,`$1 \n </tbody>\n</table>\n\n`)
	return text
}
