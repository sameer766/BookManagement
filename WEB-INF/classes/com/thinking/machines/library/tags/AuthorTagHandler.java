package com.thinking.machines.library.tags;
import com.thinking.machines.library.dl.*;
import java.util.*;
import javax.servlet.jsp.tagext.*;
public class AuthorTagHandler extends BodyTagSupport
{
private LinkedList<AuthorInterface> authors;
private int index;
private int serialNumber;
private void reset()
{ this.index=0;
this.serialNumber=0;
}
public int doStartTag()
{ this.index=0;
this.serialNumber=0;
try
{
AuthorDAO authorDAO=new AuthorDAO();
authors=authorDAO.getAll();
}catch(DAOException daoException)
{
return SKIP_BODY;
} if(authors.size()==0) return SKIP_BODY;
serialNumber++;
setScriptingVariables();
return EVAL_BODY_INCLUDE;
}
public int doAfterBody()
{ index++;
if(index==authors.size()) return SKIP_BODY;
serialNumber++;
setScriptingVariables();
return EVAL_BODY_AGAIN;
}
public int doEndTag()
{
reset();
return EVAL_PAGE;
}
private void setScriptingVariables()
{
AuthorInterface author;
author=authors.get(index);
pageContext.setAttribute("serialNumber",new Integer(serialNumber));
pageContext.setAttribute("code",new Integer(author.getCode()));
pageContext.setAttribute("name",author.getName());
pageContext.setAttribute("evenRow",new Boolean(serialNumber%2==0));
pageContext.setAttribute("oddRow",new Boolean(serialNumber%2!=0));
}}