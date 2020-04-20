import React, { Component } from 'react';
import FieldContext from './FieldContext'

export default class Field extends Component {
    static contextType = FieldContext;

    componentDidMount() {
        const {registerField} = this.context;
        // console.log(this.context);
        registerField(this);
        // this.cancleRegisterField = registerField(this);
    }

    // componentWillUnmount() {
    //     if(this.cancleRegisterField){
    //         this.cancleRegisterField()
    //     }
    // }

    onStoreChange = () => {
        this.forceUpdate();
    }

    getControlled = () => {
        const {name} = this.props;
        const {getFieldValue, setFieldsValue} = this.context;

        return {
            value:getFieldValue(name),
            onChange: event => {
                const newValue = event.target.value;
                setFieldsValue({[name]: newValue})
            }
        }
    }

    render() {
        const {children} = this.props;
        // console.log(children);
        const returnChildNode = React.cloneElement(children, this.getControlled());
        return returnChildNode;
        // return <div>456</div>
    }
}
