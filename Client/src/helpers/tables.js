import DataTable from "react-data-table-component";

const customStyles = {
    headRow: {
      style: {
        fontWeight: "bold",
        fontSize: "20px",
        borderBottomColor: "#76a576",
      },
    },
    rows: {
      style: {
        "&:not(:last-of-type)": {
          borderBottomColor: "#76a576",
        },
      },
    },
    pagination: {
      style: {
        borderTopColor: "#76a576",
      },
    },
};

function BaseTable(props) {
    return(
        <DataTable
            theme="dark"
            pagination
            {...props}
        />
    )
}

export function ComboTable(props) {
  return(
      <BaseTable
          fixedHeader
          fixedHeaderScrollHeight="550px"
          paginationRowsPerPageOptions={[10, 25, 50]}
          customStyles={customStyles}
          {...props}
      />
  )
}

export function CombosWithAlts(props) {
    return(
        <ComboTable
            expandableRows
            expandOnRowClicked
            paginationRowsPerPageOptions={[1, 10, 25, 50, 100]}
            {...props}
        />
    )
}

export function AltsTable(props){
    return(
        <BaseTable
            dense
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
            {...props}
        />
    )
}