import { VNode } from 'vue';

function CrudTableHandler(props: any, {slots}: any) {
  return (
     <el-table-column
        label="操作"
        align="center"
        width={220}
        {...props}
        v-slots={{
          default: (scope: any) => {
            const nodes: VNode[] | undefined = slots.default?.(scope);
            if (!nodes) return null;
            nodes.map(v => {
              (v.props || (v.props = {})).tableData = scope
              return v
            })
            return nodes;
          }
        }}>
     </el-table-column>
  );
}

export default CrudTableHandler;
