
'use strict';

// const value define
const MIN_STR_LEN = 4;
const MAX_STR_LEN = 16;


(function () {
    window.addEventListener('load', () => init());
        
    function init () {
        const validateBtn = document.getElementById('validate-btn');
        const inputElem = document.getElementById('name');
        const noticeElem = document.getElementById('notice');  

        const notice = (isSuccess, msg) => {
            noticeElem.childNodes[0].nodeValue = msg;
            if (isSuccess) {
                inputElem.classList.remove('input-warn');
                inputElem.classList.add('input-success');
                noticeElem.classList.remove('text-warn');
                noticeElem.classList.add('text-success');
            } else {
                inputElem.classList.remove('input-success');
                inputElem.classList.add('input-warn');
                noticeElem.classList.remove('text-success');
                noticeElem.classList.add('text-warn');            
            }
        }

        var rules = [
            { 
                validator: function (value) {
                    const name = value.trim();
                    const len = getStrLen(name);
                    console.log('name len: ' + getStrLen(name));        

                    if (len === 0) 
                        notice(false, '姓名不能为空');
                    else if (len > MAX_STR_LEN )
                        notice(false, '不能多于16个字符');        
                    else if (len < MIN_STR_LEN) 
                        notice(false, '不能少于4个字符');
                    else 
                        notice(true, '格式正确');
                },
                trigger: 'manual' 
            }
        ];
        var validator = new Validator(inputElem, rules);

        validateBtn.addEventListener('click', (e) => {
            const res = validator.isValid();
            console.log('isValid: ' + res); 
                       
            // disable form default behavior
            e.preventDefault();
        });
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

