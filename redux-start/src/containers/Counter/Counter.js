import React, { Component } from 'react';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

import { connect } from 'react-redux';

//import * as actionTypes from '../../store/actions';
import * as actionCreaters from '../../store/actions/actions';


class Counter extends Component {
    state = {
        counter: 0
    }

    render () {
        return (
            <div>
                {/* value from the 'store' passed here thgrough connect 'hoc' function */}
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIcrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 10" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 15" clicked={this.props.onSubtractCounter}  />
                <hr/>
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Results</button>
                <ul>
                    {this.props.storedResult.map(result => {
                        return <li key={result.id} onClick={() => this.props.onDeleteResult(result.id)}>{result.value}</li>
                    })}
                </ul>
            </div>
        );
    }
}

// Function that allows to get global state (or slice of it) in a component
// return object that containts necessary properties from global 
// state that this component needs
const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        storedResult: state.res.results
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIcrementCounter: () => dispatch(actionCreaters.increment()),
        onDecrementCounter: () => dispatch(actionCreaters.decrement()),
        onAddCounter: () => dispatch(actionCreaters.add(10)),
        onSubtractCounter: () => dispatch(actionCreaters.subtract(15)),
        onStoreResult: (result) => dispatch(actionCreaters.storeResult(result)),
        onDeleteResult: (id) => dispatch(actionCreaters.deleteResult(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);