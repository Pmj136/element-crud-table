import {inject} from "vue";
import {
  checkCompUsePosition,
  checkUnSetUrlErrLog,
  combineUrl,
  func_ask_for,
  isDev
} from "../../util";
import {ACTION__SET_LIST, CRUD_TABLE_REQUEST_METHOD} from "../../token";

function CrudTableBtnDel({tableData, url, text = "删除", ...rest}) {
  if (isDev)
    checkCompUsePosition(!!tableData, "CrudTableBtnDel", "CrudTableHandler")
  const request = inject(CRUD_TABLE_REQUEST_METHOD)
  const emit = inject("emit");
  const handleDel = () => {
    if (isDev) checkUnSetUrlErrLog("del", url)
    func_ask_for({
      url: combineUrl(url, tableData.row.id),
      successTip: "删除成功"
    }, request).then(() => emit(ACTION__SET_LIST))
  }
  return (
      <el-button
          type="text"
          style={{color: '#e06161'}}
          {...rest}
          onClick={handleDel}>
        {text}
      </el-button>
  )
}

export default CrudTableBtnDel
