function CrudTableHeader({inline = false}: { inline?: boolean }, {slots}: any) {
  return (
    <div class={ ['crud-table-header', inline !== undefined && 'crud-table-header--inline'] }>
      { slots.default?.() }
    </div>
  )
}

export default CrudTableHeader
