
// this file depend on 'common.js'

'use strict';

const DIRECTIONS = ['N', 'E', 'S', 'W'];

/**
 * BoxPlayGround constructor.
 * 
 * @param {Element} mountPoint BoxPlayGround mount point 
 * @param {Number} xMax x-axis maximum (optional)
 * @param {Number} yMax y-axis maximum (optional)
 */
function BoxPlayGround (mountPoint, xMax = 10, yMax = 10) {
    if (!mountPoint || !(mountPoint instanceof Element)) new Error('"mountPoint" is invalid!');

    const _data = {
        _xMax: _validateIntergerValue(false, xMax, 1),
        _yMax: _validateIntergerValue(false, yMax, 1),             
        _mountPoint: mountPoint,
        _isRendered: false, 
        _x: 0,
        _y: 0,
        _direction: 'E'
    };

    Object.defineProperties(this, {
        xMax: { get () { return _data._xMax; } },
        yMax: { get () { return _data._yMax; } },
        mountPoint: { get () { return _data._mountPoint; } },
        isRendered: { get () { return _data._isRendered; } },
        x: {
            set (val) { _data._x = _validateIntergerValue(true, val, 0, _data._xMax); },
            get () { return _data._x; }
        },
        y: {
            set (val) { _data._y = _validateIntergerValue(true, val, 0, _data._yMax); },
            get () { return _data._y; }
        },
        direction: {
            set (val) { _data._direction = _validateDirection(val); },
            get () { return _data._direction; }
        }
    });

    const update = () => {
        /* TODO update */
    };

    BoxPlayGround.prototype.render = () => {
        if (this.isRendered) return;

        /* TODO: render */

        _data._isRendered = true;
    };

    BoxPlayGround.prototype.go = () => {
        switch (this.direction) {            
            case 'N': this.y--; break; 
            case 'E': this.x++; break; 
            case 'S': this.y++; break; 
            case 'W': this.x--; break;
        }

        // update UI
        if (this.isRendered) update();
    };
    
    BoxPlayGround.prototype.turnTo = direct => {
        const lastIndex = DIRECTIONS.indexOf(this.direction);
        const len = DIRECTIONS.length;
        let ov;

        switch (direct.trim().toUpperCase()) {
            case 'LEF'  :
            case 'LEFT' : ov = -1; break; 
            case 'RIG'  :
            case 'RIGHT': ov = 1; break; 
            case 'BAC'  : 
            case 'BACK' : ov = 2; break; 
        }

        let newIndex = lastIndex + ov;
        if (newIndex >= len) newIndex -= len;
        if (newIndex < 0) newIndex += len;

        // set direction
        this.direction = DIRECTIONS[newIndex];

        // update UI
        if (this.isRendered) update();
    }  
}



function _validateIntergerValue (isSilent, val, min, max) {
    let n = Number(val);    
    if (!Number.isInteger(n)) {
        if (isSilent) {
            n = 0;
        } else {
            throw new Error('"x" must be an integer!');
        }
    }

    if (min !== undefined && n < min) {        
        if (isSilent) {
            n = min;
        } else {
            throw new Error(`"x" must be greater than or equal to ${min}!`);
        }
    }
    if (max !== undefined && n > max) {
        if (isSilent) {
            n = max;
        } else {
            throw new Error(`"x" must be less than or equal to ${max}!`);
        }
    }

    return n;
}

function _validateDirection (val) {
    let index;
    switch (val.trim().toUpperCase()) {
        case 'N'    : 
        case 'NORTH': index = 0; break; 

        case 'E'    : 
        case 'EAST' : index = 1; break; 

        case 'S'    : 
        case 'SOUTH': index = 2; break; 

        case 'W'    : 
        case 'WEST' : index = 3; break; 

        default: throw new Error('Invalid direction!'); break;
    }
    return DIRECTIONS[index];
} 