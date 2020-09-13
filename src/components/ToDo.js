import React from 'react'

const ToDo = (props) => {

    const { toDo, index } = props

    return (
        <div className="note" >
            <div>
                <p className={toDo.isCompleted? "isCompleted": ""}>{toDo.name}</p>
                <small>
                    Created at <i>{toDo.datetime}</i>
                </small>
            </div>


            <div>
                <button className="btn-1 btn-completed" onClick={() => props.toggleCompleted(toDo.id)}>Complete</button>
                <button className="btn-1 btn-delete" onClick={() => props.deleteNote(toDo.id)}>Delete</button>
            </div>


        </div>
    )
}


export default ToDo
