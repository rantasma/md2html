
export interface Range {
	from:number;
	to:number;
}

export interface RangeSection{
	name:string;
	ranges:Array<Range>
}

export interface RangeMethod{
	name:string;
	filter:Function;
}
