package com.thinking.machines.library.servlets;
import com.thinking.machines.library.dl.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.util.*;
public class GetBooks extends HttpServlet
{
public void doGet(HttpServletRequest request,HttpServletResponse response)
{ try
{
PrintWriter pw=response.getWriter();
response.setContentType("text/html");
BookDAO bookDAO=new BookDAO();
try
{
LinkedList<BookInterface> books;
books=bookDAO.getAll();
boolean applyComma=false;
for(BookInterface book:books)
{ if(applyComma) pw.print(",");
pw.print(book.getCode()+","+book.getTitle()+","+book.getAuthorCode()+","+book.getCategory()
+","+book.getPrice());
applyComma=true;
}}
catch(DAOException daoException)
{
pw.print("false,No books");
}}
catch(Exception exception)
{
System.out.println(exception); // remove after testing
}}}