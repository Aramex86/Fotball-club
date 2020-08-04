import React from 'react'

const FormData = ({formdata,id}) => {
    console.log(formdata);
const renderTemplate=()=>{
    let formTemplate =null;

    switch(formdata.email.element){
        case('input'):
        formTemplate = (
            <div>
                <input 
                {...formdata.email.config}
                value={formdata.email.value}
                />
            </div>
        )
        break;
        default:
            formTemplate = null;
    }

    return formTemplate;
}




    return (
        <div>
            {renderTemplate()}
        </div>
    )
}

export default FormData;
