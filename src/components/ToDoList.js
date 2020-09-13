import '../App.css';
import ToDo from './ToDo';
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const server = 'http://localhost:5000'

const ToDoList = () => {
    const [toDoItem, setToDoItem] = useState({});
    const [toDoList, setToDoList] = useState([]);
    const textInput = useRef("");


    useEffect(() => {
        fetchToDoList();
        textInput.current.focus();
    }, [])

    const fetchToDoList = async () => {
        let res = await axios.get(`${server}/toDoList`)
        setToDoList(res.data)
    }

    const addNote = async () => {
        if (Object.keys(toDoItem).length !== 0) {
            await axios.post(`${server}/toDoList`, toDoItem)
        }
        fetchToDoList();
        setToDoItem({})

    }

    const deleteNote = async (id) => {
        await axios.delete(`${server}/toDoList/${id}`)
        fetchToDoList();

    }

    const handleChange = (e) => {

        e.persist();
        const newToDoItem = toDoItem;
        newToDoItem.isCompleted = false;
        newToDoItem.name = e.target.value;
        newToDoItem.datetime = new Date().toLocaleString();
        setToDoItem(newToDoItem)
        setToDoItem((toDoItem) => ({
            ...toDoItem,
            [e.target.name]: e.target.value
        }))
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            addNote()
        }
    }

    const toggleCompleted = async (id) => {
        let res = await axios.get(`${server}/toDoList/${id}`)
        const tempToDoItem = res.data;
        tempToDoItem.isCompleted = !tempToDoItem.isCompleted;
        await axios.put(`${server}/toDoList/${id}`, tempToDoItem)
        fetchToDoList();
    }


    return (
        <div className="App">
            <div className="header"><h2>To do List</h2></div>
            <div className="toDo-list">
                {
                    toDoList.map((val, index) => (
                        <ToDo key={index} toDo={val}
                            index={index}
                            deleteNote={deleteNote}
                            toggleCompleted={toggleCompleted} />
                    ))
                }
            </div>
            <div type="submit" className="btn" onClick={addNote}>+</div>
            <div>
                <input type="text" name="name" className="text" ref={textInput}
                    value={toDoItem.name ? toDoItem.name : ""}
                    onChange={(e) => handleChange(e)}
                    onKeyPress={e => handleKeyPress(e)}
                />
            </div>
        </div>
    )
}

export default ToDoList
