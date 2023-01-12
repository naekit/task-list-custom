import useHttp from "../../hooks/useHttp"

import Section from "../UI/Section"
import TaskForm from "./TaskForm"

const NewTask = (props) => {
	const { isLoading, error, sendRequest: addTaskRequest } = useHttp()

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
			props.onAddTask
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
