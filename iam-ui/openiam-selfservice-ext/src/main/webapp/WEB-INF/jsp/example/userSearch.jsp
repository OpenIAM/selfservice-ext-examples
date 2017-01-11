<%
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("Pragma", "no-cache");
    response.setDateHeader("Expires", -1);
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib prefix="openiam" uri="http://www.openiam.com/tags/openiam" %>
<%@ page language="java" pageEncoding="utf-8" contentType="text/html;charset=utf-8" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title></title>
    <link href="/openiam-ui-static/css/common/style.css" rel="stylesheet" type="text/css" media="screen"/>
    <link href="/openiam-ui-static/css/common/style.client.css" rel="stylesheet" type="text/css"/>
    <link href="/openiam-ui-static/js/common/jquery/css/smoothness/jquery-ui-1.9.1.custom.css" rel="stylesheet"
          type="text/css"/>
    <link href="/openiam-ui-static/plugins/tablesorter/themes/yui/style.css" rel="stylesheet" type="text/css"/>
    <link href="/openiam-ui-static/js/common/plugins/modalsearch/modal.search.css" rel="stylesheet" type="text/css"/>
    <link href="/openiam-ui-static/js/webconsole/plugins/usersearch/user.search.css" rel="stylesheet" type="text/css"/>
    <link href="/openiam-ui-static/plugins/tiptip/tipTip.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="/openiam-ui-static/js/common/menutree.js"></script>
    <script type="text/javascript" src="/openiam-ui-static/js/common/openiam.common.js"></script>
    <script type="text/javascript" src="/openiam-ui-static/_dynamic/openiamResourceBundle.js"></script>
    <script type="text/javascript" src="/openiam-ui-static/js/common/jquery/jquery-1.8.2.js"></script>
    <script type="text/javascript" src="/selfservice-ext/js/example/example.js"></script>
</head>
<body>
<div id="title" class="title"><fmt:message key="example.page.title"/></div>
<div class="frameContentDivider">
    <label for="input-text-query">Search</label>
    <input type="text" id="input-text-query" name="input-text-query"/>
    <input id="input-button-search" class="redBtn" type="button" value="Search By Login">
    <div id="div-searchResults"/>
</div>
</body>
</html>