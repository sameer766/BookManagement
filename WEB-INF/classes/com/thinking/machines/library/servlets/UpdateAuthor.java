package com.thinking.machines.library.servlets;
import java.io.*;
import com.thinking.machines.library.dl.*;
import javax.servlet.http.*;
import javax.servlet.*;
public class UpdateAuthor extends HttpServlet
{
public void doPost(HttpServletRequest request,HttpServletResponse response)
{ try
{
PrintWriter pw=response.getWriter();
response.setContentType("text/html");
int code=Integer.parseInt(request.getParameter("code"));
String name=request.getParameter("name");
AuthorDAO authorDAO=new AuthorDAO();
AuthorInterface author;
try
{ author=authorDAO.getByCode(code);
}catch(DAOException daoException)
{
pw.print("false,That author cannot be updated as someone working in parallel deleted the author while you were trying to update it.,delete");
return;
} author.setName(name);
try
{ authorDAO.update(author);
pw.print("true,Author : "+name+" updated.");
}catch(DAOException daoException)
{
pw.print("false,"+daoException.getMessage());
}}
catch(Exception exception)
{
System.out.println(exception); // don't forget to remove after testing
}}}