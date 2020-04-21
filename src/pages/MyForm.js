// import React, {useEffect, useState} from 'react';
// import Form,{Field} from '../components/my-rc-field-form';
// import Input from "../components/my-rc-field-form/Input";
//
// const nameRules = {required: true, message: "请输入姓名！"};
// const passwordRules = {required: true, message: "请输入密码！"};
//
// export default function MyForm() {
//     const [form] = Form.useForm();
//
//   const onFinish = val => {
//     console.log("onFinish", val); //sy-log
//   };
//
//   // 表单校验失败执行
//   const onFinishFailed = val => {
//     console.log("onFinishFailed", val); //sy-log
//   };
//
//   useEffect(() => {
//     console.log("form", form); //sy-log
//     form.setFieldsValue({username: "default"});
//   });
//
//   const [show, setShow] = useState(true)
//     return (
//         <div>
//             <h3>MyRCFieldForm</h3>
//             <button onClick={() => setShow(!show)}>删除一个field</button>
//             <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
//                 {show ? <Field name="username" rules={[nameRules]}>
//                     <Input placeholder="input UR Username" />
//                 </Field> : null}
//               <Field name="password" rules={[passwordRules]}>
//                 <Input placeholder="input UR Password" />
//               </Field>
//               <button>Submit</button>
//             </Form>
//         </div>
//     )
// }

import React, {Component} from 'react';
import Form,{Field} from '../components/my-rc-field-form';
import Input from "../components/my-rc-field-form/Input";

const nameRules = {required: true, message: "请输入姓名！"};
const passwordRules = {required: true, message: "请输入密码！"};

class MyForm extends Component {
    formRef = React.createRef()
    componentDidMount() {
        console.log(this.formRef.current)
        this.formRef.current.setFieldsValue({username: "default"});
    }

    onFinish = val => {
        console.log("onFinish", val); //sy-log
    };

    // 表单校验失败执行
    onFinishFailed = val => {
        console.log("onFinishFailed", val); //sy-log
    };

    render() {
        return (
            <div>
                <h3>MyRCFieldForm</h3>
                <Form ref={this.formRef} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
                    <Field name="username" rules={[nameRules]}>
                        <Input placeholder="input UR Username"/>
                    </Field>
                    <Field name="password" rules={[passwordRules]}>
                        <Input placeholder="input UR Password"/>
                    </Field>
                    <button>Submit</button>
                </Form>
            </div>
        );
    }
}

export default MyForm;