import React, { Component } from 'react';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

import { connect } from 'react-redux';


class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
            default:
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} /> {/* value from the 'store' passed here thgrough connect 'hoc' function */}
                <CounterControl label="Increment" clicked={() => this.counterChangedHandler( 'inc' )} />
                <CounterControl label="Decrement" clicked={() => this.counterChangedHandler( 'dec' )}  />
                <CounterControl label="Add 5" clicked={() => this.counterChangedHandler( 'add', 5 )}  />
                <CounterControl label="Subtract 5" clicked={() => this.counterChangedHandler( 'sub', 5 )}  />
            </div>
        );
    }
}

// Function that allows to get global state (or slice of it) in a component
// return object that containts necessary properties from global 
// state that this component needs
const mapStateToProps = state => {
    return {
        ctr: state.counter
    }
}

export default connect(mapStateToProps)(Counter);