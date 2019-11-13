package com.thinking.machines.library.tags;
import com.thinking.machines.library.dl.*;
import java.util.*;
import javax.servlet.jsp.tagext.*;
public class BookTagHandler extends BodyTagSupport
{
private LinkedList<BookInterface> books;
private LinkedList<AuthorInterface> authors;
private int index;
private int serialNumber;
private int authorCode;
private void reset()
{ this.index=0;
this.serialNumber=0;
this.authorCode=0;
}
public void setAuthorCode(int authorCode)
{ this.authorCode=authorCode;
}
public int getAuthorCode()
{
return this.authorCode;
}
public int doStartTag()
{ this.index=0;
this.serialNumber=0;
try
{
AuthorDAO authorDAO=new AuthorDAO();
authors=authorDAO.getAll();
BookDAO bookDAO=new BookDAO();
if(authorCode==0)
{
books=bookDAO.getAll();
} else
{
books=bookDAO.getAllByAuthorCode(authorCode);
}}
catch(DAOException daoException)
{
return SKIP_BODY;
} if(books.size()==0) return SKIP_BODY;
serialNumber++;
setScriptingVariables();
return EVAL_BODY_INCLUDE;
}
public int doAfterBody()
{ index++;
if(index==books.size()) return SKIP_BODY;
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
BookInterface book;
book=books.get(index);
pageContext.setAttribute("serialNumber",new Integer(serialNumber));
pageContext.setAttribute("code",new Integer(book.getCode()));
pageContext.setAttribute("title",book.getTitle());
pageContext.setAttribute("authorCode",new Integer(book.getAuthorCode()));
pageContext.setAttribute("authorName",new String(getAuthor(book.getAuthorCode()).getName()));
pageContext.setAttribute("category",book.getCategory());
pageContext.setAttribute("price",new Integer(book.getPrice()));
pageContext.setAttribute("evenRow",new Boolean(serialNumber%2==0));
pageContext.setAttribute("oddRow",new Boolean(serialNumber%2!=0));
}
private AuthorInterface getAuthor(int code)
{
for(AuthorInterface author:authors)
{ if(author.getCode()==code) return author;
}
return null; // this case won't arise
}
}