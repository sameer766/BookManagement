package com.thinking.machines.library.servlets;
import java.io.*;
import com.thinking.machines.library.dl.*;
import javax.servlet.http.*;
import javax.servlet.*;
public class UpdateBook extends HttpServlet
{
public void doPost(HttpServletRequest request,HttpServletResponse response)
{ try
{
PrintWriter pw;
pw=response.getWriter();
BookInterface book;
BookDAO bookDAO=new BookDAO();
try
{
book=bookDAO.getByCode(Integer.parseInt(request.getParameter("code")));
book.setTitle(request.getParameter("title"));
book.setAuthorCode(Integer.parseInt(request.getParameter("authorCode")));
book.setCategory(request.getParameter("category"));
book.setPrice(Integer.parseInt(request.getParameter("price")));
}catch(DAOException daoException)
{
pw.print("false,That book cannot be updated as someone working in parallel deleted the book while you were trying to update it.,delete");
return;
} try
{
bookDAO.update(book);
pw.print("true,Book updated.");
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