package com.thinking.machines.library.servlets;
import com.thinking.machines.library.dl.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
public class AddAuthor extends HttpServlet
{
public void doPost(HttpServletRequest request,HttpServletResponse response)
{ try
{
PrintWriter pw=response.getWriter();
response.setContentType("text/html");
String name=request.getParameter("name");
AuthorInterface author=new Author();
author.setName(name);
AuthorDAO authorDAO=new AuthorDAO();
try
{ authorDAO.add(author);
pw.print("true,Author added.,"+author.getCode());
}catch(DAOException daoException)
{
pw.print("false,"+daoException.getMessage());
}}
catch(Exception exception)
{
System.out.println(exception); // remove after testing
}}}