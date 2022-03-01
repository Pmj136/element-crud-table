function CrudTableHandler(props, {slots}) {
  return (
      <el-table-column
          label="操作"
          align="center"
          width={220}
          {...props}
          v-slots={{
            default: (scope) => {
              const nodes = slots.default(scope)
              nodes.map(v => {
                (v.props || (v.props = {})).tableData = scope
                return v
              })
              return nodes
            }
          }}>
      </el-table-column>
  )
}

export default CrudTableHandler
