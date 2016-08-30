"use strict";
const readline = require('readline');
const Query = require('./query');

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
                let query = new Query().ask(values[index]);

                return rl.question(query.question, (answer)=>{
                    answer = query.reply(answer);

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

    readlineLiteral.Query = Query;

    return readlineLiteral;
};

function isArray(val){
    return Object.prototype.toString.call(val) === '[object Array]';
}

module.exports.Query = Query;

/*
git remote add origin https://github.com/hollowdoor/readline_literal.git
git push -u origin master
*/
