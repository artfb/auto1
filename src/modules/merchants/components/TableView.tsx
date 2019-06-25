import React, { useEffect } from 'react'
import { Table, Divider, Avatar, Icon } from 'antd';
import { TableViewComponentProps } from '../containers/MerchantList';
import { Merchant, Bid } from '../types';
import { ModalViewComponentProps } from '../containers/MerchantModal';
import { RowState, RowProps } from 'antd/lib/grid/row';
import { ExpandIconProps } from 'antd/lib/table';

class MerchColumn extends Table.Column<Merchant> { }

const expandIcon: React.FC<ExpandIconProps<Merchant>> = ({ expanded, record, onExpand }) => {
  if (!record.bids.length) {
    return null
  };

  return (
    <a onClick={(e: any) => onExpand(record, e)}>
      {expanded ? <Icon type="minus-square" /> : <Icon type="plus-square" />}
    </a>
  );
}
const MerchantsList: React.FC<TableViewComponentProps & ModalViewComponentProps> = ({ load, loading, merchants, openModal,  }) => {
  useEffect(() => {
    load();
  }, [])

  return <Table<Merchant>
    rowKey="id"
    loading={loading}
    dataSource={merchants}
    pagination={{ position: 'both' }}
    expandIcon={expandIcon}
    expandedRowRender={
      (record) => record.bids.length ?
        record.bids
          .sort((a, b) => a.createdAt - b.createdAt)
          .map(bid => {
            return <div
              key={`${bid.id}-${bid.createdAt}`}
            >
              {bid.carTitle} - {bid.amount} - {new Date(bid.createdAt * 1000).toLocaleDateString()}
            </div>
          }
        ) : null
    }
  >
    <MerchColumn key="avatar" dataIndex="avatarUrl" render={url => <Avatar src={url} />} />
    <MerchColumn
      title="Name"
      dataIndex="firstname"
      key="firstName"
      render={(text, record) => `${record.firstname} ${record.lastname}`}
    />
    <MerchColumn title="Num of bids" dataIndex="bids" render={bids => <>{bids.length}</>} />
    <MerchColumn
      title="Action"
      key="actions"
      render={(text, record) => (
        <>
          <a onClick={() => openModal({ merchantId: record.id })}>Edit {record.id}</a>
          <Divider type="vertical" />
          <a onClick={() => openModal({ merchantId: record.id, actionType: 'DELETE' })}>Delete</a>
        </>
      )}
    />
  </Table>
};

export default MerchantsList;
