import React, { Component } from 'react';
import axios from 'axios';
import AddPersonForm from './AddPersonForm';


class PeopleTable extends Component {
    state = {
        people: [],
        currentPerson: {
            firstName: '',
            lastName: '',
            age: ''
        },
        isAdding: false,
        selectedIds: [],
        editId: null
    }

    loadPeople() {
        axios.get('/api/people/getall').then(({ data }) => {
            this.setState({ people: data})
        })
    }

    componentDidMount() {
        this.loadPeople();
    }

    onTextChange = e => {
        const copy = { ...this.state.currentPerson };
        copy[e.target.name] = e.target.value;
        this.setState({ currentPerson: copy });
    }

    onAddClick = () => {
        this.setState({ isAdding: true });

        const personToSend = {
            ...this.state.currentPerson
        };

        if (this.state.editId) {
            axios.post('/api/people/update', { id: this.state.edit, ...personToSend }).then(() => {
                this.setState({
                    currentPerson: { firstName: '', lastName: '', age: '' },
                    isAdding: false,
                    edit: null
                });
                this.loadPeople();
            });
        } else {
            axios.post('/api/people/add', personToSend).then(() => {
                this.setState({
                    currentPerson: { firstName: '', lastName: '', age: '' },
                    isAdding: false
                });
                this.loadPeople();
            });
        }
    }

    onDeleteClick = id => {
        axios.post('/api/people/delete', { id }).then(() => {
            this.setState({
                selectedIds: this.state.selectedIds.filter(i => i !== id)
            });
            this.loadPeople();
        });
    }

    onEditClick = person => {
        this.setState({
            currentPerson: {
                firstName: person.firstName,
                lastName: person.lastName,
                age: person.age
            },
            editId: person.id
        });
    }

    
    onSelectChange = id => {
        if (this.state.selectedIds.includes(id)) {
            this.setState({
                selectedIds: this.state.selectedIds.filter(i => i !== id)
            });
        } else {
            this.setState({
                selectedIds: [...this.state.selectedIds, id]
            });
        }
    }

    selectAll = () => {
        this.setState({
            selectedIds: this.state.people.map(p => p.id)
        });
    }

    unselectAll = () => {
        this.setState({
            selectedIds: []
        });
    }

    deleteAll = () => {
        axios.post('/api/people/deleteall', {
            personIds: this.state.selectedIds
        }).then(() => {
            this.setState({ selectedIds: [] });
            this.loadPeople();
        });
    }
    render() {
        const { firstName, lastName, age } = this.state.currentPerson;

        return <div className='container mt-5'>
            <div className='row'>
                <AddPersonForm
                    firstName={firstName}
                    lastName={lastName}
                    age={age}
                    onTextChange={this.onTextChange}
                    onAddClick={this.onAddClick}
                    isAdding={this.state.isAdding}
                />
            </div>

            <div className='row mt-5 mb-3'>
                <div className='col-md-2'>
                    <button className='btn btn-secondary' onClick={this.selectAll}>Select All</button>
                </div>
                <div className='col-md-2'>
                    <button className='btn btn-warning' onClick={this.unselectAll}>Unselect All</button>
                </div>
                <div className='col-md-2'>
                    <button className='btn btn-danger' onClick={this.deleteAll} disabled={this.state.selectedIds.length === 0}>
                        Delete Selected
                    </button>
                </div>
            </div>

            <table className='mt-5 table table-hover table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.people.map(p => <tr key={p.id}>
                        <td>
                            <input
                                type="checkbox"
                                className='form-check-input'
                                style={{ transform: 'scale(1.5)' }}
                                checked={this.state.selectedIds.includes(p.id)}
                                onChange={() => this.onSelectChange(p.id)}
                            />
                        </td>
                        <td>{p.firstName}</td>
                        <td>{p.lastName}</td>
                        <td>{p.age}</td>
                        <td>
                            <button className='btn btn-sm btn-info me-2' onClick={() => this.onEditClick(p)}>Edit</button>
                            <button className='btn btn-sm btn-danger' onClick={() => this.onDeleteClick(p.id)}>Delete</button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    }
}

export default PeopleTable;
