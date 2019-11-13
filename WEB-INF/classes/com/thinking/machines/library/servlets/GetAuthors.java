package com.thinking.machines.library.servlets;
import com.thinking.machines.library.dl.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.util.*;
public class GetAuthors extends HttpServlet
{
public void doGet(HttpServletRequest request,HttpServletResponse response)
{ try
{
PrintWriter pw=response.getWriter();
response.setContentType("text/html");
AuthorDAO authorDAO=new AuthorDAO();
try
{
LinkedList<AuthorInterface> authors;
authors=authorDAO.getAll();
boolean applyComma=false;
for(AuthorInterface author:authors)
{ if(applyComma) pw.print(",");
pw.print(author.getCode()+","+author.getName());
applyComma=true;
}}
catch(DAOException daoException)
{
pw.print("false,No authors");
}}
catch(Exception exception)
{
System.out.println(exception); // remove after testing
}}}