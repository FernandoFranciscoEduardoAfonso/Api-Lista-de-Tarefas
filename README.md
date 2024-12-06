Esta Api permite gerenciar listas de tarefas

URL da API em produção, hospedado no render
https://tasklist-api-tpew.onrender.com


Explicação:

//criar uma tarefa - Método POST
https://tasklist-api-tpew.onrender.com/task

Obs: No corpo da requisição deve conter os seguintes parâmetros obrigatórios:
{
	"title": "Tarefa 001",
	"description": "Tomar banho"
}


//ver a lista de todas tarefas - Método GET
https://tasklist-api-tpew.onrender.com/task


//ver uma tarefa específica - Método GET
https://tasklist-api-tpew.onrender.com/task/id_tarefa


//eliminar uma tarefa - Método DELETE
https://tasklist-api-tpew.onrender.com/task/id_tarefa


//atualizar uma tarefa - Método PATCH
https://tasklist-api-tpew.onrender.com/task/id_tarefa

Obs: No corpo da requisição deve conter os seguintes parâmetros obrigatórios:
{
	"title": "Tarefa Alterada",
	"description": "Descrição alterada",
	"updatedAt":"2024-11-30T15:11:25.589Z"
}


//completar uma tarefa - - Método PATCH
https://tasklist-api-tpew.onrender.com/task/id_tarefa

Obs: No corpo da requisição deve conter os seguintes parâmetros obrigatórios:
{
	"completedAt":"2024-11-30T15:31:25.585Z"
}
