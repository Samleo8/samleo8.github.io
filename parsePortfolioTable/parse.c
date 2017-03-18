#include <stdio.h>
#include <string.h>

int main(){
	freopen("in.txt", "r", stdin);
	freopen("out.txt", "w", stdout);
	
	int i;
	char str[1000];
    
	char* data;
	char* string;
    
	printf("<table class=\"achievements-table\">\n");
	while( gets(&str) ){
		printf("\t<tr>\n");
        
        string = strdup(str);
        
        while ( (data = strsep(&string, "\t")) != NULL){
            printf("\t\t<td>%s</td>\n", data);
        }
        
		printf("\t</tr>\n");
	}

	printf("</table>");

	return 0;
}