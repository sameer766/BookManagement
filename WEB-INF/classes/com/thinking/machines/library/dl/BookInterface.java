package com.thinking.machines.library.dl;
public interface BookInterface extends java.io.Serializable,Comparable<BookInterface>
{
public void setCode(int code);
public int getCode();
public void setTitle(String title);
public String getTitle();
public void setAuthorCode(int authorCode);
public int getAuthorCode();
public void setCategory(String category);
public String getCategory();
public void setPrice(int price);
public int getPrice();
}