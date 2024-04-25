<script>
export default {
  data() {
    return {
      blocks: [{padding: "13px", background: "#617df2"}],
      prizes: [
        {fonts: [{text: "下馆子", top: "20%"}], background: "#e9e8fe"},
        {fonts: [{text: "米线", top: "20%"}], background: "#b8c5f2"},
        {fonts: [{text: "永和大王", top: "20%"}], background: "#e9e8fe"},
        {fonts: [{text: "吃面", top: "20%"}], background: "#b8c5f2"},
        {fonts: [{text: "盖浇饭", top: "20%"}], background: "#e9e8fe"},
        {fonts: [{text: "快餐", top: "20%"}], background: "#b8c5f2"},
        {fonts: [{text: "螺蛳粉", top: "20%"}], background: "#e9e8fe"},
        {fonts: [{text: "点外卖", top: "20%"}], background: "#b8c5f2"},
        {fonts: [{text: "Taco", top: "20%"}], background: "#e9e8fe"},
        {fonts: [{text: "疯狂星期四", top: "20%"}], background: "#b8c5f2"},
        {fonts: [{text: "麦当劳", top: "20%"}], background: "#e9e8fe"},
        {fonts: [{text: "海南鸡饭", top: "20%"}], background: "#b8c5f2"},
        {fonts: [{text: "冒菜", top: "20%"}], background: "#e9e8fe"},
        {fonts: [{text: "手抓饼", top: "20%"}], background: "#b8c5f2"},
      ],
      drawHistory: [],
      db: null,
      buttons: [
        {
          radius: "30%",
          background: "#8a9bf3",
          pointer: true,
          fonts: [{text: "开始", top: "-10px"}],
        },
      ],
    };
  },
  mounted() {
    const drawHistory = localStorage.getItem("drawHistory");
    if (drawHistory) {
      this.drawHistory = JSON.parse(drawHistory);
    }
  },
  methods: {
    // 点击抽奖按钮会触发star回调
    startCallback() {
      // 每次点击开始重置转盘背景色
      this.prizes.forEach((prize, index) => {
        prize.background = index % 2 === 0 ? "#e9e8fe" : "#b8c5f2";
      });
      // 调用抽奖组件的play方法开始游戏
      this.$refs.myLucky.play();
      // 模拟调用接口异步抽奖
      setTimeout(() => {
        // // 假设后端返回的中奖索引是0
        // const index = 0;

        const count = this.prizes.length;
        const index = Math.floor(Math.random() * count);

        // 调用stop停止旋转并传递中奖索引
        this.$refs.myLucky.stop(index);
      }, 1000);
    },
    // 抽奖结束会触发end回调
    endCallback(prize) {
      prize.background = "red";
      const currentDate = new Date();
      const time = new Date().toLocaleString();
      const item = prize.fonts[0].text;
      const dayOfWeek = ["星期日", '星期一', "星期二", "星期三", "星期四", "星期五", "星期六"][currentDate.getDay()];
      this.drawHistory.unshift({time: `${time} (${dayOfWeek})`, item});
      localStorage.setItem("drawHistory", JSON.stringify(this.drawHistory));
    },
  },
};
</script>

<template>
  <div style="display: flex;justify-content: space-between;width: 1100px">
    <LuckyWheel
        ref="myLucky"
        width="500px"
        height="500px"
        :prizes="prizes"
        :blocks="blocks"
        :buttons="buttons"
        @start="startCallback"
        @end="endCallback"
    />
    <div style="width: 450px">
      <span style="font-weight: bolder;font-size: 30px">{{ '记录：' }}</span>
      <ul style="font-size: 22px;overflow-y: auto;height: 450px">
        <li v-for="(record, index) in drawHistory" :key="index">
          {{ record.time }} - {{ record.item }}
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
</style>


