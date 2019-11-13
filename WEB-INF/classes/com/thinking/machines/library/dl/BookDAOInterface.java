package com.thinking.machines.library.dl;
import java.util.*;
public interface BookDAOInterface
{
public void add(BookInterface book) throws DAOException;
public void update(BookInterface book) throws DAOException;
public void remove(int code) throws DAOException;
public BookInterface getByCode(int code) throws DAOException;
public BookInterface getByTitle(String title) throws DAOException;
public LinkedList<BookInterface> getAll() throws DAOException;
public LinkedList<BookInterface> getAllByAuthorCode(int authorCode) throws DAOException;
public boolean containsBookWithAuthorCode(int code) throws DAOException;
public long getCount() throws DAOException;
}