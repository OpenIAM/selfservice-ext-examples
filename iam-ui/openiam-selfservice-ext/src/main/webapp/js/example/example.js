$(document).ready(function () {
    $('#input-button-search').on('click', function () {
        $.ajax({
            url: "user/search/" + $("#input-text-query").val() + ".html",
            type: "GET",
            dataType: "text",
            success: function (data, textStatus, jqXHR) {
                if (data) {
                    data = $.parseJSON(data);
                    if ("SUCCESS" == data.status) {
                        var container = $('#div-searchResults');
                        container.empty();
                        for (var i = 0; i < data.count; i++) {
                            var userDiv = $(document.createElement("div"));
                            var userBean = data.lightUserSearchModels[i];
                            userDiv.text(userBean.firstName + " " + userBean.lastName);
                            container.append(userDiv);
                        }
                    } else {
                        OPENIAM.Modal.Error(localeManager["openiam.ui.internal.error"]);
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                OPENIAM.Modal.Error("Search Error!");
            }
        });
    })
});