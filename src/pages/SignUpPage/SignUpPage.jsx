import React, { useEffect, useState } from "react";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Image } from "antd";
import signinlogo from '../../assets/img/signinlogo.png'
import InputForm from "../../components/InputForm/InputForm";
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";


const SignUpPage = () => {
    const navigate = useNavigate();
    
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }

    // const mutiation = useMutation((data) => {
    //     data => UserService.signupUser(data)
    // })

    const handleOnchangePassword = (value) => {
        setPassword(value)
    }

    const mutation = useMutationHooks(
            data => UserService.signupUser(data)
        );
    
    const { data, isLoading, isSuccess, isError } = mutation

    const handleNavigateSignIn = React.useCallback(() => {
        navigate('/sign-in');
    }, [navigate]);

    useEffect(() => {
        if ( isSuccess && data?.message === 'SUCCESS') {
            message.success('Đăng ký tài khoản thành công');
            navigate('/sign-in');
        } else if (isError) {
            message.error('Đăng ký tài khoản thất bại');
        }
    }, [isSuccess, isError, handleNavigateSignIn]);

    const handleOnchangeConfirmPassword = (value) => {
        setConfirmPassword(value)
    }

    const handleSignUp = () => {
        mutation.mutate({
            email,
            password,
            confirmPassword
        })
    }
    
    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent:'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh'}}>
            <div style={{ width: '800px', height: '445px', borderRadius: '6px', background:'#fff', display:'flex' }}>
                <WrapperContainerLeft>
                    <h1>Đăng ký</h1>
                    <p>Đăng ký tài khoản </p>
                    <InputForm style = {{ marginBottom: '10px' }} placeholder ="abc@gmail.com" value = {email} onChange = { handleOnchangeEmail}/>
                    <div style={{ position: 'relative'}}>
                        <span
                            onClick = {() => setIsShowPassword(!isShowPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '10px',
                                right: '8px'
                            }}
                        >{ 
                            isShowPassword ? (
                                <EyeFilled />
                            ) : (
                                <EyeInvisibleFilled />
                            )
                        }
                        </span>
                        <InputForm style = {{ marginBottom: '10px' }}  placeholder ="Password" type={ isShowPassword ? "text" : "password"}  value = {password} onChange = { handleOnchangePassword} />
                    </div>
                    <div style={{ position: 'relative'}}>
                        <span 
                            onClick = {() => setIsShowConfirmPassword(!isShowConfirmPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '10px',
                                right: '8px'
                            }}
                        >{ 
                            isShowConfirmPassword ? (
                                <EyeFilled />
                            ) : (
                                <EyeInvisibleFilled />
                            )
                        }
                        </span>
                        <InputForm  placeholder ="Confirm password" type={ isShowConfirmPassword ? "text" : "password"} value = {confirmPassword} onChange = { handleOnchangeConfirmPassword} />
                    </div>
                    
                    {data?.status === 'ERR' && <span style={{ color : 'red' }}>{data?.message}</span>}
                    <Loading isPending = {isLoading}>
                    <ButtonComponent
                        disabled = {!email.length || !password.length || !confirmPassword.length }                  
                        onClick = {handleSignUp}
                        size = {40}
                        styleButton={{ 
                            background : 'rgb(255, 57, 69)',
                            height:'48px',
                            width: '100%',
                            border: 'none',
                            borderRadius: '4px',
                            margin: '26px 0 10px'
                    }} 
                    textButton = {'Đăng ký'}
                    styleTextButton = {{ color: "#fff", fontSize:'15px', fontWeight:'700' }}>
                    </ButtonComponent>
                    </Loading>
                    <p>Bạn đã có tài khoản ? <WrapperTextLight onClick={handleNavigateSignIn}> Đăng nhập </WrapperTextLight>  </p>
        </WrapperContainerLeft>

        <WrapperContainerRight>
            <Image src ={signinlogo} preview = {false} alt="image-logo" height="203px" width="203px" />
            <h4>Giày đá bóng tại đây</h4>
        </WrapperContainerRight>
        </div>
        </div>
    )
}

export default SignUpPage