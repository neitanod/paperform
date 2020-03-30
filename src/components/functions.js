async function readFile(file)
{
    const promise = new Promise( (resolve, reject) => {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    return resolve(allText);
                }
            }
        }
        rawFile.send(null);
    });
    return promise;
}

async function addCssFile(file)
{
    const css = await readFile(file);
    const tag = document.createElement('style');
    tag.innerHTML = css;
    document.body.appendChild(tag);
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
}

export default {
    readFile: readFile,
    addCssFile: addCssFile,
    debounce: debounce,
}
