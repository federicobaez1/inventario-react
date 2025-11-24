import React, { useEffect, useState } from 'react';
import { getDetalleInventarios, eliminarDetalleInventario } from '../services/detalleInventarioService';
import { useNavigate } from 'react-router-dom';
import ExcelExportButton from "../components/ExcelExportButton";

const ListaDetalleInventarios = () => {
  const [detalles, setDetalles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { cargar(); }, []);

  const cargar = async () => {
    try {
      const res = await getDetalleInventarios();
      setDetalles(res.data);
    } catch (err) {
      console.error("Error al cargar detalle inventario", err);
    }
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este detalle?")) {
      await eliminarDetalleInventario(id);
      cargar();
    }
  };

  const columnas = ["id", "producto", "cantidad", "fechaConteo"];

const filas = detalles.map(d => ({
    id: d.id,
    producto: d.productoNombre,
    cantidad: d.cantidad,
    fechaConteo: d.fechaConteo
}));

  return (
    <div>
      <h2>Detalles de Inventario</h2>

      <button onClick={() => navigate('/agregar-detalleInventario')}>
        Agregar Detalle
      </button>

      <ul>
        {detalles.map((d) => (
          <li key={d.id}>
            <strong>Inventario:</strong> {d.inventarioCodigo ?? "—"} {" — "}
            <strong>Producto:</strong> {d.productoNombre ?? "—"} {" — "}
            <strong>Empleado:</strong> {d.empleadoNombre ?? "—"} {" — "}
            <strong>Equipo:</strong> {d.equipoNombre ?? "—"} {" — "}
            <strong>Depósito:</strong> {d.depositoNombre ?? "—"} {" — "}
            <strong>Cantidad:</strong> {d.cantidad} {" — "}
            <strong>Fecha Conteo:</strong> {d.fechaConteo ?? "—"} {" — "}
            <strong>Fecha Revisión:</strong> {d.fechaRevision ?? "—"}

            {d.observaciones && (
              <> — <em>{d.observaciones}</em></>
            )}

            <div style={{ marginTop: 8 }}>
              <button onClick={() => navigate(`/editar-detalleInventario/${d.id}`)}>
                Editar
              </button>
              <button onClick={() => eliminar(d.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      {detalles.length === 0 && <p>No hay detalles cargados.</p>}
      <ExcelExportButton
      columns={columnas}
      rows={filas}
      fileName="detalleInventarios.xlsx"
    />
    </div>
  );
};

export default ListaDetalleInventarios;
