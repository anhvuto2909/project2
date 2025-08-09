import { useEffect, useState } from "react";
import { WrapperHeader } from "./style";
import { Button, Form, Modal } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { WrapperUploadFile } from "./style";
import { getBase64 } from "../../utils";
import * as ProductService from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from 'react-redux';

const AdminProduct = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const user = useSelector((state) => state?.user)
  const [stateProduct, setStateProduct] = useState({
    name: "",
    price: "",
    description: "",
    rating: "",
    image: "",
    type: "",
    countInStock: ""
  });

  const [stateProductDetails, setStateProductDetails] = useState({
    name: "",
    price: "",
    description: "",
    rating: "",
    image: "",
    type: "",
    countInStock: ""
  });

  const [form] = Form.useForm();
  const [formUpdate] = Form.useForm();

  const mutation = useMutationHooks(
    async (data) => {
      const { name, price, description, rating, image, type, countInStock } = data;
      const res = await ProductService.createProduct({
        name,
        price,
        description,
        rating,
        image,
        type,
        countInStock,
      });
      return res;
    }
  );

  const mutationUpdate = useMutationHooks(
    async (data) => {
      try {
        const { id, token, ...rests } = data;
        const res = await ProductService.updateProduct(id, { ...rests }, token);
        return res;
      } catch (error) {
        console.error("Lỗi khi update sản phẩm:", error.response?.data || error.message);
      }
    }
  );

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct();
    return res
  }

  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct(rowSelected);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        price: res?.data?.price,
        description: res?.data?.description,
        rating: res?.data?.rating,
        image: res?.data?.image,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock
      });
    }
    setIsLoadingUpdate(false);
  };

  useEffect(() => {
    formUpdate.setFieldsValue(stateProductDetails)
  }, [formUpdate, stateProductDetails])

  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsProduct(rowSelected)
    }
  }, [rowSelected]);

  const handleDetailsProduct = () => {
    if (rowSelected) {
      setIsLoadingUpdate(true)
      fetchGetDetailsProduct(rowSelected)
    }
    setIsOpenDrawer(true)
  }

  const { data, isLoading: isLoadingCreate, isSuccess, isError } = mutation
  const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
  console.log('dataUpdated', dataUpdated)

  const { isLoading: isLoadingProducts, data: products } = useQuery({ queryKey: ['products'], queryFn: getAllProducts })

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} />
        <EditOutlined style={{ color: 'blue', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
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
      render: renderAction
    },
  ];
  const dataTable = products?.data?.length && products?.data?.map((product) => {
    return {
      ...product,
      key: product._id
    }
  });

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success()
      handleCloseDrawer()
    } else if (isError) {
      message.error()
    }
  }, [isSuccess])

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: "",
      price: "",
      description: "",
      rating: "",
      image: "",
      type: "",
      countInStock: ""
    })
    formUpdate.resetFields();
  };

  useEffect(() => {
    if (isSuccessUpdated && data?.status === "OK") {
      message.success()
      handleCloseDrawer()
    } else if (isErrorUpdated) {
      message.error()
    }
  }, [isSuccessUpdated])

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: "",
      price: "",
      description: "",
      rating: "",
      image: "",
      type: "",
      countInStock: ""
    });
    form.resetFields();
  };

  const onFinish = () => {
    mutation.mutate(stateProduct)
  };

  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value
    })
  };

  const handleOnChangeDetails = (e) => {
    console.log("Changing:", e.target.name, e.target.value);
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview
    })
  }

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview
    })
  }

  const onUpdateProduct = () => {
    mutationUpdate.mutate({ id: rowSelected, access_token: user?.access_token, ...stateProductDetails })
  }

  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{ fontSize: '60px' }} /></Button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <TableComponent columns={columns}
          isPending={isLoadingProducts}
          data={dataTable}
          onRow={(record) => {
            return {
              onClick: (event) => { setRowSelected(record._id) }
            };
          }}
        />
      </div>
      <Modal title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null} >
        <Loading isPending={isLoadingCreate} >
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
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponent value={stateProduct.name} onChange={handleOnChange} name="name" />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: 'Please input your type!' }]}
            >
              <InputComponent value={stateProduct.type} onChange={handleOnChange} name="type" />
            </Form.Item>

            <Form.Item
              label="Count In Stock"
              name="countInStock"
              rules={[{ required: true, message: 'Please input your count inStock!' }]}
            >
              <InputComponent value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock" />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: 'Please input your price!' }]}
            >
              <InputComponent value={stateProduct.price} onChange={handleOnChange} name="price" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input your description!' }]}
            >
              <InputComponent value={stateProduct.description} onChange={handleOnChange} name="description" />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[{ required: true, message: 'Please input your Rating!' }]}
            >
              <InputComponent value={stateProduct.rating} onChange={handleOnChange} name="rating" />
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
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft: '10px'
                  }} alt="avatar" />
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
      <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="80%">
        <Loading isPending={isLoadingUpdate || isLoadingUpdated} >
          <Form
            name="update-form"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateProduct}
            autoComplete="on"
            form={formUpdate}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <InputComponent value={stateProductDetails.name} onChange={handleOnChangeDetails} name="name" />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: 'Please input your type!' }]}
            >
              <InputComponent value={stateProductDetails.type} onChange={handleOnChangeDetails} name="type" />
            </Form.Item>

            <Form.Item
              label="Count In Stock"
              name="countInStock"
              rules={[{ required: true, message: 'Please input your count inStock!' }]}
            >
              <InputComponent value={stateProductDetails.countInStock} onChange={handleOnChangeDetails} name="countInStock" />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: 'Please input your price!' }]}
            >
              <InputComponent value={stateProductDetails.price} onChange={handleOnChangeDetails} name="price" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please input your description!' }]}
            >
              <InputComponent value={stateProductDetails.description} onChange={handleOnChangeDetails} name="description" />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[{ required: true, message: 'Please input your Rating!' }]}
            >
              <InputComponent value={stateProductDetails.rating} onChange={handleOnChangeDetails} name="rating" />
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: 'Please input your image!' }]}
            >
              <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                <Button>Select File</Button>
                {stateProductDetails?.image && (
                  <img src={stateProductDetails?.image} style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft: '10px'
                  }} alt="avatar" />
                )}
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>

          </Form>
        </Loading>
      </DrawerComponent>
    </div>
  )
}

export default AdminProduct