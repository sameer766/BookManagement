package com.thinking.machines.library.servlets;
import java.io.*;
import com.thinking.machines.library.dl.*;
import javax.servlet.http.*;
import javax.servlet.*;
public class DeleteBook extends HttpServlet
{
public void doPost(HttpServletRequest request,HttpServletResponse response)
{ try
{
PrintWriter pw=response.getWriter();
response.setContentType("text/html");
try
{ int code=Integer.parseInt(request.getParameter("code"));
BookDAO bookDAO=new BookDAO();
bookDAO.remove(code);
pw.print("true,Book deleted successfully.");
return;
}catch(DAOException daoException)
{
pw.print("false,"+daoException.getMessage());
}}
catch(Exception exception)
{
System.out.println(exception); // don't forget to remove after testing
}
}
}