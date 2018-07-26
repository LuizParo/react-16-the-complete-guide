import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

import {
    add,
    decrement,
    deleteResult,
    increment,
    storeResult,
    subtract
} from '../../store/actions/actions';

class Counter extends Component {

    render () {
        return (
            <div>
                <CounterOutput value={this.props.counter} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 10" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 15" clicked={this.props.onSubtractCounter}  />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.counter)}>Store Result</button>

                <ul>
                    {
                        this.props.storedResults.map(result => (
                            <li key={result.id} onClick={() => this.props.onDeleteResult(result.id)}>{result.value}</li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        counter : state.counter.counter,
        storedResults : state.result.results
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter : () => dispatch(increment()),
        onDecrementCounter : () => dispatch(decrement()),
        onAddCounter : () => dispatch(add(10)),
        onSubtractCounter : () => dispatch(subtract(15)),
        onStoreResult : result => dispatch(storeResult(result)),
        onDeleteResult : resultId => dispatch(deleteResult(resultId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);