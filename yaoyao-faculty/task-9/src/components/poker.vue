<template>
    <div class="poker"
        :class="customClass"
        :style="style">
        <div class="poker-v">{{v}}</div>
        <div class="poker-t">{{t}}</div>
    </div>
</template>

<style lang="scss" scoped>
.poker {
    box-sizing: border-box;
    display: inline-block;
    height: 3.5em;
    width: 2.5em;
    padding: .3em 0;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;

    .poker-v {
        font-size: .9em;
    }
}
</style>

<script>
/**
 * poker: { v, t }
 * v: 0/2, 1/3, ... 8/10, 9/J, 10/Q, 11/K, 12/A
 * t: 0/(R♠), 1/(B♠), 2/♣, 3/♦
 */

export default {
    name: 'poker',
    props: {
        poker: [Object],
        size: [String],
        customClass: [String]
    },
    computed: {
        v () {
            let v = this.poker.v;

            if (v > 8) {
                switch (v) {
                    case 12: v = 'A'; break;
                    case 11: v = 'K'; break;
                    case 10: v = 'Q'; break;
                    case 9: v = 'J'; break;
                }
            } else {
                v += 2;
            }

            return v;
        },
        t () {
            let t;

            switch (this.poker.t) {
                case 0: 
                case 1: t = '♠'; break;

                case 2: t = '♣'; break;
                case 3: t = '♦'; break;
            }

            return t;
        },
        style () {
            let color;
            let fontSize;

            switch (this.poker.t) {
                case 0: 
                case 3: color = 'red';  break;

                case 1: 
                case 2: color = 'black';  break;
            }
            
            let size = this.size || 'small';
            size = size.toString().trim().toLowerCase();            
            switch (size) {
                case 'mini':    fontSize = '16px';  break;
                case 'small':   fontSize = '24px';  break;
                case 'middle':  fontSize = '30px';  break;
                case 'large':   fontSize = '40px';  break;
                case 'huge':    fontSize = '64px';  break;
            }

            return `color: ${color}; font-size: ${fontSize};`;
        }
    }
};
</script>
