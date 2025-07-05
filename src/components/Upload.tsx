import React, { useContext, useState } from 'react';
import { Upload as AntUpload } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { Context } from "../context/Context";

const Upload: React.FC = () => {
  const { images, setImages } = useContext(Context);
  const [fileList, setFileList] = useState<UploadFile[]>(images ? [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: images,
    },
  ] : []);

  const onChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
  setFileList(newFileList);

  const file = newFileList[0]?.originFileObj;
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        console.log(result)
        setImages(result);
      }
    };
  }
};



  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src && file.originFileObj) {
      src = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        if(file.originFileObj)
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const img = new Image();
    img.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(img.outerHTML);
  };

  return (
    <ImgCrop rotationSlider>
      <AntUpload
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 1 && '+ Upload'}
      </AntUpload>
    </ImgCrop>
  );
};

export default Upload;
