interface Column {
  id: string;
  label: string;
  accessor: (row: any) => any; // Function to extract the value for this column
}

interface TableProps {
  columns: Column[];
  data: any[];
}

const CustomTable: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="overflow-auto">
      <table className="table-auto w-full border-collapse border border-gray-200 dark:border-white">
        <thead>
          <tr className="dark:bg-slate-400 ">
            {columns.map((column) => (
              <th key={column.id} className="border px-4 py-2">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-100">
              {columns.map((column) => (
                <td key={column.id} className="border px-4 py-2">
                  {column.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
