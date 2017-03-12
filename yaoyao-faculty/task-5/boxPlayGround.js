
'use strict';

const DIRECTIONS = ['N', 'E', 'S', 'W'];
const ANGLE = ['0deg', '90deg', '180deg', '-90deg'];

/**
 * BoxPlayGround constructor.
 * 
 * @param {Element} mountPoint BoxPlayGround mount point 
 * @param {Number} xMax x-axis maximum (optional, defualt is 10)
 * @param {Number} yMax y-axis maximum (optional, default is 10)
 */
function BoxPlayGround (mountPoint, xMax = 10, yMax = 10) {
    if (!mountPoint || !(mountPoint instanceof Element)) throw new Error('"mountPoint" is invalid!');

    const _data = {
        _xMax: _validateIntergerValue(false, xMax, 1),
        _yMax: _validateIntergerValue(false, yMax, 1),             
        _mountPoint: mountPoint,
        _box: null, // inner use only
        _isRendered: false, 
        _x: 0,
        _y: 0,
        _direction: 'N'
    };

    Object.defineProperties(this, {
        xMax: { get () { return _data._xMax; } },
        yMax: { get () { return _data._yMax; } },
        mountPoint: { get () { return _data._mountPoint; } },
        isRendered: { get () { return _data._isRendered; } },
        x: {
            set (val) { 
                _data._x = _validateIntergerValue(true, val, 0, _data._xMax - 1);

                // update UI
                if (this.isRendered) {
                    updateX(); 
                }
            },
            get () { return _data._x; }
        },
        y: {
            set (val) { 
                _data._y = _validateIntergerValue(true, val, 0, _data._yMax - 1); 

                // update UI
                if (this.isRendered)  {
                    updateY();
                }
            },
            get () { return _data._y; }
        },
        direction: {
            set (val) { 
                _data._direction = _validateDirection(val); 

                // update UI
                if (this.isRendered) {
                    updateDirection();
                };
            },
            get () { return _data._direction; }
        }
    });

    const updateX = () => _data._box.style.left = (this.x * 50) + 'px';
    const updateY = () => _data._box.style.top = (this.y * 50) + 'px';
    const updateDirection = () => {
        const index = DIRECTIONS.indexOf(this.direction);
        _data._box.style.transform = `rotate(${ANGLE[index]})`
    };
    const updateAll = () => {        
            updateX();
            updateY();
            updateDirection();
    };

    BoxPlayGround.prototype.render = () => {
        // check flag
        if (this.isRendered) return;

        /* ==== render ==== */
        let rootDiv = document.createElement('DIV');
        let playGroundDiv = document.createElement('DIV');
        let boxDiv = document.createElement('DIV');
        let xAxisUl = _createAxis(true, this.xMax); 
        let yAxisUl = _createAxis(false, this.yMax); 
        rootDiv.className = 'drive-box';
        playGroundDiv.className = 'box-play-ground';
        boxDiv.className = 'box';
        // set box play ground size 
        playGroundDiv.style.width = (this.xMax * 50 - 2) + 'px';
        playGroundDiv.style.height = (this.yMax * 50 - 2) + 'px';
        // Assemble all this piece
        playGroundDiv.appendChild(boxDiv);
        rootDiv.appendChild(xAxisUl);
        rootDiv.appendChild(yAxisUl);
        rootDiv.appendChild(playGroundDiv);
        // remeber box elment 
        _data._box = boxDiv;
        // update all
        updateAll();
        // append it to mount point 
        this.mountPoint.innerHTML = '';
        this.mountPoint.appendChild(rootDiv);

        // set flag
        _data._isRendered = true;
    };

    BoxPlayGround.prototype.go = () => {
        switch (this.direction) {            
            case 'N': this.y--; break; 
            case 'E': this.x++; break; 
            case 'S': this.y++; break; 
            case 'W': this.x--; break;
        }
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
            default: throw new Error('Invalid command: ' + direct); break;
        }
        let newIndex = lastIndex + ov;
        if (newIndex >= len) newIndex -= len;
        if (newIndex < 0) newIndex += len;
        // set direction
        this.direction = DIRECTIONS[newIndex];
    };

    BoxPlayGround.prototype.transfer = direct => {        
        switch (direct.trim().toUpperCase()) {
            case 'LEF'      :
            case 'LEFT'     : this.x--; break; 

            case 'RIG'      :
            case 'RIGHT'    : this.x++; break;

            case 'TOP'      : this.y--; break; 

            case 'BOT'      : 
            case 'BOTTOM'   : this.y++; break; 
            default: throw new Error('Invalid command: ' + direct); break;
        }
    };

    BoxPlayGround.prototype.move = direct => {
          switch (direct.trim().toUpperCase()) {
            case 'LEF'      :
            case 'LEFT'     : this.direction = 'W'; this.x--; break; 

            case 'RIG'      :
            case 'RIGHT'    : this.direction = 'E'; this.x++; break;

            case 'TOP'      : this.direction = 'N'; this.y--; break; 

            case 'BOT'      : 
            case 'BOTTOM'   : this.direction = 'S'; this.y++; break; 
            default: throw new Error('Invalid command: ' + direct); break;
        }
    };
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

function _createAxis (isX, len) {
    let ul = document.createElement('UL');
    ul.className = isX ? 'x-axis' : 'y-axis';

    for (let i = 0; i < len; i++) {
        let li = document.createElement('LI');
        let t = document.createTextNode(i+1);
        li.appendChild(t);
        ul.appendChild(li);
    }
    
    return ul;
}