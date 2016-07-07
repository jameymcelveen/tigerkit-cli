    import utils from '../core/utils.js';

    export default {
        data: function data () {
            return { time: 0 }
        },
        ready: function ready() {
            setInterval(function() { utils.getTimestamp(); }, 1000);
        }
    }
