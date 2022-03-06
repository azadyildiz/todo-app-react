import React, { Component } from 'react'
import "./style.css"
import { TiTick, TiTrash } from "react-icons/ti";
// We can also use function components w/ hooks.
export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            filterCTRL: 0,
            completed: 0,
            uncompleted: 0
        }
    }
    componentDidMount() { // Take data when first render
        this.setState({ items: this.props.data })
    }
    componentDidUpdate() { // Get data when props is change
        if (!(this.state.items === this.props.data)) { // Block the bug: Infinite render() loop
            this.setState({ items: this.props.data }) // Set props to state
        }

    }
    deleteItem = (id) => {
        this.state.items.map((item, index) => {
            if (item.id === id) { // // Compare our id and items array element id to delete correct item.
                this.state.items.splice(index, 1) // Delete choosen item.
            }
        })
        return this.state.items
    }
    delete = (id) => { // setState items w/ changeIsDone() function
        this.setState({
            items: this.deleteItem(id)
        })
    }
    changeIsDone = (id) => {
        this.state.items.map((item, index) => {
            if (item.id === id) { // Compare our id and items array element id to change correct item.isDone.
                this.state.items[index].isDone = !(this.state.items[index].isDone) // Change choosen item.isDone.
            }
        })
        return this.state.items
    }
    done = (id) => { // setState isDone w/ changeIsDone() function
        this.setState({
            items: this.changeIsDone(id)
        })
    }
    filterItems = (ctrl) => {
        if (ctrl === 0) {
            return (
                this.state.items.map((item) => {
                    return (
                        <div className="list-item" key={item.id}>
                            <div className="left-side">
                                <button onClick={() => { this.done(item.id) }}><TiTick className='list-icons' /></button>
                                {item.isDone ? <span className='done'>{item.body}</span> : <span>{item.body}</span>}</div>
                            <div className="right-side">
                                <button onClick={() => { this.delete(item.id) }} ><TiTrash className='list-icons' /></button>
                            </div>
                        </div>
                    )
                })
            )
        }
        else if (ctrl === 1) {
            return (
                this.state.items.map((item) => {
                    if (item.isDone) {
                        return (
                            <div className="list-item" key={item.id}>
                                <div className="left-side">
                                    <button onClick={() => { this.done(item.id) }}><TiTick className='list-icons' /></button>
                                    {item.isDone ? <span className='done'>{item.body}</span> : <span>{item.body}</span>}</div>
                                <div className="right-side">
                                    <button onClick={() => { this.delete(item.id) }} ><TiTrash className='list-icons' /></button>
                                </div>
                            </div>
                        )
                    }
                })
            )
        }
        else {
            return (
                this.state.items.map((item) => {
                    if (!(item.isDone)) {
                        return (
                            <div className="list-item" key={item.id}>
                                <div className="left-side">
                                    <button onClick={() => { this.done(item.id) }}><TiTick className='list-icons' /></button>
                                    {item.isDone ? <span className='done'>{item.body}</span> : <span>{item.body}</span>}</div>
                                <div className="right-side">
                                    <button onClick={() => { this.delete(item.id) }} ><TiTrash className='list-icons' /></button>
                                </div>
                            </div>
                        )
                    }
                })
            )
        }
    }
    itemCounter = (index) => {
        var completedCounter = 0
        var uncompletedCounter = 0
        this.state.items.map(item => {
            if (item.isDone) {
                completedCounter++
            }
            else {
                uncompletedCounter++
            }
        })
        if (index === 0) { // ALL 
            return completedCounter + uncompletedCounter
        }
        else if (index === 1) {
            return completedCounter
        }
        else {
            return uncompletedCounter
        }
    }

    render() {
        return (
            <div className="list-container">
                <div className="filter-buttons">
                    <button onClick={() => { this.setState({ filterCTRL: 0 }) }}>ALL ({this.itemCounter(0)})</button>
                    <button onClick={() => { this.setState({ filterCTRL: 1 }) }}>COMPLETED ({this.itemCounter(1)})</button>
                    <button onClick={() => { this.setState({ filterCTRL: 2 }) }}>UNCOMPLETED ({this.itemCounter(2)})</button>
                </div>
                <div className="list">
                    {this.filterItems(this.state.filterCTRL)}
                </div>

            </div>
        )
    }
}

