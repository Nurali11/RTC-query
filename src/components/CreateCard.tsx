import { Button, Input } from 'antd';
import Upload from './Upload';
import { Context } from '../context/Context';
import { useContext, useState, useEffect } from 'react';
import { useCreateStackMutation, useUpdateStackMutation } from '../store/stackApi';
import { CloseOutlined } from '@ant-design/icons';

const CreateCard: React.FC<{ item?: any }> = ({ item }) => {
  const { images, setShowCreate } = useContext(Context);
  const [title, setTitle] = useState(item?.name || "");
  const [date, setDate] = useState(item?.createdAt ? item.createdAt.slice(0, 10) : "");
  const [createStack] = useCreateStackMutation();
  const [updateStack] = useUpdateStackMutation();

  // Сброс полей при открытии новой формы
  useEffect(() => {
    setTitle(item?.name || "");
    setDate(item?.createdAt ? item.createdAt.slice(0, 10) : "");
  }, [item]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (item) {
      // PATCH: если не выбрано новое изображение, используем старое
      const isoDate = date ? new Date(date).toISOString() : item.createdAt;
      updateStack({
        id: item.id,
        name: title,
        image: images || item.image,
        createdAt: isoDate,
      });
    } else {
      // POST: используем текущую дату
      createStack({
        name: title,
        image: images,
        createdAt: new Date().toISOString(),
      });
    }
    setShowCreate(false);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center !backdrop-blur-[0.3px] z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className='flex justify-between'>
          <h2 className="text-xl font-semibold mb-4">{item ? "Edit Stack" : "Create Stack"}</h2>
          <Button onClick={() => setShowCreate(false)}>
            <CloseOutlined />
          </Button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 items-center justify-between"
        >
          <Upload />
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="!text-[20px]"
          />
          {item && (
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="!text-[20px]"
            />
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCard;