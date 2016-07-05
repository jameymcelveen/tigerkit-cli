/**
 * Created by Jamey McElveen on 7/4/16.
 */

var TKit = TKit || initTKit();

function TKit() {
    return {
        onReady: function(callback) {
            document.addEventListener("DOMContentLoaded", function(e) {
                callback(e)
            });
        }
    }
}