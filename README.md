readline-literal
================

Install
-------

`npm install --save readline-literal`

Example 1
---------

```javascript
//Notice the call right after the require.
const rll = require('readline-literal')();

rll`Hello ${'who? '}!`.then((result)=>{
    //You will be prompted with "who? "
    //result is the interpolated string with all of your input.
    console.log(result);
}, (err) => {
    console.log(err)
});
```

Example 2 - compile
-------------------

`src.json`

```json
{
    "val": "${'thing? '}"
}
```

Using the `fs-promise` module:

```javascript
const rll = require('readline-literal')();
const fsp = require('fs-promise');


fsp.readFile('src.json', 'utf8').then((text)=>{
    return rll.compile(text);
})
.then((result)=>{
    // result =
    // '{
    //     "val": "Something you wrote."
    // }'
    console.log(result)
})
.catch((err)=>console.log(err));
```

About
-----

**readline-literal** takes a javascript string literal. The *values* of the literal are used to create questions for readline output in the command-line.

API
---

createReadlineLiteral(undefined || options) -> readlineLiteral function
=======================================================================

The module `readline-literal` is a function you should call to get a readlineLiteral function.

`createReadlineLiteral` is the function you get when importing this module.

`createReadlineLiteral` can be passed an `options` object.

The options object can have these fields:

###options.interface = (An custom instance of readline)

When set this instance of readline will be used instead of the internal one.

### options.map(answer)

If set `options.map` will run on every answer so you can change answers as they are input.

Return the change from `options.map`.

readlineLiteral(template literal) -> Promise
--------------------------------------------

Process a template literal, and use it's interpolated values as questions to readline.

Call `readlineLiteral` as a javascript template tag.

The promise returned resolves to the interpolated string.

readlineLiteral.compile(text) -> Promise

Compile some text that looks like a *template literal*, and **start readline right away**.

Warning
-------

`readlineLiteral` will quit right away (on Unix) if there is a `Control+c` key sequence input.

If a readline process is quit early then the `Promise` returned by `readlineLiteral` will be rejected with a value of `null`.
