import React, { useContext, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Modal } from 'antd';
import type { StackType } from '../App';
import { useDeleteStacksMutation } from '../store/stackApi';
import { Context } from '../context/Context';

const { Meta } = Card;

export const Cards = ({ item }: { item: StackType }) => {
    const [showModal, setshowModal] = useState(false);
    const [deleteStack] = useDeleteStacksMutation();
    const { setShowCreate, setImages, setEditingItem } = useContext(Context);

    function handleDeleteClick() {
        setshowModal(true);
    }

    function handleDelete(e: React.FormEvent) {
        e.preventDefault();
        deleteStack(item.id);
        setshowModal(false);
    }

    function handleEdit() {
        setEditingItem(item);
        setImages(item.image);
        setShowCreate(true);
    }

    return (
        <Card
            className='shadow-2xl'
            style={{ width: 300 }}
            cover={
                <img
                    width={400}
                    height={300}
                    alt="example"
                    src={item.image}
                />
            }
            actions={[
                <Button onClick={handleDeleteClick} className='!bg-red-500 !border-none !text-white'>
                    <DeleteOutlined className='!text-[20px]' key="delete" />
                </Button>,
                <Button onClick={handleEdit} className='!bg-yellow-500 !border-none !text-white'>
                    <EditOutlined className='!text-[20px]' key="edit" />
                </Button>
            ]}
        >
            <Meta
                title={item.name}
                description={item.createdAt}
            />
            <Modal
                title="Ishonchinggiz komilmi?"
                open={showModal}
                okText="O'chirish"
                cancelText="Bekor qilish"
                onCancel={() => setshowModal(false)}
                onOk={handleDelete}
            />
        </Card>
    );
};

export default Cards;