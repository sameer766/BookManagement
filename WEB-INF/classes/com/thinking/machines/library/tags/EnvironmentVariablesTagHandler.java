package com.thinking.machines.library.tags;
import com.thinking.machines.library.dl.*;
import java.util.*;
import javax.servlet.jsp.tagext.*;
import javax.servlet.jsp.*;
public class EnvironmentVariablesTagHandler extends TagSupport
{
public int doStartTag()
{
pageContext.setAttribute("contextName","crudthree",PageContext.REQUEST_S
COPE);
return EVAL_BODY_INCLUDE;
}
public int doEndTag()
{
return EVAL_PAGE;
}}