/*
 * This file provide a simple validator for form validate.
 */

'use strict';

(function(exports) {
    // export symbol
    exports.Validator = Validator;
    
    // private vars
    var _TRIGGERS = [ 'manual', 'focus', 'blur', 'input'];
    var _element;
    var _validators;

    /*
     * Constructor
     */
    function Validator (element, rules) {        
        /* basic function arguments validate */
        if (!element || !rules) 
            throw new Error('Arguments not allow null!');        
        var tagName = element.tagName;
        if (!tagName || 
            (tagName.toLowerCase() !== 'input' && 
            tagName.toLowerCase() !== 'textarea')) 
            throw new Error('First argument must be input or textarea element!');
        if (rules.length === 0)
            throw new Error('Need one or more rule defined!');

        /* init private vars */
        _element = element;
        _validators = {};
        _TRIGGERS.forEach(function(v) {
            _validators[v] = [];
        });

        /* ayasis rules */
        rules.forEach( v => {
            // validate rule define
            if (!v.validator || !v.trigger || 
                typeof v.validator !== 'function' ||
                typeof v.trigger !== 'string')
                throw new Error('rule format error!');

            // push validators  
            if (_TRIGGERS.indexOf(v.trigger) > -1)
                _validators[v.trigger].push(v.validator);
            else 
                throw new Error('Unkown trigger event: ' + v.trigger);           
        });
        
        /* add event trigger */
        _TRIGGERS.forEach( function (v) {
            if (v === 'manual' || _validators[v].length === 0) return;

            element.addEventListener(v, function () {
                _check(_validators[v]);
            });
        });
    }

    function _check (queue) {
        var value = _element.value;
        var len = queue.length;
        for (var i = 0; i < len; i++) {
            if (!queue[i](value)) break;
        }
        return i === len;
    }

    Validator.prototype.isValid = function () {        
        var len = _TRIGGERS.length;
        var tmp;
        for (var i = 0; i < len; i++) {
            tmp = _TRIGGERS[i];
            tmp = _validators[tmp];
            if (!_check (tmp)) break;
        }
        return i === len;
    };
})(window);