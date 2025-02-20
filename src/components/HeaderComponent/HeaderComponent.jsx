import React, { useEffect, useState } from "react";
import { Badge, Col, Popover } from "antd";
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall, WrapperContentPopUp } from "./style";
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined
  } from '@ant-design/icons';
  import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../LoadingComponent/Loading";

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {

        const navigate = useNavigate();
        const user = useSelector((state) => state.user)
        const dispatch = useDispatch()
        const [userName, setUserName ] = useState('')
        const [userAvatar, setUserAvatar ] = useState('')
        const [loading, setLoading] = useState(false)
        const handleNavigateLogin = () => {
            navigate('/sign-in')
        }

        const handleLogout = async () => {
            setLoading(true)
            await UserService.logoutUser()
            localStorage.removeItem('access_token')
            dispatch(resetUser());
            setLoading(false)
            //window.location.reload();
            navigate('/')
        }

        useEffect(() => {
            setLoading(true)
            setUserName(user?.name)
            setUserAvatar(user?.avatar)
            setLoading(false)
        }, [user?.name, user?.avatar])
        
        const content = (
            <div>
                {user?.isAdmin && (
                    <WrapperContentPopUp onClick={() => navigate('/system/admin')} >Quản lý hệ thống</WrapperContentPopUp>
                )}
                <WrapperContentPopUp onClick={() => navigate('/profile-user')} >Tài khoản của tôi</WrapperContentPopUp>
                <WrapperContentPopUp onClick={handleLogout}>Đăng xuất</WrapperContentPopUp>
            </div>
          );

    return (
        <div style={{ width: '100%', background:'rgb(26, 148, 255)', display:'flex', justifyContent:'center'}}>
            <WrapperHeader gutter={15}>
                <Col span={6}>
                <WrapperTextHeader onClick={() => navigate('/')} style={{ cursor: 'pointer' }} > ANHVUTO </WrapperTextHeader> 
                </Col>
                
                <Col span={13} >
                    {!isHiddenSearch&&(
                    <ButtonInputSearch
                    placeholder="Bạn đang tìm kiếm..."
                    allowClear
                    textButton="Tìm kiếm"
                    size="large"
                    //onSearch={onSearch}
                    />
                    )}
                </Col>
                
                <Col span={6} style={{ display :'flex', alignItems:'center' }} >
                <Loading isPending = {loading}>
                <WrapperHeaderAccount>
                    {userAvatar ? (
                        <img src={userAvatar} alt="avatar" 
                            style={{
                                height : '40px',
                                width : '40px',
                                borderRadius : '50%',
                                objectFit : 'cover'
                            }} 
                        />
                    ) : (
                    <UserOutlined style={{fontSize: '30px', color : '#fff'}} />
                        
                    )}
                    {user?.access_token ? (
                        <>
                        <Popover content={content} trigger="hover">
                        <div style={{ fontSize: '16px', color : '#fff', cursor:'pointer' }}> { userName?.length ? userName : user?.email } </div>
                        </Popover>
                        </>
                    ) : (
                        <div onClick={handleNavigateLogin} style={{ cursor:'pointer' }}>
                        <WrapperTextHeaderSmall>Đăng nhập | Đăng ký</WrapperTextHeaderSmall>
                        <div>
                        <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                        <CaretDownOutlined />
                        </div>
                    </div>
                    )}
                </WrapperHeaderAccount>
                </Loading>
                {!isHiddenCart &&(
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <Badge count={5} size="small" offset={[0, 0]}>
                        <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                    </Badge>
                    <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
                </div>
                )}
                </Col>
            </WrapperHeader>

        </div>
    )
}

export default HeaderComponent