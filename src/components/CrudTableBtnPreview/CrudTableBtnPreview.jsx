import {inject, toRaw} from "vue";
import {ACTION__SHOW_DIALOG, TYPE_PREVIEW} from "../../token";
import {checkCompUsePosition, isDev} from "../../util";

function CrudTableBtnPreview({tableData, text = "查看", echoUrl, dialogTitle = '预览', ...rest}) {
  if (isDev)
    checkCompUsePosition(!!tableData, "CrudTableBtnPreview", "CrudTableHandler")

  const emit = inject('emit');
  const handleClick = () => emit(ACTION__SHOW_DIALOG, {
    dialogType: TYPE_PREVIEW,
    echoUrl,
    dialogTitle,
    rowData: toRaw(tableData.row)
  })
  return (
      <el-button
          type="text"
          {...rest}
          onClick={handleClick}>
        {text}
      </el-button>
  )
}

export default CrudTableBtnPreview
