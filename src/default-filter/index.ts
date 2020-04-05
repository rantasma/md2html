import {Filter} from '../md2html/interfaces'

import {H} from './H'
import {hr} from './hr'
import {emphasis} from './emphasis'
import {list} from './Lists/index'
import {table} from './tables/index'
import {anchors} from './anchor'
import {paragraph} from './paragraph'
import {inlineCode} from './inlineCode'
import {codeBlock_a} from './codeBlock_a'
import {codeBlock_b} from './codeBlock_b'
import {images} from './images'
import {blockquote} from './blockquote'
import {variables} from './variables'

export const DefaultFilters:Array<Filter>=[
	{
		name:'codeBlocks_a',
		priority:0,
		filter:codeBlock_a,
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
		name:'codeBlocks_b',
		priority:4,
		filter:codeBlock_b,
	},
	{
		name:'horizontalLine',
		priority:5,
		filter:hr
	},
	{
		name:'titles',
		priority:6,
		filter:H
	},
	{
		name:'paragraphs',
		priority:7,
		filter:paragraph
	},
	{
		name:'inlineCode',
		priority:8,
		filter:inlineCode
	},
	{
		name:'emphasis',
		priority:9,
		filter:emphasis
	},
	{
		name:'images',
		priority:10,
		filter:images,
	},
	{
		name:'variables',
		priority:11,
		filter:variables
	},
	{
		name:'anchors',
		priority:12,
		filter:anchors,
	}
]
