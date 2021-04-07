<template>
  <div class="card-container">
    <el-table :data="table.currentData" style="width: 100%" max-height="400" border>
      <el-table-column fixed prop="date" label="日期" width="150">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="140">
      </el-table-column>
      <el-table-column prop="province" label="省份" width="140">
      </el-table-column>
      <el-table-column prop="city" label="市区" width="160">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="400">
      </el-table-column>
      <el-table-column prop="zip" label="邮编" width="140">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(scope.$index, table.currentData)" type="text" size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="table.currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="table.currentPageSize" :total="table.data.length" background layout="sizes, prev, pager, next, jumper, total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'dynamic-table',
  data() {
    return {
      table: {
        currentPage: 1,
        currentPageSize: 5,
        currentData: [],
        data: [
          {
            date: '2016-05-03',
            name: '王小虎1',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-03',
            name: '王小虎1',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-03',
            name: '王小虎1',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-03',
            name: '王小虎1',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-03',
            name: '王小虎1',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-03',
            name: '王小虎2',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-03',
            name: '王小虎2',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-03',
            name: '王小虎2',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-03',
            name: '王小虎2',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-03',
            name: '王小虎2',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-03',
            name: '王小虎3',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-03',
            name: '王小虎3',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-03',
            name: '王小虎3',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-03',
            name: '王小虎3',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          },
          {
            date: '2016-05-03',
            name: '王小虎3',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333
          }
        ]
      }
    }
  },
  mounted() {
    this.drawTable(this.table.currentPage, this.table.currentPageSize);
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.table.currentPageSize = val;
      this.drawTable(this.table.currentPage, val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.table.currentPage = val;
      this.drawTable(val, this.table.currentPageSize);
    },
    drawTable(pageno, pagesize) {
      var currentData = this.table.data.slice(pagesize * (pageno - 1), pageno * pagesize);
      this.table.currentData = currentData;
    }
  }
}
</script>
<style lang="scss" scope>
</style>