import {Plus} from "@element-plus/icons-vue";
import {inject} from "vue";
import {ACTION__SHOW_DIALOG, TYPE_ADD} from "../../token";

function CrudTableBtnAdd({text = "新增", url, ...rest}) {
  const emit = inject("emit");
  const handleClick = () => emit(ACTION__SHOW_DIALOG, {
    dialogType: TYPE_ADD,
    url,
  })
  return (
      <el-button
          icon={Plus}
          type="primary"
          {...rest}
          onClick={handleClick}>
        {text}
      </el-button>
  )
}

export default CrudTableBtnAdd
