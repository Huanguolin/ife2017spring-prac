
'use strict';

(function () {  
    // init 
    window.addEventListener('load', () => init());
        
    // const vars 
    const CITY_LIST = [ '北京', '上海', '西安' ];
    const SCHOOL_LIST = {
        '北京': ['北京大学', '清华大学', '北京航空航天大学', '北京交通大学'], 
        '上海': ['复旦大学', '上海交通大学', '同济大学', '华东师范大学'],
        '西安': ['西安交通大学', '西北工业大学', '西安电子科技大学', '西北农林科技大学'], 
    };

    /**
     * initialize.
     */
    function init () {
        /* choose role part */
        const radios = document.querySelectorAll('input[type="radio"]');
        const radioContainer = document.querySelector('.radio');
        const selectContainer = document.querySelector('.select');
        const textContainer = document.querySelector('.text');
        const switchDiplay = isStudent => {
            if (isStudent) {
                selectContainer.style.display = 'inline-block';
                textContainer.style.display = 'none';
            } else {
                selectContainer.style.display = 'none';
                textContainer.style.display = 'inline-block';
            }
        };
        // init 
        radios[0].setAttribute('checked', true);
        switchDiplay(true);
        // add event handle
        radioContainer.addEventListener('change',  e => switchDiplay(radios[0].checked));

        /* choose city and school part  */
        const citySelect = document.querySelector('select[name="city"]');
        const schoolSelect = document.querySelector('select[name="school"]');
        // init
        replaceSelectItems(citySelect, CITY_LIST, 0);
        replaceSelectItems(schoolSelect, SCHOOL_LIST[CITY_LIST[0]]);
        // add event handle
        citySelect.addEventListener('change', e => {  
            const targetCity = e.target.value;          
            replaceSelectItems(schoolSelect, SCHOOL_LIST[targetCity]);
        });
    }

    function replaceSelectItems (selectElem, items, checkedIndex = 0) {
        // clean
        selectElem.innerHTML = '';

        // append 
        items.forEach( (v, i) => {
            let e = document.createElement("OPTION");
            let t = document.createTextNode(items[i]);
            e.setAttribute('value', items[i]);
            e.appendChild(t);
            
            if (i === checkedIndex) {
                e.setAttribute('selected', true);
            }

            selectElem.appendChild(e);
        });
    }
})();

