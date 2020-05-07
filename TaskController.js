const LineUtils = require('./LineUtils.js');

const UserActions = {
    '查詢股票': 'query',
    '查詢訂閱': 'query-subscribe',
    '訂閱': 'subscribe',
    '取消訂閱': 'unsubscribe'
}

const JudgeActions = (actions, msg) => {
    let action = null;
    if (actions != null && actions.length > 0) {
        action = actions[actions.length - 1];
        switch (action) {
            case 'query':
                if (msg == null)
                    return '請輸入要查詢的股票代碼';
                else
                    return () => new Promise((resolve, reject) => resolve(`查詢了股票代號(${msg})`));
            case 'query-subscribe':
                return () => new Promise((resolve, reject) => resolve(`查詢了訂閱列表`));
            case 'subscribe':
                if (msg == null)
                    return '請輸入要訂閱的股票代碼';
                else
                    return () => new Promise((resolve, reject) => resolve(`訂閱了股票代號(${msg})`));
            case 'unsubscribe':
                if (msg == null)
                    return '請輸入要取消訂閱的股票代碼';
                else
                    return () => new Promise((resolve, reject) => resolve(`取消訂閱了股票代號(${msg})`));
            default:
                return '輸入錯誤';
        } 
    }
    return action;
}

function TaskController() {
    
    this.exec = (actions, msg) => {
        return Promise((resolve, reject) => {
            let result = {
                done: false,
                msg: null
            };
            let action = JudgeActions(actions, msg);
            if (action != null) {
                if (typeof action === 'function') {
                    /* exec action */
                    action(msg).then(r => {
                        result.done = true;
                        result.msg = `${msg}:${r}`;
                        resolve(result);
                    }).catch(e => {
                        result.msg = e;
                        resolve(result);
                    });
                } else {
                    /* reply action */
                    result.msg = `${action}`;
                    resolve(result);
                }
            } else {
                reject(null);
            }
        });
    }
}

var taskController = new TaskController();

module.exports = { taskController, UserActions };