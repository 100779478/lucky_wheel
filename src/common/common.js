import GoDB from "godb";
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
    return record.addMany(dataArr)
}

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


export function clearSchema() {
    return record.getAll().then(res => res.map(item => {
        return record.delete(item.id)
    }))
    // const records = record.getAll().then()
    // return Promise.all(records.map(item => record.delete(item.id)))
}