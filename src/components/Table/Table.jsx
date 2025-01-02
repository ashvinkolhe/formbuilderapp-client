const Table = ({ data }) => {
    const transformData = (form, submissions) => {
      const inputElements = form?.elements?.filter((element) => element.superType === "Inputs") || []; // Ensure it's an array
      const headers = ["Serial No", "Submitted At", ...inputElements.map((element) => element.label)]; // Add custom columns
  
      const rows = submissions?.map((submission, index) => {
        const row = {
          "Serial No": index + 1, // Add Serial Number
          "Submitted At": submission?.submittedAt || "N/A", // Add Submitted At column
        };
        inputElements.forEach((element) => {
          const submissionItem = submission.data?.find((d) => d.label === element.label);
          row[element.label] = submissionItem ? submissionItem.value : "N/A";
        });
        return row;
      }) || []; 
  
      return { headers, rows };
    };
  
    const { headers, rows } = transformData(data?.form, data?.submissions);
  
    return (
      <table border="1">
        <thead>
          <tr>
            {headers?.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, index) => (
                <td key={index}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default Table;
  