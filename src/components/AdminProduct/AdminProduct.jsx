import React, { useEffect, useState } from "react";
import { WrapperHeader } from "./style";
import { Button, Form, Modal } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { WrapperUploadFile } from "./style";
import { getBase64 } from "../../utils";
//import { createProduct } from "../../services/ProductService";
import * as ProductService from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import * as message from "../../components/Message/Message"; 
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";

const AdminProduct = () => {
    const [ isModalOpen, setIsModalOpen ]= useState(false);

    const [rowSelected, setRowSelected] = useState('');

    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

    const [ stateProduct, setStateProduct ] = useState({
        name : '',
        price : '',
        description: '',
        rating: '', 
        image: '',
        type: '',
        countInStock: ''
    });

    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const { name, price, description, rating, image, type, countInStock : countInStock } = data
            ProductService.createProduct({ name, price, description, rating, image, type, countInStock })
        }
    );

    const getAllProducts = async () => {
        const res = await ProductService.getAllProduct()
        return res
    }

    const fetchGetDetailsProduct = async () => {
        const res = await ProductService.getDetailsProduct(rowSelected)
        console.log('res', res)
    }

    const handleDetailsProduct = () => {
        if(rowSelected) {
            fetchGetDetailsProduct()
        }
        setIsOpenDrawer(true)
        console.log("rowSelected", rowSelected)
        }

    const { data, isLoading, isSuccess, isError } = mutation

    const {isLoading : isLoadingProduct, data : products} = useQuery({queryKey: ['products'], queryFn: getAllProducts})

    const renderAction = () => {
        return (
            <div>
              <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} />
              <EditOutlined style={{ color: 'blue', fontSize: '30px', cursor: 'pointer'  }} onClick={handleDetailsProduct} />
            </div>
          );
    }

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Price',
          dataIndex: 'price',
        },
        {
          title: 'Rating',
          dataIndex: 'rating',
        },
        {
          title: 'Type',
          dataIndex: 'type',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: renderAction,
        },
      ];
      const dataTable = products?.data?.length && products?.data?.map((product) => {
        return {
          ...product,
          key: product._id
      }
      })

    useEffect(() => {
        if(isSuccess && data?.status === "OK"){
            message.success()
            handleCancel()
        }else if(isError){ 
            message.error()
        }
        },[isSuccess, isError])

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name : '',
            price : '',
            description: '',
            rating: '', 
            image: '',
            type: '',
            countInStock: ''
        })
        form.resetFields();
    };

    const onFinish = () => {
        mutation.mutate(stateProduct);
    };

    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name] : e.target.value
        })
    };

    const handleOnchangeAvatar = async ({fileList}) => {
            const file = fileList[0]
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
              }
            setStateProduct({
                ...stateProduct,
                image : file.preview
            })
    };  

    return (
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{ marginTop : '10px' }}> 
                <Button style={{height:'150px', width : '150px', borderRadius : '6px', borderStyle : 'dashed' }} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{ fontSize : '60px'}} /></Button>
            </div>

            <div style={{marginTop : '20px'}}> 
                <TableComponent columns = {columns} 
                    isLoading = {isLoadingProduct} 
                    data = {dataTable} 
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {setRowSelected(record._id)},
                        };
                    }} 
                />
            </div>
            <Modal title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer = {null} >
                <Loading isPending={isLoading} >
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                        label="Name"
                        name="Name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                        <InputComponent value = '' onChange = {handleOnChange} name = "name" />
                        </Form.Item>

                        <Form.Item
                        label="Type"
                        name="Type"
                        rules={[{ required: true, message: 'Please input your type!' }]}
                        >
                        <InputComponent value = {stateProduct.type} onChange = {handleOnChange} name = "type" />
                        </Form.Item>

                        <Form.Item
                        label="Count In Stock"
                        name="countInStock"
                        rules={[{ required: true, message: 'Please input your count inStock!' }]}
                        >
                        <InputComponent value = {stateProduct.countInStock} onChange = {handleOnChange} name = "countInStock" />
                        </Form.Item>

                        <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input your price!' }]}
                        >
                        <InputComponent value = {stateProduct.price} onChange = {handleOnChange} name = "price" />
                        </Form.Item>

                        <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input your description!' }]}
                        >
                        <InputComponent value = {stateProduct.description} onChange = {handleOnChange} name = "description" />
                        </Form.Item>

                        <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{ required: true, message: 'Please input your Rating!' }]}
                        >
                        <InputComponent value = {stateProduct.rating} onChange = {handleOnChange} name = "rating" />
                        </Form.Item>

                        <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: 'Please input your image!' }]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                                    <Button>Select File</Button>
                                        {stateProduct.image && (
                                            <img src={stateProduct?.image} style={{
                                                height : '60px',
                                                width : '60px',
                                                borderRadius : '50%',
                                                objectFit : 'cover',
                                                marginLeft : '10px'
                                            }} alt = "avatar" />
                                        )}
                            </WrapperUploadFile>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        </Form.Item>
                        
                    </Form>
                </Loading>
            </Modal>
            <DrawerComponent title = 'Chi tiết sản phẩm' isOpen = {isOpenDrawer} onClose = {() => setIsOpenDrawer(false)} width = "80%">
            <Loading isPending={isLoading} >
                    <Form
                        name="basic"
                        labelCol={{ span: 2 }}
                        wrapperCol={{ span: 22 }}
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                        autoComplete="on"
                        //form={form}
                    >
                        <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                        <InputComponent value = '' onChange = {handleOnChange} name = "name" />
                        </Form.Item>

                        <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Please input your type!' }]}
                        >
                        <InputComponent value = {stateProduct.type} onChange = {handleOnChange} name = "type" />
                        </Form.Item>

                        <Form.Item
                        label="Count In Stock"
                        name="countInStock"
                        rules={[{ required: true, message: 'Please input your count inStock!' }]}
                        >
                        <InputComponent value = {stateProduct.countInStock} onChange = {handleOnChange} name = "countInStock" />
                        </Form.Item>

                        <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input your price!' }]}
                        >
                        <InputComponent value = {stateProduct.price} onChange = {handleOnChange} name = "price" />
                        </Form.Item>

                        <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input your description!' }]}
                        >
                        <InputComponent value = {stateProduct.description} onChange = {handleOnChange} name = "description" />
                        </Form.Item>

                        <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{ required: true, message: 'Please input your Rating!' }]}
                        >
                        <InputComponent value = {stateProduct.rating} onChange = {handleOnChange} name = "rating" />
                        </Form.Item>

                        <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: 'Please input your image!' }]}
                        >
                            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                                    <Button>Select File</Button>
                                        {stateProduct.image && (
                                            <img src={stateProduct?.image} style={{
                                                height : '60px',
                                                width : '60px',
                                                borderRadius : '50%',
                                                objectFit : 'cover',
                                                marginLeft : '10px'
                                            }} alt = "avatar" />
                                        )}
                            </WrapperUploadFile>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        </Form.Item>
                        
                    </Form>
                </Loading>
            </DrawerComponent>
        </div>
    )
}

export default AdminProduct