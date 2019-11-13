package com.thinking.machines.library.dl;
import java.util.*;
import java.sql.*;
public class AuthorDAO implements AuthorDAOInterface
{
public void add(AuthorInterface author) throws DAOException
{ try
{
Connection connection=DAOConnection.getConnection();
PreparedStatement preparedStatement;
preparedStatement=connection.prepareStatement("select 1 as result from author where name=?");
preparedStatement.setString(1,author.getName());
ResultSet resultSet=preparedStatement.executeQuery();
boolean exists=resultSet.next();
resultSet.close();
preparedStatement.close();
if(exists)
{ connection.close();
throw new DAOException("Author : "+author.getName()+" exists.");
}
preparedStatement=connection.prepareStatement("insert into author (name) values(?)",Statement.RETURN_GENERATED_KEYS);
preparedStatement.setString(1,author.getName());
preparedStatement.executeUpdate();
resultSet=preparedStatement.getGeneratedKeys();
resultSet.next();
author.setCode(resultSet.getInt(1));
resultSet.close();
preparedStatement.close();
connection.close();
}catch(SQLException sqlException)
{ throw new DAOException("Unable to add : "+sqlException.getMessage());
}}
public void update(AuthorInterface author) throws DAOException
{ try
{
Connection connection=DAOConnection.getConnection();
PreparedStatement preparedStatement;
preparedStatement=connection.prepareStatement("select 1 as result from author where name=? and code <>?");
preparedStatement.setString(1,author.getName());
preparedStatement.setInt(2,author.getCode());
ResultSet resultSet=preparedStatement.executeQuery();
boolean exists=resultSet.next();
resultSet.close();
preparedStatement.close();
if(exists)
{ connection.close();
throw new DAOException("Author : "+author.getName()+" exists.");
}
preparedStatement=connection.prepareStatement("update author set name=? where code=?");
preparedStatement.setString(1,author.getName());
preparedStatement.setInt(2,author.getCode());
preparedStatement.executeUpdate();
preparedStatement.close();
connection.close();
}catch(SQLException sqlException)
{ throw new DAOException("Unable to update :"+sqlException.getMessage());
}} public void remove(int code) throws DAOException
{ try
{
Connection connection=DAOConnection.getConnection();
PreparedStatement preparedStatement;
preparedStatement=connection.prepareStatement("select 1 as result from author where code=?");
preparedStatement.setInt(1,code);
ResultSet resultSet=preparedStatement.executeQuery();
boolean exists=resultSet.next();
resultSet.close();
preparedStatement.close();
if(exists==false)
{ connection.close();
throw new DAOException("Author code : "+code+"does not exist.");
}
preparedStatement=connection.prepareStatement("select 1 as result from book where author_code=?");
preparedStatement.setInt(1,code);
resultSet=preparedStatement.executeQuery();
exists=resultSet.next();
resultSet.close();
preparedStatement.close();
if(exists)
{ connection.close();
throw new DAOException("Cannot delete author as book exists against it.");
}
preparedStatement=connection.prepareStatement("delete from author where code=?");
preparedStatement.setInt(1,code);
preparedStatement.executeUpdate();
preparedStatement.close();
connection.close();
}catch(SQLException sqlException)
{ throw new DAOException("Unable to delete : "+sqlException.getMessage());
}}
public AuthorInterface getByCode(int code) throws DAOException
{ try
{
Connection connection=DAOConnection.getConnection();
PreparedStatement preparedStatement;
preparedStatement=connection.prepareStatement("select * from author where code=?");
preparedStatement.setInt(1,code);
ResultSet resultSet=preparedStatement.executeQuery();
if(resultSet.next()==false)
{
resultSet.close();
preparedStatement.close();
connection.close();
throw new DAOException("Author code : "+code+" does not exist.");
}
AuthorInterface author=new Author();
author.setCode(resultSet.getInt("code"));
author.setName(resultSet.getString("name").trim());
resultSet.close();
preparedStatement.close();
connection.close();
return author;
}catch(SQLException sqlException)
{ throw new DAOException("Unable to fetch record : "+sqlException.getMessage());
}}
public AuthorInterface getByName(String name) throws DAOException
{ try
{
Connection connection=DAOConnection.getConnection();
PreparedStatement preparedStatement;
preparedStatement=connection.prepareStatement("select * from author where name=?");
preparedStatement.setString(1,name);
ResultSet resultSet=preparedStatement.executeQuery();
if(resultSet.next()==false)
{
resultSet.close();
preparedStatement.close();
connection.close();
throw new DAOException("Author : "+name+" does not exist.");
}
AuthorInterface author=new Author();
author.setCode(resultSet.getInt("code"));
author.setName(resultSet.getString("name").trim());
resultSet.close();
preparedStatement.close();
connection.close();
return author;
}catch(SQLException sqlException)
{ throw new DAOException("Unable to fetch record : "+sqlException.getMessage());
}
}
public LinkedList<AuthorInterface> getAll() throws DAOException
{
LinkedList<AuthorInterface> authors;
try
{
Connection connection=DAOConnection.getConnection();
Statement statement=connection.createStatement();
ResultSet resultSet=statement.executeQuery("select * from author order by name ");
if(resultSet.next()==false)
{
resultSet.close();
statement.close();
connection.close();
throw new DAOException("No authors");
} authors=new LinkedList<AuthorInterface>();
AuthorInterface author;
do
{ author=new Author();
author.setCode(resultSet.getInt("code"));
author.setName(resultSet.getString("name").trim());
authors.add(author);
}while(resultSet.next());
resultSet.close();
statement.close();
connection.close();
return authors;
}catch(SQLException sqlException)
{ throw new DAOException("Unable to fetch records : "+sqlException.getMessage());
}}
public long getCount() throws DAOException
{ try
{
Connection connection=DAOConnection.getConnection();
Statement statement=connection.createStatement();
ResultSet resultSet=statement.executeQuery("select count(*) as cnt from author");
resultSet.next();
long count=resultSet.getLong("cnt");
resultSet.close();
statement.close();
connection.close();
return count;
}catch(SQLException sqlException)
{ throw new DAOException("Unable to fetch records : "+sqlException.getMessage());
}}}
