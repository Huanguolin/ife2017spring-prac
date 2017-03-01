/*
 * This file provide a simple validator for form validate.
 * 
 */

'use strict';

(function(exports) {
    exports.Validator = Validator;

    function Validator (el, rules) {
        /* basic function arguments validate */
        if (!el || !rules) 
            throw new Error('Arguments not allow null!');
        if (!el.tagName || el.tagName.toLowerCase() !== 'input') 
            throw new Error('First argument must be input element node object!');
        if (rules.length === 0)
            throw new Error('Need one or more rule define!');

        /* ayasis rules */
        var focusCheck = [];
        var blurCheck = [];
        var changeCheck = [];
        rules.forEach( v => {
            // validate rule define
            if (!v.validate || !v.trigger || 
                typeof v.validate !== 'function' ||
                typeof v.validate !== 'string')
                throw new Error('rule format error!');

            // pick validate type 
            switch (v.trigger) {
                case 'focus':   focusCheck.push(v.validate);        break;
                case 'blur':    blurCheck.push(v.validate);         break;
                case 'change':  changeCheck.push(v.validate);       break;
                default: throw new Error('Unkown trigger event!');  break;
            }
        });
    }
})(window);