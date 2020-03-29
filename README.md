# Markdown 2 Html

Md2html y a plain javascript library to convert markdown lenguaje
to plain and clean html, supporting all basic functionality from the core
markdown lenguaje and enable you to extends the functionality.

go and see the [DEMO](...) to learn about MarkDown languaje.

# Usage

```
	var converter=new Md2Html(text)

	// Add custom filter

	converter.addFilter({
		name:'hightlight-class',
		filter:(text)=>{
			text=text.replace(/<pre>(.*)/g,'<pre class="$1">')
			console.log("crash");
			return text
		}
	})

	var text=converter.toHtml()


		window.onload=()=>{
			document.querySelector('body').innerHTML+=text
		}

```


# Developer Guide
