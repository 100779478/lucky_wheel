import GoDB from "godb";
import {Message} from "view-ui-plus";
// 定义数据库结构
const schema = {
    // user 表：
    lunchRecord: {
        // user 表的字段：
        name: String,
        age: Number
    }
}
const db = new GoDB('db', schema);
const record = db.table('lunchRecord')

// 添加一条记录
export function addRecord(data) {
    return record.add(data)
}

export function addManyRecord(dataArr) {
    return getRecord().then(existingRecords => {
        // 过滤掉已经存在的记录
        const newDataArr = dataArr.filter(newRecord => {
            return !existingRecords.some(existingRecord => {
                // 比较新记录和已存在记录的属性值是否相同
                return newRecord.property === existingRecord.property; // 用实际属性替换 property
            });
        });
        if (newDataArr.length === 0) {
            Message.error('读取失败，已经是最新数据');
        }
        // 添加剩余的新记录
        return record.addMany(newDataArr);
    });
}

// export function addManyRecord(dataArr) {
//     getRecord().then(res => {
//         console.log(dataArr === res)
//         console.log(res, 333222)
//     })
//     return record.addMany(dataArr)
// }

// 删除一条记录
export function doDelete(id) {
    return record.delete(id)
}

// 获取record数据表
export function getRecord() {
    return record.getAll().then(res => {
        return res;
    }).catch(error => {
        // 在这里处理错误
        console.error('Error fetching records:', error);
        throw error;
    });
}

// 清空列表
export function clearSchema() {
    return record.getAll().then(records => {
        const deletePromises = records.map(item => record.delete(item.id));
        return Promise.all(deletePromises);
    })
    // return record.getAll().then(res => res.map(item => {
    //     return record.delete(item.id)
    // }))
}