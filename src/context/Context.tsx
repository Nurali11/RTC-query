import { createContext, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from "react";

interface ContextType {
    showCreate: boolean,
    setShowCreate: Dispatch<SetStateAction<boolean>>,
    images: string | null,
    setImages: Dispatch<SetStateAction<string | null>>,
    data: any[],
    setData: Dispatch<SetStateAction<any[]>>,
    editingItem: any,
    setEditingItem: Dispatch<SetStateAction<any>>
}

export const Context = createContext<ContextType>({
    showCreate: false,
    setShowCreate: () => {},
    images: "",
    setImages: () => {},
    data: [],
    setData: () => {},
    editingItem: null,
    setEditingItem: () => {}
})

export const GlobalContext: FC<{ children: ReactNode }> = ({ children }) => {
    const [showCreate, setShowCreate] = useState<boolean>(false)
    const [images, setImages] = useState<string | null>("")
    const [data, setData] = useState<any[]>([])
    const [editingItem, setEditingItem] = useState<any>(null);

    return (
        <Context.Provider value={{
            showCreate,
            setShowCreate,
            images,
            setImages,
            data,
            setData,
            editingItem,
            setEditingItem
        }}>
            {children}
        </Context.Provider>
    )
}