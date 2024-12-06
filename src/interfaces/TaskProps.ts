interface TaskProps{
    title: string
    description: string
    createdAt?: Date 
    completedAt?: Date | null
    updatedAt?: Date | null 
}

export default TaskProps