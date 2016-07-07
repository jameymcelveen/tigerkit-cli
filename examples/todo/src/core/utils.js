/**
 * Returns the current Unix timestamp
 * This count starts at the Unix Epoch on January 1st, 1970 at UTC. Therefore, the unix time stamp is merely the number
 * of seconds between a particular date and the Unix Epoch.
 * @returns {number}
 */
export function getTimestamp() {
    if (!Date.now) {
        Date.now = function () { return new Date().getTime(); }
    }

    return Date.now() / 1000 | 0;
}