
'use strict';

(function () {    
    // const value define
    const MIN_STR_LEN = 4;
    const MAX_STR_LEN = 16;

    // init 
    window.addEventListener('load', () => init());
        
    function init () {
        const validateBtn = document.getElementsByTagName('button')[0];
        const inputElems = document.getElementsByTagName('input');
        const noticeElems = document.getElementsByTagName('span');

        var rules = [
            { 
                validator: function (value) {
                    const name = value.trim();
                    const len = getStrLen(name);       

                    if (len > MAX_STR_LEN )
                        notice(false, '不能多于16个字符');        
                    else if (len < MIN_STR_LEN) 
                        notice(false, '不能少于4个字符');
                    else 
                        notice(true, '格式正确');
                },
                trigger: 'manual' 
            }
        ];
        var validator = new Validator(inputElems[0], rules);

        validateBtn.addEventListener('click', (e) => {
            const res = validator.isValid();                       
            // disable form default behavior
            e.preventDefault();
        });
    }

    function requiredValidate (input, output) {
        if (input.length === 0) {
            notice(output, false, '该项不能为空');
            return false;
        } 
        return true;
    }

    function promptValidate (input, output, isOptional, msg) {
        if (input.length === 0) {
            notice(output, '该项不能为空', false);
            return false;
        } 
        return true;
    }

    function notice (element, msg, isSuccess = undefined) {
        element.childNodes[0].nodeValue = msg;
        if (isSuccess === undefined) {
            // remove all style

            return;
        };

        if (isSuccess) {
            element.style.color = 'green';
        } else {
            element.style.color = 'red';          
        }
    }

    function getStrLen (str) {   
        var enLen = 0;
        var zhLen = 0;

        // 'for...of' is ES6 grammer!
        // It split string correctly 
        // when the chinese charactor code value over '0xFFFF'. 
        for (let ch of str) {
            if (isASCII(ch))
                enLen++;
            else 
                zhLen++;
        } 

        // one ascii length is 1
        // one others length is 2
        return enLen + zhLen * 2;  
    }

    function isASCII (c) {
        return c.codePointAt(0) <= 0xFF;
    }
})();

