import React from "react";
import {FormGroup, Input} from "reactstrap";

const InputText = ({label, id, name, value, onChange, error}) => {
    return (
        <FormGroup>
            <label>{label}</label>
            <Input
                placeholder={"Enter " + label}
                type="text"
                value={value}
                id={id}
                name={name}
                onChange={onChange}
            />
            {error ? <div className="alert alert-danger">{error}</div> : ''}
        </FormGroup>
    );
}

export default InputText;