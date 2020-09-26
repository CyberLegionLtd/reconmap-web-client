import React, {Component} from 'react'
import secureApiFetch from '../../services/api'
import BtnSecondary from '../ui/buttons/BtnSecondary'
import BtnPrimary from '../ui/buttons/BtnPrimary'
import {IconCheck, IconUpload, IconX} from '../icons'
import Title from './../ui/Title'
import ButtonGroup from "../ui/buttons/ButtonGroup";
import DeleteButton from "../ui/buttons/Delete";
import Breadcrumb from "../ui/Breadcrumb";
import Loading from '../ui/Loading'
import Timestamps from "../ui/Timestamps";

class TaskDetails extends Component {

    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this)
    }

    state = {
        task: null,
        results: []
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        secureApiFetch(`/tasks/${id}`, {
            method: 'GET'
        })
            .then((responses) => responses.json())
            .then((task) => {
                this.setState({task: task})
                document.title = `Task ${task.name} | Reconmap`;
            });
        secureApiFetch(`/tasks/${id}/results`, {
            method: 'GET'
        })
            .then((responses) => responses.json())
            .then((data) => {
                this.setState({results: data})
            });
    }

    handleToggle(task) {
        secureApiFetch(`/tasks/${task.id}`, {
            method: 'PATCH',
            body: JSON.stringify({completed: task.completed ? '0' : '1'})
        })
            .then(() => {
                this.props.history.goBack()
            })
            .catch(e => console.log(e))
    }

    handleDelete(id) {
        if (window.confirm('Are you sure you want to delete this task?')) {
            secureApiFetch(`/tasks/${id}`, {
                method: 'DELETE'
            })
                .then(() => {
                    this.props.history.goBack()
                })
                .catch(e => console.log(e))

        }
    }

    render() {
        const task = this.state.task;
        return (
            <div>
                <div className="heading">
                    <Breadcrumb history={this.props.history}/>
                    {task && <ButtonGroup>
                        {task.completed === 1 && <BtnSecondary size='sm' onClick={() => this.handleToggle(task)}>
                            <IconX styling='mr-2'/> Mark as incomplete
                        </BtnSecondary>}
                        {task.completed !== 1 && <BtnSecondary size='sm' onClick={() => this.handleToggle(task)}>
                            <IconCheck styling='mr-2'/> Mark as completed
                        </BtnSecondary>}
                        <BtnPrimary size='sm' to={"/tasks/" + task.id + "/upload"}>
                            <IconUpload styling='mr-2'/> Upload results
                        </BtnPrimary>
                        <DeleteButton onClick={() => this.handleDelete(task.id)}/>
                    </ButtonGroup>
                    }
                </div>
                {!task ? <Loading/> :
                    <article>
                        <Title title={task.name} type='Task'/>
                        <Timestamps insertTs={task.insert_ts} updateTs={task.update_ts}/>
                        <div className='flex items-start gap-4'>
                            <div className='card'>
                                <h2>Instructions</h2>
                                <p>{task.description}</p>

                            </div>
                            <div className='card flex-1'>
                                <h3>Results</h3>
                                {this.state.results.map((value, index) =>
                                    <div key={index} className='pb-2 border-b mb-2'>
                                        <label>Date: {value.insert_ts}</label>
                                        <textarea readOnly value={value.output} style={{width: '100%'}}/>
                                    </div>
                                )}
                                {this.state.results.length === 0 && <footer> No results </footer>}
                            </div>
                        </div>
                    </article>
                }
            </div>
        )
    }
}

export default TaskDetails