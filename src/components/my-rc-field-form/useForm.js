// import React from 'react';

class FormStore {
    constructor() {
        this.store = {};
        this.fieldEntities = [];
        this.callbacks = {};
    }

    registerField = entity => {
        this.fieldEntities.push(entity)
    }

    setCallback = callback => {
        this.callbacks = {
            ...this.callbacks,
            ...callback
        }
    }

    getFieldValue = name => {
        return this.store[name]
    }

    getFieldsValue = () => {
        return this.store;
    }

    setFieldsValue = newStore => {
        this.store = {
            ...this.store,
            ...newStore
        }

        this.fieldEntities.forEach(entity => {
            const {name} = entity.props;
            if(this.getFieldValue(name) !== undefined){
                entity.onStoreChange();
            }
        })
    }

    validate = () => {
        let err = [];

        this.fieldEntities.forEach(entity => {
            const {name, rules}= entity.props;

            let value = this.getFieldValue(name);
            let rule = rules && rules[0];

            if(rule && rule.required && (value === undefined || value === '')){
                err.push({
                    [name]:rules.message,
                    value
                })
            }
        })

        return err;
    }

    submit = () => {
        let err = this.validate();

        const {onFinish, onFinishFailed} = this.callbacks;

        if(err.length === 0){
            onFinish(this.getFieldsValue())
        } else if(err.length > 0) {
            onFinishFailed(err)
        }
    }

    getForm = () => {
        return {
            registerField: this.registerField,
            setCallback: this.setCallback,
            submit: this.submit,
            getFieldValue: this.getFieldValue,
            getFieldsValue: this.getFieldsValue,
            setFieldsValue: this.setFieldsValue
        }
    }
}

export default function useForm(form) {
    let res;
    if (form) {
        res = form
    } else {
        const formStore = new FormStore();
        res = formStore.getForm();
    }

    return [res]
}