import {Filter} from '../md2html/interfaces'

import {H} from './H'
import {hr} from './hr'
import {emphasis} from './emphasis'
import {list} from './Lists/index'
import {table} from './tables/index'
import {anchors} from './anchor'
import {paragraph} from './paragraph'
import {inlineCode} from './inlineCode'
import {codeBlock} from './codeBlock'
import {images} from './images'
import {blockquote} from './blockquote'

export const DefaultFilters:Array<Filter>=[
	{
		name:'codeBlocks',
		priority:0,
		filter:codeBlock,
	},
	{
		name:'tables',
		priority:1,
		filter:table
	},
	{
		name:'Blockquote',
		priority:2,
		filter:blockquote
	},
	{
		name:'lists',
		priority:3,
		filter:list
	},
	{
		name:'horizontalLine',
		priority:4,
		filter:hr
	},
	{
		name:'titles',
		priority:5,
		filter:H
	},
	{
		name:'paragraphs',
		priority:6,
		filter:paragraph
	},
	{
		name:'inlineCode',
		priority:7,
		filter:inlineCode
	},
	{
		name:'emphasis',
		priority:8,
		filter:emphasis
	},
	{
		name:'images',
		priority:9,
		filter:images,
	},
	// {
	// 	name:'anchors',
	// 	priority:10,
	// 	filter:anchors,
	// }
]