<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      blocks: [{padding: "13px", background: "#617df2"}],-->
<!--      prizes: [-->
<!--        {fonts: [{text: "下馆子", top: "20%"}], background: "#e9e8fe"},-->
<!--        {fonts: [{text: "米线", top: "20%"}], background: "#b8c5f2"},-->
<!--        {fonts: [{text: "永和大王", top: "20%"}], background: "#e9e8fe"},-->
<!--        {fonts: [{text: "吃面", top: "20%"}], background: "#b8c5f2"},-->
<!--        {fonts: [{text: "盖浇饭", top: "20%"}], background: "#e9e8fe"},-->
<!--        {fonts: [{text: "快餐", top: "20%"}], background: "#b8c5f2"},-->
<!--        {fonts: [{text: "螺蛳粉", top: "20%"}], background: "#e9e8fe"},-->
<!--        {fonts: [{text: "点外卖", top: "20%"}], background: "#b8c5f2"},-->
<!--        {fonts: [{text: "Taco", top: "20%"}], background: "#e9e8fe"},-->
<!--        {fonts: [{text: "疯狂星期四", top: "20%"}], background: "#b8c5f2"},-->
<!--        {fonts: [{text: "麦当劳", top: "20%"}], background: "#e9e8fe"},-->
<!--        {fonts: [{text: "海南鸡饭", top: "20%"}], background: "#b8c5f2"},-->
<!--        {fonts: [{text: "冒菜", top: "20%"}], background: "#e9e8fe"},-->
<!--        {fonts: [{text: "手抓饼", top: "20%"}], background: "#b8c5f2"},-->
<!--      ],-->
<!--      drawHistory: [],-->
<!--      db: null,-->
<!--      buttons: [-->
<!--        {-->
<!--          radius: "35%",-->
<!--          background: "#8a9bf3",-->
<!--          pointer: true,-->
<!--          fonts: [{text: "开始", top: "-10px"}],-->
<!--        },-->
<!--      ],-->
<!--    };-->
<!--  },-->
<!--  mounted() {-->
<!--    this.openDatabase();-->
<!--    this.loadDrawHistory();-->
<!--  },-->
<!--  methods: {-->
<!--    openDatabase() {-->
<!--      const dbName = "drawHistoryDB";-->
<!--      const request = indexedDB.open(dbName, 1);-->

<!--      request.onerror = function (event) {-->
<!--        console.error("Error opening database:", event.target.error);-->
<!--      };-->

<!--      request.onsuccess = (event) => {-->
<!--        console.log("Database opened successfully");-->
<!--        this.db = event.target.result;-->
<!--        this.loadDrawHistory(); // 加载抽奖记录-->
<!--      };-->

<!--      request.onupgradeneeded = (event) => {-->
<!--        const db = event.target.result;-->
<!--        const objectStore = db.createObjectStore("drawHistory", {keyPath: "id", autoIncrement: true});-->
<!--        objectStore.createIndex("time", "time", {unique: false});-->
<!--        objectStore.createIndex("item", "item", {unique: false});-->
<!--      };-->
<!--    },-->
<!--    loadDrawHistory() {-->
<!--      if (!this.db) return;-->
<!--      const transaction = this.db.transaction(["drawHistory"], "readonly");-->
<!--      const objectStore = transaction.objectStore("drawHistory");-->

<!--      const request = objectStore.getAll();-->

<!--      request.onerror = function (event) {-->
<!--        console.error("Error loading draw history:", event.target.error);-->
<!--      };-->

<!--      request.onsuccess = (event) => {-->
<!--        this.drawHistory = event.target.result;-->
<!--      };-->
<!--    },-->
<!--    saveDrawRecord(record) {-->
<!--      if (!this.db) return;-->
<!--      const transaction = this.db.transaction(["drawHistory"], "readwrite");-->
<!--      const objectStore = transaction.objectStore("drawHistory");-->

<!--      const request = objectStore.add(record);-->

<!--      request.onerror = function (event) {-->
<!--        console.error("Error saving draw record:", event.target.error);-->
<!--      };-->

<!--      request.onsuccess = (event) => {-->
<!--        console.log("Draw record saved successfully");-->
<!--      };-->
<!--    },-->
<!--// 点击抽奖按钮会触发star回调-->
<!--    startCallback() {-->
<!--// Reset prize colors to default before starting animation-->
<!--      this.prizes.forEach((prize, index) => {-->
<!--        prize.background = index % 2 === 0 ? "#e9e8fe" : "#b8c5f2";-->
<!--      });-->
<!--// 调用抽奖组件的play方法开始游戏-->
<!--      this.$refs.myLucky.play();-->
<!--// 模拟调用接口异步抽奖-->
<!--      setTimeout(() => {-->
<!--        const count = this.prizes.length;-->
<!--        const index = Math.floor(Math.random() * count);-->

<!--// 调用stop停止旋转并传递中奖索引-->
<!--        this.$refs.myLucky.stop(index);-->
<!--      }, 1000);-->
<!--    },-->
<!--// 抽奖结束会触发end回调-->
<!--    endCallback(prize) {-->
<!--      prize.background = "red";-->
<!--      const currentDate = new Date();-->
<!--      const time = new Date().toLocaleString();-->
<!--      const item = prize.fonts[0].text;-->
<!--      const dayOfWeek = ["星期日", '星期一', "星期二", "星期三", "星期四", "星期五", "星期六"][currentDate.getDay()];-->
<!--      const record = {time: `${time} (${dayOfWeek})`, item};-->
<!--      this.drawHistory.unshift(record);-->
<!--      this.saveDrawRecord(record);-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<template>-->
<!--  <div style="display: flex;justify-content: space-between;width: 1100px">-->
<!--    <LuckyWheel-->
<!--        ref="myLucky"-->
<!--        width="500px"-->
<!--        height="500px"-->
<!--        :prizes="prizes"-->
<!--        :blocks="blocks"-->
<!--        :buttons="buttons"-->
<!--        @start="startCallback"-->
<!--        @end="endCallback"-->
<!--    />-->
<!--    <div style="width: 400px">-->
<!--      <span style="font-weight: bolder;font-size: 30px">{{ '记录：' }}</span>-->
<!--      <ul style="font-size: 22px;overflow-y: auto;height: 450px">-->
<!--        <li v-for="(record, index) in drawHistory" :key="index">-->
<!--          {{ record.time }} - {{ record.item }}-->
<!--        </li>-->
<!--      </ul>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<!--<style scoped>-->
<!--</style>-->


