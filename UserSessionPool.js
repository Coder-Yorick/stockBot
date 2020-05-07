const { TaskController, UserActions } = require('./TaskController.js');

function UserSessionPool() {
    this.sessions = {};
}

UserSessionPool.prototype.Update = function (user_id, message) {
    return Promise((resolve, reject) => {
        if (user_id != null && message !== null) {
            let isAction = UserActions.hasOwnProperty(message);
            if (isAction) {
                /* 命令 */
                let action = UserActions[message];
                if (!this.sessions.hasOwnProperty(user_id) || this.sessions[user_id].length == 0) {
                    this.sessions[user_id] = [action];
                } else if (this.sessions[user_id].indexOf(action) < 0) {
                    this.sessions[user_id].push(action);
                }
            }
            TaskController.exec(this.sessions[user_id], isAction ? null : message)
                .then(result => {
                    if (result.done) {
                        /* clear actions */
                        this.sessions[user_id] = [];
                    }
                    resolve(result.msg);
                })
                .catch(e => {
                    reject(null);
                });
        } else {
            reject(null);
        }
    });
}

module.exports = UserSessionPool;