
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
            /* 
             * ===========1=============
             * As tutor 'wuhy09' say:
             * 
             * 'nodeValue' make reader confusing,
             *  and textContent/innerText/innerHTML is clear more! 
             */
            noticeElem.textContent = msg;
            /*noticeElem.childNodes[0].nodeValue = msg;*/

            if (isSuccess) {
                /* 
                 * ===========2=============
                 * As tutor 'wuhy09' say:
                 * 
                 * Use className instand of classList!
                 * Make it more simple and more compatible.
                 */
                inputElem.className = 'border-success';
                noticeElem.className = 'text-success';
                /*
                inputElem.classList.remove('border-warn');
                inputElem.classList.add('border-success');
                noticeElem.classList.remove('text-warn');
                noticeElem.classList.add('text-success');
                */
            } else {
                inputElem.className = 'border-warn';
                noticeElem.className = 'text-warn';                
                /*
                inputElem.classList.remove('border-success');
                inputElem.classList.add('border-warn');
                noticeElem.classList.remove('text-success');
                noticeElem.classList.add('text-warn');            
                */
            }
        }

        validateBtn.addEventListener('click', (e) => {
            const name = inputElem.value.trim();
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
            
            // disable form default behavior
            e.preventDefault();
        });
    }

    function getStrLen (str) { 
        /* 
         * ===========3=============
         * As tutor 'wuhy09' say:
         * 
         * Don't use 'var' any more in ES6 grammer.
         */  
        let enLen = 0;
        let zhLen = 0;
        /*
        var enLen = 0;
        var zhLen = 0;
        */

        // 'for...of' is ES6 grammer!
        // It split string correctly 
        // when the chinese charactor code value over '0xFFFF'. 
        for (let ch of str) {
            /* 
             * ===========4=============
             * As tutor 'wuhy09' say:
             * 
             * To keep with '{}' always.
             */ 
            if (isASCII(ch)) {
                enLen++;
            } else {
                zhLen++;
            }
            /*
            if (isASCII(ch)) 
                enLen++;
            else 
                zhLen++;
            */
        } 

        // one ascii length is 1
        // one others length is 2
        return enLen + zhLen * 2;  
    }

    function isASCII (c) {
        return c.codePointAt(0) <= 0xFF;
    }
})();

