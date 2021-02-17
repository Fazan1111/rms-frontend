import React from "react";
import { Modal } from "antd";

export default class FormModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            id: null
        }
    }

    handleCancel() {
        this.setState({ visible: false });
        console.log('child', this.state.visible);
        console.log('props', this.props.visible);
    }

    handleSubmit(id) {
        
    }


    render() {
        
        return (
            <Modal
                title="Modal 500px width"
                centered
                visible={this.props.visible}
                onOk={() => this.handleSubmit(this.props.id)}
                onCancel={() => this.handleCancel()}
                width={500}
            >
                <p>{this.props.id}</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>

        )
    }
}