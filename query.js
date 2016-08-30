"use strict";

class ReadlineQuery {
    constructor(executor){
        
        if(typeof executor !== 'function'){
            executor = (answer)=>answer;
        }

        this.executor = executor;

        this.default = '';
        this.hasDefault = false;
        this.wholeQuestion = '';
    }
    ask(question){
        if(question instanceof ReadlineQuery){
            this.executor = question.executor;
            return this.ask(question.wholeQuestion);
        }

        this.wholeQuestion = question;

        if(typeof question === 'string'){
            this.question = question;
        }else if(isArray(question) && question.length === 2){
            this.hasDefault = true;
            this.default = question[1];
            this.question = question[0];
        }

        return this;
    }
    reply(answer){
        if(answer === '' && this.hasDefault){
            answer = this.default;
        }

        let executor = this.executor;

        return (this.answer = executor(answer));
    }
}

module.exports = ReadlineQuery;

function isArray(val){
    return Object.prototype.toString.call(val) === '[object Array]';
}
