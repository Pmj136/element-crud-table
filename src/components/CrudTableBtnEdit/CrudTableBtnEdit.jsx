import {inject, toRaw} from "vue";
import {ACTION__SHOW_DIALOG, TYPE_EDIT} from "../../token";
import {checkCompUsePosition, isDev} from "../../util";

function CrudTableBtnEdit({tableData, url, echoUrl, dialogTitle = '编辑', text = "编辑", ...rest}) {
  if (isDev)
    checkCompUsePosition(!!tableData, "CrudTableBtnEdit", "CrudTableHandler")
  const emit = inject('emit');
  const handleClick = () => {
    emit(ACTION__SHOW_DIALOG, {
      dialogType: TYPE_EDIT,
      dialogTitle,
      url,
      echoUrl,
      rowData: toRaw(tableData.row)
    })
  }
  return (
      <el-button
          type="text"
          {...rest}
          onClick={handleClick}>
        {text}
      </el-button>
  )
}

export default CrudTableBtnEdit
