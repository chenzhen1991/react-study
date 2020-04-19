import React from 'react';

const warnFunc = () => {
    console.log("-----warn------"); 
}

const FieldContext = React.createContext({
    submit: warnFunc,
    getFieldValue: warnFunc,
    getFieldsValue: warnFunc,
    setFieldsValue: warnFunc
})

export default FieldContext;