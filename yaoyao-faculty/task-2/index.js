
'use strict';

(function () {    
    // const value define
    const MIN_STR_LEN = 4;
    const MAX_STR_LEN = 16;
    const NOTICE_INFO = [
        '必填，长度为4-16个字符',
        '必填，长度为6-12个字符',
        '必填，必须与前一项输入一致',
        '选填，需要附合邮箱的格式，如：example@test.com',
        '选填，需要附合手机号码格式，如：188xxxx1234'
    ];

    // init 
    window.addEventListener('load', () => init());

    var validateBtn;
    var inputElems;
    var spanElems;
        
    function init () {
        validateBtn = document.getElementsByTagName('button')[0];
        inputElems = document.getElementsByTagName('input');
        spanElems = document.getElementsByTagName('span');

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

        Array.prototype.forEach.call(inputElems, (e, i) => {
            e.addEventListener('focus', i => focusNotice(i));
        });

        validateBtn.addEventListener('click', (e) => {
            e.preventDefault();
        });
    }

    function focusNotice (index) {
        if (spanElems[index].childNodes) {
            spanElems[index].childNodes[0].nodeValue = NOTICE_INFO[index];
            spanElems[index].style.color = '#aaa';
        } else {
            spanElems[index].appendChild(document.createTextNode(msg));
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

