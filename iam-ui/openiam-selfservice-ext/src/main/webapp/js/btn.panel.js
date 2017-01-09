OPENIAM = window.OPENIAM || {};
OPENIAM.UserAN = window.OPENIAM.UserAN || {};

OPENIAM.UserAN.Form = {

    postData: function (url, data, callback) {
        $.ajax({
            url: url,
            data: data,
            type: "POST",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (data.status == 200) {
                    OPENIAM.Modal.Success({
                        message: data.successMessage,
                        showInterval: 2000,
                        onIntervalClose: function () {
                            if (data.contextValues) {
                                OPENIAM.UserAN.Form.statusWorker(data.contextValues.userId);
                            }
                        },
                        afterClose: function () {
                            window.location.href = "/selfservice-ext/anusers.html";
                            /*if (data.redirectURL != null && data.redirectURL != undefined && data.redirectURL.length > 0) {
                             window.location.href = data.redirectURL;
                             } else {
                             window.location.reload(true);
                             }*/
                        }
                    });
                } else {
                    OPENIAM.Modal.Error({
                        errorList: data.errorList
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                OPENIAM.Modal.Error(localeManager["openiam.ui.internal.error"]);
            }
        });
    },

    postDataJson: function (url, data, callback) {
        $.ajax({
            url: url,
            data: JSON.stringify(data),
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            success: function (data, textStatus, jqXHR) {
                if (data.status == 200) {
                    OPENIAM.Modal.Success({
                            message: data.successMessage,
                            showInterval: 2000,
                            onIntervalClose: function () {
                                if (data.contextValues) {
                                    OPENIAM.UserAN.Form.statusWorker(data.contextValues.userId);
                                }
                            }
                        }
                    );
                } else {
                    OPENIAM.Modal.Error({
                        errorList: data.errorList
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                OPENIAM.Modal.Error(localeManager["openiam.ui.internal.error"]);
            }


        });
    },
    postDataJsonRedirect: function (url, data, callback) {
        $.ajax({
            url: url,
            data: JSON.stringify(data),
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            success: function (data, textStatus, jqXHR) {
                if (data.status == 200) {
                    OPENIAM.Modal.Success({
                            message: data.successMessage,
                            showInterval: 2000,
                            onIntervalClose: function () {
                                if (data.contextValues) {
                                    OPENIAM.UserAN.Form.statusWorker(data.contextValues.userId);
                                }
                            },
                            afterClose: function () {
                                window.location.href = "/selfservice-ext/anusers.html";
                            }
                        }
                    );
                } else {
                    OPENIAM.Modal.Error({
                        errorList: data.errorList
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                OPENIAM.Modal.Error(localeManager["openiam.ui.internal.error"]);
            }


        });
    },
    Actions: {
        Links: [],
        ExtendedActions: [],
        init: function () {
            var $this = this;
            this.ExtendedActions["RESET_CHALLENGE_RESPONSE"] = function () {
                $this.postWithWarn(
                    "RESET_CHALLENGE_RESPONSE",
                    localeManager["openiam.ui.user.challengeresponse.message"],
                    localeManager["openiam.ui.user.challengeresponse.confirm"]
                );
            };

            this.ExtendedActions["RESET_ACCOUNT"] = function () {
                $this.postWithWarn(
                    "RESET_ACCOUNT",
                    localeManager["openiam.ui.user.account.reset.message"],
                    localeManager["openiam.ui.user.account.reset.confirm"]
                );
            };

            this.ExtendedActions["DEACTIVATE_USER"] = function () {
                $this.postWithWarnExtended(
                    "DEACTIVATE_USER",
                    localeManager["openiam.ui.user.deactivate.message"],
                    localeManager["openiam.ui.user.deactivate.confirm"],
                    OPENIAM.ENV.TOKEN_LABEL ? OPENIAM.ENV.TOKEN_LABEL : null
                );
            };

            this.ExtendedActions["DISABLE_USER"] = function () {
                $this.postWithWarn(
                    "DISABLE_USER",
                    localeManager["openiam.ui.user.disable.message"],
                    localeManager["openiam.ui.user.disable.confirm"],
                    OPENIAM.ENV.TOKEN_LABEL ? OPENIAM.ENV.TOKEN_LABEL : null
                );
            };

            this.ExtendedActions["REMOVE_USER"] = function () {
                $this.postWithWarn(
                    "REMOVE_USER",
                    localeManager["openiam.ui.user.delete.message"],
                    localeManager["openiam.ui.user.delete.confirm"]
                );
            };
        },

        execute: function (actionId) {
            var extendedAction = this.ExtendedActions[actionId];
            if (extendedAction != null && extendedAction != 'undefined') {
                extendedAction();
            } else {
                this.post(actionId);
            }
            return false;
        },

        postWithWarn: function (actionId, message, confirmText, inputLabel) {
            if (!inputLabel) {
                inputLabel = localeManager["openiam.ui.button.warning.dialog.title"];
            }
            var inp = [{
                required: true,
                label: inputLabel,
                elmtType: "input",
                className: "full rounded",
                id: "addInfo"
            }];
            if (actionId == "DISABLE_USER") {
                inp = [{
                    required: true,
                    label: inputLabel,
                    elmtType: "input",
                    className: "full rounded",
                    id: "addInfo"
                }, {
                    required: false,
                    label:  localeManager["openiam.ui.button.disable.emergency"],
                    elmtType: "input",
                    type: "checkbox",
                    className: "rounded",
                    id: "emergencyDisable",
                    divClass: "taleft"
                }];
            }
            OPENIAM.Modal.Warn({
                message: message,
                inputs: inp,
                buttons: true,
                OK: {
                    text: confirmText,
                    onClick: function () {
                        var info = $("#addInfo").val();
                        var emDisable = $("#emergencyDisable").is(':checked') ? "On":"Off";
                        if (info) {
                            OPENIAM.Modal.Close();
                            if (actionId == "DISABLE_USER") {
                                var listAttr = [];
                                var action = {
                                    name: "actionCode",
                                    value: "AA"
                                };
                                var ticket = {
                                    name: "userEditActionInfo",
                                    value: info
                                };
                                var emergencyDisable = {
                                    name: "emergencyDisable",
                                    value: emDisable
                                }
                                listAttr.push(ticket);
                                listAttr.push(action);
                                listAttr.push(emergencyDisable);
                                var obj = {
                                    id: OPENIAM.ENV.UserId,
                                    userAttributes: listAttr
                                };
                                OPENIAM.UserAN.Form.Actions.postObjectRedirect(actionId, obj);
                            } else if (actionId == "REMOVE_USER") {
                                var obj = {
                                    userId: OPENIAM.ENV.UserId,
                                    description: info,
                                    performNow: true,
                                    performDataString: ""
                                };
                                OPENIAM.UserAN.Form.Actions.postObjectRedirect(actionId, obj);
                            } else {
                                var obj = {
                                    id: OPENIAM.ENV.UserId
                                };
                                OPENIAM.UserAN.Form.Actions.postObjData(actionId, obj);
                            }
                        }
                    }
                },
                Cancel: {
                    text: localeManager["openiam.ui.button.cancel"],
                    onClick: function () {
                        OPENIAM.Modal.Close();
                    }
                }
            });
        },

        post: function (actionId, info) {
            var url = this.Links[actionId];
            if (url) {
                if ((actionId == "ENABLE_USER")||(actionId == "ACTIVE_USER")) {
                    var listAttr = [];
                    var action = {
                        name: "actionCode",
                        value: "A9"
                    };
                    listAttr.push(action);
                    var obj = {
                        id: OPENIAM.ENV.UserId,
                        userAttributes: listAttr};
                    OPENIAM.UserAN.Form.postDataJsonRedirect(url, obj)
                } else {
                    var obj = {id: OPENIAM.ENV.UserId, info: info};
                    OPENIAM.UserAN.Form.postData(url, obj)
                }
            }
        },

        postObjData: function (actionId, obj) {
            var url = this.Links[actionId];
            if (url) {
                OPENIAM.UserAN.Form.postData(url, obj)
            }
        },

        postWithWarnExtended: function (actionId, message, confirmText, inputLabel) {
            if (!inputLabel) {
                inputLabel = localeManager["openiam.ui.button.warning.dialog.title"];
            }
            OPENIAM.Modal.Warn({
                fields: [
                    {fieldName: "description", type: "text", label: localeManager["openiam.ui.common.description"]},
                    {
                        fieldName: "deleteNow",
                        type: "checkbox",
                        label: localeManager["openiam.ui.user.action.perform.now"]
                    },
                    {
                        fieldName: "lastDateAction",
                        type: "datetimepicker",
                        label: localeManager["openiam.ui.user.end.date"]
                    }
                ],
                message: message,
                inputs: [{
                    required: true,
                    label: inputLabel,
                    elmtType: "input",
                    className: "full rounded",
                    id: "addInfo"
                }],
                buttons: true,
                OK: {
                    text: confirmText,
                    onClick: function () {
                        var info = $("#addInfo").val();
                        if (info) {
                            OPENIAM.Modal.Close();
                            var listAttr = [];
                            var action = {
                                name: "actionCode",
                                value: "AA"
                            };
                            var ticket = {
                                name: "userEditActionInfo",
                                value: info
                            }
                            listAttr.push(ticket);
                            listAttr.push(action);
                            var obj = {
                                userId: OPENIAM.ENV.UserId,
                                performNow: true,
                                performDataString: "",
                                userAttributes: listAttr
                            };
                            OPENIAM.UserAN.Form.Actions.postObjectRedirect(actionId, obj);
                        }
                    }
                },
                Cancel: {
                    text: localeManager["openiam.ui.button.cancel"],
                    onClick: function () {
                        OPENIAM.Modal.Close();
                    }
                }
            });
        },


        postObject: function (actionId, obj) {
            var url = this.Links[actionId];
            if (url) {
                OPENIAM.UserAN.Form.postDataJson(url, obj)

            }
        },
        postObjectRedirect: function (actionId, obj) {
            var url = this.Links[actionId];
            if (url) {
                OPENIAM.UserAN.Form.postDataJsonRedirect(url, obj)

            }
        }
    },

    ButtonsPanel: {
        titles: {
            'REMOVE_USER': localeManager["openiam.ui.button.delete.title"],
            'DEACTIVATE_USER': localeManager["openiam.ui.user.button.deactivate.title"],
            'RESET_CHALLENGE_RESPONSE': localeManager["openiam.ui.user.button.challengeresponse.reset.title"],
            'RESET_ACCOUNT': localeManager["openiam.ui.user.button.account.reset.title"]
        },
        draw: function () {
            var $this = this;
            if (OPENIAM.ENV.initialMenu != null && OPENIAM.ENV.initialMenu != 'undefined') {
                OPENIAM.UserAN.Form.Menu = Object.create(OPENIAM.MenuTree);
                OPENIAM.UserAN.Form.Menu.initialize({
                    tree: OPENIAM.ENV.initialMenu,
                    toHTML: function () {
                        var ul = $('#buttonsPanel').get(0);
                        if (this.getRoot() != null) {
                            var buttons = [];
                            var node = this.getRoot().getChild();
                            while (node != null) {
                                var html = node.toHTML();
                                if (html) {
                                    buttons.push(html);
                                }
                                node = node.getNext();
                            }
                            $(buttons.reverse()).each(function (i, html) {
                                ul.appendChild(html);
                            });
                        }
                        return ul;
                    },
                    onNodeClick: function () {
                    },
                    toNodeHtml: function () {
                        var url = this.getURL();
                        var id = this.getName();
                        if (url) {
                            OPENIAM.UserAN.Form.Actions.Links[id] = url;
                        }
                        var li = document.createElement("li");
                        $(li).addClass("rightBtn");
                        var a = document.createElement("a");
                        a.href = "javascript:void(0);";
                        $(a).attr("id", id).addClass("redBtn").append(this.getText());
                        if ($this.titles[id]) {
                            $(a).attr("title", $this.titles[id]);
                        }
                        $(a).click(function () {
                            OPENIAM.UserAN.Form.Actions.execute(id);
                            return false;
                        });
                        $(li).append(a);
                        return li;
                    }
                });
                OPENIAM.UserAN.Form.Menu.toHTML();
            }
        }
    }
};

$(document).ready(function () {
    if (OPENIAM.ENV.UserId != null && OPENIAM.ENV.UserId != 'undefined') {
        OPENIAM.UserAN.Form.ButtonsPanel.draw();
        OPENIAM.UserAN.Form.Actions.init();
    }
});