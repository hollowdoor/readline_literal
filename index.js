"use strict";
const readline = require('readline');

module.exports = function createReadlineLiteral(options){
    options = options || {};

    const map = typeof options.map === 'function' ? options.map : (val)=>val;
    const rl = options.interface || readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal:  true
    });

    function readlineLiteral(strings){

        const values = [].slice.call(arguments, 1);

        let index = -1,
            result = strings[0],
            done = false,
            exit = false;

        function ask(resolve, reject){

            if(++index < values.length){

                let hasDefault = isArray(values[index]) && values[index].length === 2,
                    question = !hasDefault ? values[index] + '' : values[index][0] + '',
                    def = hasDefault ? values[index][1] : null;

                return rl.question(question, (answer)=>{
                    if(answer === '' && hasDefault){
                        answer = def;
                    }
                    result += map(answer) + strings[index + 1];
                    ask(resolve, reject);
                });
            }

            done = true;
            rl.close();

            resolve(result);
        }

        return new Promise((resolve, reject)=>{
            try{
                rl.on('close', ()=>{
                    if(!done){ console.log(''); reject(null);}
                });
            }catch(err){
                return reject(err);
            }

            ask(resolve, reject);
        });
    };

    readlineLiteral.compile = function compile(text){
        const run = new Function('rll', "return rll`"+text+"`");
        return run(readlineLiteral);
    };

    return readlineLiteral;
};

function isArray(val){
    return Object.prototype.toString.call(val) === '[object Array]';
}

/*
git remote add origin https://github.com/hollowdoor/readline_literal.git
git push -u origin master
*/
