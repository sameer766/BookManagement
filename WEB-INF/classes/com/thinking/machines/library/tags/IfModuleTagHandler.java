package com.thinking.machines.library.tags;
import com.thinking.machines.library.dl.*;
import java.util.*;
import javax.servlet.jsp.tagext.*;
import javax.servlet.jsp.*;
import javax.servlet.http.*;
public class IfModuleTagHandler extends TagSupport
{
public int doStartTag()
{
HttpServletRequest request=(HttpServletRequest)pageContext.getRequest();
if(request.getRequestURI().endsWith("/") || request.getRequestURI().endsWith("/index.jsp")) return
SKIP_BODY;
return EVAL_BODY_INCLUDE;
}
public int doEndTag()
{
return EVAL_PAGE;
}}