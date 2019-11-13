package com.thinking.machines.library.tags;
import javax.servlet.jsp.tagext.*;
public class AuthorTEI extends TagExtraInfo
{
public VariableInfo[] getVariableInfo(TagData tagData)
{
VariableInfo[] variables=new VariableInfo[5];
variables[0]=new VariableInfo("serialNumber","java.lang.Integer",true,VariableInfo.NESTED);
variables[1]=new VariableInfo("code","java.lang.Integer",true,VariableInfo.NESTED);
variables[2]=new VariableInfo("name","java.lang.String",true,VariableInfo.NESTED);
variables[3]=new VariableInfo("evenRow","java.lang.Boolean",true,VariableInfo.NESTED);
variables[4]=new VariableInfo("oddRow","java.lang.Boolean",true,VariableInfo.NESTED);
return variables;
}
}