import React from 'react';
import { Col, Row, Form, Input, Button } from 'antd';
import './App.css';

class registrationForm extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            formLayout: 'horizontal',
            name: '',
            brand: '',
            latitude: '',
            longitude: '',
            address: ''
        };
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    change(event: any) {
        const name = event.target.name
        this.setState({
            [name]: event.target.value
        });
    }

    submit(event: any) {
        alert('Gym was submitted!');
        event.preventDefault();
    }

    render() {
        const { formLayout } = this.state;
        const formItemLayout =
        formLayout === 'horizontal'
            ? {
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
            }
            : null;
        const buttonItemLayout =
            formLayout === 'horizontal'
                ? {
                    wrapperCol: { span: 14, offset: 4 },
                }
                : null;
        return (
            <div className="Form">
                <header className="App-header">
                    Gym Registration
                 </header>
                 <br/>
            <Form layout={formLayout} onSubmit={this.submit}>
                    <Form.Item label="Gym Name" {...formItemLayout}> 
                    <input type="text" value={this.state.name} onChange={this.change} />
                </Form.Item>
                    < Form.Item label="Gym Brand" {...formItemLayout}>
                    <input type="text" value={this.state.brand} onChange={this.change}/>
                </Form.Item>
                    <Form.Item label="Address" {...formItemLayout}>
                    <input type="text" value={this.state.address} onChange={this.change} />
                </Form.Item>
                    <Form.Item label="Latitude" {...formItemLayout}>
                    <input type="text" value={this.state.latitude} onChange={this.change} />
                </Form.Item>
                    <Form.Item label="Longitude" {...formItemLayout}>
                    <input type="text" value={this.state.longitude} onChange={this.change} />
                </Form.Item>
                    <Form.Item {...buttonItemLayout}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
                
            </Form>
            </div>
        );
    }
}

export default registrationForm;