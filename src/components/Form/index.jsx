import React, { Component } from 'react'
import "./style.css"
import { HiPlus } from "react-icons/hi";
export default class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEmpty: false
        }
    }

    errorMessage = () => {
        return ( // For empty input
            <div className="alert-box gold">
                <small> You cannot add empty item!</small>
            </div>
        )
    }

    indexCounter = 0
    newIndexCounter = () => {
        this.indexCounter++
        return this.indexCounter
    }

    createNewItem = (event) => {
        var index = this.newIndexCounter() // create new index for item.id
        var newItem = createItemObject(event.target[0].value) // Create new item object
        this.props.addItems(newItem) // Send back newItem on addItems function.

        function createItemObject(text) { // Create item with input text.
            var item = { id: index, body: text, isDone: false }
            return item
        }
    }

    onSubmit = (event) => {
        event.preventDefault() // Clear submit event actions
        if (event.target[0].value.trim() === "") { // Check input is empty
            { !this.state.isEmpty && this.setState({ isEmpty: true }) }  // Change boolean state, if is empty has already changed we dont touch it. Because of dont trigger render method continually.
        }
        else {
            { this.state.isEmpty && this.setState({ isEmpty: false }) }
            this.createNewItem(event) // Create new item
            event.target[0].value = "" // Clear input value
        }
    }

    render() {
        return (
            <div className="form-container">
                <div className="header-container">
                    <h5>New Item</h5>
                </div>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <input maxLength={25} placeholder="Start typing..." />
                        <button type="submit"><HiPlus className='form-icons' /></button>
                    </form>
                </div>
                <div className='error-container'>
                    {(this.state.isEmpty) && this.errorMessage()}
                </div>
            </div>
        )
    }
}
