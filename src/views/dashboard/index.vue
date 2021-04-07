<template>
  <div class="card-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <line-chart :chart-data="lineChartData" />
      </el-col>
      <el-col :span="12">
        <el-button @click="getData" type="primary" plain size="mini">-- 模拟获取数据 --</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import LineChart from './components/LineChart';
import Data from '@/api/data.js';
export default {
  name: 'Dashboard',
  components: { LineChart },
  data() {
    return {
      lineChartData: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [120, 82, 91, 154, 162, 140, 145]
      }
    }
  },
  methods: {
    getData() {
      this.$confirm('是否获取数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async () => {
        var res = await Data.getData();
        console.log(res)
        this.$message({
          type: 'success',
          message: '获取成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消获取'
        });
      });
    }
  }
}
</script>

<style lang="scss" scope>
</style>
