
'use strict';

(function () {  
    // init 
    window.addEventListener('load', () => init());
        
    /**
     * initialize.
     */
    function init () {
        const FOCUS_SHOW_INFO = [
            '必填，长度为4-16个字符',
            '必填，长度为6-12个字符',
            '必填，必须与前一项输入一致',
            '选填，例如：name@example.com',
            '选填，例如：188xxxx1234'
        ];
        const BLUR_DO_ACTION = [
            validateName,
            validatePasswd1,
            validatePasswd2,
            validateEmail,
            validatePhone,
        ];

        let validateBtn = document.getElementsByTagName('button')[0];
        let inputElems = document.getElementsByTagName('input');
        let spanElems = document.getElementsByTagName('span');

        const handleFocusEvent = i => {
            showResult(
                inputElems[i],
                spanElems[i],
                FOCUS_SHOW_INFO[i],
                'none');
        };
        const handleBlurEvent = i => {
            if (BLUR_DO_ACTION[i] === validatePasswd2) {
                return validatePasswd2(inputElems[i-1], inputElems[i], spanElems[i]);
            } else {
                return BLUR_DO_ACTION[i](inputElems[i], spanElems[i]);
            } 
        };

        Array.prototype.forEach.call(inputElems, (e, i) => {
            e.addEventListener('focus', () => handleFocusEvent(i));
            e.addEventListener('blur', () => handleBlurEvent(i));
        });

        validateBtn.addEventListener('click', (e) => {
            let res = true;
            BLUR_DO_ACTION.forEach((v, i) => {
                const r = handleBlurEvent(i);
                res = res && r;
            });

            const msg = res ? '提交成功!' : '提交失败!';
            alert(msg);

            // disable form default behavior
            e.preventDefault();
        });
    }

    /* validators */
    function validateName (inputElem, outputElem) {
        const MAX_LEN = 16;
        const MIN_LEN = 4;

        let res = false;
        const len = getNameLen(inputElem.value.trim());       
        const msg = validateLen(len, MAX_LEN, MIN_LEN);
        if (msg) {
            showResult(inputElem, outputElem, msg, 'fail');  
        } else {
            showResult(inputElem, outputElem, '格式正确', 'success');
            res = true;
        }
        return res;
    }
    
    function validatePasswd1 (inputElem, outputElem) {        
        const MAX_LEN = 12;
        const MIN_LEN = 6;

        let res = false;
        const len = inputElem.value.length;      
        const msg = validateLen(len, MAX_LEN, MIN_LEN);
        if (msg) {
            showResult(inputElem, outputElem, msg, 'fail');  
        } else {
            showResult(inputElem, outputElem, '格式正确', 'success');
            res = true;
        }
        return res;
    }
        
    function validatePasswd2 (inputElem1, inputElem2, outputElem) { 
        let res = false;
        if (inputElem1.value.length === 0) {
            showResult(inputElem2, outputElem, '前一项不能为空', 'fail');
        } else if (inputElem1.value === inputElem2.value) {
            res = true;
            showResult(inputElem2, outputElem, '输入一致', 'success');
        } else {
            showResult(inputElem2, outputElem, '两次输入不一致', 'fail'); 
        }
        return res; 
    }

    function validateEmail (inputElem, outputElem) {
        let res = true;
        //const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const pattern = /^\w+(\.\w+)*@\w+(\.[a-zA-Z]+)+$/;
        const value = inputElem.value.trim()        

        if (value.length !== 0) {
            if (pattern.test(value)) { 
                showResult(inputElem, outputElem, '格式正确', 'success');  
            } else {
                res = false;
                showResult(inputElem, outputElem, '格式不正确', 'fail');  
            }
        }

        return res;
    }
        
    function validatePhone (inputElem, outputElem) {
        let res = true;
        const pattern = /^1\d{10}$/;
        const value = inputElem.value.trim()        

        if (value.length !== 0) {
            if (pattern.test(value)) {
                showResult(inputElem, outputElem, '格式正确', 'success');  
            } else { 
                res = false;
                showResult(inputElem, outputElem, '格式不正确', 'fail'); 
            }
        }

        return res;
    }


    /* common functions */
    function validateLen (len, max, min) {
        let res;

        if (len === 0) {
            res = '该项不能为空';  
        } else if (len > max ) {
            res = `不能多于${max}个字符`;        
        } else if (len < min) {
            res = `不能少于${min}个字符`;
        }

        return res;
    }

    function showResult (input, span, msg, result) {
        showMessage(span, msg);
        changeStyle(input, span, result);
    }

    function changeStyle (inputElem, outputElem, result) {
        switch (result) {
            case 'success': 
                inputElem.className = 'border-success';
                outputElem.className = 'text-success';
                break;

            case 'fail':
                inputElem.className = 'border-danger';
                outputElem.className = 'text-danger';
                break; 
            
            case 'none': 
                inputElem.className = '';
                outputElem.className = '';
                break;
        }
    }

    function showMessage (outputElem, msg) {
        outputElem.innerHTML = msg;
    }

    function getNameLen (str) {
        let enLen = 0;
        let zhLen = 0;

        // 'for...of' is ES6 grammer!
        // It split string correctly 
        // when the chinese charactor code value over '0xFFFF'. 
        for (let ch of str) {
            if (isASCII(ch)) {
                enLen++;
            } else {
                zhLen++;
            }
        } 

        // one ascii length is 1
        // one others length is 2
        return enLen + zhLen * 2;  
    }

    function isASCII (c) {
        return c.codePointAt(0) <= 0xFF;
    }
})();

