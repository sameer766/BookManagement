<%@ taglib uri='/WEB-INF/tlds/CustomTags.tld' prefix='tm' %>
<tm:SetEnvironmentVariables/>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Whatever Corporation</title>
<meta name="description" content="The Whatever Corporation">
<meta name="author" content="Thinking Machines">
<link rel='stylesheet' type='text/css' href='/${contextName}/css/styles.css' >
<link rel='stylesheet' type='text/css' href='/${contextName}/tm-js-1/tm-js-1.css' >
<script src='/${contextName}/js/MasterPageTopSection.js'></script>
</head>
<body>
<div class='header'>
<table>
<tr>
<td>
<img src='/${contextName}/images/logo.png'><br>
</td>
<td align='right' class='home'>
<tm:IfModule>
<a href='/${contextName}/'>Home</a>
</tm:IfModule>
</td>
</table>
</div>
<br>