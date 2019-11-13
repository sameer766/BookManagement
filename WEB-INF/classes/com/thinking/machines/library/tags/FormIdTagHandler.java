package com.thinking.machines.library.tags;
import javax.servlet.jsp.tagext.*;
public class FormIdTagHandler extends TagSupport
{
public int doStartTag()
{ try
{
String formId=java.util.UUID.randomUUID().toString();
pageContext.setAttribute(formId,formId,pageContext.SESSION_SCOPE);
pageContext.getOut().write("<input type='hidden' id='formId' name='formId' value='"+formId+"'>");
}catch(Exception exception)
{
System.out.println(exception); // don't forget to remove after testing
}
return EVAL_BODY_INCLUDE;
}
public int doEndTag()
{
return EVAL_PAGE;
}}