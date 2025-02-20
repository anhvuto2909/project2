import React, { useEffect, useState } from "react";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Image } from "antd";
import signinlogo from '../../assets/img/signinlogo.png'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { jwtDecode } from "jwt-decode";
import {useDispatch} from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";


const SignInPage = () => {
    const [ isShowPassword, setIsShowPassword ] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    const mutation = useMutationHooks(
        data => UserService.loginUser(data)
    );

    const { data, isLoading, isSuccess} = mutation
    
    console.log("mutation", mutation)
    
    const handleNavigateSignUp = () => {
        navigate('/sign-up')
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }

    const handleOnchangePassword = (value) => {
        setPassword(value)
    }

    useEffect(() => {
            if ( isSuccess && data?.message === 'SUCCESS') {
                navigate('/')
                localStorage.setItem('access_token', JSON.stringify(data?.access_token))
                
                if (data?.access_token) {
                    const decoded = jwtDecode(data?.access_token)
                    console.log("decoded", decoded)
                    
                    if(decoded?.id){
                        handleGetDetailsUser(decoded?.id, data?.access_token)
                        // console.log("res", res)
                    }
                }
            }
        }, [isSuccess]);

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }));
    }

    const handleSignIn = () => {
        mutation.mutate({
             email, 
             password
        })
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent:'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh'}}>
            <div style={{ width: '800px', height: '445px', borderRadius: '6px', background:'#fff', display:'flex' }}>
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p>Đăng nhập và tạo tài khoản</p>
                    <InputForm style = {{ marginBottom: '10px' }} placeholder ="abc@gmail.com" value ={email} onChange = { handleOnchangeEmail} />
                    <div style={{ position: 'relative'}}>
                        <span
                            onClick = {() => setIsShowPassword(!isShowPassword)}
                            
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '8px',
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
                        <InputForm  
                            placeholder ="Password" 
                            type={ isShowPassword ? "text" : "password"} 
                            value = {password} 
                            onChange = {handleOnchangePassword} />
                    </div>

                    {data?.status === 'ERR' && <span style={{ color: 'red'}}>{data?.message}</span>}
                    <Loading isPending={isLoading}>
                    <ButtonComponent
                        disabled={!email.length || !password.length || isLoading }
                        onClick={handleSignIn}
                        size={40}
                        styleButton={{
                            background: 'rgb(255, 57, 69)',
                            height: '48px',
                            width: '100%',
                            border: 'none',
                            borderRadius: '4px',
                            margin: '26px 0 10px',
                        }}
                        textButton={'Đăng nhập'}
                        styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                    />
                    </Loading>


                    <WrapperTextLight> Quên mật khẩu </WrapperTextLight>
                    <p>Chưa có tài khoản ? <WrapperTextLight onClick={handleNavigateSignUp}> Tạo tài khoản </WrapperTextLight>  </p>
        </WrapperContainerLeft>

        <WrapperContainerRight>
            <Image src ={signinlogo} preview = {false} alt="image-logo" height="203px" width="203px" />
            <h4>Giày đá bóng ngay tại đây</h4>
        </WrapperContainerRight>
        </div>
        </div>
    )
}

export default SignInPage