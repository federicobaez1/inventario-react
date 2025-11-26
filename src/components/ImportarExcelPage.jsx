import React, { useState } from "react";
import ImportExcelButton from "../components/ImportExcelButton";

export default function ImportarExcelPage() {
  const [data, setData] = useState(null);

  const recibirDatosImportados = (dataImportada) => {
    setData(dataImportada);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Importar Excel</h2>

      <ImportExcelButton onData={recibirDatosImportados} />

      {data && (
        <div style={{ marginTop: "20px" }}>
          <h3>Vista previa:</h3>
          <pre>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
