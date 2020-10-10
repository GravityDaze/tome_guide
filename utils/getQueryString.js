export const getMessage = (searchValue) =>
			{
					var result=document.location.search;
				//得到？后的的数据
				result=result.substring(1);
				//按&分割键值对
				var r2=result.split("&");
	
				
				var obj1={};
				
				for(var i=0;i<r2.length;i++)
				{
					var r3=r2[i].split("=");
					//.不能使用字符串变量为属性
					obj1[r3[0]]=r3[1];
				}
				return obj1;
			}