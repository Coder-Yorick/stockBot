function LineUtils() {
    this.Template = function(altText, title) {
        this.type = 'template';
        this.altText = altText;
        this.template = {
            type: 'buttons',
            text: title,
            actions: []
        }
    }

    this.TemplateAction = function(label, data) {
        this.type = 'postback';
        this.label = label;
        this.data = data;
    }

    this.GetSourceUserID = function(source) {
        if (source.hasOwnProperty('type')) {
            if (source.type == "user")
                return source.userId
            else if (source.type == "group")
                return source.groupId;
        } else
            return null;
    }

    this.GetSourceUserProfile = function(source) {
        return Promise((resolve, reject) => {
            if (source.hasOwnProperty('profile') && typeof source.profile === 'function') {
                try {
                    source.profile().then(profile => {
                        resolve(profile);
                    }).catch(ex => {
                        console.log(ex);
                        reject(null);
                    });
                } catch (e) {
                    console.log(e);
                    reject(null);
                }
            } else {
                reject(null);
            }
        });
    }

    this.ParseMessageText = function(message) {
        if (message != null && message.hasOwnProperty('type') && message.type == 'text') {
            return message.text;
        } else {
            return null;
        }
    }

    this.ParsePostbackText = function(postback) {
        if (postback != null && postback.hasOwnProperty('data') && postback.data != null) {
            return postback.data;
        } else {
            return null;
        }
    }
}

var lineUtils = new LineUtils();

module.exports = lineUtils;