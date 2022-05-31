import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import TokenContext from '../../context/TokenContext';

function Messagerie() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { username, stompClient} = useContext(TokenContext);

    const sendPublicMessage = (data) => {
        console.log("send public");
        if (stompClient) {
            var chatMessage = {
                sendername: username,
                message: data.message,
                status: "MESSAGE",
                nouvelle: true
            };
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
        }
    }
    const sendPrivateMessage = (data) => {
        console.log("send private");
        if (stompClient) {
            var chatMessage = {
                sendername: username,
                receivername: data.receivername,
                message: data.message,
                status: "MESSAGE"
            };
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
        }
    }

    return (
        <div className="container">
            {/* <form className='mx-auto form' onSubmit={handleSubmit(sendPrivateMessage)}>
                <input type="text" className="form-control" placeholder="Récepteur" {...register("receivername", { required: true })} />
                <input type="text" className="form-control" placeholder="Message" {...register("message", { required: true })} />

                <button type="submit" className="btn btn-primary form-control" >Envoyez</button>
            </form> */}
            <br />
            <br />
            <form className='mx-auto form' onSubmit={handleSubmit(sendPublicMessage)}>
                <input type="text" className="form-control" placeholder="Message" {...register("message", { required: true })}/>
                
                <button type="submit" className="btn btn-primary form-control" >Envoyez à tous</button>
            </form>
        </div>
    )
}

export default Messagerie;
