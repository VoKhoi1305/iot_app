#include<stdio.h>
#include<stdlib.h>
#include<string.h>

typedef struct Node{
  char name[20];
  char tel[20];
  char email[32];
  struct Node* next;
} Node_t;

Node_t* makeNode(char name[], char tel[], char email[]) {
  Node_t* newNode = (Node_t*)malloc(sizeof(Node_t));
  if (newNode == NULL) return NULL;

  strcpy(newNode->name,name);
  strcpy(newNode->tel,tel);
  strcpy(newNode->email,email);
  newNode->next = NULL;
  return newNode;
}

void them(char name[], char tel[], char email[], Node_t **list){
    if (timkiem(name,*list) >= 0) return ;
    Node_t *p1 = makeNode(name, tel, email);
    if (*list == NULL) *list = p1;
    else{
        Node_t *p2 = *list;
       *list = p1;
       p1 -> next = p2;
    }
    return ;
}
int timkiem(char data[], Node_t *list){
    int cnt = 0;
    while(list != NULL){
        if (strcmp(list->name, data) == 0) return cnt;
        list = list->next;
        ++cnt;
    }
    return -1;
}


void llprint(Node_t *list, char name[]){
        while(list != NULL){
        if (strcmp(list->name, name) == 0) {
        	
                printf("%s ", list->name);
        printf("%s ", list->tel);
        printf("%s", list->email);
                 return ;}
        list = list->next;

        }
        printf("Not found");
}

int main(){
 Node_t *list = NULL;
 char key[20];
 char dt[20];
 char mail[20];
 while(scanf("%s", key) && strcmp(key, "#") != 0 )
 {
    scanf("%s", dt);
    scanf("%s", mail);
    them(key,dt,mail, &list);
 }

 scanf("%s", key);
  int d= timkiem(key, list);
  if(d >= 0) printf("%d ", d);
 llprint(list, key);
}
