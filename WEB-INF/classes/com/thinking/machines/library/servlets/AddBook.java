package com.thinking.machines.library.servlets;
import java.io.*;
import com.thinking.machines.library.dl.*;
import javax.servlet.http.*;
import javax.servlet.*;
public class AddBook extends HttpServlet
{
public void doPost(HttpServletRequest request,HttpServletResponse response)
{ try
{
PrintWriter pw=response.getWriter();
response.setContentType("text/html");
BookInterface book=new Book();
book.setTitle(request.getParameter("title"));
book.setAuthorCode(Integer.parseInt(request.getParameter("authorCode")));
book.setCategory(request.getParameter("category"));
book.setPrice(Integer.parseInt(request.getParameter("price")));
BookDAO bookDAO=new BookDAO();
try
{
bookDAO.add(book);
pw.print("true,Book added.,"+book.getCode());
return;
}catch(DAOException daoException)
{
pw.print("false,"+daoException.getMessage());
return;
}}
catch(Exception exception)
{
System.out.println(exception); // don't forget to remove after testing
}}}