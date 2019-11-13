package com.thinking.machines.library.tags;
import javax.servlet.jsp.tagext.*;
public class BookTEI extends TagExtraInfo
{
public VariableInfo[] getVariableInfo(TagData tagData)
{
VariableInfo[] variables=new VariableInfo[9];
variables[0]=new VariableInfo("serialNumber","java.lang.Integer",true,VariableInfo.NESTED);
variables[1]=new VariableInfo("code","java.lang.Integer",true,VariableInfo.NESTED);
variables[2]=new VariableInfo("title","java.lang.String",true,VariableInfo.NESTED);
variables[3]=new VariableInfo("authorCode","java.lang.Integer",true,VariableInfo.NESTED);
variables[4]=new VariableInfo("authorName","java.lang.String",true,VariableInfo.NESTED);
variables[5]=new VariableInfo("category","java.lang.String",true,VariableInfo.NESTED);
variables[6]=new VariableInfo("price","java.lang.Integer",true,VariableInfo.NESTED);
variables[7]=new VariableInfo("evenRow","java.lang.Boolean",true,VariableInfo.NESTED);
variables[8]=new VariableInfo("oddRow","java.lang.Boolean",true,VariableInfo.NESTED);
return variables;
}}