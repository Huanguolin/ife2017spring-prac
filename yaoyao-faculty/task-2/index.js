
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

        var rules1 = [
            {
                validator: function (value) {
                    const len = getStrLen(value.trim());                     
                    if (len === 0)
                        notice(inputElems[0], noticeElems[0], '必填，需要4-16字符');  
                    
                    return true;
                },
                trigger: 'focus' 
            },
            { 
                validator: function (value) {
                    const len = getStrLen(value.trim());       

                    if (len === 0)
                        notice(inputElems[0], noticeElems[0], '该项不能为空', false);  
                    else if (len > MAX_STR_LEN )
                        notice(inputElems[0], noticeElems[0], '不能多于16个字符', false);        
                    else if (len < MIN_STR_LEN) 
                        notice(inputElems[0], noticeElems[0], '不能少于4个字符', false);
                    else {
                        notice(inputElems[0], noticeElems[0], '格式正确', true);
                        return true;
                    }

                    return false;
                },
                trigger: 'blur' 
            }
        ];
        var rules2 = [
            {
                validator: function (value) {
                    const len = getStrLen(value.trim());                     
                    if (len === 0)
                        notice(inputElems[1], noticeElems[1], '必填，需要4-12字符');  
                    
                    return true;
                },
                trigger: 'focus' 
            },
            { 
                validator: function (value) {
                    const len = value.length;       

                    if (len === 0)
                        notice(inputElems[1], noticeElems[1], '该项不能为空', false);  
                    else if (len > 12 )
                        notice(inputElems[1], noticeElems[1], '不能多于12个字符', false);        
                    else if (len < 4) 
                        notice(inputElems[1], noticeElems[1], '不能少于4个字符', false);
                    else {
                        notice(inputElems[1], noticeElems[1], '格式正确', true);
                        return true;
                    }

                    return false;
                },
                trigger: 'blur' 
            }
        ];
        var validator1 = new Validator(inputElems[0], rules1);
        //var validator2 = new Validator(inputElems[1], rules2);

        validateBtn.addEventListener('click', (e) => {
            const res = validator1.isValid();                       
            res = res && validator2.isValid();  

            // disable form default behavior
            e.preventDefault();
        });
    }

    function notice (input, span, msg, isSuccess = undefined) {
        if (span.childNodes[0]) {
            span.childNodes[0].nodeValue = msg;
        } else {
            span.appendChild(document.createTextNode(msg));
        }

        if (isSuccess === undefined) {        
            span.style.color = '#aaa';
            return;
        };

        if (isSuccess) {
            span.style.color = 'green';
            input.style.borderColor = 'green';
        } else {
            span.style.color = 'red'; 
            input.style.borderColor = 'red';         
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

