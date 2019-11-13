package com.thinking.machines.library.tags;
import com.thinking.machines.library.dl.*;
import java.util.*;
import javax.servlet.jsp.tagext.*;
import javax.servlet.jsp.*;
import javax.servlet.http.*;
public class IfTagHandler extends TagSupport
{
private boolean expression;
public void setExpression(boolean expression)
{ this.expression=expression;
}
public boolean getExpression()
{
return this.expression;
}
public int doStartTag()
{ if(expression) return EVAL_BODY_INCLUDE;
return SKIP_BODY;
}
public int doEndTag()
{
return EVAL_PAGE;
}}