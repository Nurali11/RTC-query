import { Button } from 'antd'
import './App.css'
import Cards from './components/Card'
import { useGetAllStacksQuery } from './store/stackApi'
import { useContext } from 'react'
import { Context } from './context/Context'
import CreateCard from './components/CreateCard'

export interface StackType {
  id: number,
  name: string,
  createdAt: string,
  image: string
}

function App() {
  const {data:stacks, isLoading, isError} = useGetAllStacksQuery("")
  const {showCreate, setShowCreate, editingItem, setImages, setEditingItem} = useContext(Context)

  if(isError) return <div>Error..</div>
  if(isLoading) return <div>Loading..</div>
  console.log(stacks)
  return (
    <>
      <div className='flex justify-between items-center py-5 px-[20px] bg-green-400 '>
        <h1 className='font-bold text-white text-[20px]'>Stacks</h1>
        <Button
          onClick={() => {
            setEditingItem(null);
            setShowCreate(true);
            setImages(null)
          }}
          className='!text-[18px] btn !text-white !bg-[#232222] !h-[40px]'
        >
          + Create Stack
        </Button>
      </div>
      <div className='flex flex-wrap justify-between space-x-[10px] gap-4 p-[20px]'>
        {stacks?.data?.map((item: StackType) => (
          <Cards key={item.id} item={item}/>
        ))}
      </div>
      {showCreate && <CreateCard item={editingItem} />}
    </>
  )
}

export default App