#include<stdio.h>
#include<stdlib.h>
#include<string.h>

//======================================================CREAT=======================================================================================
typedef int data_t;

typedef struct Node {
    data_t data;
    struct Node* next;
}Node_t, *root_t;

root_t llinit(){return NULL;}


    data_t convert(int n) {
  return n;
}
Node_t* llSeek(root_t root, int index) {
  Node_t* p = NULL;
  p = root;
  while ((p!=NULL) && (p->data!= convert(index))){

        p=p->next;
    }
    return p;
}
Node_t* llSeekBefore(root_t root, int index) {
  Node_t* p = NULL;
  p = root; if(p->data == convert(index)) return root;
  while ((p->next!=NULL) && (p->next->data!= convert(index))){

        p=p->next;
    }
    return p;
}
//=================================================================================================================================================
//========================================================PRINT=====================================================================================
void showData(const data_t data){
    printf("%d ",data);
}

root_t llPrint(root_t root) {
  for (Node_t* p = root; p != NULL; p = p->next) showData(p->data);
  printf("\n");
  return root;
}
//==================================================================================================================================================


Node_t* createNewNode(const data_t data) {
  Node_t* newNode = (Node_t*)malloc(sizeof(Node_t));
  if (newNode == NULL) return NULL;

  newNode->data = data;
  newNode->next = NULL;
  return newNode;
}
//================================================================================================================================================
//======================================================INSERT===================================================================================
root_t llInsertHead(root_t root, const data_t data) {
  Node_t* pNewNode = createNewNode(data);
  pNewNode->next = root;
  return (root_t)pNewNode;
}

root_t llInsertTail(root_t root, const data_t data) {
  Node_t* pNewNode = createNewNode(data);

  if (root == NULL) return (root_t)pNewNode;

  Node_t* p = NULL;
  for (p = root; p->next != NULL; p = p->next)
    ;
  p->next = pNewNode;
  return root;
}

root_t llInsertAfter(root_t root, Node_t* pAElem, const data_t data) {
  if (pAElem == NULL) return root;

  Node_t* pNewNode = createNewNode(data);
  pNewNode->next = pAElem->next;
  pAElem->next = pNewNode;

  return root;
}

root_t addafter(root_t root, int u, int v){
    Node_t* p= root;
    while(p!= NULL)
    {
        Node_t* temp;
        temp = llSeek(root,v); if(temp != NULL)
        root = llInsertAfter(root, temp , convert(u));
        p=p->next;
    }
    return root;
}
//========================================================DELETE=========================================================================================
root_t llDeleteHead(root_t root) {
  if (root == NULL) return NULL;

  Node_t* p = root->next;
  free(root);
  return (root_t)p;
}

root_t llDeleteTail(root_t root) {
  if (root == NULL) return NULL;
  if (root->next == NULL) {
    free(root);
    return NULL;
  }

  Node_t* p;
  // Find previous node of Tail
  for (p = root; p->next->next != NULL; p = p->next)
    ;

  free(p->next);
  p->next = NULL;
  return (root_t)root;
}

root_t llDeleteAfter(root_t root, Node_t* pA) {
  if ((pA == NULL) || (pA->next == NULL)) return root;
  if (pA == root){root = pA->next; return root;}
  Node_t* pToDelElem = pA->next;
  pA->next = pA->next->next;

  free(pToDelElem);
  return root;
}

root_t llDeleteAll(root_t root) {
  Node_t* p = NULL;
  for (; root != NULL; root = p) {
    p = root->next;
    free(root);
  }
  return NULL;
}

root_t Remove(root_t root , int u ){
    Node_t* p= root;
    while(p!= NULL)
    {
        Node_t* temp;
        temp = llSeekBefore(root,u);
        root = llDeleteAfter(root, temp);
        p=p->next;
    }
    return root;
}
//==================================================================================================================================================

//=========================================================== Tools ================================================================================
int llLength(root_t root) {
  int count;
  for (count = 0; root != NULL; root = root->next) count++;
  return count;
}

root_t reverse(root_t root)
{
     Node_t* prev = NULL;
    Node_t* current = root;
    Node_t* next = NULL;
    while (current != NULL) {
        // Store next
        next = current->next;

        // Reverse current node's pointer
        current->next = prev;

        // Move pointers one position ahead.
        prev = current;
        current = next;
    }
    root = prev;
    return root;
}

int main(){
    root_t lst = llinit();
    int n; int a; int k; int u; int v;
    scanf("%d",&n);

    for (int i = 0; i < n; i++) {
        scanf("%d",&a);
    lst = llInsertTail(lst, convert(a));
    }

    char order[100];
  while(1)
    {
        scanf("%s",order);
        if(strcmp(order,"#") ==0) {break;}
        if(strcmp(order,"addlast") == 0)
            {
                scanf("%d",&k);
                if(llSeek(lst,k)==NULL)
               {lst = llInsertTail(lst, convert(k));}

            }
        if(strcmp(order,"addfirst")== 0)
            {
                scanf("%d",&k);
                if(llSeek(lst,k)==NULL)
               {lst = llInsertHead(lst,convert(k));}
            }
        if(strcmp(order,"addafter") == 0)
            {
                scanf("%d",&u);
                scanf("%d",&v);
            if(llSeek(lst,u)==NULL)
                {Node_t* temp;
                temp = llSeek(lst,v);
                lst = llInsertAfter(lst, temp , convert(u));}
            }
       if(strcmp(order,"addbefore") ==0)
            {
                scanf("%d",&u);
                scanf("%d",&v);
                 if(llSeek(lst,u)==NULL)
                {

                Node_t* temp;
                temp = llSeekBefore(lst,v);
                lst = llInsertAfter(lst, temp, convert(u));
                }
            }
        if(strcmp(order,"remove")==0)
            {
               scanf("%d",&k);
                lst = Remove(lst, k);
            }
         if(strcmp(order,"reverse")==0)
         {
             lst= reverse(lst);
         }
    }

lst= llPrint(lst);

return 0;


}
