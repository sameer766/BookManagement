package com.thinking.machines.library.tags;
import com.thinking.machines.library.beans.*;
import javax.servlet.jsp.tagext.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
public class FormResubmittedTagHandler extends TagSupport
{
public int doStartTag()
{ try
{
HttpServletRequest request=(HttpServletRequest)pageContext.getRequest();
String formId=request.getParameter("formId");
if(formId==null)
{
NotificationBean notificationBean;
notificationBean=new NotificationBean();
notificationBean.setMessage("You should not refresh / resubmit data.");
notificationBean.setActionText("Ok");
notificationBean.setActionURL("/");
pageContext.setAttribute("notificationBean",notificationBean,PageContext.REQUEST_SCOPE);
return EVAL_BODY_INCLUDE;
}
HttpSession session=request.getSession();
if(session.getAttribute(formId)==null)
{
NotificationBean notificationBean;
notificationBean=new NotificationBean();
notificationBean.setMessage("You should not refresh / resubmit data.");
notificationBean.setActionText("Ok");
notificationBean.setActionURL("/");
pageContext.setAttribute("notificationBean",notificationBean,PageContext.REQUEST_SCOPE);
return EVAL_BODY_INCLUDE;
}
session.removeAttribute(formId);
}catch(Exception exception)
{
System.out.println(exception); // dont' forget to remove after testing
}
return SKIP_BODY;
}
public int doEndTag()
{
return EVAL_PAGE;
}}