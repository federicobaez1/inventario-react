// ExcelExportButton.jsx
import { exportExcel } from "../services/exportService";

export default function ExcelExportButton({ columns, rows, fileName }) {
  const download = async () => {
    try {
      const response = await exportExcel({ columns, rows });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      a.remove();
    } catch (err) {
      console.error("Error exportando Excel:", err);
      alert("No se pudo exportar el archivo.");
    }
  };

  return <button onClick={download}>Exportar Excel</button>;
}
