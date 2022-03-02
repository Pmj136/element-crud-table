function CrudTableAction(_: any, {slots}: any) {
  return <div class="crud-table-action">{ slots.default?.() }</div>
}

export default CrudTableAction
