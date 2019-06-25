import React from 'react';
import { Layout, Breadcrumb, Button } from 'antd';
import logo from './logo.png';
import 'antd/dist/antd.css';
import './App.css';
import MerchantsList from './modules/merchants/containers/MerchantList';
import MerchantModal, { ModalViewComponentProps } from './modules/merchants/containers/MerchantModal';

const { Header, Footer, Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo">
          <img src={logo} alt="" style={{ height: "40px" }} />
        </div>
      </Header>
      <Content style={{ padding: '0 50px' }} className='layout-content'>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Merchants</Breadcrumb.Item>
        </Breadcrumb>
        <div className="content">
          <MerchantModal>
            {(props: ModalViewComponentProps) => <>
              <div className="actions">
                <Button type="primary" onClick={() => props.openModal({ actionType: 'ADD' })}>Add merchant</Button>
              </div>
              <MerchantsList {...props} />
              </>}
          </MerchantModal>

        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}

export default App;
