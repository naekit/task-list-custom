import useHttp from "../../hooks/useHttp"

import Section from "../UI/Section"
import TaskForm from "./TaskForm"

const NewTask = (props) => {
	const { isLoading, error, sendRequest: addTaskRequest } = useHttp()

	const addTask = (taskText, task) => {
		const generatedId = task.name // firebase-specific => "name" contains generated id
		const createdTask = { id: generatedId, text: taskText }

		props.onAddTask(createdTask)
	}

	const enterTaskHandler = async (taskText) => {
		addTaskRequest(
			{
				url: "https://http-movie-basic-default-rtdb.firebaseio.com/tasks.json",
				method: "POST",
				body: { text: taskText },
				headers: {
					"Content-Type": "application/json",
				},
			},
			addTask.bind(null, taskText)
		)
	}

	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			{error && <p>{error}</p>}
		</Section>
	)
}

export default NewTask
