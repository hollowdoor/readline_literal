//Notice the call right after the require.
const rll = require('../')();

rll`Hello ${'who? '}!`.then((result)=>{
    //You will be prompted with "who? "
    //result is the interpolated string with all of your input.
    console.log(result);
    return rll`Hello ${'what? '}!`.then((result)=>{
        //You will be prompted with "who? "
        //result is the interpolated string with all of your input.
        console.log(result);
    });
}).catch(err => {
    console.log(err)
});
