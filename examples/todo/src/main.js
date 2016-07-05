/**
 * Created by Jamey McElveen on 7/4/16.
 */

export class Main {

    // LifeCycle

    onCreate(s) {
        console.log('Main.onCreate()');
    }

    onDestroy(s) {
        console.log('Main.onDestroy()');
    }

    onOpen(s) {
        console.log('Main.onOpen()');
    }

    onClose(s) {
        console.log('Main.onClose()');
    }

    onShow(s) {
        console.log('Main.onShow()');
    }
    
    onHide(s) {
        console.log('Main.onHide()');
    }

    /**
     * onClick  - Event that is fired when a user clicks inside this control
     *
     * @param s - Sender
     * @param x - X Position
     * @param y - Y Position
     * @param e - Element
     */
    onClick(s, x, y, e) {

    }
}