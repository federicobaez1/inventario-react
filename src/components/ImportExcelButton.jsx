import React, { useState } from "react";
import { importExcel } from "../services/importService";

export default function ImportExcelButton({ onData }) {
  const [file, setFile] = useState(null);

  const doImport = async () => {
    if (!file) return alert("Seleccione un archivo .xlsx");

    try {
      const resp = await importExcel(file);

      // resp.data debe contener: { columns: [...], rows: [...] }
      if (onData) onData(resp.data);

    } catch (e) {
      console.error(e);
      alert("Error importando archivo");
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={doImport}>Importar</button>
    </div>
  );
}
