
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

        var validateBtn = document.getElementsByTagName('button')[0];
        var inputElems = document.getElementsByTagName('input');
        var spanElems = document.getElementsByTagName('span');

        const handleFocusEvent = i => {
            showResult(
                inputElems[i],
                spanElems[i],
                FOCUS_SHOW_INFO[i],
                'none');
        };
        const handleBlurEvent = i => {
            if (BLUR_DO_ACTION[i] === validatePasswd2)
                validatePasswd2(inputElems[i-1], inputElems[i], spanElems[i]);
            else 
                BLUR_DO_ACTION[i](inputElems[i], spanElems[i]);
        };

        Array.prototype.forEach.call(inputElems, (e, i) => {
            e.addEventListener('focus', () => handleFocusEvent(i));
            e.addEventListener('blur', () => handleBlurEvent(i));
        });

        validateBtn.addEventListener('click', (e) => {
            BLUR_DO_ACTION.forEach((v, i) => handleBlurEvent(i));

            e.preventDefault();
        });
    }

    /* validators */
    function validateName (inputElem, outputElem) {
        const MAX_LEN = 16;
        const MIN_LEN = 4;

        const len = getNameLen(inputElem.value.trim());       
        const res = validateLen(len, MAX_LEN, MIN_LEN);
        if (res)
            showResult(inputElem, outputElem, res, 'fail');  
        else 
            showResult(inputElem, outputElem, '格式正确', 'success');
    }
    
    function validatePasswd1 (inputElem, outputElem) {        
        const MAX_LEN = 12;
        const MIN_LEN = 6;

        const len = inputElem.value.length;      
        const res = validateLen(len, MAX_LEN, MIN_LEN);       

        if (res)
            showResult(inputElem, outputElem, res, 'fail');  
        else 
            showResult(inputElem, outputElem, '格式正确', 'success');
    }
        
    function validatePasswd2 (inputElem1, inputElem2, outputElem) {     
        if (inputElem1.value.length === 0)
            showResult(inputElem2, outputElem, '前一项不能为空', 'fail');
        else if (inputElem1.value === inputElem2.value)
            showResult(inputElem2, outputElem, '格式正确', 'success');
        else 
            showResult(inputElem2, outputElem, '两次输入不一致', 'fail');  
    }

    function validateEmail (inputElem, outputElem) {
        //const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const pattern = /^\w+(\.\w+)*@\w+(\.[a-zA-Z]+)+$/;
        const value = inputElem.value.trim()        

        if (value.length === 0) return;

        if (pattern.test(value)) 
            showResult(inputElem, outputElem, '格式正确', 'success');  
        else 
            showResult(inputElem, outputElem, '格式不正确', 'fail');  
    }
        
    function validatePhone (inputElem, outputElem) {
        const pattern = /^1\d{10}$/;
        const value = inputElem.value.trim()        

        if (value.length === 0) return;

        if (pattern.test(value)) 
            showResult(inputElem, outputElem, '格式正确', 'success');  
        else 
            showResult(inputElem, outputElem, '格式不正确', 'fail'); 
    }


    /* common functions */
    function validateLen (len, max, min) {
        var res;

        if (len === 0)
            res = '该项不能为空';  
        else if (len > max )
            res = `不能多于${max}个字符`;        
        else if (len < min) 
            res = `不能少于${min}个字符`;

        return res;
    }

    function showResult (input, span, msg, result) {
        showMessage(span, msg);
        changeStyle(input, span, result);
    }

    function changeStyle (inputElem, outputElem, result) {
        switch (result) {
            case 'success': 
                inputElem.classList.remove('border-danger');
                inputElem.classList.add('border-success');
                outputElem.classList.remove('text-danger');
                outputElem.classList.add('text-success');
                break;

            case 'fail':
                inputElem.classList.remove('border-success');
                inputElem.classList.add('border-danger');
                outputElem.classList.remove('text-success');
                outputElem.classList.add('text-danger');
                break; 
            
            case 'none': 
                inputElem.classList.remove('border-success');
                inputElem.classList.remove('border-danger');
                outputElem.classList.remove('text-success');
                outputElem.classList.remove('text-danger');
                break;
        }
    }

    function showMessage (outputElem, msg) {
        if (outputElem.childNodes[0]) {
            outputElem.childNodes[0].nodeValue = msg;
        } else {
            outputElem.appendChild(document.createTextNode(msg));
        }
    }

    function getNameLen (str) {
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

