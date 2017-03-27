<template>
    <div class="app">
        <header>    
            <h1>Texas Hold'em Demonstration</h1>
        </header>
        <main>
            <section class="left">
                <ul>
                    <li class="item">
                        <span>Common</span>
                        <ve-poker v-for="(v, i) in commonPokers" 
                            :poker="v" 
                            key="i"
                            custom-class="adjust-gap"></ve-poker>
                    </li>
                    <li class="item" v-for="player in players">
                        <span>{{player.name}}</span>
                        <ve-poker v-for="(v, i) in player.pokers" 
                            :poker="v" 
                            key="i"
                            custom-class="adjust-gap"></ve-poker>
                    </li>
                </ul>
            </section>
            <section class="right">                
                <ol>
                    <li class="item" v-for="(player, index) in compareList">
                        <span>{{index + 1}}. {{player.name}}</span>
                        <ve-poker v-for="(v, i) in player.poker.pokers" 
                            :poker="v" 
                            key="i"
                            custom-class="adjust-gap"></ve-poker>
                    </li>
                </ol>
            </section>
            <section class="operation">
                <button class="send-card" 
                    @click="sendCard"
                    :disabled="counter >= 13">
                    Send Card
                </button>
                <button class="compare" 
                    @click="compare"
                    :disabled="counter < 11">
                    Compare
                </button>
                <button class="reset" 
                    @click="reset"
                    :disabled="counter < 1">
                    Reset
                </button>
            </section>
        </main>
    </div>
</template>

<style lang="scss" scoped>
.app {
    header {
        margin: 70px 0 0;
        text-align: center;
    }
    main {
        width: 1030px;
        height: 500px;
        margin: 40px auto;

        .left,
        .right {
            box-sizing: border-box;
            width: 500px;
            height: 500px;
            border: 1px solid #bbb;
            border-radius: 4px;

            ul,
            ol {  
                list-style: none; 
                padding: 0 20px 0 30px; 
            }

            /* .item is ul or ol 's children */
            .item {
                height: 84px;
                margin: 10px;

                span {
                    display: inline-block;
                    height: 84px;
                    width: 70px;
                    line-height: 84px;
                    text-align: right;
                    vertical-align: top;
                }
            }
            ol > .item > span { text-align:  left; }
        }
        .left { float: left; }
        .right { float: right; }
        .operation {
            box-sizing: border-box;
            padding: 30px;
            clear: both;
            text-align: center;
          
            button {
                width: 150px;
                padding: 7px 15px;
                font-size: 1.3em;
                color: white;
                border: none;
                border-radius: 5px;
                background: lighten(#2f79ba, 10%);
                outline: none;
                cursor: pointer;
                
                &:hover,
                &:active { background: #2f79ba; }
                &:disabled {
                    background: #bbb;
                    cursor: not-allowed;
                }
                &:nth-child(2n) { margin: 0 20px; }
            }
        }
    }
}

.adjust-gap {
    margin: 0 5px;
}
</style>

<script>
import vePoker from './components/poker.vue';
import Poker from '../holdem/poker.js';
import Holdem from '../holdem/holdem.js';

const USERS = [ 'Alice', 'Jack', 'Frank', 'Tom' ];

export default {
    components: { vePoker },
    data () {
        let commonPokers = [];
        let players = USERS.map( v => {
            return {
                name: v,
                pokers: []
            };
        });
        let holdemPoker =  new Poker();

        return {
            holdemPoker,
            commonPokers,
            players,
            counter: 0,
            compareList: []
        };
    },
    methods: {
        sendCard () {
            let poker = this.holdemPoker.getCard();
            const userTotalCards = USERS.length * 2;
            const commonTotalCards = 5;

            if (this.counter >= (userTotalCards + commonTotalCards)) {
                return;
            } else if (this.counter >= userTotalCards) {
                this.commonPokers.push(poker);
            } else {
                this.players[this.counter % USERS.length].pokers.push(poker);
            }
            this.counter++;
        },
        compare () {
            const userTotalCards = USERS.length * 2;
            if (this.counter < (userTotalCards + 3)) return;

            let list = this.players;
            let common = this.commonPokers;

            list = list.map( v => {
                const newPokers = v.pokers.concat(common);
                return {
                    name: v.name,
                    poker: Holdem.computeLevel(newPokers)
                };
            });
            list.sort( (a, b) => -Holdem.compare(a.poker, b.poker));

            this.compareList = list;
        },
        reset () {
            if (this.counter === 0) return;

            this.counter = 0;
            this.commonPokers = [];
            this.players = USERS.map( v => {
                return {
                    name: v,
                    pokers: []
                };
            });
            this.compareList = [];
            this.holdemPoker =  new Poker();
        }
    }
};
</script>
