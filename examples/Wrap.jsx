import {usePatchVModel} from "../src/index";

export default function Wrap() {
  const pathVModel = usePatchVModel()
  return pathVModel(
      <>
        <el-form-item prop="aaa">
          <el-input/>
        </el-form-item>
        {/*{props.a}*/}
      </>
  )
}
