import React, { Component } from 'react';
import { Upload, Button } from 'antd';
import * as XLSX from 'xlsx';
class ImportExcel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onImportExcel = (file) => {
    let data = []; // 存储获取到的数据 // 通过FileReader对象读取文件

    const fileReader = new FileReader();

    fileReader.readAsBinaryString(file); //二进制
    fileReader.onload = (event) => {
      try {
        const { result } = event.target; // 以二进制流方式读取得到整份excel表格对象

        const workbook = XLSX.read(result, { type: 'binary' }); // 遍历每张工作表进行读取（这里默认只读取第一张表）

        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据

            data = data.concat(
              XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
            ); // break; // 如果只取第一张表，就取消注释这行
          }
        }

        console.log(data);
      } catch (e) {
        // 这里可以抛出文件类型错误不正确的相关提示

        console.log('文件类型不正确');

        return;
      }
    };
  };
  render() {
    return (
      <Upload
        name="excel"
        action=""
        listType="text"
        accept="file"
        beforeUpload={this.onImportExcel}
        showUploadList={true}
      >
            <Button>        点击上传报表     </Button>
            
      </Upload>
    );
  }
}

export default ImportExcel;
