package com.thinking.machines.library.dl;
import java.util.*;
import java.sql.*;
public class BookDAO implements BookDAOInterface
{
public void add(BookInterface book) throws DAOException
{ try
{
Connection connection=DAOConnection.getConnection();
PreparedStatement preparedStatement;
preparedStatement=connection.prepareStatement("select 1 as result from book where title=?");
preparedStatement.setString(1,book.getTitle());
ResultSet resultSet=preparedStatement.executeQuery();
boolean exists=resultSet.next();
resultSet.close();
preparedStatement.close();
if(exists)
{ connection.close();
throw new DAOException("Book with title : "+book.getTitle()+" exists.");
}
preparedStatement=connection.prepareStatement("select 1 as result from author where code=?");
preparedStatement.setInt(1,book.getAuthorCode());
resultSet=preparedStatement.executeQuery();
exists=resultSet.next();
resultSet.close();
preparedStatement.close();
if(!exists)
{ connection.close();
throw new DAOException("Invalid author code : "+book.getAuthorCode());
}
preparedStatement=connection.prepareStatement("insert into book (title,author_code,category,price) values(?,?,?,?)",Statement.RETURN_GENERATED_KEYS);
preparedStatement.setString(1,book.getTitle());
preparedStatement.setInt(2,book.getAuthorCode());
preparedStatement.setString(3,book.getCategory());
preparedStatement.setInt(4,book.getPrice());
preparedStatement.executeUpdate();
resultSet=preparedStatement.getGeneratedKeys();
resultSet.next();
book.setCode(resultSet.getInt(1));
resultSet.close();
preparedStatement.close();
connection.close();
}catch(SQLException sqlException)
{ throw new DAOException("Unable to add : "+sqlException.getMessage());
}}
public void update(BookInterface book) throws DAOException
{ try
{
Connection connection=DAOConnection.getConnection();
PreparedStatement preparedStatement;
preparedStatement=connection.prepareStatement("select 1 as result from book where code=?");
preparedStatement.setInt(1,book.getCode());
ResultSet resultSet=preparedStatement.executeQuery();
boolean exists=resultSet.next();
resultSet.close();
preparedStatement.close();
if(!exists)
{ connection.close();
throw new DAOException("Book code : "+book.getCode()+" does not exist.");
}
preparedStatement=connection.prepareStatement("select 1 as result from book where title=? and code<>?");
preparedStatement.setString(1,book.getTitle());
preparedStatement.setInt(2,book.getCode());
resultSet=preparedStatement.executeQuery();
exists=resultSet.next();
resultSet.close();
preparedStatement.close();
if(exists)
{ connection.close();
throw new DAOException("Book title : "+book.getTitle()+" exists.");
}
preparedStatement=connection.prepareStatement("select 1 as result from author where code=?");
preparedStatement.setInt(1,book.getAuthorCode());
resultSet=preparedStatement.executeQuery();
exists=resultSet.next();
resultSet.close();
preparedStatement.close();
if(!exists)
{ connection.close();
throw new DAOException("Author code : "+book.getAuthorCode()+" does not exist.");
}
preparedStatement=connection.prepareStatement("update book set title=?,author_code=?,category=?,price=? where code=?");
preparedStatement.setString(1,book.getTitle());
preparedStatement.setInt(2,book.getAuthorCode());
preparedStatement.setString(3,book.getCategory());
preparedStatement.setInt(4,book.getPrice());
preparedStatement.setInt(5,book.getCode());
preparedStatement.executeUpdate();
preparedStatement.close();
connection.close();
}catch(SQLException sqlException)
{ throw new DAOException("Unable to update : "+sqlException.getMessage());
}}
public void remove(int code) throws DAOException
{ try
{
Connection connection=DAOConnection.getConnection();
PreparedStatement preparedStatement;
preparedStatement=connection.prepareStatement("select 1 as result from book where code=?");
preparedStatement.setInt(1,code);
ResultSet resultSet=preparedStatement.executeQuery();
boolean exists=resultSet.next();
resultSet.close();
preparedStatement.close();
if(!exists)
{ connection.close();
throw new DAOException("Book code : "+code+" does not exist.");
}
preparedStatement=connection.prepareStatement("delete from book where code=?");
preparedStatement.setInt(1,code);
preparedStatement.executeUpdate();
preparedStatement.close();
connection.close();
}catch(SQLException sqlException)
{ throw new DAOException("Unable to delete : "+sqlException.getMessage());
}}
public BookInterface getByCode(int code) throws DAOException
{ try
{
Connection connection=DAOConnection.getConnection();
PreparedStatement preparedStatement;
preparedStatement=connection.prepareStatement("select * from book where code=?");
preparedStatement.setInt(1,code);
ResultSet resultSet;
resultSet=preparedStatement.executeQuery();
if(resultSet.next()==false)
{
resultSet.close();
preparedStatement.close();
connection.close();
throw new DAOException("Book code : "+code+" does not exist.");
}
BookInterface book;
book=new Book();
book.setCode(resultSet.getInt("code"));
book.setTitle(resultSet.getString("title").trim());
book.setAuthorCode(resultSet.getInt("author_code"));
book.setCategory(resultSet.getString("category").trim());
book.setPrice(resultSet.getInt("price"));
resultSet.close();
preparedStatement.close();
connection.close();
return book;
}catch(SQLException sqlException)
{ throw new DAOException("Unable to fetch record : "+sqlException.getMessage());
}}
public BookInterface getByTitle(String title) throws DAOException
{ try
{
Connection connection=DAOConnection.getConnection();
PreparedStatement preparedStatement;
preparedStatement=connection.prepareStatement("select * from book where title=?");
preparedStatement.setString(1,title);
ResultSet resultSet;
resultSet=preparedStatement.executeQuery();
if(resultSet.next()==false)
{
resultSet.close();
preparedStatement.close();
connection.close();
throw new DAOException("Book title : "+title+" does not exist.");
}
BookInterface book;
book=new Book();
book.setCode(resultSet.getInt("code"));
book.setTitle(resultSet.getString("title").trim());
book.setAuthorCode(resultSet.getInt("author_code"));
book.setCategory(resultSet.getString("category").trim());
book.setPrice(resultSet.getInt("price"));
resultSet.close();
preparedStatement.close();
connection.close();
return book;
}catch(SQLException sqlException)
{ throw new DAOException("Unable to fetch record : "+sqlException.getMessage());
}}
public LinkedList<BookInterface> getAll() throws DAOException
{
LinkedList<BookInterface> books;
try
{
Connection connection=DAOConnection.getConnection();
Statement statement=connection.createStatement();
ResultSet resultSet=statement.executeQuery("select * from book order by title");
if(resultSet.next()==false)
{
resultSet.close();
statement.close();
connection.close();
throw new DAOException("No books");
}
books=new LinkedList<BookInterface>();
Book book;
do
{
book=new Book();
book.setCode(resultSet.getInt("code"));
book.setTitle(resultSet.getString("title").trim());
book.setAuthorCode(resultSet.getInt("author_code"));
book.setCategory(resultSet.getString("category").trim());
book.setPrice(resultSet.getInt("price"));
books.add(book);
}while(resultSet.next());
resultSet.close();
statement.close();
connection.close();
return books;
}catch(SQLException sqlException)
{ throw new DAOException("Unable to fetch records : "+sqlException.getMessage());
}}
public LinkedList<BookInterface> getAllByAuthorCode(int authorCode) throws DAOException
{
LinkedList<BookInterface> books;
try
{
Connection connection=DAOConnection.getConnection();
PreparedStatement preparedStatement=connection.prepareStatement("Select * from book where author_code=?");
preparedStatement.setInt(1,authorCode);
ResultSet resultSet=preparedStatement.executeQuery();
if(resultSet.next()==false)
{
resultSet.close();
preparedStatement.close();
connection.close();
throw new DAOException("No books");
}
books=new LinkedList<BookInterface>();
Book book;
do
{
book=new Book();
book.setCode(resultSet.getInt("code"));
book.setTitle(resultSet.getString("title").trim());
book.setAuthorCode(resultSet.getInt("author_code"));
book.setCategory(resultSet.getString("category").trim());
book.setPrice(resultSet.getInt("price"));
books.add(book);
}while(resultSet.next());
resultSet.close();
preparedStatement.close();
connection.close();
return books;
}catch(SQLException sqlException)
{ throw new DAOException("Unable to fetch records : "+sqlException.getMessage());
}}
public boolean containsBookWithAuthorCode(int code) throws DAOException
{ try
{
Connection connection=DAOConnection.getConnection();
PreparedStatement preparedStatement=connection.prepareStatement("select 1 as result from book where author_code=?");
preparedStatement.setInt(1,code);
ResultSet resultSet=preparedStatement.executeQuery();
boolean contains=resultSet.next();
resultSet.close();
preparedStatement.close();
connection.close();
return contains;
}catch(SQLException sqlException)
{ throw new DAOException("Unable to fetch records : "+sqlException.getMessage());
}}
public long getCount() throws DAOException
{ try
{
Connection connection=DAOConnection.getConnection();
Statement statement=connection.createStatement();
ResultSet resultSet=statement.executeQuery("select count(*) as cnt from book");
resultSet.next();
long count=resultSet.getLong("cnt");
resultSet.close();
statement.close();
connection.close();
return count;
}catch(SQLException sqlException)
{ throw new DAOException("Unable to fetch records : "+sqlException.getMessage());
}}}