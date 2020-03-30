import {codeBlock} from './codeBlock'
import {list} from './lists'
import {RangeMethod} from './../ignoreRanges/interfaces'

export const defaultIgnoreMethods:Array<RangeMethod>=[
		codeBlock,
		list
]
