package com.thinking.machines.library.servlets;
import java.io.*;
import com.thinking.machines.library.dl.*;
import javax.servlet.http.*;
import javax.servlet.*;
public class DeleteAuthor extends HttpServlet
{
public void doGet(HttpServletRequest request,HttpServletResponse response)
{
doPost(request,response);
}
public void doPost(HttpServletRequest request,HttpServletResponse response)
{
BookDAO bookDAO=new BookDAO();
PrintWriter pw=null;
int code=Integer.parseInt(request.getParameter("code"));
try
{
pw=response.getWriter();
response.setContentType("text/html");
boolean bookWithAuthorExists=bookDAO.containsBookWithAuthorCode(code);
if(bookWithAuthorExists)
{
pw.print("false,Cannot delete author as book exists against it.");
return;
}}
catch(DAOException daoException)
{
System.out.println(daoException); // don't forget to remove after testing
} catch(Exception exception)
{
System.out.println(exception); // don't forget to remove after testing
} try
{
AuthorDAO authorDAO=new AuthorDAO();
try
{ authorDAO.getByCode(code);
}catch(DAOException daoException)
{
pw.print("true,Author deleted.");
return;
} try
{ authorDAO.remove(code);
pw.print("true,Author deleted.");
return;
}catch(DAOException daoException)
{
pw.print("false,"+daoException.getMessage());
}}
catch(Exception exception)
{
System.out.println(exception); // don't forget to remove after testing
}}}