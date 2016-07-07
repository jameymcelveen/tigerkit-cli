<template>
    <span class="clock">Time: {{time}}</span>
</template>

<script>
    import utils from '../core/utils.js';

    export default {
        data () {
            return { time: 0 }
        },
        ready() {
            setInterval(function() { utils.getTimestamp(); }, 1000);
        }
    }

</script>
