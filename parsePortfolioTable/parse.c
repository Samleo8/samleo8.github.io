#include <stdio.h>
#include <string.h>

int main(){
	freopen("in.txt", "r", stdin);
	freopen("out.txt", "w", stdout);
	
	char str[1000];
    
	char* data;
	char* string;
    int first = 1;
    
	printf("<table class=\"achievements-table\">\n");
	while( gets(&str) ){
		printf("\t<tr>\n");
        
        string = strdup(str);
        
        while ( (data = strsep(&string, "\t")) != NULL){
            if(first) printf("\t\t<th>%s</th>\n", data);
            else printf("\t\t<td>%s</td>\n", data);
        }
        
		printf("\t</tr>\n");
        first = 0;
	}

	printf("</table>");

	return 0;
}