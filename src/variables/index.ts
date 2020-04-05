// import {} from './interfaces'

export class Variables{

	private variables:any;

	constructor(){
		this.variables={}
	}

	getVariablesFromText(text:string){

		var patt=new RegExp('\\[(.*)\\]: (.*)','g')

		var text = text.replace(patt,(match,p1,p2,offset,original)=>{
			this.variables[p1]=p2
			return match
		})

	}

	getVariables(){
		return this.variables
	}

	setVariables(key:string,val:any){
		this.variables[key]=val
	}

	remove(key:string){
		delete this.variables[key]
	}
}
